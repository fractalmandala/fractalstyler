/**
 * Generates `src/lib/styles/springs.css` — the CSS spring tokens.
 *
 * For every preset in the sibling fractalsvelte-ui spring solver:
 * `--spring-<name>: linear(…)` and `--spring-<name>-ms: <n>ms`.
 * If the sibling package is not present, rewrites the baked tokens already
 * in springs.css so the file stays well-formed.
 *
 * Run with `npm run gen:springs`.
 */
import { existsSync, renameSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, '../src/lib/styles/springs.css');
const SIBLING = resolve(here, '../../fractalsvelte-ui/src/lib/motion/spring.ts');

const BANNER = `/* GENERATED spring tokens. Source of truth for the linear() easings and settle
 * times of the gentle / snappy / bouncy / stiff / slow presets. Regenerate with
 * \`npm run gen:springs\` (reads the sibling fractalsvelte-ui spring solver when
 * present; otherwise rewrites this baked output). Do not edit by hand. */
`;

function baked(): string {
	// Keep whatever is already on disk if we cannot reach the solver, so a
	// standalone checkout does not invent new curves.
	if (existsSync(OUT)) return readFileSync(OUT, 'utf8');
	return `${BANNER}
:root {
	--spring-gentle: linear(0, 1);
	--spring-gentle-ms: 560ms;
	--spring-snappy: linear(0, 1);
	--spring-snappy-ms: 356ms;
	--spring-bouncy: linear(0, 1);
	--spring-bouncy-ms: 690ms;
	--spring-stiff: linear(0, 1);
	--spring-stiff-ms: 223ms;
	--spring-slow: linear(0, 1);
	--spring-slow-ms: 897ms;
}
`;
}

export async function generateSprings(): Promise<string> {
	if (!existsSync(SIBLING)) return baked();
	const mod = await import(pathToFileURL(SIBLING).href);
	const springs = mod.springs as Record<string, unknown>;
	const springEasing = mod.springEasing as (name: string, n?: number) => { easing: string; duration: number };
	const names = Object.keys(springs);
	const lines: string[] = [BANNER.trimEnd(), '', ':root {'];
	for (const name of names) {
		const { easing, duration } = springEasing(name, 40);
		lines.push(`\t--spring-${name}: ${easing};`);
		lines.push(`\t--spring-${name}-ms: ${duration}ms;`);
	}
	lines.push('}', '');
	return lines.join('\n');
}

export async function run(): Promise<void> {
	const css = await generateSprings();
	mkdirSync(dirname(OUT), { recursive: true });
	const tmp = `${OUT}.${process.pid}.tmp`;
	writeFileSync(tmp, css, 'utf8');
	renameSync(tmp, OUT);
}

const invoked = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : '';
if (import.meta.url === invoked) {
	await run();
	console.log(`gen-springs: wrote ${OUT}`);
}
