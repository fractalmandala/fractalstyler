---
title: Responsive
description: Explains the breakpoint bands and the visibility classes in responsive.css.
id: 12
---

This document explains `responsive.css`, which holds the breakpoint reference tokens and the small set of band-based visibility classes.

## Breakpoints

```css
--bp-sm: 769px;
--bp-md: 1025px;
--bp-lg: 1281px;
--bp-xl: 1441px;
```

These are the same four bands used throughout the system (grids in [Containers](./04-containers.md), sidebars in [Layout Shell](./07-layout-shell.md), text-static steps in [Typography](./05-typography.md)). The tokens are reference values for docs, SASS and JS — CSS media queries cannot consume custom properties, so the classes below write the bands as literals to match.

## Visibility classes

A small escape hatch for the one-off show/hide case — not a per-property responsive ladder:

```css
@media (max-width: 1024.98px) { .md-only { display: none !important; } }
@media (max-width: 1280.98px) { .lg-only { display: none !important; } }
@media (max-width: 1440.98px) { .xl-only { display: none !important; } }
@media (min-width: 1025px) { .md-hide { display: none !important; } }
@media (min-width: 1281px) { .lg-hide { display: none !important; } }
@media (min-width: 1441px) { .xl-hide { display: none !important; } }
```

- `.md-only` / `.lg-only` / `.xl-only` - element is hidden below the band, shown at it and above
- `.md-hide` / `.lg-hide` / `.xl-hide` - element is visible below the band, hidden at it and above

Example: `<aside class="md-only">` shows a sidebar only on desktop widths, the inverse of what `layout-shell.css` does for its own sidebars.

Notes:

- The classes only ever hide; they never restate a display. So they combine with any display class — `<nav class="row md-only">` is hidden below 1025px and a flex row from there up.
- They are `!important`, so they win over the display utility on the same element (`.row`, `.grid`, `.block`) whatever the load order — see the cascade rule in [Configurations](./01-configurations.md).
- Prefer the built-in responsive behaviors (grids, sidebars, `ta-*.mleft`) when they cover the case; these classes are for the gaps.
