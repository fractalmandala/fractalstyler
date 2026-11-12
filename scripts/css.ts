// =============================================================================
// css.ts — the CSS reader the registry, the token registry and the build all
// share.
//
// The stylesheet is plain CSS: flat rules, no nesting, at-rules for @layer,
// @media, @supports and @keyframes. This module turns that text into a tree
// and answers the questions the rest of the tooling asks of it:
//   - which custom properties are SYSTEM tokens (declared in a global scope)
//   - which classes exist, and what declares them
//
// Scope is the rule that matters: a custom property declared on `:root` (or
// `[data-mode='light'|'dark']`, `html`, `body`) is a system token; one
// declared on a component (`:where(.modular) { --modular-gap }`) belongs to
// that component and is not part of the registry.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';

export interface CssDecl {
	type: 'decl';
	text: string;
}

export interface CssRule {
	type: 'rule';
	selector: string;
	children: CssNode[];
}

export interface CssAtRule {
	type: 'at';
	name: string;
	params: string;
	children: CssNode[];
}

export type CssNode = CssDecl | CssRule | CssAtRule;

/**
 * Resolve the @import list of a stylesheet into the layers it pulls in, in
 * order. Only same-directory relative imports of .css files are followed.
 */
export function resolveCssLayers(entry: string, seen = new Set<string>()): string[] {
	const absolute = path.resolve(entry);
	if (seen.has(absolute)) return [];
	seen.add(absolute);

	const out: string[] = [];
	const dir = path.dirname(absolute);
	const source = fs.readFileSync(absolute, 'utf8');
	const pattern = /@import\s+['"]([^'"]+)['"]\s*;/g;
	let match: RegExpExecArray | null;
	while ((match = pattern.exec(source)) !== null) {
		const target = match[1];
		if (!target.endsWith('.css')) {
			throw new Error(`${entry}: only .css imports are supported — "${target}"`);
		}
		out.push(...resolveCssLayers(path.join(dir, target), seen));
	}
	// A layer with no imports of its own is a layer of its own.
	pattern.lastIndex = 0;
	if (!/@import\s/.test(source)) out.push(absolute);
	return out;
}

/** A custom property declared in a global scope. */
export interface Token {
	name: string;
	value: string;
	scope: string;
}

export function stripComments(css: string): string {
	return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

/** Parse a stylesheet into a rule tree. Declarations keep their source text. */
export function parseCss(css: string): CssNode[] {
	const text = stripComments(css);
	const root: CssNode[] = [];
	const stack: CssNode[][] = [];
	let buffer = '';

	const children = (): CssNode[] => (stack.length ? stack[stack.length - 1] : root);

	for (const char of text) {
		if (char === '{') {
			const prelude = buffer.trim();
			buffer = '';
			const node: CssRule | CssAtRule = prelude.startsWith('@')
				? { type: 'at', name: prelude.slice(1).split(/[\s(]/)[0], params: prelude, children: [] }
				: { type: 'rule', selector: prelude, children: [] };
			children().push(node);
			stack.push(node.children);
		} else if (char === '}') {
			if (buffer.trim()) children().push({ type: 'decl', text: buffer.trim() });
			buffer = '';
			stack.pop();
		} else if (char === ';') {
			if (buffer.trim()) children().push({ type: 'decl', text: buffer.trim() });
			buffer = '';
		} else {
			buffer += char;
		}
	}
	return root;
}

/** Split a selector list on top-level commas — brackets and parens nest. */
export function splitSelectorList(selectorList: string): string[] {
	const out: string[] = [];
	let depth = 0;
	let current = '';
	for (const char of selectorList) {
		if (char === '[' || char === '(') depth++;
		else if (char === ']' || char === ')') depth--;
		if (char === ',' && depth === 0) {
			out.push(current.trim());
			current = '';
			continue;
		}
		current += char;
	}
	if (current.trim()) out.push(current.trim());
	return out;
}

/** The class names in a selector, without the dots. */
export function classesIn(selector: string): string[] {
	return [...selector.matchAll(/\.([A-Za-z_][\w-]*)/g)].map((m) => m[1]);
}

/** A single simple selector that scopes to the whole document, not a component. */
function isSimpleGlobalSelector(selector: string): boolean {
	return /^(:root|html|body|\[data-mode=['"]?(light|dark)['"]?\])$/.test(selector.trim());
}

/** True if any part of a selector list is a global scope.
 *  `[data-mode='light'], [data-mode='light'] [data-theme]` is global because
 *  the first part is; the rest only re-applies the same tokens on a themed subtree. */
export function isGlobalSelector(selector: string): boolean {
	return splitSelectorList(selector).some(isSimpleGlobalSelector);
}

/** The custom properties declared in global scopes, in source order. */
export function collectGlobalTokens(css: string): Token[] {
	const tokens: Token[] = [];

	const walk = (nodes: CssNode[], scope: string | null): void => {
		for (const node of nodes) {
			if (node.type === 'at') {
				walk(node.children, scope);
				continue;
			}
			if (node.type === 'rule') {
				const isRoot = isGlobalSelector(node.selector);
				walk(node.children, isRoot ? scope ?? 'root' : scope);
				continue;
			}
			if (!scope) continue;
			const match = node.text.match(/^(--[\w-]+)\s*:\s*([\s\S]+)$/);
			if (match) tokens.push({ name: match[1], value: match[2].trim(), scope });
		}
	};

	walk(parseCss(css), null);
	return tokens;
}
