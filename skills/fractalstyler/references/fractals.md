# Fractalstyler — Class Reference

GENERATED FILE — do not edit. Emitted by `scripts/update-registry.ts` from the
stylesheets in `src/lib/styles`. 532 classes across 442 tokens.

**The classes below are the entire public API.** The system defines no
authoring mixins and no styling functions — `+stack`, `+surface`, `space()` and
friends do not exist. Compose in markup.

Every class is concrete. Space families (`.gap` `.rgap` `.cgap` `.pad` `.px` `.py`
`.pt` `.pr` `.pb` `.pl` `.mar` `.mx` `.my` `.mt` `.mr` `.mb` `.ml`) each ride the
eight steps: `xs sm md bs lg xl 2xl 3xl`, token-routed through `var(--space-*)`.
Modifiers nest under their base (`.box` `.xcenter`), children carry their own
name (`.avatar-more`).


---

## configurations.css

Global tokens and base resets — layout dimensions, z-index bands, font stacks, and the element resets every page starts from.

| Class | Applies | Source |
|:---|:---|:---|
| `.bdr` | Debug outline — flags an element on screen with a border | `configurations.css` |

---

## gaps-pads-margins.css

The space ladder. Every family runs the eight steps xs sm md bs lg xl 2xl 3xl and rides var(--space-*).

| Class | Applies | Source |
|:---|:---|:---|
| `.gap-xs` | Gap on both axes (flex/grid) at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.gap-sm` | Gap on both axes (flex/grid) at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.gap-md` | Gap on both axes (flex/grid) at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.gap-bs` | Gap on both axes (flex/grid) at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.gap-lg` | Gap on both axes (flex/grid) at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.gap-xl` | Gap on both axes (flex/grid) at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.gap-2xl` | Gap on both axes (flex/grid) at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.gap-3xl` | Gap on both axes (flex/grid) at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.rgap-xs` | Row gap (block axis) at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.rgap-sm` | Row gap (block axis) at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.rgap-md` | Row gap (block axis) at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.rgap-bs` | Row gap (block axis) at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.rgap-lg` | Row gap (block axis) at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.rgap-xl` | Row gap (block axis) at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.rgap-2xl` | Row gap (block axis) at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.rgap-3xl` | Row gap (block axis) at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.cgap-xs` | Column gap (inline axis) at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.cgap-sm` | Column gap (inline axis) at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.cgap-md` | Column gap (inline axis) at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.cgap-bs` | Column gap (inline axis) at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.cgap-lg` | Column gap (inline axis) at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.cgap-xl` | Column gap (inline axis) at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.cgap-2xl` | Column gap (inline axis) at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.cgap-3xl` | Column gap (inline axis) at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.pad-xs` | Padding on all four sides at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.pad-sm` | Padding on all four sides at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.pad-md` | Padding on all four sides at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.pad-bs` | Padding on all four sides at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.pad-lg` | Padding on all four sides at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.pad-xl` | Padding on all four sides at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.pad-2xl` | Padding on all four sides at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.pad-3xl` | Padding on all four sides at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.pad-none` | No padding — clears what an element brings with it | `gaps-pads-margins.css` |
| `.px-xs` | Inline (horizontal) padding at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.px-sm` | Inline (horizontal) padding at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.px-md` | Inline (horizontal) padding at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.px-bs` | Inline (horizontal) padding at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.px-lg` | Inline (horizontal) padding at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.px-xl` | Inline (horizontal) padding at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.px-2xl` | Inline (horizontal) padding at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.px-3xl` | Inline (horizontal) padding at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.py-xs` | Block (vertical) padding at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.py-sm` | Block (vertical) padding at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.py-md` | Block (vertical) padding at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.py-bs` | Block (vertical) padding at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.py-lg` | Block (vertical) padding at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.py-xl` | Block (vertical) padding at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.py-2xl` | Block (vertical) padding at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.py-3xl` | Block (vertical) padding at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.pt-xs` | Top padding at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.pt-sm` | Top padding at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.pt-md` | Top padding at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.pt-bs` | Top padding at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.pt-lg` | Top padding at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.pt-xl` | Top padding at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.pt-2xl` | Top padding at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.pt-3xl` | Top padding at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.pr-xs` | Right padding at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.pr-sm` | Right padding at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.pr-md` | Right padding at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.pr-bs` | Right padding at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.pr-lg` | Right padding at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.pr-xl` | Right padding at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.pr-2xl` | Right padding at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.pr-3xl` | Right padding at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.pb-xs` | Bottom padding at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.pb-sm` | Bottom padding at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.pb-md` | Bottom padding at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.pb-bs` | Bottom padding at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.pb-lg` | Bottom padding at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.pb-xl` | Bottom padding at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.pb-2xl` | Bottom padding at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.pb-3xl` | Bottom padding at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.pl-xs` | Left padding at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.pl-sm` | Left padding at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.pl-md` | Left padding at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.pl-bs` | Left padding at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.pl-lg` | Left padding at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.pl-xl` | Left padding at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.pl-2xl` | Left padding at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.pl-3xl` | Left padding at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.mar-xs` | Margin on all four sides at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.mar-sm` | Margin on all four sides at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.mar-md` | Margin on all four sides at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.mar-bs` | Margin on all four sides at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.mar-lg` | Margin on all four sides at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.mar-xl` | Margin on all four sides at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.mar-2xl` | Margin on all four sides at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.mar-3xl` | Margin on all four sides at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.mx-xs` | Inline (horizontal) margin at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.mx-sm` | Inline (horizontal) margin at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.mx-md` | Inline (horizontal) margin at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.mx-bs` | Inline (horizontal) margin at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.mx-lg` | Inline (horizontal) margin at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.mx-xl` | Inline (horizontal) margin at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.mx-2xl` | Inline (horizontal) margin at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.mx-3xl` | Inline (horizontal) margin at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.my-xs` | Block (vertical) margin at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.my-sm` | Block (vertical) margin at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.my-md` | Block (vertical) margin at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.my-bs` | Block (vertical) margin at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.my-lg` | Block (vertical) margin at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.my-xl` | Block (vertical) margin at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.my-2xl` | Block (vertical) margin at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.my-3xl` | Block (vertical) margin at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.mt-xs` | Top margin at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.mt-sm` | Top margin at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.mt-md` | Top margin at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.mt-bs` | Top margin at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.mt-lg` | Top margin at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.mt-xl` | Top margin at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.mt-2xl` | Top margin at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.mt-3xl` | Top margin at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.mr-xs` | Right margin at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.mr-sm` | Right margin at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.mr-md` | Right margin at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.mr-bs` | Right margin at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.mr-lg` | Right margin at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.mr-xl` | Right margin at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.mr-2xl` | Right margin at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.mr-3xl` | Right margin at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.mb-xs` | Bottom margin at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.mb-sm` | Bottom margin at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.mb-md` | Bottom margin at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.mb-bs` | Bottom margin at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.mb-lg` | Bottom margin at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.mb-xl` | Bottom margin at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.mb-2xl` | Bottom margin at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.mb-3xl` | Bottom margin at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |
| `.ml-xs` | Left margin at the xs step — rides --space-xs | `gaps-pads-margins.css` |
| `.ml-sm` | Left margin at the sm step — rides --space-sm | `gaps-pads-margins.css` |
| `.ml-md` | Left margin at the md step — rides --space-md | `gaps-pads-margins.css` |
| `.ml-bs` | Left margin at the bs step — rides --space-bs | `gaps-pads-margins.css` |
| `.ml-lg` | Left margin at the lg step — rides --space-lg | `gaps-pads-margins.css` |
| `.ml-xl` | Left margin at the xl step — rides --space-xl | `gaps-pads-margins.css` |
| `.ml-2xl` | Left margin at the 2xl step — rides --space-2xl | `gaps-pads-margins.css` |
| `.ml-3xl` | Left margin at the 3xl step — rides --space-3xl | `gaps-pads-margins.css` |

---

## shapes-sizes.css

Radius and control-height ladders, plus the sizing utilities (full, min0, fitted).

| Class | Applies | Source |
|:---|:---|:---|
| `.rect` | Shape prop — square corners | `shapes-sizes.css` |
| `.mincurved` | Shape prop — a small radius | `shapes-sizes.css` |
| `.modern` | Shape prop — the default radius | `shapes-sizes.css` |
| `.curved` | Shape prop — a large radius | `shapes-sizes.css` |
| `.round` | Shape prop — fully round | `shapes-sizes.css` |
| `.radius-xs` | Corner radius at the xs step — rides --radius-xs | `shapes-sizes.css` |
| `.radius-sm` | Corner radius at the sm step — rides --radius-sm | `shapes-sizes.css` |
| `.radius-md` | Corner radius at the md step — rides --radius-md | `shapes-sizes.css` |
| `.radius-bs` | Corner radius at the bs step — rides --radius-bs | `shapes-sizes.css` |
| `.radius-lg` | Corner radius at the lg step — rides --radius-lg | `shapes-sizes.css` |
| `.radius-full` | Corner radius at the full step — rides --radius-full | `shapes-sizes.css` |
| `.h-xs` | Control height at the xs step — rides --h-xs | `shapes-sizes.css` |
| `.h-sm` | Control height at the sm step — rides --h-sm | `shapes-sizes.css` |
| `.h-md` | Control height at the md step — rides --h-md | `shapes-sizes.css` |
| `.h-bs` | Control height at the bs step — rides --h-bs | `shapes-sizes.css` |
| `.h-lg` | Control height at the lg step — rides --h-lg | `shapes-sizes.css` |
| `.h-xl` | Control height at the xl step — rides --h-xl | `shapes-sizes.css` |
| `.h-2xl` | Control height at the 2xl step — rides --h-2xl | `shapes-sizes.css` |
| `.h-3xl` | Control height at the 3xl step — rides --h-3xl | `shapes-sizes.css` |
| `.wfull` | Full width | `shapes-sizes.css` |
| `.hfull` | Full height | `shapes-sizes.css` |
| `.wmax` | Max width | `shapes-sizes.css` |
| `.hmax` | Max height | `shapes-sizes.css` |
| `.full` | Full width and height | `shapes-sizes.css` |
| `.wmin0` | Zero min-width | `shapes-sizes.css` |
| `.hmin0` | Zero min-height | `shapes-sizes.css` |
| `.min0` | Zero min-width and min-height | `shapes-sizes.css` |
| `.hfull-dvh` | Full viewport height | `shapes-sizes.css` |
| `.hfull-fitted` | Full viewport height, fitted between the header and the footer | `shapes-sizes.css` |

---

## containers.css

The structural foundations — .box, .row and .grid with their axis modifiers — plus positioning, scrolling, grid steps and frames.

| Class | Applies | Source |
|:---|:---|:---|
| `.box` | Flex column container — the vertical structural foundation | `containers.css` |
| `.column` | Flex column container — the vertical structural foundation | `containers.css` |
| `.xcenter` | align-items: center — modifier of .box | `containers.css` |
| `.xleft` | align-items: flex-start — modifier of .box | `containers.css` |
| `.xright` | align-items: flex-end — modifier of .box | `containers.css` |
| `.ycenter` | justify-content: center — modifier of .box | `containers.css` |
| `.ytop` | justify-content: flex-start — modifier of .box | `containers.css` |
| `.ybot` | justify-content: flex-end — modifier of .box | `containers.css` |
| `.ybetween` | justify-content: space-between — modifier of .box | `containers.css` |
| `.yevenly` | justify-content: space-evenly — modifier of .box | `containers.css` |
| `.yaround` | justify-content: space-around — modifier of .box | `containers.css` |
| `.yinherit` | Take the parent container's alignment on the y axis | `containers.css` |
| `.xinherit` | Take the parent container's alignment on the x axis | `containers.css` |
| `.row` | Flex row container — the horizontal structural foundation | `containers.css` |
| `.xbetween` | justify-content: space-between — modifier of .row | `containers.css` |
| `.xevenly` | justify-content: space-evenly — modifier of .row | `containers.css` |
| `.xaround` | justify-content: space-around — modifier of .row | `containers.css` |
| `.grid` | CSS grid container — the third structural foundation | `containers.css` |
| `.grid-2` | Grid with 2 columns | `containers.css` |
| `.grid-3` | Grid with 3 columns | `containers.css` |
| `.grid-4` | Grid with 4 columns | `containers.css` |
| `.grid-5` | Grid with 5 columns | `containers.css` |
| `.grid-6` | Grid with 6 columns | `containers.css` |
| `.center` | place-items: center — modifier of .grid | `containers.css` |
| `.xstretch` | justify-items: stretch — modifier of .grid | `containers.css` |
| `.ystretch` | align-items: stretch — modifier of .grid | `containers.css` |
| `.grid-1` | Grid with 1 columns | `containers.css` |
| `.cspan-1` | Span 1 grid columns | `containers.css` |
| `.cspan-2` | Span 2 grid columns | `containers.css` |
| `.cspan-3` | Span 3 grid columns | `containers.css` |
| `.cspan-4` | Span 4 grid columns | `containers.css` |
| `.cspan-5` | Span 5 grid columns | `containers.css` |
| `.cspan-6` | Span 6 grid columns | `containers.css` |
| `.cspan-7` | Span 7 grid columns | `containers.css` |
| `.cspan-8` | Span 8 grid columns | `containers.css` |
| `.card-grid` | Auto-fit card grid — the column count negotiates the width | `containers.css` |
| `.wrap` | Allow flex wrapping | `containers.css` |
| `.grow` | Flex grow — take the remaining space (flex: 1 1 0%) | `containers.css` |
| `.shrink-0` | Never shrink below the content size | `containers.css` |
| `.relative` | position: relative — the anchor for absolute children | `containers.css` |
| `.absolute` | position: absolute | `containers.css` |
| `.fixed` | position: fixed | `containers.css` |
| `.sticky` | position: sticky | `containers.css` |
| `.z-sticky` | z-index: var(--z-sticky) | `containers.css` |
| `.z-raised` | z-index: var(--z-raised) | `containers.css` |
| `.z-modal` | z-index: var(--z-modal) | `containers.css` |
| `.z-toast` | z-index: var(--z-toast) | `containers.css` |
| `.scroll-y` | Scroll vertically | `containers.css` |
| `.scroll-x` | Scroll horizontally | `containers.css` |
| `.scroll-menu` | A list that scrolls past 16rem — dropdown and option lists | `containers.css` |
| `.pointer` | Pointer cursor for clickable rows and labels that are not buttons | `containers.css` |
| `.touch-none` | No touch scrolling — for drag surfaces like sliders and pads | `containers.css` |
| `.fit-cover` | object-fit: cover — media fills and crops | `containers.css` |
| `.fit-contain` | object-fit: contain — media fits whole, letterboxed | `containers.css` |
| `.fit-fill` | object-fit: fill — media stretches to the box | `containers.css` |
| `.fit-scale-down` | object-fit: scale-down — never larger than its natural size | `containers.css` |
| `.pin-tl` | Pinned to the top-left corner of the nearest positioned parent | `containers.css` |
| `.pin-tr` | Pinned to the top-right corner of the nearest positioned parent | `containers.css` |
| `.pin-bl` | Pinned to the bottom-left corner of the nearest positioned parent | `containers.css` |
| `.pin-br` | Pinned to the bottom-right corner of the nearest positioned parent | `containers.css` |
| `.sr-only` | Visually hidden, still focusable and read by screen readers | `containers.css` |
| `.prose` | Reading measure — a clamped content width | `containers.css` |
| `.prose-left` | Reading measure, aligned to the start edge | `containers.css` |
| `.frame-16-9` | aspect-ratio: 16 / 9 | `containers.css` |
| `.frame-9-16` | aspect-ratio: 9 / 16 | `containers.css` |
| `.frame-4-3` | aspect-ratio: 4 / 3 | `containers.css` |
| `.frame-3-4` | aspect-ratio: 3 / 4 | `containers.css` |
| `.frame-3-2` | aspect-ratio: 3 / 2 | `containers.css` |
| `.frame-2-3` | aspect-ratio: 2 / 3 | `containers.css` |
| `.frame-1-1` | aspect-ratio: 1 / 1 | `containers.css` |
| `.reel` | Scroll-snap rail — the children snap to the rail | `containers.css` |
| `.inline` | display: inline | `containers.css` |
| `.block` | display: block | `containers.css` |
| `.inline-block` | display: inline-block | `containers.css` |
| `.inline-flex` | display: inline-flex | `containers.css` |
| `.contents` | display: contents — the box disappears, the children remain | `containers.css` |
| `.inline-grid` | display: inline-grid | `containers.css` |
| `.table` | display: table | `containers.css` |
| `.display-none` | display: none | `containers.css` |
| `.overflow-hidden` | Clip the overflow | `containers.css` |
| `.overflow-visible` | Let the overflow show | `containers.css` |
| `.isolate` | Create a stacking context | `containers.css` |
| `.flex-shrink` | Allow shrinking again — undoes .shrink-0 | `containers.css` |

---

## typography.css

Type scale, semantic text roles, weight, line height, letter spacing and alignment.

| Class | Applies | Source |
|:---|:---|:---|
| `.text-xs` | Text size at the xs step — rides --text-xs | `typography.css` |
| `.text-sm` | Text size at the sm step — rides --text-sm | `typography.css` |
| `.text-md` | Text size at the md step — rides --text-md | `typography.css` |
| `.text-bs` | Text size at the bs step — rides --text-bs | `typography.css` |
| `.text-lg` | Text size at the lg step — rides --text-lg | `typography.css` |
| `.text-xl` | Text size at the xl step — rides --text-xl | `typography.css` |
| `.text-2xl` | Text size at the 2xl step — rides --text-2xl | `typography.css` |
| `.text-3xl` | Text size at the 3xl step — rides --text-3xl | `typography.css` |
| `.text-4xl` | Text size at the 4xl step — rides --text-4xl | `typography.css` |
| `.text-5xl` | Text size at the 5xl step — rides --text-5xl | `typography.css` |
| `.text-body` | Body copy at the base size | `typography.css` |
| `.text-body-lg` | Body copy at the large size | `typography.css` |
| `.text-body-sm` | Body copy at the small size | `typography.css` |
| `.page-title` | Page title — the largest type on the page | `typography.css` |
| `.page-desc` | Page description — large and airy | `typography.css` |
| `.page-heading-xl` | Page heading, xl rung | `typography.css` |
| `.page-heading-lg` | Page heading, lg rung | `typography.css` |
| `.page-heading-bs` | Page heading, base rung | `typography.css` |
| `.card-title` | Card title | `typography.css` |
| `.card-desc` | Card description | `typography.css` |
| `.nav-link` | Nav link — padded, curved, filled on hover | `typography.css` |
| `.nav-link-sm` | font-size: var(--text-sm) | `typography.css` |
| `.nav-header` | Nav group header | `typography.css` |
| `.lh11` | Line height 1.1 | `typography.css` |
| `.lh12` | Line height 1.2 | `typography.css` |
| `.lh13` | Line height 1.3 | `typography.css` |
| `.lh14` | Line height 1.4 | `typography.css` |
| `.lh15` | Line height 1.5 | `typography.css` |
| `.lh16` | Line height 1.6 | `typography.css` |
| `.ls-tight-bs` | Tight letter spacing at the bs step | `typography.css` |
| `.ls-tight-lg` | Tight letter spacing at the lg step | `typography.css` |
| `.ls-tight-xl` | Tight letter spacing at the xl step | `typography.css` |
| `.ls-wide-bs` | Wide letter spacing at the bs step | `typography.css` |
| `.ls-wide-lg` | Wide letter spacing at the lg step | `typography.css` |
| `.ls-wide-xl` | Wide letter spacing at the xl step | `typography.css` |
| `.weight-300` | Font weight 300 | `typography.css` |
| `.weight-400` | Font weight 400 | `typography.css` |
| `.weight-500` | Font weight 500 | `typography.css` |
| `.weight-600` | Font weight 600 | `typography.css` |
| `.weight-700` | Font weight 700 | `typography.css` |
| `.weight-800` | Font weight 800 | `typography.css` |
| `.tt-u` | Text transform — uppercase | `typography.css` |
| `.tt-c` | Text transform — capitalize | `typography.css` |
| `.ta-c` | Text align — centre | `typography.css` |
| `.ta-l` | Text align — left | `typography.css` |
| `.ta-r` | Text align — right | `typography.css` |
| `.mleft` | Keep the reading measure on the left when the text is centred | `typography.css` |
| `.truncate` | One-line ellipsis truncation | `typography.css` |
| `.font-sans` | The sans font stack | `typography.css` |
| `.font-mono` | The monospace font stack | `typography.css` |
| `.doc-element` | An element inside prose content | `typography.css` |
| `.prose-content` | Prose content — the reading measure of a long text | `typography.css` |
| `.tabular-nums` | font-variant-numeric: tabular-nums | `typography.css` |
| `.header-nav` | .header-nav rule | `typography.css` |
| `.page-header` | A page's title block — flex column for the breadcrumb, title and description | `typography.css` |

---

## border-elevation-focus.css

The partition-law border set (per side, three weights), elevation steps and the focus rings.

| Class | Applies | Source |
|:---|:---|:---|
| `.border` | Full border at the standard weight | `border-elevation-focus.css` |
| `.border-subtle` | Full border at the subtle weight | `border-elevation-focus.css` |
| `.border-strong` | Full border at the strong weight | `border-elevation-focus.css` |
| `.border-dashed` | border: 1px dashed var(--border) | `border-elevation-focus.css` |
| `.border-none` | border: none | `border-elevation-focus.css` |
| `.bt` | border-top: 1px solid var(--border) | `border-elevation-focus.css` |
| `.br` | border-right: 1px solid var(--border) | `border-elevation-focus.css` |
| `.bb` | border-bottom: 1px solid var(--border) | `border-elevation-focus.css` |
| `.bl` | border-left: 1px solid var(--border) | `border-elevation-focus.css` |
| `.bt-str` | border-top: 1px solid var(--border-strong) | `border-elevation-focus.css` |
| `.br-str` | border-right: 1px solid var(--border-strong) | `border-elevation-focus.css` |
| `.bb-str` | border-bottom: 1px solid var(--border-strong) | `border-elevation-focus.css` |
| `.bl-str` | border-left: 1px solid var(--border-strong) | `border-elevation-focus.css` |
| `.bt-sub` | border-top: 1px solid var(--border-subtle) | `border-elevation-focus.css` |
| `.br-sub` | border-right: 1px solid var(--border-subtle) | `border-elevation-focus.css` |
| `.bb-sub` | border-bottom: 1px solid var(--border-subtle) | `border-elevation-focus.css` |
| `.bl-sub` | border-left: 1px solid var(--border-subtle) | `border-elevation-focus.css` |
| `.bt-dash` | border-top: 1px dashed var(--border) | `border-elevation-focus.css` |
| `.br-dash` | border-right: 1px dashed var(--border) | `border-elevation-focus.css` |
| `.bb-dash` | border-bottom: 1px dashed var(--border) | `border-elevation-focus.css` |
| `.bl-dash` | border-left: 1px dashed var(--border) | `border-elevation-focus.css` |
| `.shad-none` | box-shadow: none | `border-elevation-focus.css` |
| `.shad-xs` | Elevation at the xs step — rides --shadow-xs | `border-elevation-focus.css` |
| `.shad-sm` | Elevation at the sm step — rides --shadow-sm | `border-elevation-focus.css` |
| `.shad-md` | Elevation at the md step — rides --shadow-md | `border-elevation-focus.css` |
| `.shad-bs` | Elevation at the bs step — rides --shadow-bs | `border-elevation-focus.css` |
| `.shad-lg` | Elevation at the lg step — rides --shadow-lg | `border-elevation-focus.css` |
| `.shad-xl` | Elevation at the xl step — rides --shadow-xl | `border-elevation-focus.css` |
| `.shad-2xl` | Elevation at the 2xl step — rides --shadow-2xl | `border-elevation-focus.css` |
| `.shad-3xl` | Elevation at the 3xl step — rides --shadow-3xl | `border-elevation-focus.css` |
| `.shad-hover-xs` | Elevation on hover at the xs step — rides --shadow-xs | `border-elevation-focus.css` |
| `.shad-hover-sm` | Elevation on hover at the sm step — rides --shadow-sm | `border-elevation-focus.css` |
| `.shad-hover-md` | Elevation on hover at the md step — rides --shadow-md | `border-elevation-focus.css` |
| `.shad-hover-bs` | Elevation on hover at the bs step — rides --shadow-bs | `border-elevation-focus.css` |
| `.shad-hover-lg` | Elevation on hover at the lg step — rides --shadow-lg | `border-elevation-focus.css` |
| `.shad-hover-xl` | Elevation on hover at the xl step — rides --shadow-xl | `border-elevation-focus.css` |
| `.shad-hover-2xl` | Elevation on hover at the 2xl step — rides --shadow-2xl | `border-elevation-focus.css` |
| `.shad-hover-3xl` | Elevation on hover at the 3xl step — rides --shadow-3xl | `border-elevation-focus.css` |
| `.focus-ring` | The default focus ring | `border-elevation-focus.css` |
| `.focus-theme` | A focus ring in the theme colour | `border-elevation-focus.css` |
| `.focus-none` | No focus ring | `border-elevation-focus.css` |

---

## layout-shell.css

Application chrome — header, main, sidebars, footer and the content widths.

| Class | Applies | Source |
|:---|:---|:---|
| `.app-shell` | Application shell root — flex column, full height, hosts the header, main and footer | `layout-shell.css` |
| `.app-header` | Sticky application header | `layout-shell.css` |
| `.clamped` | Clamp to the content width and centre | `layout-shell.css` |
| `.app-main` | Main region between header and footer — flex row, fitted to the viewport | `layout-shell.css` |
| `.main-section` | Primary content column inside .app-main | `layout-shell.css` |
| `.solo` | The main section is the only column | `layout-shell.css` |
| `.sidebar-left` | Left rail — nav role; off-canvas drawer on narrow screens | `layout-shell.css` |
| `.sidebar-right` | Right rail — table of contents | `layout-shell.css` |
| `.open` | Open state | `layout-shell.css` |
| `.app-footer` | Application footer | `layout-shell.css` |
| `.content-section` | Page content block — responsive padding and narrow width modes | `layout-shell.css` |
| `.null` | No width constraint | `layout-shell.css` |
| `.narrow-half` | Half the content width | `layout-shell.css` |
| `.narrow-wide` | Wide content width | `layout-shell.css` |
| `.narrow-full` | Full content width | `layout-shell.css` |
| `.nav-section` | display: flex | `layout-shell.css` |
| `.logo-link` | display: inline-flex | `layout-shell.css` |
| `.toc-section` | display: flex | `layout-shell.css` |
| `.toc-link` | display: block | `layout-shell.css` |

---

## colors-themes.css

Colour roles. Name the role, never the value; the theme remaps the token.

| Class | Applies | Source |
|:---|:---|:---|
| `.bg-main` | The page background | `colors-themes.css` |
| `.bg` | The page background | `colors-themes.css` |
| `.bg-surface` | Surface fill — cards, panels, inputs | `colors-themes.css` |
| `.bg-panel` | Panel fill — one step below the surface | `colors-themes.css` |
| `.bg-overlay` | Overlay fill — opaque, for menus, popovers, dialogs and drawers | `colors-themes.css` |
| `.bg-none` | No background | `colors-themes.css` |
| `.bg-black` | Fixed black fill | `colors-themes.css` |
| `.state-hover` | The hover fill | `colors-themes.css` |
| `.state-selected` | The selected fill | `colors-themes.css` |
| `.bg-input` | Input fill | `colors-themes.css` |
| `.bg-button` | Button fill | `colors-themes.css` |
| `.bg-button-secondary` | Secondary button fill | `colors-themes.css` |
| `.text-primary` | Primary ink | `colors-themes.css` |
| `.text-secondary` | Secondary ink | `colors-themes.css` |
| `.text-muted` | Muted ink | `colors-themes.css` |
| `.text-inverse` | Ink for a filled surface | `colors-themes.css` |
| `.text-white` | Fixed white ink | `colors-themes.css` |
| `.text-black` | Fixed black ink | `colors-themes.css` |
| `.text-theme` | Theme colour ink | `colors-themes.css` |
| `.text-theme-up` | Theme colour, one step up | `colors-themes.css` |
| `.text-theme-down` | Theme colour, one step down | `colors-themes.css` |
| `.text-success` | Success ink | `colors-themes.css` |
| `.text-warning` | Warning ink | `colors-themes.css` |
| `.text-danger` | Danger ink | `colors-themes.css` |
| `.text-info` | Info ink | `colors-themes.css` |
| `.bg-success` | Success fill | `colors-themes.css` |
| `.bg-warning` | Warning fill | `colors-themes.css` |
| `.bg-danger` | Danger fill | `colors-themes.css` |
| `.bg-info` | Info fill | `colors-themes.css` |

---

## motion-animation.css

Motion language — easings, durations and the keyframe animations.

| Class | Applies | Source |
|:---|:---|:---|
| `.mode-wipe` | On <html> — disables view transitions while a colour-mode wipe runs | `motion-animation.css` |
| `.anim-spin` | Spin — a continuous rotation | `motion-animation.css` |
| `.anim-pulse` | Pulse — a fade in and out | `motion-animation.css` |
| `.anim-fade-in` | Fade in | `motion-animation.css` |
| `.anim-fade-out` | Fade out | `motion-animation.css` |

---

## components.css

Components — buttons, inputs, links, tags, avatars, switches, checkboxes.

| Class | Applies | Source |
|:---|:---|:---|
| `.avatar-more` | The overflow avatar in an avatar group | `components.css` |
| `.avatar-group` | A group of avatars — stacked or in a row | `components.css` |
| `.circle` | Round avatars | `components.css` |
| `.rounded` | Rounded-square avatars | `components.css` |
| `.gap-overlap` | Overlap the avatars in the group | `components.css` |
| `.badge` | Count badge | `components.css` |
| `.tag` | Small inline label | `components.css` |
| `.ink-auto` | Pick white or near-black ink from the fill behind it (--tag-color on a tag, --ink-bg elsewhere) | `components.css` |
| `.text-only` | A tag with no fill — text only | `components.css` |
| `.tag-remove` | The remove control inside a tag | `components.css` |
| `.switch-box` | The switch track and thumb | `components.css` |
| `.checkbox-box` | The checkbox box | `components.css` |
| `.slide-unlock` | Slide-to-unlock control | `components.css` |
| `.card-clickable` | A card that responds to clicks | `components.css` |
| `.disabled` | Disabled state | `components.css` |
| `.is-invalid` | Invalid state — the field failed validation | `components.css` |
| `.select` | Select dropdown — themed field with a chevron | `components.css` |
| `.select-wrap` | The frame around a select and its chevron | `components.css` |
| `.select-chevron` | The chevron inside a select frame | `components.css` |
| `.input` | Text input — themed field with a focus ring | `components.css` |
| `.fitted` | The input is fitted to its container | `components.css` |
| `.link` | Themed link — theme colour, alternative on hover | `components.css` |
| `.link-plain` | Plain link — inherits the ink, theme colour on hover | `components.css` |
| `.link-parent` | Link block — hovers the colour of its .link-title child | `components.css` |
| `.link-title` | The title inside a .link-parent | `components.css` |
| `.button` | The button — variant, shape and size come from the prop classes | `components.css` |
| `.no-scaling` | Opt a button out of the press scale | `components.css` |
| `.btn-icon` | Square icon button — no padding, never shrinks, sized by its .h-* class | `components.css` |
| `.button-group` | Buttons joined into one control | `components.css` |
| `.split-button` | A button with a separate action area | `components.css` |
| `.vertical` | Stack the group vertically | `components.css` |
| `.btn` | Call-to-action button | `components.css` |
| `.fit-icon` | Icon button that is exactly its icon — no padding or border, sized by the icon | `components.css` |
| `.card` | A card — its size class sets the text scale, never the height | `components.css` |
| `.card-sized` | Scale a card's title, description, label and sub text with its size | `components.css` |
| `.card-label` | font-size: 1em — child of .card-sized | `components.css` |
| `.card-sub` | font-size: 0.95em — child of .card-sized | `components.css` |
| `.banner` | A banner — its size class sets padding and text size, height follows content | `components.css` |
| `.tint` | Soft status fill — the status colour mixed into the panel fill | `components.css` |
| `.info` | Status variant — the info colour | `components.css` |
| `.success` | Status variant — the success colour | `components.css` |
| `.warning` | Status variant — the warning colour | `components.css` |
| `.danger` | Status variant — the danger colour | `components.css` |
| `.field` | A framed control — the frame shows focus for the input inside it | `components.css` |
| `.collapse` | Opens and closes by height — add .open to open | `components.css` |
| `.data-table` | A table of records — collapsed borders, quiet header row, row hover | `components.css` |
| `.data-table-select` | The narrow checkbox column of a data table | `components.css` |
| `.data-table-empty` | The centred cell shown when a data table has no rows | `components.css` |
| `.ribbon-bookmark` | The notched bottom edge of a bookmark ribbon | `components.css` |
| `.carousel-track` | Drag-to-scroll on top of .reel — no scrollbar, grab cursors | `components.css` |
| `.is-draggable` | Shows the grab cursor on a draggable track | `components.css` |
| `.is-dragging` | A drag in progress — no snapping, no pointer events inside | `components.css` |
| `.track-min` | Minimum width of a horizontal slider track | `components.css` |
| `.track-v` | An upright slider track — its .h-* class sets the thickness | `components.css` |
| `.radio` | .radio rule | `components.css` |
| `.striped` | Shade every other row | `components.css` |
| `.selected` | Selected state — the current item in a set | `components.css` |

---

## component-props.css

Component props — the variant, shape and height classes Fractalsvelte UI consumes.

| Class | Applies | Source |
|:---|:---|:---|
| `.primary` | Primary variant — the default fill | `component-props.css` |
| `.secondary` | Secondary variant — a quieter fill | `component-props.css` |
| `.themed` | Themed variant — filled with the theme colour | `component-props.css` |
| `.outline` | Outline variant — border only | `component-props.css` |
| `.ghost` | Ghost variant — no fill until hover | `component-props.css` |
| `.msg` | Message fill — the status scale's soft fill, border and ink (with .info, .success, .warning, .danger or .neutral) | `component-props.css` |
| `.neutral` | Status — the neutral tone | `component-props.css` |
| `.hgrow` | The size class becomes a minimum height; the control grows with its content | `component-props.css` |

---

## responsive.css

Visibility by breakpoint band. The bands are 769px, 1025px, 1281px, 1441px.

| Class | Applies | Source |
|:---|:---|:---|
| `.md-only` | Visible from the md band up (1025px) | `responsive.css` |
| `.lg-only` | Visible from the lg band up (1281px) | `responsive.css` |
| `.xl-only` | Visible from the xl band up (1441px) | `responsive.css` |
| `.md-hide` | Hidden from the md band up (1025px) | `responsive.css` |
| `.lg-hide` | Hidden from the lg band up (1281px) | `responsive.css` |
| `.xl-hide` | Hidden from the xl band up (1441px) | `responsive.css` |

---

## custom.css

The sanctioned extension layer — branding, the mascot, and anything a project owns.

| Class | Applies | Source |
|:---|:---|:---|
| `.site-logomotif` | Site logo motif — scales on hover | `custom.css` |
| `.logotype` | Logotype — the wordmark | `custom.css` |
| `.project-circle` | Project dot | `custom.css` |
| `.mascot` | The mascot — the site character | `custom.css` |
| `.mascot-bob` | The mascot bobs | `custom.css` |
| `.mascot-tilt` | The mascot tilts | `custom.css` |
| `.mascot-bobs` | .mascot-bobs rule | `custom.css` |
| `.mascot-base` | The mascot body | `custom.css` |
| `.mascot-overlay` | The mascot overlay | `custom.css` |
| `.mascot-mask` | The mascot mask | `custom.css` |
| `.mascot-pupil-l` | The mascot left pupil | `custom.css` |
| `.mascot-pupil-r` | The mascot right pupil | `custom.css` |
| `.mascot-gloss` | The mascot gloss | `custom.css` |
| `.mascot-shade` | The mascot shade | `custom.css` |
| `.mascot-lid` | The mascot eyelid | `custom.css` |
| `.mascot-blinks` | .mascot-blinks rule | `custom.css` |
| `.mascotgl` | display: inline-block | `custom.css` |
| `.mascotgl-spacer` | display: block | `custom.css` |
| `.mascotgl-canvas` | position: absolute | `custom.css` |
| `.mascotgl-ready` | opacity: 1 | `custom.css` |
| `.mascotgl-compact` | .mascotgl-compact rule | `custom.css` |

---

## modular.css

The sveltemodular workspace chrome.

| Class | Applies | Source |
|:---|:---|:---|
| `.modular` | .modular rule | `modular.css` |
| `.modular-root` | position: relative | `modular.css` |
| `.modular-split` | display: flex | `modular.css` |
| `.modular-split-child` | position: relative | `modular.css` |
| `.modular-divider` | position: relative | `modular.css` |
| `.active` | Active state | `modular.css` |
| `.modular-split-ratio-pill` | position: absolute | `modular.css` |
| `.modular-panel` | position: relative | `modular.css` |
| `.modular-tabbar` | display: flex | `modular.css` |
| `.modular-tab` | position: relative | `modular.css` |
| `.modular-tab-title` | overflow: hidden | `modular.css` |
| `.modular-badge` | display: inline-flex | `modular.css` |
| `.modular-tab-close` | display: inline-flex — child of :where(.modular) | `modular.css` |
| `.modular-tab-accessory` | flex: 1 1 0% | `modular.css` |
| `.modular-tab-actions` | display: flex | `modular.css` |
| `.modular-action-button` | display: inline-flex — child of :where(.modular) | `modular.css` |
| `.modular-menu-button` | display: inline-flex — child of :where(.modular) | `modular.css` |
| `.modular-panel-body` | position: relative | `modular.css` |
| `.modular-view` | position: relative | `modular.css` |
| `.modular-drop-overlay` | position: absolute | `modular.css` |
| `.modular-drop-indicator` | position: absolute | `modular.css` |
| `.modular-maximized` | position: absolute | `modular.css` |
| `.modular-maximized-bar` | display: flex | `modular.css` |
| `.modular-maximized-title` | font-weight: 600 | `modular.css` |
| `.modular-maximized-body` | flex: 1 1 0% | `modular.css` |
| `.modular-floating` | position: absolute | `modular.css` |
| `.modular-tabbar-drag` | cursor: grab | `modular.css` |
| `.modular-floating-resize` | position: absolute | `modular.css` |
| `.modular-hidden-tray` | position: absolute | `modular.css` |
| `.modular-hidden-button` | padding: 4px 8px | `modular.css` |
| `.modular-stage` | position: relative | `modular.css` |
| `.modular-stage-child` | position: relative | `modular.css` |
| `.modular-stage-backdrop` | position: absolute | `modular.css` |
| `.modular-stage-empty` | flex: 1 1 0% | `modular.css` |
| `.modular-empty` | flex: 1 1 0% | `modular.css` |
| `.modular-chrome` | position: absolute | `modular.css` |
| `.modular-menu` | position: fixed | `modular.css` |
| `.modular-menu-item` | display: flex — child of :where(dialog.modular-menu) | `modular.css` |
| `.modular-menu-separator` | height: 1px | `modular.css` |
| `.modular-popout-body` | margin: 0 | `modular.css` |
| `.modular-popout-view` | width: 100% | `modular.css` |

---

## Semantic Tokens

```css
  --prose-clamp: 65ch;
  --content-clamp: 1600px;
  --app-inline: var(--space-lg);
  --card-min: 240px;
  --sidebar-width: 280px;
  --sidebar-width-left: 280px;
  --sidebar-width-right: 280px;
  --z-sticky: 100;
  --z-raised: 200;
  --z-modal: 300;
  --z-toast: 500;
  --z-100: 100;
  --z-200: 200;
  --z-300: 300;
  --z-400: 400;
  --z-500: 500;
  --z-600: 600;
  --z-700: 700;
  --z-800: 800;
  --z-900: 900;
  --z-999: 999;
  --font-sans: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --space-xs: 0.25rem;
  --space-sm: 0.50rem;
  --space-md: 0.75rem;
  --space-bs: 1.00rem;
  --space-lg: 1.50rem;
  --space-xl: 2.00rem;
  --space-2xl: 3.00rem;
  --space-3xl: 4.00rem;
  --radius-xs: 2px;
  --radius-sm: 3px;
  --radius-md: 6px;
  --radius-bs: 12px;
  --radius-lg: 16px;
  --radius-full: 999px;
  --h-xs: 12px;
  --h-sm: 16px;
  --h-md: 20px;
  --h-bs: 27px;
  --h-lg: 32px;
  --h-xl: 40px;
  --h-2xl: 48px;
  --h-3xl: 64px;
  --header-height: 64px;
  --footer-height: 32px;
  --fit-height: calc(var(--header-height) + var(--footer-height));
  --text-static-md: 0.80rem;
  --text-static-bs: 0.95rem;
  --text-static-lg: 1.12rem;
  --text-static-xl: 1.31rem;
  --text-static-2xl: 1.54rem;
  --text-static-3xl: 1.80rem;
  --text-static-4xl: 2.10rem;
  --text-static-5xl: 2.45rem;
  --text-fluid-md: clamp(0.8333rem, 0.8061rem + 0.1212vw, 0.9rem);
  --text-fluid-bs: clamp(1rem, 0.9489rem + 0.2273vw, 1rem);
  --text-fluid-lg: clamp(1.2rem, 1.1156rem + 0.375vw, 1.4063rem);
  --text-fluid-xl: clamp(1.44rem, 1.31rem + 0.5778vw, 1.7578rem);
  --text-fluid-2xl: clamp(1.728rem, 1.536rem + 0.8532vw, 2.1973rem);
  --text-fluid-3xl: clamp(2.0736rem, 1.7983rem + 1.2236vw, 2.7466rem);
  --text-fluid-4xl: clamp(2.4883rem, 2.1018rem + 1.718vw, 3.4332rem);
  --text-fluid-5xl: clamp(2.986rem, 2.4519rem + 2.3737vw, 4.2915rem);
  --text-xs: 0.67rem;
  --text-sm: 0.75rem;
  --text-md: var(--text-static-md);
  --text-bs: var(--text-static-bs);
  --text-lg: var(--text-static-lg);
  --text-xl: var(--text-static-xl);
  --text-2xl: var(--text-static-2xl);
  --text-3xl: var(--text-static-3xl);
  --text-4xl: var(--text-static-4xl);
  --text-5xl: var(--text-static-5xl);
  --white-fixed: #FFFFFF;
  --black-fixed: #18181B;
  --bg: oklch(1.00 0.000 148);
  --bg-surface: oklch(0.96 0.000 148);
  --bg-panel: oklch(0.94 0.000 148);
  --bg-overlay: oklch(1.00 0.000 148);
  --bg-button: oklch(0.20 0.002 148);
  --bg-button-hover: oklch(0.28 0.002 148);
  --bg-button-active: oklch(0.15 0.002 148);
  --bg-button-secondary: oklch(0.50 0.002 148);
  --bg-button-secondary-hover: oklch(0.58 0.002 148);
  --bg-button-secondary-active: oklch(0.44 0.002 148);
  --bg-input: oklch(0.96 0.000 148);
  --state-hover: oklch(0 0 0 / .15);
  --state-selected: oklch(0 0 0 / .3);
  --border: oklch(0.90 0.000 148);
  --border-strong: oklch(0.75 0.000 148);
  --border-subtle: oklch(0.95 0.000 148);
  --text-primary: oklch(0.15 0.003 148);
  --text-secondary: oklch(0.40 0.003 148);
  --text-muted: oklch(0.60 0.005 148);
  --text-inverse: oklch(1.00 0.000 148);
  --theme-color: oklch(0.50 0.750 130);
  --theme-color-up: oklch(0.75 0.750 130);
  --theme-color-down: oklch(0.40 0.750 130);
  --success: oklch(0.65 0.200 138);
  --success-hover: oklch(0.55 0.200 138);
  --warning: oklch(0.85 0.180 92);
  --warning-hover: oklch(0.80 0.180 92);
  --danger: oklch(0.60 0.250 25);
  --danger-hover: oklch(0.50 0.250 25);
  --info: oklch(0.50 0.220 260);
  --info-hover: oklch(0.40 0.220 260);
  --ring: rgba(255, 208, 0, 0.4);
  --shadow-color: 0 0 0;
  --shadow-rim: inset 0 1px 0 rgba(255, 255, 255, 0.6);
  --shadow-xs: 0 1px 2px rgb(var(--shadow-color) / 0.05);
  --shadow-sm: 0 1px 2px rgb(var(--shadow-color) / 0.1), 0 2px 4px rgb(var(--shadow-color) / 0.05);
  --shadow-md: 0 2px 4px rgb(var(--shadow-color) / 0.1), 0 8px 16px rgb(var(--shadow-color) / 0.2);
  --shadow-bs: 0 2px 4px rgb(var(--shadow-color) / 0.1), 0 6px 14px rgb(var(--shadow-color) / 0.2);
  --shadow-lg: 0 4px 8px rgb(var(--shadow-color) / 0.1), 0 12px 24px rgb(var(--shadow-color) / 0.2);
  --shadow-xl: 0 8px 16px rgb(var(--shadow-color) / 0.1), 0 20px 36px rgb(var(--shadow-color) / 0.2);
  --shadow-2xl: 0 12px 24px rgb(var(--shadow-color) / 0.1), 0 28px 48px rgb(var(--shadow-color) / 0.2);
  --shadow-3xl: 0 16px 32px rgb(var(--shadow-color) / 0.1), 0 36px 64px rgb(var(--shadow-color) / 0.2);
  --success-00: oklch(0.98 0.070 138);
  --success-25: oklch(0.82 0.150 138);
  --success-50: oklch(0.65 0.200 138);
  --success-75: oklch(0.45 0.200 138);
  --success-100: oklch(0.25 0.200 138);
  --warning-00: oklch(0.95 0.100 92);
  --warning-25: oklch(0.90 0.140 92);
  --warning-50: oklch(0.85 0.180 92);
  --warning-75: oklch(0.70 0.180 92);
  --warning-100: oklch(0.55 0.180 92);
  --danger-00: oklch(0.95 0.150 25);
  --danger-25: oklch(0.76 0.150 25);
  --danger-50: oklch(0.60 0.250 25);
  --danger-75: oklch(0.40 0.250 25);
  --danger-100: oklch(0.20 0.250 25);
  --info-00: oklch(0.95 0.050 260);
  --info-25: oklch(0.70 0.150 260);
  --info-50: oklch(0.50 0.220 260);
  --info-75: oklch(0.35 0.220 260);
  --info-100: oklch(0.20 0.120 260);
  --neutral-00: oklch(0.92 0.002 210);
  --neutral-25: oklch(0.80 0.002 140);
  --neutral-50: oklch(0.60 0.010 140);
  --neutral-75: oklch(0.40 0.010 140);
  --neutral-100: oklch(0.30 0.010 140);
  --transin1: cubic-bezier(0.470, 0.000, 0.745, 0.715);
  --transin2: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  --transin3: cubic-bezier(0.755, 0.050, 0.855, 0.060);
  --transout1: cubic-bezier(0.390, 0.575, 0.565, 1.000);
  --transout2: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  --transout3: cubic-bezier(0.230, 1.000, 0.320, 1.000);
  --speed0: 50ms;
  --speed1: 90ms;
  --speed2: 140ms;
  --speed3: 220ms;
  --motionin1: var(--speed0) var(--transin1);
  --motionout1: var(--speed1) var(--transout1);
  --motionin2: var(--speed2) var(--transin2);
  --motionout2: var(--speed2) var(--transout2);
  --motionin3: var(--speed3) var(--transin3);
  --motionout3: var(--speed3) var(--transout3);
  --bp-sm: 769px;
  --bp-md: 1025px;
  --bp-lg: 1281px;
  --bp-xl: 1441px;
  --fs-green90: oklch(0.354 0.093 151.75);
  --fs-green80: oklch(0.407 0.129 146.54);
  --fs-green70: oklch(0.443 0.142 144.11);
  --fs-green60: oklch(0.473 0.157 142.49);
  --fs-green50: oklch(0.686 0.203 139.73);
  --fs-green40: oklch(0.852 0.231 133.56);
  --fs-green30: oklch(0.923 0.222 124.96);
  --fs-green20: oklch(0.957 0.237 114.73);
  --fs-green55: oklch(0.618 0.174 142.11);
  --fs-green56: oklch(0.613 0.198 143.74);
  --fs-green45: oklch(0.793 0.202 136.63);
  --fs-green46: oklch(0.835 0.178 139.11);
  --fs-blue95: oklch(0.201 0.048 238.15);
  --fs-blue90: oklch(0.252 0.076 244.62);
  --fs-blue85: oklch(0.297 0.089 242.06);
  --fs-blue80: oklch(0.329 0.099 243.83);
  --fs-blue70: oklch(0.399 0.121 245.91);
  --fs-blue60: oklch(0.435 0.134 246.59);
  --fs-blue55: oklch(0.485 0.134 238.16);
  --fs-blue50: oklch(0.569 0.125 237.49);
  --fs-blue45: oklch(0.601 0.165 231.84);
  --fs-blue40: oklch(0.609 0.129 237.15);
  --fs-blue30: oklch(0.672 0.103 234.34);
  --fs-blue20: oklch(0.732 0.079 232.01);
  --fs-blue10: oklch(0.804 0.054 227.18);
  --fs-orange85: oklch(0.187 0.065 277.94);
  --fs-orange80: oklch(0.251 0.111 12.98);
  --fs-orange75: oklch(0.325 0.171 18.72);
  --fs-orange70: oklch(0.407 0.218 24.12);
  --fs-orange65: oklch(0.514 0.222 28.53);
  --fs-orange60: oklch(0.548 0.231 32.22);
  --fs-orange55: oklch(0.612 0.217 38.31);
  --fs-orange50: oklch(0.627 0.229 42.18);
  --fs-orange45: oklch(0.638 0.225 43.15);
  --fs-orange40: oklch(0.648 0.221 44.15);
  --fs-orange35: oklch(0.658 0.215 45.45);
  --fs-orange30: oklch(0.669 0.207 46.86);
  --fs-orange25: oklch(0.681 0.197 48.33);
  --fs-orange20: oklch(0.693 0.187 50.01);
  --fs-orange15: oklch(0.706 0.176 51.58);
  --fs-orange10: oklch(0.720 0.163 53.33);
  --fs-red80: oklch(0.347 0.124 10.45);
  --fs-red75: oklch(0.368 0.131 11.83);
  --fs-red70: oklch(0.392 0.138 13.01);
  --fs-red65: oklch(0.429 0.161 14.93);
  --fs-red60: oklch(0.479 0.185 17.58);
  --fs-red55: oklch(0.488 0.187 18.02);
  --fs-red50: oklch(0.509 0.194 18.78);
  --fs-red45: oklch(0.531 0.201 19.46);
  --fs-red40: oklch(0.551 0.208 20.06);
  --fs-red35: oklch(0.575 0.216 20.67);
  --fs-red30: oklch(0.589 0.221 21.03);
  --fs-red25: oklch(0.632 0.258 14.12);
  --fs-red20: oklch(0.686 0.231 12.33);
  --fs-red15: oklch(0.716 0.198 11.45);
  --fs-red10: oklch(0.768 0.147 10.51);
  --fs-red05: oklch(0.835 0.093 9.49);
  --fs-red00: oklch(0.957 0.021 8.87);
  --fs-blue11: oklch(0.531 0.136 244.62);
  --fs-blue12: oklch(0.536 0.137 245.24);
  --fs-blue13: oklch(0.539 0.146 242.06);
  --fs-blue14: oklch(0.539 0.089 193.31);
  --fs-blue15: oklch(0.493 0.076 193.31);
  --fs-blue16: oklch(0.551 0.126 238.16);
  --fs-blue17: oklch(0.579 0.092 216.51);
  --fs-blue18: oklch(0.635 0.103 203.95);
  --fs-blue19: oklch(0.579 0.081 184.28);
  --fs-blue21: oklch(0.648 0.111 200.74);
  --fs-blue22: oklch(0.669 0.076 172.58);
  --fs-blue23: oklch(0.710 0.081 170.82);
  --fs-blue24: oklch(0.697 0.113 194.21);
  --fs-blue25: oklch(0.757 0.084 163.63);
  --fs-blue26: oklch(0.798 0.088 159.26);
  --fs-blue27: oklch(0.720 0.113 198.54);
  --fs-blue28: oklch(0.754 0.095 190.62);
  --fs-teal11: oklch(0.852 0.098 153.22);
  --fs-teal12: oklch(0.892 0.078 153.46);
  --fs-teal13: oklch(0.339 0.149 308.82);
  --fs-teal14: oklch(0.380 0.169 307.39);
  --fs-teal15: oklch(0.407 0.198 305.62);
  --fs-teal16: oklch(0.428 0.207 303.74);
  --fs-teal17: oklch(0.472 0.169 290.49);
  --fs-teal18: oklch(0.505 0.169 292.05);
  --fs-teal19: oklch(0.542 0.168 293.75);
  --fs-teal20: oklch(0.518 0.202 316.52);
  --fs-teal21: oklch(0.551 0.209 316.48);
  --fs-teal22: oklch(0.592 0.205 316.03);
  --fs-teal23: oklch(0.626 0.195 315.71);
  --fs-teal24: oklch(0.667 0.181 316.14);
  --fs-teal25: oklch(0.697 0.166 317.06);
  --fs-teal26: oklch(0.591 0.176 304.09);
  --fs-teal27: oklch(0.716 0.126 302.21);
  --fs-teal28: oklch(0.762 0.099 301.62);
  --fs-teal29: oklch(0.832 0.053 301.44);
  --fs-neutral11: oklch(0.732 0.014 256.78);
  --fs-neutral12: oklch(0.828 0.000 0.00);
  --fs-neutral13: oklch(0.852 0.011 254.12);
  --fs-neutral14: oklch(0.895 0.009 252.87);
  --fs-neutral15: oklch(0.932 0.006 251.78);
  --fs-neutral16: oklch(0.923 0.003 264.05);
  --fs-neutral17: oklch(0.932 0.006 251.78);
  --fs-neutral18: oklch(0.974 0.002 247.84);
  --fs-neutral19: oklch(0.957 0.000 0.00);
  --fs-neutral20: oklch(0.963 0.003 264.05);
  --fs-neutral21: oklch(0.957 0.000 0.00);
  --fs-neutral22: oklch(0.974 0.002 247.84);
  --fs-neutral23: oklch(0.208 0.013 259.73);
  --fs-neutral24: oklch(0.279 0.013 259.73);
  --fs-neutral25: oklch(0.362 0.013 258.15);
  --fs-neutral26: oklch(0.395 0.000 0.00);
  --fs-neutral27: oklch(0.450 0.011 270.00);
  --fs-neutral28: oklch(0.485 0.013 256.78);
  --fs-neutral29: oklch(0.559 0.000 0.00);
  --fs-neutral30: oklch(0.662 0.007 274.62);
  --fs-neutral31: oklch(0.732 0.014 256.78);
  --fs-surface-whitea1: oklch(0.974 0.008 247.84);
  --fs-surface-whitea2: oklch(0.957 0.013 247.38);
  --fs-surface-whitea3: oklch(0.916 0.018 245.91);
  --fs-surface-whitea4: oklch(0.852 0.024 245.03);
  --fs-surface-whitea5: oklch(0.686 0.031 243.68);
  --fs-surface-whitea6: oklch(0.531 0.038 240.23);
  --fs-surface-whitea7: oklch(0.443 0.040 238.90);
  --fs-surface-whitea8: oklch(0.370 0.039 237.49);
  --fs-surface-whitea9: oklch(0.252 0.039 237.75);
  --fs-surface-whiteb1: oklch(0.985 0.000 0.00);
  --fs-surface-whiteb2: oklch(0.963 0.003 264.05);
  --fs-surface-whiteb3: oklch(0.916 0.005 264.05);
  --fs-surface-whiteb4: oklch(0.864 0.007 264.05);
  --fs-surface-whiteb5: oklch(0.693 0.007 264.05);
  --fs-surface-whiteb6: oklch(0.531 0.007 264.05);
  --fs-surface-whiteb7: oklch(0.443 0.007 264.05);
  --fs-surface-whiteb8: oklch(0.370 0.007 264.05);
  --fs-surface-whiteb9: oklch(0.279 0.007 264.05);
  --fs-surface-whitec1: oklch(0.984 0.002 96.00);
  --fs-surface-whitec2: oklch(0.970 0.005 92.54);
  --fs-surface-whitec3: oklch(0.950 0.009 88.36);
  --fs-surface-whitec4: oklch(0.923 0.014 83.25);
  --fs-surface-whitec5: oklch(0.895 0.017 80.36);
  --fs-surface-whitec6: oklch(0.864 0.022 76.53);
  --fs-surface-whitec7: oklch(0.828 0.024 73.91);
  --fs-surface-whitec8: oklch(0.787 0.029 70.36);
  --fs-surface-whitec9: oklch(0.739 0.033 66.82);
  --fs-surface-whited1: oklch(0.977 0.004 165.23);
  --fs-surface-whited2: oklch(0.953 0.009 164.22);
  --fs-surface-whited3: oklch(0.923 0.014 163.63);
  --fs-surface-whited4: oklch(0.887 0.020 162.77);
  --fs-surface-whited5: oklch(0.841 0.026 161.77);
  --fs-surface-whited6: oklch(0.787 0.033 160.71);
  --fs-surface-whited7: oklch(0.723 0.038 159.26);
  --fs-surface-whited8: oklch(0.655 0.043 158.33);
  --fs-surface-whited9: oklch(0.582 0.046 156.98);
  --fs-surface-whitee1: oklch(0.985 0.000 0.00);
  --fs-surface-whitee2: oklch(0.974 0.004 18.02);
  --fs-surface-whitee3: oklch(0.947 0.012 18.02);
  --fs-surface-whitee4: oklch(0.906 0.020 18.02);
  --fs-surface-whitee5: oklch(0.852 0.030 18.02);
  --fs-surface-whitee6: oklch(0.787 0.041 18.02);
  --fs-surface-whitee7: oklch(0.706 0.051 18.02);
  --fs-surface-whitee8: oklch(0.621 0.059 18.02);
  --fs-surface-whitee9: oklch(0.528 0.066 18.02);
  --fs-surface-whitef1: oklch(0.977 0.003 264.05);
  --fs-surface-whitef2: oklch(0.947 0.006 264.05);
  --fs-surface-whitef3: oklch(0.912 0.009 264.05);
  --fs-surface-whitef4: oklch(0.869 0.012 264.05);
  --fs-surface-whitef5: oklch(0.820 0.016 264.05);
  --fs-surface-whitef6: oklch(0.758 0.019 264.05);
  --fs-surface-whitef7: oklch(0.686 0.023 264.05);
  --fs-surface-whitef8: oklch(0.601 0.027 264.05);
  --fs-surface-whitef9: oklch(0.505 0.030 264.05);
  --fs-surface-whiteg1: oklch(0.980 0.005 84.29);
  --fs-surface-whiteg2: oklch(0.953 0.011 81.87);
  --fs-surface-whiteg3: oklch(0.923 0.016 78.69);
  --fs-surface-whiteg4: oklch(0.880 0.022 75.38);
  --fs-surface-whiteg5: oklch(0.828 0.029 72.33);
  --fs-surface-whiteg6: oklch(0.768 0.035 69.12);
  --fs-surface-whiteg7: oklch(0.697 0.040 65.55);
  --fs-surface-whiteg8: oklch(0.621 0.046 62.15);
  --fs-surface-whiteg9: oklch(0.539 0.050 58.75);
  --fs-surface-whiteh1: oklch(0.974 0.008 247.84);
  --fs-surface-whiteh2: oklch(0.953 0.013 252.87);
  --fs-surface-whiteh3: oklch(0.923 0.020 256.78);
  --fs-surface-whiteh4: oklch(0.895 0.027 260.15);
  --fs-surface-whiteh5: oklch(0.852 0.035 261.90);
  --fs-surface-whiteh6: oklch(0.804 0.045 264.05);
  --fs-surface-whiteh7: oklch(0.739 0.055 264.63);
  --fs-surface-whiteh8: oklch(0.662 0.067 265.50);
  --fs-surface-whiteh9: oklch(0.569 0.078 266.36);
  --fs-surface-blacka1: oklch(0.187 0.033 256.78);
  --fs-surface-blacka2: oklch(0.252 0.039 237.75);
  --fs-surface-blacka3: oklch(0.362 0.039 253.30);
  --fs-surface-blacka4: oklch(0.443 0.040 250.77);
  --fs-surface-blacka5: oklch(0.531 0.038 240.23);
  --fs-surface-blacka6: oklch(0.686 0.029 251.78);
  --fs-surface-blacka7: oklch(0.852 0.015 254.12);
  --fs-surface-blacka8: oklch(0.916 0.009 252.87);
  --fs-surface-blacka9: oklch(0.979 0.002 247.84);
  --fs-surface-blackb1: oklch(0.174 0.013 286.53);
  --fs-surface-blackb2: oklch(0.208 0.013 259.73);
  --fs-surface-blackb3: oklch(0.279 0.007 264.05);
  --fs-surface-blackb4: oklch(0.370 0.007 264.05);
  --fs-surface-blackb5: oklch(0.443 0.007 264.05);
  --fs-surface-blackb6: oklch(0.531 0.007 264.05);
  --fs-surface-blackb7: oklch(0.693 0.007 264.05);
  --fs-surface-blackb8: oklch(0.864 0.007 264.05);
  --fs-surface-blackb9: oklch(0.985 0.000 0.00);
  --fs-surface-blackc1: oklch(0.201 0.014 67.38);
  --fs-surface-blackc2: oklch(0.243 0.018 73.19);
  --fs-surface-blackc3: oklch(0.301 0.021 75.38);
  --fs-surface-blackc4: oklch(0.380 0.027 75.87);
  --fs-surface-blackc5: oklch(0.472 0.032 76.84);
  --fs-surface-blackc6: oklch(0.582 0.038 78.07);
  --fs-surface-blackc7: oklch(0.706 0.041 78.48);
  --fs-surface-blackc8: oklch(0.835 0.039 78.58);
  --fs-surface-blackc9: oklch(0.966 0.011 86.68);
  --fs-surface-blackd1: oklch(0.161 0.016 160.71);
  --fs-surface-blackd2: oklch(0.208 0.022 163.63);
  --fs-surface-blackd3: oklch(0.279 0.030 162.22);
  --fs-surface-blackd4: oklch(0.370 0.038 160.71);
  --fs-surface-blackd5: oklch(0.472 0.046 159.26);
  --fs-surface-blackd6: oklch(0.582 0.054 158.33);
  --fs-surface-blackd7: oklch(0.706 0.061 157.34);
  --fs-surface-blackd8: oklch(0.835 0.062 155.85);
  --fs-surface-blackd9: oklch(0.957 0.017 155.08);
  --fs-surface-blacke1: oklch(0.150 0.036 303.74);
  --fs-surface-blacke2: oklch(0.201 0.045 303.74);
  --fs-surface-blacke3: oklch(0.270 0.055 303.74);
  --fs-surface-blacke4: oklch(0.352 0.069 303.74);
  --fs-surface-blacke5: oklch(0.450 0.084 303.74);
  --fs-surface-blacke6: oklch(0.569 0.103 303.74);
  --fs-surface-blacke7: oklch(0.706 0.121 303.74);
  --fs-surface-blacke8: oklch(0.841 0.123 303.74);
  --fs-surface-blacke9: oklch(0.947 0.016 303.74);
  --fs-surface-blackf1: oklch(0.174 0.013 264.05);
  --fs-surface-blackf2: oklch(0.224 0.017 264.05);
  --fs-surface-blackf3: oklch(0.301 0.021 264.05);
  --fs-surface-blackf4: oklch(0.395 0.025 264.05);
  --fs-surface-blackf5: oklch(0.505 0.029 264.05);
  --fs-surface-blackf6: oklch(0.635 0.033 264.05);
  --fs-surface-blackf7: oklch(0.787 0.037 264.05);
  --fs-surface-blackf8: oklch(0.916 0.034 264.05);
  --fs-surface-blackf9: oklch(0.953 0.012 264.05);
  --fs-surface-blackg1: oklch(0.187 0.021 67.38);
  --fs-surface-blackg2: oklch(0.243 0.027 70.36);
  --fs-surface-blackg3: oklch(0.325 0.035 73.19);
  --fs-surface-blackg4: oklch(0.419 0.043 75.38);
  --fs-surface-blackg5: oklch(0.528 0.051 77.21);
  --fs-surface-blackg6: oklch(0.655 0.059 78.85);
  --fs-surface-blackg7: oklch(0.804 0.061 79.43);
  --fs-surface-blackg8: oklch(0.906 0.049 80.73);
  --fs-surface-blackg9: oklch(0.947 0.013 88.36);
  --fs-surface-blackh1: oklch(0.161 0.027 264.05);
  --fs-surface-blackh2: oklch(0.208 0.039 264.05);
  --fs-surface-blackh3: oklch(0.279 0.052 264.05);
  --fs-surface-blackh4: oklch(0.370 0.069 264.05);
  --fs-surface-blackh5: oklch(0.472 0.088 264.05);
  --fs-surface-blackh6: oklch(0.591 0.109 264.05);
  --fs-surface-blackh7: oklch(0.739 0.130 264.63);
  --fs-surface-blackh8: oklch(0.869 0.125 265.21);
  --fs-surface-blackh9: oklch(0.953 0.009 264.05);
  --fs-success-00: oklch(0.98 0.100 138);
  --fs-success-25: oklch(0.82 0.150 138);
  --fs-success-50: oklch(0.65 0.200 138);
  --fs-success-75: oklch(0.45 0.200 138);
  --fs-success-100: oklch(0.25 0.200 138);
  --fs-warning-00: oklch(0.95 0.100 92);
  --fs-warning-25: oklch(0.90 0.140 92);
  --fs-warning-50: oklch(0.85 0.180 92);
  --fs-warning-75: oklch(0.70 0.180 92);
  --fs-warning-100: oklch(0.55 0.180 92);
  --fs-danger-00: oklch(0.95 0.150 25);
  --fs-danger-25: oklch(0.76 0.150 25);
  --fs-danger-50: oklch(0.60 0.250 25);
  --fs-danger-75: oklch(0.40 0.250 25);
  --fs-danger-100: oklch(0.20 0.250 25);
  --fs-info-00: oklch(0.90 0.100 260);
  --fs-info-25: oklch(0.70 0.150 260);
  --fs-info-50: oklch(0.50 0.220 260);
  --fs-info-75: oklch(0.35 0.220 260);
  --fs-info-100: oklch(0.20 0.220 260);
```
