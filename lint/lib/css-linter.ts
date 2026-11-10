// =============================================================================
// CSS declaration linters for fractalstyler.
//
// 1. fs/hardcoded-radius — Corners should route through the radius ladder
//    `var(--radius-*)` so the theme shape modifiers can restyle them.
//
// 2. fs/sass-nesting — `&` is Sass nesting. In a plain CSS stylesheet it is
//    an invalid selector, and the browser drops the whole rule — including
//    the valid selector that shared the list.
// =============================================================================

import type { Diagnostic } from './agent-reporter.ts';

const RADIUS_OK = /^(?:0(?:px)?|inherit|initial|unset|var\(--radius[^)]*\))$/;

/** The radius ladder: a literal corner cannot be reached by the shape axis. */
export function lintHardcodedRadius(relPath: string, content: string): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	content.split('\n').forEach((line, idx) => {
		const cleanLine = line.replace(/\/\/.*$/, '').replace(/\/\*[\s\S]*?\*\//, '');
		const decl = cleanLine.match(/(^|\s)(border-radius)\s*:\s*(.+)$/);
		if (!decl) return;

		const bad = decl[3]
			.trim()
			.split(/\s+/)
			.filter((token) => token && !RADIUS_OK.test(token));
		if (bad.length === 0) return;

		diagnostics.push({
			rule: 'fs/hardcoded-radius',
			severity: 'warning',
			file: relPath,
			line: idx + 1,
			column: line.indexOf(decl[2]) + 1,
			found: `border-radius: ${decl[3].trim()}`,
			rationale:
				'Literal border-radius values are unreachable by the theme shape axis. Data attributes rewrite the --radius-* ladder.',
			suggestion: `Route the corner through the ladder — var(--radius-xs/sm/md/bs/lg/xl) or system radius classes.`
		});
	});
	return diagnostics;
}

/** `&` in a plain CSS selector — the rule never reaches the browser. */
export function lintSassNesting(relPath: string, content: string): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	content.split('\n').forEach((line, idx) => {
		const cleanLine = line.replace(/\/\*[\s\S]*?\*\//g, '');
		if (!cleanLine.includes('&')) return;
		diagnostics.push({
			rule: 'fs/sass-nesting',
			severity: 'error',
			file: relPath,
			line: idx + 1,
			column: cleanLine.indexOf('&') + 1,
			found: cleanLine.trim(),
			rationale:
				'This stylesheet is plain CSS: `&` is not a valid selector there. The browser drops the entire rule, so every class in the list loses its styling.',
			suggestion: 'Write the selector out in full — `.info, .variant-info` — and drop the `&`.'
		});
	});
	return diagnostics;
}
