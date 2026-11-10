// =============================================================================
// scaffold — the init/eject engine behind cli/main.ts.
//
// Two ways a project can hold the styles:
//   track — the package stays in node_modules; the stylesheet is imported
//           from it; upgrades come from npm. Only the docs are placed into
//           the project.
//   eject — the style layers and the registry builder are copied into the
//           project. Nothing is ever overwritten: on a name conflict the
//           existing file is kept and reported.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { spawnSync } from 'node:child_process';

// --- types -------------------------------------------------------------------

/** Parsed CLI options (cli/main.ts). null means "not given — ask or default". */
export interface ScaffoldOptions {
	mode: 'track' | 'eject' | null;
	docs: boolean | null;
	docsDir: string;
	stylesDir: string;
	scriptsDir: string;
	yes: boolean;
}

interface CopyResult {
	file: string;
	status: 'placed' | 'kept' | 'missing';
}

interface Choice<T> {
	title: string;
	value: T;
}

// --- shared constants --------------------------------------------------------

/**
 * The registry builder, copied into an ejected project.
 *
 * The sources are TypeScript and they run as they are — except that a
 * consumer's package.json may say `"type": "commonjs"` (npm init writes it),
 * and then Node would read a `.ts` file as CommonJS and choke on its first
 * `import`. The launcher is copied with them: it loads the TypeScript as ESM
 * whatever the project says.
 */
const BUILDER_FILES: [string, string][] = [
	['scripts/update-registry.ts', 'update-registry.ts'],
	['scripts/css.ts', 'css.ts'],
	['runtime/run.mjs', 'run.mjs']
];

const SEED_CUSTOM = `/* ============================================================================
 * custom.css — the sanctioned extension point.
 *
 * Project-specific styling that cannot be expressed via the canonical layers
 * lives here. Every class in this file joins the system registry.
 * ========================================================================== */

/* Example — delete freely:
.your-class {
	color: var(--text-primary);
}
*/
`;

const BUILD_REGISTRY = `#!/usr/bin/env node
// Regenerates registry.json, registry.md and the agent skill references from
// src/lib/styles. Run it after any edit to the layers.
// Node only — no CSS toolchain needed.
//
// The builder is TypeScript. run.mjs loads it as ESM, so this works whatever
// your package.json says about module types.
import { run } from './run.mjs';

const { writeRegistry } = await run(new URL('./update-registry.ts', import.meta.url).href);
const { rows, tokens } = writeRegistry();

console.log(\`✔ Registry written: \${rows.length} classes, \${tokens.length} tokens.\`);
console.log('  Emit: registry.json, registry.md, skills/fractalstyler/references/{fractals,tokens}.md');
`;

// --- small helpers -----------------------------------------------------------

const say = (text = ''): void => console.log(text);

function copyNoOverwrite(from: string, to: string): CopyResult {
	if (fs.existsSync(to)) return { file: path.basename(to), status: 'kept' };
	fs.mkdirSync(path.dirname(to), { recursive: true });
	fs.copyFileSync(from, to);
	return { file: path.basename(to), status: 'placed' };
}

function writeFileNoOverwrite(to: string, content: string): CopyResult {
	if (fs.existsSync(to)) return { file: path.basename(to), status: 'kept' };
	fs.mkdirSync(path.dirname(to), { recursive: true });
	fs.writeFileSync(to, content, 'utf8');
	return { file: path.basename(to), status: 'placed' };
}

async function confirm(rl: readline.Interface, message: string, defaultValue: boolean): Promise<boolean> {
	const answer = (await rl.question(`${message} ${defaultValue ? '(Y/n)' : '(y/N)'} `)).trim().toLowerCase();
	if (!answer) return defaultValue;
	return answer.startsWith('y');
}

async function select<T>(rl: readline.Interface, message: string, options: Choice<T>[], defaultValue: T): Promise<T> {
	say(message);
	options.forEach((option, index) => {
		const mark = option.value === defaultValue ? ' (default)' : '';
		say(`  ${index + 1}. ${option.title}${mark}`);
	});
	for (;;) {
		const answer = (await rl.question('> ')).trim();
		if (!answer) return defaultValue;
		const number = Number(answer);
		if (Number.isInteger(number) && number >= 1 && number <= options.length) {
			return options[number - 1].value;
		}
		const byTitle = options.find((o) => o.title.toLowerCase() === answer.toLowerCase());
		if (byTitle) return byTitle.value;
		say(`Pick 1-${options.length}, or Enter for the default.`);
	}
}

function maybePrompt(): boolean {
	return process.stdin.isTTY && process.stdout.isTTY;
}

// --- docs --------------------------------------------------------------------

/**
 * Copy the documentation into the project. The docs are a generated snapshot
 * — within the target dir they are overwritten (they carry their own
 * "Generated" banners). Only the default dedicated folder is safe for that;
 * a custom --docs-dir of '.' gets a warning.
 */
function placeDocs(pkgRoot: string, docsDir: string): { placed: string[]; kept: string[] } {
	const placed: string[] = [];
	const kept: string[] = [];
	const source = path.join(pkgRoot, 'docs');
	if (!fs.existsSync(source)) return { placed, kept };

	const walk = (dir: string, rel = ''): void => {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			if (entry.name.startsWith('.')) continue;
			const from = path.join(dir, entry.name);
			const relPath = path.join(rel, entry.name);
			if (entry.isDirectory()) {
				walk(from, relPath);
				continue;
			}
			const to = path.join(docsDir, relPath);
			const existing = fs.existsSync(to);
			fs.mkdirSync(path.dirname(to), { recursive: true });
			fs.copyFileSync(from, to);
			if (existing) kept.push(relPath);
			else placed.push(relPath);
		}
	};

	walk(source);
	return { placed, kept };
}

// --- init / eject --------------------------------------------------------------

export async function runInit(opts: ScaffoldOptions, pkgRoot: string): Promise<void> {
	const interactive = maybePrompt() && !opts.yes;
	const rl = interactive ? readline.createInterface({ input: process.stdin, output: process.stdout }) : null;
	try {
		if (opts.mode === null) {
			opts.mode = interactive
				? await select<'track' | 'eject'>(rl!, 'How should the styles be active in this project?', [
					{ title: 'Track the package — imported from node_modules, upgraded by npm (advised)', value: 'track' },
					{ title: 'Eject — copy the style sources into the project; they become yours', value: 'eject' }
				], 'track')
				: 'track';
		}
		if (opts.docs === null) opts.docs = interactive ? await confirm(rl!, 'Copy the documentation into the project?', true) : true;
	} finally {
		rl?.close();
	}

	if (opts.mode === 'eject') {
		await runEject(opts, pkgRoot);
		return;
	}
	await runTrack(opts, pkgRoot);
}

async function runTrack(opts: ScaffoldOptions, pkgRoot: string): Promise<void> {
	const projectRoot = process.cwd();
	say();
	say('fractalstyler — track mode');
	say('──────────────────────────');
	say('The stylesheet stays in node_modules; upgrades come from npm.');
	say();
	say('Install and use:');
	say('  pnpm add -D @fractaldesign/fractalstyler');
	say("  import '@fractaldesign/fractalstyler/styles'");
	say();
	say('One import pulls in the whole system — the layers are concatenated in');
	say('cascade order by your bundler.');

	if (opts.docs !== false) {
		say();
		say(`Docs → ${opts.docsDir}/`);
		if (opts.docsDir === '.') say('  ⚠ docs-dir is the project root — existing files there are overwritten.');
		const { placed, kept } = placeDocs(pkgRoot, path.join(process.cwd(), opts.docsDir));
		for (const rel of placed) say(`  + ${rel}`);
		for (const rel of kept) say(`  ↻ ${rel} (refreshed)`);
	}

	say();
	const registryFile = path.join(pkgRoot, 'registry.json');
	const count = fs.existsSync(registryFile)
		? JSON.parse(fs.readFileSync(registryFile, 'utf8')).length
		: null;
	say(`Done. ${count ? `${count} classes are ` : ''}active once the import is in place.`);
	say('Grep the registry: registry.md · docs/');
}

export async function runEject(opts: ScaffoldOptions, pkgRoot: string): Promise<void> {
	const projectRoot = process.cwd();
	const stylesSource = resolveStylesSource(pkgRoot);

	const stylesDir = path.join(projectRoot, opts.stylesDir);
	const scriptsDir = path.join(projectRoot, opts.scriptsDir);

	say();
	say('fractalstyler — eject');
	say('─────────────────────');
	say(`Source: ${path.relative(projectRoot, stylesSource) || stylesSource}`);
	say('Nothing existing is overwritten — conflicts are kept and reported.');
	say();

	// 1. The style layers (+ index). custom.css is seeded, not copied: this
	//    project's own branding is not a consumer's starting point.
	const layers = fs
		.readdirSync(stylesSource)
		.filter((file) => file.endsWith('.css') && file !== 'custom.css')
		.sort();
	const styleResults = layers.map((file) => copyNoOverwrite(path.join(stylesSource, file), path.join(stylesDir, file)));
	const customResult = writeFileNoOverwrite(path.join(stylesDir, 'custom.css'), SEED_CUSTOM);

	// 2. The registry builder — the extractor, the vocabulary and the parser
	//    they share.
	const builderResults = BUILDER_FILES.map(([fromFile, toFile]): CopyResult => {
		const from = path.join(pkgRoot, fromFile);
		return fs.existsSync(from)
			? copyNoOverwrite(from, path.join(scriptsDir, toFile))
			: { file: toFile, status: 'missing' };
	});
	const wrapperResult = writeFileNoOverwrite(path.join(scriptsDir, 'build-registry.mjs'), BUILD_REGISTRY);


	report(`${opts.stylesDir}/`, styleResults);
	say(`  ${customResult.status === 'placed' ? '+' : '↷'} custom.css ${customResult.status === 'placed' ? '(seeded — the sanctioned extension point)' : '(kept yours)'}`);
	report(`${opts.scriptsDir}/`, builderResults);
	say(`  ${wrapperResult.status === 'placed' ? '+' : '↷'} build-registry.mjs ${wrapperResult.status === 'placed' ? '(regenerates your registry)' : '(kept yours)'}`);

	if (opts.docs !== false) {
		say();
		say(`Docs → ${opts.docsDir}/`);
		if (opts.docsDir === '.') say('  ⚠ docs-dir is the project root — existing files there are overwritten.');
		const { placed, kept } = placeDocs(pkgRoot, path.join(projectRoot, opts.docsDir));
		for (const rel of placed) say(`  + ${rel}`);
		for (const rel of kept) say(`  ↻ ${rel} (refreshed)`);
	}

	say();
	say('The files are yours now. After every edit, regenerate your registry:');
	say('  node scripts/build-registry.mjs');
	say('and keep the contract enforced against your copy:');
	say('  npx @fractaldesign/fractalstyler lint src/');
	say();
	say('⚠ Drift warning: an ejected copy no longer tracks the package. Diff');
	say('  against a fresh eject when you want to see how far you have walked.');
	say('  To re-place a kept file: delete it and run eject again.');
}

function report(title: string, results: CopyResult[]): void {
	for (const result of results) {
		if (result.status === 'placed') say(`  + ${result.file}`);
		else if (result.status === 'kept') say(`  ↷ ${result.file} (kept yours)`);
		else if (result.status === 'missing') say(`  ? ${result.file} (not in this package version)`);
	}
}

/**
 * Where the shipped .css layers live. The published tarball carries
 * dist/styles (copied by the pack build); a checkout of this repository also
 * has the live src/lib/styles — prefer it when present so ejected content
 * always matches what the registry was generated from.
 */
function resolveStylesSource(pkgRoot: string): string {
	const candidates = [path.join(pkgRoot, 'src', 'lib', 'styles'), path.join(pkgRoot, 'dist', 'styles')];
	for (const candidate of candidates) {
		if (fs.existsSync(path.join(candidate, 'index.css'))) return candidate;
	}
	console.error('✕ no styles source found in this package (expected src/lib/styles or dist/styles).');
	process.exit(1);
}
