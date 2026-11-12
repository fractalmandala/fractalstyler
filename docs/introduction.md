---
title: Introduction to Fractalstyler
description: A guide to the Fractalstyler system, its mental model, the rules of use, and how to keep the system lean.
---

Fractalstyler is a composition styling system - a small set of CSS custom properties (tokens) and the classes that consume them. You style by composing classes in markup — you almost never write a stylesheet. The cascade is about 2,200 lines of plain CSS, 637 classes and 487 tokens. The idea is to keep a lean, modular system that allows maximum styling freedom with minimal class bloat, and structured variables sets. This guide is an introduction on how to think about it and how to use it.

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
| `--measure-*` | xs sm md lg xl 2xl 3xl 4xl | widths, and max-heights |
| `--shadow-*` | xs sm md bs lg xl 2xl 3xl | elevation |
| `--spring-*` | gentle snappy bouncy stiff slow | spring easings and settle times |

Classes are mechanical expansions of these scales — `.gap-bs` is `gap: var(--space-bs)`, `.pad-xl` is `padding: var(--space-xl)`, and so on for the 637 classes.

> What this means is that you learn the step names once, and immediately know every class for padding, margin, gap, border, border-radius, height, box-shadow and more. 

### 2. One file per concern

Each CSS file owns one concern, and an accompanying doc explaining usage:

- [Configurations](./01-configurations.md) — global tokens, theme axes, registered motion properties, base resets
- [Springs](./01b-springs.md) — the generated spring easing tokens
- [Gaps, Pads, Margins](./02-gaps-pads-margins.md) — the `--space-*` class families
- [Shapes and Sizes](./03-shapes-sizes.md) — radii, heights, fitment, the measure ladder
- [Containers](./04-containers.md) — flex/grid/positioning/scrolling
- [Typography](./05-typography.md) — text sizes, semantic text classes, prose
- [Borders, Elevation and Focus](./06-border-elevation-focus.md) — borders, shadows, focus rings, glass, rim, glow
- [Layout Shell](./07-layout-shell.md) — app chrome: header, sidebars, footer, overlays
- [Colors and Themes](./08-colors-themes.md) — parametric colour recipe, light/dark via `data-mode`, named palettes via `data-theme`
- [Motion and Animation](./09-motion-animation.md) — easings, springs, enter/pop, view transitions
- [Components](./10-components.md) — buttons, inputs, links, tags, switches…
- [Component Props](./11-component-props.md) — variant classes, control parts, tones
- [Responsive](./12-responsive.md) — breakpoint visibility escape hatch
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

Colour is a recipe of three numbers in `colors-themes.css`: `--hue`, `--chroma`, and `--tint`. Light and dark roles are `oklch()` of those numbers, selected by `data-mode="light|dark"` on `<html>`. A named `data-theme` is just a preset of the three numbers. To re-skin, change the numbers — never hardcode hex values:

```css
:root {
  --hue: 38;
  --chroma: 0.2;
  --tint: 0.012;
}
```

Every button, focus ring, link hover and prose accent follows automatically.

### 3. Semantics

Prefer `page-title`, `card-desc`, `text-body-sm`, `nav-link` over assembling `text-2xl weight-600 lh11 ls-tight-lg` by hand. The semantic classes exist to prevent drift — one place defines what a "page title" is.

### 4. Containers

`row`/`box` + alignment companions (`xcenter`, `ybetween`…), responsive grids (`grid-2`…`grid-6`), `.grid-7` (always seven columns), `.card-grid`, `.reel`, `.prose` — these cover the vast majority of layout needs without a single line of custom CSS.

## Rules to Follow

1. Never hardcode a value a token covers. No raw hex in components, no `padding: 16px` where `pad-bs` exists. If a value repeats, promote it to a token.
2. One scale, no new vocabularies. New spacing/size needs must slot into the existing `xs–3xl` steps. Don't invent `--space-lg-plus` or `.gap-18px`.
3. Classes consume tokens, tokens only. A utility class should be one line: `property: var(--token)`. The moment a class grows logic, it belongs in `components.css` or your `custom.css`.
4. Keep `custom.css` as the pressure valve. All site-specific styling goes there, never into the system files. That quarantines your branding from system upgrades.
5. Light and dark stay on `data-mode`. Toggle it on `<html>` (add `.mode-wipe` while switching to kill the cross-fade flash). Named palettes use `data-theme` — a preset of `--hue`, `--chroma`, and `--tint`. `data-radius`, `data-density`, and `data-motion` are optional axes that rewrite those token ladders. Don't invent further theme attributes.
6. Respect the breakpoints. The bands 769/1025/1281/1441 are shared by grids, shell, typography and [responsive](./12-responsive.md) classes. New responsive rules use the same bands — never a fifth, private breakpoint.
7. Motion comes from tokens. `transition: color var(--motionin1)` — not hand-written `0.2s ease`. Spring-timed motion uses `var(--spring)` and `calc(var(--spring-ms) * var(--motion-scale))`, so reduced motion can silence it.

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

- Read the registry. `registry.md` is the generated index of every class. Search it before writing CSS — it's the "does this already exist?" check.
- Set the two heights. Configure `--header-height`/`--footer-height` early (they are declared in [Shapes and Sizes](./03-shapes-sizes.md)); the fitted viewport math and sticky sidebars depend on them being truthful.
- Design in both modes. Toggle `data-mode` while building — the shadow, border and state tokens differ per mode, and what works in light often doesn't in dark.
- Test keyboard focus. The system wires `:focus-visible` rings everywhere; if your custom interactive element has none, add `.focus-ring`.
- Respect reduced motion. `--motion-scale` drops to 0, `.anim-spin`/`.anim-pulse` and the looping animations stop, and mascot animations already stop under `prefers-reduced-motion`; keep any custom animation equally polite.
- Document new classes the day they land. Every file has a matching doc in `docs/` — keep them in lockstep. Undocumented classes rot.

## Next

Start reading in this order: [Configurations](./01-configurations.md) → [Colors and Themes](./08-colors-themes.md) → [Containers](./04-containers.md) → [Layout Shell](./07-layout-shell.md). The rest you can look up as needed. The class API itself is [`registry.md`](../registry.md).
