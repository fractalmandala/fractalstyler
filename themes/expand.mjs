// Expands fractalstyler theme recipes into complete literal token sets.
// Every theme defines ALL role tokens for a full light and full dark variant,
// mirroring the formulas in ../fractalstyler/src/lib/styles/colors-themes.css.

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = dirname(fileURLToPath(import.meta.url));

// ── knobs ────────────────────────────────────────────────────────────────────
// hue        accent hue
// chroma     accent vividness
// tint       how much hue the neutrals carry
// tintHue    neutral hue when it differs from the accent (cool/warm split)
// accentC    accent chroma when it differs from `chroma`
// darkDepth  L of the dark bg (0.10 deep … 0.16 soft)
// lightBg    L of the light bg
// spread     surface spacing multiplier (0.8 tight … 1.3 airy)
// contrast   'soft' | 'normal' | 'high' — text/border/button strength
// shadow     warm/cool shadow as [r, g, b]
// status     'stable' | 'warm' | 'cool' | 'muted' — status hue families

const STATUS = {
	stable: { success: [138, 0.2], warning: [92, 0.18], danger: [25, 0.25], info: [260, 0.22] },
	warm: { success: [150, 0.18], warning: [85, 0.2], danger: [20, 0.26], info: [255, 0.2] },
	cool: { success: [145, 0.17], warning: [95, 0.16], danger: [28, 0.22], info: [250, 0.24] },
	muted: { success: [148, 0.13], warning: [92, 0.12], danger: [25, 0.16], info: [255, 0.15] }
};

const CONTRAST = {
	soft: { text: [0.22, 0.46, 0.55], border: [0.925, 0.85, 0.955], button: [0.26, 0.34, 0.2], darkText: [0.97, 0.74, 0.62], darkBorder: [0.255, 0.33, 0.215] },
	normal: { text: [0.18, 0.42, 0.55], border: [0.91, 0.82, 0.945], button: [0.2, 0.29, 0.14], darkText: [0.98, 0.76, 0.62], darkBorder: [0.27, 0.35, 0.225] },
	high: { text: [0.13, 0.35, 0.5], border: [0.885, 0.78, 0.93], button: [0.16, 0.26, 0.11], darkText: [0.99, 0.8, 0.62], darkBorder: [0.3, 0.4, 0.25] }
};

const r = (n) => Number(n.toFixed(3));
const oklch = (L, C, H, a) => `oklch(${r(L)} ${r(C)} ${r(H)}${a === undefined ? '' : ` / ${r(a)}`})`;
const spread = (v, k) => r(v * k);

function themeTokens(t) {
	const hue = t.hue;
	const tintHue = t.tintHue ?? hue;
	const chroma = t.chroma;
	const accentC = t.accentC ?? chroma;
	const tint = t.tint;
	const k = t.spread ?? 1;
	const cx = CONTRAST[t.contrast ?? 'normal'];
	const st = STATUS[t.status ?? 'stable'];
	const darkBg = t.darkDepth ?? 0.145;
	const lightBg = t.lightBg ?? 0.995;
	const shadow = t.shadow ?? [0, 0, 0];
	const sc = (role) => st[role];
	const statusSet = (mode, role, base, hover) => {
		const [h, c] = sc(role);
		if (mode === 'light') {
			return {
				[role]: oklch(base, c, h),
				[`${role}-hover`]: oklch(hover, c, h),
				[`${role}-00`]: oklch(r(base + 0.33), c * 0.35, h),
				[`${role}-25`]: oklch(r(base + 0.17), c * 0.75, h),
				[`${role}-50`]: oklch(base, c, h),
				[`${role}-75`]: oklch(r(base - 0.2), c, h),
				[`${role}-100`]: oklch(r(base - 0.4), c, h)
			};
		}
		return {
			[role]: oklch(base + 0.07, c * 0.95, h),
			[`${role}-hover`]: oklch(base + 0.12, c * 0.8, h),
			[`${role}-00`]: oklch(0.27, c * 0.35, h),
			[`${role}-25`]: oklch(0.42, c * 0.6, h),
			[`${role}-50`]: oklch(0.65, c * 0.9, h),
			[`${role}-75`]: oklch(0.8, c * 0.72, h),
			[`${role}-100`]: oklch(0.93, c * 0.36, h)
		};
	};

	const shadows = (mode) => {
		const a = mode === 'light' ? [0.05, 0.1, 0.05, 0.1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.3, 0.3, 0.35, 0.4, 0.45]
			: [0.3, 0.25, 0.2, 0.2, 0.2, 0.25, 0.25, 0.3, 0.3, 0.35, 0.35, 0.4, 0.45];
		const rgb = `rgb(${shadow.join(' ')})`;
		const box = (al) => `${rgb} / ${al}`;
		if (mode === 'light') {
			return {
				'shadow-color': shadow.join(' '),
				'shadow-rim': 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
				'shadow-xs': `0 1px 2px ${box(0.05)}`,
				'shadow-sm': `0 1px 2px ${box(0.1)}, 0 2px 4px ${box(0.05)}`,
				'shadow-md': `0 2px 4px ${box(0.1)}, 0 8px 16px ${box(0.2)}`,
				'shadow-bs': `0 2px 4px ${box(0.1)}, 0 6px 14px ${box(0.2)}`,
				'shadow-lg': `0 4px 8px ${box(0.1)}, 0 12px 24px ${box(0.2)}`,
				'shadow-xl': `0 8px 16px ${box(0.1)}, 0 20px 36px ${box(0.2)}`,
				'shadow-2xl': `0 12px 24px ${box(0.1)}, 0 28px 48px ${box(0.2)}`,
				'shadow-3xl': `0 16px 32px ${box(0.1)}, 0 36px 64px ${box(0.2)}`
			};
		}
		return {
			'shadow-color': shadow.join(' '),
			'shadow-rim': 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
			'shadow-xs': `0 1px 2px ${box(0.3)}`,
			'shadow-sm': `0 1px 2px ${box(0.25)}, 0 2px 4px ${box(0.2)}`,
			'shadow-md': `0 2px 4px ${box(0.2)}, 0 8px 16px ${box(0.25)}`,
			'shadow-bs': `0 2px 4px ${box(0.2)}, 0 6px 14px ${box(0.25)}`,
			'shadow-lg': `0 4px 8px ${box(0.25)}, 0 12px 24px ${box(0.3)}`,
			'shadow-xl': `0 8px 16px ${box(0.3)}, 0 20px 36px ${box(0.35)}`,
			'shadow-2xl': `0 12px 24px ${box(0.35)}, 0 28px 48px ${box(0.4)}`,
			'shadow-3xl': `0 16px 32px ${box(0.4)}, 0 36px 64px ${box(0.45)}`
		};
	};

	const light = {
		'white-fixed': oklch(1, 0, 0),
		'black-fixed': oklch(0.21, 0.006, 285.9),
		bg: oklch(lightBg, spread(tint, 0.3), tintHue),
		'bg-surface': oklch(r(lightBg - 0.02 * k), spread(tint, 0.5), tintHue),
		'bg-panel': oklch(r(lightBg - 0.035 * k), spread(tint, 0.6), tintHue),
		'bg-overlay': oklch(1, 0, 0),
		'bg-button': oklch(cx.button[0], tint, tintHue),
		'bg-button-hover': oklch(cx.button[1], tint, tintHue),
		'bg-button-active': oklch(cx.button[2], tint, tintHue),
		'bg-button-secondary': oklch(r(lightBg - 0.065 * k), spread(tint, 0.6), tintHue),
		'bg-button-secondary-hover': oklch(r(lightBg - 0.095 * k), spread(tint, 0.6), tintHue),
		'bg-button-secondary-active': oklch(r(lightBg - 0.125 * k), spread(tint, 0.6), tintHue),
		'bg-input': oklch(r(lightBg - 0.01 * k), spread(tint, 0.4), tintHue),
		'state-hover': oklch(0, 0, 0, 0.045),
		'state-selected': oklch(0, 0, 0, 0.08),
		border: oklch(cx.border[0], spread(tint, 0.6), tintHue),
		'border-strong': oklch(cx.border[1], spread(tint, 0.8), tintHue),
		'border-subtle': oklch(cx.border[2], spread(tint, 0.5), tintHue),
		'text-primary': oklch(cx.text[0], tint, tintHue),
		'text-secondary': oklch(cx.text[1], tint, tintHue),
		'text-muted': oklch(cx.text[2], tint, tintHue),
		'text-inverse': oklch(0.99, 0, 0),
		'theme-color': oklch(t.accentL ?? 0.6, accentC, hue),
		'theme-color-up': oklch(r((t.accentL ?? 0.6) + 0.06), accentC, hue),
		'theme-color-down': oklch(r((t.accentL ?? 0.6) - 0.13), accentC, hue),
		...statusSet('light', 'success', 0.65, 0.55),
		...statusSet('light', 'warning', 0.85, 0.8),
		...statusSet('light', 'danger', 0.6, 0.5),
		...statusSet('light', 'info', 0.5, 0.4),
		ring: oklch(r((t.accentL ?? 0.6) - 0.05), accentC, hue, 0.4),
		scrim: oklch(0.2, tint, tintHue, 0.35),
		...shadows('light'),
		'neutral-00': oklch(0.92, 0.002, 210),
		'neutral-25': oklch(0.8, 0.002, 140),
		'neutral-50': oklch(0.6, 0.01, 140),
		'neutral-75': oklch(0.4, 0.01, 140),
		'neutral-100': oklch(0.3, 0.01, 140)
	};

	const dark = {
		'white-fixed': oklch(1, 0, 0),
		'black-fixed': oklch(0.21, 0.006, 285.9),
		bg: oklch(darkBg, tint, tintHue),
		'bg-surface': oklch(r(darkBg + 0.03 * k), tint, tintHue),
		'bg-panel': oklch(r(darkBg + 0.055 * k), tint, tintHue),
		'bg-overlay': oklch(r(darkBg + 0.08 * k), tint, tintHue),
		'bg-input': oklch(r(darkBg + 0.04 * k), tint, tintHue),
		'bg-button': oklch(0.96, tint, tintHue),
		'bg-button-hover': oklch(0.88, tint, tintHue),
		'bg-button-active': oklch(0.8, tint, tintHue),
		'bg-button-secondary': oklch(r(darkBg + 0.125 * k), tint, tintHue),
		'bg-button-secondary-hover': oklch(r(darkBg + 0.165 * k), tint, tintHue),
		'bg-button-secondary-active': oklch(r(darkBg + 0.095 * k), tint, tintHue),
		'state-hover': oklch(1, 0, 0, 0.06),
		'state-selected': oklch(1, 0, 0, 0.1),
		border: oklch(cx.darkBorder[0], tint, tintHue),
		'border-strong': oklch(cx.darkBorder[1], tint, tintHue),
		'border-subtle': oklch(cx.darkBorder[2], tint, tintHue),
		'text-primary': oklch(cx.darkText[0], tint, tintHue),
		'text-secondary': oklch(cx.darkText[1], tint, tintHue),
		'text-muted': oklch(cx.darkText[2], tint, tintHue),
		'text-inverse': oklch(r(darkBg), tint, tintHue),
		'theme-color': oklch(t.accentLDark ?? 0.38, accentC, hue),
		'theme-color-up': oklch(r((t.accentLDark ?? 0.38) + 0.4), accentC, hue),
		'theme-color-down': oklch(r((t.accentLDark ?? 0.38) + 0.22), accentC, hue),
		...statusSet('dark', 'success', 0.65, 0.72),
		...statusSet('dark', 'warning', 0.8, 0.86),
		...statusSet('dark', 'danger', 0.57, 0.64),
		...statusSet('dark', 'info', 0.64, 0.73),
		ring: oklch(0.68, accentC, hue, 0.5),
		scrim: oklch(0, 0, 0, 0.6),
		...shadows('dark'),
		'neutral-00': oklch(0.26, 0.004, 140),
		'neutral-25': oklch(0.4, 0.004, 140),
		'neutral-50': oklch(0.6, 0.006, 140),
		'neutral-75': oklch(0.78, 0.006, 140),
		'neutral-100': oklch(0.92, 0.004, 140)
	};

	return { light, dark };
}

// ── the themes ───────────────────────────────────────────────────────────────

const themes = [
	{ name: 'fractal-gold', title: 'Fractal Gold', hue: 40, chroma: 0.2, tint: 0.012, shadow: [30, 22, 8], desc: 'The canonical warm gold — paper-light, gold accent.' },
	{ name: 'ember', title: 'Ember', hue: 42, chroma: 0.19, tint: 0.01, shadow: [35, 20, 10], status: 'warm', desc: 'Candlelit warm neutrals, burnt-orange accent.' },
	{ name: 'rose', title: 'Rose', hue: 8, chroma: 0.2, tint: 0.01, shadow: [30, 15, 15], desc: 'Crisp rose-red accent on clean neutrals.' },
	{ name: 'aurora', title: 'Aurora', hue: 168, chroma: 0.15, tint: 0.01, shadow: [10, 22, 20], status: 'cool', desc: 'Sea-green aurora, cool and calm.' },
	{ name: 'ocean', title: 'Ocean', hue: 238, chroma: 0.17, tint: 0.014, tintHue: 250, shadow: [12, 16, 35], status: 'cool', desc: 'Deep blue accent, faintly blue ink.' },
	{ name: 'lime', title: 'Lime', hue: 128, chroma: 0.2, tint: 0.008, shadow: [18, 26, 12], desc: 'Fresh green, almost-neutral surfaces.' },
	{ name: 'amber', title: 'Amber', hue: 78, chroma: 0.17, tint: 0.01, shadow: [32, 26, 10], status: 'warm', desc: 'Honeyed amber, warm but restrained.' },
	{ name: 'mono', title: 'Mono', hue: 268, chroma: 0, tint: 0, contrast: 'high', desc: 'Pure grayscale, maximum neutrality.' },
	{ name: 'midnight', title: 'Midnight', hue: 250, chroma: 0.12, tint: 0.02, tintHue: 260, darkDepth: 0.108, shadow: [8, 10, 28], status: 'cool', desc: 'Deep dark-first navy; light side stays airy.' },
	{ name: 'forest', title: 'Forest', hue: 155, chroma: 0.18, tint: 0.015, tintHue: 160, darkDepth: 0.13, shadow: [14, 24, 16], desc: 'Evergreen accent over mossy tinted neutrals.' },
	{ name: 'terracotta', title: 'Terracotta', hue: 35, chroma: 0.16, tint: 0.03, tintHue: 60, darkDepth: 0.15, shadow: [40, 26, 14], status: 'warm', desc: 'Heavily warm-tinted clay surfaces.' },
	{ name: 'lavender', title: 'Lavender', hue: 295, chroma: 0.14, tint: 0.012, tintHue: 300, shadow: [24, 16, 34], desc: 'Soft violet accent, gently violet neutrals.' },
	{ name: 'teal-deep', title: 'Teal Deep', hue: 200, chroma: 0.13, tint: 0.012, tintHue: 210, darkDepth: 0.125, shadow: [10, 22, 28], status: 'cool', desc: 'Petrol teal, cool cyan-tinted ink.' },
	{ name: 'crimson', title: 'Crimson', hue: 15, chroma: 0.22, tint: 0.012, tintHue: 25, shadow: [32, 14, 14], status: 'warm', desc: 'High-chroma crimson accent, warm ink.' },
	{ name: 'slate-cool', title: 'Slate', hue: 230, chroma: 0.05, tint: 0.02, tintHue: 240, shadow: [12, 16, 24], status: 'cool', desc: 'Desaturated blue-grey slate, engineering feel.' },
	{ name: 'sand', title: 'Sand', hue: 85, chroma: 0.1, tint: 0.04, tintHue: 85, lightBg: 0.985, darkDepth: 0.155, shadow: [38, 32, 18], status: 'warm', desc: 'Warm paper in both modes; low-chroma olive-gold accent.' },
	{ name: 'pastel-mint', title: 'Pastel Mint', hue: 165, chroma: 0.1, tint: 0.02, tintHue: 170, contrast: 'soft', shadow: [16, 30, 26], desc: 'Gentle mint, soft contrast, airy.' },
	{ name: 'high-contrast', title: 'High Contrast', hue: 250, chroma: 0.16, tint: 0, contrast: 'high', status: 'muted', desc: 'Accessible: pure-tone neutrals, strong borders and text.' },
	{ name: 'plum', title: 'Plum', hue: 320, chroma: 0.15, tint: 0.015, tintHue: 330, darkDepth: 0.12, shadow: [30, 14, 30], desc: 'Magenta-plum accent on ink-tinted surfaces.' },
	{ name: 'copper', title: 'Copper', hue: 50, chroma: 0.17, tint: 0.025, tintHue: 65, darkDepth: 0.14, shadow: [38, 26, 12], status: 'warm', desc: 'Metallic copper on bronze-tinted neutrals.' },
	{ name: 'arctic', title: 'Arctic', hue: 210, chroma: 0.08, tint: 0.008, tintHue: 220, lightBg: 0.998, darkDepth: 0.115, shadow: [14, 20, 30], status: 'cool', desc: 'Pale, near-white cool surfaces; icy blue accent.' },
	{ name: 'indigo', title: 'Indigo', hue: 275, chroma: 0.18, tint: 0.012, tintHue: 285, darkDepth: 0.118, shadow: [18, 14, 36], desc: 'Vivid indigo, deeply tinted dark mode.' },
	{ name: 'olive', title: 'Olive', hue: 120, chroma: 0.1, tint: 0.03, tintHue: 130, darkDepth: 0.145, shadow: [22, 28, 16], status: 'muted', desc: 'Muted sage/olive, earthy and quiet.' },
	{ name: 'neon-rose', title: 'Neon Rose', hue: 335, chroma: 0.25, tint: 0.01, accentL: 0.62, accentLDark: 0.55, darkDepth: 0.1, shadow: [32, 10, 26], status: 'warm', desc: 'Dark-forward neon magenta; maximal accent energy.' }
];

// ── emit ─────────────────────────────────────────────────────────────────────

function block(name, mode, tokens) {
	const lines = Object.entries(tokens).map(([k, v]) => `\t--${k}: ${v};`);
	return `[data-mode='${mode}'][data-theme='${name}'],\n[data-mode='${mode}'] [data-theme='${name}'] {\n${lines.join('\n')}\n}`;
}

const parts = [
	`/* GENERATED — fractalstyler full themes (${themes.length} themes, full light + dark token sets).`,
	` * Every theme defines every role token of colors-themes.css literally.`,
	` * Usage: <html data-theme="name" data-mode="light|dark">. Regenerate: node expand.mjs */
`
];

const index = [];
for (const t of themes) {
	const { light, dark } = themeTokens(t);
	const count = Object.keys(light).length + Object.keys(dark).length;
	if (Object.keys(light).length !== Object.keys(dark).length) throw new Error(`token mismatch in ${t.name}`);
	parts.push(`/* ${t.title} — ${t.desc} */`);
	parts.push(`[data-theme='${t.name}'] {\n\t--hue: ${t.hue};\n\t--chroma: ${t.chroma};\n\t--tint: ${t.tint};\n}`);
	parts.push(block(t.name, 'light', light));
	parts.push(block(t.name, 'dark', dark));
	parts.push(`[data-theme='${t.name}'] {\n\tbackground-color: var(--bg);\n\tcolor: var(--text-primary);\n\taccent-color: var(--theme-color);\n}`);
	parts.push('');
	index.push({
		name: t.name,
		title: t.title,
		desc: t.desc,
		hue: t.hue,
		chroma: t.chroma,
		tint: t.tint,
		tokensPerMode: Object.keys(light).length,
		preview: {
			light: [light.bg, light["bg-surface"], light["theme-color-down"], light["text-primary"]],
			dark: [dark.bg, dark["bg-surface"], dark["theme-color-up"], dark["text-primary"]]
		}
	});
}

const css = parts.join('\n') + '\n';
const cssPath = join(outDir, 'fsui-themes.css');
const jsonPath = join(outDir, 'themes.json');
await mkdir(outDir, { recursive: true });
await writeFile(cssPath, css);
await writeFile(jsonPath, JSON.stringify({ schema: 'fractalstyler colors-themes.css roles', themes: index }, null, '\t') + '\n');

const perMode = index[0].tokensPerMode;
console.log(`✔ ${themes.length} themes × 2 modes × ${perMode} tokens = ${themes.length * 2 * perMode} values`);
console.log(`  ${cssPath} (${(css.length / 1024).toFixed(0)} KB)`);
console.log(`  ${jsonPath}`);
