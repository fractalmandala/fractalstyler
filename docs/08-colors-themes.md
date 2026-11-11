---
title: Colors and Themes
description: Explains how to set backgrounds, text colors, borders, light/dark themes etc.
id: 8
---

This document explains the `colors-themes.css` file, which defines the backgrounds, text colors, theme colors, shadows, and classes to use them. Fractalstyler ships with a default light and dark theme, selected via the `data-mode` attribute: all tokens are defined in `@layer tokens` under `[data-mode='light']` and `[data-mode='dark']`, each also setting `color-scheme` so native controls match. Set `data-mode="light"` or `data-mode="dark"` on `<html>` (or any ancestor) to switch the entire theme.

The core theme color tokens are:

- bg: the background token for the app/site as a whole.
- bg-surface: background intended for sidebars/headers/footers.
- bg-panel: background intended for popovers, dialogs, etc.

These 3 variables are intended to be the background surface, a soft whites/blacks set is recommended. To manage state changes:

- state-hover
- state-selected

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

Two more tokens live here: `--ring` (focus ring color, consumed by the focus-visible outlines in [Borders, Elevation and Focus](./06-border-elevation-focus.md)) and the `--shadow-*` elevation tokens, including `--shadow-rim`. See that doc for the class-level usage.

As with other variables, the backgrounds and text colors ship as classes using their own variables:

```css
.bg-main, .bg { background-color: var(--bg); }
.bg-surface { background-color: var(--bg-surface); }
.bg-panel { background-color: var(--bg-panel); }
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

Components that use Fractalstyler do not ship colors for their text content, letting users use the text classes they want. And all components use these background variables.

## Colorpacks

`colorpacks.css` is the palette library: it ships no classes, only the raw
values a theme is built from. Six colour families with numeric steps —
`--fs-green20…90`, `--fs-blue10…95`, `--fs-orange30…85`, `--fs-red*`,
`--fs-teal*` — plus a neutral ramp (`--fs-neutral1…`) and two surface ramps,
`--fs-surface-whitea…h` and `--fs-surface-blacka…h`.

Every token is a plain `oklch()` value in `:root`, so a theme picks from them
by name:

```css
:root {
	--theme-color: var(--fs-green50);
	--bg: var(--fs-surface-whitea);
}
```

They are not part of the theme roles in `colors-themes.css` — the roles say
*what* a colour is for, the colorpacks say *which* values exist.