---
title: Configurations
description: How the styling system is configured — the Sass source variables, the token mixins, and the loop-generated class families, file by file, with edit recipes and pitfalls.
type: fractalstyler
---

# Configurations — how `src/lib/styles` is wired

> Companion to [`configurations-api.md`](configurations-api.md) (the *what* —
> every variable, token, attribute and class, verbatim).
> This document is the *why* and *how to edit*: what each partial owns, what
> each `$` variable in `_00_config.sass` drives, and what you must touch
> together when you change one of them.

## Golden rule for this whole document

**The `.sass` partials are the configuration.** There is no settings file, no
preset registry, no theme JSON — a "config change" is an edit to
`_00_config.sass` (loops and maps), `_00_tokens.sass` (tokens and mode
mixins), or a layer partial (classes), followed by regeneration:

```bash
pnpm registry    # update-registry.js + class-vocab.js → registry.json, REGISTRY.md, docs, skill refs
pnpm lint        # token purity + contract lint
pnpm check       # validate-deck.js + svelte-check
```

Never edit the generated surfaces (`registry.json`, `REGISTRY.md`,
`docs/REGISTRY.api.md`, `docs/browser.html`, `dist/css/*`,
`skills/fractal-styler/references/*.md`) — they are overwritten on the next
run, by design.

## Overview

### Three moving parts

1. **`_00_config.sass`** — Sass variables (`$steps`, the family maps,
   `$frame-ratios`, `$breakpoints`, `$shadow-specs`). The loop half of the
   class system is *generated* from these.
2. **`_00_tokens.sass`** — CSS custom properties: two colour-mode mixins
   (`=light-theme-tokens` / `=dark-theme-tokens`, applied by
   `[data-mode='light']` / `[data-mode='dark']`) plus one mode-independent
   `:root` block (type, space, radius, motion, control metrics, page chrome).
3. **The layer partials** (`_01`…`_09`) — hand-authored classes. Every class
   rides a token; literals exist only where a token cannot (1px hairlines,
   aspect ratios, breakpoint px).

`index.sass` composes them in cascade order: config and tokens first, then
`_01`…`_09`. `colorpacks.sass` and `themeplates.sass` are raw Sass colour
palettes consumed by hand-picked tokens; they emit no classes and no tokens
and are never part of the class API.

### Where to look while reading this doc

| Task | File to open |
|---|---|
| Change what the loops generate (steps, families, frames, shadow specs) | `_00_config.sass` |
| Change colours, add a colour role, dark mode | `_00_tokens.sass` |
| Add a font face | `_00_fonts.sass` |
| Add a spacing/radius/size utility | `_02_dimensions.sass` |
| Add type roles/modifiers | `_03_typography.sass` |
| Add a container or alignment rule | `_04_containers.sass` |
| Add a grid/layout/frame/reel rule | `_05_layouts.sass` |
| Add shell scaffolding | `_06_shells.sass` |
| Add inputs/links/buttons | `_07_interactions.sass` |
| Add backgrounds/ink/borders/shadows/visibility | `_08_visuals.sass` |
| Project-specific extensions | `_09_own.sass` |

---

## 1. `_00_config.sass` — the loop generator

### 1.1. `$steps` — the step vocabulary

`('xs' 'sm' 'md' 'bs' 'lg' 'xl' '2xl' '3xl')` — eight steps. Every space
family (gap, pad, mar and their sides) is crossed with this list by the
`@each` loops in `_02_dimensions.sass`, so the entire L1 ladder is
`17 families × 8 steps = 136 classes`.

Editing it is a **two-file change**: a step without a matching
`--space-<step>` token in `_00_tokens.sass` compiles, but every class for it
points at an undefined `var()` — the declaration is dropped silently at
computed-value time. A token without the step is dead weight (no classes).
Change both, then run `pnpm registry`.

### 1.2. The family maps — `$gap-families`, `$pad-families`, `$mar-families`

Each map is `class prefix → CSS property`:

```sass
$gap-families: (gap: gap, rgap: row-gap, cgap: column-gap)
$pad-families: (pad: padding, px: padding-inline, py: padding-block, pt: padding-top, pr: padding-right, pb: padding-bottom, pl: padding-left)
$mar-families: (mar: margin, mx: margin-inline, my: margin-block, mt: margin-top, mr: margin-right, mb: margin-bottom, ml: margin-left)
```

`_02_dimensions.sass` does nothing but loop these maps over `$steps`. The
`px`/`py`/`mx`/`my` keys are logical (inline/block — RTL-safe); the named
sides (`pt`, `ml`, …) are physical. To add a family: add the map entry, and
the classes compile on the next build — no other edit needed. To retire one:
delete the entry and every class it generated disappears from the compiled
CSS (grep your markup first).

Note the naming drift this system retired: `.pad-x-*`/`.marg-*`/`.square-*`
literal ladders and `-mob`/`-desk` responsive bands **do not exist** — the
current families are the ones above, in one base band, all token-routed.

### 1.3. `$frame-ratios` — aspect-ratio media boxes

`('16-9': '16 / 9', …)` — key becomes the `.frame-<key>` suffix, value the
`aspect-ratio` literal. `_05_layouts.sass` loops it: each `.frame-*` gets
`aspect-ratio`, `overflow: hidden`, `position: relative`, and
`img, video, iframe, svg` fill-and-cover rules. Add a ratio, get a class;
that is the whole mechanism.

### 1.4. `$breakpoints` — the named seams

`(md: 768px, bs: 1024px, lg: 1280px)`. Consumed via `map.get` by
`_06_shells.sass` for the rail visibility seams. **This is not the complete
seam inventory**: `_05_layouts.sass` (grid stepping) and the `narrow-*`
widths in `_06_shells.sass` hardcode `769px`/`1025px`/`1281px`/`1441px`
literals. If you move a seam, move both the map entry and the literals —
grep `min-width` / `max-width` across the partials before assuming the map
is the only place a seam lives.

### 1.5. `$shadow-specs` — the elevation ladder

Eight steps of `(y1, b1, a1, y2, b2, a2)` pairs. The `:root` loop at the
bottom of `_00_config.sass` composes each into a `--shade-<step>` token:
`var(--shadow-rim)` + a tight key layer + a wide ambient layer. The header
comment table (key alpha, ambient alpha, key blur, ambient blur per step) is
the design intent — keep it in sync with the numbers.

The `.shadow-*` **classes** do not read these — they read the
`--shadow-<step>` channel tokens defined in the mode mixins of
`_00_tokens.sass`. Two ladders, two jobs: `--shade-*` is the composed
rim+key+ambient recipe, `--shadow-*` is the plain channel the utilities
apply.

---

## 2. `_00_tokens.sass` — the token contract

### 2.1. Colour modes are mixins, and `data-mode` is mandatory

```sass
=light-theme-tokens
	--bg: #ffffff
	…
=dark-theme-tokens
	--bg: #101010
	…

[data-mode='dark']
	+dark-theme-tokens
[data-mode='light']
	+light-theme-tokens
```

The colour roles live **only** inside these mixins. Unlike the old system
there is no marker-free light default: a page without a `data-mode`
attribute on `<html>` has no colour tokens defined at all. Whatever renders
the page (Svelte layout, static template) must stamp
`data-mode="light"` or `data-mode="dark"`.

### 2.2. The mode-independent `:root` block

Everything else: `--font-sans` and the timeless stacks, `--text-scaling` plus
the type rungs, `--unit-space` plus the space rungs, the six `--radius-*`
channels, control/avatar/switch metrics, the motion language
(`--speed*`, `--trans*`, `--motion*`), page chrome (`--header-height`,
`--footer-height`, `--fit-height`, `--prose-clamp`, `--content-clamp`,
`--app-inline`, `--card-min`, `--sidebar-width*`, `--z-*`), control heights
and the pop colors.

Known gap, kept honest: `.mono` reads `--font-mono`, which no partial defines
yet — it falls back to the browser mono stack until a mono face lands in
`_00_fonts.sass` and a `--font-mono` token is added here.

### 2.3. Editing rules

- **Add a colour role**: add it to *both* mixins (or deliberately to one —
  see `--theme-color-sub`, light-only, and `--shadow-umbra`, dark-only — and
  say so in a comment).
- **Add a step token**: mirror `$steps` (see §1.1).
- **Never** hardcode a hex or pixel in a layer partial that a token covers —
  the lint (`lint/cli.mjs`) enforces token purity.

---

## 3. The layer partials (`_01`–`_09`) — what each owns

| Partial | Layer | Owns | Conventions to keep |
|---|---|---|---|
| `_01_base.sass` | L0 | Element resets, view-transition defaults, `.bdr` | No classes beyond the debug outline and `.mode-wipe` |
| `_02_dimensions.sass` | L1 | The three `@each` family loops, radius channels, full/zero sizing, `.h-*` control heights, viewport heights | Classes here are generated or one-liners; no component logic |
| `_03_typography.sass` | L5 | `.text-*` primitives, semantic roles (`.page-title`, `.nav-link`…), `.lh*`, `.ls-*`, `.weight-*`, `.tt-*`, `.ta-*` (+`.mleft`), `.mono`, `.sans`, `.truncate` | Roles compose tokens; `.mleft` is the only media-query modifier |
| `_04_containers.sass` | L2 | `.box`/`.row`/`.grid` + nested alignment modifiers, `.wrap`, `.grow`, `.shrink-0`, positions, `.scroll-y`/`.scroll-x`, `.card`, `.chip`, section wrappers | Alignment modifiers **nest under their base** — never standalone; x* is always the horizontal/inline axis, y* the vertical/block axis |
| `_05_layouts.sass` | L3 | `.grid-1/2/3/4/6` (divisor stepping), `.cspan-*`, `.card-grid`, `.prose`, `.frame-*` loop, `.reel` | Grids are pure stepping — no default gap; compose `.gap-*`. The reel's `> *` is the system's one sanctioned child combinator (matched literally in `scripts/validate-deck.js`) |
| `_06_shells.sass` | L4 | `.app-shell` canon, header/main/footer, role-bound rails, `.content-section` widths | Rails are display:none below their seam and resurrected by media queries — left rail becomes an off-canvas drawer via `.app-shell.open` below 1025px |
| `_07_interactions.sass` | L5 | `.input`/`.select`, the link family, the `button` element base + its `data-variant`/`data-shape`/`data-size` axes, `a.primary`/`a.outline` | Buttons are styled via the bare `button` element plus attributes — there is no `.button` class |
| `_08_visuals.sass` | L5 | Bare backgrounds, ink, status fills, the partition-law border set, `.shadow-*`, `.hide-mobile`/`.hide-desktop`, `.orange1`–`.orange6` | Bare dress before compositions; components own their own hover states — there is no standalone `.hover`/`.transition` |
| `_09_own.sass` | Custom | The mascot families, `.hero-name`, the accordion, logotype bits | The sanctioned escape hatch; anything project-specific that cannot be expressed canonically |

---

## 4. Quick-edit cookbook

**Add a spacing step** (e.g. a hypothetical `4xl`):
1. `$steps` in `_00_config.sass` → append `'4xl'`.
2. `--space-4xl` in `_00_tokens.sass` `:root` → define the value.
3. `pnpm registry` — 17 new classes appear per family map.

**Add a space family** (e.g. `.igap-*` for inline gaps):
1. Add `igap: column-gap` to the right family map in `_00_config.sass`.
2. Nothing else — the loop and the registry pick it up.

**Add a frame ratio**:
1. Add `'21-9': '21 / 9'` to `$frame-ratios`.
2. `pnpm registry` — `.frame-21-9` compiles and is indexed.

**Move a breakpoint seam**:
1. Edit `$breakpoints` in `_00_config.sass`.
2. Grep `min-width|max-width` in `_05_layouts.sass` and `_06_shells.sass` for
   hardcoded literals (769/1025/1281/1441) and move them together.

**Add a colour role**:
1. Add the token to `=light-theme-tokens` **and** `=dark-theme-tokens` in
   `_00_tokens.sass`.
2. If it needs a class: bare one-liner in `_08_visuals.sass`
   (`.text-<role>` / `.bg-<role>`), following the existing rows.

**Add any other class**:
1. Put it in the partial that owns its layer (see §3) — never invent a new
   partial without approval.
2. Document it with a trailing `// …` on the selector line — that comment is
   what `scripts/update-registry.js` lifts into the registry description.
3. `pnpm registry && pnpm lint && pnpm check`.

---

## 5. Pitfalls that have bitten before

- **A `$steps` entry without its token** compiles clean and silently emits
  classes that do nothing (undefined `var()`). Always change both files.
- **Editing generated files** (`registry.json`, `REGISTRY.md`,
  `docs/REGISTRY.api.md`) — overwritten on the next `pnpm registry`.
- **Assuming `$breakpoints` is the whole seam story** — the grid and
  narrow-width literals live outside the map.
- **Expecting a marker-free light mode** — colour tokens only exist under a
  `data-mode` attribute; no attribute means no colours.
- **Naming drift**: `.pad-x-*`, `.marg-*`, `.square-*`, `.radius-0`,
  `-mob`/`-desk` bands and negative-margin classes are gone. The living
  vocabulary is `.pad`/`.px`/`.py`/`.pt`/`.pr`/`.pb`/`.pl`,
  `.mar`/`.mx`/`.my`/`.mt`/`.mr`/`.mb`/`.ml`, the six radius channels — all
  across the eight steps.
- **A child combinator** (`> *`) anywhere but the reel trips
  `scripts/validate-deck.js`. That guard is deliberate; a second exception
  should be a conscious edit there.
