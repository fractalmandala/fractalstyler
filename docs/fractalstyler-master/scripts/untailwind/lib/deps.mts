/**
 * Where `tailwindcss` and `postcss` come from. The untailwind engine is a copy of the one in `apps/sass-helper`,
 * and that one borrows whatever the surrounding project happens to have. A skill is not inside a project: it
 * installs once and runs from anywhere, including a directory with no `node_modules` above it, and must never
 * need `npm install`. So:
 *
 *   1. `UNTAILWIND_<NAME>_DIR` if set, so callers can force a particular install.
 *   2. Projects registered by the CLI (`addSearchRoot`): each input file's project root, then the working
 *      directory. This is what makes the answers mean what *that* project's Tailwind says they mean - a project
 *      on 4.1 is not answered with 4.3 semantics, and `compilerInfo` records which copy did answer.
 *   3. `vendor/node_modules` inside this skill. That is the floor: the skill ships the two packages (and
 *      postcss's own three helpers), so one copy runs from a bare skill folder, a checkout, or a global install
 *      where no project `node_modules` can be found. Nothing is installed here.
 *
 * Tailwind v3 cannot be resolved honestly: its utilities come from a `tailwind.config` and a JS plugin pipeline
 * that `compile()` does not implement, so v3 is reported as an error with a clear note rather than silently
 * answered by the v4 fallback.
 *
 * `postcss` is taken CommonJS because `extractUtilities` is synchronous; making it async to satisfy a loader
 * would rewrite the engine. `tailwindcss` v4 is ESM, so its `compile` loads async - which callers already are.
 *
 * The vendored layout is npm's own (`vendor/node_modules/<name>`) with `vendor/anchor.cjs` as the file
 * `require` resolves from, so postcss's internal `require('nanoid')` finds its dependency the normal way.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const VENDOR = join(here, '..', 'vendor', 'node_modules');
const requireCjs = createRequire(join(here, '..', 'vendor', 'anchor.cjs'));

type Pkg = { name?: string; version?: string; main?: string; exports?: unknown };
type AnyMod = Record<string, unknown> & { default?: unknown };

const pkgOf = (dir: string): Pkg => {
	try {
		return JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) as Pkg;
	} catch {
		return {};
	}
};

/** Extra places to look, offered by the caller. The file being converted is the best hint of where its
 *  Tailwind lives, so the CLI registers each input's project before importing anything. */
const projectRoots: string[] = [];
export function addSearchRoot(dir: string | null | undefined): void {
	if (dir && !projectRoots.includes(dir)) projectRoots.push(dir);
}

/** The nearest ancestor holding a `node_modules` - a stand-in for "the project this file belongs to". */
export function projectOf(start: string): string | null {
	let dir = start;
	for (let up = 0; up < 14; up++) {
		if (existsSync(join(dir, 'node_modules'))) return dir;
		const parent = dirname(dir);
		if (parent === dir) break;
		dir = parent;
	}
	return null;
}

/** Candidate package directories: every ancestor of `from`, plain `node_modules/<name>` and the pnpm store. */
function candidates(name: string, from: string): string[] {
	const out: string[] = [];
	let dir = from;
	for (let up = 0; up < 14; up++) {
		const modules = join(dir, 'node_modules');
		out.push(join(modules, name));
		for (const store of [modules, join(modules, '.pnpm')]) {
			if (!existsSync(store)) continue;
			for (const entry of safeReadDir(store)) {
				if (entry.startsWith(`${name}@`)) out.push(join(store, entry, 'node_modules', name));
			}
		}
		const parent = dirname(dir);
		if (parent === dir) break;
		dir = parent;
	}
	return [...new Set(out)];
}

function locate(name: string, subpath?: string): { dir: string; from: 'env' | 'project' | 'vendored' } | null {
	const env = process.env[`UNTAILWIND_${name.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_DIR`];
	if (env) {
		const hit = subpath ? join(env, subpath) : env;
		if (existsSync(hit)) return { dir: hit, from: 'env' };
	}
	for (const root of [...projectRoots, process.cwd()]) {
		for (const dir of candidates(name, root)) {
			if (usable(dir, subpath)) return { dir, from: 'project' };
		}
	}
	// The shipped copy is a sibling of this file, not one of its ancestors: `lib/../vendor/node_modules/<name>`.
	// Walking ancestors alone can never reach it, so this last look-up is what makes the skill standalone.
	const shipped = join(VENDOR, name);
	if (usable(shipped, subpath)) return { dir: shipped, from: 'vendored' };
	return null;
}

const usable = (dir: string, subpath?: string): boolean => {
	if (subpath) return existsSync(join(dir, subpath));
	return Boolean(pkgOf(dir).name && entryFile(dir));
};

function safeReadDir(dir: string): string[] {
	try {
		return readdirSync(dir);
	} catch {
		return [];
	}
}

/** The file a package's own manifest points at, through its conditional `exports` map. */
function entryFile(dir: string, condition: 'import' | 'require' = 'import'): string | null {
	const pkg = pkgOf(dir);
	const pick = (value: unknown): string | null => {
		if (typeof value === 'string') return value;
		if (!value || typeof value !== 'object') return null;
		const record = value as Record<string, unknown>;
		const target = record['.'] ?? record;
		if (typeof target === 'string') return target;
		if (!target || typeof target !== 'object') return null;
		const conditions = target as Record<string, unknown>;
		for (const key of [condition, 'default', 'require', 'import']) {
			const value = conditions[key];
			if (typeof value === 'string') return value;
			if (value && typeof value === 'object') {
				const nested = pick(value);
				if (nested) return nested;
			}
		}
		return null;
	};
	for (const rel of [pick(pkg.exports), pkg.main, 'index.js']) {
		if (!rel) continue;
		const file = join(dir, rel);
		if (existsSync(file)) return file;
	}
	return null;
}

/** Which Tailwind answered the run. */
export type CompilerInfo = { version: string; dir: string; vendored: boolean; major: number; from: 'env' | 'project' | 'vendored' };
let info: CompilerInfo | null = null;

const readInfo = (dir: string, from: CompilerInfo['from']): CompilerInfo => {
	const pkg = pkgOf(dir);
	const major = Number(/^\d+/.exec(pkg.version ?? '')?.[0] ?? '0');
	return { version: pkg.version ?? 'unknown', dir, from, vendored: dir.startsWith(VENDOR), major: Number.isFinite(major) ? major : 0 };
};

const missing = (name: string): Error =>
	new Error(
		`untailwind: no ${name} could be found.\n` +
			`  Looked in the registered projects, the working directory's ancestors, and ${join(VENDOR, name)}.\n` +
			'  The skill ships the last one; if it is missing, restore scripts/untailwind/vendor. It installs nothing.'
	);

/** `import()` failing is not "not installed": a v3 package, a broken `exports` target, or a file Node cannot
 *  classify as ESM all land here. Report what was found and why it could not be loaded. */
const foundButUnloadable = (name: string, dir: string, err: unknown): Error =>
	new Error(
		`untailwind: found ${name} at ${dir}, but loading it failed.\n` +
			`  ${(err as Error).message.split('\n')[0]}\n` +
			`  If this is Tailwind v3, its utilities come from a tailwind.config and a JS plugin pipeline this script does not\n` +
			'  implement, so its classes cannot be resolved honestly - convert with a v4 stylesheet, or map them by hand.'
	);

let postcss: any = null;

/** The `postcss` callable, CommonJS-loaded so `extractUtilities` can stay synchronous. */
export function getPostcss(): any {
	if (postcss) return postcss;
	const found = locate('postcss');
	if (!found) throw missing('postcss');
	const file = entryFile(found.dir, 'require');
	let loaded: AnyMod;
	try {
		loaded = (file ? requireCjs(file) : requireCjs('postcss')) as AnyMod;
	} catch (err) {
		throw foundButUnloadable('postcss', found.dir, err);
	}
	postcss = (loaded.default ?? loaded) as any;
	return postcss;
}

let compile: any = null;

/** Tailwind v4's `compile`, from the target project when it has a usable one and from the shipped copy otherwise. */
export async function getCompile(): Promise<any> {
	if (compile) return compile;
	const found = tailwindPackage();
	if (!found.dir) throw notV4(found.rejected);
	const file = entryFile(found.dir, 'import');
	if (!file) throw missing('tailwindcss');
	let mod: AnyMod;
	try {
		mod = (await import(pathToFileURL(file).href)) as AnyMod;
	} catch (err) {
		throw foundButUnloadable('tailwindcss', found.dir, err);
	}
	const fn = mod.compile ?? (mod.default as AnyMod | undefined)?.compile;
	if (typeof fn !== 'function') throw new Error(`untailwind: ${found.dir} exports no compile() - Tailwind v4 is required`);
	info = readInfo(found.dir, found.from);
	compile = fn;
	return compile;
}

/** Tailwind is only usable when the package *and* its two source stylesheets are there. A v3 install has the
 *  package but neither file, so it is recorded as `rejected` (with its real path and version) instead of being
 *  reported as "tailwindcss not found", which would blame the shipped copy for something the project has. */
function tailwindPackage(): { dir: string; from: 'env' | 'project' | 'vendored'; rejected: { dir: string; version: string }[] } {
	if (resolved) return resolved;
	const rejected: { dir: string; version: string }[] = [];
	const complete = (dir: string, from: 'env' | 'project' | 'vendored'): boolean => {
		if (!pkgOf(dir).name) return false;
		if (!(existsSync(join(dir, 'theme.css')) && existsSync(join(dir, 'utilities.css')))) {
			if (from !== 'vendored') rejected.push({ dir, version: pkgOf(dir).version ?? 'unknown' });
			return false;
		}
		return true;
	};
	const env = process.env.UNTAILWIND_TAILWINDCSS_DIR;
	if (env && complete(env, 'env')) {
		resolved = { dir: env, from: 'env', rejected };
		return resolved;
	}
	for (const root of [...projectRoots, process.cwd()]) {
		for (const dir of candidates('tailwindcss', root)) {
			if (complete(dir, 'project')) {
				resolved = { dir, from: 'project', rejected };
				return resolved;
			}
		}
	}
	const shipped = join(VENDOR, 'tailwindcss');
	// A rejected candidate means the project does have a Tailwind, just not one this script can read. The
	// shipped floor must not paper over that: `md:p-6` is `min-width: 768px` in v3 and `48rem` in v4, so
	// answering a v3 project with the v4 floor is a wrong number wearing a confident font.
	resolved = { dir: complete(shipped, 'vendored') && !rejected.length ? shipped : '', from: 'vendored', rejected };
	return resolved;
}
type Resolved = { dir: string; from: 'env' | 'project' | 'vendored'; rejected: { dir: string; version: string }[] };
let resolved: Resolved | null = null;

/** What a rejected candidate means in the message: v3 utilities are produced by a `tailwind.config` plus a JS
 *  plugin pipeline, so this script cannot say what one of its classes compiles to. */
const notV4 = (rejected: { dir: string; version: string }[]): Error => {
	const where = rejected.map((r) => `tailwindcss@${r.version} at ${r.dir}`).join('\n    ');
	return new Error(
		`untailwind: the only Tailwind reachable from here is not a usable v4 install:\n    ${where}\n` +
			'  v3 utilities come from a tailwind.config and a JS plugin pipeline, which this script does not implement,\n' +
			'  so its classes cannot be resolved honestly. Convert with a v4 stylesheet, point\n' +
			'  UNTAILWIND_TAILWINDCSS_DIR at a v4 package, or map the v3 classes by hand (references/migration.md).'
	);
};

/** The Tailwind source stylesheets the compiler is built from, from whichever copy answered. */
export function tailwindStylesheets(): Record<string, string> {
	const found = tailwindPackage();
	if (!found.dir) throw notV4(found.rejected);
	info ??= readInfo(found.dir, found.from);
	return {
		'tailwindcss/theme.css': readFileSync(join(found.dir, 'theme.css'), 'utf8'),
		'tailwindcss/utilities.css': readFileSync(join(found.dir, 'utilities.css'), 'utf8')
	};
}

/** Where the compiler came from, for the run report. Call after the first conversion. */
export function compilerInfo(): CompilerInfo | null {
	return info;
}
