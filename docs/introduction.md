---
title: Introduction to Fractalstyler
description: A guide to the Fractalstyler system, its mental model, the rules of use, and how to keep the system lean.
---

Fractalstyler is a composition styling system - a small set of CSS custom properties (tokens) and the classes that consume them. You style by composing classes in markup — you almost never write a stylesheet. The full system is ~1,400 lines of plain CSS. The idea is to keep a lean, modular system that allows maximum styling freedom with minimal class bloat, and structured variables sets. This guide is an introduction on how to think about it and how to use it.

## The Mental Model

Everything in Fractalstyler reduces to three ideas:

### 1. Tokens are the system; classes are the interface

Under the hood there are only a handful of scales, each with a fixed step vocabulary:

| Scale | Steps | Used for |
|:--|:--|:--|
| `--space-*` | xs sm md bs lg xl 2xl 3xl | gaps, padding, margins |
| `--text-*` | xs sm md bs lg xl 2xl–5xl | font sizes |
| `--radius-*` | xs sm md bs lg full | corner rounding |
| `--h-*` | xs sm md bs lg xl 2xl 3xl | fixed heights |
| `--shadow-*` | xs sm md bs lg xl 2xl 3xl | elevation |

Classes are mechanical expansions of these scales — `.gap-bs` is `gap: var(--space-bs)`, `.pad-xl` is `padding: var(--space-xl)`, and so on for 400+ classes.

> What this means is that you learn the step names once, and immediately know every class for padding, margin, gap, border, border-radius, height, box-shadow and more. 

### 2. One file per concern

Each CSS file owns one concern, and an accompanying doc explaining usage:

- [Configurations](./01-configurations.md) — global tokens and base resets
- [Colors and Themes](./08-colors-themes.md) — all colors, light/dark via `data-mode`
- [Typography](./05-typography.md) — text sizes, semantic text classes, prose
- [Shapes and Sizes](./03-shapes-sizes.md) — radii, heights, fitment
- [Gaps, Pads, Margins](./02-gaps-pads-margins.md) — the `--space-*` class families
- [Borders, Elevation and Focus](./06-border-elevation-focus.md) — borders, shadows, focus rings
- [Containers](./04-containers.md) — flex/grid/positioning/scrolling
- [Layout Shell](./07-layout-shell.md) — app chrome: header, sidebars, footer
- [Responsive](./12-responsive.md) — breakpoint visibility escape hatch
- [Components](./10-components.md) — buttons, inputs, links, tags, switches…
- [Component Props](./11-component-props.md) — variant classes for UI libraries
- [Motion and Animation](./09-motion-animation.md) — easings, speeds, keyframes
- [Custom](./13-custom.md) — your site's own layer (the example slot)

### 3. Compose in markup, don't write CSS

The intended workflow:

```svelte
<!-- not: a hand-rolled .sidebar class on a div -->
<aside class="box ybetween pad-lg br">
```

Class names read like a sentence: container first, then alignment, then spacing, then decoration. If you find yourself writing a `.sidebar` class in CSS, first check whether `box`, `pad-*`, `border-*` and friends already compose what you need. Further convenience is provided through the layout and shell classes. Depending on where your sidebar is located, you could just use:

```svelte
<aside class="sidebar-left">
<!--or-->
<aside class="sidebar-right">
```

## Ways to Use

### 1. Shell

Start from the [layout shell](./07-layout-shell.md): `.app-shell` → `.app-header` / `.app-main` / `.sidebar-left` / `.main-section` / `.app-footer`. Set `--header-height`, `--footer-height` and sidebar widths to your design, and the sticky/fitted behavior works itself out. TOC in sidebars right condenses to a dropdown menu at the top of the page, below 1280px, and the nav in a sidebar left becomes part of the header menu below 1024px. 

### 2. Theme

All colors live in `colors-themes.css`, selected by `data-mode="light|dark"` on `<html>`. To re-skin the whole app, override tokens — never hardcode hex values:

```css
:root {
  --theme-color: oklch(0.55 0.2 260);
  --bg: oklch(0.99 0 0);
}
```

Every button, focus ring, link hover and prose accent follows automatically.

### 3. Semantics

Prefer `page-title`, `card-desc`, `text-body-sm`, `nav-link` over assembling `text-2xl weight-600 lh11 ls-tight-lg` by hand. The semantic classes exist to prevent drift — one place defines what a "page title" is.

### 4. Containers

`row`/`box` + alignment companions (`xcenter`, `ybetween`…), responsive grids (`grid-2`…`grid-6`), `.card-grid`, `.reel`, `.prose` — these cover the vast majority of layout needs without a single line of custom CSS.

## Rules to Follow

1. Never hardcode a value a token covers. No raw hex in components, no `padding: 16px` where `pad-bs` exists. If a value repeats, promote it to a token.
2. One scale, no new vocabularies. New spacing/size needs must slot into the existing `xs–3xl` steps. Don't invent `--space-lg-plus` or `.gap-18px`.
3. Classes consume tokens, tokens only. A utility class should be one line: `property: var(--token)`. The moment a class grows logic, it belongs in `components.css` or your `custom.css`.
4. Keep `custom.css` as the pressure valve. All site-specific styling goes there, never into the system files. That quarantines your branding from system upgrades.
5. `data-mode` is the only theme hook. Toggle it on `<html>` (add `.mode-wipe` while switching to kill the cross-fade flash). Don't invent parallel theme attributes.
6. Respect the breakpoints. The bands 769/1025/1281/1441 are shared by grids, shell, typography and [responsive](./12-responsive.md) classes. New responsive rules use the same bands — never a fifth, private breakpoint.
7. Motion comes from tokens. `transition: color var(--motionin1)` — not hand-written `0.2s ease`. The speed/easing pairs exist so the whole app moves consistently.

## Dos and Don'ts

**Do:**
- compose container + alignment + spacing classes in markup
- re-theme by overriding tokens in `:root`
- use semantic text classes and layout templates to prevent drift
- use `.focus-ring` / `.focus-theme` on your own interactive elements
- override a token locally for one-off tuning (`style="--space-lg: 2rem"`)

**Don't:**
- write `hover:bg-xs`-style state variants or dark: variants — states are styled where they're defined, once
- add per-property responsive ladders (`.md-pad-lg`) — that's the Tailwind slide into bulk
- duplicate resets — `configurations.css` and `typography.css` already do it globally
- stack utility classes where a semantic class exists (`card-title` beats `text-lg weight-600 lh12`)
- hardcode z-index values — use `--z-sticky/raised/modal/toast`
- bypass `--space-*` with literal rem in component CSS

## Keeping It Lean

The system stays small by three disciplines:

1. Expansion, not invention. Every class family is `axis × steps`, generated from one scale. Adding a class family that reuses an existing scale costs ~10 lines; adding a new scale costs vocabulary. Choose expansion.
2. No escape-hatch ladders. The `responsive.css` visibility classes are the only band-based classes, and there are six of them. It stays that way. If you need one-off responsive behavior, write the media query in `custom.css`.
3. Deletion is a feature. The `radius-2`…`radius-16` pixel ladder was cut because `--radius-*` covers the need. When a class has no consumer and no planned one, remove it (and its doc line).

Before proposing any addition, ask: does it reuse an existing token scale? Does it replace N lines of user CSS? If it fails either test, it's bulk.

## Best Practices

- Read the registry. `REGISTRY.md` is the generated index of every class. Search it before writing CSS — it's the "does this already exist?" check.
- Set the two heights. Configure `--header-height`/`--footer-height` early; the fitted viewport math and sticky sidebars depend on them being truthful.
- Design in both modes. Toggle `data-mode` while building — the shadow, border and state tokens differ per mode, and what works in light often doesn't in dark.
- Test keyboard focus. The system wires `:focus-visible` rings everywhere; if your custom interactive element has none, add `.focus-ring`.
- Respect reduced motion. `.anim-spin`/`.anim-pulse` and mascot animations already stop under `prefers-reduced-motion`; keep any custom animation equally polite.
- Document new classes the day they land. Every file has a matching doc in `docs/` — keep them in lockstep. Undocumented classes rot.

## Next

Start reading in this order: [Configurations](./01-configurations.md) → [Colors and Themes](./08-colors-themes.md) → [Containers](./04-containers.md) → [Layout Shell](./07-layout-shell.md). The rest you can look up as needed.
