# Fractalstyler — Class Registry

> GENERATED FILE — do not edit. Emitted by `scripts/update-registry.ts` from the
> stylesheets in `src/lib/styles`.

**486 classes** across **14 stylesheets**, riding **396 tokens**.

These classes are the entire public API. There is no authoring mixin and no
styling function — `+stack`, `+surface`, `space()` and their friends do not
exist. Compose in markup.

Every class is concrete: the space families (`.gap` `.rgap` `.cgap` `.pad`
`.px` `.py` `.pt` `.pr` `.pb` `.pl` `.mar` `.mx` `.my` `.mt` `.mr` `.mb` `.ml`)
each run the eight steps `xs sm md bs lg xl 2xl 3xl`, token-routed through
`var(--space-*)`. A modifier rides its base (`.box.xcenter`); a child carries
its own name and names its parent (`.avatar-more` inside `.avatar-group`).


---

## configurations.css

Global tokens and base resets — layout dimensions, z-index bands, font stacks, and the element resets every page starts from.

| Class | Property | Description |
|:---|:---|:---|
| `.bdr` | `border: 1px solid red` | Debug outline — flags an element on screen with a border |

---

## gaps-pads-margins.css

The space ladder. Every family runs the eight steps xs sm md bs lg xl 2xl 3xl and rides var(--space-*).

| Class | Property | Description |
|:---|:---|:---|
| `.gap-xs` | `gap: var(--space-xs)` | Gap on both axes (flex/grid) at the xs step — rides --space-xs |
| `.gap-sm` | `gap: var(--space-sm)` | Gap on both axes (flex/grid) at the sm step — rides --space-sm |
| `.gap-md` | `gap: var(--space-md)` | Gap on both axes (flex/grid) at the md step — rides --space-md |
| `.gap-bs` | `gap: var(--space-bs)` | Gap on both axes (flex/grid) at the bs step — rides --space-bs |
| `.gap-lg` | `gap: var(--space-lg)` | Gap on both axes (flex/grid) at the lg step — rides --space-lg |
| `.gap-xl` | `gap: var(--space-xl)` | Gap on both axes (flex/grid) at the xl step — rides --space-xl |
| `.gap-2xl` | `gap: var(--space-2xl)` | Gap on both axes (flex/grid) at the 2xl step — rides --space-2xl |
| `.gap-3xl` | `gap: var(--space-3xl)` | Gap on both axes (flex/grid) at the 3xl step — rides --space-3xl |
| `.rgap-xs` | `row-gap: var(--space-xs)` | Row gap (block axis) at the xs step — rides --space-xs |
| `.rgap-sm` | `row-gap: var(--space-sm)` | Row gap (block axis) at the sm step — rides --space-sm |
| `.rgap-md` | `row-gap: var(--space-md)` | Row gap (block axis) at the md step — rides --space-md |
| `.rgap-bs` | `row-gap: var(--space-bs)` | Row gap (block axis) at the bs step — rides --space-bs |
| `.rgap-lg` | `row-gap: var(--space-lg)` | Row gap (block axis) at the lg step — rides --space-lg |
| `.rgap-xl` | `row-gap: var(--space-xl)` | Row gap (block axis) at the xl step — rides --space-xl |
| `.rgap-2xl` | `row-gap: var(--space-2xl)` | Row gap (block axis) at the 2xl step — rides --space-2xl |
| `.rgap-3xl` | `row-gap: var(--space-3xl)` | Row gap (block axis) at the 3xl step — rides --space-3xl |
| `.cgap-xs` | `column-gap: var(--space-xs)` | Column gap (inline axis) at the xs step — rides --space-xs |
| `.cgap-sm` | `column-gap: var(--space-sm)` | Column gap (inline axis) at the sm step — rides --space-sm |
| `.cgap-md` | `column-gap: var(--space-md)` | Column gap (inline axis) at the md step — rides --space-md |
| `.cgap-bs` | `column-gap: var(--space-bs)` | Column gap (inline axis) at the bs step — rides --space-bs |
| `.cgap-lg` | `column-gap: var(--space-lg)` | Column gap (inline axis) at the lg step — rides --space-lg |
| `.cgap-xl` | `column-gap: var(--space-xl)` | Column gap (inline axis) at the xl step — rides --space-xl |
| `.cgap-2xl` | `column-gap: var(--space-2xl)` | Column gap (inline axis) at the 2xl step — rides --space-2xl |
| `.cgap-3xl` | `column-gap: var(--space-3xl)` | Column gap (inline axis) at the 3xl step — rides --space-3xl |
| `.pad-xs` | `padding: var(--space-xs)` | Padding on all four sides at the xs step — rides --space-xs |
| `.pad-sm` | `padding: var(--space-sm)` | Padding on all four sides at the sm step — rides --space-sm |
| `.pad-md` | `padding: var(--space-md)` | Padding on all four sides at the md step — rides --space-md |
| `.pad-bs` | `padding: var(--space-bs)` | Padding on all four sides at the bs step — rides --space-bs |
| `.pad-lg` | `padding: var(--space-lg)` | Padding on all four sides at the lg step — rides --space-lg |
| `.pad-xl` | `padding: var(--space-xl)` | Padding on all four sides at the xl step — rides --space-xl |
| `.pad-2xl` | `padding: var(--space-2xl)` | Padding on all four sides at the 2xl step — rides --space-2xl |
| `.pad-3xl` | `padding: var(--space-3xl)` | Padding on all four sides at the 3xl step — rides --space-3xl |
| `.px-xs` | `padding-inline: var(--space-xs)` | Inline (horizontal) padding at the xs step — rides --space-xs |
| `.px-sm` | `padding-inline: var(--space-sm)` | Inline (horizontal) padding at the sm step — rides --space-sm |
| `.px-md` | `padding-inline: var(--space-md)` | Inline (horizontal) padding at the md step — rides --space-md |
| `.px-bs` | `padding-inline: var(--space-bs)` | Inline (horizontal) padding at the bs step — rides --space-bs |
| `.px-lg` | `padding-inline: var(--space-lg)` | Inline (horizontal) padding at the lg step — rides --space-lg |
| `.px-xl` | `padding-inline: var(--space-xl)` | Inline (horizontal) padding at the xl step — rides --space-xl |
| `.px-2xl` | `padding-inline: var(--space-2xl)` | Inline (horizontal) padding at the 2xl step — rides --space-2xl |
| `.px-3xl` | `padding-inline: var(--space-3xl)` | Inline (horizontal) padding at the 3xl step — rides --space-3xl |
| `.py-xs` | `padding-block: var(--space-xs)` | Block (vertical) padding at the xs step — rides --space-xs |
| `.py-sm` | `padding-block: var(--space-sm)` | Block (vertical) padding at the sm step — rides --space-sm |
| `.py-md` | `padding-block: var(--space-md)` | Block (vertical) padding at the md step — rides --space-md |
| `.py-bs` | `padding-block: var(--space-bs)` | Block (vertical) padding at the bs step — rides --space-bs |
| `.py-lg` | `padding-block: var(--space-lg)` | Block (vertical) padding at the lg step — rides --space-lg |
| `.py-xl` | `padding-block: var(--space-xl)` | Block (vertical) padding at the xl step — rides --space-xl |
| `.py-2xl` | `padding-block: var(--space-2xl)` | Block (vertical) padding at the 2xl step — rides --space-2xl |
| `.py-3xl` | `padding-block: var(--space-3xl)` | Block (vertical) padding at the 3xl step — rides --space-3xl |
| `.pt-xs` | `padding-top: var(--space-xs)` | Top padding at the xs step — rides --space-xs |
| `.pt-sm` | `padding-top: var(--space-sm)` | Top padding at the sm step — rides --space-sm |
| `.pt-md` | `padding-top: var(--space-md)` | Top padding at the md step — rides --space-md |
| `.pt-bs` | `padding-top: var(--space-bs)` | Top padding at the bs step — rides --space-bs |
| `.pt-lg` | `padding-top: var(--space-lg)` | Top padding at the lg step — rides --space-lg |
| `.pt-xl` | `padding-top: var(--space-xl)` | Top padding at the xl step — rides --space-xl |
| `.pt-2xl` | `padding-top: var(--space-2xl)` | Top padding at the 2xl step — rides --space-2xl |
| `.pt-3xl` | `padding-top: var(--space-3xl)` | Top padding at the 3xl step — rides --space-3xl |
| `.pr-xs` | `padding-right: var(--space-xs)` | Right padding at the xs step — rides --space-xs |
| `.pr-sm` | `padding-right: var(--space-sm)` | Right padding at the sm step — rides --space-sm |
| `.pr-md` | `padding-right: var(--space-md)` | Right padding at the md step — rides --space-md |
| `.pr-bs` | `padding-right: var(--space-bs)` | Right padding at the bs step — rides --space-bs |
| `.pr-lg` | `padding-right: var(--space-lg)` | Right padding at the lg step — rides --space-lg |
| `.pr-xl` | `padding-right: var(--space-xl)` | Right padding at the xl step — rides --space-xl |
| `.pr-2xl` | `padding-right: var(--space-2xl)` | Right padding at the 2xl step — rides --space-2xl |
| `.pr-3xl` | `padding-right: var(--space-3xl)` | Right padding at the 3xl step — rides --space-3xl |
| `.pb-xs` | `padding-bottom: var(--space-xs)` | Bottom padding at the xs step — rides --space-xs |
| `.pb-sm` | `padding-bottom: var(--space-sm)` | Bottom padding at the sm step — rides --space-sm |
| `.pb-md` | `padding-bottom: var(--space-md)` | Bottom padding at the md step — rides --space-md |
| `.pb-bs` | `padding-bottom: var(--space-bs)` | Bottom padding at the bs step — rides --space-bs |
| `.pb-lg` | `padding-bottom: var(--space-lg)` | Bottom padding at the lg step — rides --space-lg |
| `.pb-xl` | `padding-bottom: var(--space-xl)` | Bottom padding at the xl step — rides --space-xl |
| `.pb-2xl` | `padding-bottom: var(--space-2xl)` | Bottom padding at the 2xl step — rides --space-2xl |
| `.pb-3xl` | `padding-bottom: var(--space-3xl)` | Bottom padding at the 3xl step — rides --space-3xl |
| `.pl-xs` | `padding-left: var(--space-xs)` | Left padding at the xs step — rides --space-xs |
| `.pl-sm` | `padding-left: var(--space-sm)` | Left padding at the sm step — rides --space-sm |
| `.pl-md` | `padding-left: var(--space-md)` | Left padding at the md step — rides --space-md |
| `.pl-bs` | `padding-left: var(--space-bs)` | Left padding at the bs step — rides --space-bs |
| `.pl-lg` | `padding-left: var(--space-lg)` | Left padding at the lg step — rides --space-lg |
| `.pl-xl` | `padding-left: var(--space-xl)` | Left padding at the xl step — rides --space-xl |
| `.pl-2xl` | `padding-left: var(--space-2xl)` | Left padding at the 2xl step — rides --space-2xl |
| `.pl-3xl` | `padding-left: var(--space-3xl)` | Left padding at the 3xl step — rides --space-3xl |
| `.mar-xs` | `margin: var(--space-xs)` | Margin on all four sides at the xs step — rides --space-xs |
| `.mar-sm` | `margin: var(--space-sm)` | Margin on all four sides at the sm step — rides --space-sm |
| `.mar-md` | `margin: var(--space-md)` | Margin on all four sides at the md step — rides --space-md |
| `.mar-bs` | `margin: var(--space-bs)` | Margin on all four sides at the bs step — rides --space-bs |
| `.mar-lg` | `margin: var(--space-lg)` | Margin on all four sides at the lg step — rides --space-lg |
| `.mar-xl` | `margin: var(--space-xl)` | Margin on all four sides at the xl step — rides --space-xl |
| `.mar-2xl` | `margin: var(--space-2xl)` | Margin on all four sides at the 2xl step — rides --space-2xl |
| `.mar-3xl` | `margin: var(--space-3xl)` | Margin on all four sides at the 3xl step — rides --space-3xl |
| `.mx-xs` | `margin-inline: var(--space-xs)` | Inline (horizontal) margin at the xs step — rides --space-xs |
| `.mx-sm` | `margin-inline: var(--space-sm)` | Inline (horizontal) margin at the sm step — rides --space-sm |
| `.mx-md` | `margin-inline: var(--space-md)` | Inline (horizontal) margin at the md step — rides --space-md |
| `.mx-bs` | `margin-inline: var(--space-bs)` | Inline (horizontal) margin at the bs step — rides --space-bs |
| `.mx-lg` | `margin-inline: var(--space-lg)` | Inline (horizontal) margin at the lg step — rides --space-lg |
| `.mx-xl` | `margin-inline: var(--space-xl)` | Inline (horizontal) margin at the xl step — rides --space-xl |
| `.mx-2xl` | `margin-inline: var(--space-2xl)` | Inline (horizontal) margin at the 2xl step — rides --space-2xl |
| `.mx-3xl` | `margin-inline: var(--space-3xl)` | Inline (horizontal) margin at the 3xl step — rides --space-3xl |
| `.my-xs` | `margin-block: var(--space-xs)` | Block (vertical) margin at the xs step — rides --space-xs |
| `.my-sm` | `margin-block: var(--space-sm)` | Block (vertical) margin at the sm step — rides --space-sm |
| `.my-md` | `margin-block: var(--space-md)` | Block (vertical) margin at the md step — rides --space-md |
| `.my-bs` | `margin-block: var(--space-bs)` | Block (vertical) margin at the bs step — rides --space-bs |
| `.my-lg` | `margin-block: var(--space-lg)` | Block (vertical) margin at the lg step — rides --space-lg |
| `.my-xl` | `margin-block: var(--space-xl)` | Block (vertical) margin at the xl step — rides --space-xl |
| `.my-2xl` | `margin-block: var(--space-2xl)` | Block (vertical) margin at the 2xl step — rides --space-2xl |
| `.my-3xl` | `margin-block: var(--space-3xl)` | Block (vertical) margin at the 3xl step — rides --space-3xl |
| `.mt-xs` | `margin-top: var(--space-xs)` | Top margin at the xs step — rides --space-xs |
| `.mt-sm` | `margin-top: var(--space-sm)` | Top margin at the sm step — rides --space-sm |
| `.mt-md` | `margin-top: var(--space-md)` | Top margin at the md step — rides --space-md |
| `.mt-bs` | `margin-top: var(--space-bs)` | Top margin at the bs step — rides --space-bs |
| `.mt-lg` | `margin-top: var(--space-lg)` | Top margin at the lg step — rides --space-lg |
| `.mt-xl` | `margin-top: var(--space-xl)` | Top margin at the xl step — rides --space-xl |
| `.mt-2xl` | `margin-top: var(--space-2xl)` | Top margin at the 2xl step — rides --space-2xl |
| `.mt-3xl` | `margin-top: var(--space-3xl)` | Top margin at the 3xl step — rides --space-3xl |
| `.mr-xs` | `margin-right: var(--space-xs)` | Right margin at the xs step — rides --space-xs |
| `.mr-sm` | `margin-right: var(--space-sm)` | Right margin at the sm step — rides --space-sm |
| `.mr-md` | `margin-right: var(--space-md)` | Right margin at the md step — rides --space-md |
| `.mr-bs` | `margin-right: var(--space-bs)` | Right margin at the bs step — rides --space-bs |
| `.mr-lg` | `margin-right: var(--space-lg)` | Right margin at the lg step — rides --space-lg |
| `.mr-xl` | `margin-right: var(--space-xl)` | Right margin at the xl step — rides --space-xl |
| `.mr-2xl` | `margin-right: var(--space-2xl)` | Right margin at the 2xl step — rides --space-2xl |
| `.mr-3xl` | `margin-right: var(--space-3xl)` | Right margin at the 3xl step — rides --space-3xl |
| `.mb-xs` | `margin-bottom: var(--space-xs)` | Bottom margin at the xs step — rides --space-xs |
| `.mb-sm` | `margin-bottom: var(--space-sm)` | Bottom margin at the sm step — rides --space-sm |
| `.mb-md` | `margin-bottom: var(--space-md)` | Bottom margin at the md step — rides --space-md |
| `.mb-bs` | `margin-bottom: var(--space-bs)` | Bottom margin at the bs step — rides --space-bs |
| `.mb-lg` | `margin-bottom: var(--space-lg)` | Bottom margin at the lg step — rides --space-lg |
| `.mb-xl` | `margin-bottom: var(--space-xl)` | Bottom margin at the xl step — rides --space-xl |
| `.mb-2xl` | `margin-bottom: var(--space-2xl)` | Bottom margin at the 2xl step — rides --space-2xl |
| `.mb-3xl` | `margin-bottom: var(--space-3xl)` | Bottom margin at the 3xl step — rides --space-3xl |
| `.ml-xs` | `margin-left: var(--space-xs)` | Left margin at the xs step — rides --space-xs |
| `.ml-sm` | `margin-left: var(--space-sm)` | Left margin at the sm step — rides --space-sm |
| `.ml-md` | `margin-left: var(--space-md)` | Left margin at the md step — rides --space-md |
| `.ml-bs` | `margin-left: var(--space-bs)` | Left margin at the bs step — rides --space-bs |
| `.ml-lg` | `margin-left: var(--space-lg)` | Left margin at the lg step — rides --space-lg |
| `.ml-xl` | `margin-left: var(--space-xl)` | Left margin at the xl step — rides --space-xl |
| `.ml-2xl` | `margin-left: var(--space-2xl)` | Left margin at the 2xl step — rides --space-2xl |
| `.ml-3xl` | `margin-left: var(--space-3xl)` | Left margin at the 3xl step — rides --space-3xl |

---

## shapes-sizes.css

Radius and control-height ladders, plus the sizing utilities (full, min0, fitted).

| Class | Property | Description |
|:---|:---|:---|
| `.rect` | `border-radius: 0` | Shape prop — square corners |
| `.mincurved` | `border-radius: var(--radius-sm)` | Shape prop — a small radius |
| `.modern` | `border-radius: var(--radius-md)` | Shape prop — the default radius |
| `.curved` | `border-radius: var(--radius-bs)` | Shape prop — a large radius |
| `.round` | `border-radius: var(--radius-full)` | Shape prop — fully round |
| `.radius-xs` | `border-radius: var(--radius-xs)` | Corner radius at the xs step — rides --radius-xs |
| `.radius-sm` | `border-radius: var(--radius-sm)` | Corner radius at the sm step — rides --radius-sm |
| `.radius-md` | `border-radius: var(--radius-md)` | Corner radius at the md step — rides --radius-md |
| `.radius-bs` | `border-radius: var(--radius-bs)` | Corner radius at the bs step — rides --radius-bs |
| `.radius-lg` | `border-radius: var(--radius-lg)` | Corner radius at the lg step — rides --radius-lg |
| `.radius-full` | `border-radius: var(--radius-full)` | Corner radius at the full step — rides --radius-full |
| `.h-xs` | `height: var(--h-xs)` | Control height at the xs step — rides --h-xs |
| `.h-sm` | `height: var(--h-sm)` | Control height at the sm step — rides --h-sm |
| `.h-md` | `height: var(--h-md)` | Control height at the md step — rides --h-md |
| `.h-bs` | `height: var(--h-bs)` | Control height at the bs step — rides --h-bs |
| `.h-lg` | `height: var(--h-lg)` | Control height at the lg step — rides --h-lg |
| `.h-xl` | `height: var(--h-xl)` | Control height at the xl step — rides --h-xl |
| `.h-2xl` | `height: var(--h-2xl)` | Control height at the 2xl step — rides --h-2xl |
| `.h-3xl` | `height: var(--h-3xl)` | Control height at the 3xl step — rides --h-3xl |
| `.wfull` | `width: 100%` | Full width |
| `.hfull` | `height: 100%` | Full height |
| `.wmax` | `width: max-content` | Max width |
| `.hmax` | `height: max-content` | Max height |
| `.full` | `width: 100%; height: 100%` | Full width and height |
| `.wmin0` | `min-width: 0` | Zero min-width |
| `.hmin0` | `min-height: 0` | Zero min-height |
| `.min0` | `min-width: 0; min-height: 0` | Zero min-width and min-height |
| `.hfull-dvh` | `min-height: 100dvh` | Full viewport height |
| `.hfull-fitted` | `min-height: calc(100dvh - var(--header-height) - var(--footer-height))` | Full viewport height, fitted between the header and the footer |

---

## containers.css

The structural foundations — .box, .row and .grid with their axis modifiers — plus positioning, scrolling, grid steps and frames.

| Class | Property | Description |
|:---|:---|:---|
| `.box` | `display: flex; flex-direction: column` | Flex column container — the vertical structural foundation |
| `.column` | `display: flex; flex-direction: column` | Flex column container — the vertical structural foundation |
| `.xcenter` | `align-items: center; text-align: center` | align-items: center — modifier of .box |
| `.xleft` | `align-items: flex-start; text-align: left` | align-items: flex-start — modifier of .box |
| `.xright` | `align-items: flex-end; text-align: right` | align-items: flex-end — modifier of .box |
| `.ycenter` | `justify-content: center` | justify-content: center — modifier of .box |
| `.ytop` | `justify-content: flex-start` | justify-content: flex-start — modifier of .box |
| `.ybot` | `justify-content: flex-end` | justify-content: flex-end — modifier of .box |
| `.ybetween` | `justify-content: space-between` | justify-content: space-between — modifier of .box |
| `.yevenly` | `justify-content: space-evenly` | justify-content: space-evenly — modifier of .box |
| `.yaround` | `justify-content: space-around` | justify-content: space-around — modifier of .box |
| `.row` | `display: flex; flex-direction: row` | Flex row container — the horizontal structural foundation |
| `.xbetween` | `justify-content: space-between` | justify-content: space-between — modifier of .row |
| `.xevenly` | `justify-content: space-evenly` | justify-content: space-evenly — modifier of .row |
| `.xaround` | `justify-content: space-around` | justify-content: space-around — modifier of .row |
| `.grid` | `display: grid` | CSS grid container — the third structural foundation |
| `.grid-2` | `display: grid` | Grid with 2 columns |
| `.grid-3` | `display: grid` | Grid with 3 columns |
| `.grid-4` | `display: grid` | Grid with 4 columns |
| `.grid-5` | `display: grid` | Grid with 5 columns |
| `.grid-6` | `display: grid` | Grid with 6 columns |
| `.center` | `place-items: center` | place-items: center — modifier of .grid |
| `.xstretch` | `justify-items: stretch` | justify-items: stretch — modifier of .grid |
| `.ystretch` | `align-items: stretch` | align-items: stretch — modifier of .grid |
| `.grid-1` | `display: grid; grid-template-columns: repeat(1, minmax(0, 1fr))` | Grid with 1 columns |
| `.cspan-1` | `grid-column: span 1` | Span 1 grid columns |
| `.cspan-2` | `grid-column: span 2` | Span 2 grid columns |
| `.cspan-3` | `grid-column: span 3` | Span 3 grid columns |
| `.cspan-4` | `grid-column: span 4` | Span 4 grid columns |
| `.cspan-5` | `grid-column: span 5` | Span 5 grid columns |
| `.cspan-6` | `grid-column: span 6` | Span 6 grid columns |
| `.cspan-7` | `grid-column: span 7` | Span 7 grid columns |
| `.cspan-8` | `grid-column: span 8` | Span 8 grid columns |
| `.card-grid` | `display: grid; grid-template-columns: repeat(auto-fit, minmax(min(var(--card-min), 100%), 1fr))` | Auto-fit card grid — the column count negotiates the width |
| `.wrap` | `flex-wrap: wrap` | Allow flex wrapping |
| `.grow` | `flex: 1 1 0%` | Flex grow — take the remaining space (flex: 1 1 0%) |
| `.shrink-0` | `flex-shrink: 0` | Never shrink below the content size |
| `.relative` | `position: relative` | position: relative — the anchor for absolute children |
| `.absolute` | `position: absolute` | position: absolute |
| `.fixed` | `position: fixed` | position: fixed |
| `.sticky` | `position: sticky` | position: sticky |
| `.z-sticky` | `z-index: var(--z-sticky)` | z-index: var(--z-sticky) |
| `.z-raised` | `z-index: var(--z-raised)` | z-index: var(--z-raised) |
| `.z-modal` | `z-index: var(--z-modal)` | z-index: var(--z-modal) |
| `.z-toast` | `z-index: var(--z-toast)` | z-index: var(--z-toast) |
| `.scroll-y` | `overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain` | Scroll vertically |
| `.scroll-x` | `overflow-x: auto; overflow-y: hidden; overscroll-behavior: contain` | Scroll horizontally |
| `.prose` | `max-width: var(--prose-clamp); margin-inline: auto; display: flex; flex-direction: column; gap: var(--space-sm)` | Reading measure — a clamped content width |
| `.prose-left` | `max-width: var(--prose-clamp); margin-right: auto; display: flex; flex-direction: column; gap: var(--space-sm)` | Reading measure, aligned to the start edge |
| `.frame-16-9` | `aspect-ratio: 16 / 9; overflow: hidden; position: relative` | aspect-ratio: 16 / 9 |
| `.frame-9-16` | `aspect-ratio: 9 / 16; overflow: hidden; position: relative` | aspect-ratio: 9 / 16 |
| `.frame-4-3` | `aspect-ratio: 4 / 3; overflow: hidden; position: relative` | aspect-ratio: 4 / 3 |
| `.frame-3-4` | `aspect-ratio: 3 / 4; overflow: hidden; position: relative` | aspect-ratio: 3 / 4 |
| `.frame-3-2` | `aspect-ratio: 3 / 2; overflow: hidden; position: relative` | aspect-ratio: 3 / 2 |
| `.frame-2-3` | `aspect-ratio: 2 / 3; overflow: hidden; position: relative` | aspect-ratio: 2 / 3 |
| `.frame-1-1` | `aspect-ratio: 1 / 1; overflow: hidden; position: relative` | aspect-ratio: 1 / 1 |
| `.reel` | `display: flex; flex-direction: row; overflow-x: auto; overscroll-behavior-inline: contain; scroll-snap-type: inline mandatory` | Scroll-snap rail — the children snap to the rail |
| `.inline` | `display: inline` | display: inline |
| `.block` | `display: block` | display: block |
| `.inline-block` | `display: inline-block` | display: inline-block |
| `.inline-flex` | `display: inline-flex` | display: inline-flex |
| `.contents` | `display: contents` | display: contents — the box disappears, the children remain |
| `.inline-grid` | `display: inline-grid` | display: inline-grid |
| `.table` | `display: table` | display: table |
| `.display-none` | `display: none` | display: none |
| `.overflow-hidden` | `overflow: hidden` | Clip the overflow |
| `.overflow-visible` | `overflow: visible` | Let the overflow show |
| `.isolate` | `isolation: isolate` | Create a stacking context |

---

## typography.css

Type scale, semantic text roles, weight, line height, letter spacing and alignment.

| Class | Property | Description |
|:---|:---|:---|
| `.text-xs` | `font-size: var(--text-xs)` | Text size at the xs step — rides --text-xs |
| `.text-sm` | `font-size: var(--text-sm)` | Text size at the sm step — rides --text-sm |
| `.text-md` | `font-size: var(--text-md)` | Text size at the md step — rides --text-md |
| `.text-bs` | `font-size: var(--text-bs)` | Text size at the bs step — rides --text-bs |
| `.text-lg` | `font-size: var(--text-lg)` | Text size at the lg step — rides --text-lg |
| `.text-xl` | `font-size: var(--text-xl)` | Text size at the xl step — rides --text-xl |
| `.text-2xl` | `font-size: var(--text-2xl)` | Text size at the 2xl step — rides --text-2xl |
| `.text-3xl` | `font-size: var(--text-3xl)` | Text size at the 3xl step — rides --text-3xl |
| `.text-4xl` | `font-size: var(--text-4xl)` | Text size at the 4xl step — rides --text-4xl |
| `.text-5xl` | `font-size: var(--text-5xl)` | Text size at the 5xl step — rides --text-5xl |
| `.text-body` | `font-size: var(--text-bs); line-height: 1.5` | Body copy at the base size |
| `.text-body-lg` | `font-size: var(--text-lg); line-height: 1.5` | Body copy at the large size |
| `.text-body-sm` | `font-size: var(--text-sm); line-height: 1.5` | Body copy at the small size |
| `.page-title` | `font-size: var(--text-3xl); line-height: 1.1; font-weight: 700; letter-spacing: -0.02rem` | Page title — the largest type on the page |
| `.page-desc` | `font-size: var(--text-md)` | Page description — large and airy |
| `.page-heading-xl` | `font-size: var(--text-xl); line-height: 1.1; font-weight: 600; letter-spacing: -0.03rem` | Page heading, xl rung |
| `.page-heading-lg` | `font-size: var(--text-lg); line-height: 1.1; font-weight: 600; letter-spacing: -0.03rem` | Page heading, lg rung |
| `.page-heading-bs` | `font-size: var(--text-bs); line-height: 1.1; font-weight: 600; letter-spacing: -0.02rem` | Page heading, base rung |
| `.card-title` | `font-size: var(--text-lg); font-weight: 600; line-height: 1.2` | Card title |
| `.card-desc` | `font-size: var(--text-md); line-height: 1.2` | Card description |
| `.nav-link` | `font-size: var(--text-md); line-height: 1.2; letter-spacing: 0.01rem` | Nav link — padded, curved, filled on hover |
| `.nav-link-sm` | `font-size: var(--text-sm); line-height: 1.2` | font-size: var(--text-sm) |
| `.nav-header` | `font-size: var(--text-sm); line-height: 1.1; font-weight: 500; padding: var(--space-sm)` | Nav group header |
| `.lh11` | `line-height: 1.1` | Line height 1.1 |
| `.lh12` | `line-height: 1.2` | Line height 1.2 |
| `.lh13` | `line-height: 1.3` | Line height 1.3 |
| `.lh14` | `line-height: 1.4` | Line height 1.4 |
| `.lh15` | `line-height: 1.5` | Line height 1.5 |
| `.lh16` | `line-height: 1.6` | Line height 1.6 |
| `.ls-tight-bs` | `letter-spacing: -0.01rem` | Tight letter spacing at the bs step |
| `.ls-tight-lg` | `letter-spacing: -0.02rem` | Tight letter spacing at the lg step |
| `.ls-tight-xl` | `letter-spacing: -0.03rem` | Tight letter spacing at the xl step |
| `.ls-wide-bs` | `letter-spacing: 0.01rem` | Wide letter spacing at the bs step |
| `.ls-wide-lg` | `letter-spacing: 0.02rem` | Wide letter spacing at the lg step |
| `.ls-wide-xl` | `letter-spacing: 0.03rem` | Wide letter spacing at the xl step |
| `.weight-300` | `font-weight: 300` | Font weight 300 |
| `.weight-400` | `font-weight: 400` | Font weight 400 |
| `.weight-500` | `font-weight: 500` | Font weight 500 |
| `.weight-600` | `font-weight: 600` | Font weight 600 |
| `.weight-700` | `font-weight: 700` | Font weight 700 |
| `.weight-800` | `font-weight: 800` | Font weight 800 |
| `.tt-u` | `text-transform: uppercase` | Text transform — uppercase |
| `.tt-c` | `text-transform: capitalize` | Text transform — capitalize |
| `.ta-c` | `text-align: center` | Text align — centre |
| `.ta-l` | `text-align: left` | Text align — left |
| `.ta-r` | `text-align: right` | Text align — right |
| `.mleft` | `text-align: left` | Keep the reading measure on the left when the text is centred |
| `.truncate` | `overflow: hidden; white-space: nowrap; text-overflow: ellipsis` | One-line ellipsis truncation |
| `.font-sans` | `font-family: var(--font-sans)` | The sans font stack |
| `.font-mono` | `font-family: var(--font-mono)` | The monospace font stack |
| `.doc-element` | `margin-bottom: 1.5rem` | An element inside prose content |
| `.prose-content` | — | Prose content — the reading measure of a long text |
| `.header-nav` | — | .header-nav rule |

---

## border-elevation-focus.css

The partition-law border set (per side, three weights), elevation steps and the focus rings.

| Class | Property | Description |
|:---|:---|:---|
| `.border` | `border: 1px solid var(--border)` | Full border at the standard weight |
| `.border-subtle` | `border: 1px solid var(--border-subtle)` | Full border at the subtle weight |
| `.border-strong` | `border: 1px solid var(--border-strong)` | Full border at the strong weight |
| `.bt` | `border-top: 1px solid var(--border)` | border-top: 1px solid var(--border) |
| `.br` | `border-right: 1px solid var(--border)` | border-right: 1px solid var(--border) |
| `.bb` | `border-bottom: 1px solid var(--border)` | border-bottom: 1px solid var(--border) |
| `.bl` | `border-left: 1px solid var(--border)` | border-left: 1px solid var(--border) |
| `.bt-str` | `border-top: 1px solid var(--border-strong)` | border-top: 1px solid var(--border-strong) |
| `.br-str` | `border-right: 1px solid var(--border-strong)` | border-right: 1px solid var(--border-strong) |
| `.bb-str` | `border-bottom: 1px solid var(--border-strong)` | border-bottom: 1px solid var(--border-strong) |
| `.bl-str` | `border-left: 1px solid var(--border-strong)` | border-left: 1px solid var(--border-strong) |
| `.bt-sub` | `border-top: 1px solid var(--border-subtle)` | border-top: 1px solid var(--border-subtle) |
| `.br-sub` | `border-right: 1px solid var(--border-subtle)` | border-right: 1px solid var(--border-subtle) |
| `.bb-sub` | `border-bottom: 1px solid var(--border-subtle)` | border-bottom: 1px solid var(--border-subtle) |
| `.bl-sub` | `border-left: 1px solid var(--border-subtle)` | border-left: 1px solid var(--border-subtle) |
| `.shad-xs` | `box-shadow: var(--shadow-xs)` | Elevation at the xs step — rides --shadow-xs |
| `.shad-sm` | `box-shadow: var(--shadow-sm)` | Elevation at the sm step — rides --shadow-sm |
| `.shad-md` | `box-shadow: var(--shadow-md)` | Elevation at the md step — rides --shadow-md |
| `.shad-bs` | `box-shadow: var(--shadow-bs)` | Elevation at the bs step — rides --shadow-bs |
| `.shad-lg` | `box-shadow: var(--shadow-lg)` | Elevation at the lg step — rides --shadow-lg |
| `.shad-xl` | `box-shadow: var(--shadow-xl)` | Elevation at the xl step — rides --shadow-xl |
| `.shad-2xl` | `box-shadow: var(--shadow-2xl)` | Elevation at the 2xl step — rides --shadow-2xl |
| `.shad-3xl` | `box-shadow: var(--shadow-3xl)` | Elevation at the 3xl step — rides --shadow-3xl |
| `.shad-hover-xs` | `box-shadow: var(--shadow-xs)` | Elevation on hover at the xs step — rides --shadow-xs |
| `.shad-hover-sm` | `box-shadow: var(--shadow-sm)` | Elevation on hover at the sm step — rides --shadow-sm |
| `.shad-hover-md` | `box-shadow: var(--shadow-md)` | Elevation on hover at the md step — rides --shadow-md |
| `.shad-hover-bs` | `box-shadow: var(--shadow-bs)` | Elevation on hover at the bs step — rides --shadow-bs |
| `.shad-hover-lg` | `box-shadow: var(--shadow-lg)` | Elevation on hover at the lg step — rides --shadow-lg |
| `.shad-hover-xl` | `box-shadow: var(--shadow-xl)` | Elevation on hover at the xl step — rides --shadow-xl |
| `.shad-hover-2xl` | `box-shadow: var(--shadow-2xl)` | Elevation on hover at the 2xl step — rides --shadow-2xl |
| `.shad-hover-3xl` | `box-shadow: var(--shadow-3xl)` | Elevation on hover at the 3xl step — rides --shadow-3xl |
| `.focus-ring` | `outline: 2px solid var(--ring); outline-offset: 1px` | The default focus ring |
| `.focus-theme` | `outline: 2px solid var(--theme-color); outline-offset: 2px` | A focus ring in the theme colour |
| `.focus-none` | `outline: none` | No focus ring |

---

## layout-shell.css

Application chrome — header, main, sidebars, footer and the content widths.

| Class | Property | Description |
|:---|:---|:---|
| `.app-shell` | `display: flex; flex-direction: column; position: relative; min-height: 100vh` | Application shell root — flex column, full height, hosts the header, main and footer |
| `.app-header` | `display: flex; flex-direction: row; align-items: center; position: sticky; top: 0; z-index: var(--z-sticky); height: var(--header-height); padding-inline: var(--app-…` | Sticky application header |
| `.clamped` | `width: var(--content-clamp); margin-inline: auto` | Clamp to the content width and centre |
| `.app-main` | `flex: 1 1 0%; min-width: 0; min-height: calc(100dvh var(--fit-height)); display: flex; flex-direction: row` | Main region between header and footer — flex row, fitted to the viewport |
| `.main-section` | `flex: 1 1 0%; min-width: 0` | Primary content column inside .app-main |
| `.solo` | `padding-inline: var(--app-inline)` | The main section is the only column |
| `.sidebar-left` | `display: none; flex-shrink: 0; position: sticky; top: var(--header-height); height: calc(100dvh var(--fit-height)); overflow-y: auto` | Left rail — nav role; off-canvas drawer on narrow screens |
| `.sidebar-right` | `display: none; flex-shrink: 0; position: sticky; top: var(--header-height); height: calc(100dvh var(--fit-height)); overflow-y: auto` | Right rail — table of contents |
| `.open` | — | .open rule |
| `.app-footer` | `display: flex; flex-direction: row; align-items: center; padding-inline: var(--app-inline); min-height: var(--footer-height)` | Application footer |
| `.content-section` | `width: 100%` | Page content block — responsive padding and narrow width modes |
| `.null` | `padding-inline: 0 var(--space-bs)` | No width constraint |
| `.narrow-half` | `width: 640px; margin-inline: auto` | Half the content width |
| `.narrow-wide` | `width: 720px; margin-inline: auto` | Wide content width |
| `.narrow-full` | `width: 640px; margin-inline: auto` | Full content width |
| `.nav-section` | `display: flex; flex-direction: column` | display: flex |
| `.logo-link` | `display: inline-flex; align-items: center; text-decoration: none; color: inherit` | display: inline-flex |
| `.toc-section` | `display: flex; flex-direction: column` | display: flex |
| `.toc-link` | `display: block; font-size: var(--text-sm); color: var(--text-secondary); text-decoration: none` | display: block |

---

## colors-themes.css

Colour roles. Name the role, never the value; the theme remaps the token.

| Class | Property | Description |
|:---|:---|:---|
| `.bg-main` | `background-color: var(--bg)` | The page background |
| `.bg` | `background-color: var(--bg)` | The page background |
| `.bg-surface` | `background-color: var(--bg-surface)` | Surface fill — cards, panels, inputs |
| `.bg-panel` | `background-color: var(--bg-panel)` | Panel fill — one step below the surface |
| `.state-hover` | `background-color: var(--state-hover)` | The hover fill |
| `.state-selected` | `background-color: var(--state-selected)` | The selected fill |
| `.bg-input` | `background-color: var(--bg-input)` | Input fill |
| `.bg-button` | `background-color: var(--bg-button)` | Button fill |
| `.bg-button-secondary` | `background-color: var(--bg-button-secondary)` | Secondary button fill |
| `.text-primary` | `color: var(--text-primary)` | Primary ink |
| `.text-secondary` | `color: var(--text-secondary)` | Secondary ink |
| `.text-muted` | `color: var(--text-muted)` | Muted ink |
| `.text-inverse` | `color: var(--text-inverse)` | Ink for a filled surface |
| `.text-white` | `color: var(--white-fixed)` | Fixed white ink |
| `.text-black` | `color: var(--black-fixed)` | Fixed black ink |
| `.text-theme` | `color: var(--theme-color)` | Theme colour ink |
| `.text-theme-up` | `color: var(--theme-color-up)` | Theme colour, one step up |
| `.text-theme-down` | `color: var(--theme-color-down)` | Theme colour, one step down |
| `.text-success` | `color: var(--success)` | Success ink |
| `.text-warning` | `color: var(--warning)` | Warning ink |
| `.text-danger` | `color: var(--danger)` | Danger ink |
| `.text-info` | `color: var(--info)` | Info ink |
| `.bg-success` | `background-color: var(--success); transition: background var(--motionout2)` | Success fill |
| `.bg-warning` | `background-color: var(--warning); transition: background var(--motionout2)` | Warning fill |
| `.bg-danger` | `background-color: var(--danger); transition: background var(--motionout2)` | Danger fill |
| `.bg-info` | `background-color: var(--info); transition: background var(--motionout2)` | Info fill |

---

## motion-animation.css

Motion language — easings, durations and the keyframe animations.

| Class | Property | Description |
|:---|:---|:---|
| `.mode-wipe` | `animation: none` | On <html> — disables view transitions while a colour-mode wipe runs |
| `.anim-spin` | `animation: spin 1s linear infinite` | Spin — a continuous rotation |
| `.anim-pulse` | `animation: pulse 2s ease-in-out infinite` | Pulse — a fade in and out |
| `.anim-fade-in` | `animation: fade-in var(--speed3) var(--transout3)` | Fade in |
| `.anim-fade-out` | `animation: fade-out var(--speed3) var(--transout3)` | Fade out |

---

## components.css

Components — buttons, inputs, links, tags, avatars, switches, checkboxes.

| Class | Property | Description |
|:---|:---|:---|
| `.avatar-more` | `border-radius: 50%` | The overflow avatar in an avatar group |
| `.avatar-group` | — | A group of avatars — stacked or in a row |
| `.circle` | — | Round avatars |
| `.rounded` | — | Rounded-square avatars |
| `.gap-overlap` | — | Overlap the avatars in the group |
| `.badge` | `padding-inline: var(--space-sm); font-weight: 500; white-space: nowrap` | Count badge |
| `.tag` | `padding-inline: var(--space-sm); font-weight: 500; white-space: nowrap; background-color: var(--tag-color)` | Small inline label |
| `.ink-auto` | `color: var(--text-primary)` | Let the tag pick its ink from its own background |
| `.text-only` | `background-color: transparent; color: var(--tag-color)` | A tag with no fill — text only |
| `.tag-remove` | `height: 1.5em; width: 1.5em; margin-inline-end: calc(var(--space-xs) * -1); color: inherit` | The remove control inside a tag |
| `.switch-box` | `display: inline-flex; flex-shrink: 0` | The switch track and thumb |
| `.checkbox-box` | `display: inline-grid; place-items: center; flex-shrink: 0` | The checkbox box |
| `.slide-unlock` | `min-width: 16rem; user-select: none; touch-action: none` | Slide-to-unlock control |
| `.card-clickable` | `cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s` | A card that responds to clicks |
| `.disabled` | `cursor: not-allowed; opacity: 0.6` | Disabled state |
| `.is-invalid` | `border-color: var(--danger)` | Invalid state — the field failed validation |
| `.variant` | `border-color: var(--danger)` | Variant marker |
| `.select` | `background-image: none; padding-right: calc(var(--space-sm) + 1.25em)` | Select dropdown — themed field with a chevron |
| `.select-wrap` | — | The frame around a select and its chevron |
| `.select-chevron` | `position: absolute; right: var(--space-sm); pointer-events: none` | The chevron inside a select frame |
| `.input` | `display: block; padding-inline: var(--space-md); transition: background var(--motionin1), border-color var(--motionin1), color var(--motionin1)` | Text input — themed field with a focus ring |
| `.fitted` | `width: max-content` | The input is fitted to its container |
| `.link` | `color: var(--theme-color); text-decoration: none; transition: color var(--motionin1)` | Themed link — theme colour, alternative on hover |
| `.link-plain` | `color: var(--text-primary); text-decoration: none; transition: color var(--motionin1)` | Plain link — inherits the ink, theme colour on hover |
| `.link-parent` | `color: var(--text-primary); text-decoration: none` | Link block — hovers the colour of its .link-title child |
| `.link-title` | `transition: color var(--motionin1); text-decoration: none` | The title inside a .link-parent |
| `.button` | `display: flex; align-items: center; justify-content: center; text-decoration: none; cursor: pointer; user-select: none; transition: background var(--motionin1), bord…` | The button — variant, shape and size come from the prop classes |
| `.button-group` | `display: inline-flex; align-items: stretch; vertical-align: middle` | Buttons joined into one control |
| `.split-button` | `display: inline-flex; align-items: stretch; vertical-align: middle` | A button with a separate action area |
| `.vertical` | `flex-direction: column` | Stack the group vertically |
| `.btn` | `display: flex; align-items: center; justify-content: center; font-size: var(--text-md); text-decoration: none; cursor: pointer; user-select: none; transition: backgr…` | Call-to-action button |
| `.radio` | — | .radio rule |
| `.min` | — | Shape prop — the smallest radius |

---

## component-props.css

Component props — the variant, shape and height classes Fractalsvelte UI consumes.

| Class | Property | Description |
|:---|:---|:---|
| `.primary` | `background-color: var(--bg-button); border: 1px solid var(--bg-button); color: var(--white-fixed)` | Primary variant — the default fill |
| `.selected` | `background-color: var(--bg-button-active); border: 1px solid var(--bg-button-active)` | Selected state — the current item in a set |
| `.secondary` | `background-color: var(--bg-button-secondary); border: 1px solid var(--bg-button-secondary); color: var(--white-fixed)` | Secondary variant — a quieter fill |
| `.themed` | `background-color: var(--theme-color); border: 1px solid var(--theme-color); color: var(--white-fixed)` | Themed variant — filled with the theme colour |
| `.outline` | `background-color: transparent; color: var(--text-primary); border: 1px solid var(--border-strong)` | Outline variant — border only |
| `.ghost` | `background-color: transparent; border: none; color: var(--text-primary)` | Ghost variant — no fill until hover |
| `.info` | `background-color: var(--info); border: 1px solid var(--info); color: var(--white-fixed)` | Status variant — the info colour |
| `.variant-info` | `background-color: var(--info); border: 1px solid var(--info); color: var(--white-fixed)` | background-color: var(--info) |
| `.success` | `background-color: var(--success); border: 1px solid var(--success); color: var(--white-fixed)` | Status variant — the success colour |
| `.variant-success` | `background-color: var(--success); border: 1px solid var(--success); color: var(--white-fixed)` | background-color: var(--success) |
| `.warning` | `background-color: var(--warning); border: 1px solid var(--warning); color: var(--white-fixed)` | Status variant — the warning colour |
| `.variant-warning` | `background-color: var(--warning); border: 1px solid var(--warning); color: var(--white-fixed)` | background-color: var(--warning) |
| `.danger` | `background-color: var(--danger); border: 1px solid var(--danger); color: var(--white-fixed)` | Status variant — the danger colour |
| `.variant-danger` | `background-color: var(--danger); border: 1px solid var(--danger); color: var(--white-fixed)` | background-color: var(--danger) |

---

## responsive.css

Visibility by breakpoint band. The bands are 769px, 1025px, 1281px, 1441px.

| Class | Property | Description |
|:---|:---|:---|
| `.md-only` | `display: none` | Visible from the md band up (1025px) |
| `.lg-only` | `display: none` | Visible from the lg band up (1281px) |
| `.xl-only` | `display: none` | Visible from the xl band up (1441px) |
| `.md-hide` | `display: none` | Hidden from the md band up (1025px) |
| `.lg-hide` | `display: none` | Hidden from the lg band up (1281px) |
| `.xl-hide` | `display: none` | Hidden from the xl band up (1441px) |

---

## custom.css

The sanctioned extension layer — branding, the mascot, and anything a project owns.

| Class | Property | Description |
|:---|:---|:---|
| `.site-logomotif` | `height: 48px; transform-origin: center center; transition: transform 210ms var(--transin2)` | Site logo motif — scales on hover |
| `.logotype` | `height: 28px` | Logotype — the wordmark |
| `.project-circle` | `border-radius: 24px; width: 16px; height: 16px` | Project dot |
| `.mascot` | `display: inline-block; position: relative; flex: none; line-height: 0; perspective: var(--mascot-persp, 400px)` | The mascot — the site character |
| `.mascot-bob` | `display: block` | The mascot bobs |
| `.mascot-tilt` | `display: block` | The mascot tilts |
| `.mascot-bobs` | — | .mascot-bobs rule |
| `.mascot-base` | `display: block; user-select: none; -webkit-user-drag: none` | The mascot body |
| `.mascot-overlay` | `position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none` | The mascot overlay |
| `.mascot-mask` | `mask-type: alpha` | The mascot mask |
| `.mascot-pupil-l` | `transform: translate(calc(var(--mascot-plx, 0) * 1px), calc(var(--mascot-ply, 0) * 1px))` | The mascot left pupil |
| `.mascot-pupil-r` | `transform: translate(calc(var(--mascot-prx, 0) * 1px), calc(var(--mascot-pry, 0) * 1px))` | The mascot right pupil |
| `.mascot-gloss` | `opacity: 0.42; transform: translate(calc(var(--mascot-gx, 400) * 1px), calc(var(--mascot-gy, 400) * 1px))` | The mascot gloss |
| `.mascot-shade` | `opacity: 0.55; transform: translate(calc((1024 - var(--mascot-gx, 400)) * 1px), calc((1120 - var(--mascot-gy, 400)) * 1px))` | The mascot shade |
| `.mascot-lid` | `animation: mascot-blink 5.2s ease-in-out infinite` | The mascot eyelid |
| `.mascot-blinks` | — | .mascot-blinks rule |
| `.mascotgl` | `display: inline-block; position: relative; flex: none; line-height: 0` | display: inline-block |
| `.mascotgl-spacer` | `display: block` | display: block |
| `.mascotgl-canvas` | `position: absolute; left: 50%; top: 50%; width: 160%; height: 160%; transform: translate(-50%, -50%); pointer-events: none; opacity: 0` | position: absolute |
| `.mascotgl-ready` | `opacity: 1` | opacity: 1 |
| `.mascotgl-compact` | — | .mascotgl-compact rule |

---

## modular.css

The sveltemodular workspace chrome.

| Class | Property | Description |
|:---|:---|:---|
| `.modular` | — | .modular rule |
| `.modular-root` | `position: relative; flex: 1 1 0%; min-width: 0; min-height: 0; display: flex; overflow: hidden` | position: relative |
| `.modular-split` | `display: flex; flex: 1 1 0%; min-width: 0; min-height: 0; width: 100%; height: 100%; overflow: hidden; gap: 0` | display: flex |
| `.modular-split-child` | `position: relative; display: flex; min-width: 0; min-height: 0; overflow: hidden` | position: relative |
| `.modular-divider` | `position: relative; flex: 0 0 var(--modular-gap); background: transparent; transition: background 120ms ease; z-index: 2; touch-action: none` | position: relative |
| `.active` | `background: var(--theme-color)` | Active state |
| `.modular-split-ratio-pill` | `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--bg-surface); color: var(--text-primary); border: 1px solid var(--border-…` | position: absolute |
| `.modular-panel` | `position: relative; display: flex; flex-direction: column; flex: 1 1 0%; min-width: 0; min-height: 0; background: var(--bg-panel); border-radius: var(--radius-sm); b…` | position: relative |
| `.modular-tabbar` | `display: flex; align-items: center; height: var(--modular-tabbar-height); background: var(--bg-extra); border-bottom: 1px solid var(--border); padding: 0 4px; gap: 2…` | display: flex |
| `.modular-tab` | `position: relative; display: flex; align-items: center; gap: 6px; height: calc(var(--modular-tabbar-height) - 4px); max-width: var(--modular-tab-max-width); padding:…` | position: relative |
| `.modular-tab-title` | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` | overflow: hidden |
| `.modular-badge` | `display: inline-flex; align-items: center; justify-content: center; padding: 0 4px; min-width: 14px; height: 14px; border-radius: 7px; background: var(--theme-color)…` | display: inline-flex |
| `.modular-tab-close` | `display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; padding: 0; margin-left: 2px; border: none; border-radius: 2px; backgr…` | display: inline-flex — child of :where(.modular) |
| `.modular-tab-accessory` | `flex: 1 1 0%; display: flex; align-items: center; min-width: 8px` | flex: 1 1 0% |
| `.modular-tab-actions` | `display: flex; align-items: center; gap: 2px` | display: flex |
| `.modular-action-button` | `display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; padding: 0; border: none; border-radius: var(--radius-sm); background:…` | display: inline-flex — child of :where(.modular) |
| `.modular-menu-button` | `display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; padding: 0; border: none; border-radius: var(--radius-sm); background:…` | display: inline-flex — child of :where(.modular) |
| `.modular-panel-body` | `position: relative; flex: 1 1 0%; min-width: 0; min-height: 0; display: flex; overflow: hidden` | position: relative |
| `.modular-view` | `position: relative; flex: 1 1 0%; min-width: 0; min-height: 0; width: 100%; height: 100%; overflow: auto` | position: relative |
| `.modular-drop-overlay` | `position: absolute; inset: 0; pointer-events: none; z-index: 50; transition: all 120ms ease` | position: absolute |
| `.modular-drop-indicator` | `position: absolute; background: rgba(34, 197, 94, 0.16); border: 2px dashed var(--theme-color); border-radius: var(--radius-sm); transition: all 100ms ease` | position: absolute |
| `.modular-maximized` | `position: absolute; inset: 0; z-index: 80; display: flex; flex-direction: column; background: var(--bg-panel); border: 1px solid var(--border)` | position: absolute |
| `.modular-maximized-bar` | `display: flex; align-items: center; justify-content: space-between; height: var(--modular-tabbar-height); background: var(--bg-extra); border-bottom: 1px solid var(-…` | display: flex |
| `.modular-maximized-title` | `font-weight: 600` | font-weight: 600 |
| `.modular-maximized-body` | `flex: 1 1 0%; overflow: auto` | flex: 1 1 0% |
| `.modular-floating` | `position: absolute; border-radius: var(--radius-sm); box-shadow: var(--shadow-bs); overflow: hidden; display: flex` | position: absolute |
| `.modular-tabbar-drag` | `cursor: grab` | cursor: grab |
| `.modular-floating-resize` | `position: absolute; right: 0; bottom: 0; width: 14px; height: 14px; cursor: nwse-resize; background: linear-gradient( 135deg, transparent 0 50%, var(--text-muted) 50…` | position: absolute |
| `.modular-hidden-tray` | `position: absolute; right: 8px; bottom: 8px; z-index: 120` | position: absolute |
| `.modular-hidden-button` | `padding: 4px 8px; font: inherit; color: var(--text-muted); background: var(--bg-panel); border: 1px solid var(--border-strong); border-radius: var(--radius-sm); curs…` | padding: 4px 8px |
| `.modular-stage` | `position: relative; flex: 1 1 0%; display: flex; min-width: 0; min-height: 0; overflow: hidden` | position: relative |
| `.modular-stage-child` | `position: relative; flex: 1 1 0%; display: flex; min-width: 0; min-height: 0; z-index: 1` | position: relative |
| `.modular-stage-backdrop` | `position: absolute; inset: 0; pointer-events: none; z-index: 0` | position: absolute |
| `.modular-stage-empty` | `flex: 1 1 0%; display: flex; align-items: center; justify-content: center; color: var(--text-primary)` | flex: 1 1 0% |
| `.modular-empty` | `flex: 1 1 0%; display: flex; align-items: center; justify-content: center; color: var(--text-primary)` | flex: 1 1 0% |
| `.modular-chrome` | `position: absolute; inset: 0; pointer-events: none; z-index: 100` | position: absolute |
| `.modular-menu` | `position: fixed; inset: auto; margin: 0; padding: 4px; background: var(--bg-extra); color: var(--text-primary); border: 1px solid var(--border-strong); border-radius…` | position: fixed |
| `.modular-menu-item` | `display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 4px 8px; border: none; border-radius: var(--radius-sm); background: transpa…` | display: flex — child of :where(dialog.modular-menu) |
| `.modular-menu-separator` | `height: 1px; background: var(--border); margin: 4px 0` | height: 1px |
| `.modular-popout-body` | `margin: 0; padding: 0; width: 100vw; height: 100vh; display: flex; overflow: hidden` | margin: 0 |
| `.modular-popout-view` | `width: 100%; height: 100%; display: flex` | width: 100% |
