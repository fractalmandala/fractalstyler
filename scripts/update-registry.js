#!/usr/bin/env node
// ============================================================================
// update-registry — regenerates every registry surface from the stylesheet.
//
// Ground truth is src/lib/styles/_00…_10 (colorpacks.sass and themeplates.sass
// are raw Sass variable palettes and emit no classes — they are not indexed).
// This script parses them structurally and emits:
//   registry.json                                       (class inventory)
//   REGISTRY.md                                         (grep cheatsheet + tokens)
//   docs/REGISTRY.md                                    (pointer mirror)
//   skills/fractal-styler/references/fractals.md        (agent class reference)
//   skills/fractal-styler/references/tokens.md           (agent token reference)
//
// Every entry is a CONCRETE class. The old wildcard families (.gap-*) are
// gone: the eight steps (xs sm md bs lg xl 2xl 3xl) are expanded from the
// $gap/$pad/$mar family maps in _00_config.sass, so the registry lists the
// classes that actually compile.
//
//   node scripts/update-registry.js
// ============================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const stylesDir = path.join(rootDir, 'src', 'lib', 'styles');

// --- The system map ---------------------------------------------------------
// Layer assignment mirrors AGENTS.md's progressive discovery index.
const FILES = [
	{ file: '_01_base.sass', layer: 'L0' },
	{ file: '_02_dimensions.sass', layer: 'L1' },
	{ file: '_03_typography.sass', layer: 'L5' },
	{ file: '_04_containers.sass', layer: 'L2' },
	{ file: '_05_layouts.sass', layer: 'L3' },
	{ file: '_06_shells.sass', layer: 'L4' },
	{ file: '_07_interactions.sass', layer: 'L5' },
	{ file: '_08_visuals.sass', layer: 'L5' },
	{ file: '_09_own.sass', layer: 'Custom' }
];

const LAYERS = [
	['L0', 'Tokens & Base', 'Raw values and native resets. Never hardcode a literal a token covers.'],
	['L1', 'Dimensions', 'Loop-generated space families (gap/rgap/cgap, pad/px/py/pt/pr/pb/pl, mar/mx/my/mt/mr/mb/ml × the eight steps), radius channels, full/zero sizing, viewport heights. All token-routed.'],
	['L2', 'Containers', 'Flow and alignment. .box (flex column), .row (flex row), .grid — alignment modifiers nest under their base, never standalone. x* is ALWAYS the horizontal/inline axis, y* the vertical/block axis.'],
	['L3', 'Layouts', 'Grids that step only through divisors (3→1, 4→2→1, 6→3→2→1), column spans, card-grid, prose, frame ratios, the reel.'],
	['L4', 'Shells', 'Application scaffolding: the .app-shell canon, header, role-bound rails, footer, content sections.'],
	['L5', 'Visuals & Interactions', 'Typography roles, inputs, links, the button quartet, surface fills, ink, borders, elevation shadows, visibility.'],
	['Custom', 'Own', 'Sanctioned extension point (_09_own.sass). Project-specific additions that cannot be expressed via canonical layers.']
];

// ============================================================================
// Sass value parsing — the $maps in _00_config.sass
// ============================================================================

/** Read a top-level `$name: value` from Sass source. Returns the raw value text. */
function readSassVariable(content, name) {
	const re = new RegExp(`\\$${name}:\\s*`);
	const m = re.exec(content);
	if (!m) return null;
	const rest = content.slice(m.index + m[0].length);
	if (rest.startsWith('(')) {
		// Map/list literal: read to the balanced closing paren.
		let depth = 0;
		let quote = null;
		for (let i = 0; i < rest.length; i++) {
			const ch = rest[i];
			if (quote) {
				if (ch === '\\') i++;
				else if (ch === quote) quote = null;
			} else if (ch === "'" || ch === '"') quote = ch;
			else if (ch === '(') depth++;
			else if (ch === ')') {
				depth--;
				if (depth === 0) return rest.slice(0, i + 1);
			}
		}
		return null;
	}
	// Single-line value.
	return rest.split(/\r?\n/)[0].trim();
}

/** Split a value string at top-level separators (sep = ',' or ' '). */
function splitTop(value, sep) {
	const parts = [];
	let depth = 0;
	let quote = null;
	let buf = '';
	for (let i = 0; i < value.length; i++) {
		const ch = value[i];
		if (quote) {
			buf += ch;
			if (ch === '\\') {
				buf += value[++i] ?? '';
			} else if (ch === quote) quote = null;
			continue;
		}
		if (ch === "'" || ch === '"') {
			quote = ch;
			buf += ch;
			continue;
		}
		if (ch === '(') {
			depth++;
			buf += ch;
			continue;
		}
		if (ch === ')') {
			depth--;
			buf += ch;
			continue;
		}
		if (depth === 0 && (sep === ',' ? ch === ',' : /\s/.test(ch))) {
			if (buf.trim()) parts.push(buf.trim());
			buf = '';
			if (sep === ' ') continue; // collapse whitespace runs
			continue;
		}
		buf += ch;
	}
	if (buf.trim()) parts.push(buf.trim());
	return parts;
}

const unquote = (s) => s.replace(/^['"]|['"]$/g, '').trim();

/** Parse a Sass map/list literal into JS (nested maps become objects). */
function parseSassValue(raw) {
	let text = String(raw).trim();
	if (text.startsWith('(') && text.endsWith(')')) text = text.slice(1, -1).trim();
	if (!text) return [];
	const items = splitTop(text, ',');
	if (items.length === 1 && !/^\s*['"]?[\w-]+['"]?\s*:/.test(items[0])) {
		// Space-separated list (e.g. $steps).
		return splitTop(items[0], ' ').map(unquote);
	}
	const map = {};
	for (const item of items) {
		const m = /^(['"]?[\w-]+['"]?)\s*:\s*([\s\S]+)$/.exec(item);
		if (!m) continue;
		const key = unquote(m[1]);
		const val = m[2].trim();
		map[key] = val.startsWith('(') ? parseSassValue(val) : unquote(val);
	}
	return map;
}

// ============================================================================
// Indented-Sass structural parser
// ============================================================================

const countIndent = (line) => (line.match(/^\t*/)[0] || '').length;

/** Strip a trailing `// comment` — whitespace-guarded so http:// URLs survive. */
function splitTrailingComment(text) {
	const m = /^(.*?)\s+\/\/\s*(.+)$/.exec(text);
	return m ? [m[1].trim(), m[2].trim()] : [text.trim(), null];
}

const isAtRule = (t) => t.startsWith('@');
const isMixin = (t) => t.startsWith('=') || t.startsWith('+');

function isSelector(t) {
	if (isAtRule(t) || isMixin(t)) return false;
	if (t.startsWith('//') || t.startsWith('/*')) return false;
	// A declaration is `prop: value` (including custom props `--x: y`).
	// Selectors here never have a bare `ident:` head (`:root`, `::view-*`,
	// `*`, `.foo`, `&.bar`, `a.nav-link`, `p, li`, `[data-mode]`, `> *` …).
	if (/^[-\w]+\s*:/.test(t) && !t.startsWith(':')) return false;
	return true;
}

/**
 * Parse indented Sass into a rule tree.
 * Nodes: { type: 'rule', selectors, comments, trailing, children }
 *        { type: 'media', params, children }
 *        { type: 'skip', why, children }   — @each/@for/@keyframes/@font-face/mixins
 *        { type: 'decl', text, trailing }
 */
function parseSassTree(content) {
	let lines = content.split(/\r?\n/);
	// A comment block at the very top of the file is a file banner (the
	// `====`-framed layer headers), not a description of the first class
	// below it — drop it before parsing, so e.g. `.box` falls through to its
	// curated description instead of inheriting the _04 banner.
	let top = 0;
	while (top < lines.length && (!lines[top].trim() || lines[top].trim().startsWith('//'))) top++;
	lines = lines.slice(top);
	let idx = 0;
	let pendingComments = [];

	const takeComments = () => {
		const comments = pendingComments;
		pendingComments = [];
		return comments;
	};

	function parseChildren(indent) {
		const children = [];
		while (idx < lines.length) {
			const raw = lines[idx];
			if (!raw.trim()) {
				idx++;
				continue;
			}
			const lineIndent = countIndent(raw);
			if (lineIndent < indent) break;
			const [t, trailing] = splitTrailingComment(raw.trim());
			if (!t) {
				idx++;
				continue;
			}
			if (t.startsWith('//')) {
				pendingComments.push(trailing ?? t.replace(/^\/\/\s?/, ''));
				idx++;
				continue;
			}
			if (isAtRule(t)) {
				const name = /^@([\w-]+)/.exec(t)[1];
				const comments = takeComments();
				idx++;
				const bodyless = ['use', 'forward', 'import', 'include', 'warn', 'error', 'debug', 'charset'];
				if (bodyless.includes(name)) {
					children.push({ type: 'skip', why: name, params: t, comments, children: [] });
					continue;
				}
				// @media frames carry a media context; everything else (@each, @for,
				// @keyframes, @font-face) emits no registry classes — skip its body.
				const type = name === 'media' ? 'media' : 'skip';
				children.push({ type, why: name, params: t, comments, children: parseChildren(lineIndent + 1) });
				continue;
			}
			if (isMixin(t)) {
				const comments = takeComments();
				idx++;
				children.push({ type: 'mixin', name: t.slice(1).trim(), comments, children: parseChildren(lineIndent + 1) });
				continue;
			}
			if (isSelector(t)) {
				const comments = takeComments();
				const selectors = [t];
				idx++;
				// Multi-line selector lists: `img,` / `video,` / `svg`.
				while (idx < lines.length) {
					const raw2 = lines[idx];
					if (!raw2.trim()) {
						idx++;
						continue;
					}
					const t2 = splitTrailingComment(raw2.trim())[0];
					if (countIndent(raw2) === lineIndent && t2 && isSelector(t2)) {
						selectors.push(t2);
						idx++;
						continue;
					}
					break;
				}
				children.push({ type: 'rule', selectors, comments, trailing, children: parseChildren(lineIndent + 1) });
				continue;
			}
			// Declaration (or stray line): record with its trailing comment.
			children.push({ type: 'decl', text: t, trailing, comments: takeComments() });
			idx++;
		}
		return children;
	}

	return parseChildren(0);
}

// ============================================================================
// Entry extraction
// ============================================================================

const CLASS_RE = /\.(-?[_a-zA-Z][\w-]*)/g;
const classesIn = (sel) => [...sel.matchAll(CLASS_RE)].map((m) => m[1]);

/** Compact a media query for property strings: (min-width: 1025px) → @min-width:1025px */
function compactMedia(params) {
	const m = /@media\s*\((.+)\)/.exec(params) || /^\((.+)\)$/.exec(params);
	const body = (m ? m[1] : params).replace(/\s+/g, '');
	return `@${body}`;
}

/** Shorten data: URLs and cap a declaration for table cells. */
function cleanDecl(text) {
	let t = text.replace(/url\(\s*["']?data:[^)]*\)/gi, 'url(data:…)');
	if (t.length > 72) t = `${t.slice(0, 69)}…`;
	return t;
}

/**
 * Collect the declarations of a rule node. Direct declarations come first;
 * declarations inside nested @media blocks are kept with their media context.
 * Nested rule blocks are skipped (they become their own entries).
 */
function collectDecls(node, media = []) {
	const out = [];
	const walk = (children, ctx) => {
		for (const child of children) {
			if (child.type === 'decl') out.push({ text: cleanDecl(child.text), media: ctx });
			else if (child.type === 'media') walk(child.children, [...ctx, compactMedia(child.params)]);
		}
	};
	walk(node.children ?? [], media);
	return out;
}

function propertyString(decls) {
	if (!decls.length) return '';
	const base = decls.filter((d) => !d.media.length).map((d) => d.text);
	const parts = [];
	if (base.length) parts.push(base.slice(0, 3).join('; ') + (base.length > 3 ? '; …' : ''));
	const mediaGroups = new Map();
	for (const d of decls.filter((x) => x.media.length)) {
		const key = d.media.join(' ');
		if (!mediaGroups.has(key)) mediaGroups.set(key, []);
		mediaGroups.get(key).push(d.text);
	}
	for (const [key, texts] of mediaGroups) parts.push(`${key}: ${texts.slice(0, 2).join('; ')}`);
	const property = parts.join(' · ');
	return property.length > 168 ? `${property.slice(0, 165)}…` : property;
}

// Curated descriptions for classes whose source carries no comment and whose
// declarations alone would not explain intent. Comments in the source still
// win: this map only fills gaps.
const CURATED = {
	'.bdr': 'Debug outline — flags an element on screen with a red border',
	'.mode-wipe': 'On <html>: disables view-transition animations while a color-mode wipe runs',
	'.wfull': 'Full width (100%)',
	'.hfull': 'Full height (100%)',
	'.full': 'Full width and height (100% both axes)',
	'.minw0': 'Zero min-width — lets a flex child shrink below its content',
	'.minh0': 'Zero min-height — lets a flex child shrink below its content',
	'.min0': 'Zero min-width and min-height — prevents flex blowouts',
	'.h-sm': 'Control height step sm (var(--height-sm))',
	'.h-md': 'Control height step md (var(--height-md))',
	'.h-bs': 'Control height step bs (var(--height-bs))',
	'.h-lg': 'Control height step lg (var(--height-lg))',
	'.hfull-vh': 'Full viewport height (min-height: 100vh)',
	'.hfull-vh-fitted': 'Viewport height fitted between header and footer (var(--fit-height))',
	'.box': 'Flex column container — the vertical structural foundation',
	'.row': 'Flex row container — the horizontal structural foundation',
	'.grid': 'CSS grid container (columns composed via .grid-N / alignment below)',
	'.wrap': 'Allow flex wrapping',
	'.grow': 'Flex grow — take remaining space (flex: 1 1 0%)',
	'.shrink-0': 'Never shrink below content size',
	'.relative': 'position: relative (anchor for absolute children)',
	'.absolute': 'position: absolute',
	'.fixed': 'position: fixed',
	'.sticky': 'position: sticky',
	'.card': 'Panel card: padded, bordered, panel background; arrow svg and footer behaviors included',
	'.chip': 'Small inline label — tag/badge duty (xs type, md radius)',
	'.prose-section': 'Vertical prose section (flex column, lg gap)',
	'.nav-section': 'Vertical nav section (flex column, xs gap)',
	'.page-header': 'Page header block (flex column, sm gap, 2xl bottom pad)',
	'.inputs-wrapper': 'Form field group (flex row, xs gap; labels at sm muted)',
	'.checkbox-wrapper': 'Checkbox row (flex, centered, xs gap; span at sm weight 500)',
	'.card-grid': 'Auto-fit card grid — column count negotiates, min track var(--card-min)',
	'.prose': 'Reading measure — max-width var(--prose-clamp), centered, typographic rhythm',
	'.grid-1': 'Single-column grid (no responsive steps)',
	'.grid-2': 'Responsive 2-column grid: 1 → 2 columns at 1025px',
	'.grid-3': 'Responsive 3-column grid: 1 → 3 columns at 1025px (3→1 golden rule)',
	'.grid-4': 'Responsive 4-column grid: 1 → 2 → 4 columns (never 3+1)',
	'.grid-6': 'Responsive 6-column grid: 1 → 3 → 6 columns (both golden rules hold)',
	'.cspan-1': 'Span 1 grid column',
	'.cspan-2': 'Span 2 grid columns',
	'.cspan-3': 'Span 3 grid columns',
	'.cspan-4': 'Span 4 grid columns',
	'.cspan-5': 'Span 5 grid columns',
	'.cspan-6': 'Span 6 grid columns',
	'.cspan-7': 'Span 7 grid columns',
	'.cspan-8': 'Span 8 grid columns',
	'.app-shell': 'Application shell root — flex column, 100vh, hosts header/main/footer and the drawer state',
	'.app-header': 'Sticky application header (var(--header-height))',
	'.app-main': 'Main region between header and footer — flex row, fitted to 100dvh minus chrome',
	'.main-section': 'Primary content column inside .app-main (flex: 1, min-width: 0)',
	'.sidebar-left': 'Left rail — nav role; off-canvas drawer below 1025px via .open on .app-shell',
	'.sidebar-right': 'Right rail — TOC role; hidden below 1281px',
	'.app-footer': 'Application footer (var(--footer-height))',
	'.content-section': 'Page content block — responsive padding and narrow width modes',
	'.input': 'Text input — themed field with focus ring',
	'.select': 'Select dropdown — themed field with chevron and focus ring',
	'.link': 'Themed link — theme color, alt on hover',
	'.link-plain': 'Plain link — inherits ink, theme color on hover',
	'.link-parent': 'Link block — hovers color its .link-title child instead of itself',
	'button': 'Element base for every button — the quartet root (align, height, focus, disabled states)',
	'a.nav-link': 'Interactive form of .nav-link — padded, curved, hover fill',
	'a.btn': 'Call-to-action anchor button — styled with data-variant, data-shape, and data-size axes',
	'.text-body': 'Body copy at base size (line-height 1.5)',
	'.text-body-lg': 'Body copy at large size (line-height 1.5)',
	'.text-body-sm': 'Body copy at small size (line-height 1.5)',
	'.page-title': 'Page title — 3xl, 700, tight tracking',
	'.page-desc': 'Page description — lg, airy',
	'.page-heading-xl': 'Page heading, xl rung — 600, tight tracking',
	'.page-heading-lg': 'Page heading, lg rung — 600, tight tracking',
	'.page-heading-bs': 'Page heading, base rung — 600, tight tracking',
	'.card-title': 'Card title — lg, 600',
	'.card-desc': 'Card description — md',
	'.breadcrumb': 'Breadcrumb rail (flex, offset -0.5rem)',
	'.breadcrumb-link': 'Breadcrumb link — muted, uppercased, theme color on hover',
	'.breadcrumb-spacer': 'Breadcrumb spacer (non-link segment, same type treatment)',
	'.nav-link': 'Nav link type — md, 1.2 rhythm',
	'.nav-link-sm': 'Nav link type, small rung',
	'.nav-header': 'Nav group header — sm, 500, padded',
	'.header-nav': 'Header nav block — uppercased md links, theme color on hover',
	'.mono': 'Monospace font stack (var(--font-mono))',
	'.sans': 'Sans font stack (var(--font-sans))',
	'.truncate': 'One-line ellipsis truncation',
	'.bg-main': 'Bare background — page base fill (var(--bg))',
	'.bg-surface': 'Bare background — surface fill (var(--bg-surface))',
	'.bg-panel': 'Bare background — panel fill (var(--bg-panel))',
	'.bg-sunken': 'Bare background — sunken fill (var(--bg-sunken))',
	'.bg-raised': 'Bare background — raised fill (var(--bg-raised))',
	'.bg-extra': 'Bare background — extra fill (var(--bg-extra))',
	'.border': 'Full border, standard weight (var(--border))',
	'.border-subtle': 'Full border, subtle weight (var(--border-subtle))',
	'.border-strong': 'Full border, strong weight (var(--border-strong))',
	'.hide-mobile': 'Display none at ≤1024px',
	'.hide-desktop': 'Display none at ≥1025px',
	'.site-logomotif': 'Site logo motif — 48px, scales 1.2 on hover',
	'.logotype': 'Logotype — 28px wordmark',
	'.project-circle': 'Project dot — 16px circle',
	'.fsx-accordion': 'Accordion group — vertical stack of .fsx-accordion-item',
	'.fsx-accordion-item': 'Accordion item — bordered, styled shell hosting trigger and content with data-variant/data-shape/data-size axes',
	'.fsx-accordion-content': 'Collapsible region of an .fsx-accordion-item — 0fr→1fr grid transition',
	'.fsx-accordion-panel': 'Collapsible panel inside .fsx-accordion-content (overflow: hidden, min-height: 0)',
	'.fsx-accordion-trigger': 'Accordion trigger button — full-width, hover/focus states',
	'.hero-name': 'Hero display name — text-5xl doubled, 800, tight tracking'
};

function describe(entry, node, decls) {
	const first = decls.find((d) => !d.media.length)?.text || decls[0]?.text || '';
	if (entry.trailing) return entry.trailing;
	if (node.trailing) return node.trailing;
	// Leading comments describe their selector — but `--- section ---` divider
	// banners are structure, not description.
	const comment = node.comments?.find((c) => !/^[-=*]{2,}/.test(c));
	if (comment) {
		const text = comment.replace(/^[-=*]{2,}\s*|\s*[-=*]{2,}$/g, '').trim() || comment;
		return text.length > 160 ? `${text.slice(0, 157)}…` : text;
	}
	if (CURATED[entry.class]) return CURATED[entry.class];
	switch (entry.kind) {
		case 'modifier':
			return `${first} — modifier of ${entry.parent}`;
		case 'child':
			return `${first} — child of ${entry.parent}`;
		case 'variant':
			return `${first} — attribute variant of ${entry.parent}`;
		case 'compound':
			return `${first} — combination rule (${entry.class.replace(/\./g, '')})`;
		default:
			return first || `${entry.class} rule`;
	}
}

function exampleFor(cls, kind) {
	const names = classesIn(cls);
	if (kind === 'element' || /^(button)/.test(cls)) {
		if (/\[data-/.test(cls)) return `<button ${cls.replace(/^button/, '')}>…</button>`;
		if (cls === 'button') return '<button>…</button>';
		return `<button class="${names.join(' ')}">…</button>`;
	}
	if (/^a[.\s[]/.test(cls)) return `<a class="${names.join(' ')}" href="…">…</a>`;
	if (kind === 'compound') {
		const segments = cls.split(/\s+/).map((seg) => {
			const segNames = classesIn(seg);
			return seg.replace(CLASS_RE, '').trim() || (segNames.length ? segNames.join(' ') : seg);
		});
		return segments.map((s) => `<div class="${s}">`).join('') + '…' + '</div>'.repeat(segments.length);
	}
	return `<div class="${names.join(' ')}">…</div>`;
}

/**
 * Bare element selectors that are API in their own right, and the partial that
 * authors them. `button` also appears in _01_base as a bare reset — the entry
 * belongs to the button quartet in _07, not to the reset.
 */
const ELEMENT_ENTRIES = { button: '_07_interactions.sass' };

/**
 * Walk the rule tree and emit registry entries.
 * ctx: { selPath: string|null, owner: string|null, media: [] }
 */
function walkRules(children, ctx, file, layer, out, seen) {
	for (const node of children) {
		if (node.type === 'mixin') continue; // token mixins handled separately
		if (node.type === 'skip') continue; // @each/@for/@keyframes/@font-face bodies
		if (node.type === 'media') {
			walkRules(node.children, { ...ctx, media: [...ctx.media, compactMedia(node.params)] }, file, layer, out, seen);
			continue;
		}
		if (node.type !== 'rule') continue;

		// The frame path children qualify against.
		let framePath = null;
		let owner = ctx.owner;

		// Flatten the selector group: multi-line lists and one-line comma lists.
		const parts = [];
		for (const rawSel of node.selectors) {
			for (const part of splitTop(rawSel, ',')) {
				const p = part.trim().replace(/,+$/, '').trim();
				if (p) parts.push(p);
			}
		}

		for (const sel of parts) {
			const selClasses = classesIn(sel);
			const qualified = sel.startsWith('&') && ctx.selPath ? ctx.selPath + sel.slice(1) : sel;

			if (framePath === null) framePath = qualified;

			if (!selClasses.length) {
				if (sel.startsWith('&[')) {
					// Attribute variant (`&[data-…]`) — no new class, still an entry.
					push({ class: qualified, kind: 'variant', parent: ctx.selPath, file, layer }, node, out, seen);
					owner = qualified;
				} else if (ELEMENT_ENTRIES[sel] === file && !ctx.selPath) {
					// Bare element frame authored here. `button` is the quartet root — an API entry.
					push({ class: sel, kind: 'element', parent: null, file, layer }, node, out, seen);
					owner = sel;
				}
				continue;
			}

			if (sel.startsWith('&')) {
				// Modifier / state / variant of the parent.
				const rest = sel.slice(1);
				const ownClasses = classesIn(rest.startsWith('.') ? rest : `.${rest}`);
				// `&:hover` and friends introduce no new class — skip the entry,
				// keep the frame for nested children (e.g. `&:hover .link-title`).
				// An attribute test (`&[data-…]`) is always a variant — entry.
				const isNew =
					rest.trim().startsWith('[') ||
					ownClasses.some((c) => !classesIn(ctx.selPath || '').includes(c));
				if (!isNew) continue;
				let kind = 'modifier';
				if (rest.trim().startsWith('[')) kind = 'variant';
				else if (/\s/.test(rest.trim())) kind = 'compound';
				push({ class: qualified, kind, parent: ctx.selPath, file, layer }, node, out, seen);
				owner = qualified;
			} else if (ctx.selPath) {
				// Plain descendant under a parent frame.
				const topClasses = classesIn(ctx.selPath);
				if (!selClasses.some((c) => !topClasses.includes(c))) continue;
				if (/\s/.test(sel.trim())) {
					// e.g. `.app-shell.open .sidebar-left` — a state/combination rule.
					push({ class: qualified, kind: 'compound', parent: null, file, layer }, node, out, seen);
				} else if (selClasses.length === 1 && sel.trim() === `.${selClasses[0]}`) {
					push({ class: `.${selClasses[0]}`, kind: 'child', parent: ctx.selPath, file, layer }, node, out, seen);
					owner = `.${selClasses[0]}`;
				} else {
					// Scoped child element with its own class (e.g. `svg.arrow` under .card).
					const last = selClasses[selClasses.length - 1];
					push({ class: `.${last}`, kind: 'child', parent: ctx.selPath, file, layer }, node, out, seen);
					owner = `.${last}`;
				}
			} else {
				// Top-level selector.
				if (selClasses.length > 1) {
					push({ class: qualified, kind: 'compound', parent: null, file, layer }, node, out, seen);
				} else {
					const cls = selClasses[0];
					const el = /^([a-zA-Z][\w-]*)\.[\w-]+/.exec(sel);
					// `a.nav-link` keeps its element prefix (distinct from the type
					// class `.nav-link`); `html.mode-wipe` is a root utility — drop it.
					const name = el ? (el[1] === 'html' ? `.${cls}` : `${el[1]}.${cls}`) : `.${cls}`;
					push({ class: name, kind: 'class', parent: null, file, layer }, node, out, seen);
					owner = name;
				}
			}
		}

		walkRules(
			node.children,
			{ selPath: framePath ?? ctx.selPath, owner, media: ctx.media },
			file,
			layer,
			out,
			seen
		);
	}
}

function push(entry, node, out, seen) {
	if (seen.has(entry.class)) return;
	seen.add(entry.class);
	const decls = collectDecls(node);
	entry.property = propertyString(decls);
	entry.description = describe(entry, node, decls);
	entry.example = exampleFor(entry.class, entry.kind);
	out.push(entry);
}

// ============================================================================
// Loop-generated families from _00_config.sass
// ============================================================================

const FAMILY_DESC = {
	gap: 'Gap on both axes (flex/grid)',
	rgap: 'Row gap (block axis)',
	cgap: 'Column gap (inline axis)',
	pad: 'Padding, all four sides',
	px: 'Inline (horizontal) padding',
	py: 'Block (vertical) padding',
	pt: 'Top padding',
	pr: 'Right padding',
	pb: 'Bottom padding',
	pl: 'Left padding',
	mar: 'Margin, all four sides',
	mx: 'Inline (horizontal) margin',
	my: 'Block (vertical) margin',
	mt: 'Top margin',
	mr: 'Right margin',
	mb: 'Bottom margin',
	ml: 'Left margin'
};

function familyEntries(config, out, seen) {
	const groups = [
		['$gap-families', config.gapFamilies],
		['$pad-families', config.padFamilies],
		['$mar-families', config.marFamilies]
	];
	for (const [varName, families] of groups) {
		if (!families) continue;
		for (const [famName, cssProp] of Object.entries(families)) {
			for (const step of config.steps) {
				const cls = `.${famName}-${step}`;
				if (seen.has(cls)) continue;
				seen.add(cls);
				out.push({
					class: cls,
					kind: 'family',
					layer: 'L1',
					file: '_02_dimensions.sass',
					property: `${cssProp}: var(--space-${step})`,
					description: `${FAMILY_DESC[famName] ?? `${famName} spacing`} at the ${step} step — rides var(--space-${step}) (generated from ${varName} × $steps in _00_config.sass)`,
					example: `<div class="${famName}-${step}">`
				});
			}
		}
	}
	for (const [name, ratio] of Object.entries(config.frameRatios || {})) {
		const cls = `.frame-${name}`;
		if (seen.has(cls)) continue;
		seen.add(cls);
		out.push({
			class: cls,
			kind: 'family',
			layer: 'L3',
			file: '_05_layouts.sass',
			property: `aspect-ratio: ${ratio}; overflow: hidden`,
			description: `Aspect-ratio media frame (${ratio.replace(/\s/g, '')}) — img/video/iframe/svg fill and cover (generated from $frame-ratios in _00_config.sass)`,
			example: `<div class="frame-${name}"><img …></div>`
		});
	}
}

// ============================================================================
// Token extraction from _00_tokens.sass (+ shade tokens from _00_config.sass)
// ============================================================================

function collectTokens() {
	const content = fs.readFileSync(path.join(stylesDir, '_00_tokens.sass'), 'utf8');
	const tree = parseSassTree(content);
	const tokens = [];
	const seen = new Set();

	const add = (name, value, scope) => {
		if (seen.has(name)) return; // first definition wins (light before dark)
		seen.add(name);
		tokens.push({ name, value, scope });
	};

	const walk = (children, scope) => {
		for (const node of children) {
			if (node.type === 'mixin') {
				const inner = /^light-theme-tokens$/.test(node.name) ? 'light' : /^dark-theme-tokens$/.test(node.name) ? 'dark' : null;
				if (inner) walk(node.children, inner);
				continue;
			}
			if (node.type === 'rule') {
				const isRoot = node.selectors.some((s) => s.trim() === ':root');
				walk(node.children, isRoot && !scope ? 'root' : scope);
				continue;
			}
			if (node.type === 'decl' && scope) {
				const m = /^(--[\w-]+)\s*:\s*(.+)$/.exec(node.text);
				if (m) add(m[1], m[2].trim(), scope);
			}
		}
	};
	walk(tree, null);

	// --shade-* tokens are loop-generated in _00_config.sass from $shadow-specs.
	const configSrc = fs.readFileSync(path.join(stylesDir, '_00_config.sass'), 'utf8');
	const specs = parseSassValue(readSassVariable(configSrc, 'shadow-specs'));
	if (specs && typeof specs === 'object') {
		for (const [step, spec] of Object.entries(specs)) {
			const v = (k) => spec[k];
			const value = `var(--shadow-rim), 0 ${v('y1')} ${v('b1')} rgb(var(--shadow-color) / ${v('a1')}), 0 ${v('y2')} ${v('b2')} rgb(var(--shadow-color) / ${v('a2')})`;
			add(`--shade-${step}`, value, 'root');
		}
	}
	return tokens;
}

// ============================================================================
// Markdown surfaces
// ============================================================================

function generateMarkdownRegistry(registry, tokens) {
	let md = `# Fractalstyler — Complete Class & Token Registry\n\n`;
	md += `Status: **LOCKED & CANONICAL**  \n`;
	md += `Updated: **${new Date().toISOString().split('T')[0]}**  \n`;
	md += `Architecture: **L0 (Tokens) $\\rightarrow$ L1 (Dimensions) $\\rightarrow$ L2 (Containers) $\\rightarrow$ L3 (Layouts) $\\rightarrow$ L4 (Shells) $\\rightarrow$ L5 (Visuals & Interactions)**\n\n`;
	md += `This document is the **single, definitive, grepable master registry** for all CSS classes, tokens, modifiers, and canonical markup structures in \`fractalstyler\`.\n\n`;
	md += `Every entry is a concrete class — the space families are expanded from the family maps in \`_00_config.sass\` across the eight steps \`xs sm md bs lg xl 2xl 3xl\`. There are no wildcard families, no literal ladders and no \`-mob\`/\`-desk\` bands.\n\n`;
	md += `---\n\n## Quick Grep Cheatsheet\n\n`;
	md += `Format: \`CLASS_NAME | LAYER | CSS PROPERTY / BEHAVIOR | FILE SOURCE | EXAMPLE\`\n\n\`\`\`\n`;

	for (const item of registry) {
		const clsPad = item.class.padEnd(30, ' ');
		const layerPad = item.layer.padEnd(2, ' ');
		const propPad = (item.property || item.description).padEnd(66, ' ');
		const filePad = item.file.padEnd(22, ' ');
		md += `${clsPad} | ${layerPad} | ${propPad} | ${filePad} | ${item.example}\n`;
	}

	md += `\`\`\`\n\n---\n\n## Semantic Token Variables\n\n`;
	md += `Light values are the marker-free default; \`[data-mode='dark']\` remaps them via \`=dark-theme-tokens\`.\n\n\`\`\`css\n`;
	for (const token of tokens) {
		md += `  ${token.name}: ${token.value}; /* ${token.scope} */\n`;
	}
	md += `\`\`\`\n`;
	return md;
}

function generateSkillReference(registry, tokens) {
	let md = `# Fractalstyler — Class Reference\n\n`;
	md += `GENERATED FILE — do not edit. Emitted by \`scripts/update-registry.js\` from the\n`;
	md += `parsed stylesheet. ${registry.length} classes across ${tokens.length} tokens.\n\n`;
	md += `**The classes below are the entire public API.** The system defines no\n`;
	md += `authoring mixins and no SASS functions — \`+stack\`, \`+surface\`, \`space()\` and\n`;
	md += `friends do not exist. Compose in markup.\n\n`;
	md += `Every class is concrete. Space families (\`.gap\` \`.rgap\` \`.cgap\` \`.pad\` \`.px\` \`.py\`\n`;
	md += `\`.pt\` \`.pr\` \`.pb\` \`.pl\` \`.mar\` \`.mx\` \`.my\` \`.mt\` \`.mr\` \`.mb\` \`.ml\`) each ride the\n`;
	md += `eight steps: \`xs sm md bs lg xl 2xl 3xl\`, token-routed through \`var(--space-*)\`.\n`;
	md += `Modifiers nest under their base (\`.box.xcenter\`), children carry their own\n`;
	md += `name (\`.accordion-content\`), and \`Parent.Child\` notation marks scoped children.\n\n`;

	for (const [layer, title, blurb] of LAYERS) {
		const items = registry.filter((r) => r.layer === layer);
		if (!items.length) continue;
		md += `\n---\n\n## ${layer} — ${title}\n\n${blurb}\n\n`;
		md += `| Class | Applies | Source |\n|:---|:---|:---|\n`;
		for (const i of items) {
			const applies = (i.description || i.property || '').replace(/\|/g, '\\|');
			md += `| \`${i.class}\` | ${applies} | \`${i.file}\` |\n`;
		}
	}

	md += `\n---\n\n## Semantic Tokens\n\n\`\`\`css\n`;
	for (const t of tokens) md += `  ${t.name}: ${t.value}; /* ${t.scope} */\n`;
	md += `\`\`\`\n`;
	return md;
}

function generateTokenReference(tokens) {
	const find = (name) => tokens.find((t) => t.name === name);
	const group = (prefix) => tokens.filter((t) => t.name.startsWith(prefix));
	const TYPE_TOKENS = /^--text-(xs|sm|md|bs|lg|xl|2xl|3xl|4xl|5xl)$/;
	// Curated token -> class mappings where the class name is not a prefix twin.
	const TOKEN_CLASS = {
		'--white-fixed': '`.text-white`',
		'--black-fixed': '`.text-black`',
		'--theme-color': '`.text-theme`',
		'--theme-color-alt': '`.text-theme-alt`',
		'--theme-color-sub': '`.text-theme-sub`',
		'--bg': '`.bg-main`',
		'--bg-surface': '`.bg-surface`',
		'--bg-panel': '`.bg-panel`',
		'--bg-sunken': '`.bg-sunken`',
		'--bg-raised': '`.bg-raised`',
		'--bg-extra': '`.bg-extra`',
		'--success': '`.text-success` `.bg-success`',
		'--warning': '`.text-warning` `.bg-warning`',
		'--danger': '`.text-danger` `.bg-danger`',
		'--info': '`.text-info` `.bg-info`',
		'--orangepop1': '`.orange1`',
		'--orangepop2': '`.orange2`',
		'--orangepop3': '`.orange3`',
		'--orangepop4': '`.orange4`',
		'--orangepop5': '`.orange5`',
		'--orangepop6': '`.orange6`'
	};
	const table = (rows, valueOf) => {
		let out = `| Token | Class | Value |\n|:---|:---|:---|\n`;
		for (const t of rows) {
			let cls;
			if (t.name.startsWith('--space-')) cls = `\`.gap${t.name.slice(7)}\` \`.pad${t.name.slice(7)}\` \`.mar${t.name.slice(7)}\` + sides`;
			else if (TYPE_TOKENS.test(t.name)) cls = `\`.text${t.name.slice(6)}\``;
			else if (/^--text-(primary|secondary|muted|inverse)$/.test(t.name)) cls = `.${t.name.slice(2)}`;
			else if (t.name.startsWith('--radius-')) cls = `\`.radius${t.name.slice(8)}\``;
			else if (t.name.startsWith('--height-')) cls = `\`.h${t.name.slice(8)}\``;
			else if (/^--shadow-(xs|sm|md|bs|lg|xl|2xl|3xl)$/.test(t.name)) cls = `\`.shadow${t.name.slice(8)}\``;
			else cls = TOKEN_CLASS[t.name] ?? '\u2014';
			out += `| \`${t.name}\` | ${cls} | \`${(valueOf ? valueOf(t) : t.value).replace(/\|/g, '\\|')}\` |\n`;
		}
		return out;
	};

	let md = `# Fractalstyler \u2014 Token Reference\n\n`;
	md += `GENERATED FILE \u2014 do not edit. Emitted by \`scripts/update-registry.js\`\n`;
	md += `from \`_00_tokens.sass\` (light/dark mixins + \`:root\`) and the shadow specs in\n`;
	md += `\`_00_config.sass\`.\n\n`;
	md += `Every \`--space-*\` step is a class family: if \`--space-md\` exists, so do\n`;
	md += `\`.gap-md\`, \`.pad-md\` and \`.mar-md\` (plus the \`.px\`/\`.py\`/\`.pt\`\u2026 sides).\n`;
	md += `There is no second vocabulary to learn.\n\n`;

	md += `## Type Scale\n\nFixed rem rungs up to base, then compounded by \`--text-scaling\` (1.25).\n\n`;
	md += table(group('--text-').filter((t) => TYPE_TOKENS.test(t.name)));
	md += '\n' + table([find('--text-scaling')].filter(Boolean));

	md += `\n## Space Scale\n\n\`--unit-space\` (0.25rem) times a step multiplier. Every step feeds the\n`;
	md += `gap/pad/mar families in L1.\n\n`;
	md += table([find('--unit-space')].filter(Boolean));
	md += '\n' + table(group('--space-'));

	md += `\n## Radius\n\nSix channels. Compositions read the tokens, never a literal radius.\n\n`;
	md += table(group('--radius-'));

	md += `\n## Control & Component Metrics\n\nHeights for inputs, selects and buttons; avatar and switch channels.\n\n`;
	md += table(tokens.filter((t) => /^--(height|control|avatar|switch)/.test(t.name)));

	md += `\n## Motion Language\n\nDurations, easings and the composed \`--motion*\` channels every transition reads.\n\n`;
	md += table(tokens.filter((t) => /^--(speed|trans|motion)/.test(t.name)));

	md += `\n## Colour Roles\n\nName the role, never the hex. Values shown are the light default;\n`;
	md += `\`[data-mode='dark']\` remaps them via \`=dark-theme-tokens\`.\n\n`;
	md += table(
		tokens.filter(
			(t) =>
				/^--(white-fixed|black-fixed|bg|state|border|theme|success|warning|danger|info|ring)/.test(t.name) ||
				/^--text-(primary|secondary|muted|inverse)$/.test(t.name)
		)
	);

	md += `\n## Elevation\n\n\`--shadow-*\` channels are what the \`.shadow-*\` classes read; \`--shade-*\` are\n`;
	md += `loop-generated from \`$shadow-specs\` in \`_00_config.sass\` (rim + key + ambient).\n\n`;
	md += table(
		group('--shadow-')
			.concat(group('--shade-'), [find('--shadow-color'), find('--shadow-rim')].filter(Boolean))
	);

	md += `\n## Fonts, Layout Constants & Page Chrome\n\nFont stacks plus the page geometry the shells and viewport classes read.\n\n`;
	md += table(
		tokens.filter((t) =>
			/^--(font|timeless|header-height|footer-height|fit-height|prose-clamp|content-clamp|app-inline|card-min|sidebar-width|z-)/.test(
				t.name
			)
		)
	);

	md += `\n## Pop Colors\n\nNamed accent literals. The \`.orange1\`\u2026\`.orange6\` ink classes read\n`;
	md += `\`--orangepop*\`; the green set is reserved for future use.\n\n`;
	md += table(group('--greenpop').concat(group('--orangepop')));

	md += `\n## Modes & Attribute Axes\n\n\`data-mode\` on the root selects the token mixin: \`light\` (default) or \`dark\`.\n\n`;
	md += `| Attribute | Where | Values | Effect |\n|:---|:---|:---|:---|\n`;
	md += `| \`data-mode\` | \`<html>\` | \`light\` \\| \`dark\` | Swaps \`=light-theme-tokens\` / \`=dark-theme-tokens\` |\n`;
	md += `| \`data-shape\` | \`.card\`, \`button\`, \`a.btn\`, \`.input\`, \`.select\`, \`.fsx-accordion-item\` | \`square\` \\| \`modern\` \\| \`curved\` \\| \`round\` | Corner treatment of the component |\n`;
	md += `| \`data-variant\` | \`.card\`, \`button\`, \`a.btn\`, \`.input\`, \`.select\`, \`.fsx-accordion-item\` | \`primary\` \\| \`secondary\` \\| \`soft\` \\| \`outline\` \\| \`ghost\` \\| \`link\` \\| \`destructive\` | Visual paint variant |\n`;
	md += `| \`data-size\` | \`.card\`, \`button\`, \`a.btn\`, \`.input\`, \`.select\`, \`.fsx-accordion-item\` | \`sm\` \\| \`md\` \\| \`bs\` \\| \`lg\` | Metrics / scale variant |\n`;
	return md;
}

// ============================================================================
// Execute
// ============================================================================

const configSrc = fs.readFileSync(path.join(stylesDir, '_00_config.sass'), 'utf8');
const config = {
	steps: parseSassValue(readSassVariable(configSrc, 'steps')),
	gapFamilies: parseSassValue(readSassVariable(configSrc, 'gap-families')),
	padFamilies: parseSassValue(readSassVariable(configSrc, 'pad-families')),
	marFamilies: parseSassValue(readSassVariable(configSrc, 'mar-families')),
	frameRatios: parseSassValue(readSassVariable(configSrc, 'frame-ratios')),
	breakpoints: parseSassValue(readSassVariable(configSrc, 'breakpoints'))
};

const registry = [];
const seen = new Set();

// 1. Loop-generated families first (they own the L1 space ladder and L3 frames).
familyEntries(config, registry, seen);

// 2. Explicit classes from every partial, in layer order.
for (const { file, layer } of FILES) {
	const content = fs.readFileSync(path.join(stylesDir, file), 'utf8');
	const tree = parseSassTree(content);
	walkRules(tree, { selPath: null, owner: null, media: [] }, file, layer, registry, seen);
}

const tokens = collectTokens();

fs.writeFileSync(path.join(rootDir, 'registry.json'), JSON.stringify(registry, null, 2), 'utf8');

fs.mkdirSync(path.join(rootDir, 'skills', 'fractalstyler', 'references'), { recursive: true });
fs.writeFileSync(
	path.join(rootDir, 'skills', 'fractalstyler', 'references', 'fractals.md'),
	generateSkillReference(registry, tokens),
	'utf8'
);
fs.writeFileSync(
	path.join(rootDir, 'skills', 'fractalstyler', 'references', 'tokens.md'),
	generateTokenReference(tokens),
	'utf8'
);

const byLayer = {};
for (const e of registry) byLayer[e.layer] = (byLayer[e.layer] || 0) + 1;
const layerSummary = Object.entries(byLayer)
	.map(([l, n]) => `${l}: ${n}`)
	.join(', ');
console.log(`✔ Registry updated: ${registry.length} classes (${layerSummary}) across ${tokens.length} tokens.`);
console.log(`  Emit: registry.json, skills/fractalstyler/references/{fractals,tokens}.md`);

