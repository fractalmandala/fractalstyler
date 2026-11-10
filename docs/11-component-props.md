---
title: Component Props
description: Explains the component variant classes in component-props.css - button colors, shape names, and control heights.
id: 11
---

This document explains `component-props.css`, which holds the variant/prop classes consumed by Fractalsvelte UI components. They are generic classes - you can apply them to any element - but they exist to pair with component props.

## Button variants

```css
.primary   /* bg-button + matching border, white text; hover/selected use bg-button-hover/active */
.secondary /* same pattern with bg-button-secondary-* */
themed    /* theme-color background; hover uses --theme-color-sub, selected --theme-color-alt */
.outline   /* transparent, text-primary, border-strong; hover goes theme colored */
.ghost      /* transparent, borderless; hover/selected use state-hover/state-selected */
.link       /* looks like a theme-colored text link, underline on hover */
```

Status variants, each a solid fill of its status color with white text:

```css
.info, .variant-info
.success, .variant-success
.warning, .variant-warning
.danger, .variant-danger  /* hover darkens to danger-hover */
```

The `.variant-*` spellings exist for scoped use inside component variant wrappers (`&.variant-*` in the source).

## Shape props

The radius prop names for components:

```css
.rect { border-radius: 0 }
.min { border-radius: var(--radius-xs, 2px) }
.modern { border-radius: var(--radius-sm, 4px) }
.curved { border-radius: var(--radius-bs, 12px) }
.round { border-radius: var(--radius-full, 9999px) }
```

Same scheme as `shapes-sizes.css` (`.mincurved` there is `.min` here), but with fallback values so components render sensibly even without the full token set.

## Height props

`.h-xs` through `.h-xl` set fixed control heights from the `--h-*` tokens defined in [Shapes and Sizes](./03-shapes-sizes.md) (note: this file caps at `xl`, while the token scale continues to `3xl`), plus `min-block-size` so content can't stretch them. The two largest add sensible horizontal padding:

```css
.h-lg { height: var(--height-lg); min-block-size: var(--height-lg); padding-inline: var(--space-bs); }
.h-xl { height: var(--height-xl); min-block-size: var(--height-xl); padding-inline: var(--space-lg); }
```
