// =============================================================================
// class-vocab — turns the fractalstyler registry into a rich class API reference.
//
// Decodes class families, scale steps, and provides curated intent descriptions.
// Used by:
//   - scripts/class-vocab.js -> generates docs/REGISTRY.api.md
//   - lint/browser.mjs       -> generates standalone registry browser HTML
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const STEPS = new Set(['xs', 'sm', 'md', 'bs', 'lg', 'xl', '2xl', '3xl']);
const RADIUS_STEPS = new Set(['xs', 'sm', 'md', 'bs', 'lg', 'full']);

export const LAYER_INTROS = {
	L0: 'Tokens and Base resets. L0 defines the CSS custom properties for both color modes (via the =light-theme-tokens / =dark-theme-tokens mixins in _00_tokens.sass), the type/space/radius/motion scales, and native element resets. Never hardcode a raw hex or pixel literal that L0 covers.',
	L1: 'Dimensions. Loop-generated space families — .gap/.rgap/.cgap, .pad/.px/.py/.pt/.pr/.pb/.pl, .mar/.mx/.my/.mt/.mr/.mb/.ml — each across the eight steps (xs sm md bs lg xl 2xl 3xl), all token-routed through var(--space-*). Plus the six radius channels, full/zero sizing, control heights, and viewport heights. No literal ladder; no -mob/-desk bands.',
	L2: 'Containers and alignment universe. .box (flex-col), .row (flex-row), and .grid (css-grid) are the three structural foundations with strict physical axis modifiers (xcenter, ycenter, xbetween, etc.) nested under their base — never standalone. Scroll containers, cards, chips, and form/section wrappers live here too.',
	L3: 'Layouts and responsive grids. .grid-1/.grid-2/.grid-3/.grid-4/.grid-6 with divisor stepping (3→1, 4→2→1, 6→3→2→1), .cspan-* column spans, .card-grid (auto-fit), .prose (reading measure), .frame-* aspect-ratio boxes (from $frame-ratios), and .reel (scroll-snap rail).',
	L4: 'Shells and canonical application markups. The .app-shell canon: .app-header, .app-main, .main-section, the role-bound rails (.sidebar-left drawer, .sidebar-right TOC), .app-footer, and .content-section with its narrow width modes.',
	L5: 'Visuals and Interactions. Typography primitives and roles (_03), inputs, selects, links and the button quartet with its data-variant/data-shape/data-size axes (_07), surface fills, ink, the partition-law border set, elevation shadows, and responsive visibility (_08).',
	Custom: 'Sanctioned extension point (_09_own.sass). Contains project-specific overrides and third-party styling additions that cannot be expressed via canonical layers.'
};

export const GAP_PROPS = { gap: 'gap (both axes)', rgap: 'row-gap', cgap: 'column-gap' };
export const PAD_PROPS = {
	pad: 'padding (all sides)',
	'pad-x': 'padding-inline (horizontal)',
	'pad-y': 'padding-block (vertical)',
	'pad-top': 'padding-top',
	'pad-right': 'padding-right',
	'pad-bottom': 'padding-bottom',
	'pad-left': 'padding-left'
};

export function renderBrowserHtml(registryEntries, options = {}) {
	const entries = Array.isArray(registryEntries) ? registryEntries : [];

	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fractalstyler — Class Registry Browser</title>
<style>
	:root { color-scheme: light dark; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; }
	body { margin: 0; padding: 24px; background: Canvas; color: CanvasText; }
	header { max-width: 1200px; margin: 0 auto 16px; }
	h1 { font-size: 20px; margin: 0 0 6px; letter-spacing: 0.04em; }
	.sub { opacity: .75; font-size: 13px; margin-bottom: 12px; }
	.controls { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
	input, select { font: inherit; padding: 6px 12px; border: 1px solid color-mix(in oklab, CanvasText 20%, Canvas); border-radius: 6px; background: Canvas; color: CanvasText; font-size: 13px; }
	input { flex: 1; min-width: 260px; font-family: ui-monospace, Menlo, monospace; }
	table { width: 100%; max-width: 1200px; margin: 0 auto; border-collapse: collapse; font-size: 13px; }
	th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid color-mix(in oklab, CanvasText 12%, Canvas); vertical-align: top; }
	th { position: sticky; top: 0; background: Canvas; font-weight: 600; }
	code { font-family: ui-monospace, Menlo, monospace; font-size: 13px; font-weight: 600; color: #059669; }
	.layer-badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700; background: color-mix(in oklab, CanvasText 10%, Canvas); font-family: ui-monospace, monospace; }
	.desc { opacity: .9; }
	.prop { font-family: ui-monospace, monospace; font-size: 11px; opacity: .7; margin-top: 2px; }
	.empty { opacity: .6; padding: 32px 0; text-align: center; }
</style>
</head>
<body>
<header>
	<h1>FRACTALSTYLER REGISTRY BROWSER</h1>
	<div class="sub" id="totals">Loading...</div>
	<div class="controls">
		<input id="q" type="search" placeholder="Search class name, description, or property..." autofocus>
		<select id="layerFilter">
			<option value="">All layers</option>
			<option value="L0">L0 (Tokens & Base)</option>
			<option value="L1">L1 (Dimensions)</option>
			<option value="L2">L2 (Containers)</option>
			<option value="L3">L3 (Layouts)</option>
			<option value="L4">L4 (Shells)</option>
			<option value="L5">L5 (Visuals & Interactions)</option>
			<option value="Custom">Custom (_09_own)</option>
		</select>
	</div>
</header>
<table>
	<thead>
		<tr>
			<th style="width: 25%">Class</th>
			<th style="width: 12%">Layer</th>
			<th>Description & Property</th>
		</tr>
	</thead>
	<tbody id="rows"></tbody>
</table>
<div class="empty" id="empty" hidden>No matching classes found.</div>

<script>
const DATA = ${JSON.stringify(entries)};
const rows = document.getElementById('rows');
const empty = document.getElementById('empty');
const q = document.getElementById('q');
const layerFilter = document.getElementById('layerFilter');
const totals = document.getElementById('totals');

totals.textContent = \`\${DATA.length} canonical classes indexed from system styling partials\`;

function render() {
	const needle = q.value.trim().toLowerCase();
	const layer = layerFilter.value;
	const out = [];

	for (const item of DATA) {
		if (layer && item.layer !== layer) continue;
		const name = (item.class || '').toLowerCase();
		const desc = (item.description || '').toLowerCase();
		const prop = (item.property || '').toLowerCase();
		if (needle && !(name.includes(needle) || desc.includes(needle) || prop.includes(needle))) continue;

		out.push(\`<tr>
			<td><code>\${item.class}</code></td>
			<td><span class="layer-badge">\${item.layer}</span></td>
			<td>
				<div class="desc">\${item.description || '—'}</div>
				\${item.property ? \`<div class="prop">\${item.property}</div>\` : ''}
			</td>
		</tr>\`);
	}

	rows.innerHTML = out.join('');
	empty.hidden = out.length > 0;
}

q.addEventListener('input', render);
layerFilter.addEventListener('change', render);
render();
</script>
</body>
</html>
`;
}

export function renderApiMarkdown(registryEntries) {
	const entries = Array.isArray(registryEntries) ? registryEntries : [];
	const layers = ['L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'Custom'];

	const lines = [
		'# Fractalstyler — Class API & Vocabulary Reference',
		'',
		'> Comprehensive index of the canonical styling system classes, layers, and intent.',
		'> Generated from `registry.json` via `scripts/class-vocab.js`.',
		'',
		`**${entries.length}** classes indexed across layers.`,
		'',
		'Every entry is a concrete class — the space families are expanded from the',
		'family maps in `_00_config.sass` across the eight steps `xs sm md bs lg xl 2xl 3xl`.',
		'There are no wildcard families, no literal ladders and no `-mob`/`-desk` bands.',
		'Modifiers nest under their base (`.box.xcenter`), children carry their own name',
		'(`.accordion-content`), and `element[...]` rows are attribute-driven variants.',
		'',
		'---'
	];

	for (const layer of layers) {
		const items = entries.filter((e) => e.layer === layer);
		if (items.length === 0) continue;

		lines.push('', `## Layer ${layer}`, '');
		if (LAYER_INTROS[layer]) {
			lines.push(LAYER_INTROS[layer], '');
		}

		lines.push('| Class | Property / Expansion | Description |', '|:---|:---|:---|');
		for (const it of items) {
			const prop = it.property ? `\`${it.property.replace(/\|/g, '\\|')}\`` : '—';
			lines.push(`| \`${it.class}\` | ${prop} | ${it.description || '—'} |`);
		}
	}

	lines.push('');
	return lines.join('\n');
}

// Direct CLI execution — works under either name: the repo's class-vocab.js,
// or the class-vocab.mjs copy that `fractalstyler eject` places in consumer
// projects (renamed so it runs as ESM regardless of their package type).
const invokedAs = path.basename(process.argv[1] || '');
if (process.argv[1] && /^class-vocab\.(js|mjs)$/.test(invokedAs)) {
	const regPath = path.join(PKG_ROOT, 'registry.json');
	if (fs.existsSync(regPath)) {
		const registry = JSON.parse(fs.readFileSync(regPath, 'utf8'));
		const md = renderApiMarkdown(registry);
		const outDoc = path.join(PKG_ROOT, 'docs', 'REGISTRY.api.md');
		fs.writeFileSync(outDoc, md, 'utf8');
		console.log(`✔ Generated ${outDoc}`);
	}
}
