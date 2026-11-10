#!/usr/bin/env node
// =============================================================================
// build-tokens-registry — regenerate src/lib/tokensRegistry.ts from the CSS.
//
// Ground truth: the custom properties declared in a GLOBAL scope across
// src/lib/styles/*.css — `:root`, `html`, `body` and `[data-mode='light'|'dark']`.
//
// Tokens scoped to a component are not system tokens and are skipped:
//   :where(.modular) { --modular-gap: 4px }              → the component's own
//   .avatar-group.gap-overlap { --avatar-ring: … }        → the component's own
// A dark-mode block redefines the light-mode tokens: first definition wins,
// so the registry describes the light theme.
//
// The registry is types only — the token NAMES and their value type. The
// values live in the stylesheet; the registry tells a consumer which tokens
// exist and whether to read them as a number or a string.
//
//   node scripts/build-tokens-registry.ts
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectGlobalTokens } from './css.ts';
import { styleFiles } from './update-registry.ts';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STYLES_DIR = path.join(PKG_ROOT, 'src', 'lib', 'styles');
const OUT_FILE = path.join(PKG_ROOT, 'src', 'lib', 'tokensRegistry.ts');
const SCRIPT_PATH = 'scripts/build-tokens-registry.ts';

/** A bare number is read as a number; everything else is a string. */
function typeOf(value: string): 'number' | 'string' {
	return /^-?\d+(\.\d+)?$/.test(value) ? 'number' : 'string';
}

function main(): void {
	if (!fs.existsSync(STYLES_DIR)) {
		console.error(`✕ no styles directory at ${STYLES_DIR}`);
		process.exit(1);
	}

	// First definition wins: the light theme precedes the dark one.
	const byName = new Map<string, { name: string; value: string; file: string }>();
	const order: { name: string; value: string; file: string }[] = [];

	for (const file of styleFiles()) {
		const css = fs.readFileSync(path.join(STYLES_DIR, file), 'utf8');
		for (const token of collectGlobalTokens(css)) {
			if (byName.has(token.name)) continue;
			const entry = { name: token.name, value: token.value, file };
			byName.set(token.name, entry);
			order.push(entry);
		}
	}

	// Group by the file that declares the token — where a token comes from is
	// part of knowing what it is.
	const groups = new Map<string, typeof order>();
	for (const token of order) {
		const group = groups.get(token.file);
		if (group) group.push(token);
		else groups.set(token.file, [token]);
	}

	const lines: string[] = [
		`// Generated via script - \`${SCRIPT_PATH}\`. Do not edit by hand!`,
		'//',
		'// Source: src/lib/styles/*.css — global scopes only (:root, html, body,',
		'// [data-mode]). Tokens scoped to a component are not system tokens.',
		'',
		'export interface FractalstylerTokens {'
	];

	for (const [file, group] of groups) {
		lines.push('', `\t// ── ${file} ${'─'.repeat(Math.max(1, 60 - file.length))}`);
		for (const token of group) {
			const name = token.name.replace(/^--/, '');
			lines.push(`\t'${name}': ${typeOf(token.value)};`);
		}
	}

	lines.push('}', '', 'export type FractalstylerToken = keyof FractalstylerTokens;', '');

	fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf8');
	console.log(
		`✔ ${path.relative(PKG_ROOT, OUT_FILE)} — ${order.length} tokens from ${groups.size} files`
	);
}

main();
