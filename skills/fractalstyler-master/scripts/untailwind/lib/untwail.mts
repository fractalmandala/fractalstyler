/**
 * Untailwind — a class list (or the markup that carries it) becomes readable CSS with one comment per
 * utility, in the house format. For `mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight
 * text-fg` on an `h2`, the output is a `.element-h2` block whose lines read, in order:
 * `margin-bottom: 1rem` (16px), `display: flex`, `align-items: center`, `gap: 0.5rem` (8px),
 * `font-size: 1.125rem` (18px) and its `line-height: 1.75rem` (28px), `font-weight: 600`,
 * `letter-spacing: -0.025em`, and `color: var(--color-fg)` — each annotated with the utility that
 * produced it, in a trailing comment column.
 *
 * Values come from the real compiler (`resolve.ts`), so nothing here is a guess: this file only
 * (1) simplifies what Tailwind emits — `calc(0.25rem * 4)` is a spacing multiple, `0.25rem * 4` is what
 * the token means but not what a reader wants — (2) names the selector from the element it was written
 * on, and (3) annotates. The annotation carries the pixel equivalent and whether the value is a Tailwind
 * default or one of the project's own theme tokens, which is the whole reason to untailwind in the first
 * place: to see what the classes actually do.
 */
import { isDefaultToken, resolveClasses, themeTokenNames, type Extracted } from './resolve.mts';
import type { UtilityRule } from './engine.mts';

export type Element = { tag: string; classes: string[] };

export type UntwailOptions = {
	/** Overrides the derived selector; ignored when the input has more than one class-bearing element. */
	selector?: string;
	/** A pasted `@theme` / `:root` block with the project's own tokens. */
	themeCss?: string;
	/** Emit the utility token as a comment. Default true. */
	comments?: boolean;
	/** `css` (default) or `sass` — the same sections, the same comment column, two notations. */
	format?: 'css' | 'sass';
};

export type UntwailResult = {
	/** The rendered stylesheet, in the requested format. */
	text: string;
	/** Classes Tailwind produced nothing for, in input order. */
	unknown: string[];
	/** One line per thing the reader would otherwise have to trust: dropped wrappers, guessed tokens. */
	notices: string[];
	elements: Element[];
	tokens: number;
};

// ---------- input → elements ---------------------------------------------------

/**
 * Find every element that carries classes. Markup gets tag names for selectors (the example's
 * `element-h2`); a bare class list becomes one anonymous element. Deliberately a scanner over quotes
 * rather than an HTML parser: the input is a snippet, often with `{title}` expressions and unbalanced
 * fragments around it, and a parser would fail on exactly the paste people make.
 */
export function elementsOf(input: string): Element[] {
	const out: Element[] = [];
	let sawTag = false;
	const tagRe = /<([A-Za-z][\w.-]*)((?:[^>"']|"[^"]*"|'[^']*'|`[^`]*`)*?)(\/?)>/g;
	for (const m of input.matchAll(tagRe)) {
		sawTag = true;
		const cls = classAttr(m[2]);
		if (cls.length) out.push({ tag: m[1], classes: cls });
	}
	// Markup with no classes anywhere is still markup: reading its prose as utilities would invent CSS.
	if (sawTag) return out;

	// No markup: treat the whole input as one class list.
	const tokens = classesFrom(input.replace(/<[^>]*>/g, ' '));
	return tokens.length ? [{ tag: '', classes: tokens }] : [];
}

function classAttr(attrs: string): string[] {
	for (const re of [/class(?:Name)?\s*=\s*"([^"]*)"/g, /class(?:Name)?\s*=\s*'([^']*)'/g, /class(?:Name)?\s*=\s*`([^`]*)`/g, /class(?:Name)?\s*=\s*\{`([^`]*)`\}/g, /class(?:Name)?\s*=\s*\{"([^"]*)"\}/g]) {
		const m = re.exec(attrs);
		if (m) return classesFrom(m[1]);
	}
	// `class={cls("a", "b")}` and friends: take every quoted run inside the braces.
	const braced = /class(?:Name)?\s*=\s*\{([^}]*)\}/.exec(attrs);
	if (braced) {
		const quoted = [...braced[1].matchAll(/["'`]([^"'`\s]+)["'`]/g)].map((q) => q[1]);
		if (quoted.length) return classesFrom(quoted.join(' '));
	}
	return [];
}

/** Split a class string, dropping template-expression fragments we cannot resolve statically. */
export function classesFrom(text: string): string[] {
	const cleaned = text.replace(/\{[^}]*\}/g, ' ').replace(/["'`]/g, ' ');
	// A utility is made of Tailwind's own alphabet and always contains a letter, so stray `#`, `1`, or an
	// expression fragment left over from markup is not a class.
	return [...new Set(cleaned.split(/\s+/).filter((t) => /^[a-zA-Z0-9@:!\-.[\]/%_#&*+(),'"]+$/.test(t) && /[a-zA-Z]/.test(t)))];
}

// ---------- value simplification ----------------------------------------------

const REM_PX = 16;

/** `calc(0.25rem * 4)` → `1rem`; `calc(var(--x) * 2)` is left alone when the token is unknown. */
export function simplify(value: string): string {
	let out = value.replace(/\s+/g, ' ').trim();
	for (let i = 0; i < 4 && /calc\(/.test(out); i++) {
		out = out.replace(/calc\(([^()]*)\)/g, (_all, inner: string) => foldCalc(inner.trim()));
	}
	return out.replace(/\s*([;,])\s*/g, '$1 ').replace(/\s+/g, ' ').trim();
}

function foldCalc(inner: string): string {
	const parts = inner.split(/\s*\*\s*/);
	if (parts.length === 2) {
		const [a, b] = parts.map(Numberish);
		if (a && b) {
			const unit = a.unit ?? b.unit;
			if (unit || (a.num === 1 && b.unit) || (b.num === 1 && a.unit)) {
				const num = (a.num ?? 1) * (b.num ?? 1);
				return trim(num) + (unit ?? '');
			}
		}
	}
	const terms = inner.split(/\s*\+\s*/).map(Numberish);
	if (terms.length > 1 && terms.every((t) => t.num !== undefined) && sameUnit(terms)) {
		return trim(terms.reduce((n, t) => n + (t.num ?? 0), 0)) + (terms.find((t) => t.unit)?.unit ?? '');
	}
	return `calc(${inner})`;
}

const Numberish = (s: string): { num?: number; unit?: string } => {
	const m = /^(-?[\d.]+)(rem|em|px|%)?$/.exec(s.trim());
	if (!m) return {};
	return { num: Number(m[1]), unit: m[2] };
};
const sameUnit = (ts: Array<{ unit?: string }>): boolean => new Set(ts.map((t) => t.unit ?? '')).size <= 1;
const trim = (n: number): string => String(Number(n.toFixed(6)).toString());

/** The px equivalent of a length, for the comment. Non-lengths get nothing, and `em` is left out on
 *  purpose: it scales with the element's own font size (`tracking-tight` is -0.025em of 18px, not of the
 *  16px root), so quoting a root-relative px number under it would be a lie. */
export function pxOf(value: string): number | null {
	const m = /^(-?[\d.]+)(rem|px)$/.exec(value.trim());
	if (!m) return null;
	const n = Number(m[1]);
	return m[2] === 'px' ? n : n * REM_PX;
}

const VAR_IN_VALUE = /var\(--([A-Za-z0-9-]+)\)/;

// ---------- emission ----------------------------------------------------------

/** Group a class's rules the way a human reads them: base, then state, then breakpoint. */
type Section = { media: string | null; suffix: string; decls: Array<{ prop: string; value: string; token: string; note?: string }> };

function sectionsOf(token: string, rules: UtilityRule[]): Section[] {
	const out: Section[] = [];
	for (const rule of rules) {
		// `@media (hover: hover)` is a capability guard, not a breakpoint: a hand-written rule says `:hover`.
		const media = rule.media && /hover:\s*hover/.test(rule.media) ? null : rule.media;
		const suffix = rule.suffix.replace(/^\s+/, '');
		const found = out.find((s) => s.media === media && s.suffix === suffix);
		const decls = rule.decls.map(([prop, value]) => ({ prop, value: simplify(value), token }));
		if (found) found.decls.push(...decls);
		else out.push({ media, suffix, decls });
	}
	return out;
}

/** Keep one declaration per (section, property), first wins: Tailwind's `@supports color-mix` twin of the
 *  same utility would otherwise print the same property twice with different colour spaces. */
function dedupe(sections: Section[]): Section[] {
	const seen = new Set<string>();
	const out: Section[] = [];
	for (const section of sections) {
		const decls = section.decls.filter((d) => {
			// Keyed on the utility too, not only the property: Tailwind's `@supports color-mix` twin of the
			// same utility writes the same property twice, and that is the duplicate worth hiding. Two
			// *different* utilities writing one property (`p-4` then `p-[13px]`) is the cascade, and the
			// reader needs both lines to see which one the element actually ends up with.
			const key = `${section.media}|${section.suffix}|${d.prop}|${d.token}`;
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		});
		if (decls.length) out.push({ ...section, decls });
	}
	return out;
}

const noteFor = (value: string): string | undefined => {
	const m = VAR_IN_VALUE.exec(value);
	if (!m) return undefined;
	return isDefaultToken(`--${m[1]}`) ? undefined : 'custom theme variable';
};

/**
 * Tailwind stores a type step's leading as a ratio of rems — `--text-lg--line-height: calc(1.75 / 1.125)` —
 * which is correct CSS but unreadable in a line-by-line annotation. The numerator *is* the line height in
 * rems, so when the denominator matches the font-size sitting in the same block the rule rewrites to
 * `1.75rem` and the comment gains `(28px)`. A ratio whose denominator is some other size is multiplied, and
 * a unitless `line-height: 1.5` with no font-size in the block is left exactly as Tailwind wrote it.
 */
export function resolveLineHeights(sections: Section[]): Section[] {
	return sections.map((section) => {
		const font = section.decls.find((d) => d.prop === 'font-size');
		const fontSizeRem = font ? /^(-?[\d.]+)rem$/.exec(font.value)?.[1] : undefined;
		const size = fontSizeRem === undefined ? null : Number(fontSizeRem);
		const decls = section.decls.map((d) => {
			if (d.prop !== 'line-height') return d;
			const ratio = /^calc\(([\d.]+) \/ ([\d.]+)\)$/.exec(d.value);
			if (ratio) {
				const [num, den] = [Number(ratio[1]), Number(ratio[2])];
				if (size !== null && Math.abs(den - size) < 1e-6) return { ...d, value: `${trim(num)}rem` };
				if (size !== null) return { ...d, value: `${trim((num / den) * size)}rem` };
				return d;
			}
			const bare = /^[\d.]+$/.exec(d.value);
			if (bare && size !== null) return { ...d, value: `${trim(Number(bare[0]) * size)}rem` };
			return d;
		});
		return { ...section, decls };
	});
}

/**
 * Group one element's utilities the way a reader expects them: base declarations, then state rules, then
 * breakpoint blocks, with the classes Tailwind had no answer for split off and any guess explained.
 */
function collect(element: Element, classMap: Map<string, UtilityRule[]>): { sections: Section[]; unknown: string[]; notices: string[] } {
	const unknown: string[] = [];
	const notices: string[] = [];
	/** selector suffix → declarations, in token order. */
	const byTarget = new Map<string, Section>();

	for (const token of element.classes) {
		const rules = classMap.get(token);
		if (!rules || rules.length === 0) {
			unknown.push(token);
			const guessed = guess(token);
			if (guessed) {
				const target = guessed.suffix;
				const section = byTarget.get(target) ?? { media: null, suffix: target, decls: [] };
				section.decls.push({ prop: guessed.prop, value: guessed.value, token, note: 'guessed' });
				byTarget.set(target, section);
				notices.push(`${token}: Tailwind emitted nothing, so it is written as ${guessed.prop}: ${guessed.value}`);
			}
			continue;
		}
		for (const section of sectionsOf(token, rules)) {
			const target = `${section.media ?? ''}|${section.suffix}`;
			const existing = byTarget.get(target);
			if (existing) existing.decls.push(...section.decls);
			else byTarget.set(target, { ...section, decls: [...section.decls] });
		}
	}

	return { sections: resolveLineHeights(dedupe([...byTarget.values()])), unknown, notices };
}

/**
 * The comment column is what makes the output readable: every line in a block shares one column, and the
 * parentheticals say how many pixels the utility is and whether the value is the project's own token
 * (`custom theme variable`) or a fallback we had to invent (`guessed`). Every line of a block carries the
 * same indent prefix, so the padding lands them on one column whatever the tab width is.
 */
function bodyOf(decls: Section['decls'], indent: string, comments: boolean, suffix: string): string {
	const rows = decls.map((d) => {
		const decl = `${indent}${d.prop}: ${d.value}${suffix}`;
		if (!comments) return { decl, note: '' };
		const px = pxOf(d.value);
		const why = d.note ?? noteFor(d.value);
		const parts = [px !== null ? `(${trim(px)}px)` : '', why ? `(${why})` : ''].filter(Boolean).join(' ');
		return { decl, note: [`/* ${d.token}`, parts ? ` ${parts} */` : ' */'].join('') };
	});
	const width = Math.max(...rows.map((r) => r.decl.trimEnd().length));
	return rows.map((r) => `${r.decl.padEnd(width + 2)}${r.note}`.trimEnd()).join('\n');
}

const partition = (sections: Section[]): { base: Section[]; states: Section[]; at: Section[] } => ({
	base: sections.filter((s) => !s.media && !s.suffix),
	states: sections.filter((s) => !s.media && s.suffix),
	at: sections.filter((s) => s.media)
});

/** One element as CSS: the base rule, then its state rules, then its media blocks. */
function renderCss(sections: Section[], selector: string, comments: boolean): string {
	const { base, states, at } = partition(sections);
	const lines: string[] = [];
	if (base.length) lines.push(`${selector} {`, bodyOf(base.flatMap((s) => s.decls), '  ', comments, ';'), '}');
	for (const s of states) lines.push('', `${selector}${s.suffix} {`, bodyOf(s.decls, '  ', comments, ';'), '}');
	for (const s of at) {
		// A breakpoint nests one level deeper, so its body lines indent with it.
		lines.push('', `@media ${s.media} {`, `  ${selector}${s.suffix} {`, bodyOf(s.decls, '    ', comments, ';'), '  }', '}');
	}
	return lines.filter((l) => l.length).join('\n');
}

/**
 * The same element as indented Sass, with the annotation kept on the declaration line. That is the whole
 * reason `tw-sass` renders from the sections itself instead of piping the CSS through the CSS → Sass
 * converter: a comment that has to sit on its own line stops being a column, and the column is the point.
 */
function renderSass(sections: Section[], selector: string, comments: boolean): string {
	const { base, states, at } = partition(sections);
	const lines: string[] = [];
	if (base.length) lines.push(selector, bodyOf(base.flatMap((s) => s.decls), '\t', comments, ''));
	for (const s of states) lines.push(`\t&${s.suffix}`, bodyOf(s.decls, '\t\t', comments, ''));
	for (const s of at) {
		lines.push(`\t@media ${s.media}`, s.suffix ? `\t\t&${s.suffix}` : `\t\t${selector}`, bodyOf(s.decls, '\t\t\t', comments, ''));
	}
	return lines.join('\n');
}

/**
 * A token Tailwind did not answer. Only two shapes are worth guessing, and both are marked `guessed` in
 * the output and explained in the notice line: a bare `text-<name>` colour and a bare `bg-<name>`.
 */
function guess(token: string): { prop: string; value: string; suffix: string } | null {
	const m = /^(?:text|bg|border|ring|fill|stroke|from|via|to)-([a-zA-Z][\w-]*)$/.exec(token);
	if (!m) return null;
	const name = m[1];
	if (/^(xs|sm|base|lg|xl|[\dx]{1,3})$/.test(name) && m[0].startsWith('text-')) return null; // sizes, not colours
	const PROPS: Record<string, string> = { text: 'color', bg: 'background-color', border: 'border-color', fill: 'fill', stroke: 'stroke' };
	const prop = PROPS[m[0].split('-')[0]];
	if (!prop) return null;
	return { prop, value: `var(--color-${name})`, suffix: '' };
}

const selectorFor = (element: Element, index: number, many: number, override?: string): string => {
	if (override?.trim()) return override.trim().startsWith('.') || override.trim().startsWith('#') ? override.trim() : `.${override.trim()}`;
	if (!element.tag) return '.element';
	const base = `element-${element.tag.toLowerCase().replace(/[^a-z0-9-]/g, '-')}`;
	return many > 1 && element.tag ? `.${base}${index > 0 ? `-${index + 1}` : ''}` : `.${base}`;
};

/** The full run: parse, compile once for every class in the input, render one rule per element. */
export async function untwail(input: string, options: UntwailOptions = {}): Promise<UntwailResult> {
	const elements = elementsOf(input);
	const tokens = [...new Set(elements.flatMap((e) => e.classes))];
	const notices: string[] = [];
	if (!tokens.length) return { text: '', unknown: [], notices: ['nothing to do — the input has no classes'], elements: [], tokens: 0 };

	const themeCss = options.themeCss ?? '';
	const userTokens = themeTokenNames(themeCss);
	const extracted: Extracted = await resolveClasses(tokens, themeCss);

	const chunks: string[] = [];
	const unknown: string[] = [];
	const render = options.format === 'sass' ? renderSass : renderCss;
	elements.forEach((element, i) => {
		const selector = selectorFor(element, i, elements.length, elements.length === 1 ? options.selector : undefined);
		const { sections, unknown: missing, notices: notes } = collect(element, extracted.classMap);
		chunks.push(render(sections, selector, options.comments !== false));
		unknown.push(...missing);
		notices.push(...notes);
	});

	if (userTokens.length) notices.push(`${userTokens.length} custom token(s) from the pasted theme kept as var() references`);
	if (unknown.length) notices.push(`${unknown.length} unresolved class(es): ${unknown.join(', ')}`);

	return { text: chunks.filter(Boolean).join('\n\n'), unknown, notices, elements, tokens: tokens.length };
}

