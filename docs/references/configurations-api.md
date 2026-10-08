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
> `_00_config.sass`, `_00_fonts.sass`, `_00_tokens.sass`, `_01_base.sass`,
> `_02_dimensions.sass`, `_03_typography.sass`, `_04_containers.sass`,
> `_05_layouts.sass`, `_06_shells.sass`, `_07_interactions.sass`,
> `_08_visuals.sass`, `_09_own.sass`, `index.sass`.
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
> | **C. Classes** (loop families + partial classes) | `.gap-md`, `.grid-4`, `button[data-variant="ghost"]` | Baked at compile time from A; themed at runtime by B |

---

## 1. A — Sass configuration (`_00_config.sass`)

The whole compile-time surface is seven variables. They are *not* `!default`
and have no `with (…)` override: they are the system's own config, edited in
place. Everything loop-generated (the entire L1 space ladder, the L3 frames,
the `--shade-*` elevation tokens) is expanded from them.

| Variable | Value | Consumed by | Effect of a change |
|---|---|---|---|
| `$steps` | `('xs' 'sm' 'md' 'bs' 'lg' 'xl' '2xl' '3xl')` — 8 steps | `_02_dimensions.sass` (gap/pad/mar loops), `scripts/update-registry.js` | Every space family is crossed with this list: a new step emits `.gap-…`/`.pad-…`/`.mar-…` rows for all 17 families — **only if** a matching `--space-<step>` token exists in `_00_tokens.sass`, else the emitted `var()` points at nothing |
| `$gap-families` | `(gap: gap, rgap: row-gap, cgap: column-gap)` — 3 families | `_02_dimensions.sass` | Key = class prefix, value = CSS property. Add `xgap: column-gap` and `.xgap-*` classes compile; remove a key and its classes cease to exist |
| `$pad-families` | `(pad: padding, px: padding-inline, py: padding-block, pt: padding-top, pr: padding-right, pb: padding-bottom, pl: padding-left)` — 7 families | `_02_dimensions.sass` | Same key→property contract. `px`/`py` are logical (inline/block, RTL-safe); named sides are physical |
| `$mar-families` | `(mar: margin, mx: margin-inline, my: margin-block, mt: margin-top, mr: margin-right, mb: margin-bottom, ml: margin-left)` — 7 families | `_02_dimensions.sass` | Same key→property contract. There are no negative-margin classes and no side-family aliases beyond these |
| `$frame-ratios` | `('16-9': '16 / 9', '9-16': '9 / 16', '4-3': '4 / 3', '3-4': '3 / 4', '3-2': '3 / 2', '2-3': '2 / 3', '1-1': '1 / 1')` — 7 ratios | `_05_layouts.sass` (`.frame-*` loop) | Key = class suffix, value = `aspect-ratio` literal. Add `'21-9': '21 / 9'` and `.frame-21-9` compiles |
| `$breakpoints` | `(md: 768px, bs: 1024px, lg: 1280px)` | `_06_shells.sass` (`$md`/`$bs`/`$lg` locals → rail visibility media queries) | Renaming or moving a key moves the rail seams. **Not** a complete seam inventory: `_05_layouts` and parts of `_06` hardcode `1025px`/`1281px`/`1441px`/`769px` literals; change both together |
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
| `--white-fixed` | `#FFFFFF` | `#FFFFFF` | `.text-white`, `button[data-variant="primary"|"soft"|"destructive"]`, `a.btn` |
| `--black-fixed` | `#171717` | `#171717` | `.text-black` |
| `--bg` | `#ffffff` | `#101010` | `.bg-main`, `button[data-variant="outline"]`, `a.btn[data-variant="outline"]` |
| `--bg-surface` | `#FBFBF9` | `#202021` | `.bg-surface`, `body`, `.app-header` |
| `--bg-panel` | `#FBFBF9` | `#1f1f20` | `.bg-panel`, `.card` |
| `--bg-sunken` | `#F7F6F0` | `#1f1f20` | `.bg-sunken` |
| `--bg-raised` | `#F4F4F5` | `#3a3a3a` | `.bg-raised`, `.fsx-accordion-trigger:hover` |
| `--bg-extra` | `rgb(247, 248, 249)` | `#111111` | `.bg-extra` |
| `--bg-input` | `#f8f9fa` | `#1c1c1d` | `.input`, `.select` |
| `--bg-button` | `#CED8D3` | `#171818` | reserved button fill channel |
| `--text-primary` | `#262627` | `#EDF2F7` | `.text-primary`, body, headings |
| `--text-secondary` | `#777777` | `#c7c7c7` | `.text-secondary` |
| `--text-muted` | `#a3a4a7` | `#7c7c7c` | `.text-muted`, `.breadcrumb-*`, `.inputs-wrapper label` |
| `--text-inverse` | `#ffffff` | `#7c7c7c` | `.text-inverse` — flips with mode by design |
| `--state-surface` | `#F2EFE9` | `#7c7c7c` | `button[data-variant="secondary"]`, `a.btn[data-variant="secondary"]` |
| `--state-hover` | `#ECE7DF` | `#4a4a4b` | `a.nav-link:hover`, `button[data-variant="secondary"|"outline"|"ghost"]:hover`, `button.icon:hover` |
| `--state-selected` | `#E4DFD5` | `#666668` | selected-state channel |
| `--border` | `#d8d8d8` | `#2f2f2f` | `.border`, `.bt`/`.br`/`.bb`/`.bl`, `.input`, `.select`, `.card`, `.fsx-accordion-item` |
| `--border-subtle` | `#eceaea` | `#1e1e1f` | `.border-subtle`, `.bt-sub`/… |
| `--border-strong` | `#cfcfcf` | `#7c7c7c` | `.border-strong`, `.bt-str`/…, `button[data-variant="secondary"]` |
| `--theme-color` | `#ff4400` | `#2F9E44` | `.link`, `.text-theme`, `button[data-variant="primary"]`, `a.btn[data-variant="primary"]`, focus rims |
| `--theme-color-alt` | `#be2f00` | `#36731d` | `.link:hover`, `.text-theme-alt`, `button[data-variant="primary"]:hover` |
| `--theme-color-sub` | `#feb18a` | *(undefined in dark — inherits)* | `.text-theme-sub`, `button[data-variant="soft"]` |
| `--success` / `--success-hover` | `#10B981` / `#059669` | `#34D399` / `#6EE7B7` | `.text-success`, `.bg-success` |
| `--warning` / `--warning-hover` | `#F59E0B` / `#D97706` | `#FBBF24` / `#FCD34D` | `.text-warning`, `.bg-warning` |
| `--danger` / `--danger-hover` | `#bf2a2a` / `#DC2626` | `#b21a1a` / `#FCA5A5` | `.text-danger`, `.bg-danger`, `button[data-variant="destructive"]` |
| `--info` / `--info-hover` | `#3B82F6` / `#2563EB` | `#60A5FA` / `#93C5FD` | `.text-info`, `.bg-info` |
| `--ring` | `rgba(0, 127, 78, 0.35)` | `rgba(16, 185, 129, 0.4)` | `.input`/`.select` focus, `.fsx-accordion-trigger` focus |
| `--shadow-color` | `15 13 42` | `0 0 0` | every `--shadow-*` channel (RGB triplet) |
| `--shadow-rim` | `transparent` | `inset 0 1px 0 rgba(255,255,255,0.09)` | prefixed onto `--shade-*` tokens |
| `--shadow-umbra` | *(undefined in light)* | `rgb(0 0 0 / 0.50)` | dark-only umbra channel |
| `--shadow-xs` … `--shadow-3xl` | two-layer key+ambient, identical values in both mixins | same | `.shadow-xs` … `.shadow-3xl` |

### 2.2 Mode-independent `:root` tokens

| Group | Tokens | Notes |
|---|---|---|
| Fonts | Default assigns `font-family: var(--font-sans)` to `body, html`. | `_00_fonts.sass` ships blank for users to declare their own `@font-face` fonts and assign `--font-sans` / `--font-mono`. |
| Type scale | `--text-scaling: 1.25`; `--text-xs` `0.67rem`, `--text-sm` `0.75rem`, `--text-md` `0.875rem`, `--text-bs` `1rem`; `--text-lg`+ each `calc(previous * var(--text-scaling))` up to `--text-5xl` | Fixed rem rungs to base, then compounded — not fluid interpolation |
| Space scale | `--unit-space: 0.25rem`; `--space-xs` = unit, `sm` ×2, `md` ×3, `bs` ×4, `lg` ×6, `xl` ×8, `2xl` ×12, `3xl` ×16 | The rung set must mirror `$steps` — see §1 |
| Radius | `--radius-xs: 2px`, `sm: 4px`, `md: 8px`, `bs: 16px`, `lg: 32px`, `full: 9999px` | Six channels; no literal-radius ladder exists |
| Control metrics | `--control-h-sm: 21px`, `--control-h-bs: 32px`, `--control-h-lg: 38px`; `--height-sm: 16px`, `md: 20px`, `bs: 27px`, `lg: 32px` | `.h-*` classes read `--height-*`; `.input`/`.select`/`button`/`a.btn` read `--height-*` |
| Avatar / switch | `--avatar-size: 32px`, `--switch-w: 40px`, `--switch-h: 22px`, `--switch-thumb: 16px` | Load-bearing pairings documented in the source |
| Motion | `--transin1..3`, `--transout1..3` (cubic-beziers); `--speed0: 50ms`, `--speed1: 90ms`, `--speed2: 140ms`, `--speed3: 220ms`; `--motionin1..3`/`--motionout1..3` = duration + easing | Every `transition:` in the system reads these |
| Page chrome | `--header-height: 64px`, `--footer-height: 32px`, `--fit-height` (their sum), `--prose-clamp: 65ch`, `--content-clamp: 1600px`, `--app-inline: var(--space-lg)`, `--card-min: 240px`, `--sidebar-width`/`-left`/`-right: 280px`, `--z-sticky: 100`, `--z-raised: 200`, `--z-modal: 300`, `--z-toast: 500` | Shell geometry the L4 classes read |
| Pop colors | `--greenpop1..4`, `--orangepop1..6` | Named accent literals; `.orange1`…`.orange6` ink classes read the orange set |
| Elevation (from `_00_config.sass`) | `--shade-xs` … `--shade-3xl` | Loop-generated from `$shadow-specs` — rim + key layer + ambient layer |

---

## 3. B — `data-*` attribute API

| Attribute | Where | Values | Effect |
|---|---|---|---|
| `data-mode` | `<html>` (mandatory) | `light` \| `dark` | Applies `=light-theme-tokens` / `=dark-theme-tokens` — the entire colour-role set |
| `data-shape` | `.card`, `button`, `a.btn`, `.input`, `.select`, `.fsx-accordion-item` | `square` \| `modern` \| `curved` \| `round` | Corner treatment: `0` / `--radius-sm` / `--radius-md` / `--radius-full` |
| `data-variant` | `.card`, `button`, `a.btn`, `.input`, `.select`, `.fsx-accordion-item` | `primary` \| `secondary` \| `soft` \| `outline` \| `ghost` \| `link` \| `destructive` (button also: `icon`, `iconbox`, `icon-sm`, `icon-md`, `icon-bs`, `icon-lg`) | Visual paint & icon variant |
| `data-size` | `.card`, `button`, `a.btn`, `.input`, `.select`, `.fsx-accordion-item` | `sm` \| `md` \| `bs` \| `lg` | Metrics variant: height + font-size channels |

Class-attribute states (not `data-*`, but part of the same runtime surface):
`.app-shell.open` (left rail becomes a fixed drawer below 1025px),
`.fsx-accordion-item.open` (expands `.fsx-accordion-content`),
`.content-section.null|narrow-half|narrow-wide|narrow-full`,
`.hide-mobile`/`.hide-desktop`.

---

## 4. C — class registry (summary)

482 concrete classes across the layers; the full inventory with properties,
kinds and examples is [`../REGISTRY.api.md`](../REGISTRY.api.md) (generated).

| Layer | Partial | Count | Contents |
|---|---|---|---|
| L0 | `_01_base.sass` | 2 | `.bdr` debug outline, `.mode-wipe` view-transition kill switch |
| L1 | `_02_dimensions.sass` | 154 | 17 space families × 8 steps (136), 6 radius channels, `.wfull`/`.hfull`/`.full`, `.minw0`/`.minh0`/`.min0`, `.h-sm`…`.h-lg`, `.hfull-vh`, `.hfull-vh-fitted` |
| L2 | `_04_containers.sass` | 65 | `.box` + 10 alignment modifiers, `.row` + 9, `.grid` + 16, `.wrap`, `.grow`, `.shrink-0`, position set, `.scroll-y`/`.scroll-x`, `.card` (+`data-variant`/`data-shape`/`data-size`), `.chip`, `.prose-section`, `.nav-section`, `.page-header`, `.inputs-wrapper`, `.checkbox-wrapper` |
| L3 | `_05_layouts.sass` | 23 | `.grid-1/2/3/4/6` (divisor stepping), `.cspan-1`…`.cspan-8`, `.card-grid`, `.prose`, 7 `.frame-*` (from `$frame-ratios`), `.reel` |
| L4 | `_06_shells.sass` | 16 | `.app-shell` (+`.open` drawer compound), `.app-header` (+`.clamped`), `.app-main` (+`.clamped`), `.main-section`, `.sidebar-left`, `.sidebar-right`, `.app-footer`, `.content-section` (+`.null`/`.narrow-half`/`.narrow-wide`/`.narrow-full`) |
| L5 | `_03_typography.sass`, `_07_interactions.sass`, `_08_visuals.sass` | 181 | Typography scale/roles/modifiers, `.input`/`.select`, `button`/`a.btn` (+`data-variant`/`data-shape`/`data-size`/icon variants), link family, bare backgrounds (`.bg-main`, `.bg-surface`, `.bg-panel`, `.bg-sunken`, `.bg-raised`, `.bg-extra`), ink, status fills, border set, shadows, visibility |
| Custom | `_09_own.sass` | 41 | `.site-logomotif`, `.logotype`, `.project-circle`, the `.mascot`/`.mascotgl` families, `.hero-name`, `.fsx-accordion` family (+`data-variant`/`data-shape`/`data-size`) |

Every class entry in `registry.json` carries: `class`, `kind`
(`family`/`class`/`modifier`/`child`/`variant`/`compound`/`element`),
`layer`, `property` (declarations, with `@media` steps inline), `file`,
`description`, `example`.

---

## 5. Fonts (`_00_fonts.sass`)

The library no longer bundles or imports external font files. It ships a blank `_00_fonts.sass` file for the user/consumer project to declare their custom `@font-face` rules and define `--font-sans` / `--font-mono`. `_01_base.sass` applies `font-family: var(--font-sans)` to `body, html`.

---

## 6. Token → defined-in → read-by index

| Token group | Defined in | Read by |
|---|---|---|
| `--shade-*` | `_00_config.sass` `:root` loop | (reserved elevation channel; `.shadow-*` classes read `--shadow-*` instead) |
| Colour roles (§2.1) | `_00_tokens.sass` mode mixins | L5 dress classes, interactions, body |
| `--font-sans` | user-supplied (`_00_fonts.sass`) | `body`, `html` |
| `--text-*` | `_00_tokens.sass` `:root` | `.text-*`, `.text-body*`, semantic type roles |
| `--space-*`, `--unit-space` | `_00_tokens.sass` `:root` | all 17 L1 space families |
| `--radius-*` | `_00_tokens.sass` `:root` | `.radius-*`, `.chip`, `.input`, `.select`, `.card`, `button[data-shape]`, `a.btn`, `a.nav-link` |
| `--height-*`, `--control-h-*` | `_00_tokens.sass` `:root` | `.h-*`, `.input`/`.select`, `button`, `a.btn`, `.fsx-accordion-trigger` |
| `--motion*`, `--speed*`, `--trans*` | `_00_tokens.sass` `:root` | every `transition:` in the system |
| `--header-height`, `--footer-height`, `--fit-height` | `_00_tokens.sass` `:root` | `.app-header`, `.app-main`, `.hfull-vh-fitted`, rails |
| `--prose-clamp`, `--content-clamp`, `--app-inline`, `--card-min` | `_00_tokens.sass` `:root` | `.prose`, `.app-header.clamped`, `.app-main.clamped`, shells, `.card-grid` |
| `--sidebar-width*`, `--z-*` | `_00_tokens.sass` `:root` | rails, `.app-header`, drawer |
| `--shadow-*`, `--shadow-color`, `--shadow-rim` | `_00_tokens.sass` mode mixins | `.shadow-*` classes, `--shade-*` composition |
| `--greenpop*`, `--orangepop*` | `_00_tokens.sass` `:root` | `.orange1`…`.orange6` (green set reserved) |
---

## 7. Regeneration pipeline

| Script | Emits |
|---|---|
| `scripts/update-registry.js` | `registry.json`, `skills/fractalstyler/references/fractals.md`, `skills/fractalstyler/references/tokens.md` |
| `scripts/class-vocab.js` | `docs/REGISTRY.api.md` (reads `registry.json`) |
| `lint/browser.mjs --out docs/browser.html` | `docs/browser.html` (searchable registry browser) |
| `scripts/build-css.js` | `dist/css/fractalstyler.css` + `.min.css` (plain-CSS distribution) |
| `scripts/validate-deck.js` | exit 0/1 — every class named in docs/components resolves against the compiled stylesheet |
| `lint/cli.mjs` | exit 0/1 — token purity and contract lint |
| `cli/main.mjs` (`fractalstyler` bin) | consumer scaffolds: `npx @fractaldesign/fractalstyler init\|eject\|lint` — track or eject the styles, place these docs into a project, wire the VS Code extension |

`pnpm registry` runs the first two; `pnpm browser` regenerates the browser
page; `pnpm check` runs the validator and the contract linter. Consumers get
the same registry builder after `eject` as `scripts/build-registry.mjs`.
