---
title: Components
description: Explains the styled element defaults (buttons, inputs, links) and component support classes (avatars, badges, tags, switches, checkboxes, groups) in components.css.
id: 10
---

This document explains `components.css`, which styles native elements (buttons, inputs, selects, links) and provides the support classes Fractalsvelte UI components rely on.

## Buttons

The bare `button` element (and `.button`) is styled globally: flex-centered, no wrapping, no text-decoration, pointer cursor, `--space-md` inline padding, and motion transitions using the tokens from [Motion and Animation](./09-motion-animation.md). Focus-visible gets a `--ring` outline (see [Borders, Elevation and Focus](./06-border-elevation-focus.md)). Disabled buttons, and `.button` elements with `aria-disabled="true"`, fade to 0.5 opacity with no pointer events. On press, a button scales to 0.98; add `.no-scaling` to opt out.

At the small heights (`.h-xs`, `.h-sm`, `.h-md`) a button's inline padding drops to `--space-sm`, so short controls are not mostly padding.

`.button-group` and `.split-button` join buttons edge to edge: children get radius 0, only the outer corners get `--radius-sm`, adjacent children overlap by 1px, and hover/focus raises z-index. `.vertical` flips them to a column. On split-buttons the shape classes (`.rect`, `.mincurved`, `.modern`, `.curved`, `.round` - see [Component Props](./11-component-props.md)) set the outer corner radius per side.

`a.btn` / `a.button` get the same treatment for anchor-buttons.

### Icon buttons

- `.btn-icon` - a square button for an icon: no padding, never shrinks, `aspect-ratio: 1`, its size from a `.h-*` class
- `.btn-icon.fit-icon` - the button is exactly its icon: no padding or border, and its height comes from the icon rather than the size class

## Links

- `.link` - theme colored, underline-free, hovers to `--theme-color-down`
- `.link-plain` - text-primary color, hovers to theme color
- `.link-parent` - container class; its `.link-title` child takes the theme color on hover
- `a.nav-link` - padded, rounded nav links, hover background `var(--state-selected)`

## Inputs and Selects

- `.input` - block, `--space-md` inline padding, focus-visible gets theme border + `--ring` glow; `.fitted` makes it width: max-content
- `.select` - same treatment plus appearance reset and an inline SVG chevron background
- `.select-wrap` + `.select-chevron` - wrap pattern for custom chevron positioning; disables the native chevron background on the inner select
- `.is-invalid` - forces the border to `--danger` on inputs, checkboxes and bordered elements
- `.field` - a framed control (a border around an input and its icons or buttons). The frame shows the focus ring through `:focus-within`, so the input inside draws none of its own. With `.is-invalid` the frame keeps its danger border while focused.

## Avatars

`.avatar-group` support classes, sized by `--avatar-size` (set by the consumer — the system does not declare a default):

- `.avatar-more` - the overflow `+N` chip; its width, height and font-size follow `--avatar-size`
- `.circle` / `.rounded` - shape of that chip
- `.gap-overlap` - overlapping stack; `.row` / `.box` pick the axis; the ring color uses `--bg-panel`

## Badges and Tags

- `.badge` - `--space-sm` inline padding, weight 500, no wrap
- `.tag` - same, plus `--tag-color` background
- `.tag.ink-auto` - auto-picks black or white text from the tag color's lightness (oklch relative color syntax, with a fallback)
- `.tag.text-only` - transparent background, text in `--tag-color`
- `.tag .tag-remove` - sized close button
- `.ink-auto` - the same text choice for any element, reading its fill from `--ink-bg` (default `--bg`)

## Switches and Checkboxes

`.switch-box` and `.checkbox-box` style a native input directly (appearance: none):

- switch - pill track with a radial-gradient thumb, checked state flips the thumb side and uses theme color, `aria-invalid` turns the border danger
- checkbox - square (`.radio` makes it round), checked/indeterminate fill theme color, SVG check icon in white

Both handle focus-visible rings, disabled state, and `[aria-invalid=true]` danger borders.

## Cards

- `.card` - height follows content: a size class on a card sets its text scale (`.h-sm` text-xs up to `.h-xl` text-bs), never its height
- `.card-sized` - scales the card's text parts with it: `.card-title` 1.5em, `.card-desc` 1.075em, `.card-label` 1em, `.card-sub` 0.95em
- `.card-clickable` - pointer cursor, hover border lift to `--border-strong`, theme focus ring; `.disabled` blocks it

## Messages and banners

- Soft status fills now live in [Component Props](./11-component-props.md): `.soft` and `.tint` are the same recipe (a tint of the theme colour, or of a status when paired with `.info` / `.success` / `.warning` / `.danger`). For the token-based message fills see `.msg` there too.
- `.banner.h-*` - a banner's size class sets its padding and text size (`.h-sm` to `.h-xl`), and its height follows content

## Tables

`.data-table` styles a table of records: full width, collapsed borders, `--space-sm` / `--space-bs` cell padding, a row border in `--border`, and an uppercase, small, secondary header row on `--state-hover`. Rows highlight on hover.

- `.striped` - shades every other row
- `tr.selected` - a selected row, on `--state-selected`
- `.data-table-select` - the narrow checkbox column
- `.data-table-empty` - the centered, padded cell shown when there are no rows
- cells are left-aligned at zero specificity, so `.ta-c` and `.ta-r` on a cell win

## Disclosure and lists

- `.collapse` - a region that opens and closes by height (animated `grid-template-rows`); add `.open` to open it. Its single child clips, so put padding on what is inside that child. Motion stops under `prefers-reduced-motion`.

## Sliders

- `.track-min` - the minimum width of a horizontal slider track (14em)
- `.track-v` - an upright track 10em long; with a `.h-*` class, that size becomes its thickness

## Media and carousels

- `.ribbon-bookmark` - the notched bottom edge of a bookmark ribbon
- `.carousel-track` - drag-to-scroll on top of `.reel` (see [Containers](./04-containers.md)): no scrollbar, grab cursors with `.is-draggable` and `.is-dragging`, and no snapping while dragging

## Misc

- `.slide-unlock` - min-width 16rem, no text selection/touch scrolling, for drag-to-unlock widgets
- `.kbd` - a keyboard-key glyph: inline-flex, mono, a strong border with a thicker bottom edge, `--bg-surface` fill
- `.vibrating` keyframe - scale pop used for feedback animations
