// =============================================================================
// Sass declaration linters for fractalstyler.
//
// 1. fs/sass-interpolation — Sass parses custom-property values literally.
//    Functions like list.nth(...) or map.get(...) inside `--name: ...`
//    must be wrapped in `#{...}` to be evaluated rather than emitted verbatim.
//
// 2. fs/hardcoded-radius — Corners should route through the radius ladder
//    `var(--radius-*)` so theme shape modifiers can restyle them.
// =============================================================================

import type { Diagnostic } from './agent-reporter.mts';

const SASS_NAMESPACED = /\b(?:map|list|math|color|string|meta|selector|sass)\.[a-z-]+\s*\(/;
const SASS_CORE =
	/\b(?:if|nth|append|join|zip|index|list-separator|is-bracketed|length|set-nth|unit|unitless|percentage|floor|ceil|abs|random|quote|unquote|str-length|str-insert|str-index|str-slice|to-upper-case|to-lower-case|type-of|comparable|call|get-function|inspect|variable-exists|function-exists|global-variable-exists|feature-exists|keywords|mix|lighten|darken|saturate|desaturate|grayscale|invert|opacify|fade-in|transparentize|fade-out|adjust-hue|scale-color|change-color|adjust-color|ie-hex-str|red|green|blue|hue|saturation|lightness|alpha|opacity)\s*\(/;

export function lintUninterpolatedFunctions(relPath: string, content: string): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	content.split('\n').forEach((line, idx) => {
		const cleanLine = line.replace(/\/\/.*$/, '').replace(/\/\*[\s\S]*?\*\//, '');
		const decl = cleanLine.match(/(^|\s)(--[a-zA-Z0-9_-]+)\s*:\s*(.+)$/);
		if (!decl) return;

		const value = decl[3].replace(/#\{[\s\S]*?\}/g, '');
		const hit = value.match(SASS_NAMESPACED) || value.match(SASS_CORE);
		if (!hit) return;

		diagnostics.push({
			rule: 'fs/sass-interpolation',
			severity: 'error',
			file: relPath,
			line: idx + 1,
			column: line.indexOf(decl[2]) + 1,
			found: `${decl[2]}: ${decl[3].trim()}`,
			rationale:
				'Sass parses custom-property values literally: this function call is NOT evaluated — its source text ships to the browser as the value. Only #{…} interpolation is evaluated inside a custom property.',
			suggestion: `Wrap the function call in interpolation: ${decl[2]}: #{${decl[3].trim()}} — or compute the value into a Sass variable first.`
		});
	});
	return diagnostics;
}

const RADIUS_OK = /^(?:0(?:px)?|inherit|initial|unset|var\(--radius[^)]*\))$/;

export function lintHardcodedRadius(relPath: string, content: string): Diagnostic[] {
	const diagnostics: Diagnostic[] = [];
	content.split('\n').forEach((line, idx) => {
		const cleanLine = line.replace(/\/\/.*$/, '').replace(/\/\*[\s\S]*?\*\//, '');
		const decl = cleanLine.match(/(^|\s)(border-radius)\s*:\s*(.+)$/);
		if (!decl) return;

		const bad = decl[3]
			.replace(/#\{[^}]*\}/g, ' ')
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
