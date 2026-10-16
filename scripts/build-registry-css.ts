#!/usr/bin/env node
/**
 * build-registry-css — project the compiled stylesheet down to the selectors
 * named in registry.json and write the result as one complete, valid CSS file.
 *
 * Why a projection and not a rewrite: registry.json stores a *documentation*
 * property string per class. It is abbreviated ("…"), drops trailing
 * declarations, and renders media rules as "@max-width:1024px: …" — none of
 * that is CSS. The authoritative declarations live in the SASS sources. So we
 * compile src/lib/styles/index.sass (the parse), walk the resulting CSS tree
 * with its real @media ancestry intact, keep the rules that reference a
 * registry class, and emit them in source order so the cascade is preserved.
 *
 * The output is a reference stylesheet for registry lookups, not a drop-in
 * replacement for dist/css/fractalstyler.css: :root tokens, [data-mode] themes
 * and the html/body/h1… element resets are intentionally excluded because they
 * are not registry classes.
 *
 *   node scripts/build-registry-css.ts [out.css]   # default dist/registry.css
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const entry = join(root, 'src/lib/styles/index.sass');
const registryPath = join(root, 'registry.json');
const outFile = resolve(root, process.argv[2] ?? 'dist/registry.css');

// ---------------------------------------------------------------------------
// Selector helpers
// ---------------------------------------------------------------------------

/** Registry rows quote attribute values ("primary"); Sass emits them bare. */
const normalizeSelector = (s: string) =>
	s
		.replace(/\[([^\]=\s]+)\s*=\s*"([^"]*)"\s*\]/g, '[$1=$2]')
		.replace(/\[([^\]=\s]+)\s*=\s*'([^']*)'\s*\]/g, '[$1=$2]')
		.replace(/\s+/g, ' ')
		.trim();

/** Split a selector list on top-level commas only (brackets and parens nest). */
function splitSelectorList(selectorList: string): string[] {
	const out: string[] = [];
	let depth = 0;
	let quote = '';
	let cur = '';
	for (const ch of selectorList) {
		if (quote) {
			cur += ch;
			if (ch === quote) quote = '';
			continue;
		}
		if (ch === '"' || ch === "'") {
			quote = ch;
			cur += ch;
			continue;
		}
		if (ch === '[' || ch === '(') depth++;
		else if (ch === ']' || ch === ')') depth--;
		if (ch === ',' && depth === 0) {
			if (cur.trim()) out.push(cur.trim());
			cur = '';
			continue;
		}
		cur += ch;
	}
	if (cur.trim()) out.push(cur.trim());
	return out;
}

// A registry class may be an element (`button`), a class (`.card`), an
// element.class (`a.btn`), an attribute variant, or a compound selector. The
// match is a substring, but it must sit on token boundaries so `.card` does not
// claim `.card-title` while `.link-title` still claims `.link-parent .link-title`
// and `button` still claims `button:hover` / `button[data-variant=primary]`.
const RIGHT_OK = new Set(['', '[', ']', ':', '.', '#', ' ', '>', '+', '~', ',', ')']);
const LEFT_OK = new Set(['', ' ', '>', '+', '~', ',', '(', ')']);
const WORD = /[A-Za-z0-9_-]/;

function referencesInSelector(selector: string, cls: string): boolean {
	for (let from = 0; ; ) {
		const idx = selector.indexOf(cls, from);
		if (idx === -1) return false;
		from = idx + 1;

		const after = selector[idx + cls.length] ?? '';
		if (!RIGHT_OK.has(after)) continue;

		// Only element-leading names are ambiguous with a longer identifier
		// (`button` vs `buttonish`); a leading dot already disambiguates.
		if (/^[A-Za-z0-9_-]/.test(cls)) {
			const before = idx > 0 ? selector[idx - 1] : '';
			if (!LEFT_OK.has(before)) continue;
		}
		return true;
	}
}

function ruleReferences(node: { selector: string }, cls: string): boolean {
	for (const sel of splitSelectorList(normalizeSelector(node.selector))) {
		if (referencesInSelector(sel, cls)) return true;
	}
	return false;
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

interface RegistryRow {
	class?: string;
}
interface RegistryLayer {
	items?: { kind?: string; name?: string }[];
}

/** Every registry selector, normalized and de-duplicated, in registry order. */
function readRegistrySelectors(): string[] {
	const data = JSON.parse(readFileSync(registryPath, 'utf8')) as
		| RegistryRow[]
		| { layers?: RegistryLayer[] };
	const raw: string[] = [];
	if (Array.isArray(data)) {
		for (const row of data) if (row.class) raw.push(row.class);
	} else {
		for (const layer of data.layers ?? []) {
			for (const item of layer.items ?? []) {
				if (item.kind === 'class' && item.name) raw.push(item.name);
			}
		}
	}
	return [...new Set(raw.map(normalizeSelector).filter(Boolean))];
}

// ---------------------------------------------------------------------------
// CSS tree
// ---------------------------------------------------------------------------

interface RuleNode {
	type: 'rule';
	selector: string;
	body: string;
}
interface AtNode {
	type: 'at';
	prelude: string;
	children: CssNode[];
}
interface RawNode {
	type: 'raw';
	text: string;
}
type CssNode = RuleNode | AtNode | RawNode;

/**
 * Parse CSS into a tree. Comments are blanked (not removed) first so every
 * rule body can be sliced verbatim from the original text. Style rules have no
 * children in compiled CSS, so their body is captured as one slice.
 */
function parseCss(css: string): CssNode[] {
	const text = css.replace(/\/\*[\s\S]*?\*\//g, (m) => ' '.repeat(m.length));
	const root: AtNode = { type: 'at', prelude: '', children: [] };
	const stack: { node: AtNode; buf: string; rule?: RuleNode; bodyStart?: number }[] = [
		{ node: root, buf: '' }
	];

	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		const top = stack[stack.length - 1];
		if (ch === '{') {
			const prelude = top.buf.trim();
			top.buf = '';
			if (prelude.startsWith('@')) {
				const at: AtNode = { type: 'at', prelude, children: [] };
				top.node.children.push(at);
				stack.push({ node: at, buf: '' });
			} else {
				const rule: RuleNode = { type: 'rule', selector: prelude, body: '' };
				top.node.children.push(rule);
				stack.push({ node: top.node, buf: '', rule, bodyStart: i + 1 });
			}
		} else if (ch === '}') {
			const frame = stack.pop()!;
			if (frame.rule) {
				frame.rule.body = text.slice(frame.bodyStart, i).replace(/^\s*\n/, '').replace(/\s+$/, '');
			} else if (frame.buf.trim()) {
				frame.node.children.push({ type: 'raw', text: frame.buf.trim() });
			}
		} else {
			top.buf += ch;
		}
	}
	return root.children;
}

/** Keep rules that reference a registry class; drop raw blocks and empty at-rules. */
function filterNodes(nodes: CssNode[], classes: string[], used: Set<string>): CssNode[] {
	const out: CssNode[] = [];
	for (const node of nodes) {
		if (node.type === 'rule') {
			const hit = classes.filter((cls) => ruleReferences(node, cls));
			if (!hit.length) continue;
			for (const cls of hit) used.add(cls);
			out.push(node);
		} else if (node.type === 'at') {
			const children = filterNodes(node.children, classes, used);
			if (children.length) out.push({ ...node, children });
		}
	}
	return out;
}

const indentBody = (body: string, pad: string) =>
	body
		.split('\n')
		.map((line) => (line.trim() ? pad + line.trim() : line))
		.join('\n');

function serialize(nodes: CssNode[], depth = 0): string {
	const pad = '\t'.repeat(depth);
	return nodes
		.map((node) => {
			if (node.type === 'rule') {
				return `${pad}${node.selector} {\n${indentBody(node.body, pad + '\t')}\n${pad}}`;
			}
			if (node.type === 'at') {
				return `${pad}${node.prelude} {\n${serialize(node.children, depth + 1)}\n${pad}}`;
			}
			return `${pad}${node.text}`;
		})
		.join('\n\n');
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

const classes = readRegistrySelectors();
const { css: compiled } = sass.compile(entry, { style: 'expanded', sourceMap: false });
const tree = parseCss(compiled);
const used = new Set<string>();
const kept = filterNodes(tree, classes, used);
const output = serialize(kept);

const matched = classes.filter((cls) => used.has(cls));
const unmatched = classes.filter((cls) => !used.has(cls));

const version = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
const percent = classes.length ? Math.round((matched.length / classes.length) * 100) : 100;

const banner =
	`/*!\n` +
	` * fractalstyler v${version} — registry stylesheet (${matched.length}/${classes.length} classes, ${percent}%).\n` +
	` *\n` +
	` * GENERATED by scripts/build-registry-css.ts. Do not edit.\n` +
	` *\n` +
	` * Every rule below references at least one class in registry.json, with the\n` +
	` * authoritative declarations and real @media queries from src/lib/styles.\n` +
	` * Order is the source order, so the cascade is intact. Tokens (:root),\n` +
	` * [data-mode] themes and element resets are not registry classes and are\n` +
	` * therefore absent — see dist/css/fractalstyler.css for the full sheet.\n` +
	` *\n` +
	(unmatched.length
		? ` * Not represented in the compiled stylesheet (${unmatched.length}):\n` +
			unmatched.map((cls) => ` *   ${cls}`).join('\n') +
			'\n'
		: ` * Every registry class is represented.\n`) +
	` *\n` +
	` * MIT licensed. https://github.com/fractalmandala/fractalstyler\n` +
	` */\n`;

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${banner}\n${output}\n`, 'utf8');

const rel = outFile.startsWith(root + '/') ? outFile.slice(root.length + 1) : outFile;
console.log(`✔ registry CSS written: ${rel}`);
console.log(`    ${matched.length}/${classes.length} registry classes represented` + ` (${percent}%)`);
if (unmatched.length) {
	console.log(`    ${unmatched.length} not in compiled output — listed in the banner`);
}
