---
name: fractalstyler
description: Build, compose, modify, or audit UI interfaces using the closed Fractalstyler composition styling system. Use whenever authoring HTML, Svelte, Sass, CSS, or TS/JS components where new ad-hoc classes, scoped style blocks, inline styles, custom properties, or arbitrary CSS are strictly forbidden.
---

# Fractalstyler Styling System & Style Guard

Operate within the `fractalstyler` registry as a **closed world**. Never invent a class or styling definition, even when the requested design is not immediately obvious.

## Mandatory Agent Workflow

1. **Consult the Registry First**:
   Read `docs/REGISTRY.api.md` or `references/fractals.md`. Search for existing utility classes, container bases, layouts, and shells before writing any markup.
2. **Compose Only from Verified Classes**:
   - Containers: `.box` (column), `.row` (horizontal), `.grid` (CSS grid).
   - Physical Alignment: **modifiers, never standalone** — they only resolve on a container: `.row.xcenter`, `.box.ycenter`, `.grid.xbetween`. There is no bare `.xcenter`.
   - Dimensions & Spacing: `.gap-*`/`.rgap-*`/`.cgap-*`, `.pad-*`, `.px-*` (inline) / `.py-*` (block) / `.pt-*` `.pr-*` `.pb-*` `.pl-*`, `.mar-*`/`.mx-*`/`.my-*`, `.wfull`/`.hfull`, `.h-sm`…`.h-xl`/`.h-2xl`. **There is no `.pad-x-*`, `.pad-y-*` or `.w-*`.**
   - Visuals: `.bg-main`, `.bg`, `.bg-surface`, `.bg-panel`, `.bg-sunken`, `.bg-raised`, `.bg-extra`, `.bg-success`/`.bg-warning`/`.bg-danger`/`.bg-info`, `.border` (+`-subtle`/`-strong`), per-side `.bt`/`.br`/`.bb`/`.bl` (+`-str`/`-sub`), `.radius-*`, `.shadow-*`. **There is no `.border-top`/`.border-bottom`.**
   - Typography: `.text-xs` .. `.text-5xl`, `.weight-300`…`.weight-800`, `.truncate`.
   - Layouts: `.grid-1`…`.grid-6`, `.cspan-1`…`.cspan-8`, `.card-grid`, `.prose`, `.prose-left`, `.frame-16-9`…, `.reel`, `.card`, `.chip`, `.nav-section`, `.page-header`, `.inputs-wrapper`, `.checkbox-wrapper`.
   - Interactions: `button` (or the equivalent `.button` class), `a.btn`, `.input`, `.select`, `.button-group`, `.split-button`, `.accordion`/`.accordion-item`/`.accordion-trigger`/`.accordion-content`/`.accordion-panel`.
4. **The attribute axes are managed directly via class definitions, dropped `[data-variant]` type of selectors to enable same convention to work in Svelte, gpuix-Svelte, GPUI. 
   - activate by assigning these classes to intended recipient element - `el-variant`, `el-shape`, `el-size`,  or catch all three together with `el-vss`. Then assign one of following as sister inline class: 
   | Axis class | Values |
   |:---|:---|
   | `.el-variant` | `primary` `secondary` `themed` `outline` `ghost` `link` `icon`, `danger`, `icon-danger` |
   | `.el-shape` | `square` `min` `modern` `curved` `round` |
   | `.el-size` | `h-sm` `h-md` `h-bs` `h-lg` `h-xl` |
   | `.pad-*` | `pad-xs` `pad-sm` `pad-bs` `pad-lg` `pad-xl` |
   | `.shadow-*`, `.shadow-hover-*` | `*-sm` `*-bs` `*-lg` `*-xl` `*-2xl` | 
   - A bare `<button>` paints **nothing**, nor does `<button class="el-variant">`. It must carry a variant declaration also - `<button class="el-variant primary">`
5. **Hard Boundaries**:
   - **NO in-component `<style>` blocks**: Components must remain pure markup and logic.
   - **NO inline `style="..."` attributes**: Inline styles are unconstrained ad-hoc CSS.
   - **NO raw hex colors (`#hex`)**: Every color must resolve through semantic tokens (`var(--bg)`, `var(--text-primary)`, `var(--border)`, etc.).
   - **NO arbitrary pixel dimensions (>2px)**: Literal pixels bypass the dimension ladder. Only 1-2px (borders, hairlines) may be literal.
   - **NO child combinators**: Selectors are plain descendants (`> *` is forbidden — the `.reel` rail is the single sanctioned exception).
   - **Icons come from `fractalicons`**: never inline SVG or unicode glyphs.
6. **Mandatory Verification**:
   Before claiming task completion, always execute:
   ```bash
   pnpm lint
   pnpm check
   ```
   Both checks must pass with 0 errors.


## Progressive Discovery Index

| Styling Task | File to Inspect | Responsibility |
|:---|:---|:---|
| Active files and cascade order | `src/lib/styles/index.sass` | Master composition contract. |
| Colors, semantic tokens, dark mode | `src/lib/styles/_00_tokens.sass` | Design token source of truth. |
| Global resets and typography defaults | `src/lib/styles/_01_base.sass` | Low-specificity element defaults. |
| Spacing, gaps, padding, dimensions | `src/lib/styles/_02_dimensions.sass` | L1 spacing & dimension ladders. |
| Text sizes, roles, weights, tracking | `src/lib/styles/_03_typography.sass` | L5 typography primitives, roles, and modifiers. |
| Flex/grid containers, axis alignment, responsive grids | `src/lib/styles/_04_containers.sass` | L2 structural containers plus the L3 grid/frame/reel helpers. |
| Cards, chips, page furniture | `src/lib/styles/_05_layouts.sass` | L3 `.card`, `.chip`, `.nav-section`, `.page-header`, form wrappers. |
| Page frames, headers, sidebars, rails | `src/lib/styles/_06_shells.sass` | L4 application shell hierarchy. |
| Buttons, links, pills, states | `src/lib/styles/_07_interactions.sass` | L5 orthogonal interactive elements. |
| Backgrounds, ink, shadows, borders | `src/lib/styles/_08_visuals.sass` | L5 surface styling & decorative treatments. |
| Project-specific third-party overrides | `src/lib/styles/_09_own.sass` | Sanctioned extension point. |
| The attribute axes | `src/lib/styles/_10_propped.sass` | L6 `.el-variant`, `.el-shape`, `.el-size`, `.el-pad`, `.el-shadow`, `.el-vss`. |

## Handling Coverage Gaps

If a visual requirement cannot be expressed with existing canonical classes:
1. Do NOT write an ad-hoc inline style or component `<style>` block.
2. Check if an existing token in `_00_tokens.sass` can be composed.
3. If genuine new utility or shell class is required, add it to the designated layer partial in `src/lib/styles` with a trailing `// description` comment and run `pnpm registry`.
4. If it is a project-specific extension, declare it in `_09_own.sass`.
