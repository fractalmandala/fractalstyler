---
title: Configurations
description: Explains the global configuration tokens (layout dimensions, z-index, fonts, motion channels and the theme axes) and the base resets in configurations.css.
id: 1
---

This document explains `configurations.css`, which sets the app-level configuration tokens everything else reads, plus a base reset layer. The spring easings themselves live in [Springs](./01b-springs.md); the radius and height ladders, and the header/footer heights, live in [Shapes and Sizes](./03-shapes-sizes.md).

## Tokens

Layout dimensions:

- `--prose-clamp` (65ch) - max-width for prose containers
- `--measure-xs` … `--measure-4xl` (14rem, 20rem, 28rem, 36rem, 48rem, 64rem, 80rem, 100rem) - the width ladder for panels, dialogs, popovers and the shell. `.measure-*` and `.max-h-*` in [Shapes and Sizes](./03-shapes-sizes.md) read them
- `--content-clamp` (`var(--measure-4xl)`, 100rem) - max-width for clamped headers/main areas
- `--content-aside` (7.5rem) - reserved right gutter on `.content-section.narrow-half` at large breakpoints
- `--app-inline` (`var(--space-lg)`) - inline padding for the app shell chrome
- `--card-min` (15rem) - min column width for `.card-grid`
- `--sidebar-width`, `--sidebar-width-left`, `--sidebar-width-right` (16rem each) - the left/right rails
- `--sidebar-width-collapsed` (3.5rem) - the icon-only rail width

`--header-height` (4rem), `--footer-height` (2rem) and `--fit-height` are declared in [Shapes and Sizes](./03-shapes-sizes.md), next to the height ladder they sit with.

Z-index scale:

- Semantic: `--z-sticky` (100), `--z-raised` (200), `--z-modal` (300), `--z-toast` (500)
- Numeric: `--z-100`, `--z-200`, … `--z-900`, `--z-999` — the same ladder in steps of 100, for one-off stacking that still routes through a token

Fonts:

- `--font-sans`, `--font-mono` - system font stacks applied to `body`/`html`

Motion and springs:

- `--spring` and `--spring-ms` — the current spring easing and settle time. They default to the snappy preset from [Springs](./01b-springs.md). `.spring-*` classes and `data-motion` re-point them
- `--motion-scale` (1) — durations multiply by it. `prefers-reduced-motion: reduce` and `data-motion="off"` set it to 0, which stops spring-timed motion
- `--stagger` (60ms) — delay step for staggered entrances, read as `calc(var(--i) * var(--stagger) * var(--motion-scale))`

Value channels, set by a control or by JavaScript, read by its parts (see [Component Props](./11-component-props.md) and [Layout Shell](./07-layout-shell.md)):

- `--value`, `--from` — unitless 0–1, for a slider, a progress bar or a range
- `--i` — a child's index, for stagger
- `--px`, `--py` — pointer position in CSS pixels, unitless, for `.at-pointer`
- `--ix`, `--iy`, `--iw`, `--ih` — the sliding `.indicator` box, in CSS pixels, unitless
- `--anchor` (default `--none`) and `--offset` (`var(--space-sm)`) — CSS anchor positioning for `.floating`
- `--scrim` — the dimming wash behind a `<dialog>` backdrop (the theme also sets this per mode in [Colors and Themes](./08-colors-themes.md))
- `--glass-blur` (1rem) and `--glass-alpha` (72%) — consumed by `.glass` in [Borders, Elevation and Focus](./06-border-elevation-focus.md)
- `--vt-name`, `--vt-x` (50vw), `--vt-y` (50vh), `--vt-r` (150vmax) — view-transition names and the reveal clip, see [Motion and Animation](./09-motion-animation.md)

## Registered properties

Motion channels are registered with `@property` and do not inherit, so a moving parent never leaks its offset into a moving child. JavaScript writes the numbers; `.motion` and `.tilt` in [Motion and Animation](./09-motion-animation.md) own the CSS properties that read them.

| Property | Initial | Read by |
|:--|:--|:--|
| `--mx`, `--my` | 0 | `.motion` translate, in CSS pixels |
| `--ms` | 1 | `.motion` scale |
| `--mr` | 0 | `.motion` rotate, in degrees |
| `--mo` | 1 | `.motion` opacity |
| `--rx`, `--ry` | 0 | `.tilt` perspective rotate, in degrees |
| `--angle` | 0deg | reserved angle channel |

## Theme axes

Light and dark stay on `data-mode`; named palettes stay on `data-theme` — see [Colors and Themes](./08-colors-themes.md). Three optional attributes rewrite the ladders. `:root[attr]` is used so they win regardless of source order; the unprefixed attribute selector still lets a subtree opt in.

**Radius** — `data-radius="sharp|soft|round"`:

- `soft` equals the current radius ladder (xs 2px, sm 3px, md 6px, bs 12px, lg 16px), so it does not silently rewrite corners versus the defaults
- `sharp` flattens xs/sm to 0 and md/bs/lg to 2px
- `round` steps the ladder in rem: 0.25 / 0.5 / 0.75 / 1.25 / 1.75

**Density** — `data-density="compact|cozy|comfortable"`:

- `cozy` is the default and has no rule, so it stays on the vanilla space, height and type ladders
- `compact` and `comfortable` rewrite `--space-*`, the full `--h-*` ladder, `--text-xs` / `--text-sm`, and scale `--text-md` … `--text-5xl` off the static type tokens (0.9 and 1.1 respectively)

**Motion** — `data-motion="off|calm|playful"`:

- `off` sets `--motion-scale: 0`
- `calm` points `--spring` / `--spring-ms` at the gentle preset
- `playful` points them at the bouncy preset

Do not invent further theme attributes.

## Base Resets

The file also sets the global baseline for pages:

- `box-sizing: border-box` and `min-width: 0` on everything
- `body, html` use `--font-sans` at `--text-bs`, zero margin/padding
- `:root` gets `interpolate-size: allow-keywords`, `scrollbar-gutter: stable`, `overflow-wrap: break-word` - so layout never shifts when a scrollbar appears, and heights can animate to/from `auto`
- `body` gets `min-height: 100svh`
- buttons/links get `touch-action: manipulation`; buttons get `user-select: none`
- `img, video, svg` become block-level, `max-width: 100%`, height auto
- form controls inherit font and color
- same text resets as typography.css (zero margins, text-wrap rules, link inherit, list-style none)

There is one debug class, `.bdr { border: 1px solid red; }`, for outline-debugging elements.
