#!/usr/bin/env node
/**
 * untailwind — deconstruct Tailwind classes into the CSS they actually compile to.
 *
 * Markup or a bare class list goes in; readable CSS (or indented Sass) comes out, one trailing comment
 * per declaration naming the utility that produced it, its pixel equivalent, and whether the value came
 * from the project's own theme. Values come from the real Tailwind v4 compiler, so nothing is guessed
 * except the two shapes the engine admits to guessing (`text-<name>` / `bg-<name>` colours), which are
 * labelled `guessed` in the output.
 *
 * Why it exists here: a Tailwind class is a claim about a value, not the value. Converting a project to
 * Fractalstyler means mapping each utility onto a ladder rung, and that mapping is only honest once you
 * know `md:p-6` is `padding: 1.5rem` and `text-lg` is `1.125rem / 1.75rem`. Run this, read the numbers,
 * then fill the Phase 2 table in `../../references/migration.md`.
 *
 * Usage
 *   untailwind <file…>                       one rule per class-bearing element
 *   untailwind -                             markup or a class list from stdin
 *   untailwind --classes "mb-4 flex md:p-6"  a class list, quoted
 *   echo "hero flex gap-4" | untailwind -
 *
 * Options
 *   --theme <file>        the project's @theme / :root block, so custom tokens resolve for real
 *   --format css|sass     output notation (default css)
 *   --selector <name>     name the rule (single-element input only)
 *   --no-comments         drop the per-declaration annotations
 *   --summary             classes, unknowns and notices only - no CSS
 *   --json                machine-readable result
 *   --max <n>             stop after n elements (default all)
 *   --out <file>          write there instead of stdout
 *   -h, --help            this text
 *
 * Which Tailwind answers
 *   The target project's own v4 is used when one is reachable (from each input file's project, then the working
 *   directory), because a class means what the version in front of you says it means. `vendor/node_modules`
 *   inside this skill is the floor for when there is none, so the script still runs from a bare folder and
 *   installs nothing. `UNTAILWIND_TAILWINDCSS_DIR` forces a particular package. The last line of every run
 *   prints `# compiler: tailwindcss@<version> — <which>`, because different versions answer differently.
 *
 *   Tailwind v3 is refused rather than answered by the floor: its utilities come from a tailwind.config plus a
 *   JS plugin pipeline this script does not implement, so `md:p-6` would silently come back as `48rem` when the
 *   project means `768px`. It names the v3 package it found instead of guessing past it.
 *
 * Dependencies: none to install. `tailwindcss` v4 and `postcss` (and postcss's own three helpers) ship inside
 * this skill, in `vendor/node_modules` beside these scripts, and are the floor for when the project being
 * converted has none - so the script runs from a bare skill folder and the skill folder installs nothing and
 * declares no package. Needs Node 23.6+ to run TypeScript directly.
 *
 * Exit codes: 0 ok, 1 usage/dependency failure, 2 nothing to convert.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { addSearchRoot, compilerInfo, projectOf } from './lib/deps.mts';

const HELP = (() => {
	// The header doc-comment above *is* the help text: usage stays true to the file it ships in.
	const source = readFileSync(new URL(import.meta.url), 'utf8');
	const block = /\/\*\*([\s\S]*?)\*\//.exec(source)?.[1] ?? '';
	return block
		.split('\n')
		.map((line) => line.replace(/^\s*\* ?/, '').trimEnd())
		.join('\n')
		.trim();
})();

type Flags = {
	files: string[];
	classes?: string;
	theme?: string;
	format: 'css' | 'sass';
	selector?: string;
	comments: boolean;
	summary: boolean;
	json: boolean;
	max?: number;
	out?: string;
	help: boolean;
};

function parseArgs(argv: string[]): Flags {
	const f: Flags = { files: [], format: 'css', comments: true, summary: false, json: false, help: false };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		const next = (): string => {
			const v = argv[++i];
			if (v === undefined) fail(`${a} needs a value`);
			return v;
		};
		switch (a) {
			case '--classes': f.classes = next(); break;
			case '--theme': f.theme = next(); break;
			case '--format': {
				const v = next();
				if (v !== 'css' && v !== 'sass') fail(`--format takes css or sass, got "${v}"`);
				f.format = v;
				break;
			}
			case '--selector': f.selector = next(); break;
			case '--no-comments': f.comments = false; break;
			case '--summary': f.summary = true; break;
			case '--json': f.json = true; break;
			case '--max': {
				const v = Number(next());
				if (!Number.isInteger(v) || v < 1) fail('--max takes a positive integer');
				f.max = v;
				break;
			}
			case '--out': f.out = next(); break;
			case '-h': case '--help': case 'help': f.help = true; break;
			case '-': f.files.push('-'); break;
			default:
				if (a.startsWith('--')) fail(`unknown option ${a} — run with --help`);
				else f.files.push(a);
		}
	}
	return f;
}

function fail(message: string): never {
	// Loader errors already carry the prefix; double-prefixing them reads as a bug to the person debugging it.
	const text = message.startsWith('untailwind:') ? message : `untailwind: ${message}`;
	process.stderr.write(`${text}\n`);
	process.exit(1);
}

const readStdin = async (): Promise<string> => {
	const chunks: Buffer[] = [];
	for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
	return Buffer.concat(chunks).toString('utf8');
};

async function main(): Promise<void> {
	const flags = parseArgs(process.argv.slice(2));
	if (flags.help) {
		process.stdout.write(HELP + '\n');
		return;
	}
	if (!flags.files.length && !flags.classes) fail('no input — pass file path(s), "-", or --classes "…". See --help');
	if (flags.files.includes('-') && flags.files.length > 1) fail('"-" (stdin) cannot be combined with file paths');

	// The project being converted is where its Tailwind lives. Register it before loading anything:
	// `engine.mts` takes postcss at module scope, so a root added after the import would be too late.
	for (const file of flags.files) {
		if (file === '-') continue;
		const root = projectOf(dirname(resolve(file)));
		if (root) addSearchRoot(root);
	}
	if (flags.theme) {
		const root = projectOf(dirname(resolve(flags.theme)));
		if (root) addSearchRoot(root);
	}

	// Imported late so a missing dependency is a one-line instruction, not a stack trace.
	let untwail: typeof import('./lib/untwail.mts').untwail;
	try {
		({ untwail } = await import('./lib/untwail.mts'));
	} catch (err) {
		fail((err as Error).message.replace(/^untailwind: /, ''));
	}

	const themeCss = flags.theme ? readFileSync(flags.theme, 'utf8') : '';
	const inputs: Array<{ label: string; text: string }> = [];
	if (flags.classes) inputs.push({ label: '--classes', text: flags.classes });
	for (const file of flags.files) inputs.push(file === '-' ? { label: 'stdin', text: await readStdin() } : { label: file, text: readFileSync(file, 'utf8') });

	const blocks: string[] = [];
	const report: Array<Record<string, unknown>> = [];
	let anyElements = 0;

	for (const input of inputs) {
		let result;
		try {
			result = await untwail(input.text, {
				themeCss,
				format: flags.format,
				comments: flags.comments,
				selector: flags.selector
			});
		} catch (err) {
			fail(`${input.label}: ${(err as Error).message}`);
		}
		if (!result) continue;
		anyElements += result.elements.length;
		const clipped = flags.max ? result.text.split(/\n\n+/).slice(0, flags.max).join('\n\n') : result.text;
		if (clipped) blocks.push(inputs.length > 1 ? `/* === ${input.label} === */\n\n${clipped}` : clipped);
		report.push({ input: input.label, elements: result.elements.length, classes: result.tokens, unknown: result.unknown, notices: result.notices });
	}

	if (!anyElements) {
		process.stderr.write('untailwind: no Tailwind classes found in the input\n');
		process.exit(2);
	}

	const lines: string[] = [];
	if (flags.json) {
		const compiler = compilerInfo();
		lines.push(JSON.stringify({ results: report, compiler: compiler ? { version: compiler.version, from: compiler.from, vendored: compiler.vendored } : null, css: flags.summary ? undefined : blocks.join('\n\n') }, null, 2));
	} else {
		if (!flags.summary && blocks.length) lines.push(blocks.join('\n\n'));
		for (const r of report) {
			const head = `# ${r.input}: ${r.elements} element(s), ${r.classes} class(es)`;
			const unknown = (r.unknown as string[]).length ? `#   unresolved: ${(r.unknown as string[]).join(', ')}` : '';
			const notices = (r.notices as string[]).filter((n) => !n.startsWith('#')).map((n) => `#   note: ${n}`);
			lines.push([head, unknown, ...notices].filter(Boolean).join('\n'));
		}
		if (!flags.summary) lines.push('# ---', '# Read the numbers above as ladder rungs, then map each to Fractalstyler in the Phase 2 table (references/migration.md).');

		// Which copy answered, so the reader knows whether the numbers came from the target project's Tailwind
		// or from the skill's shipped floor. Different versions, different answers - so say which one spoke.
		const tail = compilerInfo();
		if (tail) {
			const where = tail.from === 'vendored' ? "the skill's shipped copy" : tail.from === 'env' ? 'UNTAILWIND_TAILWINDCSS_DIR' : `the target project, ${tail.dir}`;
			lines.push(`# compiler: tailwindcss@${tail.version} — ${where}`);
		}
	}

	const text = lines.join('\n\n').trimEnd() + '\n';
	if (flags.out) {
		writeFileSync(flags.out, text);
		process.stdout.write(`untailwind: wrote ${text.split('\n').length} lines to ${flags.out}\n`);
	} else {
		process.stdout.write(text);
	}
}

main().catch((err: Error) => fail(err.message));
