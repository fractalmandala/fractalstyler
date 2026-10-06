// =============================================================================
// Svelte contract scanner for fractalstyler.
//
// Zero-dependency regex scanner that runs via CLI or in CI. Enforces:
//   fs/no-in-component-styles — no scoped <style> blocks.
//   fs/no-inline-styles       — no style="..." attributes.
//   fs/unknown-class          — every class used in markup must exist in registry.
// =============================================================================

import { findClosestMatches } from './fuzzy.mjs';

const CLASS_ATTR = /\sclass\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
const CLASS_DIRECTIVE = /\sclass:([a-zA-Z0-9_-]+)/g;
const STYLE_BLOCK = /<style[\s>]/;
const STYLE_ATTR = /\sstyle\s*=/;

/**
 * Lints a Svelte file for styling system compliance.
 * @param {string} relPath
 * @param {string} source
 * @param {{ allowlist?: Set<string>, stems?: string[] }} [options]
 * @returns {{ diagnostics: Array, classes: Set<string> }}
 */
export function lintSvelteFile(relPath, source, options = {}) {
	const diagnostics = [];
	const classes = new Set();
	const { allowlist, stems = [] } = options;

	// Rule 1: No scoped <style> blocks
	if (STYLE_BLOCK.test(source)) {
		const line = source.slice(0, source.search(STYLE_BLOCK)).split('\n').length;
		diagnostics.push({
			rule: 'fs/no-in-component-styles',
			severity: 'error',
			file: relPath,
			line,
			found: '<style> block detected',
			rationale:
				'Components must remain pure markup & logic. Scoped styles fragment the design system, block global theme changes, and leak ad-hoc CSS.',
			suggestion:
				'Remove the <style> block and express the design using fractalstyler classes. If a class is missing, add it to the designated layer in src/lib/styles or your _09_own.sass.'
		});
	}

	// Strip <script> content first so JS assignments like `style = ...` are not flagged
	const scriptStart = source.indexOf('<script');
	let markup = source;
	if (scriptStart !== -1) {
		const scriptEnd = source.indexOf('</script>', scriptStart);
		if (scriptEnd !== -1) {
			markup = source.slice(0, scriptStart) + source.slice(scriptEnd + '</script>'.length);
		}
	}

	// Rule 2: No inline style="..." attributes
	if (STYLE_ATTR.test(markup)) {
		const match = markup.match(STYLE_ATTR);
		const line = markup.slice(0, match.index).split('\n').length;
		diagnostics.push({
			rule: 'fs/no-inline-styles',
			severity: 'error',
			file: relPath,
			line,
			found: match[0].trim(),
			rationale:
				'Inline styles are unconstrained ad-hoc CSS: invisible to the registry, unreachable by theme switches, and unaccountable to the design system.',
			suggestion:
				'Express the styling intent using canonical classes (e.g. .w-full, .pad-sm, .gap-md). Never patch elements with inline CSS.'
		});
	}

	// Harvest classes
	for (const m of markup.matchAll(CLASS_ATTR)) {
		const value = m[1] ?? m[2] ?? '';
		for (const name of value.split(/\s+/)) {
			// Skip interpolated fragments (class="x {expr} y")
			if (name && !/[{()}]/.test(name) && !name.startsWith('{')) {
				classes.add(name);
			}
		}
	}
	for (const m of markup.matchAll(CLASS_DIRECTIVE)) {
		classes.add(m[1]);
	}

	// Rule 3: Check unknown classes against allowlist if provided
	if (allowlist && allowlist.size > 0) {
		for (const cls of classes) {
			// Check exact match, modifier, or stem match
			const isAllowed =
				allowlist.has(cls) ||
				stems.some((stem) => cls.startsWith(stem)) ||
				/-(mob|desk)$/.test(cls);

			if (!isAllowed) {
				const closest = findClosestMatches(cls, allowlist, 3, 4);
				const suggestion =
					closest.length > 0
						? `Class ".${cls}" is not in the system registry. Did you mean one of these?\n  - .${closest.join('\n  - .')}`
						: `Class ".${cls}" is not in the system registry. Compose using existing classes in REGISTRY.md, or add it to the appropriate system partial in src/lib/styles (or _09_own.sass).`;

				diagnostics.push({
					rule: 'fs/unknown-class',
					severity: 'error',
					file: relPath,
					found: `.${cls}`,
					rationale:
						`The closed-world styling contract forbids ad-hoc or hallucinated classes. Every class must resolve to the verified system registry.`,
					suggestion
				});
			}
		}
	}

	return { diagnostics, classes };
}
