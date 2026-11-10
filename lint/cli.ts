#!/usr/bin/env node
// =============================================================================
// fractalstyler lint — the design system contract linter & agent guard.
//
// Verifies code against the styling system contract:
//   - Svelte files: no scoped <style>, no style="..." attributes, all classes verified
//   - Stylesheets: token purity (no raw hex, >2px budget, valid var(--tokens))
//   - Sass files: valid interpolation, radius ladder usage
//
// Supports:
//   Self mode:     node lint/cli.ts               (inside fractalstyler repo)
//   Consumer mode: node lint/cli.ts <dir>         (linting any project using fractalstyler)
//   Flags:         --json (agent/CI output), --own <file>, --registry <file>
//
// Source is TypeScript, run directly on Node 24 in the repo; the published
// package ships the lint/cli.mjs that `pnpm build:runtime` emits next to it.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry } from './lib/registry.ts';
import { lintSvelteFile } from './lib/svelte-linter.ts';
import { TokenLinter } from './lib/token-linter.ts';
import { lintHardcodedRadius, lintSassNesting } from './lib/css-linter.ts';
import { reportDiagnostics, type Diagnostic } from './lib/agent-reporter.ts';

const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function usage() {
	console.log(`Usage:
  fractalstyler lint              # self mode: audit fractalstyler package
  fractalstyler lint <dir>        # consumer mode: audit project directory
Options:
  --own <file>    extension stylesheet (default <dir>/src/lib/styles/custom.css)
  --registry <f>  registry.json override
  --json          machine-readable JSON diagnostics for agents and CI
  --help          show this help message`);
}

interface Flags {
	json: boolean;
	own: string | null;
	registry: string | null;
}

const SVELTE = /\.svelte$/;
const STYLESHEET = /\.(sass|scss|css)$/;

function walk(
	dir: string,
	filter: (name: string) => boolean,
	out: string[] = [],
	base = dir,
	skip: (relativePath: string) => boolean = () => false,
	root = dir
): string[] {
	if (!fs.existsSync(dir)) return out;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (
			entry.name === 'node_modules' ||
			entry.name === '.svelte-kit' ||
			entry.name === 'dist' ||
			entry.name === '.git' ||
			entry.name === 'reserve' ||
			entry.name.startsWith('.')
		)
			continue;

		const full = path.join(base, entry.name);
		if (skip(path.relative(root, full))) continue;
		if (entry.isDirectory()) walk(full, filter, out, full, skip, root);
		else if (filter(entry.name)) out.push(full);
	}
	return out;
}

const rel = (root: string, file: string) => path.relative(root, file);

function harvestOwnClasses(content: string): Set<string> {
	const names = new Set<string>();
	for (const m of content.matchAll(/(?:^|[\s,{}])(\.)([a-zA-Z][a-zA-Z0-9_-]*)/g)) {
		names.add(m[2]);
	}
	return names;
}

function collectLocalProperties(stylesheets: string[]): Set<string> {
	const names = new Set<string>();
	for (const file of stylesheets) {
		try {
			const content = fs.readFileSync(file, 'utf8');
			for (const m of content.matchAll(/(--[a-zA-Z0-9_-]+)\s*:/g)) {
				names.add(m[1]);
			}
		} catch {}
	}
	return names;
}

async function lintSelf(flags: Flags): Promise<Diagnostic[]> {
	const diagnostics: Diagnostic[] = [];
	const { classes, tokens, stems } = loadRegistry(PKG_ROOT, flags.registry);
	const tokenLinter = new TokenLinter(PKG_ROOT, { tokens });

	// 1. Lint Svelte files in src/
	//    src/lib/components is the in-progress sveltemodular workspace — it is
	//    not part of the styling system yet, so it is not held to the contract.
	const svelteFiles = walk(path.join(PKG_ROOT, 'src'), (f) => SVELTE.test(f), [], path.join(PKG_ROOT, 'src'), (relative) =>
		relative.split(path.sep).slice(0, 2).join('/') === 'lib/components'
	);
	for (const file of svelteFiles) {
		const source = fs.readFileSync(file, 'utf8');
		const relPath = rel(PKG_ROOT, file);
		const result = lintSvelteFile(relPath, source, { allowlist: classes, stems });
		diagnostics.push(...result.diagnostics);
	}

	// 2. Lint the stylesheets in src/lib/styles
	const styleFiles = walk(path.join(PKG_ROOT, 'src', 'lib', 'styles'), (f) => STYLESHEET.test(f));
	for (const file of styleFiles) {
		const source = fs.readFileSync(file, 'utf8');
		const relPath = rel(PKG_ROOT, file);
		diagnostics.push(...lintSassNesting(relPath, source));
	}

	return diagnostics;
}

async function lintConsumer(targetDir: string, flags: Flags): Promise<Diagnostic[]> {
	const diagnostics: Diagnostic[] = [];
	const targetRoot = path.resolve(targetDir);

	// Load canonical registry from fractalstyler package
	const { classes: canonicalClasses, tokens, stems } = loadRegistry(PKG_ROOT, flags.registry);

	// Find consumer's own extension classes
	const ownFile = flags.own
		? path.resolve(flags.own)
		: path.join(targetRoot, 'src', 'lib', 'styles', 'custom.css');

	const ownClasses = new Set<string>();
	if (fs.existsSync(ownFile)) {
		const ownContent = fs.readFileSync(ownFile, 'utf8');
		for (const cls of harvestOwnClasses(ownContent)) {
			ownClasses.add(cls);
		}
	}

	// Full allowlist = canonical registry union with own classes
	const allowlist = new Set([...canonicalClasses, ...ownClasses]);

	// Collect locally defined CSS variables across target
	const stylesheets = walk(targetRoot, (f) => STYLESHEET.test(f));
	const localProps = collectLocalProperties(stylesheets);

	const tokenLinter = new TokenLinter(targetRoot, { tokens });

	// Lint Svelte files
	const svelteFiles = walk(targetRoot, (f) => SVELTE.test(f));
	for (const file of svelteFiles) {
		const source = fs.readFileSync(file, 'utf8');
		const relPath = rel(targetRoot, file);
		const result = lintSvelteFile(relPath, source, { allowlist, stems });
		diagnostics.push(...result.diagnostics);
	}

	// Lint stylesheets (the system layers are the package's own; a consumer's
	// own stylesheet is theirs to lint)
	for (const file of stylesheets) {
		const base = path.basename(file);
		// The system layers belong to the package: they are where the hex and
		// the ladders live. A consumer's own stylesheet is not exempt.
		if (base === 'index.css') continue;

		const source = fs.readFileSync(file, 'utf8');
		const relPath = rel(targetRoot, file);

		diagnostics.push(...tokenLinter.lintFile(relPath, source, localProps));
		diagnostics.push(...lintSassNesting(relPath, source));
		diagnostics.push(...lintHardcodedRadius(relPath, source));
	}

	return diagnostics;
}

async function main() {
	const args = process.argv.slice(2);
	const flags: Flags = { json: false, own: null, registry: null };
	const positional: string[] = [];

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (arg === '--help' || arg === '-h') {
			usage();
			process.exit(0);
		} else if (arg === '--json') {
			flags.json = true;
		} else if (arg === '--own' && i + 1 < args.length) {
			flags.own = args[++i];
		} else if (arg === '--registry' && i + 1 < args.length) {
			flags.registry = args[++i];
		} else if (!arg.startsWith('-')) {
			positional.push(arg);
		}
	}

	const targetDir = positional[0] === 'lint' ? positional[1] : positional[0];

	let diagnostics: Diagnostic[] = [];
	try {
		if (!targetDir || targetDir === '.') {
			diagnostics = await lintSelf(flags);
		} else {
			diagnostics = await lintConsumer(targetDir, flags);
		}

		reportDiagnostics(diagnostics, { json: flags.json });
		const hasErrors = diagnostics.some((d) => d.severity === 'error');
		process.exit(hasErrors ? 1 : 0);
	} catch (err) {
		console.error(`\x1b[31mError during lint: ${(err as Error).message}\x1b[0m`);
		if (process.env.DEBUG) console.error(err);
		process.exit(2);
	}
}

main();
