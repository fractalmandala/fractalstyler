#!/usr/bin/env node
/**
 * scripts/parse-sass-ast.js
 * 
 * Deterministic structural AST parser for indented Sass (.sass).
 * Extracts symbols, tokens, interpolations, calcs, annotations, and structural hierarchy.
 */

import fs from 'node:fs';
import path from 'node:path';

/**
 * Extracts Sass & CSS symbols from a string.
 */
export function extractSymbols(text) {
	if (!text) return { interpolations: [], tokens: [], sassFunctions: [], calcs: [] };

	const interpolations = [];
	const interpRegex = /#\{([^}]+)\}/g;
	let match;
	while ((match = interpRegex.exec(text)) !== null) {
		interpolations.push({
			raw: match[0],
			expression: match[1].trim()
		});
	}

	const tokens = [];
	const tokenRegex = /var\((--[a-zA-Z0-9_-]+)(?:,\s*([^)]+))?\)/g;
	while ((match = tokenRegex.exec(text)) !== null) {
		tokens.push({
			token: match[1],
			fallback: match[2] ? match[2].trim() : null
		});
	}

	const sassFunctions = [];
	const fnRegex = /(?:string\.unquote|map\.get|list\.append|math\.div|list\.nth)\s*\(([^)]+)\)/g;
	while ((match = fnRegex.exec(text)) !== null) {
		sassFunctions.push({
			call: match[0],
			args: match[1].trim()
		});
	}

	const calcs = [];
	const calcRegex = /calc\(([^;]+)\)/g;
	while ((match = calcRegex.exec(text)) !== null) {
		calcs.push(match[1].trim());
	}

	return {
		interpolations,
		tokens,
		sassFunctions,
		calcs
	};
}

/**
 * Parses indented Sass into a structural AST tree.
 */
export function parseIndentedSass(content, filename = 'stdin') {
	const lines = content.split('\n');
	const root = {
		type: 'root',
		file: filename,
		children: []
	};

	const stack = [{ indent: -1, node: root }];
	let pendingComments = [];

	for (let i = 0; i < lines.length; i++) {
		const rawLine = lines[i];
		const lineNum = i + 1;
		const trimmed = rawLine.trim();

		if (!trimmed) {
			continue;
		}

		// Count leading tabs
		const matchIndent = rawLine.match(/^(\t*)/);
		const indent = matchIndent ? matchIndent[1].length : 0;

		// Comment line
		if (trimmed.startsWith('//') || trimmed.startsWith('/*')) {
			const cleanText = trimmed.replace(/^\/\/\s?|^\/\*\s?|\*\/$/g, '');
			pendingComments.push({
				line: lineNum,
				raw: trimmed,
				text: cleanText
			});
			continue;
		}

		// Pop stack until parent indentation is less than current indentation
		while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
			stack.pop();
		}
		const parent = stack[stack.length - 1].node;

		let node = null;
		const symbols = extractSymbols(trimmed);

		if (trimmed.startsWith('$')) {
			// Variable definition: $name: value
			const colonIdx = trimmed.indexOf(':');
			const name = trimmed.slice(1, colonIdx).trim();
			const rawVal = trimmed.slice(colonIdx + 1).trim();
			const isDefault = rawVal.includes('!default');
			const value = rawVal.replace('!default', '').trim();

			node = {
				type: 'variable',
				name,
				value,
				isDefault,
				line: lineNum,
				indent,
				raw: trimmed,
				symbols,
				precedingComments: [...pendingComments]
			};
			pendingComments = [];
		} else if (trimmed.startsWith('@')) {
			// At-rule: @use, @media, @each, @for, @if, etc.
			const spaceIdx = trimmed.indexOf(' ');
			const name = spaceIdx > 0 ? trimmed.slice(1, spaceIdx) : trimmed.slice(1);
			const params = spaceIdx > 0 ? trimmed.slice(spaceIdx + 1).trim() : '';

			node = {
				type: 'atrule',
				name,
				params,
				line: lineNum,
				indent,
				raw: trimmed,
				symbols,
				precedingComments: [...pendingComments],
				children: []
			};
			pendingComments = [];
		} else if (trimmed.startsWith('=') || trimmed.startsWith('+')) {
			// Mixin definition (=) or inclusion (+)
			const isDef = trimmed.startsWith('=');
			node = {
				type: isDef ? 'mixin-def' : 'mixin-call',
				name: trimmed.slice(1).trim(),
				line: lineNum,
				indent,
				raw: trimmed,
				symbols,
				precedingComments: [...pendingComments],
				children: isDef ? [] : undefined
			};
			pendingComments = [];
		} else if (
			trimmed.includes(':') &&
			!trimmed.startsWith('&') &&
			!trimmed.startsWith('.') &&
			!trimmed.startsWith('#') &&
			!trimmed.startsWith('[') &&
			!trimmed.startsWith('@')
		) {
			// Declaration: property: value
			const colonIdx = trimmed.indexOf(':');
			const prop = trimmed.slice(0, colonIdx).trim();
			const value = trimmed.slice(colonIdx + 1).trim();

			node = {
				type: 'declaration',
				prop,
				value,
				line: lineNum,
				indent,
				raw: trimmed,
				symbols,
				precedingComments: [...pendingComments]
			};
			pendingComments = [];
		} else {
			// Rule Selector
			node = {
				type: 'rule',
				selector: trimmed,
				line: lineNum,
				indent,
				raw: trimmed,
				symbols,
				precedingComments: [...pendingComments],
				children: []
			};
			pendingComments = [];
		}

		if (!parent.children) parent.children = [];
		parent.children.push(node);

		if (node.children) {
			stack.push({ indent, node });
		}
	}

	return root;
}

// ---------------------------------------------------------------------------
// CLI Execution
// ---------------------------------------------------------------------------
if (import.meta.url === `file://${process.argv[1]}`) {
	const args = process.argv.slice(2);
	const stylesDir = path.resolve('src/lib/styles');

	if (args.includes('--all')) {
		const files = fs
			.readdirSync(stylesDir)
			.filter((f) => f.endsWith('.sass'))
			.sort();
		const results = {};

		for (const f of files) {
			const fullPath = path.join(stylesDir, f);
			const content = fs.readFileSync(fullPath, 'utf8');
			results[f] = parseIndentedSass(content, f);
		}

		const outIdx = args.indexOf('--out');
		if (outIdx !== -1 && args[outIdx + 1]) {
			const targetOut = path.resolve(args[outIdx + 1]);
			fs.writeFileSync(targetOut, JSON.stringify(results, null, 2), 'utf8');
			console.log(`Successfully wrote full AST of ${files.length} files to ${targetOut}`);
		} else {
			console.log(JSON.stringify(results, null, 2));
		}
	} else if (args[0] && !args[0].startsWith('--')) {
		const targetFile = path.resolve(args[0]);
		if (!fs.existsSync(targetFile)) {
			console.error(`File not found: ${targetFile}`);
			process.exit(1);
		}
		const content = fs.readFileSync(targetFile, 'utf8');
		const ast = parseIndentedSass(content, path.basename(targetFile));

		const outIdx = args.indexOf('--out');
		if (outIdx !== -1 && args[outIdx + 1]) {
			const targetOut = path.resolve(args[outIdx + 1]);
			fs.writeFileSync(targetOut, JSON.stringify(ast, null, 2), 'utf8');
			console.log(`Wrote AST to ${targetOut}`);
		} else {
			console.log(JSON.stringify(ast, null, 2));
		}
	} else {
		console.log(`
Usage:
  node scripts/parse-sass-ast.js <file.sass> [--out <output.json>]
  node scripts/parse-sass-ast.js --all [--out <output.json>]
`);
	}
}
