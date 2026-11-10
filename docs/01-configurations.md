---
title: Configurations
description: Explains the global configuration tokens (layout dimensions, z-index, fonts) and the base resets in configurations.css.
id: 1
---

This document explains `configurations.css`, which sets the app-level configuration tokens everything else reads, plus a base reset layer.

## Tokens

Component sizes:

- `--avatar-size` (32px) - consumed by the avatar-group classes in [Components](./10-components.md)
- `--switch-w`, `--switch-h`, `--switch-thumb` (40px / 22px / 16px) - reserved sizing for switch controls

Layout dimensions:

- `--header-height` (64px) and `--footer-height` (32px) - used by `hfull-fitted` in [Shapes and Sizes](./03-shapes-sizes.md) and by the layout shell classes
- `--fit-height` - `calc(var(--header-height) + var(--footer-height))`, for viewport fitting
- `--prose-clamp` (65ch) - max-width for prose containers
- `--content-clamp` (1600px) - max-width for clamped headers/main areas
- `--app-inline` (`var(--space-lg)`) - inline padding for the app shell chrome
- `--card-min` (240px) - min column width for `.card-grid`
- `--sidebar-width`, `--sidebar-width-left`, `--sidebar-width-right` (280px each)

Z-index scale:

- `--z-sticky` (100), `--z-raised` (200), `--z-modal` (300), `--z-toast` (500)

Fonts:

- `--font-sans`, `--font-mono` - system font stacks applied to `body`/`html`

## Base Resets

The file also sets the global baseline for pages:

- `box-sizing: border-box` and `min-width: 0` on everything
- `body, html` use `--font-sans` at `--text-bs`, zero margin/padding
- `:root` gets `interpolate-size: allow-keywords`, `scrollbar-gutter: stable`, `overflow-wrap: break-word` - so layout never shifts when a scrollbar appears, and heights can animate to/from `auto`
- `body` gets `min-height: 100svh`
- buttons/links get `touch-action: manipulation`; buttons get `user-select: none`
- `img, video, svg` become block-level, `max-width: 100%`, height auto
- form controls inherit font and color
- same text resets as typography.css (zero margins, text-wrap rules, link inherit, list-style none)

There is one debug class, `.bdr { border: 1px solid red; }`, for outline-debugging elements.
