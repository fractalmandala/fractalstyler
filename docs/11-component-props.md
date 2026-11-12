---
title: Component Props
description: Explains the component variant classes in component-props.css - button colors, shape names, and control heights.
id: 11
---

This document explains `component-props.css`, which holds the variant/prop classes consumed by Fractalsvelte UI components. They are generic classes - you can apply them to any element - but they exist to pair with component props.

## Button variants

```css
.primary   /* bg-button fill and border; hover/selected use bg-button-hover/active */
.secondary /* the same pattern with bg-button-secondary-* */
.themed    /* theme-color fill; hover and selected use --theme-color-down */
.outline   /* transparent, text-primary, border-strong; hover goes theme colored */
.ghost     /* transparent with a transparent 1px border; hover/selected use state-hover/state-selected */
.link      /* a theme-colored text link, underlined on hover */
```

Status variants, each a solid fill of its status color:

```css
.info
.success
.warning
.danger  /* hover darkens to danger-hover */
```

### Text on the fill

The filled variants pick their text colour from their fill: white on a dark fill, near-black on a light one, using relative colour syntax. A theme that wants a fixed colour sets the variant's override token: `--on-button`, `--on-button-secondary`, `--on-theme`, `--on-info`, `--on-success`, `--on-warning` or `--on-danger` (see [Colors and Themes](./08-colors-themes.md)). Browsers without relative colour syntax use a fixed fallback.

## Message fills

`.msg` with a status gives the soft, token-based message look used by alerts and badges: the status's `-00` step as the fill, `-25` as the border and `-100` as the text.

```css
.msg.info
.msg.success
.msg.warning
.msg.danger
.msg.neutral
```

The scale tokens are defined per mode in [Colors and Themes](./08-colors-themes.md).

## Shape props

The radius prop names for components:

```css
.rect { border-radius: 0 }
.mincurved { border-radius: var(--radius-sm, 3px) }
.modern { border-radius: var(--radius-md, 6px) }
.curved { border-radius: var(--radius-bs, 12px) }
.round { border-radius: var(--radius-full, 9999px) }
```

The same names as in [Shapes and Sizes](./03-shapes-sizes.md), with fallback values so components render sensibly even without the full token set.

## Height props

The `.h-xs` to `.h-xl` classes from [Shapes and Sizes](./03-shapes-sizes.md) set a control's height. For a control that should grow with its content, add `.hgrow`: the size class then sets a minimum height instead.

```css
.hgrow.h-lg { height: auto; min-height: var(--h-lg); }
```
