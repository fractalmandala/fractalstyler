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
| `--radius-xs` | 3px | `--h-xs` | 12px |
| `--radius-sm` | 5px | `--h-sm` | 16px |
| `--radius-md` | 12px | `--h-md` | 20px |
| `--radius-bs` | 16px | `--h-bs` | 24px |
| `--radius-lg` | 24px | `--h-lg` | 32px |
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
.mincurved { border-radius: var(--radius-xs); }
.modern { border-radius: var(--radius-sm); }
.curved { border-radius: var(--radius-md); }
.round { border-radius: var(--radius-full); }
```

Note that `component-props.css` ships a parallel set with the shorter name `.min` instead of `.mincurved` — check [Component Props](./11-component-props.md) when working inside components.

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

For configurations that have only a header, set `--footer-height` to 0. For configurations without header and footer, set even `--header-height` to 0. This way the `hfull-fitted` class always fits perfectly. Both tokens ship with default values in [Configurations](./01-configurations.md).
