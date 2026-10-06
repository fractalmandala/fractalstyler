// =============================================================================
// Token-purity linter for fractalstyler.
//
// Enforces:
//   fs/token-purity:
//     - No raw hex colors (#fff, #123456) — all colors must resolve via tokens.
//     - >2px pixel budget — arbitrary pixels break density and design scale.
//     - No unmapped custom properties — var(--name) must resolve to a valid token.
// =============================================================================

import { findClosestMatches } from './fuzzy.mjs';

const PX_BUDGET = 2; // 1-2px stays legal for hairlines and borders.

export class TokenLinter {
	/**
	 * @param {string} rootDir
	 * @param {{ tokens: Set<string> }} opts
	 */
	constructor(rootDir, opts) {
		this.rootDir = rootDir;
		this.validTokens = new Set(opts.tokens);
	}

	/**
	 * Scans a stylesheet string.
	 * @param {string} relPath
	 * @param {string} content
	 * @param {Set<string>} [localProperties] Locally defined custom properties in project.
	 */
	lintFile(relPath, content, localProperties = new Set()) {
		const diagnostics = [];
		const lines = content.split('\n');

		lines.forEach((line, idx) => {
			const lineNum = idx + 1;
			const cleanLine = line.replace(/\/\/.*$/, '').replace(/\/\*[\s\S]*?\*\//, '').trim();
			if (!cleanLine) return;

			// Rule 1: No raw hex colors
			for (const m of cleanLine.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
				diagnostics.push({
					rule: 'fs/token-purity',
					severity: 'error',
					file: relPath,
					line: lineNum,
					column: m.index + 1,
					found: m[0],
					rationale:
						'Raw hex colors bypass semantic theming. Every color must resolve through a system token (var(--bg), var(--text-primary), var(--brand), etc.) so light/dark mode and presets reach it.',
					suggestion: `Replace "${m[0]}" with the semantic color token it expresses, or define it in _00_tokens.sass.`
				});
			}

			// Rule 2: The px budget (>2px must come from dimension ladder or tokens)
			for (const m of cleanLine.matchAll(/(?<![0-9a-zA-Z_.-])(-?\d+)px\b/g)) {
				const px = parseInt(m[1], 10);
				if (Math.abs(px) <= PX_BUDGET) continue;
				diagnostics.push({
					rule: 'fs/token-purity',
					severity: 'error',
					file: relPath,
					line: lineNum,
					column: m.index + 1,
					found: m[0],
					rationale:
						'Arbitrary pixel dimensions bypass the dimension ladder and token scale. Only 1-2px (borders, outlines, hairlines) may be literal.',
					suggestion: `Replace "${m[0]}" with the nearest system class (e.g. .gap-16, .pad-sm, .w-64) or a spacing/dimension token.`
				});
			}

			// Rule 3: Unmapped variables
			for (const vm of cleanLine.matchAll(/var\((--[a-zA-Z0-9_-]+)/g)) {
				const varName = vm[1];
				if (this.validTokens.has(varName) || localProperties.has(varName)) continue;
				const closest = findClosestMatches(varName, this.validTokens, 3, 5);
				const suggestion =
					closest.length > 0
						? `Did you mean one of these?\n  - ${closest.map((t) => `var(${t})`).join('\n  - ')}`
						: `Token "${varName}" is not in the system contract. Use an existing token or define it in _00_tokens.sass / _09_own.sass.`;

				diagnostics.push({
					rule: 'fs/token-purity',
					severity: 'error',
					file: relPath,
					line: lineNum,
					column: vm.index + 1,
					found: vm[0],
					rationale: `The custom property "${varName}" is not defined in the system token contract.`,
					suggestion
				});
			}
		});

		return diagnostics;
	}
}
