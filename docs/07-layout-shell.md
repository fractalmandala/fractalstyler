---
title: Layout Shell
description: Explains the app shell classes - header, main, sidebars, footer and content widths - in layout-shell.css.
id: 7
---

This document explains `layout-shell.css`, the app/site chrome skeleton. It composes with the tokens from [Configurations](./01-configurations.md): `--header-height`, `--footer-height`, `--fit-height`, `--app-inline`, `--content-clamp`, `--sidebar-width-left/right`, and the z-index scale.

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

- below 1025px both sidebars are hidden; `.app-shell.open .sidebar-left` shows the left sidebar as a fixed overlay at `--z-modal` (mobile drawer)
- at 1025px+ the left sidebar shows, sticky
- at 1281px+ the right sidebar shows too

Lists inside sidebars get their left margin/padding zeroed.

## Content widths

`.content-section` wraps page content and is a column flex container. `.narrow-full`, `.narrow-half` and `.narrow-wide` are centered reading-width presets that grow with breakpoints:

| Breakpoint | narrow-full | narrow-half | narrow-wide |
|:--|:--|:--|:--|
| 769px+ | - | 640px | 720px |
| 1025px+ | 640px | 750px | 750px |
| 1281px+ | 720px | 800px | 1024px |
| 1441px+ | - | 1024px | 1280px |

`narrow-half` gets increasing right padding at larger sizes to leave room for a right sidebar. `.content-section.null` and `.solo`-less main sections handle the un-padded edge cases.

`.page-header` is a column flex container for a page's title block (see [Typography](./05-typography.md) for `.page-title` and `.page-desc`).

The left sidebar draws a thin scrollbar: 2px wide, transparent track and a pill thumb in WebKit, and a light thumb on `--bg` through `scrollbar-color` elsewhere.

For the vertical fitment alternative (a central area filling the viewport minus header/footer), see the `hfull-fitted` class in [Shapes and Sizes](./03-shapes-sizes.md).
