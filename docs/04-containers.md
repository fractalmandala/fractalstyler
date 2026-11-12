---
title: Containers
description: Explains the flex/grid containers, alignment, positioning, scrolling, aspect-ratio frames and display utilities in containers.css.
id: 4
---

This document explains `containers.css`, which holds all layout container classes: flex, grid, positioning, scrolling, aspect-ratio frames and display utilities.

## Flex - Box and Row

`.box` / `.column` are a vertical flex container (column direction); `.row` is a horizontal flex container. Alignment is set by companion classes. In the vertical containers the x-axis is `align-items` (cross) and the y-axis is `justify-content` (main); in `.row` it flips.

For `.box` / `.column`:

- `.xcenter`, `.xleft`, `.xright` - align-items + matching text-align
- `.ycenter`, `.ytop`, `.ybot` - justify-content
- `.ybetween`, `.yevenly`, `.yaround` - space-between / space-evenly / space-around
- `.xinherit`, `.yinherit` - take the parent's alignment on that axis

For `.row`:

- `.xleft`, `.xcenter`, `.xright`, `.xbetween`, `.xevenly`, `.xaround` - justify-content
- `.ycenter`, `.ytop`, `.ybot` - align-items
- `.xinherit`, `.yinherit` - take the parent's alignment on that axis

Example: `<div class="row xbetween ycenter">`.

Flex helpers: `.wrap` (flex-wrap), `.grow` (flex: 1 1 0%), `.shrink-0`, `.flex-shrink` (flex-shrink: 1, to undo a `.shrink-0`).

## Grid

`.grid` plus `.grid-2` through `.grid-7` are column grids. `.grid-2`, `.grid-3`, `.grid-4`, `.grid-5` and `.grid-6` are responsive — single column below 1025px, then the full column count (at 1025px+ for 2 and 3, at 1281px+ for 4, 5 and 6):

- `.grid-2` - 1 → 2 columns at 1025px+
- `.grid-3` - 1 → 3 columns at 1025px+
- `.grid-4` - 1 → 2 → 4 columns (2 at 1025px+, 4 at 1281px+)
- `.grid-5` - 1 → 3 → 5 columns (3 at 1025px+, 5 at 1281px+)
- `.grid-6` - 1 → 3 → 6 columns
- `.grid-7` - always seven columns, `minmax(var(--h-lg), 1fr)`, so a week row does not collapse at the shared breakpoints

`.grid-1` is a one-column grid (`repeat(1, minmax(0, 1fr))`).

All of `.grid` and `.grid-2` through `.grid-7` accept the same alignment companions, mapping to grid tracks: `.xcenter/.xleft/.xright/.xstretch` (justify-items), `.ycenter/.ytop/.ybot/.ystretch` (align-items), `.center` (place-items), and `.xbetween/.xevenly/.xaround`, `.ybetween/.yevenly/.yaround` for the whole grid's content distribution.

`.cspan-1` through `.cspan-8` span a child across N grid columns.

`.card-grid` is an auto-fit grid with `minmax(min(var(--card-min), 100%), 1fr)` - cards sized from `--card-min` (see [Configurations](./01-configurations.md)).

## Positioning

- `.relative`, `.absolute`, `.cover` (absolute, `inset: 0`, fills the containing block), `.fixed`, `.sticky`
- `.z-sticky`, `.z-raised`, `.z-modal`, `.z-toast` - consume the z-index tokens
- `.pin-tl`, `.pin-tr`, `.pin-bl`, `.pin-br` - absolutely positioned at `--z-raised`, `--space-sm` in from that corner of the nearest positioned parent (corner badges, ribbons, stamps)

## Scrolling

- `.scroll-y` / `.scroll-x` - one-axis auto scroll with `overscroll-behavior: contain`
- `.reel` - horizontal scroll-snap carousel; children snap to start and never shrink
- `.scroll-menu` - a list that scrolls past `16rem` (dropdown and combobox option lists)
- `.scroll-thin` - a thin scrollbar in the border-strong colour
- `.scroll-hidden` - hides the scrollbar (`scrollbar-width: none`)

## Prose containers

- `.prose` - column flex, `max-width: var(--prose-clamp)`, centered, with `--space-sm` gap
- `.prose-left` - same, but left-aligned (`margin-right: auto`)

Both zero the top margin of a first heading. Text styling inside prose is [Typography](./05-typography.md)'s `prose-content`.

## Aspect-ratio frames

`.frame-16-9`, `.frame-9-16`, `.frame-4-3`, `.frame-3-4`, `.frame-3-2`, `.frame-2-3`, `.frame-1-1` - each sets the aspect-ratio, hides overflow, and stretches any contained img/video/iframe/svg to cover.

`.square` is a 1:1 box that does not crop or position its contents — unlike `.frame-1-1`.

For media sized some other way, `.fit-cover`, `.fit-contain`, `.fit-fill` and `.fit-scale-down` set `object-fit` on the element itself.

## Display utilities

`.inline`, `.block`, `.inline-block`, `.inline-flex`, `.contents`, `.inline-grid`, `.table`, `.display-none`.

Overflow and stacking:

- `.overflow-hidden` / `.overflow-visible` - plain overflow control (for one-axis scrolling see `.scroll-y`/`.scroll-x` above)
- `.isolate` - `isolation: isolate`, creates a new stacking context without a z-index; pairs with the z-classes when nested stacking leaks

Interaction and accessibility:

- `.pointer` - `cursor: pointer`, for clickable rows and labels that are not buttons
- `.pointer-none` / `.pointer-auto` - ignore or restore pointer events
- `.select-none` - disable text selection
- `.dim` - fade the surface to half opacity
- `.touch-none` - `touch-action: none`, for drag surfaces (sliders, pads) so a touch drag does not scroll the page
- `.sr-only` - visually hidden but still focusable and read by screen readers (a file input behind its styled label, say)
