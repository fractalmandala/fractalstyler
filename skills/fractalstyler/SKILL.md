---
name: fractalstyler
description: Build, compose, modify, or audit UI interfaces using the closed Fractalstyler composition styling system. Use whenever authoring HTML, Svelte, CSS, or TS/JS components where new ad-hoc classes, scoped style blocks, inline styles, custom properties, or arbitrary CSS are strictly forbidden.
---

# Fractalstyler Styling System & Style Guard

Operate within the `fractalstyler` registry as a **closed world**. Never invent a class or styling definition, even when the requested design is not immediately obvious.

## Mandatory Agent Workflow

1. **Consult the Registry First**:
   Read `registry.md` or `references/fractals.md`. Search for existing utility classes, container bases, layouts, and shells before writing any markup.
2. **Compose Only from Verified Classes**:
   - Containers: `.box` (column), `.row` (horizontal), `.grid` (CSS grid).
   - Physical Alignment: **modifiers, never standalone** — they only resolve on a container: `.row.xcenter`, `.box.ycenter`, `.grid.xbetween`. There is no bare `.xcenter`.
   - Dimensions & Spacing: `.gap-*`/`.rgap-*`/`.cgap-*`, `.pad-*`, `.px-*` (inline) / `.py-*` (block) / `.pt-*` `.pr-*` `.pb-*` `.pl-*`, `.mar-*`/`.mx-*`/`.my-*`, `.wfull`/`.hfull`, `.h-xs`…`.h-xl`, `.measure-*` / `.max-h-*`. **There is no `.pad-x-*`, `.pad-y-*` or `.w-*`.**
   - Visuals: `.bg`, `.bg-surface`, `.bg-panel`, `.bg-input`, `.bg-button`, `.bg-success`/`.bg-warning`/`.bg-danger`/`.bg-info`, `.border` (+`-subtle`/`-strong`), per-side `.bt`/`.br`/`.bb`/`.bl` (+`-str`/`-sub`), `.radius-*`, `.shad-*`. **There is no `.border-top`/`.border-bottom`.**
   - Typography: `.text-xs` .. `.text-5xl`, `.weight-300`…`.weight-800`, `.truncate`.
   - Layouts: `.grid-1`…`.grid-7` (`.grid-7` is always seven columns), `.cspan-1`…`.cspan-8`, `.card-grid`, `.prose`, `.prose-left`, `.frame-16-9`…, `.reel`.
   - Interactions: `button` (or the equivalent `.button` class), `a.btn`, `.input`, `.select`, `.button-group`, `.split-button`, `.tag`, `.badge`, `.avatar-group`.
3. **Variants are direct classes** — there is no attribute axis and no `data-variant`:
   - The variant, the shape and the height are classes on the element itself:
   | What | Classes |
   |:---|:---|
   | Variant | `.primary` `.secondary` `.themed` `.outline` `.ghost` `.link` `.info` `.success` `.warning` `.danger` |
   | Shape | `.rect` `.mincurved` `.modern` `.curved` `.round` |
   | Height | `.h-xs` `.h-sm` `.h-md` `.h-bs` `.h-lg` `.h-xl` |
   - The same classes work on a button, an input, a select, a card or a div: `<button class="button primary h-md">`.
4. **Hard Boundaries**:
   - **NO in-component `<style>` blocks**: Components must remain pure markup and logic.
   - **NO inline `style="..."` attributes**: Inline styles are unconstrained ad-hoc CSS.
   - **NO raw hex colors (`#hex`)**: Every color must resolve through semantic tokens (`var(--bg)`, `var(--text-primary)`, `var(--border)`, etc.).
   - **NO arbitrary pixel dimensions (>2px)**: Literal pixels bypass the dimension ladder. Only 1-2px (borders, hairlines) may be literal.
   - **Icons come from `fractalicons`**: never inline SVG or unicode glyphs.
5. **Mandatory Verification**:
   Before claiming task completion, always execute:
   ```bash
   pnpm lint
   pnpm check
   ```
   Both checks must pass with 0 errors.


## Progressive Discovery Index

| Styling Task | File to Inspect | Responsibility |
|:---|:---|:---|
| Active files and cascade order | `src/lib/styles/index.css` | Master composition contract. |
| Global tokens, z-index, fonts, motion channels, `data-radius` / `data-density` / `data-motion` axes, base resets | `src/lib/styles/configurations.css` | Layout dimensions, registered properties and element defaults. |
| Spring easings and settle times | `src/lib/styles/springs.css` | Generated `linear()` presets. Regenerate with `npm run gen:springs`. |
| Spacing, gaps, padding, margins | `src/lib/styles/gaps-pads-margins.css` | The space ladder. |
| Radius, control heights, sizing, measure / max-height | `src/lib/styles/shapes-sizes.css` | Shape channels and sizing helpers. |
| Flex/grid containers, axis alignment, responsive grids | `src/lib/styles/containers.css` | Structural containers plus grid, frame and reel helpers. |
| Text sizes, roles, weights, tracking, line clamp | `src/lib/styles/typography.css` | Typography primitives, roles, and modifiers. |
| Borders, elevation, focus rings, glass, rim, glow | `src/lib/styles/border-elevation-focus.css` | The partition-law border set and the shadow ladder. |
| Page frames, headers, sidebars, rails, overlays | `src/lib/styles/layout-shell.css` | Application shell hierarchy, plus `.floating` / `.dialog` / `.layer`. |
| Colors, semantic tokens, dark mode, `data-theme` palettes | `src/lib/styles/colors-themes.css` | Parametric `--hue` / `--chroma` / `--tint` recipe; light/dark via `data-mode`. |
| Motion, springs, enter/pop, keyframes, view transitions | `src/lib/styles/motion-animation.css` | Easings, durations, `.spring-*`, `.enter-*`, `.pop`. |
| Buttons, links, tags, avatars, switches, `.kbd` | `src/lib/styles/components.css` | The interactive elements. |
| Variants, control parts, tones, soft/tint | `src/lib/styles/component-props.css` | The classes Fractalsvelte UI consumes. |
| Visibility by breakpoint band | `src/lib/styles/responsive.css` | `.md-only`, `.lg-only`, `.xl-only` and their `-hide` counterparts. |
| Project-specific third-party overrides | `src/lib/styles/custom.css` | Sanctioned extension point. |

## Handling Coverage Gaps

If a visual requirement cannot be expressed with existing canonical classes:
1. Do NOT write an ad-hoc inline style or component `<style>` block.
2. Check if an existing token (the `:root` block of a stylesheet) can be composed.
3. If genuine new utility or shell class is required, add it to the designated stylesheet in `src/lib/styles` and run `pnpm registry`.
4. If it is a project-specific extension, declare it in `custom.css`.
