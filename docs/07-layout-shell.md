---
title: Layout Shell
description: Explains the app shell classes - header, main, sidebars, footer and content widths - in layout-shell.css.
id: 7
---

This document explains `layout-shell.css`, the app/site chrome skeleton and the overlay primitives. It composes with the tokens from [Configurations](./01-configurations.md): `--header-height`, `--footer-height`, `--fit-height`, `--app-inline`, `--content-clamp`, `--sidebar-width-left/right`, `--sidebar-width-collapsed`, `--content-aside`, `--anchor`, `--offset`, `--scrim`, `--px`/`--py`, and the z-index scale. Header and footer heights are declared in [Shapes and Sizes](./03-shapes-sizes.md).

There are Svelte components that render exactly this markup — see [Layout](./16-layout.md).

## Structure

```html
<div class="app-shell">
  <header class="app-header">…</header>
  <div class="app-main">
    <aside class="sidebar-left">…</aside>
    <div class="main-section">…</div>
    <aside class="sidebar-right">…</aside>
  </div>
  <footer class="app-footer">…</footer>
</div>
```

- `.app-shell` - column flex, min-height 100vh
- `.app-header` - sticky at top, `--z-sticky`, fixed `--header-height`, `--app-inline` padding; `.clamped` caps it to `--content-clamp`
- `.app-main` - the flex-grow row holding sidebars + content; each sidebar is sticky below the header for the remaining viewport height
- `.main-section` - the flex-grow content column; `.solo` (no sidebars) applies `--app-inline` padding
- `.app-footer` - row flex, `--app-inline` padding, min `--footer-height`

## Sidebar responsiveness

- below 1025px both sidebars are hidden; `.app-shell.open .sidebar-left` shows the left sidebar as a fixed overlay at `--z-modal` (mobile drawer): `top` is `--header-height`, height is `calc(100dvh - var(--header-height))`, with `--bg` and a hairline right border so it covers the page
- at 1025px+ the left sidebar shows, sticky
- at 1281px+ the right sidebar shows too

Lists inside sidebars get their left margin/padding zeroed.

## Content widths

`.content-section` wraps page content and is a column flex container. `.narrow-full`, `.narrow-half` and `.narrow-wide` are centered reading-width presets that grow with the measure ladder:

| Breakpoint | narrow-full | narrow-half | narrow-wide |
|:--|:--|:--|:--|
| 769px+ | - | `--measure-lg` (36rem) | `--measure-xl` (48rem) |
| 1025px+ | `--measure-lg` (36rem) | `--measure-xl` (48rem) | `--measure-xl` (48rem) |
| 1281px+ | `--measure-xl` (48rem) | `--measure-xl` (48rem) | `--measure-2xl` (64rem) |
| 1441px+ | - | `--measure-2xl` (64rem) | `--measure-3xl` (80rem) |

`narrow-half` gets increasing right padding at larger sizes to leave room for a right aside: `--space-xl` from 1025px, `--content-aside` from 1281px. `.content-section.null` and `.solo`-less main sections handle the un-padded edge cases.

`.page-header` is a column flex container for a page's title block (see [Typography](./05-typography.md) for `.page-title` and `.page-desc`).

The left sidebar draws a thin scrollbar: 2px wide, transparent track and a pill thumb in WebKit, and a light thumb on `--bg` through `scrollbar-color` elsewhere.

`.nav-section` and `.toc-section` are column flex containers for a sidebar's nav and table of contents. `.logo-link` is an inline-flex, undecorated, inherit-coloured mark for the header brand. `.toc-link` is a compact, secondary-coloured toc row that hovers to `--theme-color`.

## Overlays

Native `<dialog>` and the Popover API do the stacking, focus and dismissal; CSS anchor positioning does the placement. `:where(.floating, .dialog, .layer)` resets border, padding, margin and background so the surface is a blank top-layer box.

- `.anchor` (and `[data-anchor]`) names the element through `--anchor`
- `.floating` is `position: fixed` and `position-anchor: var(--anchor)`, with flip fallbacks and a max-height of `calc(100dvh - var(--space-lg))`
- Placement modifiers, with a gap of `--offset`: `.at-top`, `.at-top-start`, `.at-top-end`, `.at-bottom`, `.at-bottom-start`, `.at-bottom-end`, `.at-left`, `.at-left-start`, `.at-right`, `.at-right-start`
- `.match-anchor` — the floating box is at least as wide as its anchor
- `.at-pointer` — a zero-size anchor fixed at `--px` / `--py` (unitless CSS pixels), for context menus

A modal surface: `<dialog class="dialog pop">`. `.dialog` centres itself and caps to the viewport minus `--space-xl`; its `::backdrop` uses `--scrim` and fades in with the motion tokens. `.dialog.sheet` docks to an edge — add `.at-right`, `.at-left`, `.at-top` or `.at-bottom`. `.dialog.fullscreen` fills the viewport.

- `.open-column` — lays out as a column only while `[open]` or `:popover-open`
- `.sized` — width from `--size` (or, on a top/bottom sheet, height)
- `.layer` — a free top-layer region (toasts): `<div popover="manual" class="layer …">`, placed with the same `.at-*` modifiers against the viewport edges

Pair overlays with `.pop` and `.enter-*` from [Motion and Animation](./09-motion-animation.md).

For the vertical fitment alternative (a central area filling the viewport minus header/footer), see the `hfull-fitted` class in [Shapes and Sizes](./03-shapes-sizes.md).
