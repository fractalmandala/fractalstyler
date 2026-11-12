---
title: Colors and Themes
description: Explains how to set backgrounds, text colors, borders, light/dark themes etc.
id: 8
---

This document explains the `colors-themes.css` file, which defines the backgrounds, text colors, theme colors, shadows, and classes to use them.

Colour is a recipe of three numbers, declared on `:root` inside `@layer tokens` so a consumer's `custom.css` can still override it:

- `--hue` — the accent hue, and the faint tint of the neutrals
- `--chroma` — how vivid the accent is
- `--tint` — how much of the hue the neutrals carry

The default recipe, on `:root`, is `--hue: 38`, `--chroma: 0.2`, `--tint: 0.012`. Every role (`--bg`, `--theme-color`, `--ring`, and the rest) is an `oklch()` of those numbers. Light and dark stay on `data-mode`: set `data-mode="light"` or `data-mode="dark"` on `<html>` (or any ancestor) to switch the recipe's light or dark steps. Each mode block also sets `color-scheme` so native controls match. A named `data-theme` is only a preset of the three numbers; override the numbers anywhere to re-theme a subtree.

Hue 38 belongs only to the default (`:root`) and to `data-theme="fractalsvelte"`. The other named presets keep their own hues:

| `data-theme` | `--hue` | `--chroma` | `--tint` |
|:--|--:|--:|--:|
| *(default / `fractalsvelte`)* | 38 | 0.2 | 0.012 |
| `aurora` | 168 | 0.15 | 0.01 |
| `ocean` | 238 | 0.17 | 0.014 |
| `ember` | 42 | 0.19 | 0.01 |
| `rose` | 8 | 0.2 | 0.01 |
| `lime` | 128 | 0.2 | 0.008 |
| `amber` | 78 | 0.17 | 0.01 |
| `mono` | 268 | 0 | 0 |

Optional `data-radius`, `data-density` and `data-motion` axes rewrite the radius, space, height, type and spring ladders — they live in [Configurations](./01-configurations.md), not in this file.

Status colours (`--success`, `--warning`, `--danger`, `--info` and their ramps) keep stable hues in `oklch()` — they do not follow `--hue`. `--white-fixed` and `--black-fixed` are likewise fixed. `--ring` follows the accent (`oklch` of `--chroma` and `--hue`) so focus rings stay on-theme.

The core theme color tokens are:

- bg: the background token for the app/site as a whole.
- bg-surface: background intended for sidebars/headers/footers.
- bg-panel: a layer up from bg-surface, for cards and panels.
- bg-overlay: the opaque fill for anything that floats above the page: menus, popovers, dialogs, drawers, toasts.

These variables are the background surfaces; a soft whites/blacks set is recommended. To manage state changes:

- state-hover
- state-selected

Both are translucent tints (black in light mode, white in dark), so they work on top of any surface.

Interactions:

- bg-button
- bg-button-hover
- bg-button-active
- bg-button-secondary
- bg-button-secondary-hover
- bg-button-secondary-active
- bg-input

For borders, 3 variables are shipped:

- border
- border-subtle
- border-strong

For text:

- text-primary
- text-secondary
- text-muted
- text-inverse

Theme colors:

- theme-color
- theme-color-up
- theme-color-down

Black and White are fixed variables shipped in both light and dark mode:

- white-fixed
- black-fixed

Alerts and Info:

- success
- success-hover
- warning
- warning-hover
- danger
- danger-hover
- info
- info-hover

Each status, plus a `neutral` one, also has a five-step scale for softer surfaces: `--{status}-00` (the faint fill), `-25` (border), `-50` (base), `-75`, and `-100` (text that reads on the `-00` fill). In dark mode the scale reads the other way up, so `-00` is a deep tint and `-100` a light ink. The `.msg` classes in [Component Props](./11-component-props.md) are built from it:

```css
--info-00 --info-25 --info-50 --info-75 --info-100
--success-00 … --success-100
--warning-00 … --warning-100
--danger-00 … --danger-100
--neutral-00 … --neutral-100
```

Also declared per mode: `--ring` (the accent-tinted focus ring, an `oklch` of `--chroma` and `--hue`, consumed by the focus-visible outlines in [Borders, Elevation and Focus](./06-border-elevation-focus.md)), `--scrim` (the dimming wash behind overlays), and the `--shadow-*` elevation tokens, including `--shadow-rim`. See that doc for the class-level usage.

As with other variables, the backgrounds and text colors ship as classes using their own variables:

```css
.bg-main, .bg { background-color: var(--bg); }
.bg-surface { background-color: var(--bg-surface); }
.bg-panel { background-color: var(--bg-panel); }
.bg-overlay { background-color: var(--bg-overlay); }
.bg-none { background: transparent; }
.bg-black { background-color: var(--black-fixed); }
.state-hover { background-color: var(--state-hover); }
.state-selected { background-color: var(--state-selected); }
.bg-input { background-color: var(--bg-input); }
.bg-button { background-color: var(--bg-button); }
.bg-button-secondary { background-color: var(--bg-button-secondary); }

.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-muted { color: var(--text-muted); }
.text-inverse { color: var(--text-inverse); }
.text-white { color: var(--white-fixed); }
.text-black { color: var(--black-fixed); }
.text-theme { color: var(--theme-color); }
.text-theme-up { color: var(--theme-color-up); }
.text-theme-down { color: var(--theme-color-down); }
.text-success { color: var(--success); }
.text-warning { color: var(--warning); }
.text-danger { color: var(--danger); }
.text-info { color: var(--info); }

.bg-success { background-color: var(--success); transition: background var(--motionout2); }
.bg-success:hover { background-color: var(--success-hover); }
.bg-warning { background-color: var(--warning); transition: background var(--motionout2); }
.bg-warning:hover { background-color: var(--warning-hover); }
.bg-danger { background-color: var(--danger); transition: background var(--motionout2); }
.bg-danger:hover { background-color: var(--danger-hover); }
.bg-info { background-color: var(--info); transition: background var(--motionout2); }
.bg-info:hover { background-color: var(--info-hover); }
```

## Text on filled variants

The filled variants in [Component Props](./11-component-props.md) (`.primary`, `.secondary`, `.themed`, `.info`, `.success`, `.warning`, `.danger`) do not fix their text colour. Each computes it from its fill with relative colour syntax: white on a dark fill, near-black on a light one, so a theme only sets the fill. To force a colour instead, set the matching override token in the theme:

```css
[data-mode='light'] {
	--on-button: var(--white-fixed);
	--on-theme: var(--black-fixed);
}
```

The override tokens are `--on-button`, `--on-button-secondary`, `--on-theme`, `--on-info`, `--on-success`, `--on-warning` and `--on-danger`. None is set by default. `.ink-auto` (in [Components](./10-components.md)) does the same for any element, reading the fill from `--ink-bg`.

Components that use Fractalstyler do not ship colors for their text content, letting users use the text classes they want. And all components use these background variables.

## Colorpacks

`colorpacks.css` is the palette library: it ships no classes, only the raw
values a theme is built from. Six colour families with numeric steps —
`--fs-green20…90`, `--fs-blue10…95`, `--fs-orange30…85`, `--fs-red*`,
`--fs-teal*` — plus a neutral ramp (`--fs-neutral1…`), two surface ramps,
`--fs-surface-whitea…h` and `--fs-surface-blacka…h`, and status scales
`--fs-{success,warning,danger,info}-00…100` matching the theme's status scale.

Every token is a plain `oklch()` value in `:root`, so a theme picks from them
by name:

```css
:root {
	--theme-color: var(--fs-green50);
	--bg: var(--fs-surface-whitea1);
}
```

They are not part of the theme roles in `colors-themes.css` — the roles say
*what* a colour is for, the colorpacks say *which* values exist.