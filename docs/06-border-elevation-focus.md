---
title: Borders, Elevation and Focus
description: Explains the classes for setting borders around elements, box-shadow elevation, and focus-visible rings.
id: 6
---

This documentation details the border, shadow and focus classes defined in `border-elevation-focus.css`. The `--border-*` color tokens and the `--shadow-*` values they consume are defined per color mode in [Colors and Themes](./08-colors-themes.md).

For borders, a 4 x 5 class system with the axes:

1. border, border-strong, border-subtle - color tokens from `colors-themes.css` - plus a dashed set
2. 5 classes each, to set either a complete border, or 1 of the 4 sides.

The scheme is:

- `.border`, `.bl`, `.bt`, `.br`, `.bb`
- `.border-subtle`, `.bl-sub`, `.bt-sub`, `.br-sub`, `.bb-sub`
- `.border-strong`, `.bl-str`, `.bt-str`, `.br-str`, `.bb-str`
- `.border-dashed`, `.bl-dash`, `.bt-dash`, `.br-dash`, `.bb-dash`

All are 1px. The solid sets vary only the color token; the dashed set is `1px dashed var(--border)`. `.border-none` removes a border.

## Elevation

Box-shadow is defined by the `--shadow-*` variables with steps from `xs` to `3xl`, in light and dark pairs. For use in classes, shadow is shortened to make the classes `.shad-*` from `xs` to `3xl`:

```css
.shad-none { box-shadow: none; }
.shad-xs { box-shadow: var(--shadow-xs); }
/* ... */
.shad-3xl { box-shadow: var(--shadow-3xl); }
```

The `.shad-hover-*` classes are for use when we want shadow to lower on hover. `.shad-hover-xs` drops to no shadow on hover; every other `.shad-hover-*` class steps down to `box-shadow: var(--shadow-xs)` on hover. For example, use `.shad-hover-bs` for a `box-shadow: var(--shadow-bs)` that goes to `box-shadow: var(--shadow-xs)` on hover.

There is also a `--shadow-rim` token per mode (an inset highlight on the top edge) — currently token-only, no class consumes it. Use it directly: `box-shadow: var(--shadow-rim);`.

## Focus

The focus-visible ring classes, so everything drawn *around* an element — borders, shadows, focus rings — lives in one file:

```css
.focus-ring:focus-visible { outline: 2px solid var(--ring); outline-offset: 1px; }
.focus-theme:focus-visible { outline: 2px solid var(--theme-color); outline-offset: 2px; }
.focus-none:focus, .focus-none:focus-visible { outline: none; }
```

- `.focus-ring` - the default ring, using the per-mode `--ring` token (same look as native buttons and inputs get in [Components](./10-components.md))
- `.focus-theme` - theme-colored ring with a 2px offset (used by checkboxes, switches and card-clickable in `components.css`)
- `.focus-none` - removes focus outlines entirely; use only when a custom focus style is provided another way

Components wire their own focus rings; these classes are for your own interactive elements.
