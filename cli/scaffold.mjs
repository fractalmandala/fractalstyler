// =============================================================================
// scaffold — the init/eject engine behind cli/main.mjs.
//
// Two ways a project can hold the styles:
//   track — the package stays in node_modules; the stylesheet is imported
//           from it; upgrades come from npm. Only docs (and optional VS Code
//           settings) are placed into the project.
//   eject — the style layers, the palette modules and the registry builder are
//           copied into the project. Nothing is ever overwritten: on a name
//           conflict the existing file is kept and reported.
// =============================================================================

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { execFileSync, spawnSync } from 'node:child_process';

// --- shared constants --------------------------------------------------------

const DOCS_FILES = [
	'REGISTRY.md',
	'REGISTRY.api.md',
	path.join('references', 'configurations.md'),
	path.join('references', 'configurations-api.md')
];

const PALETTES = ['colorpacks.sass', 'themeplates.sass'];

const SEED_OWN = `// ============================================================================
// own — the sanctioned extension point (_09_own.sass).
//
// Project-specific styling that cannot be expressed via the canonical layers
// lives here. Document a class with a trailing \`// …\` comment on its selector
// line — scripts/build-registry.mjs lifts it into the registry description.
// ============================================================================

// Example seed — delete freely:
.your-class // Describe what this class is for
	color: var(--text-primary)
`;

const BUILD_REGISTRY = `#!/usr/bin/env node
// Regenerates registry.json, REGISTRY.md, docs/REGISTRY.api.md and the agent
// skill references from src/lib/styles. Run it after any edit to the layers.
// Node only — no Sass toolchain needed.
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
for (const script of ['update-registry.mjs', 'class-vocab.mjs']) {
	const result = spawnSync(process.execPath, [join(here, script)], { stdio: 'inherit' });
	if (result.status !== 0) process.exit(result.status ?? 1);
}
`;

// --- small helpers -----------------------------------------------------------

const say = (text = '') => console.log(text);

function copyNoOverwrite(from, to) {
	if (fs.existsSync(to)) return { file: path.basename(to), status: 'kept' };
	fs.mkdirSync(path.dirname(to), { recursive: true });
	fs.copyFileSync(from, to);
	return { file: path.basename(to), status: 'placed' };
}

function writeFileNoOverwrite(to, content) {
	if (fs.existsSync(to)) return { file: path.basename(to), status: 'kept' };
	fs.mkdirSync(path.dirname(to), { recursive: true });
	fs.writeFileSync(to, content, 'utf8');
	return { file: path.basename(to), status: 'placed' };
}

async function confirm(rl, message, defaultValue) {
	const answer = (await rl.question(`${message} ${defaultValue ? '(Y/n)' : '(y/N)'} `)).trim().toLowerCase();
	if (!answer) return defaultValue;
	return answer.startsWith('y');
}

async function select(rl, message, options, defaultValue) {
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

function maybePrompt() {
	return process.stdin.isTTY && process.stdout.isTTY;
}

// --- docs --------------------------------------------------------------------

/**
 * Copy the registry + configurations docs from the package into the project.
 * These are generated snapshots — within the target dir they are overwritten
 * (they carry their own "Generated" banners). Only the default dedicated
 * folder is safe for that; a custom --docs-dir of '.' gets a warning.
 */
function placeDocs(pkgRoot, docsDir) {
	const placed = [];
	const kept = [];
	for (const rel of DOCS_FILES) {
		const from = path.join(pkgRoot, 'docs', rel);
		if (!fs.existsSync(from)) continue;
		const to = path.join(docsDir, ...rel.split(path.sep));
		const existing = fs.existsSync(to);
		fs.mkdirSync(path.dirname(to), { recursive: true });
		fs.copyFileSync(from, to);
		if (existing) kept.push(rel);
		else placed.push(rel);
	}
	return { placed, kept };
}

// --- intellisense -------------------------------------------------------------

const EXTENSION_ID = 'fractalmandala.styles-intellisense';
const EXTENSION_REPO = 'https://github.com/fractalmandala/styles-intellisense';

function mergeWorkspaceSettings(settingsFile, patch) {
	// Tolerate JSONC-ish leftovers only enough to refuse corrupting the file:
	// if it does not parse as plain JSON, we back off and tell the user.
	let settings = {};
	if (fs.existsSync(settingsFile)) {
		try {
			settings = JSON.parse(fs.readFileSync(settingsFile, 'utf8'));
		} catch {
			return { ok: false, reason: 'unparseable' };
		}
	}
	const changed = [];
	for (const [key, values] of Object.entries(patch)) {
		const list = Array.isArray(settings[key]) ? settings[key] : [];
		const merged = [...list];
		for (const value of values) if (!merged.includes(value)) merged.push(value);
		if (merged.length !== list.length) {
			settings[key] = merged;
			changed.push(key);
		}
	}
	fs.mkdirSync(path.dirname(settingsFile), { recursive: true });
	fs.writeFileSync(settingsFile, `${JSON.stringify(settings, null, '\t')}\n`, 'utf8');
	return { ok: true, changed };
}

function codeCli() {
	for (const candidate of ['code', 'code-insiders']) {
		try {
			execFileSync(candidate, ['--version'], { stdio: 'ignore' });
			return candidate;
		} catch {
			/* try the next */
		}
	}
	return null;
}

function extensionInstalled(code) {
	try {
		const list = execFileSync(code, ['--list-extensions', '--show-versions'], { encoding: 'utf8' });
		return list
			.split('\n')
			.some((line) => line.trim().toLowerCase().startsWith(`${EXTENSION_ID.toLowerCase()}@`));
	} catch {
		return false;
	}
}

function tryInstallExtension(code) {
	const result = spawnSync(code, ['--install-extension', EXTENSION_ID], { stdio: 'pipe', encoding: 'utf8' });
	return result.status === 0;
}

/**
 * Configure the Styles IntelliSense VS Code extension: write the workspace
 * settings it reads (sources, description files) and make sure the extension
 * itself is installed. Never fatal — worst case it prints instructions.
 */
function setupIntellisense(projectRoot, opts, packageStylesPath) {
	const settingsFile = path.join(projectRoot, '.vscode', 'settings.json');
	const patch = {};
	// In track mode the styles live inside node_modules — point the extension
	// straight at the shipped partials so classes still resolve and complete.
	patch['stylesIntellisense.sources'] = [packageStylesPath];
	if (opts.docs !== false) {
		patch['stylesIntellisense.descriptionFiles'] = [path.posix.join(opts.docsDir, 'REGISTRY.api.md')];
	}
	const merged = mergeWorkspaceSettings(settingsFile, patch);
	if (!merged.ok) {
		say(`  ⚠ kept .vscode/settings.json untouched — it is not plain JSON. Add manually:`);
		for (const [key, values] of Object.entries(patch)) say(`     "${key}": ${JSON.stringify(values)}`);
	} else {
		say(`  ✓ .vscode/settings.json — ${merged.changed.join(', ') || 'already configured'}`);
	}

	const code = codeCli();
	if (!code) {
		say(`  ℹ no VS Code CLI found. Install the extension from ${EXTENSION_REPO} (dist/*.vsix)`);
		say('     via Extensions: Install from VSIX… — the settings above are already in place.');
		return;
	}
	if (extensionInstalled(code)) {
		say('  ✓ Styles IntelliSense extension already installed');
		return;
	}
	say('  ℹ extension not installed yet — trying the marketplace…');
	if (tryInstallExtension(code)) {
		say(`  ✓ installed ${EXTENSION_ID} — reload the window`);
	} else {
		say(`  ⚠ not on the marketplace (or the CLI is offline). Install the VSIX manually:`);
		say(`     ${EXTENSION_REPO} → dist/ → Extensions: Install from VSIX…`);
	}
}

// --- init / eject --------------------------------------------------------------

export async function runInit(opts, pkgRoot) {
	const interactive = maybePrompt() && !opts.yes;
	const rl = interactive ? readline.createInterface({ input: process.stdin, output: process.stdout }) : null;
	try {
		if (opts.mode === null) {
			opts.mode = interactive
				? await select(rl, 'How should the styles be active in this project?', [
					{ title: 'Track the package — imported from node_modules, upgraded by npm (advised)', value: 'track' },
					{ title: 'Eject — copy the style sources into the project; they become yours', value: 'eject' }
				], 'track')
				: 'track';
		}
		if (opts.docs === null) opts.docs = interactive ? await confirm(rl, 'Copy the registry + configurations docs into the project?', true) : true;
		if (opts.intellisense === null) {
			opts.intellisense = interactive
				? await confirm(rl, 'Configure the Styles IntelliSense VS Code extension?', true)
				: true;
		}
	} finally {
		rl?.close();
	}

	if (opts.mode === 'eject') {
		await runEject(opts, pkgRoot);
		return;
	}
	await runTrack(opts, pkgRoot);
}

async function runTrack(opts, pkgRoot) {
	const projectRoot = process.cwd();
	say();
	say('fractalstyler — track mode');
	say('──────────────────────────');
	say('The stylesheet stays in node_modules; upgrades come from npm.');
	say();
	say('Install and use:');
	say('  pnpm add -D @fractaldesign/fractalstyler');
	say("  @use '@fractaldesign/fractalstyler/styles' as *");
	say();
	say('Plain CSS consumers (no SASS toolchain):');
	say("  import '@fractaldesign/fractalstyler/css'        // dist/css/fractalstyler.css");
	say("  import '@fractaldesign/fractalstyler/css/min'   // dist/css/fractalstyler.min.css");

	if (opts.docs !== false) {
		say();
		say(`Docs → ${opts.docsDir}/`);
		if (opts.docsDir === '.') say('  ⚠ docs-dir is the project root — existing files there are overwritten.');
		const { placed, kept } = placeDocs(pkgRoot, path.join(process.cwd(), opts.docsDir));
		for (const rel of placed) say(`  + ${rel}`);
		for (const rel of kept) say(`  ↻ ${rel} (refreshed)`);
	}

	if (opts.intellisense !== false) {
		say();
		say('Styles IntelliSense (VS Code):');
		setupIntellisense(projectRoot, opts, 'node_modules/@fractaldesign/fractalstyler/dist/styles');
	}

	say();
	const registryFile = path.join(pkgRoot, 'registry.json');
	const count = fs.existsSync(registryFile)
		? JSON.parse(fs.readFileSync(registryFile, 'utf8')).length
		: null;
	say(`Done. ${count ? `${count} classes are ` : ''}active once the import is in place.`);
	say('Grep the registry: REGISTRY.md · docs/REGISTRY.api.md · references/configurations.md');
}

export async function runEject(opts, pkgRoot) {
	const projectRoot = process.cwd();
	const stylesSource = resolveStylesSource(pkgRoot);

	const stylesDir = path.join(projectRoot, opts.stylesDir);
	const paletteDir = path.join(projectRoot, opts.paletteDir);
	const scriptsDir = path.join(projectRoot, opts.scriptsDir);

	say();
	say('fractalstyler — eject');
	say('─────────────────────');
	say(`Source: ${path.relative(projectRoot, stylesSource) || stylesSource}`);
	say('Nothing existing is overwritten — conflicts are kept and reported.');
	say();

	// 1. The style layers (+ index). _09_own.sass is seeded, not copied: this
	//    project's own mascot/hero content is not a consumer's starting point.
	const layers = fs
		.readdirSync(stylesSource)
		.filter((file) => file.endsWith('.sass') && !PALETTES.includes(file) && file !== '_09_own.sass')
		.sort();
	const styleResults = layers.map((file) => copyNoOverwrite(path.join(stylesSource, file), path.join(stylesDir, file)));
	const ownResult = writeFileNoOverwrite(path.join(stylesDir, '_09_own.sass'), SEED_OWN);

	// 2. The palette modules.
	const paletteResults = PALETTES.map((file) => {
		const from = path.join(stylesSource, file);
		return fs.existsSync(from)
			? copyNoOverwrite(from, path.join(paletteDir, file))
			: { file, status: 'missing' };
	});

	// 3. The registry builder — the two scripts plus the wrapper that runs both.
	//    Copied as .mjs so they run as ESM whatever the project's package type.
	const builderFiles = [
		['update-registry.js', 'update-registry.mjs'],
		['class-vocab.js', 'class-vocab.mjs']
	];
	const builderResults = builderFiles.map(([fromFile, toFile]) => {
		const from = path.join(pkgRoot, 'scripts', fromFile);
		return fs.existsSync(from)
			? copyNoOverwrite(from, path.join(scriptsDir, toFile))
			: { file: toFile, status: 'missing' };
	});
	const wrapperResult = writeFileNoOverwrite(path.join(scriptsDir, 'build-registry.mjs'), BUILD_REGISTRY);

	report(`${opts.stylesDir}/`, styleResults);
	say(`  ${ownResult.status === 'placed' ? '+' : '↷'} _09_own.sass ${ownResult.status === 'placed' ? '(seeded — the sanctioned extension point)' : '(kept yours)'}`);
	report(`${opts.paletteDir}/`, paletteResults);
	report(`${opts.scriptsDir}/`, builderResults);
	say(`  ${wrapperResult.status === 'placed' ? '+' : '↷'} build-registry.mjs ${wrapperResult.status === 'placed' ? '(regenerates your registry)' : '(kept yours)'}`);

	if (opts.stylesDir !== 'src/lib/styles') {
		say();
		say(`  ⚠ scripts/build-registry.mjs reads src/lib/styles — with --styles-dir ${opts.stylesDir}`);
		say('    adjust the stylesDir constant in the copied update-registry.js.');
	}

	if (opts.docs !== false) {
		say();
		say(`Docs → ${opts.docsDir}/`);
		if (opts.docsDir === '.') say('  ⚠ docs-dir is the project root — existing files there are overwritten.');
		const { placed, kept } = placeDocs(pkgRoot, path.join(projectRoot, opts.docsDir));
		for (const rel of placed) say(`  + ${rel}`);
		for (const rel of kept) say(`  ↻ ${rel} (refreshed)`);
	}

	if (opts.intellisense !== false) {
		say();
		say('Styles IntelliSense (VS Code):');
		setupIntellisense(projectRoot, opts, opts.stylesDir);
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

function report(title, results) {
	for (const result of results) {
		if (result.status === 'placed') say(`  + ${result.file}`);
		else if (result.status === 'kept') say(`  ↷ ${result.file} (kept yours)`);
		else if (result.status === 'missing') say(`  ? ${result.file} (not in this package version)`);
	}
}

/**
 * Where the shipped .sass layers live. The published tarball carries
 * dist/styles (copied by the pack build); a checkout of this repository also
 * has the live src/lib/styles — prefer it when present so ejected content
 * always matches what the registry was generated from.
 */
function resolveStylesSource(pkgRoot) {
	const candidates = [
		path.join(pkgRoot, 'src', 'lib', 'styles'),
		path.join(pkgRoot, 'dist', 'styles')
	];
	for (const candidate of candidates) {
		if (fs.existsSync(path.join(candidate, 'index.sass'))) return candidate;
	}
	console.error('✕ no styles source found in this package (expected src/lib/styles or dist/styles).');
	process.exit(1);
}
