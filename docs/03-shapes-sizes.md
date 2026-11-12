---
title: Shapes and Sizes
description: Describes the tokens and classes to use for quick shaping and sizing of elements, via border-radius, heights, widths.
id: 3
---

This document explains the `shapes-sizes.css` file, where Fractalstyler activates the following variables and their default values:

- `--radius-*` with step affixes from `xs` to `lg`, plus the additional `full` affix that sets a value of 999px, for the border-radius property. Examples - `--radius-sm`, `--radius-full`.
- `--h-*` with step affixes from `xs` to `3xl`, that set a value for the height property.

| Token | Value | Token | Value |
|:--|:--|:--|:--|
| `--radius-xs` | 2px | `--h-xs` | 12px |
| `--radius-sm` | 3px | `--h-sm` | 16px |
| `--radius-md` | 6px | `--h-md` | 20px |
| `--radius-bs` | 12px | `--h-bs` | 27px |
| `--radius-lg` | 16px | `--h-lg` | 32px |
| `--radius-full` | 999px | `--h-xl` | 40px |
| | | `--h-2xl` | 48px |
| | | `--h-3xl` | 64px |

In both cases, the token scales to a class of the same name, styling only that property. For example:

```css
.h-bs { height: var(--h-bs); }
.radius-full { border-radius: var(--radius-full); }
```

5 additional classes also set border-radius values, used as component props in Fractalsvelte UI and other component libraries:

```css
.rect { border-radius: 0 }
.mincurved { border-radius: var(--radius-sm); }
.modern { border-radius: var(--radius-md); }
.curved { border-radius: var(--radius-bs); }
.round { border-radius: var(--radius-full); }
```

These five names are defined only here — not again in `component-props.css`.

The `.h-*` classes set `height` only. A control that should grow past its size class with its content (a field of wrapping tags, say) adds `.hgrow`, which turns the size into a minimum height — see [Component Props](./11-component-props.md).

For granular tuning of border-radius beyond these steps, set the property directly in your own CSS rather than looking for per-pixel classes.

## Fitment

For quick and easy fitment of elements to full width and/or height, a few more classes are extended. These set values for 100% width and/or height, min-width/min-height to 0, or width/height to max-content:

```css
.wfull { width: 100%; }
.hfull { height: 100%; }
.wmax { width: max-content; }
.hmax { height: max-content; }
.full { width: 100%; height: 100%; }
.wmin0 { min-width: 0; }
.hmin0 { min-height: 0; }
.min0 { min-width: 0; min-height: 0; }
```

A typical app shell or site layout can have a central area with a header on top and footer at bottom. In such cases, we don't want to set a min-height of 100vh/dvh on the central area. Instead, we want the header + central area + footer to have fitment of 100vh/dvh. So:

```css
.hfull-dvh { min-height: 100dvh; }
.hfull-fitted { min-height: calc(100dvh - var(--header-height) - var(--footer-height)); }
```

For configurations that have only a header, set `--footer-height` to 0. For configurations without header and footer, set even `--header-height` to 0. This way the `hfull-fitted` class always fits perfectly.

`--header-height` (4rem), `--footer-height` (2rem) and `--fit-height` (`calc(var(--header-height) + var(--footer-height))`) are declared in this file, with the height ladder.

## Measure and max-height

The measure ladder is declared in [Configurations](./01-configurations.md): `--measure-xs` … `--measure-4xl` (14rem, 20rem, 28rem, 36rem, 48rem, 64rem, 80rem, 100rem). This file turns those tokens into width and max-height classes.

```css
.measure-xs { width: 100%; max-width: var(--measure-xs); }
/* … through .measure-4xl */
.max-h-xs { max-height: var(--measure-xs); }
/* … through .max-h-4xl */
```

`.measure-*` is a width that fills up to a readable limit — panels, dialogs, popovers, and the shell's narrow presets. `.max-h-*` is the same cap as a max-height, for scrolling regions.
