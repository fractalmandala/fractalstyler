#!/usr/bin/env node
// =============================================================================
// update-registry — the registry script.
//
// ONE script for the whole registry. Run it and the registry is up to date:
//
//   node scripts/update-registry.ts          → writes everything
//   node scripts/update-registry.ts --report → prints what it found, writes nothing
//
// The same file ships compiled (update-registry.js) and, in an ejected
// project, renamed to update-registry.mjs — the guard below accepts all three.
//
// It reads the stylesheets in src/lib/styles and writes:
//   registry.json                                    (the machine API)
//   registry.md                                      (the human index, at the root)
//   skills/fractalstyler/references/fractals.md      (the agent class list)
//   skills/fractalstyler/references/tokens.md        (the agent token list)
//
// Three parts, in order:
//   1. the extractor — the facts: which classes exist, what declares them
//   2. the vocabulary — what each class means
//   3. the writers  — where the registry is published
//
// The parser it shares with the other scripts lives in scripts/css.ts.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	classesIn,
	collectGlobalTokens,
	parseCss,
	splitSelectorList,
	type CssNode,
	type Token
} from './css.ts';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STYLES_DIR = path.join(PKG_ROOT, 'src', 'lib', 'styles');

export type RegistryKind = 'class' | 'modifier' | 'child' | 'variant';

export interface RegistryRow {
	/** '.gap-xs' — the class as it appears in a class attribute. */
	class: string;
	kind: RegistryKind;
	/** The class this one modifies or hangs off — '.box', '.avatar-group'. */
	parent: string | null;
	/** The selector the row was read from. */
	selector: string;
	/** The stylesheet that declares it. */
	file: string;
	/** Kept for the linter and the MCP filters: the file is the layer. */
	layer: string;
	/** The declarations, joined. */
	property: string;
	/** The media query the rule sits in, if any. */
	media: string | null;
}

/** Split a selector into its compounds on top-level combinators. */
function splitCompounds(selector: string): string[] {
	const out: string[] = [];
	let current = '';
	let depth = 0;
	for (const char of selector) {
		if (char === '[' || char === '(') depth++;
		else if (char === ']' || char === ')') depth--;
		if (depth === 0 && (char === '>' || char === '+' || char === '~' || /\s/.test(char))) {
			if (current.trim()) out.push(current.trim());
			current = '';
			continue;
		}
		current += char;
	}
	if (current.trim()) out.push(current.trim());
	return out;
}

/** '@media (min-width: 1025px)' → 'min-width: 1025px'. */
function compactMedia(params: string): string {
	return params.replace(/^@media\s*/, '').replace(/^\(|\)$/g, '').trim();
}

function propertyString(nodes: CssNode[]): string {
	const parts = nodes
		.filter((node): node is Extract<CssNode, { type: 'decl' }> => node.type === 'decl')
		.map((node) => node.text.replace(/\s+/g, ' ').trim())
		// A custom property is a scoped variable, not a style: it says nothing
		// about what the class looks like.
		.filter((text) => !text.startsWith('--'));
	const property = parts.join('; ');
	return property.length > 168 ? `${property.slice(0, 165)}…` : property;
}

/**
 * Read one stylesheet. Every class name that appears in any selector becomes a
 * row — a class only reaches markup on its own, so `.box.xcenter` must make
 * `xcenter` known on its own, with `.box` as its parent.
 *
 * Two passes: the first reads the rules whose subject carries a class (those
 * carry the declarations); the second picks up the classes that only ever
 * appear as ancestors — `.prose-content` in `.prose-content p` is a class a
 * consumer writes, so it must be in the registry.
 */
export function extractClasses(css: string, file: string, warnings: string[] = []): RegistryRow[] {
	const rows: RegistryRow[] = [];
	const seen = new Set<string>();

	const add = (row: RegistryRow): void => {
		if (seen.has(row.class)) return;
		seen.add(row.class);
		rows.push(row);
	};

	const walk = (
		nodes: CssNode[],
		media: string | null,
		visit: (selector: string, compounds: string[], property: string, media: string | null) => void
	): void => {
		for (const node of nodes) {
			if (node.type === 'at') {
				walk(node.children, node.name === 'media' ? compactMedia(node.params) : media, visit);
				continue;
			}
			if (node.type !== 'rule') continue;

			const property = propertyString(node.children);
			for (const selector of splitSelectorList(node.selector)) {
				if (selector.includes('&')) {
					// `&` is Sass nesting — invalid in plain CSS, so the browser
					// drops the whole rule. Say so instead of indexing a class
					// that never paints anything.
					warnings.push(`${file}: Sass nesting in a plain CSS file — "${selector}"`);
					continue;
				}
				visit(selector, splitCompounds(selector), property, media);
			}
		}
	};

	// Pass one — the subject carries a class.
	walk(parseCss(css), null, (selector, compounds, property, media) => {
		const subject = compounds[compounds.length - 1] ?? '';
		const subjectClasses = classesIn(subject);
		if (subjectClasses.length === 0) return;

		const ancestor = compounds.length > 1 ? compounds[compounds.length - 2] : null;
		const hasAttribute = /\[[^\]]+\]/.test(subject);
		const [base, ...rest] = subjectClasses;
		add({
			class: `.${base}`,
			kind: ancestor ? 'child' : hasAttribute ? 'variant' : 'class',
			parent: ancestor,
			selector,
			file,
			layer: file,
			property,
			media
		});
		for (const extra of rest) {
			add({
				class: `.${extra}`,
				kind: 'modifier',
				parent: `.${base}`,
				selector,
				file,
				layer: file,
				property,
				media
			});
		}
		// The classes of the ancestor compound are classes too — `.avatar-group
		// .circle` writes both of them in markup.
		if (ancestor) {
			for (const name of classesIn(ancestor)) {
				add({
					class: `.${name}`,
					kind: 'class',
					parent: null,
					selector,
					file,
					layer: file,
					property: '',
					media
				});
			}
		}
	});

	// Pass two — the subject is an element; the ancestor class still counts.
	walk(parseCss(css), null, (selector, compounds, property, media) => {
		const subject = compounds[compounds.length - 1] ?? '';
		if (classesIn(subject).length > 0) return;
		for (const name of classesIn(selector)) {
			add({
				class: `.${name}`,
				kind: 'class',
				parent: null,
				selector,
				file,
				layer: file,
				property: '',
				media
			});
		}
	});

	return rows;
}

/**
 * The stylesheet order — the cascade, and the order the documentation reads in.
 * A file that is not listed lands at the end, alphabetically.
 */
export const FILE_ORDER = [
	'configurations.css',
	'gaps-pads-margins.css',
	'shapes-sizes.css',
	'containers.css',
	'typography.css',
	'border-elevation-focus.css',
	'layout-shell.css',
	'colors-themes.css',
	'motion-animation.css',
	'components.css',
	'component-props.css',
	'responsive.css',
	'custom.css',
	'modular.css'
];

/** Every stylesheet in the styles folder, in cascade order. */
export function styleFiles(): string[] {
	if (!fs.existsSync(STYLES_DIR)) return [];
	const present = fs
		.readdirSync(STYLES_DIR)
		.filter((file) => file.endsWith('.css'));
	const ordered = FILE_ORDER.filter((file) => present.includes(file));
	const extra = present.filter((file) => !FILE_ORDER.includes(file)).sort();
	return [...ordered, ...extra];
}

export interface Extracted {
	rows: RegistryRow[];
	tokens: Token[];
	warnings: string[];
}

/** Extract the classes and the tokens of the whole stylesheet. */
export function extractRegistry(): Extracted {
	const rows: RegistryRow[] = [];
	const tokens: Token[] = [];
	const warnings: string[] = [];
	const seenTokens = new Set<string>();
	// A class is one class, however many stylesheets mention it: the first
	// mention wins, in cascade order.
	const seenClasses = new Set<string>();

	for (const file of styleFiles()) {
		const css = fs.readFileSync(path.join(STYLES_DIR, file), 'utf8');
		for (const row of extractClasses(css, file, warnings)) {
			if (seenClasses.has(row.class)) continue;
			seenClasses.add(row.class);
			rows.push(row);
		}
		for (const token of collectGlobalTokens(css)) {
			// First definition wins: the light theme precedes the dark one.
			if (seenTokens.has(token.name)) continue;
			seenTokens.add(token.name);
			tokens.push(token);
		}
	}
	return { rows, tokens, warnings };
}

// -----------------------------------------------------------------------------
// The vocabulary
// -----------------------------------------------------------------------------

const FILE_INTROS: Record<string, string> = {
	'configurations.css':
		'Global tokens and base resets — layout dimensions, z-index bands, font stacks, and the element resets every page starts from.',
	'gaps-pads-margins.css':
		'The space ladder. Every family runs the eight steps xs sm md bs lg xl 2xl 3xl and rides var(--space-*).',
	'shapes-sizes.css':
		'Radius and control-height ladders, plus the sizing utilities (full, min0, fitted).',
	'containers.css':
		'The structural foundations — .box, .row and .grid with their axis modifiers — plus positioning, scrolling, grid steps and frames.',
	'typography.css':
		'Type scale, semantic text roles, weight, line height, letter spacing and alignment.',
	'border-elevation-focus.css':
		'The partition-law border set (per side, three weights), elevation steps and the focus rings.',
	'layout-shell.css':
		'Application chrome — header, main, sidebars, footer and the content widths.',
	'colors-themes.css':
		'Colour roles. Name the role, never the value; the theme remaps the token.',
	'motion-animation.css':
		'Motion language — easings, durations and the keyframe animations.',
	'components.css':
		'Components — buttons, inputs, links, tags, avatars, switches, checkboxes.',
	'component-props.css':
		'Component props — the variant, shape and height classes Fractalsvelte UI consumes.',
	'responsive.css':
		'Visibility by breakpoint band. The bands are 769px, 1025px, 1281px, 1441px.',
	'custom.css':
		'The sanctioned extension layer — branding, the mascot, and anything a project owns.',
	'modular.css': 'The sveltemodular workspace chrome.'
};

/** The steps a family ladder runs. */
const STEPS = new Set(['xs', 'sm', 'md', 'bs', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full', '0']);

/** The family prefixes and what they mean. A family is a prefix plus a step. */
const FAMILY_PHRASES: Record<string, string> = {
	gap: 'Gap on both axes (flex/grid) at the {step} step',
	rgap: 'Row gap (block axis) at the {step} step',
	cgap: 'Column gap (inline axis) at the {step} step',
	pad: 'Padding on all four sides at the {step} step',
	px: 'Inline (horizontal) padding at the {step} step',
	py: 'Block (vertical) padding at the {step} step',
	pt: 'Top padding at the {step} step',
	pr: 'Right padding at the {step} step',
	pb: 'Bottom padding at the {step} step',
	pl: 'Left padding at the {step} step',
	mar: 'Margin on all four sides at the {step} step',
	mx: 'Inline (horizontal) margin at the {step} step',
	my: 'Block (vertical) margin at the {step} step',
	mt: 'Top margin at the {step} step',
	mr: 'Right margin at the {step} step',
	mb: 'Bottom margin at the {step} step',
	ml: 'Left margin at the {step} step',
	text: 'Text size at the {step} step',
	'text-static': 'Fixed text size at the {step} step',
	'text-fluid': 'Fluid (clamped) text size at the {step} step',
	radius: 'Corner radius at the {step} step',
	h: 'Control height at the {step} step',
	shad: 'Elevation at the {step} step',
	'shad-hover': 'Elevation on hover at the {step} step',
	weight: 'Font weight {n}',
	lh: 'Line height {n}',
	'ls-tight': 'Tight letter spacing at the {step} step',
	'ls-wide': 'Wide letter spacing at the {step} step',
	grid: 'Grid with {n} columns',
	cspan: 'Span {n} grid columns',
	z: 'Z-index band {n}'
};

/**
 * Descriptions for the classes whose declarations alone do not explain the
 * intent. Everything else is described by its family, or by its declarations.
 */
const CURATED: Record<string, string> = {
	// containers
	'.box': 'Flex column container — the vertical structural foundation',
	'.column': 'Flex column container — the vertical structural foundation',
	'.row': 'Flex row container — the horizontal structural foundation',
	'.grid': 'CSS grid container — the third structural foundation',
	'.wrap': 'Allow flex wrapping',
	'.grow': 'Flex grow — take the remaining space (flex: 1 1 0%)',
	'.shrink-0': 'Never shrink below the content size',
	'.relative': 'position: relative — the anchor for absolute children',
	'.absolute': 'position: absolute',
	'.fixed': 'position: fixed',
	'.sticky': 'position: sticky',
	'.isolate': 'Create a stacking context',
	'.scroll-y': 'Scroll vertically',
	'.scroll-x': 'Scroll horizontally',
	'.overflow-hidden': 'Clip the overflow',
	'.overflow-visible': 'Let the overflow show',
	'.inline': 'display: inline',
	'.block': 'display: block',
	'.inline-block': 'display: inline-block',
	'.inline-flex': 'display: inline-flex',
	'.inline-grid': 'display: inline-grid',
	'.contents': 'display: contents — the box disappears, the children remain',
	'.table': 'display: table',
	'.display-none': 'display: none',
	'.prose': 'Reading measure — a clamped content width',
	'.prose-left': 'Reading measure, aligned to the start edge',
	'.reel': 'Scroll-snap rail — the children snap to the rail',
	'.card-grid': 'Auto-fit card grid — the column count negotiates the width',
	'.bdr': 'Debug outline — flags an element on screen with a border',
	'.flex-shrink': 'Allow shrinking again — undoes .shrink-0',
	'.xinherit': 'Take the parent container\'s alignment on the x axis',
	'.yinherit': 'Take the parent container\'s alignment on the y axis',
	'.scroll-menu': 'A list that scrolls past 16rem — dropdown and option lists',
	'.pointer': 'Pointer cursor for clickable rows and labels that are not buttons',
	'.touch-none': 'No touch scrolling — for drag surfaces like sliders and pads',
	'.sr-only': 'Visually hidden, still focusable and read by screen readers',
	'.fit-cover': 'object-fit: cover — media fills and crops',
	'.fit-contain': 'object-fit: contain — media fits whole, letterboxed',
	'.fit-fill': 'object-fit: fill — media stretches to the box',
	'.fit-scale-down': 'object-fit: scale-down — never larger than its natural size',
	'.pin-tl': 'Pinned to the top-left corner of the nearest positioned parent',
	'.pin-tr': 'Pinned to the top-right corner of the nearest positioned parent',
	'.pin-bl': 'Pinned to the bottom-left corner of the nearest positioned parent',
	'.pin-br': 'Pinned to the bottom-right corner of the nearest positioned parent',
	'.pad-none': 'No padding — clears what an element brings with it',

	// shells
	'.app-shell': 'Application shell root — flex column, full height, hosts the header, main and footer',
	'.app-header': 'Sticky application header',
	'.app-main': 'Main region between header and footer — flex row, fitted to the viewport',
	'.main-section': 'Primary content column inside .app-main',
	'.sidebar-left': 'Left rail — nav role; off-canvas drawer on narrow screens',
	'.sidebar-right': 'Right rail — table of contents',
	'.app-footer': 'Application footer',
	'.content-section': 'Page content block — responsive padding and narrow width modes',
	'.clamped': 'Clamp to the content width and centre',
	'.solo': 'The main section is the only column',
	'.null': 'No width constraint',
	'.narrow-half': 'Half the content width',
	'.narrow-wide': 'Wide content width',
	'.narrow-full': 'Full content width',
	'.page-header': 'A page\'s title block — flex column for the breadcrumb, title and description',

	// components
	'.button': 'The button — variant, shape and size come from the prop classes',
	'.btn': 'Call-to-action button',
	'.button-group': 'Buttons joined into one control',
	'.split-button': 'A button with a separate action area',
	'.input': 'Text input — themed field with a focus ring',
	'.select': 'Select dropdown — themed field with a chevron',
	'.select-wrap': 'The frame around a select and its chevron',
	'.select-chevron': 'The chevron inside a select frame',
	'.link': 'Themed link — theme colour, alternative on hover',
	'.link-plain': 'Plain link — inherits the ink, theme colour on hover',
	'.link-parent': 'Link block — hovers the colour of its .link-title child',
	'.link-title': 'The title inside a .link-parent',
	'.nav-link': 'Nav link — padded, curved, filled on hover',
	'.tag': 'Small inline label',
	'.tag-remove': 'The remove control inside a tag',
	'.badge': 'Count badge',
	'.ink-auto': 'Pick white or near-black ink from the fill behind it (--tag-color on a tag, --ink-bg elsewhere)',
	'.text-only': 'A tag with no fill — text only',
	'.avatar-group': 'A group of avatars — stacked or in a row',
	'.avatar-more': 'The overflow avatar in an avatar group',
	'.gap-overlap': 'Overlap the avatars in the group',
	'.circle': 'Round avatars',
	'.rounded': 'Rounded-square avatars',
	'.switch-box': 'The switch track and thumb',
	'.checkbox-box': 'The checkbox box',
	'.slide-unlock': 'Slide-to-unlock control',
	'.card-clickable': 'A card that responds to clicks',
	'.disabled': 'Disabled state',
	'.is-invalid': 'Invalid state — the field failed validation',
	'.fitted': 'The input is fitted to its container',
	'.variant': 'Variant marker',
	'.vertical': 'Stack the group vertically',
	'.no-scaling': 'Opt a button out of the press scale',
	'.btn-icon': 'Square icon button — no padding, never shrinks, sized by its .h-* class',
	'.fit-icon': 'Icon button that is exactly its icon — no padding or border, sized by the icon',
	'.field': 'A framed control — the frame shows focus for the input inside it',
	'.collapse': 'Opens and closes by height — add .open to open',
	'.open': 'Open state',
	'.card': 'A card — its size class sets the text scale, never the height',
	'.card-sized': 'Scale a card\'s title, description, label and sub text with its size',
	'.banner': 'A banner — its size class sets padding and text size, height follows content',
	'.tint': 'Soft status fill — the status colour mixed into the panel fill',
	'.data-table': 'A table of records — collapsed borders, quiet header row, row hover',
	'.data-table-select': 'The narrow checkbox column of a data table',
	'.data-table-empty': 'The centred cell shown when a data table has no rows',
	'.striped': 'Shade every other row',
	'.ribbon-bookmark': 'The notched bottom edge of a bookmark ribbon',
	'.carousel-track': 'Drag-to-scroll on top of .reel — no scrollbar, grab cursors',
	'.is-draggable': 'Shows the grab cursor on a draggable track',
	'.is-dragging': 'A drag in progress — no snapping, no pointer events inside',
	'.track-min': 'Minimum width of a horizontal slider track',
	'.track-v': 'An upright slider track — its .h-* class sets the thickness',

	// component props
	'.primary': 'Primary variant — the default fill',
	'.secondary': 'Secondary variant — a quieter fill',
	'.themed': 'Themed variant — filled with the theme colour',
	'.outline': 'Outline variant — border only',
	'.ghost': 'Ghost variant — no fill until hover',
	'.info': 'Status variant — the info colour',
	'.success': 'Status variant — the success colour',
	'.warning': 'Status variant — the warning colour',
	'.danger': 'Status variant — the danger colour',
	'.selected': 'Selected state — the current item in a set',
	'.active': 'Active state',
	'.rect': 'Shape prop — square corners',
	'.mincurved': 'Shape prop — a small radius',
	'.modern': 'Shape prop — the default radius',
	'.curved': 'Shape prop — a large radius',
	'.round': 'Shape prop — fully round',
	'.msg': 'Message fill — the status scale\'s soft fill, border and ink (with .info, .success, .warning, .danger or .neutral)',
	'.neutral': 'Status — the neutral tone',
	'.hgrow': 'The size class becomes a minimum height; the control grows with its content',

	// colours
	'.bg': 'The page background',
	'.bg-main': 'The page background',
	'.bg-surface': 'Surface fill — cards, panels, inputs',
	'.bg-panel': 'Panel fill — one step below the surface',
	'.bg-input': 'Input fill',
	'.bg-overlay': 'Overlay fill — opaque, for menus, popovers, dialogs and drawers',
	'.bg-none': 'No background',
	'.bg-black': 'Fixed black fill',
	'.bg-button': 'Button fill',
	'.bg-button-secondary': 'Secondary button fill',
	'.state-hover': 'The hover fill',
	'.state-selected': 'The selected fill',
	'.text-primary': 'Primary ink',
	'.text-secondary': 'Secondary ink',
	'.text-muted': 'Muted ink',
	'.text-inverse': 'Ink for a filled surface',
	'.text-white': 'Fixed white ink',
	'.text-black': 'Fixed black ink',
	'.text-theme': 'Theme colour ink',
	'.text-theme-up': 'Theme colour, one step up',
	'.text-theme-down': 'Theme colour, one step down',
	'.text-success': 'Success ink',
	'.text-warning': 'Warning ink',
	'.text-danger': 'Danger ink',
	'.text-info': 'Info ink',
	'.bg-success': 'Success fill',
	'.bg-warning': 'Warning fill',
	'.bg-danger': 'Danger fill',
	'.bg-info': 'Info fill',

	// borders and elevation
	'.border': 'Full border at the standard weight',
	'.border-subtle': 'Full border at the subtle weight',
	'.border-strong': 'Full border at the strong weight',
	'.focus-ring': 'The default focus ring',
	'.focus-theme': 'A focus ring in the theme colour',
	'.focus-none': 'No focus ring',

	// motion
	'.mode-wipe': 'On <html> — disables view transitions while a colour-mode wipe runs',
	'.anim-spin': 'Spin — a continuous rotation',
	'.anim-fade-out': 'Fade out',

	// responsive
	'.md-only': 'Visible from the md band up (1025px)',
	'.lg-only': 'Visible from the lg band up (1281px)',
	'.xl-only': 'Visible from the xl band up (1441px)',
	'.md-hide': 'Hidden from the md band up (1025px)',
	'.lg-hide': 'Hidden from the lg band up (1281px)',
	'.xl-hide': 'Hidden from the xl band up (1441px)',
	'.anim-pulse': 'Pulse — a fade in and out',
	'.anim-fade-in': 'Fade in',

	// typography roles
	'.text-body': 'Body copy at the base size',
	'.text-body-lg': 'Body copy at the large size',
	'.text-body-sm': 'Body copy at the small size',
	'.page-title': 'Page title — the largest type on the page',
	'.page-desc': 'Page description — large and airy',
	'.page-heading-xl': 'Page heading, xl rung',
	'.page-heading-lg': 'Page heading, lg rung',
	'.page-heading-bs': 'Page heading, base rung',
	'.card-title': 'Card title',
	'.card-desc': 'Card description',
	'.nav-header': 'Nav group header',
	'.tt-u': 'Text transform — uppercase',
	'.tt-c': 'Text transform — capitalize',
	'.ta-c': 'Text align — centre',
	'.ta-l': 'Text align — left',
	'.ta-r': 'Text align — right',
	'.mleft': 'Keep the reading measure on the left when the text is centred',
	'.truncate': 'One-line ellipsis truncation',
	'.font-sans': 'The sans font stack',
	'.font-mono': 'The monospace font stack',
	'.prose-content': 'Prose content — the reading measure of a long text',
	'.doc-element': 'An element inside prose content',

	// sizing
	'.wfull': 'Full width',
	'.hfull': 'Full height',
	'.wmax': 'Max width',
	'.hmax': 'Max height',
	'.full': 'Full width and height',
	'.wmin0': 'Zero min-width',
	'.hmin0': 'Zero min-height',
	'.min0': 'Zero min-width and min-height',
	'.hfull-dvh': 'Full viewport height',
	'.hfull-fitted': 'Full viewport height, fitted between the header and the footer',

	// custom layer
	'.site-logomotif': 'Site logo motif — scales on hover',
	'.logotype': 'Logotype — the wordmark',
	'.project-circle': 'Project dot',
	'.mascot': 'The mascot — the site character',
	'.mascot-bob': 'The mascot bobs',
	'.mascot-tilt': 'The mascot tilts',
	'.mascot-base': 'The mascot body',
	'.mascot-overlay': 'The mascot overlay',
	'.mascot-mask': 'The mascot mask',
	'.mascot-pupil-l': 'The mascot left pupil',
	'.mascot-pupil-r': 'The mascot right pupil',
	'.mascot-gloss': 'The mascot gloss',
	'.mascot-shade': 'The mascot shade',
	'.mascot-lid': 'The mascot eyelid'
};

/** The family a class belongs to, if it is one. */
function familyOf(name: string): { prefix: string; step: string } | null {
	const lineHeight = name.match(/^lh(\d+(?:\.\d+)?)$/);
	if (lineHeight) return { prefix: 'lh', step: lineHeight[1] };
	const dash = name.lastIndexOf('-');
	if (dash <= 0) return null;
	const prefix = name.slice(0, dash);
	const step = name.slice(dash + 1);
	if (!FAMILY_PHRASES[prefix]) return null;
	if (!STEPS.has(step) && !/^\d+(\.\d+)?$/.test(step)) return null;
	return { prefix, step };
}

/** The token a class rides, if it rides one. */
function ridesToken(property: string): string | null {
	const match = property.match(/var\((--[\w-]+)/);
	return match ? match[1] : null;
}

export interface VocabEntry {
	class: string;
	kind: string;
	parent: string | null;
	file: string;
	property: string;
	description: string;
	example: string;
	media: string | null;
}

/** The description of one class. */
export function describe(row: RegistryRow): string {
	const name = row.class.replace(/^\./, '');
	const curated = CURATED[row.class];
	if (curated) return curated;

	const family = familyOf(name);
	if (family) {
		// `.lh13` is line-height 1.3 — the class name carries tenths.
		const step =
			family.prefix === 'lh' && /^\d+$/.test(family.step)
				? (Number(family.step) / 10).toFixed(1)
				: family.step === 'full'
					? 'full'
					: family.step;
		const phrase = FAMILY_PHRASES[family.prefix]
			.replace('{n}', step)
			.replace('{step}', step);
		const token = ridesToken(row.property);
		return token ? `${phrase} — rides ${token}` : phrase;
	}

	const first = row.property.split(';')[0]?.trim();
	switch (row.kind) {
		case 'modifier':
			return `${first || row.class} — modifier of ${row.parent}`;
		case 'child':
			return `${first || row.class} — child of ${row.parent}`;
		case 'variant':
			return `${first || row.class} — attribute variant`;
		default:
			return first || `${row.class} rule`;
	}
}

/** Example markup for one class. */
export function exampleFor(row: RegistryRow): string {
	const name = row.class.replace(/^\./, '');
	if (row.kind === 'child' && row.parent) {
		return `<div class="${row.parent.replace(/^\./, '')}"><span class="${name}">…</span></div>`;
	}
	if (row.parent) return `<div class="${row.parent.replace(/^\./, '')} ${name}">…</div>`;
	return `<div class="${name}">…</div>`;
}

// -----------------------------------------------------------------------------
// The writers
// -----------------------------------------------------------------------------

function orderedFiles(rows: VocabEntry[]): string[] {
	const present = new Set(rows.map((row) => row.file));
	const ordered = FILE_ORDER.filter((file) => present.has(file));
	const extra = [...present].filter((file) => !FILE_ORDER.includes(file)).sort();
	return [...ordered, ...extra];
}

function renderRegistryMarkdown(rows: VocabEntry[], tokenCount: number): string {
	const lines: string[] = [
		'# Fractalstyler — Class Registry',
		'',
		'> GENERATED FILE — do not edit. Emitted by `scripts/update-registry.ts` from the',
		'> stylesheets in `src/lib/styles`.',
		'',
		`**${rows.length} classes** across **${new Set(rows.map((r) => r.file)).size} stylesheets**, riding **${tokenCount} tokens**.`,
		'',
		'These classes are the entire public API. There is no authoring mixin and no',
		'styling function — `+stack`, `+surface`, `space()` and their friends do not',
		'exist. Compose in markup.',
		'',
		'Every class is concrete: the space families (`.gap` `.rgap` `.cgap` `.pad`',
		'`.px` `.py` `.pt` `.pr` `.pb` `.pl` `.mar` `.mx` `.my` `.mt` `.mr` `.mb` `.ml`)',
		'each run the eight steps `xs sm md bs lg xl 2xl 3xl`, token-routed through',
		'`var(--space-*)`. A modifier rides its base (`.box.xcenter`); a child carries',
		'its own name and names its parent (`.avatar-more` inside `.avatar-group`).',
		''
	];

	for (const file of orderedFiles(rows)) {
		const items = rows.filter((row) => row.file === file);
		if (items.length === 0) continue;
		lines.push('', `---`, '', `## ${file}`, '');
		if (FILE_INTROS[file]) lines.push(FILE_INTROS[file], '');
		lines.push('| Class | Property | Description |', '|:---|:---|:---|');
		for (const item of items) {
			const property = item.property ? `\`${item.property.replace(/\|/g, '\\|')}\`` : '—';
			lines.push(
				`| \`${item.class}\` | ${property} | ${item.description.replace(/\|/g, '\\|')} |`
			);
		}
	}

	lines.push('');
	return lines.join('\n');
}

function renderSkillReference(rows: VocabEntry[], tokenCount: number): string {
	let md = `# Fractalstyler — Class Reference\n\n`;
	md += `GENERATED FILE — do not edit. Emitted by \`scripts/update-registry.ts\` from the\n`;
	md += `stylesheets in \`src/lib/styles\`. ${rows.length} classes across ${tokenCount} tokens.\n\n`;
	md += `**The classes below are the entire public API.** The system defines no\n`;
	md += `authoring mixins and no styling functions — \`+stack\`, \`+surface\`, \`space()\` and\n`;
	md += `friends do not exist. Compose in markup.\n\n`;
	md += `Every class is concrete. Space families (\`.gap\` \`.rgap\` \`.cgap\` \`.pad\` \`.px\` \`.py\`\n`;
	md += `\`.pt\` \`.pr\` \`.pb\` \`.pl\` \`.mar\` \`.mx\` \`.my\` \`.mt\` \`.mr\` \`.mb\` \`.ml\`) each ride the\n`;
	md += `eight steps: \`xs sm md bs lg xl 2xl 3xl\`, token-routed through \`var(--space-*)\`.\n`;
	md += `Modifiers nest under their base (\`.box\` \`.xcenter\`), children carry their own\n`;
	md += `name (\`.avatar-more\`).\n\n`;

	for (const file of orderedFiles(rows)) {
		const items = rows.filter((row) => row.file === file);
		if (items.length === 0) continue;
		md += `\n---\n\n## ${file}\n\n`;
		if (FILE_INTROS[file]) md += `${FILE_INTROS[file]}\n\n`;
		md += `| Class | Applies | Source |\n|:---|:---|:---|\n`;
		for (const item of items) {
			const applies = (item.description || item.property).replace(/\|/g, '\\|');
			md += `| \`${item.class}\` | ${applies} | \`${item.file}\` |\n`;
		}
	}

	md += `\n---\n\n## Semantic Tokens\n\n\`\`\`css\n`;
	for (const token of TOKEN_REFERENCE.tokens) md += `  ${token.name}: ${token.value};\n`;
	md += `\`\`\`\n`;
	return md;
}

const TOKEN_GROUPS: { title: string; blurb: string; match: (name: string) => boolean }[] = [
	{
		title: 'Space Scale',
		blurb: 'Every step feeds the gap, pad and margin families.',
		match: (name) => name.startsWith('--space-')
	},
	{
		title: 'Type Scale',
		blurb: 'Fixed sizes up to base, then fluid (clamped) sizes above it.',
		match: (name) => name.startsWith('--text-')
	},
	{
		title: 'Radius',
		blurb: 'Six channels. Compositions read the tokens, never a literal radius.',
		match: (name) => name.startsWith('--radius-')
	},
	{
		title: 'Control Heights',
		blurb: 'Heights for inputs, selects and buttons.',
		match: (name) => name.startsWith('--h-')
	},
	{
		title: 'Motion Language',
		blurb: 'Durations, easings and the composed channels every transition reads.',
		match: (name) => /^--(speed|trans|motion|ease)/.test(name)
	},
	{
		title: 'Colour Roles',
		blurb: 'Name the role, never the value. Values shown are the light default; `[data-mode=\'dark\']` remaps them.',
		match: (name) =>
			/^--(white-fixed|black-fixed|bg|state|border|theme|success|warning|danger|info|ring)/.test(name)
	},
	{
		title: 'Elevation',
		blurb: 'The shadow channels the `.shad-*` classes read.',
		match: (name) => name.startsWith('--shadow-')
	},
	{
		title: 'Breakpoints',
		blurb: 'Reference values — CSS media queries cannot consume custom properties, so the bands are written as literals to match.',
		match: (name) => name.startsWith('--bp-')
	},
	{
		title: 'Layout & Chrome',
		blurb: 'Font stacks plus the page geometry the shells read.',
		match: (name) =>
			/^--(font|header-height|footer-height|fit-height|prose-clamp|content-clamp|app-inline|card-min|sidebar-width|z-|avatar|switch)/.test(
				name
			)
	}
];

function renderTokenReference(
	tokens: { name: string; value: string }[]
): string {
	let md = `# Fractalstyler — Token Reference\n\n`;
	md += `GENERATED FILE — do not edit. Emitted by \`scripts/update-registry.ts\` from the\n`;
	md += `custom properties declared in a global scope in \`src/lib/styles/*.css\`.\n\n`;
	md += `Every \`--space-*\` step is a class family: if \`--space-md\` exists, so do\n`;
	md += `\`.gap-md\`, \`.pad-md\` and \`.mar-md\` (plus the \`.px\`/\`.py\`/\`.pt\` sides).\n`;
	md += `There is no second vocabulary to learn.\n\n`;

	for (const group of TOKEN_GROUPS) {
		const items = tokens.filter((token) => group.match(token.name));
		if (items.length === 0) continue;
		md += `\n## ${group.title}\n\n${group.blurb}\n\n`;
		md += `| Token | Value |\n|:---|:---|\n`;
		for (const token of items) md += `| \`${token.name}\` | \`${token.value.replace(/\|/g, '\\|')}\` |\n`;
	}

	return md;
}

// -----------------------------------------------------------------------------
// Run
// -----------------------------------------------------------------------------

/** The tokens of the stylesheet, in the order the registry records them. */
const TOKEN_REFERENCE = { tokens: [] as { name: string; value: string }[] };

export function buildRegistry(): { rows: VocabEntry[]; tokens: { name: string; value: string }[] } {
	const { rows, tokens, warnings } = extractRegistry();
	const entries: VocabEntry[] = rows.map((row) => ({
		class: row.class,
		kind: row.kind,
		parent: row.parent,
		file: row.file,
		property: row.property,
		description: describe(row),
		example: exampleFor(row),
		media: row.media
	}));
	TOKEN_REFERENCE.tokens = tokens.map((token) => ({ name: token.name, value: token.value }));
	for (const warning of warnings) console.warn(`  ⚠ ${warning}`);
	return { rows: entries, tokens: TOKEN_REFERENCE.tokens };
}

export function writeRegistry(): { rows: VocabEntry[]; tokens: { name: string; value: string }[] } {
	const { rows, tokens } = buildRegistry();

	fs.writeFileSync(path.join(PKG_ROOT, 'registry.json'), `${JSON.stringify(rows, null, 2)}\n`, 'utf8');
	fs.writeFileSync(path.join(PKG_ROOT, 'registry.md'), renderRegistryMarkdown(rows, tokens.length), 'utf8');

	const references = path.join(PKG_ROOT, 'skills', 'fractalstyler', 'references');
	fs.mkdirSync(references, { recursive: true });
	fs.writeFileSync(path.join(references, 'fractals.md'), renderSkillReference(rows, tokens.length), 'utf8');
	fs.writeFileSync(path.join(references, 'tokens.md'), renderTokenReference(tokens), 'utf8');

	return { rows, tokens };
}

if (process.argv[1] && /update-registry\.(ts|js|mjs)$/.test(process.argv[1])) {
	if (process.argv.includes('--report')) {
		// Report what the extractor sees, and write nothing.
		const { rows, tokens, warnings } = extractRegistry();
		const byFile = new Map<string, number>();
		for (const row of rows) byFile.set(row.file, (byFile.get(row.file) ?? 0) + 1);
		console.log(`✔ Extracted ${rows.length} classes and ${tokens.length} tokens.`);
		for (const [file, count] of byFile) console.log(`  ${file.padEnd(30)} ${count}`);
		for (const warning of warnings) console.log(`  ⚠ ${warning}`);
	} else {
		const { rows, tokens } = writeRegistry();
		console.log(`✔ Registry written: ${rows.length} classes, ${tokens.length} tokens.`);
		console.log('  Emit: registry.json, registry.md, skills/fractalstyler/references/{fractals,tokens}.md');
	}
}
