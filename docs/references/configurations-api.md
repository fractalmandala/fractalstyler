---
title: Configurations API
description: Complete registry of every configuration variable, runtime token, attribute axis and class pattern in the current system, read verbatim from the Sass sources.
type: fractalstyler
---

# Configurations API — every variable, token, attribute and class in the system

> This document is the *what*: every Sass configuration variable in
> `_00_config.sass`, every CSS custom property in `_00_tokens.sass`, every
> `data-*` axis, and every class family the loops and partials emit — with
> values, defaults, consumers, and who reads what.
>
> Sources read verbatim:
> `_00_config.sass`, `_00_tokens.sass`, `_01_base.sass`,
> `_02_dimensions.sass`, `_03_typography.sass`, `_04_containers.sass`,
> `_05_layouts.sass`, `_06_shells.sass`, `_07_interactions.sass`,
> `_08_visuals.sass`, `_09_own.sass`, `_10_propped.sass`, `index.sass`.
> `colorpacks.sass` and `themeplates.sass` are raw Sass variable palettes
> (`$green90`-style ladder constants); they emit no classes and no tokens and
> are intentionally not part of this API.
>
> Three kinds of API — do not mix them:
>
> | Kind | Example | Set where / when |
> |---|---|---|
> | **A. Sass source variables** | `$steps`, `$gap-families`, `$frame-ratios`, `$shadow-specs` | `src/lib/styles/_00_config.sass` — edit in place, then recompile |
> | **B. Runtime CSS props + `data-*` modes** | `--space-md`, `data-mode="dark"`, `data-variant="ghost"` | In the browser, live, no recompile |
> | **C. Classes** (loop families + partial classes) | `.gap-md`, `.grid-4`, `.el-variants[data-variant="ghost"]` | Baked at compile time from A; themed at runtime by B |

---

## 1. A — Sass configuration (`_00_config.sass`)

The whole compile-time surface is seven variables. They are *not* `!default`
and have no `with (…)` override: they are the system's own config, edited in
place. Everything loop-generated (the entire L1 space ladder, the L3 frames,
the `--shade-*` elevation tokens) is expanded from them.

| Variable | Value | Consumed by | Effect of a change |
|---|---|---|---|
| `$steps` | `('xs' 'sm' 'md' 'bs' 'lg' 'xl' '2xl' '3xl')` — 8 steps | `_02_dimensions.sass` (gap/pad/mar loops), `scripts/update-registry.ts` | Every space family is crossed with this list: a new step emits `.gap-…`/`.pad-…`/`.mar-…` rows for all 17 families — **only if** a matching `--space-<step>` token exists in `_00_tokens.sass`, else the emitted `var()` points at nothing |
| `$gap-families` | `(gap: gap, rgap: row-gap, cgap: column-gap)` — 3 families | `_02_dimensions.sass` | Key = class prefix, value = CSS property. Add `xgap: column-gap` and `.xgap-*` classes compile; remove a key and its classes cease to exist |
| `$pad-families` | `(pad: padding, px: padding-inline, py: padding-block, pt: padding-top, pr: padding-right, pb: padding-bottom, pl: padding-left)` — 7 families | `_02_dimensions.sass` | Same key→property contract. `px`/`py` are logical (inline/block, RTL-safe); named sides are physical |
| `$mar-families` | `(mar: margin, mx: margin-inline, my: margin-block, mt: margin-top, mr: margin-right, mb: margin-bottom, ml: margin-left)` — 7 families | `_02_dimensions.sass` | Same key→property contract. There are no negative-margin classes and no side-family aliases beyond these |
| `$frame-ratios` | `('16-9': '16 / 9', '9-16': '9 / 16', '4-3': '4 / 3', '3-4': '3 / 4', '3-2': '3 / 2', '2-3': '2 / 3', '1-1': '1 / 1')` — 7 ratios | `_04_containers.sass` (`.frame-*` loop) | Key = class suffix, value = `aspect-ratio` literal. Add `'21-9': '21 / 9'` and `.frame-21-9` compiles |
| `$breakpoints` | `(md: 768px, bs: 1024px, lg: 1280px)` | `_06_shells.sass` (`$md`/`$bs`/`$lg` locals → rail visibility media queries) | Renaming or moving a key moves the rail seams. **Not** a complete seam inventory: `_04_containers` and parts of `_06` hardcode `1025px`/`1281px`/`1441px`/`769px` literals; change both together |
| `$shadow-specs` | 8 steps, each `(y1, b1, a1, y2, b2, a2)` — key/ambient layer pairs | `:root` loop in `_00_config.sass` | Emits the `--shade-*` token per step (`var(--shadow-rim)` + two shadow layers). The `.shadow-*` classes read the separate `--shadow-*` channel tokens instead |

The header table of the file also fixes the step ladder semantics for humans:
key alpha tightens `0.14 → 0.02`, ambient alpha widens `0.00 → 0.08`, key blur
`1 → 24px`, ambient blur `0 → 64px` as steps grow.

---

## 2. B — runtime tokens (`_00_tokens.sass`)

Structure: two authoring mixins, `=light-theme-tokens` and
`=dark-theme-tokens`, are applied by `[data-mode='dark']` and
`[data-mode='light']` respectively. **A `data-mode` attribute on `<html>` is
mandatory** — the colour roles live inside the mode mixins, not `:root`;
without the attribute no colour token is defined. The `:root` block carries
everything mode-independent: type/space/radius scales, motion language,
control metrics, page chrome.

### 2.1 Colour roles (light / dark)

| Token | Light | Dark | Read by |
|---|---|---|---|
| `--white-fixed` | `#FFFFFF` | `#FFFFFF` | `.text-white` |
| `--black-fixed` | `#18181B` | `#18181B` | `.text-black` |
| `--bg` | `#FFFFFF` | `#121214` | `.bg-main`, `.bg`, `body`, `html` |
| `--bg-surface` | `#F4F3EE` | `#1C1C20` | `.bg-surface`, `body`, `html` |
| `--bg-panel` | `#F5F4EF` | `#1E1E22` | `.bg-panel`, `.el-variants[data-variant="secondary"]` |
| `--bg-sunken` | `#F6F6F6` | `#27272C` | `.bg-sunken` |
| `--bg-raised` | `#FCFDFD` | `#36363D` | `.bg-raised`, `.accordion-trigger:hover` |
| `--bg-extra` | `#F5F7F9` | `#161618` | `.bg-extra` |
| `--bg-input` | `#F4F3EE` | `#27272C` | *reserved input fill — no class consumes it* |
| `--bg-button` | `#6f6f6e` | `#32323A` | *reserved button fill — no class consumes it* |
| `--text-primary` | `#1c1c1d` | `#F4F4F6` | `.text-primary`, `body`, `html`, `.link-plain`, `.el-variants[data-variant="outline"]` |
| `--text-secondary` | `#808182` | `#9D9DA8` | `.text-secondary` |
| `--text-muted` | `#aaacaf` | `#63636E` | `.text-muted`, `.inputs-wrapper label`, `.breadcrumb-*` |
| `--text-inverse` | `#FFFFFF` | `#121214` | `.text-inverse` — flips with mode by design |
| `--state-surface` | `#F4F4F6` | `#27272C` | `.el-variants[data-variant="primary"]`, `.el-vss[data-variant="primary"]` |
| `--state-hover` | `#E4E5E8` | `#33333C` | `a.nav-link:hover`, `.el-variants[data-variant="primary"]:hover` |
| `--state-selected` | `#7c7c7a` | `#3E3E4A` | `.el-variants[...].selected`, `.el-vss[...].selected` |
| `--border` | `#E5E7EB` | `#2E2E36` | `.border`, `.bt`/`.br`/`.bb`/`.bl`, `.el-variants[data-variant="primary"]` |
| `--border-subtle` | `#F0F1F3` | `#222228` | `.border-subtle`, `.bt-sub`/…, `.el-variants[data-variant="secondary"]` |
| `--border-strong` | `#D1D5DB` | `#44444E` | `.border-strong`, `.bt-str`/…, `.el-variants[data-variant="primary"].selected` |
| `--theme-color` | `#22c55e` | `#22c55e` | `.link`, `.text-theme`, `.input`/`.select` focus, `.el-variants[data-variant="themed"]` |
| `--theme-color-alt` | `#00df89` | `#00df89` | `.link:hover`, `.text-theme-alt`, `.el-variants[data-variant="themed"].selected` |
| `--theme-color-sub` | `#10b981` | `#10b981` | `.text-theme-sub`, `.el-variants[data-variant="themed"]:hover` |
| `--accent-orange` | `#FF7A00` | `#FF7A00` | *reserved accent channel — no consumer yet* |
| `--accent-green` | `#10B981` | `#22C55E` | *reserved accent channel — no consumer yet* |
| `--success` / `--success-hover` | `#10B981` / `#059669` | `#22C55E` / `#34D399` | `.text-success`, `.bg-success` |
| `--warning` / `--warning-hover` | `#FFD000` / `#E5B800` | `#FFD000` / `#FCD34D` | `.text-warning`, `.bg-warning` |
| `--danger` / `--danger-hover` | `#EF4444` / `#DC2626` | `#EF4444` / `#F87171` | `.text-danger`, `.bg-danger` |
| `--info` / `--info-hover` | `#3B82F6` / `#2563EB` | `#60A5FA` / `#93C5FD` | `.text-info`, `.bg-info` |
| `--ring` | `rgba(255, 208, 0, 0.4)` | `rgba(255, 208, 0, 0.45)` | `.input`/`.select`/`button`/`.button`/`a.btn` focus, `.accordion-trigger` focus |
| `--shadow-color` | `0 0 0` | `0 0 0` | every `--shadow-*` channel (RGB triplet) |
| `--shadow-rim` | `inset 0 1px 0 rgba(255, 255, 255, 0.6)` | `inset 0 1px 0 rgba(255, 255, 255, 0.08)` | prefixed onto `--shade-*` tokens |
| `--shadow-umbra` | *(undefined in light)* | `rgb(0 0 0 / 0.60)` | dark-only umbra channel — no consumer yet |
| `--shadow-xs` … `--shadow-3xl` | two-layer key+ambient; **alphas are per-mode** (light 0.05–0.10) | same ramp, higher alphas (0.20–0.45) | `.shadow-xs` … `.shadow-3xl` |

### 2.2 Mode-independent `:root` tokens

| Group | Tokens | Notes |
|---|---|---|
| Fonts | The library declares **no** font token. `_01_base.sass` assigns `font-family: var(--font-sans)` to `body, html`; the consumer supplies `--font-sans` / `--font-mono` and their `@font-face` rules. | There is no `_00_fonts.sass` partial — the token is the consumer's to define. |
| Type scale | `--text-scaling: 1.25`; `--text-xs` `0.67rem`, `--text-sm` `0.75rem`, `--text-md` `clamp(0.8333rem, …, 0.9rem)`, `--text-bs` `clamp(1rem, …, 1rem)`; `--text-lg`+ each `clamp(previous × var(--text-scaling), …)` up to `--text-5xl` | Fixed rem rungs to base, then clamped — not fluid interpolation |
| Space scale | `--unit-space: 0.25rem`; `--space-xs` = unit, `sm` ×2, `md` ×3, `bs` ×4, `lg` ×6, `xl` ×8, `2xl` ×12, `3xl` ×16 | The rung set must mirror `$steps` — see §1 |
| Radius | `--radius-xs: 2px`, `sm: 4px`, `md: 8px`, `bs: 16px`, `lg: 32px`, `full: 9999px` | Six channels; no literal-radius ladder exists |
| Control metrics | `--height-sm: 20px`, `--height-md: 24px`, `--height-bs: 28px`, `--height-lg: 32px`, `--height-xl: 40px`, `--height-2xl: 48px` | `.h-sm`…`.h-2xl` classes and `.el-size[data-size]` read `--height-*` |
| Avatar / switch | `--avatar-size: 32px`, `--switch-w: 40px`, `--switch-h: 22px`, `--switch-thumb: 16px` | Load-bearing pairings documented in the source |
| Motion | `--transin1..3`, `--transout1..3` (cubic-beziers); `--speed0: 50ms`, `--speed1: 90ms`, `--speed2: 140ms`, `--speed3: 220ms`; `--motionin1..3`/`--motionout1..3` = duration + easing | Every `transition:` in the system reads these |
| Page chrome | `--header-height: 64px`, `--footer-height: 32px`, `--fit-height` (their sum), `--prose-clamp: 65ch`, `--content-clamp: 1600px`, `--app-inline: var(--space-lg)`, `--card-min: 240px`, `--sidebar-width`/`-left`/`-right: 280px`, `--z-sticky: 100`, `--z-raised: 200`, `--z-modal: 300`, `--z-toast: 500` | Shell geometry the L4 classes read |
| Pop colors | `--greenpop1..4`, `--orangepop1..6`, `--yellowpop1..4` | Named accent literals, mode-independent. Ink classes `.orange1`…`.orange6`, `.yellow1`…`.yellow4`, `.green1`…`.green4` read them |
| Elevation (from `_00_config.sass`) | `--shade-xs` … `--shade-3xl` | Loop-generated from `$shadow-specs` — rim + key layer + ambient layer |

---

## 3. B — `data-*` attribute API

**The axes are class-qualified.** An element opts into an axis by carrying the
class that answers it; the element name is never the qualifier. A bare
`<button data-variant="primary">` paints nothing — the class is what turns the
attribute into a rule.

| Class | Attribute | Values | Effect |
|---|---|---|---|
| `.el-variants` | `data-variant` | `primary` \| `secondary` \| `themed` \| `outline` \| `ghost` \| `link` \| `icon` | Visual paint. `primary` fills `--state-surface`, `secondary` fills `--bg-panel`, `themed` fills `--theme-color`, `outline` draws a `--text-primary` border, `ghost` and `link` are transparent, `icon` is a bare glyph button. A `.selected` class switches the fill to `--state-selected` |
| `.el-shape` | `data-shape` | `square` \| `min` \| `modern` \| `curved` \| `round` | Corner treatment: `0` / `--radius-xs` / `--radius-sm` / `--radius-md` / `--radius-full` |
| `.el-size` | `data-size` | `sm` \| `md` \| `bs` \| `lg` \| `xl` | Metrics axis: height + font-size channels, read from `--height-*` and `--text-*` |
| `.el-pad` | `data-pad` | `sm` \| `md` \| `bs` \| `lg` \| `xl` | Padding from `--space-*` |
| `.el-shadow` | `data-shadow` | `sm` \| `bs` \| `lg` \| `xl` \| `2xl` | Static elevation from `--shadow-*` |
| `.el-shadow-hover` | `data-shadow` | `sm` \| `bs` \| `lg` \| `xl` \| `2xl` | Elevation that steps down one rung on hover |
| `.el-vss` | `data-variant` + `data-shape` + `data-size` | as above | Variant, shape and size in one class — the shorthand for a control that wants all three |

The same axis classes work on any element: a button, an input, a select, a card
or a plain div. Which element carries which axis is the author's choice.

`data-mode` is the one attribute that is element-bound rather than
class-bound: it goes on `<html>` and selects the whole colour-role set.

| Attribute | Where | Values | Effect |
|---|---|---|---|
| `data-mode` | `<html>` (mandatory) | `light` \| `dark` | Applies `=light-theme-tokens` / `=dark-theme-tokens` — the entire colour-role set |

`.button` is a real class: `button, .button` in `_07_interactions.sass` is one
selector list, so `<button class="button">` and a bare `<button>` are styled
identically. `.button` is `(0,1,0)`, so ink utilities like `.text-danger`
still win on it by source order. The registry files the whole button tree
under the bare element name `"button"`.

Class-attribute states (not `data-*`, but part of the same runtime surface):
`.app-shell.open` (left rail becomes a fixed drawer below 1025px),
`.accordion-item.open` (expands `.accordion-content`),
`.content-section.null|narrow-half|narrow-wide|narrow-full`,
`.hide-mobile`/`.hide-desktop`.

The presets runtime (`presets.svelte.ts`, `PresetControls.svelte`) writes these
attributes onto live markup. It never overwrites an attribute the markup
already declares. Because the axes are class-qualified, the sweep targets the
axis classes: `data-variant` → `.el-variants`, `data-shape` → `.el-shape`,
`data-size` → `.el-size`, `data-pad` → `.el-pad`. An element that carries none
of them is never touched.

---

## 4. C — class registry (summary)

481 concrete classes across the layers; the full inventory with properties,
kinds and examples is [`../REGISTRY.api.md`](../REGISTRY.api.md) (generated).

| Layer | Partial | Count | Contents |
|---|---|---|---|
| L0 | `_01_base.sass` | 2 | `.bdr` debug outline, `.mode-wipe` view-transition kill switch |
| L1 | `_02_dimensions.sass` | 156 | 17 space families × 8 steps (136), 6 radius channels, `.wfull`/`.hfull`/`.full`, `.minw0`/`.minh0`/`.min0`, `.h-sm`…`.h-2xl`, `.hfull-vh`, `.hfull-vh-fitted` |
| L2 | `_04_containers.sass` | 49 | `.box` + 9 alignment modifiers, `.row` + 9, `.grid` + 15, `.wrap`, `.grow`, `.shrink-0`, position set, `.z-sticky`/`.z-raised`/`.z-modal`/`.z-toast`, `.scroll-y`/`.scroll-x` |
| L3 | `_04_containers.sass` + `_05_layouts.sass` | 31 | `.grid-1`…`.grid-6` (divisor stepping), `.cspan-1`…`.cspan-8`, `.card-grid`, `.prose`, `.prose-left`, 7 `.frame-*` (from `$frame-ratios`), `.reel`, and the furniture partial: `.card`, `.chip`, `.nav-section`, `.page-header`, `.inputs-wrapper`, `.checkbox-wrapper` |
| L4 | `_06_shells.sass` | 17 | `.app-shell` (+`.open` drawer compound), `.app-header` (+`.clamped`), `.app-main` (+`.clamped`), `.main-section` (+`.solo`), `.sidebar-left`, `.sidebar-right`, `.app-footer`, `.content-section` (+`.null`/`.narrow-half`/`.narrow-wide`/`.narrow-full`), `.get` |
| L5 | `_03_typography.sass`, `_07_interactions.sass`, `_08_visuals.sass` | 141 | Typography scale/roles/modifiers, `.input`/`.select`, `button`/`.button`/`a.btn`/`a.button`, `.button-group`/`.split-button`, link family, accordion family, bare backgrounds (`.bg-main`, `.bg`, `.bg-surface`, `.bg-panel`, `.bg-sunken`, `.bg-raised`, `.bg-extra`), status fills, border set (`.border` + `-subtle`/`-strong`, per-side `.bt`/`.br`/`.bb`/`.bl` + `-str`/`-sub`), shadows, pop-colour inks, visibility |
| L6 | `_10_propped.sass` | 64 | The class-qualified attribute axes: `.el-variants`, `.el-shape`, `.el-size`, `.el-pad`, `.el-shadow`, `.el-shadow-hover`, `.el-vss` and their `data-*` variants |
| Custom | `_09_own.sass` | 21 | `.site-logomotif`, `.logotype`, `.project-circle`, the `.mascot`/`.mascotgl` families |

Every class entry in `registry.json` carries: `class`, `kind`
(`family`/`class`/`modifier`/`child`/`variant`/`compound`/`element`),
`layer`, `property` (declarations, with `@media` steps inline), `file`,
`description`, `example`.

---

## 5. Fonts

The library bundles no font files and declares no font token. `_01_base.sass`
assigns `font-family: var(--font-sans)` to `body, html`; the consumer supplies
`--font-sans` (and `--font-mono`, if they want one) plus their `@font-face`
rules. There is no `_00_fonts.sass` partial in the tree — the token is the
consumer's to define, in their own layer.

---

## 6. Token → defined-in → read-by index

| Token group | Defined in | Read by |
|---|---|---|
| `--shade-*` | `_00_config.sass` `:root` loop | (reserved elevation channel; `.shadow-*` classes read `--shadow-*` instead) |
| Colour roles (§2.1) | `_00_tokens.sass` mode mixins | L5 dress classes, interactions, body |
| `--font-sans` | user-supplied | `body`, `html` |
| `--text-*` | `_00_tokens.sass` `:root` | `.text-*`, `.text-body*`, semantic type roles, `.el-size[data-size]` |
| `--space-*`, `--unit-space` | `_00_tokens.sass` `:root` | all 17 L1 space families, `.el-pad[data-pad]` |
| `--radius-*` | `_00_tokens.sass` `:root` | `.radius-*`, `.chip`, `.el-shape[data-shape]` |
| `--height-*` | `_00_tokens.sass` `:root` | `.h-sm`…`.h-2xl`, `.el-size[data-size]`, `.el-vss[data-size]` |
| `--motion*`, `--speed*`, `--trans*` | `_00_tokens.sass` `:root` | every `transition:` in the system |
| `--header-height`, `--footer-height`, `--fit-height` | `_00_tokens.sass` `:root` | `.app-header`, `.app-main`, `.hfull-vh-fitted`, rails |
| `--prose-clamp`, `--content-clamp`, `--app-inline`, `--card-min` | `_00_tokens.sass` `:root` | `.prose`, `.app-header.clamped`, `.app-main.clamped`, shells, `.card-grid` |
| `--sidebar-width*`, `--z-*` | `_00_tokens.sass` `:root` | rails, `.app-header`, drawer |
| `--shadow-*`, `--shadow-color`, `--shadow-rim` | `_00_tokens.sass` mode mixins | `.shadow-*` classes, `.el-shadow[data-shadow]`, `--shade-*` composition |
| `--greenpop*`, `--orangepop*`, `--yellowpop*` | `_00_tokens.sass` `:root` | `.green1`…`.green4`, `.orange1`…`.orange6`, `.yellow1`…`.yellow4` |
| `--accent-orange`, `--accent-green`, `--bg-button`, `--bg-input`, `--shadow-umbra` | `_00_tokens.sass` mode mixins | *reserved — declared but not yet read by any class* |
---

## 7. Regeneration pipeline

| Script | Emits |
|---|---|
| `scripts/update-registry.ts` | `registry.json`, `skills/fractalstyler/references/fractals.md`, `skills/fractalstyler/references/tokens.md` |
| `scripts/class-vocab.ts` | `docs/REGISTRY.api.md` (reads `registry.json`) |
| `lint/browser.mts --out docs/browser.html` | `docs/browser.html` (searchable registry browser) |
| `scripts/build-css.ts` | `dist/css/fractalstyler.css` + `.min.css` (plain-CSS distribution) |
| `scripts/validate-deck.ts` | exit 0/1 — every class named in docs/components resolves against the compiled stylesheet |
| `lint/cli.mts` | exit 0/1 — token purity and contract lint |
| `svelte-package` (`pnpm build`) | `dist/` — `index.js`, `presets.svelte.js`, `ui/PresetControls.svelte`, styles partials |
| `cli/main.mts` (`fractalstyler` bin) | consumer scaffolds: `npx @fractaldesign/fractalstyler init\|eject\|lint` — track or eject the styles, place these docs into a project, wire the VS Code extension |
| `mcp/server.mts` (`fractalstyler-mcp` bin) | MCP server; reads `registry.json` and `data/recipes.json` from disk at start-up |
| `tsc -p tsconfig.runtime.json` (`pnpm build:runtime`) | the shipped JS next to each runtime source: `cli/*.mjs`, `lint/**/*.mjs`, `mcp/server.mjs`, `scripts/update-registry.js`, `scripts/class-vocab.js` |

Every script is TypeScript and runs directly on Node 24 (`node lint/cli.mts`).
The runtime the package ships — the three bins and the registry builder — runs
from `node_modules` on Node >=18, where Node does not strip types, so
`build:runtime` compiles it to plain JS beside the sources. Those emitted files
are gitignored and are what `files`, `bin` and `eject` point at.

`pnpm registry` runs the first two; `pnpm browser` regenerates the browser
page; `pnpm build` runs `registry` → `svelte-package` → `build-css` →
`build:runtime` → `publint`; `pnpm check` runs svelte-check, the runtime type
check, the validator and the contract linter. Consumers get the same registry
builder after `eject` as `scripts/build-registry.mjs` (plus the compiled
`update-registry.mjs` and `class-vocab.mjs` it runs).

Note: `validate-deck.ts` does **not** walk `mcp/`, `cli/`, `data/` or the
presets runtime. Those surfaces drift silently — re-audit them by hand, or add
them to the validator, when the class inventory changes.
