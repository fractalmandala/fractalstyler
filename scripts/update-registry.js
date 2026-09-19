#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const stylesDir = path.join(rootDir, 'src', 'lib', 'styles');

/**
 * Parser for SASS files to extract classes, variables, and documentation
 */
function extractStylesData() {
	const registry = [];
	const tokens = [];

	const files = [
		{ file: '_00_tokens.sass', layer: 'L0' },
		{ file: '_00_config.sass', layer: 'L0' },
		{ file: '_01_base.sass', layer: 'L0' },
		{ file: '_02_dimensions.sass', layer: 'L1' },
		{ file: '_03_containers.sass', layer: 'L2' },
		{ file: '_04_layouts.sass', layer: 'L3' },
		{ file: '_05_shells.sass', layer: 'L4' },
		{ file: '_06_visuals.sass', layer: 'L5' },
		{ file: '_07_interactions.sass', layer: 'L5' },
		{ file: '_08_own.sass', layer: 'Custom' }
	];

	// Extract tokens from the L0 partials. Theming now lives as [data-mode]
	// mixins inside _00_tokens.sass, and the presets/theme partials were
	// retired — _00_tokens.sass is the only token source left.
	const seenVars = new Set();
	const tokenFiles = ['_00_tokens.sass'].map((f) => path.join(stylesDir, f));
	for (const tokensFile of tokenFiles) {
		if (fs.existsSync(tokensFile)) {
			const content = fs.readFileSync(tokensFile, 'utf8');
			const varRegex = /(--[a-zA-Z0-9_-]+):\s*([^;\n\r]+)/g;
			let match;
			while ((match = varRegex.exec(content)) !== null) {
				const varName = match[1];
				const val = match[2].trim();
				if (!seenVars.has(varName)) {
					seenVars.add(varName);
					tokens.push({ name: varName, value: val });
				}
			}
		}
	}

	// Helper to add registry entry
	// A class documents itself with a trailing `// …` on its selector line.
	// That comment is the registry description an agent greps, so strip the
	// marker rather than shipping "// Vertical scroll…" as the text.
	const stripComment = (s) => s.trim().replace(/^\/\/\s*/, '').trim();

	// Every class is indexed once. A loop-generated family (.gap-*, .pad-*)
	// and its explicit siblings (.radius-full) are added by hand, while the
	// file parser also indexes explicit selectors — so guard here, else a
	// class like .min0 or .radius-full would appear twice.
	const seenClasses = new Set();

	const addEntry = (cls, layer, prop, file, desc, example) => {
		if (seenClasses.has(cls)) return;
		seenClasses.add(cls);
		registry.push({
			class: cls,
			layer,
			property: prop,
			file,
			description: desc,
			example: example || `<div class="${cls.replace('.', '')}">`
		});
	};

	// Parse dimensions
	addEntry('.gap-*', 'L1', 'gap: calc(var(--space-*) * var(--gap-scale)) | {N}px', '_02_dimensions.sass', 'Flex and grid gap spacing (presets: 3xs..3xl, literals: ladder to 64px)');
	addEntry('.rgap-*', 'L1', 'row-gap: calc(var(--space-*) * var(--gap-scale)) | {N}px', '_02_dimensions.sass', 'Row gap spacing');
	addEntry('.cgap-*', 'L1', 'column-gap: calc(var(--space-*) * var(--gap-scale)) | {N}px', '_02_dimensions.sass', 'Column gap spacing');
	addEntry('.pad-*', 'L1', 'padding: calc(var(--space-*) * var(--pad-scale)) | {N}px', '_02_dimensions.sass', 'Padding on all sides');
	addEntry('.pad-x-*', 'L1', 'padding-inline: calc(var(--space-*) * var(--pad-scale)) | {N}px', '_02_dimensions.sass', 'Horizontal inline padding');
	addEntry('.pad-y-*', 'L1', 'padding-block: calc(var(--space-*) * var(--pad-scale)) | {N}px', '_02_dimensions.sass', 'Vertical block padding');
	addEntry('.pad-top-*', 'L1', 'padding-top: calc(var(--space-*) * var(--pad-scale)) | {N}px', '_02_dimensions.sass', 'Top padding');
	addEntry('.pad-right-*', 'L1', 'padding-right: calc(var(--space-*) * var(--pad-scale)) | {N}px', '_02_dimensions.sass', 'Right padding');
	addEntry('.pad-bottom-*', 'L1', 'padding-bottom: calc(var(--space-*) * var(--pad-scale)) | {N}px', '_02_dimensions.sass', 'Bottom padding');
	addEntry('.pad-left-*', 'L1', 'padding-left: calc(var(--space-*) * var(--pad-scale)) | {N}px', '_02_dimensions.sass', 'Left padding');
	addEntry('.marg-*', 'L1', 'margin: calc(var(--space-*) * var(--gap-scale)) | {N}px', '_02_dimensions.sass', 'Margin on all sides');
	addEntry('.marg--*', 'L1', 'margin: calc(var(--space-*) * var(--gap-scale) * -1) | -{N}px', '_02_dimensions.sass', 'Negative margin on all sides');
	addEntry('.marg-x-*', 'L1', 'margin-inline: calc(var(--space-*) * var(--gap-scale)) | {N}px', '_02_dimensions.sass', 'Horizontal inline margin');
	addEntry('.marg-y-*', 'L1', 'margin-block: calc(var(--space-*) * var(--gap-scale)) | {N}px', '_02_dimensions.sass', 'Vertical block margin');
	addEntry('.marg-top-*', 'L1', 'margin-top: calc(var(--space-*) * var(--gap-scale)) | {N}px', '_02_dimensions.sass', 'Top margin');
	addEntry('.marg-top--*', 'L1', 'margin-top: calc(var(--space-*) * var(--gap-scale) * -1) | -{N}px', '_02_dimensions.sass', 'Negative top margin');
	addEntry('.marg-bottom-*', 'L1', 'margin-bottom: calc(var(--space-*) * var(--gap-scale)) | {N}px', '_02_dimensions.sass', 'Bottom margin');
	addEntry('.marg-bottom--*', 'L1', 'margin-bottom: calc(var(--space-*) * var(--gap-scale) * -1) | -{N}px', '_02_dimensions.sass', 'Negative bottom margin');
	addEntry('.marg-left-*', 'L1', 'margin-left: calc(var(--space-*) * var(--gap-scale)) | {N}px', '_02_dimensions.sass', 'Left margin');
	addEntry('.marg-right-*', 'L1', 'margin-right: calc(var(--space-*) * var(--gap-scale)) | {N}px', '_02_dimensions.sass', 'Right margin');
	addEntry('.radius-*', 'L1', 'border-radius: {N}px', '_02_dimensions.sass', 'Corner border radius (ladder to 64px; .radius-0 is the reset, .radius-full for pills)');
	addEntry('.radius-full', 'L1', 'border-radius: var(--radius-full)', '_02_dimensions.sass', 'Circular border radius (9999px)');
	addEntry('.w-*', 'L1', 'width: {N}px', '_02_dimensions.sass', 'Width in pixels (ladder to 512px)');
	addEntry('.h-*', 'L1', 'height: {N}px', '_02_dimensions.sass', 'Height in pixels (ladder to 512px)');
	addEntry('.square-*', 'L1', 'width: {N}px; height: {N}px', '_02_dimensions.sass', 'Square dimensions in pixels (ladder to 512px)');
	addEntry('.min0', 'L1', 'min-width: 0; min-height: 0', '_02_dimensions.sass', 'Zero min bounds to prevent flex blowouts');
	addEntry('.wfull', 'L1', 'width: 100%', '_02_dimensions.sass', '100% full width');
	addEntry('.hfull', 'L1', 'height: 100%', '_02_dimensions.sass', '100% full height');
	addEntry('.full', 'L1', 'width: 100%; height: 100%', '_02_dimensions.sass', '100% width and height');
	addEntry('.hfull-vh', 'L1', 'min-height: 100vh', '_02_dimensions.sass', 'Full viewport height');
	addEntry('.hfull-vh-fitted', 'L1', 'min-height: calc(100vh - var(--header-height) - var(--footer-height))', '_02_dimensions.sass', 'Viewport height fitted between header and footer');
	addEntry('.bdr', 'L0', 'border: 1px solid red', '_01_base.sass', 'Debug outline — flags an element on screen with a red border');

	// Loop-generated families the line parser cannot see. The frame ratios
	// moved from _04_layouts.sass into the _00_config.sass $frame-ratios map,
	// which is where the .frame-* classes are generated from.
	const configSrc = fs.readFileSync(path.join(stylesDir, '_00_config.sass'), 'utf8');
	const ratios = [...configSrc.matchAll(/'([\d]+-[\d]+)':\s*'([^']+)'/g)];
	for (const [, name, ratio] of ratios) {
		addEntry(`.frame-${name}`, 'L3', `aspect-ratio: ${ratio}`, '_04_layouts.sass',
			`Aspect-ratio media frame (${ratio.replace(/\s/g, '')})`, `<div class="frame-${name}">`);
	}

	// Parse explicit classes from remaining files
	for (const { file, layer } of files.slice(3)) {
		const filePath = path.join(stylesDir, file);
		if (!fs.existsSync(filePath)) continue;

		const content = fs.readFileSync(filePath, 'utf8');
		const lines = content.split('\n');
		let currentParent = null;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const trimmed = line.trim();

			// Top level class
			if (line.startsWith('.') && !line.startsWith('..')) {
				const match = line.match(/^(\.[a-zA-Z0-9_-]+)/);
				if (match) {
					currentParent = match[1];
					const desc = stripComment(trimmed.replace(currentParent, ''));
					addEntry(currentParent, layer, '', file, desc || `${currentParent} component / container`);
				}
			}
			// Nested modifier: &.foo — a variant of the parent
			else if (line.startsWith('\t&.') || line.startsWith('  &.')) {
				const match = line.match(/&(\.[a-zA-Z0-9_-]+)/);
				if (match && currentParent) {
					const subClass = `${currentParent}${match[1]}`;
					const desc = stripComment(trimmed.replace(/^&\.[a-zA-Z0-9_-]+/, ''));
					addEntry(subClass, layer, '', file, desc || `Modifier for ${currentParent}`);
				}
			}
			// Nested CHILD: an indented `.foo` under a parent — its own class,
			// required by the parent's markup. These were never indexed, so
			// .page-main, .page-sidebar and .accordion-content existed and
			// worked but were absent from the registry an agent greps.
			// (The `>` form is gone from the system; the pattern is kept so a
			// reintroduced combinator still yields a registry entry rather than
			// a silent gap.)
			else if (/^\s+(&\.[a-zA-Z0-9_-]+\s+)?(>\s*)?\.[a-zA-Z0-9_-]+\s*$/.test(line)) {
				const match = line.match(/(?:>\s*)?(\.[a-zA-Z0-9_-]+)\s*$/);
				if (match && currentParent && !seenClasses.has(match[1])) {
					seenClasses.add(match[1]);
					addEntry(
						match[1],
						layer,
						'',
						file,
						`Required child of ${currentParent} — see canonical-markups.md`
					);
				}
			}
		}
	}

	return { registry, tokens };
}

/**
 * Generate Markdown Registry
 */
function generateMarkdownRegistry(registry, tokens) {
	let md = `# Fractalstyler2 — Complete Class & Token Registry\n\n`;
	md += `Status: **LOCKED & CANONICAL**  \n`;
	md += `Updated: **${new Date().toISOString().split('T')[0]}**  \n`;
	md += `Architecture: **L0 (Tokens) $\\rightarrow$ L1 (Dimensions) $\\rightarrow$ L2 (Containers) $\\rightarrow$ L3 (Layouts) $\\rightarrow$ L4 (Shells) $\\rightarrow$ L5 (Visuals & Interactions)**\n\n`;
	md += `This document is the **single, definitive, grepable master registry** for all CSS classes, tokens, modifiers, and canonical markup structures in \`fractalstyler2\`.\n\n`;
	md += `---\n\n## Quick Grep Cheatsheet\n\n`;
	md += `Format: \`CLASS_NAME | LAYER | CSS PROPERTY / BEHAVIOR | FILE SOURCE | EXAMPLE\`\n\n\`\`\`\n`;

	for (const item of registry) {
		const clsPad = item.class.padEnd(24, ' ');
		const layerPad = item.layer.padEnd(2, ' ');
		const propPad = (item.property || item.description).padEnd(58, ' ');
		const filePad = item.file.padEnd(22, ' ');
		md += `${clsPad} | ${layerPad} | ${propPad} | ${filePad} | ${item.example}\n`;
	}

	md += `\`\`\`\n\n---\n\n## Semantic Token Variables\n\n\`\`\`css\n:root {\n`;
	for (const token of tokens) {
		md += `  ${token.name}: ${token.value};\n`;
	}
	md += `}\n\`\`\`\n`;

	return md;
}

/**
 * Generate the bundled skill's class reference.
 *
 * Emitted from the same registry the stylesheet is parsed into, so the
 * agent-facing reference cannot describe an API the system does not have.
 * This file previously listed a mixin catalog that no longer existed; it is
 * generated now precisely so that cannot recur.
 */
function generateSkillReference(registry, tokens) {
	const LAYERS = [
		['L0', 'Tokens', 'Raw values. Every token also exists as a class.'],
		['L1', 'Dimensions', 'Space, size, radius. Preset steps (3xs..3xl) and the literal ladder, each in three bands: base, -mob, -desk.'],
		['L2', 'Containers', 'Flow and alignment. x* is ALWAYS horizontal, y* is ALWAYS vertical, in every container.'],
		['L3', 'Layouts', 'Grids that step only through divisors, reading measures, frames, reels.'],
		['L4', 'Shells', 'Page and application scaffolding. Each shell class is paired with a canonical markup — see canonical-markups.md.'],
		['L5', 'Visuals & Interactions', 'Surfaces, ink, borders, type, controls. The outermost layer.']
	];

	let md = `# Fractalstyler2 — Class Reference\n\n`;
	md += `GENERATED FILE — do not edit. Emitted by \`scripts/update-registry.js\` from the\n`;
	md += `parsed stylesheet. ${registry.length} classes across ${tokens.length} tokens.\n\n`;
	md += `**The classes below are the entire public API.** The system defines no\n`;
	md += `authoring mixins and no SASS functions — \`+stack\`, \`+surface\`, \`space()\` and\n`;
	md += `friends do not exist. Compose in markup.\n\n`;
	md += `\`*\` marks a family: substitute a preset step (\`3xs 2xs xs sm md lg xl 2xl 3xl\`)\n`;
	md += `or a value from the literal ladder: \`0, 1, 2, 4, 6, 8, 12\`, then every\n`;
	md += `multiple of 8 \u2014 to 64px for gap/pad/marg and radius, to 512px for sizing.\n`;
	md += `Append \`-mob\` or \`-desk\` to bind a\n`;
	md += `class to one side of the 768px seam.\n`;

	for (const [layer, title, blurb] of LAYERS) {
		const items = registry.filter((r) => r.layer === layer);
		if (!items.length) continue;
		md += `\n---\n\n## ${layer} — ${title}\n\n${blurb}\n\n`;
		md += `| Class | Applies | Source |\n|:---|:---|:---|\n`;
		for (const i of items) {
			const applies = (i.property || i.description || '').replace(/\|/g, '\\|');
			md += `| \`${i.class}\` | ${applies} | \`${i.file}\` |\n`;
		}
	}

	md += `\n---\n\n## Semantic Tokens\n\n\`\`\`css\n:root {\n`;
	for (const t of tokens) md += `  ${t.name}: ${t.value};\n`;
	md += `}\n\`\`\`\n`;
	return md;
}

/**
 * Generate the bundled skill's token reference.
 *
 * Read from _00_tokens.sass like everything else. The hand-written version of
 * this file carried v1 token names (--space-s / -m / -l) that have not existed
 * since the scale moved to -sm / -md / -lg.
 */
function generateTokenReference(tokens) {
	const group = (prefix) => tokens.filter((t) => t.name.startsWith(prefix));
	const table = (rows) => {
		let out = `| Token | Class | Value |\n|:---|:---|:---|\n`;
		for (const t of rows) {
			const cls = t.name.startsWith('--space-')
				? `\`.gap${t.name.slice(7)}\` \`.pad${t.name.slice(7)}\``
				: t.name.startsWith('--text-') && !t.name.startsWith('--text-p')
					? `\`.text${t.name.slice(6)}\``
					: '—';
			out += `| \`${t.name}\` | ${cls} | \`${t.value}\` |\n`;
		}
		return out;
	};

	let md = `# Fractalstyler2 — Token Reference\n\n`;
	md += `GENERATED FILE — do not edit. Emitted by \`scripts/update-registry.js\`\n`;
	md += `from \`_00_tokens.sass\`.\n\n`;
	md += `Every token is also a class. If \`--space-md\` exists, so do \`.gap-md\`,\n`;
	md += `\`.pad-md\` and \`.marg-md\`. There is no second vocabulary to learn.\n\n`;

	md += `## Fluid Type Scale\n\nInterpolates smoothly between 360px and 1240px. No breakpoints.\n\n`;
	md += table(group('--text-').filter((t) => /^--text-(xs|sm|md|lg|xl|2xl|3xl|4xl)$/.test(t.name)));

	md += `\n## Fluid Space Scale\n\nGaps and margins scale by \`--gap-scale\`; paddings by \`--pad-scale\`.\n`;
	md += `The two move at different rates under the layout preset.\n\n`;
	md += table(group('--space-'));

	md += `\n## Radius\n\nThe \`-sm/-md/-lg\` channels are what compositions read; shape presets remap them.\n\n`;
	md += table(group('--radius-'));

	md += `\n## Colour Roles\n\nName the role, never the hex. Values shown are the light default;\n`;
	md += `\`[data-mode="dark"]\` and the colour presets remap them.\n\n`;
	const colour = tokens.filter((t) =>
		/^--(bg|text-primary|text-secondary|text-muted|text-inverse|border|theme|ring|state|success|warning|danger|info|feedback)/.test(t.name)
	);
	md += table(colour);

	md += `\n## Preset Axes\n\nStamped as attributes. An absent attribute means that axis's default.\n\n`;
	md += `| Attribute | Values | Default |\n|:---|:---|:---|\n`;
	md += `| \`data-layout\` | tight · comfortable · sprawling | comfortable |\n`;
	md += `| \`data-shape\` | round · curved · pro · sharp | curved |\n`;
	md += `| \`data-color\` | clean · general · vibrant | general |\n`;
	md += `| \`data-motion\` | reduced · active · heavy · springy | active |\n`;
	md += `| \`data-mode\` | light · dark | follows prefers-color-scheme |\n`;
	return md;
}

// Execute Generation
const { registry, tokens } = extractStylesData();
const mdContent = generateMarkdownRegistry(registry, tokens);

fs.writeFileSync(path.join(rootDir, 'REGISTRY.md'), mdContent, 'utf8');
fs.mkdirSync(path.join(rootDir, 'docs'), { recursive: true });
fs.writeFileSync(path.join(rootDir, 'docs', 'REGISTRY.md'), `---\nid: registry-master\ntitle: Master Class & Token Registry\ntype: design\ntags: [registry, classes, tokens, grep, reference, complete]\nsummary: The complete, grepable master registry of all CSS classes, tokens, modifiers, and canonical markup structures in Fractalstyler2.\nupdated: ${new Date().toISOString().split('T')[0]}\n---\n\n# Master Class & Token Registry\n\nThis document is mirrored from [\`REGISTRY.md\`](../REGISTRY.md) at the repository root.\n\nPlease refer to [**\`../REGISTRY.md\`**](../REGISTRY.md) for the single, definitive, grepable master registry.\n`, 'utf8');
fs.writeFileSync(path.join(rootDir, 'registry.json'), JSON.stringify(registry, null, 2), 'utf8');

// The .theme-* palette classes, themes.ts, version.ts and plugin.json were
// retired with the MCP/CLI/presets surface. Theming now lives as [data-mode]
// mixins inside _00_tokens.sass, so there is no theme-id list or version
// export to keep in step — the registry emits only the class/token surfaces.

fs.mkdirSync(path.join(rootDir, 'skills', 'fractal-styler', 'references'), { recursive: true });
fs.writeFileSync(
	path.join(rootDir, 'skills', 'fractal-styler', 'references', 'fractals.md'),
	generateSkillReference(registry, tokens),
	'utf8'
);

fs.writeFileSync(
	path.join(rootDir, 'skills', 'fractal-styler', 'references', 'tokens.md'),
	generateTokenReference(tokens),
	'utf8'
);

console.log(`✔ Registry updated successfully: ${registry.length} classes indexed across ${tokens.length} tokens.`);
