#!/usr/bin/env node
// =============================================================================
// fractalstyler — Model Context Protocol (MCP) Server
//
// Interactive styling co-pilot for AI agents designing and authoring UI with
// the closed-world Fractalstyler design system.
//
// Exposes:
//   - guide_styling: Intent-driven guidance (gap, typography, layout, cards, etc.)
//   - search_classes: Search & filter across every canonical class in registry.json
//   - get_tokens: Design tokens dictionary & fluid scales
//   - snap_to_tokens: Snaps raw pixel values to nearest canonical token classes
//   - get_recipes: Verified canonical recipes (segmented control, search bar, etc.)
//   - css_to_classes: Converts raw CSS declarations into composed markup classes
//   - lint_markup: Validates markup against closed-world styling contracts
//   - get_system_rules: Rules, progressive discovery index, and constraints
//
// Source is TypeScript (mcp/server.mts, run directly on Node 24 in the repo);
// the published bin is the mcp/server.mjs that `pnpm build:runtime` emits.
// =============================================================================

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
	CallToolRequestSchema,
	ListToolsRequestSchema,
	ListResourcesRequestSchema,
	ReadResourceRequestSchema,
	ListPromptsRequestSchema,
	GetPromptRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findClosestMatches } from '../lint/lib/fuzzy.mts';

// --- Types ---------------------------------------------------------------------

/** The registry.json row fields this server reads. */
interface RegistryEntry {
	class: string;
	layer: string;
	property?: string;
	description?: string;
	example?: string;
	file?: string;
}

/** A data/recipes.json recipe; only the filter fields are typed — the rest passes through. */
interface Recipe {
	id: string;
	name: string;
	intents?: string[];
	[field: string]: unknown;
}

interface McpDiagnostic {
	severity: 'error';
	rule: string;
	message: string;
}

/** Tool arguments, as the input schemas below declare them. */
interface ToolArgs {
	query?: string;
	context?: string;
	layer?: string;
	limit?: number;
	scale?: string;
	gap?: number;
	padding?: number;
	fontSize?: number;
	radius?: number;
	pattern?: string;
	css?: string;
	code?: string;
}

const errorMessage = (error: unknown) => (error as Error).message;

const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const PKG_JSON = (() => {
	try {
		return JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf8'));
	} catch {
		return { name: '@fractaldesign/fractalstyler', version: '1.1.0' };
	}
})();

const VERSION = PKG_JSON.version || '1.1.0';

// -----------------------------------------------------------------------------
// Data Loaders
// -----------------------------------------------------------------------------

const REGISTRY = ((): RegistryEntry[] => {
	try {
		const regPath = join(PKG_ROOT, 'registry.json');
		const parsed = JSON.parse(readFileSync(regPath, 'utf8'));
		if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('registry.json is empty');
		return parsed;
	} catch (error) {
		// Never fail silently: with no registry, VALID_CLASSES is empty and
		// lint_markup would flag every class in correct markup as unknown.
		// Run `pnpm registry` (or `pnpm build`) to regenerate it.
		process.stderr.write(`[fractalstyler-mcp] could not load registry.json: ${errorMessage(error)}\n`);
		return [];
	}
})();

const REGISTRY_LOADED = REGISTRY.length > 0;

const VALID_CLASSES = new Set<string>();
for (const r of REGISTRY) {
	const raw = r.class || '';
	for (const m of raw.matchAll(/\.([a-zA-Z][\w-]*)/g)) {
		VALID_CLASSES.add(m[1]);
	}
}

const RECIPES = ((): Recipe[] => {
	try {
		const recPath = join(PKG_ROOT, 'data', 'recipes.json');
		const data = JSON.parse(readFileSync(recPath, 'utf8'));
		return data.recipes || [];
	} catch (error) {
		process.stderr.write(`[fractalstyler-mcp] could not load data/recipes.json: ${errorMessage(error)}\n`);
		return [];
	}
})();

const ALL_RECIPES = [...RECIPES];

// -----------------------------------------------------------------------------
// Token Catalogs & Scales
// -----------------------------------------------------------------------------

const TOKEN_CATALOG = {
	space: {
		description: 'Space scale across 8 canonical steps. Token: var(--space-*). Utility classes: .gap-*, .rgap-*, .cgap-*, .pad-*, .px-* (inline), .py-* (block), .pt-*/.pr-*/.pb-*/.pl-*, .mar-*, .mx-*, .my-*',
		steps: ['xs', 'sm', 'md', 'bs', 'lg', 'xl', '2xl', '3xl'],
		approxPx: {
			xs: 4,
			sm: 8,
			md: 12,
			bs: 16,
			lg: 24,
			xl: 32,
			'2xl': 48,
			'3xl': 64
		},
		examples: ['.gap-xs', '.gap-sm', '.gap-md', '.pad-sm', '.pad-md', '.px-md', '.py-sm', '.mar-sm']
	},
	typography: {
		description: 'Fluid typography scale from xs to 5xl. Token: var(--text-*). Utility classes: .text-xs .. .text-5xl',
		steps: ['xs', 'sm', 'md', 'bs', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
		approxPx: {
			xs: 11,
			sm: 12,
			md: 14,
			bs: 16,
			lg: 20,
			xl: 25,
			'2xl': 31,
			'3xl': 39,
			'4xl': 49,
			'5xl': 61
		},
		roles: {
			'.page-title': 'Macro page header (text-3xl weight-700 tracking-tight)',
			'.card-title': 'Card heading (text-lg weight-600)',
			'.nav-link': 'Navigation item (text-sm weight-500)',
			'.text-primary': 'High-contrast primary foreground ink (var(--text-primary))',
			'.text-secondary': 'Medium-contrast supporting text (var(--text-secondary))',
			'.text-muted': 'Low-contrast metadata or placeholder text (var(--text-muted))',
			'.truncate': 'Ellipsis truncation (overflow: hidden; text-overflow: ellipsis; white-space: nowrap)'
		},
		weights: ['.weight-300', '.weight-400', '.weight-500', '.weight-600', '.weight-700', '.weight-800'],
		lineHeights: ['.lh11', '.lh12', '.lh13', '.lh14', '.lh15', '.lh16']
	},
	radius: {
		description: 'Six corner radius steps. Token: var(--radius-*). Utility classes: .radius-*',
		steps: ['xs', 'sm', 'md', 'bs', 'lg', 'full'],
		approxPx: {
			xs: 2,
			sm: 4,
			md: 8,
			bs: 16,
			lg: 32,
			full: 9999
		},
		examples: ['.radius-xs', '.radius-sm', '.radius-md', '.radius-bs', '.radius-lg', '.radius-full']
	},
	shadows: {
		description: 'Elevation shadows. Token: var(--shadow-*). Utility classes: .shadow-*',
		steps: ['xs', 'sm', 'md', 'bs', 'lg', 'xl', '2xl', '3xl'],
		examples: ['.shadow-xs', '.shadow-sm', '.shadow-md', '.shadow-lg', '.shadow-xl', '.shadow-3xl']
	},
	surfaces: {
		description: 'Semantic surface & background classes.',
		classes: {
			'.bg-main': 'Base page background (var(--bg))',
			'.bg-surface': 'Standard content card / surface background (var(--bg-surface))',
			'.bg-panel': 'Container panel background (var(--bg-panel))',
			'.bg-sunken': 'Sunken container background (var(--bg-sunken))',
			'.bg-raised': 'Elevated surface background (var(--bg-raised))',
			'.bg-extra': 'Extra layered surface background (var(--bg-extra))',
			'.bg-success': 'Positive status fill (var(--success))',
			'.bg-warning': 'Caution status fill (var(--warning))',
			'.bg-danger': 'Destructive status fill (var(--danger))',
			'.bg-info': 'Informational status fill (var(--info))',
			'.border': '1px solid border using var(--border)',
			'.border-subtle': 'Subtle hairline border using var(--border-subtle)',
			'.border-strong': 'High contrast border using var(--border-strong)',
			'.bt': 'Top partition border (1px solid var(--border))',
			'.br': 'Right partition border',
			'.bb': 'Bottom partition border',
			'.bl': 'Left partition border',
			'.bt-str / .br-str / .bb-str / .bl-str': 'Per-side border at var(--border-strong)',
			'.bt-sub / .br-sub / .bb-sub / .bl-sub': 'Per-side border at var(--border-subtle)'
		},
		note: 'There are no .border-top / .border-bottom classes — use .bt / .bb. There are no bare .surface / .raised / .panel classes — use .bg-surface / .bg-raised / .bg-panel.'
	}
};

// Nearest token helper
function snapNearest(val: number, map: Record<string, number>): { token: string; approxPx: number; diff: number } {
	let best = Object.keys(map)[0];
	let minDiff = Math.abs(val - map[best]);
	for (const [token, px] of Object.entries(map)) {
		const diff = Math.abs(val - px);
		if (diff < minDiff) {
			minDiff = diff;
			best = token;
		}
	}
	return { token: best, approxPx: map[best], diff: minDiff };
}

// -----------------------------------------------------------------------------
// Intent Guider Logic
// -----------------------------------------------------------------------------

function guideStyling(query: string, context = ''): { title: string; guidance: string }[] {
	const q = `${query} ${context}`.toLowerCase();
	const sections: { title: string; guidance: string }[] = [];

	// 1. Spacing / Gap / Padding / Margin
	if (/gap|space|pad|padding|mar|margin|inset|distance/.test(q)) {
		sections.push({
			title: 'Spacing & Dimensions (Layer L1)',
			guidance: `Fractalstyler uses an 8-step spacing ladder rideable through utility classes or var(--space-*).
Canonical steps: xs (4px) → sm (8px) → md (12px) → bs (16px) → lg (24px) → xl (32px) → 2xl (48px) → 3xl (64px).

• Gap:
  - Both axes (flex/grid): .gap-xs, .gap-sm, .gap-md, .gap-lg...
  - Row gap (block axis): .rgap-xs, .rgap-sm, .rgap-md...
  - Column gap (inline axis): .cgap-xs, .cgap-sm, .cgap-md...

• Padding:
  - All sides: .pad-xs, .pad-sm, .pad-md, .pad-lg...
  - Horizontal (inline): .px-xs, .px-sm, .px-md...
  - Vertical (block): .py-xs, .py-sm, .py-md...
  - Single side: .pt-*, .pr-*, .pb-*, .pl-*
  - There are no .pad-x-* or .pad-y-* classes.

• Margin:
  - Macro spacing: .mar-sm, .mar-md, .mx-sm, .my-md...

Example:
<div class="row ycenter gap-sm pad-md bg-surface border radius-sm">`
		});
	}

	// 2. Typography / Text / Fonts
	if (/text|font|typo|size|heading|title|weight|line-height|clamp/.test(q)) {
		sections.push({
			title: 'Typography & Text Hierarchy (Layer L5)',
			guidance: `Text sizing is fluid and token-backed:
• Scale:
  - .text-xs (~11px): metadata, captions, badges, keyboard keys
  - .text-sm (~12px): dense UI copy, table cells
  - .text-md (~14px): default UI copy, form labels
  - .text-bs (~16px): lead body text, article content — the base every control reads
  - .text-lg (~20px): subheadings, modal titles, card headers
  - .text-xl (~25px): section titles, large cards
  - .text-2xl .. .text-5xl: major page titles & hero headlines

• Roles & Colors:
  - .text-primary (high contrast ink)
  - .text-secondary (supporting copy)
  - .text-muted (dimmed metadata / placeholders)
  - .truncate (single-line ellipsis)

• Weights:
  - .weight-300 (light), .weight-400 (normal), .weight-500 (medium), .weight-600 (semibold), .weight-700 (bold), .weight-800 (extrabold)

Example:
<div class="box gap-xs">
\t<h2 class="text-lg weight-600 text-primary">Overview</h2>
\t<p class="text-sm text-secondary">Summary details here.</p>
</div>`
		});
	}

	// 3. Containers & Alignment (Flex / Grid)
	if (/align|center|middle|flex|row|column|box|justify|between|stack|layout/.test(q)) {
		sections.push({
			title: 'Containers & Physical Axis Alignment (Layer L2)',
			guidance: `Fractalstyler uses physical axis modifiers under structural containers:
• Containers:
  - .box: Flexbox column (vertical layout)
  - .row: Flexbox row (horizontal layout)
  - .grid: CSS Grid container

• Physical Modifiers (nested under .box or .row):
  - Horizontal (X axis): .xcenter, .xleft, .xright, .xbetween, .xevenly, .xaround
  - Vertical (Y axis): .ycenter, .ytop, .ybot, .ybetween

• Sizing modifiers:
  - .grow (flex-grow: 1)
  - .shrink-0 (flex-shrink: 0)
  - .min0 (min-width: 0 / min-height: 0 — prevents flex blowout)
  - .wrap (flex-wrap: wrap)

Example:
<div class="row ycenter xbetween gap-sm pad-sm bg-surface border">
\t<span class="text-sm weight-500">Label</span>
\t<button data-variant="primary" data-size="sm">Action</button>
</div>`
		});
	}

	// 4. Cards & Interactive Components
	if (/card|cards|accordion|collapse|header|dialog|modal/.test(q)) {
		sections.push({
			title: 'Cards & Interactive Elements (Layer L2/L5/Custom)',
			guidance: `Components use typed data attributes for variant, shape, and size:
• Card (padding rides data-pad — cards have NO data-size):
  <article class="card" data-variant="primary" data-shape="modern" data-pad="md">
    <h3 class="card-title">Card Heading</h3>
    <p class="card-desc">Description text</p>
    <footer>Action area</footer>
  </article>

  Card axes: data-variant (primary|secondary|soft|outline|ghost|link),
  data-shape (modern|curved|round — no "square"), data-pad (sm|md|bs|lg|xl).

• Accordion (Custom / _09_own):
  <div class="fsx-accordion">
    <div class="fsx-accordion-item" data-variant="primary" data-shape="curved">
      <button class="fsx-accordion-trigger"><span>Title</span></button>
      <div class="fsx-accordion-content">
        <div class="fsx-accordion-panel"><p>Panel body content...</p></div>
      </div>
    </div>
  </div>`
		});
	}

	// 5. Buttons & Interactions
	if (/button|btn|link|input|select|switch|interactive|click|hover|active|focus/.test(q)) {
		sections.push({
			title: 'Interactive Controls & Buttons (Layer L5)',
			guidance: `Buttons, inputs, and selects share canonical data-* axes:
• Button & Anchor Button:
  - Elements: <button>, <button class="button">, or <a class="btn">
    (.button is a real class — "button, .button" is one selector list, so it is
    styled identically to the bare element. Prefer the bare element.)
  - data-variant: "primary" | "secondary" | "soft" | "outline" | "ghost" | "link" | "destructive" | "iconbox"
  - data-shape: "square" | "modern" | "curved" | "round"
  - data-size: "sm" | "md" | "bs" | "lg"
  - iconbox is button-only and adds its own size rungs: "icon-md" | "icon-bs" | "icon-lg"
  - a.btn answers every variant except iconbox/icon.
  - Icon buttons: <button class="icon text-muted">...</button> (icons come from the fractalicons package, never inline SVG or glyphs)

• Form Fields:
  - .input and .select support data-shape and data-size, but only these variants:
    "primary" | "secondary" | "soft" | "outline" | "ghost" — no "link", no "destructive".

Example:
<button data-variant="primary" data-shape="modern" data-size="md">Submit</button>
<a class="btn" data-variant="outline" data-shape="curved" data-size="sm" href="/explore">Explore</a>`
		});
	}

	// 6. Visuals & Surfaces (Colors, Borders, Shadows)
	if (/color|bg|background|surface|raised|panel|border|shadow|dark/.test(q)) {
		sections.push({
			title: 'Visual Surfaces, Borders & Shadows (Layer L5)',
			guidance: `Surfaces and borders map directly to semantic tokens:
• Backgrounds:
  - .bg-main: Base page fill (var(--bg))
  - .bg-surface: Content surface (var(--bg-surface))
  - .bg-panel: Panel / card fill (var(--bg-panel))
  - .bg-sunken: Sunken surface (var(--bg-sunken))
  - .bg-raised: Elevated surface (var(--bg-raised))
  - .bg-extra: Extra layered surface (var(--bg-extra))

• Borders:
  - .border: 1px border on all sides (var(--border))
  - .border-subtle: Subtle border (var(--border-subtle))
  - .border-strong: High-contrast border (var(--border-strong))
  - Partition borders: .bt, .br, .bb, .bl (plus -str / -sub variants). There are no .border-top / .border-bottom classes.

• Shadows:
  - .shadow-xs .. .shadow-3xl

• Radii:
  - .radius-xs (2px), .radius-sm (4px), .radius-md (8px), .radius-bs (16px), .radius-lg (32px), .radius-full (pill)

Never use raw hex codes (#ffffff, #1e293b). All colors adapt automatically between light and dark modes via data-mode="light|dark".`
		});
	}

	// Fallback if no specific section matched
	if (sections.length === 0) {
		sections.push({
			title: 'System Styling Principles',
			guidance: `Fractalstyler is a closed-world composition styling system:
1. Compose in markup via existing classes (.row, .ycenter, .gap-sm, .bg-surface, .border).
2. Write zero in-component <style> blocks and zero inline style="..." attributes.
3. Spacing ladders (.gap-*, .pad-*, .px-*, .py-*) use 8 steps: xs, sm, md, bs, lg, xl, 2xl, 3xl.
4. Containers (.box, .row) take physical modifiers (.xcenter, .ycenter, .xbetween).
5. Elements like button, a.btn, .input, .select, .card use typed data-variant, data-shape, and data-size axes — except .card, whose padding rides data-pad instead of data-size.`
		});
	}

	return sections;
}

// -----------------------------------------------------------------------------
// CSS to Fractal Classes Converter
// -----------------------------------------------------------------------------

function cssToFractalClasses(css: string) {
	const decls = css
		.split(/[;\n]/)
		.map((l) => l.trim())
		.filter(Boolean);

	const classes: string[] = [];
	const unmapped: string[] = [];
	let display: string | null = null;
	let direction: string | null = null;

	const spaceStep = (n: number) => snapNearest(n, TOKEN_CATALOG.space.approxPx).token;
	const textStep = (n: number) => snapNearest(n, TOKEN_CATALOG.typography.approxPx).token;
	const radiusStep = (n: number) => snapNearest(n, TOKEN_CATALOG.radius.approxPx).token;

	const parsePx = (v: string) => {
		const m = parseInt(v, 10);
		return isNaN(m) ? null : m;
	};

	for (const decl of decls) {
		const idx = decl.indexOf(':');
		if (idx < 0) continue;
		const prop = decl.slice(0, idx).trim().toLowerCase();
		const val = decl.slice(idx + 1).trim();
		const px = parsePx(val);

		switch (prop) {
			case 'display':
				display = val.toLowerCase();
				break;
			case 'flex-direction':
				direction = val.toLowerCase();
				break;
			case 'gap':
				if (px !== null) classes.push(`gap-${spaceStep(px)}`);
				break;
			case 'row-gap':
				if (px !== null) classes.push(`rgap-${spaceStep(px)}`);
				break;
			case 'column-gap':
				if (px !== null) classes.push(`cgap-${spaceStep(px)}`);
				break;
			case 'padding':
				if (px !== null) classes.push(`pad-${spaceStep(px)}`);
				break;
			case 'padding-inline':
			case 'padding-left':
			case 'padding-right':
				if (px !== null) classes.push(`px-${spaceStep(px)}`);
				break;
			case 'padding-block':
			case 'padding-top':
			case 'padding-bottom':
				if (px !== null) classes.push(`py-${spaceStep(px)}`);
				break;
			case 'margin':
				if (px !== null) classes.push(`mar-${spaceStep(px)}`);
				break;
			case 'margin-inline':
				if (px !== null) classes.push(`mx-${spaceStep(px)}`);
				break;
			case 'margin-block':
				if (px !== null) classes.push(`my-${spaceStep(px)}`);
				break;
			case 'border-radius':
				if (px !== null) classes.push(`radius-${radiusStep(px)}`);
				break;
			case 'font-size':
				if (px !== null) classes.push(`text-${textStep(px)}`);
				break;
			case 'font-weight':
				if (['300', '400', '500', '600', '700', '800'].includes(val)) classes.push(`weight-${val}`);
				else unmapped.push(`${prop}: ${val}`);
				break;
			case 'background':
			case 'background-color':
				if (/surface/i.test(val)) classes.push('bg-surface');
				else if (/raised/i.test(val)) classes.push('bg-raised');
				else if (/panel/i.test(val)) classes.push('bg-panel');
				else if (/sunken/i.test(val)) classes.push('bg-sunken');
				else if (/extra/i.test(val)) classes.push('bg-extra');
				else if (/--bg\b|--bg\)/.test(val)) classes.push('bg-main');
				else unmapped.push(`${prop}: ${val}`);
				break;
			case 'color':
				if (/primary/i.test(val)) classes.push('text-primary');
				else if (/secondary/i.test(val)) classes.push('text-secondary');
				else if (/muted/i.test(val)) classes.push('text-muted');
				else unmapped.push(`${prop}: ${val}`);
				break;
			case 'border':
				classes.push('border');
				break;
			case 'border-bottom':
				classes.push('bb');
				break;
			case 'border-top':
				classes.push('bt');
				break;
			case 'border-right':
				classes.push('br');
				break;
			case 'border-left':
				classes.push('bl');
				break;
			case 'width':
				if (val === '100%') classes.push('wfull');
				else unmapped.push(`${prop}: ${val}`);
				break;
			case 'height':
				if (val === '100%') classes.push('hfull');
				else unmapped.push(`${prop}: ${val}`);
				break;
			case 'flex-wrap':
				if (val === 'wrap') classes.push('wrap');
				break;
			case 'flex-grow':
				if (val === '1') classes.push('grow');
				break;
			case 'flex-shrink':
				if (val === '0') classes.push('shrink-0');
				break;
			case 'text-overflow':
				if (val === 'ellipsis') classes.push('truncate');
				break;
			case 'justify-content':
			case 'align-items':
				unmapped.push(`${prop}: ${val}`);
				break;
			default:
				unmapped.push(`${prop}: ${val}`);
		}
	}

	// Add structural container
	const container = display === 'grid' ? 'grid' : display === 'flex' ? (direction === 'row' ? 'row' : 'box') : null;
	if (container) classes.unshift(container);

	// Map alignments
	const ALIGN: Record<string, string> = {
		'flex-start': 'left',
		start: 'left',
		center: 'center',
		'flex-end': 'right',
		end: 'right',
		'space-between': 'between',
		'space-evenly': 'evenly',
		'space-around': 'around'
	};

	for (const u of unmapped.slice()) {
		const m = /^(justify-content|align-items):\s*(.+)$/i.exec(u);
		if (!m || !container) continue;
		const word = ALIGN[m[2].toLowerCase()];
		if (!word) continue;
		const isX = container === 'row' ? m[1].toLowerCase() === 'justify-content' : m[1].toLowerCase() === 'align-items';
		classes.push(`${isX ? 'x' : 'y'}${word === 'left' && !isX ? 'top' : word === 'right' && !isX ? 'bot' : word}`);
		unmapped.splice(unmapped.indexOf(u), 1);
	}

	return {
		composedClasses: classes,
		suggestedMarkup: `<div class="${classes.join(' ')}">`,
		unmappedDeclarations: unmapped
	};
}

// -----------------------------------------------------------------------------
// Markup Linter Logic
// -----------------------------------------------------------------------------

function lintMarkup(code: string): { passed: boolean; diagnostics: McpDiagnostic[]; totalClassesChecked: number } {
	const diagnostics: McpDiagnostic[] = [];

	// 1. Scoped <style> block check
	if (/<style[\s>]/i.test(code)) {
		diagnostics.push({
			severity: 'error',
			rule: 'no-style-blocks',
			message: 'Forbidden <style> block found. The Closed-World styling contract forbids scoped or ad-hoc stylesheets. All styling must compose from canonical system classes.'
		});
	}

	// 2. Inline style="..." check
	if (/style=["'][^"']*["']/i.test(code)) {
		diagnostics.push({
			severity: 'error',
			rule: 'no-inline-styles',
			message: 'Forbidden inline style attribute found. Compose using existing classes in docs/REGISTRY.api.md.'
		});
	}

	// 3. Raw hex colors check
	const hexMatches = code.match(/#[0-9a-fA-F]{3,8}\b/g);
	if (hexMatches) {
		diagnostics.push({
			severity: 'error',
			rule: 'no-raw-hex',
			message: `Forbidden raw hex color(s): ${[...new Set(hexMatches)].join(', ')}. All colors must resolve through semantic system tokens (e.g. .bg-surface, .text-primary, .border).`
		});
	}

	// 4. Forbidden child combinator `>` in selectors/code
	if (/class=["'][^"']*>/.test(code)) {
		diagnostics.push({
			severity: 'error',
			rule: 'no-child-combinators',
			message: 'Forbidden child combinator `>` in class specification. Selectors must be plain descendants.'
		});
	}

	// 5. Check class names against verified registry
	if (!REGISTRY_LOADED) {
		// Without a registry every class would be reported unknown, which would
		// push an agent to "fix" markup that is actually correct. Say so instead.
		diagnostics.push({
			severity: 'error',
			rule: 'registry-unavailable',
			message:
				'registry.json could not be loaded, so class validation was skipped. Run `pnpm registry` in the fractalstyler package to regenerate it, then retry. Do not treat this as a markup error.'
		});
		return {
			passed: false,
			diagnostics,
			totalClassesChecked: 0
		};
	}

	const classAttrRegex = /class(?:Name)?=["'`]([^"'`]*)["'`]/g;
	let match: RegExpExecArray | null;
	const checkedClasses = new Set<string>();
	const unknownClasses: { class: string; suggestions: string[] }[] = [];

	while ((match = classAttrRegex.exec(code))) {
		const rawLiteral = match[1].replace(/\{[^}]*\}/g, ' ');
		for (const cls of rawLiteral.split(/\s+/)) {
			if (!cls || !/^[a-zA-Z][\w-]*$/.test(cls)) continue;
			if (checkedClasses.has(cls)) continue;
			checkedClasses.add(cls);

			if (!VALID_CLASSES.has(cls)) {
				const suggestions = findClosestMatches(cls, VALID_CLASSES, 3, 3);
				unknownClasses.push({
					class: cls,
					suggestions
				});
			}
		}
	}

	for (const item of unknownClasses) {
		const tip = item.suggestions.length > 0 ? ` Did you mean: .${item.suggestions.join(', .')}?` : '';
		diagnostics.push({
			severity: 'error',
			rule: 'unknown-class',
			message: `Class ".${item.class}" is not in the system registry.${tip}`
		});
	}

	return {
		passed: diagnostics.length === 0,
		diagnostics,
		totalClassesChecked: checkedClasses.size
	};
}

// -----------------------------------------------------------------------------
// System Rules
// -----------------------------------------------------------------------------

const SYSTEM_RULES = `# Fractalstyler Closed-World Design Rules

1. **Closed-World Styling Law**:
   Styles are added ONLY via fractal composition and existing tokens.
   - NO scoped <style> blocks anywhere in components.
   - NO inline style="..." attributes.
   - NO raw hex colors (#fff).
   - NO arbitrary pixel dimensions (>2px).
   - NO child combinators (> * is forbidden; selectors are plain descendants).

2. **Layer Architecture**:
   - L0 (Tokens): Design token source of truth (_00_tokens.sass, driven by _00_config.sass).
   - L0 (Base): Low-specificity resets (_01_base.sass).
   - L1 (Dimensions): Loop-generated ladders (.gap-*, .rgap-*, .cgap-*, .pad-*, .px-*, .py-*, .mar-*, .mx-*, .my-* across 8 steps; six .radius-*; .h-sm/.h-md/.h-bs/.h-lg; .wfull/.hfull).
   - L2 (Containers): .box (col), .row (horizontal), .grid. Physical modifiers (.xcenter, .ycenter, .xbetween).
   - L3 (Layouts): Stepping columns (.grid-1..6), .cspan-1..8, .card-grid, .prose, frame ratios, .reel.
   - L4 (Shells): .app-shell, .app-header, .app-main, .app-footer, .sidebar-left, .sidebar-right, .content-section, .get.
   - L5 (Typography): .text-xs..5xl, roles (.page-title, .nav-link), .weight-*, .truncate.
   - L5 (Interactions): Inputs, selects, button + .button, a.btn, .button-group / .split-button, links, data-* axes.
   - L5 (Visuals): Surface styling (.bg-main, .bg-surface, .bg-panel, .bg-sunken, .bg-raised, .bg-extra, .border, .bt/.br/.bb/.bl, .shadow-*), pop-colour inks (.orange1..6, .yellow1..4, .green1..4).
   - Custom (_09_own.sass): Sanctioned extension point — project skins, .fsx-accordion, the .mascot* family.

3. **Verification**:
   Always verify with:
   - pnpm registry # regenerates registry.json — REQUIRED, this server validates against it
   - pnpm lint   # contract & token purity linter
   - pnpm check  # svelte diagnostics & deck validator
   - pnpm build  # package + publint
   - pnpm vocab  # updates docs/REGISTRY.api.md

4. **Icons**: come from the \`fractalicons\` package only. Never inline SVG or unicode glyphs.

5. **The presets runtime is optional**:
   The package ships a runtime that writes data-* attributes onto live markup
   (presets.svelte.ts + PresetControls.svelte). It never overwrites an attribute
   the markup already declares — it only fills in what is missing.
   - size / shape sweep: button, input, select, a.btn, .card, .fsx-accordion-item
   - data-pad sweeps .card ONLY (sm|md|bs|lg|xl)
   - data-variant sweeps input.input, select.select, button.button, a.btn ONLY
     (class-qualified — bare <input>/<select>/<button> are never touched)
   - Defaults: bs / modern / md / primary. Persisted to localStorage.
   Exported setters: setPresetSize, setPresetShape, setPresetPad,
   setPresetVariant, resetPresets, initPresets. Each calls init() itself.
   **Prefer explicit attributes in authored markup** — reach for the preset layer
   only when the data-* values are the part you do not want to hand-write.
`;

// -----------------------------------------------------------------------------
// Create MCP Server Instance
// -----------------------------------------------------------------------------

const server = new Server(
	{
		name: 'fractalstyler',
		version: VERSION
	},
	{
		capabilities: {
			tools: {},
			resources: {},
			prompts: {}
		}
	}
);

// -----------------------------------------------------------------------------
// Tool Definitions
// -----------------------------------------------------------------------------

server.setRequestHandler(ListToolsRequestSchema, async () => {
	return {
		tools: [
			{
				name: 'guide_styling',
				description:
					'Intelligent design advisor for Fractalstyler. Ask how to style any UI pattern (e.g. "how to add gap", "center text", "card layout", "buttons", "sidebar", "responsive grid") and receive exact layer mappings, token variables, utility classes, and copyable markup.',
				inputSchema: {
					type: 'object',
					properties: {
						query: {
							type: 'string',
							description: 'The styling intent or question (e.g. "how to add gap and padding", "responsive card grid", "semantic font sizes")'
						},
						context: {
							type: 'string',
							description: 'Optional additional context about the component being built'
						}
					},
					required: ['query']
				}
			},
			{
				name: 'search_classes',
				description:
					'Search and inspect the canonical Fractalstyler classes. Query by name, description, or CSS property, and filter by layer.',
				inputSchema: {
					type: 'object',
					properties: {
						query: {
							type: 'string',
							description: 'Search string (e.g. "gap", "card", "xcenter", "truncate", "primary")'
						},
						layer: {
							type: 'string',
							enum: ['all', 'L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'Custom'],
							description: 'Optional layer filter. Defaults to "all".'
						},
						limit: {
							type: 'number',
							description: 'Maximum entries to return. Defaults to 20.'
						}
					}
				}
			},
			{
				name: 'get_tokens',
				description:
					'Inspect design tokens, fluid scales, and CSS variables for space, typography, radii, shadows and surfaces.',
				inputSchema: {
					type: 'object',
					properties: {
						scale: {
							type: 'string',
							enum: ['all', 'space', 'typography', 'radius', 'shadows', 'surfaces'],
							description: 'Token scale category. Defaults to "all".'
						}
					}
				}
			},
			{
				name: 'snap_to_tokens',
				description:
					'Snaps arbitrary raw pixel values (e.g. from Figma mockups) to the nearest canonical Fractalstyler design token and utility class.',
				inputSchema: {
					type: 'object',
					properties: {
						gap: { type: 'number', description: 'Gap in pixels (e.g. 16)' },
						padding: { type: 'number', description: 'Padding in pixels (e.g. 24)' },
						fontSize: { type: 'number', description: 'Font size in pixels (e.g. 18)' },
						radius: { type: 'number', description: 'Border radius in pixels (e.g. 8)' }
					}
				}
			},
			{
				name: 'get_recipes',
				description:
					'Retrieves verified canonical markup recipes. Pattern filter matches the recipe ids: ' + RECIPES.map((r) => r.id).join(', ') + '.',
				inputSchema: {
					type: 'object',
					properties: {
						pattern: {
							type: 'string',
							description: 'Optional pattern filter — one of the recipe ids (e.g. "search-input-bar", "action-dialog", "settings-switch-row", "all")'
						}
					}
				}
			},
			{
				name: 'css_to_classes',
				description:
					'Converts traditional CSS declaration blocks into pure Fractalstyler markup utility classes.',
				inputSchema: {
					type: 'object',
					properties: {
						css: {
							type: 'string',
							description: 'CSS declarations (e.g. "display: flex; gap: 16px; padding: 24px; border-radius: 8px; background: #ffffff;")'
						}
					},
					required: ['css']
				}
			},
			{
				name: 'lint_markup',
				description:
					'Validates Svelte or HTML markup against the Fractalstyler closed-world contract. Detects unregistered classes with fuzzy suggestions, inline styles, <style> blocks, raw hex colors, and forbidden combinators.',
				inputSchema: {
					type: 'object',
					properties: {
						code: {
							type: 'string',
							description: 'The Svelte or HTML markup snippet to validate'
						}
					},
					required: ['code']
				}
			},
			{
				name: 'get_system_rules',
				description:
					'Returns the core design laws, layer architecture, and authoring constraints of the Fractalstyler system.',
				inputSchema: {
					type: 'object',
					properties: {}
				}
			}
		]
	};
});

// -----------------------------------------------------------------------------
// Call Tool Handler
// -----------------------------------------------------------------------------

server.setRequestHandler(CallToolRequestSchema, async (request) => {
	const { name } = request.params;
	const args = (request.params.arguments ?? {}) as ToolArgs;

	switch (name) {
		case 'guide_styling': {
			const query = (args.query || '').trim();
			const context = (args.context || '').trim();
			const sections = guideStyling(query, context);

			let output = `# Fractalstyler Styling Guide: "${query}"\n\n`;
			for (const sec of sections) {
				output += `### ${sec.title}\n\n${sec.guidance}\n\n---\n\n`;
			}
			output += `> Need exact classes? Use \`search_classes\` or \`get_recipes\`. Validate your markup with \`lint_markup\`.`;

			return {
				content: [{ type: 'text', text: output }]
			};
		}

		case 'search_classes': {
			const query = (args.query || '').toLowerCase().trim();
			const layer = args.layer || 'all';
			const limit = typeof args.limit === 'number' && args.limit > 0 ? args.limit : 20;

			let matches = REGISTRY.filter((entry) => {
				if (layer !== 'all' && entry.layer !== layer) return false;
				if (!query) return true;
				const cls = (entry.class || '').toLowerCase();
				const desc = (entry.description || '').toLowerCase();
				const prop = (entry.property || '').toLowerCase();
				return cls.includes(query) || desc.includes(query) || prop.includes(query);
			});

			const totalMatches = matches.length;
			matches = matches.slice(0, limit);

			const results = matches.map((m) => ({
				class: m.class,
				layer: m.layer,
				property: m.property,
				description: m.description,
				example: m.example,
				file: m.file
			}));

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(
							{
								query,
								layer,
								totalFound: totalMatches,
								returned: results.length,
								classes: results
							},
							null,
							2
						)
					}
				]
			};
		}

		case 'get_tokens': {
			const scale = args.scale || 'all';
			const response =
				scale === 'all' ? TOKEN_CATALOG : { [scale]: TOKEN_CATALOG[scale as keyof typeof TOKEN_CATALOG] || null };

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(response, null, 2)
					}
				]
			};
		}

		case 'snap_to_tokens': {
			const snapped: Record<string, unknown> = {};

			if (typeof args.gap === 'number') {
				const m = snapNearest(args.gap, TOKEN_CATALOG.space.approxPx);
				snapped.gap = {
					inputPx: args.gap,
					nearestStep: m.token,
					cssVar: `var(--space-${m.token})`,
					classes: {
						bothAxes: `.gap-${m.token}`,
						rowGap: `.rgap-${m.token}`,
						columnGap: `.cgap-${m.token}`
					}
				};
			}

			if (typeof args.padding === 'number') {
				const m = snapNearest(args.padding, TOKEN_CATALOG.space.approxPx);
				snapped.padding = {
					inputPx: args.padding,
					nearestStep: m.token,
					cssVar: `var(--space-${m.token})`,
					classes: {
						allSides: `.pad-${m.token}`,
						horizontal: `.px-${m.token}`,
						vertical: `.py-${m.token}`
					}
				};
			}

			if (typeof args.fontSize === 'number') {
				const m = snapNearest(args.fontSize, TOKEN_CATALOG.typography.approxPx);
				snapped.fontSize = {
					inputPx: args.fontSize,
					nearestStep: m.token,
					cssVar: `var(--text-${m.token})`,
					utilityClass: `.text-${m.token}`
				};
			}

			if (typeof args.radius === 'number') {
				const m = snapNearest(args.radius, TOKEN_CATALOG.radius.approxPx);
				snapped.radius = {
					inputPx: args.radius,
					nearestStep: m.token,
					cssVar: `var(--radius-${m.token})`,
					utilityClass: `.radius-${m.token}`
				};
			}

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(snapped, null, 2)
					}
				]
			};
		}

		case 'get_recipes': {
			const pattern = (args.pattern || '').toLowerCase().trim();
			let results = ALL_RECIPES;

			if (pattern && pattern !== 'all') {
				results = ALL_RECIPES.filter(
					(r) =>
						r.id.toLowerCase().includes(pattern) ||
						r.name.toLowerCase().includes(pattern) ||
						(r.intents && r.intents.some((i) => i.toLowerCase().includes(pattern)))
				);
			}

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(results, null, 2)
					}
				]
			};
		}

		case 'css_to_classes': {
			const css = (args.css || '').trim();
			const conversion = cssToFractalClasses(css);

			let text = `### Composed Classes:\n\`\`\`html\n${conversion.suggestedMarkup}\n\`\`\`\n\n`;
			text += `**Classes**: \`${conversion.composedClasses.join(' ')}\`\n`;

			if (conversion.unmappedDeclarations.length > 0) {
				text += `\n**Unmapped / Semantic Declarations**:\n`;
				for (const u of conversion.unmappedDeclarations) {
					text += `- \`${u}\`\n`;
				}
				text += `\n*Note*: Check if an existing system token or layout container handles these.`;
			}

			return {
				content: [{ type: 'text', text }]
			};
		}

		case 'lint_markup': {
			const code = (args.code || '').trim();
			const result = lintMarkup(code);

			return {
				content: [
					{
						type: 'text',
						text: JSON.stringify(result, null, 2)
					}
				]
			};
		}

		case 'get_system_rules': {
			return {
				content: [
					{
						type: 'text',
						text: SYSTEM_RULES
					}
				]
			};
		}

		default:
			throw new Error(`Unknown tool: ${name}`);
	}
});

// -----------------------------------------------------------------------------
// Resource Definitions
// -----------------------------------------------------------------------------

server.setRequestHandler(ListResourcesRequestSchema, async () => {
	return {
		resources: [
			{
				uri: 'fractalstyler://registry',
				name: 'Fractalstyler Class Registry',
				mimeType: 'application/json',
				description: `Full JSON inventory of all ${REGISTRY.length} canonical classes across L0-L5 + Custom layers.`
			},
			{
				uri: 'fractalstyler://tokens',
				name: 'Design Tokens Dictionary',
				mimeType: 'application/json',
				description: 'Fluid scales and tokens for space, typography, radius, shadows and surfaces.'
			},
			{
				uri: 'fractalstyler://recipes',
				name: 'Canonical Recipes',
				mimeType: 'application/json',
				description: 'Verified copyable markup patterns for controls, cards, dialogs, and navigation.'
			},
			{
				uri: 'fractalstyler://rules',
				name: 'Closed-World Design Rules',
				mimeType: 'text/markdown',
				description: 'Master guidelines and architectural constraints for Fractalstyler.'
			}
		]
	};
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
	const { uri } = request.params;

	switch (uri) {
		case 'fractalstyler://registry':
			return {
				contents: [
					{
						uri,
						mimeType: 'application/json',
						text: JSON.stringify(REGISTRY, null, 2)
					}
				]
			};

		case 'fractalstyler://tokens':
			return {
				contents: [
					{
						uri,
						mimeType: 'application/json',
						text: JSON.stringify(TOKEN_CATALOG, null, 2)
					}
				]
			};

		case 'fractalstyler://recipes':
			return {
				contents: [
					{
						uri,
						mimeType: 'application/json',
						text: JSON.stringify(ALL_RECIPES, null, 2)
					}
				]
			};

		case 'fractalstyler://rules':
			return {
				contents: [
					{
						uri,
						mimeType: 'text/markdown',
						text: SYSTEM_RULES
					}
				]
			};

		default:
			throw new Error(`Unknown resource: ${uri}`);
	}
});

// -----------------------------------------------------------------------------
// Prompt Definitions
// -----------------------------------------------------------------------------

server.setRequestHandler(ListPromptsRequestSchema, async () => {
	return {
		prompts: [
			{
				name: 'design_component',
				description: 'Guide an agent to plan and author a new component using only Fractalstyler composition classes.',
				arguments: [
					{
						name: 'componentName',
						description: 'Name of the component (e.g. UserProfileCard, MetricsSummary)',
						required: true
					},
					{
						name: 'purpose',
						description: 'What the component renders and its interactive requirements',
						required: true
					}
				]
			},
			{
				name: 'audit_markup',
				description: 'Prompt to audit existing component markup for Fractalstyler contract compliance.',
				arguments: [
					{
						name: 'markup',
						description: 'The Svelte or HTML markup to review',
						required: true
					}
				]
			}
		]
	};
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
	const { name } = request.params;
	const args: Record<string, string> = request.params.arguments ?? {};

	if (name === 'design_component') {
		const compName = args.componentName || 'Component';
		const purpose = args.purpose || 'UI element';
		return {
			description: `Design ${compName} using Fractalstyler`,
			messages: [
				{
					role: 'user',
					content: {
						type: 'text',
						text: `Design a production-grade Svelte 5 component named \`${compName}\`.
Purpose: ${purpose}

Constraints:
1. Closed-World: Use ONLY Fractalstyler registry classes. Do NOT write any <style> block or inline style="..." attributes.
2. Structure: Use .box (column), .row (horizontal), or .grid container bases. Apply physical modifiers (.xcenter, .ycenter, .xbetween).
3. Spacing: Use canonical step ladders (.gap-*, .pad-*, .px-*, .py-*).
4. Visuals: Surface styling rides .bg-surface, .bg-raised, .border, .bb, .radius-*, .shadow-*.
5. Typography: Sizing rides .text-xs .. .text-5xl, weights ride .weight-*.
6. State: Interactive elements use the bare \`<button>\` (or \`a.btn\`) plus data-variant / data-shape / data-size.

Execute:
1. Call \`guide_styling\` or \`get_recipes\` to discover verified patterns.
2. Draft the component markup.
3. Call \`lint_markup\` on your markup to confirm 0 contract errors.`
					}
				}
			]
		};
	}

	if (name === 'audit_markup') {
		const markup = args.markup || '';
		return {
			description: 'Audit markup for Fractalstyler compliance',
			messages: [
				{
					role: 'user',
					content: {
						type: 'text',
						text: `Please audit the following markup against the Fractalstyler Closed-World styling contract:\n\n\`\`\`html\n${markup}\n\`\`\`\n\nRun \`lint_markup\` to check for unregistered classes, <style> blocks, inline styles, and forbidden child combinators. Suggest replacements for any violations.`
					}
				}
			]
		};
	}

	throw new Error(`Unknown prompt: ${name}`);
});

// -----------------------------------------------------------------------------
// Start Server
// -----------------------------------------------------------------------------

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
}

main().catch((err) => {
	console.error('Fatal MCP Server error:', err);
	process.exit(1);
});
