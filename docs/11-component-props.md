---
title: Component Props
description: Explains the component variant classes in component-props.css - button colors, message fills, control parts, tones, and control heights.
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

The radius prop names for components are the shape classes in [Shapes and Sizes](./03-shapes-sizes.md): `.rect`, `.mincurved`, `.modern`, `.curved`, `.round`. They are defined once, there.

## Height props

The `.h-xs` to `.h-xl` classes from [Shapes and Sizes](./03-shapes-sizes.md) set a control's height. For a control that should grow with its content, add `.hgrow`: the size class then sets a minimum height instead.

```css
.hgrow.h-lg { height: auto; min-height: var(--h-lg); }
```

## Unstyled controls and parts

`.bare` is an unstyled native control — appearance, background, border, padding and outline all none, font and colour inherited. It is the starting point for composed controls.

Control parts, composed in markup:

- `.item` - a row in a menu, list, listbox, tree or command palette. Hover, `:focus-visible` and `.highlighted` use `--state-hover`; `.selected` and the `aria-selected` / `aria-current` states use `--state-selected`; disabled fades out
- `.track`, `.fill`, `.thumb` - a slider, a progress bar, a meter. The control sets `--value` (and `--from` for a range) between 0 and 1. `.track.vertical` flips the fill and thumb to the block axis. Distinct from `.track-v` in [Components](./10-components.md)
- `.ring` - a progress or countdown ring that fills with `--value`; its thickness follows the text size
- `.indicator` - the sliding highlight behind the active tab or segment. JavaScript springs `--ix` `--iy` `--iw` `--ih` (CSS pixels, unitless) to the active item's box
- `.caret` - a chevron that rotates 180deg when `.open` is on; `.caret.quarter.open` rotates 90deg instead, spring-timed
- `.dot` - a current-colour status dot (0.5em, fully rounded)

## Tones and the soft variant

`.tone-neutral`, `.tone-info`, `.tone-success`, `.tone-warning` and `.tone-danger` re-point `--theme-color`, so `.fill`, `.ring` and `.text-theme` follow. They are not the same as the filled `.danger` / `.info` variants above.

`.soft` and `.tint` are the same recipe: a 14% oklab mix of `--soft-ink` (the theme colour, or a status when paired with one) with a matching ink, darkening a little on hover and `.selected`. `.tint` keeps its name so existing markup continues to work.
