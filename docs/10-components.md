---
title: Components
description: Explains the styled element defaults (buttons, inputs, links) and component support classes (avatars, badges, tags, switches, checkboxes, groups) in components.css.
id: 10
---

This document explains `components.css`, which styles native elements (buttons, inputs, selects, links) and provides the support classes Fractalsvelte UI components rely on.

## Buttons

The bare `button` element (and `.button`) is styled globally: flex-centered, no text-decoration, pointer cursor, `--space-md` inline padding, and motion transitions using the tokens from [Motion and Animation](./09-motion-animation.md). Focus-visible gets a `--ring` outline (see [Borders, Elevation and Focus](./06-border-elevation-focus.md)); disabled fades to 0.5 opacity with no pointer events; active scales to 1.04.

`.button-group` and `.split-button` join buttons edge to edge: children get radius 0, only the outer corners get `--radius-sm`, adjacent children overlap by 1px, and hover/focus raises z-index. `.vertical` flips them to a column. On split-buttons the radius pairing classes (`.rect`, `.min`, `.modern`, `.curved`, `.round` - see [Component Props](./11-component-props.md)) control the outer corner radius per side.

`a.btn` / `a.button` get the same treatment for anchor-buttons.

## Links

- `.link` - theme colored, underline-free, hovers to `--theme-color-alt`
- `.link-plain` - text-primary color, hovers to theme color
- `.link-parent` - container class; its `.link-title` child takes the theme color on hover
- `a.nav-link` - padded, rounded nav links, hover background `var(--bg-raised)`

## Inputs and Selects

- `.input` - block, `--space-md` inline padding, focus-visible gets theme border + `--ring` glow; `.fitted` makes it width: max-content
- `.select` - same treatment plus appearance reset and an inline SVG chevron background
- `.select-wrap` + `.select-chevron` - wrap pattern for custom chevron positioning; disables the native chevron background on the inner select
- `.is-invalid` - forces the border to `--danger` on inputs, checkboxes, bordered variants

## Avatars

`.avatar-group` support classes, sized by `--avatar-size` (see [Configurations](./01-configurations.md)):

- `.circle` / `.rounded` - shape of the `+N` avatar-more chip
- `.gap-overlap` - overlapping stack; `.row` / `.box` pick the axis; the ring color uses `--bg-panel`

## Badges and Tags

- `.badge` - `--space-sm` inline padding, weight 500, no wrap
- `.tag` - same, plus `--tag-color` background
- `.tag.ink-auto` - auto-picks black or white text from the tag color's lightness (oklch relative color syntax, with a fallback)
- `.tag.text-only` - transparent background, text in `--tag-color`
- `.tag .tag-remove` - sized close button

## Switches and Checkboxes

`.switch-box` and `.checkbox-box` style a native input directly (appearance: none):

- switch - pill track with a radial-gradient thumb, checked state flips the thumb side and uses theme color, `aria-invalid` turns the border danger
- checkbox - square (`.radio` makes it round), checked/indeterminate fill theme color, SVG check icon in white

Both handle focus-visible rings, disabled state, and `[aria-invalid=true]` danger borders.

## Cards and misc

- `.card-clickable` - pointer cursor, hover border lift to `--border-strong`; `.disabled` blocks it
- `.slide-unlock` - min-width 16rem, no text selection/touch scrolling, for drag-to-unlock widgets
- `.vibrating` keyframe - scale pop used for feedback animations
