# Classes

Fractalstyler has a lean set of classes to use.
Do not create new classes. Styling is done by combining classes in the markup.

The current stylesheet is <!-- gen:begin counts -->654 classes, 473 tokens, 14 layers<!-- gen:end counts -->. The class index is generated whole in `./classes-index.md`; the CSS below is the definition layer for each family, quoted from `src/lib/styles` on every regeneration.

## Choosing Classes In Order

Work outside-in, one decision per axis. Each step is a class family; stop when the layout is correct.

1. Display - `.box` / `.column` (flex column), `.row` (flex row), `.grid-*`, `.reel`, or an inline variant.
2. Direction and wrapping - `.wrap` on a row that must reflow, `.grow` on the child that absorbs slack, `.shrink-0` on the child that must not.
3. Alignment - a container modifier: `xcenter` / `xleft` / `xright` / `xbetween` / `xevenly` / `xaround` and the `y*` partners.
4. Spacing - one gap rung on the container (`.gap-*`), padding only where a surface needs breathing room (`.pad-*`, `.px-*`, `.py-*`).
5. Size - a step class (`.h-*`), a measure class (`.measure-*`), or a fill class (`.wfull`, `.full`).
6. Overflow and minimums - `.min0` on anything that must shrink below its content, `.scroll-y` / `.scroll-x` where a region owns its scroll.
7. Surface - background, then border or elevation - and per the house rules, not both at once.
8. Responsive check - does the row still fit below 1025px? Add `.wrap`, a lower `.grid-*` rung, or `.md-hide` / `.lg-hide`.

## Watch For!

1. Modifiers never stand alone. `xcenter`, `ytop` and the rest resolve only on their container: `.row.xcenter`, `.box.ycenter`, `.grid.xbetween`. There is no bare `.xcenter`, and putting one on a `.box` child does nothing to the child.

2. `x` and `y` are physical, not axis-relative. They mean the same on `.box` and `.row`; which CSS property carries the effect differs per container, and the definitions below are the source of truth for that. `.row.xleft` sets `justify-content` while `.box.xleft` sets `align-items`.

3. A flex child that must shrink needs `.min0`. Text, an input, or a nested row inside a `.row` will otherwise push the row wider than its parent. `.grow` without `.min0` on the sibling content is the usual cause of an overflow that appears only on long strings.

4. One scroll owner per region. `.scroll-y`, `.scroll-x`, `.scroll-menu`, `.reel` each claim the axis. Nesting two makes both unusable.

5. Breakpoints are bands, not prefixes. The media literals are 769 / 1025 / 1281 / 1441px (`--bp-sm` through `--bp-xl`; media queries cannot consume custom properties, so the CSS repeats them as literals). Responsive visibility is `.md-only`, `.lg-only`, `.xl-only` and `.md-hide`, `.lg-hide`, `.xl-hide`. There are no `sm:` / `md:` style prefixes.

6. `.grid-4` through `.grid-12` are two-step. They go 1 column, then an intermediate count at 1025px, then the full count at 1281px.

7. `gap-xs` exists but is off-limits for layout gaps.


## Borders, Elevation, Focus

Read this section as: pick a separation method (space, background step, border, elevation), then a rung on it. `.focus-none` removes the only focus indicator an element has - use it only where the surrounding `.field` or group draws focus instead, exactly as `.field > .input:focus-visible` does. Never put it on a standalone interactive element.

The `.shad-hover-*` family is a reduction ladder: the base shadow shows at rest and shrinks on hover (`.shad-hover-xs` removes it entirely). It is not a lift - for that use `.lift`, or pair `.rim` with `.shad-sm`, `-md`, `-lg`, `-xl` or `-2xl`, which are the only rungs `.rim` composes with.

<!-- gen:begin css:border-elevation-focus.css -->
```css
.border { border: 1px solid var(--border); }
.border-subtle { border: 1px solid var(--border-subtle); }
.border-strong { border: 1px solid var(--border-strong); }
.border-dashed { border: 1px dashed var(--border); }
.border-none { border: none; }
.bt { border-top: 1px solid var(--border); }
.br { border-right: 1px solid var(--border); }
.bb { border-bottom: 1px solid var(--border); }
.bl { border-left: 1px solid var(--border); }
.bt-str { border-top: 1px solid var(--border-strong); }
.br-str { border-right: 1px solid var(--border-strong); }
.bb-str { border-bottom: 1px solid var(--border-strong); }
.bl-str { border-left: 1px solid var(--border-strong); }
.bt-sub { border-top: 1px solid var(--border-subtle); }
.br-sub { border-right: 1px solid var(--border-subtle); }
.bb-sub { border-bottom: 1px solid var(--border-subtle); }
.bl-sub { border-left: 1px solid var(--border-subtle); }
.bt-dash { border-top: 1px dashed var(--border); }
.br-dash { border-right: 1px dashed var(--border); }
.bb-dash { border-bottom: 1px dashed var(--border); }
.bl-dash { border-left: 1px dashed var(--border); }

.shad-none { box-shadow: none; }
.shad-xs { box-shadow: var(--shadow-xs); }
.shad-sm { box-shadow: var(--shadow-sm); }
.shad-md { box-shadow: var(--shadow-md); }
.shad-bs { box-shadow: var(--shadow-bs); }
.shad-lg { box-shadow: var(--shadow-lg); }
.shad-xl { box-shadow: var(--shadow-xl); }
.shad-2xl { box-shadow: var(--shadow-2xl); }
.shad-3xl { box-shadow: var(--shadow-3xl); }

.shad-hover-xs { box-shadow: var(--shadow-xs); }
.shad-hover-xs:hover { box-shadow: none; }
.shad-hover-sm { box-shadow: var(--shadow-sm); }
.shad-hover-sm:hover { box-shadow: var(--shadow-xs); }
.shad-hover-md { box-shadow: var(--shadow-md); }
.shad-hover-md:hover { box-shadow: var(--shadow-xs); }
.shad-hover-bs { box-shadow: var(--shadow-bs); }
.shad-hover-bs:hover { box-shadow: var(--shadow-xs); }
.shad-hover-lg { box-shadow: var(--shadow-lg); }
.shad-hover-lg:hover { box-shadow: var(--shadow-xs); }
.shad-hover-xl { box-shadow: var(--shadow-xl); }
.shad-hover-xl:hover { box-shadow: var(--shadow-xs); }
.shad-hover-2xl { box-shadow: var(--shadow-2xl); }
.shad-hover-2xl:hover { box-shadow: var(--shadow-xs); }
.shad-hover-3xl { box-shadow: var(--shadow-3xl); }
.shad-hover-3xl:hover { box-shadow: var(--shadow-xs); }

.focus-ring:focus-visible { outline: 2px solid var(--ring); outline-offset: 1px; }
.focus-theme:focus-visible { outline: 2px solid var(--theme-color); outline-offset: 2px; }
.focus-none:focus, .focus-none:focus-visible { outline: none; }	

/* fsui-unify: C23 */
.glass { background-color: color-mix(in oklab, var(--bg-overlay) var(--glass-alpha), transparent); backdrop-filter: blur(var(--glass-blur)) saturate(1.6); -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.6); }

/* The lit top edge of a raised surface. Combines with the elevation ladder. */
.rim { box-shadow: var(--shadow-rim); }
.rim.shad-sm { box-shadow: var(--shadow-rim), var(--shadow-sm); }
.rim.shad-md { box-shadow: var(--shadow-rim), var(--shadow-md); }
.rim.shad-lg { box-shadow: var(--shadow-rim), var(--shadow-lg); }
.rim.shad-xl { box-shadow: var(--shadow-rim), var(--shadow-xl); }
.rim.shad-2xl { box-shadow: var(--shadow-rim), var(--shadow-2xl); }
.glow { box-shadow: 0 0 0 1px color-mix(in oklab, var(--theme-color) 45%, transparent), 0 0 2rem -0.5rem var(--theme-color); }
```
<!-- gen:end css:border-elevation-focus.css -->

## Containers

1. `.cspan-*` only means anything on a child of a `.grid-*`; 
2. `.absolute`, `.cover` and `.pin-*` position against the nearest positioned ancestor, so give that ancestor `.relative`; 
3. `.card-grid` sizes its minimum column from `--card-min`, which is a global token - change it in the theme stylesheet, never per instance, since an inline `style` attribute is banned.
4. `.frame-*` classes own their media children's `object-fit`, so a `.frame-16-9 img` needs no fit class of its own;
5. `.reel > *` is styled by the reel, so its children need no `flex` or `scroll-snap` classes.

<!-- gen:begin css:containers.css -->
```css
.box, .column { display: flex; flex-direction: column; }
.box.xcenter, .column.xcenter { align-items: center; text-align: center;}
.box.xleft, .column.xleft { align-items: flex-start; text-align: left; }
.box.xright, .column.xright { align-items: flex-end; text-align: right; }
.box.ycenter, .column.ycenter { justify-content: center; }
.box.ytop, .column.ytop { justify-content: flex-start; }
.box.ybot, .column.ybot { justify-content: flex-end; }
.box.ybetween, .column.ybetween { justify-content: space-between; }
.box.yevenly, .column.yevenly { justify-content: space-evenly; }
.box.yaround, .column.yaround { justify-content: space-around; }
.box.yinherit, .column.yinherit { justify-content: inherit; }
.box.xinherit, .column.xinherit { align-items: inherit; }

.row { display: flex; flex-direction: row; }
.row.xleft { justify-content: flex-start; }
.row.xcenter { justify-content: center; }
.row.xright { justify-content: flex-end; }
.row.xbetween { justify-content: space-between; }
.row.xevenly { justify-content: space-evenly; }
.row.xaround { justify-content: space-around; }
.row.ycenter { align-items: center; }
.row.ytop { align-items: flex-start; }
.row.ybot { align-items: flex-end; }
.row.xinherit { justify-content: inherit; }
.row.yinherit { align-items: inherit; }

.grid, .grid-2, .grid-3, .grid-4, .grid-5, .grid-6, .grid-7 { display: grid; }
.grid.center, .grid-2.center, .grid-3.center, .grid-4.center, .grid-5.center, .grid-6.center, .grid-7.center { place-items: center; }
.grid.xcenter, .grid-2.xcenter, .grid-3.xcenter, .grid-4.xcenter, .grid-5.xcenter, .grid-6.xcenter, .grid-7.xcenter { justify-items: center; text-align: center; }
.grid.xleft, .grid-2.xleft, .grid-3.xleft, .grid-4.xleft, .grid-5.xleft, .grid-6.xleft, .grid-7.xleft { justify-items: start; text-align: left; }
.grid.xright, .grid-2.xright, .grid-3.xright, .grid-4.xright, .grid-5.xright, .grid-6.xright, .grid-7.xright { justify-items: end; text-align: right; }
.grid.xstretch, .grid-2.xstretch, .grid-3.xstretch, .grid-4.xstretch, .grid-5.xstretch, .grid-6.xstretch, .grid-7.xstretch { justify-items: stretch; }
.grid.ycenter, .grid-2.ycenter, .grid-3.ycenter, .grid-4.ycenter, .grid-5.ycenter, .grid-6.ycenter, .grid-7.ycenter { align-items: center; }
.grid.ytop, .grid-2.ytop, .grid-3.ytop, .grid-4.ytop, .grid-5.ytop, .grid-6.ytop, .grid-7.ytop { align-items: start; }
.grid.ybot, .grid-2.ybot, .grid-3.ybot, .grid-4.ybot, .grid-5.ybot, .grid-6.ybot, .grid-7.ybot { align-items: end; }
.grid.ystretch, .grid-2.ystretch, .grid-3.ystretch, .grid-4.ystretch, .grid-5.ystretch, .grid-6.ystretch, .grid-7.ystretch { align-items: stretch; }
.grid.xbetween, .grid-2.xbetween, .grid-3.xbetween, .grid-4.xbetween, .grid-5.xbetween, .grid-6.xbetween, .grid-7.xbetween { justify-content: space-between; }
.grid.xevenly, .grid-2.xevenly, .grid-3.xevenly, .grid-4.xevenly, .grid-5.xevenly, .grid-6.xevenly, .grid-7.xevenly { justify-content: space-evenly; }
.grid.xaround, .grid-2.xaround, .grid-3.xaround, .grid-4.xaround, .grid-5.xaround, .grid-6.xaround, .grid-7.xaround { justify-content: space-around; }
.grid.ybetween, .grid-2.ybetween, .grid-3.ybetween, .grid-4.ybetween, .grid-5.ybetween, .grid-6.ybetween, .grid-7.ybetween { align-content: space-between; }
.grid.yevenly, .grid-2.yevenly, .grid-3.yevenly, .grid-4.yevenly, .grid-5.yevenly, .grid-6.yevenly, .grid-7.yevenly { align-content: space-evenly; }
.grid.yaround, .grid-2.yaround, .grid-3.yaround, .grid-4.yaround, .grid-5.yaround, .grid-6.yaround, .grid-7.yaround { align-content: space-around; }

.grid-1 { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-2 { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 1025px) { .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.grid-3 { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 1025px) { .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.grid-4 { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 1025px) { .grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1281px) { .grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
.grid-5 { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 1025px) { .grid-5 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (min-width: 1281px) { .grid-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); } }
.grid-6 { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 1025px) { .grid-6 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (min-width: 1281px) { .grid-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); } }

/* fsui-unify: C12 */
/* Always seven columns — a week row must not collapse at the shared breakpoints. */
.grid-7 { display: grid; grid-template-columns: repeat(7, minmax(var(--h-lg), 1fr)); }

.cspan-1 { grid-column: span 1; }
.cspan-2 { grid-column: span 2; }
.cspan-3 { grid-column: span 3; }
.cspan-4 { grid-column: span 4; }
.cspan-5 { grid-column: span 5; }
.cspan-6 { grid-column: span 6; }
.cspan-7 { grid-column: span 7; }
.cspan-8 { grid-column: span 8; }

.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(var(--card-min), 100%), 1fr)); }
.wrap { flex-wrap: wrap; }
.grow { flex: 1 1 0%; }
.shrink-0 { flex-shrink: 0; }
.relative { position: relative; }
.absolute { position: absolute; }
.cover { position: absolute; inset: 0; }
.fixed { position: fixed; }
.sticky { position: sticky; }
.z-sticky { z-index: var(--z-sticky); }
.z-raised { z-index: var(--z-raised); }
.z-modal { z-index: var(--z-modal); }
.z-toast { z-index: var(--z-toast); }

.scroll-y { overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain; }
.scroll-x { overflow-x: auto; overflow-y: hidden; overscroll-behavior: contain; }
.scroll-menu { max-height: 16rem; overflow-y: auto; overscroll-behavior: contain; }
.scroll-thin { scrollbar-width: thin; scrollbar-color: var(--border-strong) transparent; }
.scroll-hidden { scrollbar-width: none; }
.pointer { cursor: pointer; }
.pointer-none { pointer-events: none; }
.pointer-auto { pointer-events: auto; }
.select-none { user-select: none; -webkit-user-select: none; }
.square { aspect-ratio: 1; }
.dim { opacity: 0.5; }
.touch-none { touch-action: none; }
.fit-cover { object-fit: cover; }
.fit-contain { object-fit: contain; }
.fit-fill { object-fit: fill; }
.fit-scale-down { object-fit: scale-down; }
/* pinned to a corner of the nearest positioned parent */
.pin-tl, .pin-tr, .pin-bl, .pin-br { position: absolute; z-index: var(--z-raised); }
.pin-tl { top: var(--space-sm); left: var(--space-sm); }
.pin-tr { top: var(--space-sm); right: var(--space-sm); }
.pin-bl { bottom: var(--space-sm); left: var(--space-sm); }
.pin-br { bottom: var(--space-sm); right: var(--space-sm); }
/* hidden from sight, still focusable and read by screen readers */
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

.prose { max-width: var(--prose-clamp); margin-inline: auto; display: flex; flex-direction: column; gap: var(--space-sm); }
.prose h1:first-child, .prose h2:first-child, .prose h3:first-child, .prose h4:first-child { margin-top: 0; }

.prose-left { max-width: var(--prose-clamp); margin-right: auto; display: flex; flex-direction: column; gap: var(--space-sm); }
.prose-left h1:first-child, .prose-left h2:first-child, .prose-left h3:first-child, .prose-left h4:first-child { margin-top: 0; }

.frame-16-9 { aspect-ratio: 16 / 9; overflow: hidden; position: relative; }
.frame-16-9 img, .frame-16-9 video, .frame-16-9 iframe, .frame-16-9 svg { width: 100%; height: 100%; object-fit: cover; }

.frame-9-16 { aspect-ratio: 9 / 16; overflow: hidden; position: relative; }
.frame-9-16 img, .frame-9-16 video, .frame-9-16 iframe, .frame-9-16 svg { width: 100%; height: 100%; object-fit: cover; }

.frame-4-3 { aspect-ratio: 4 / 3; overflow: hidden; position: relative; }
.frame-4-3 img, .frame-4-3 video, .frame-4-3 iframe, .frame-4-3 svg { width: 100%; height: 100%; object-fit: cover; }

.frame-3-4 { aspect-ratio: 3 / 4; overflow: hidden; position: relative; }
.frame-3-4 img, .frame-3-4 video, .frame-3-4 iframe, .frame-3-4 svg { width: 100%; height: 100%; object-fit: cover; }

.frame-3-2 { aspect-ratio: 3 / 2; overflow: hidden; position: relative; }
.frame-3-2 img, .frame-3-2 video, .frame-3-2 iframe, .frame-3-2 svg { width: 100%; height: 100%; object-fit: cover; }

.frame-2-3 { aspect-ratio: 2 / 3; overflow: hidden; position: relative; }
.frame-2-3 img, .frame-2-3 video, .frame-2-3 iframe, .frame-2-3 svg { width: 100%; height: 100%; object-fit: cover; }

.frame-1-1 { aspect-ratio: 1 / 1; overflow: hidden; position: relative; }
.frame-1-1 img, .frame-1-1 video, .frame-1-1 iframe, .frame-1-1 svg { width: 100%; height: 100%; object-fit: cover; }

.reel { display: flex; flex-direction: row; overflow-x: auto; overscroll-behavior-inline: contain; scroll-snap-type: inline mandatory; }
.reel > * { flex: 0 0 auto; scroll-snap-align: start; }

.inline { display: inline; }
.block { display: block; }
.inline-block { display: inline-block; }
.inline-flex { display: inline-flex; }
.contents { display: contents; }
.inline-grid { display: inline-grid; }
.table { display: table; }
.display-none { display: none; }

.overflow-hidden { overflow: hidden; }
.overflow-visible { overflow: visible; }
.isolate { isolation: isolate; }

.flex-shrink { flex-shrink: 1 }
```
<!-- gen:end css:containers.css -->

## Gaps, Pads, Margins

Every family runs the same eight steps - `xs sm md bs lg xl 2xl 3xl 4xl 5xl` but some use a limited set from this - and each reads `var(--space-<step>)`. There is one vocabulary: if `--space-md` exists, so do `.gap-md`, `.pad-md`, `.mar-md` and their `.px` / `.py` / `.pt` / `.pr` / `.pb` / `.pl` sides.

The inline/block forms are `.px-*` / `.py-*` and `.mx-*` / `.my-*`; logical-side forms exist only for padding and margin as listed.

Prefer a gap on the container over a margin on the child; reach for `.mar-*` / `.mx-*` / `.my-*` only for offsetting a region or auto-centring (`mx-auto` has no equivalent here - use `.clamp-*`, `.measure-*` with `.box.xcenter`, or the shell's own centring).

<!-- gen:begin css:gaps-pads-margins.css -->
```css
.gap-xs { gap: var(--space-xs); }
.gap-sm { gap: var(--space-sm); }
.gap-md { gap: var(--space-md); }
.gap-bs { gap: var(--space-bs); }
.gap-lg { gap: var(--space-lg); }
.gap-xl { gap: var(--space-xl); }
.gap-2xl { gap: var(--space-2xl); }
.gap-3xl { gap: var(--space-3xl); }

.rgap-xs { row-gap: var(--space-xs); }
.rgap-sm { row-gap: var(--space-sm); }
.rgap-md { row-gap: var(--space-md); }
.rgap-bs { row-gap: var(--space-bs); }
.rgap-lg { row-gap: var(--space-lg); }
.rgap-xl { row-gap: var(--space-xl); }
.rgap-2xl { row-gap: var(--space-2xl); }
.rgap-3xl { row-gap: var(--space-3xl); }

.cgap-xs { column-gap: var(--space-xs); }
.cgap-sm { column-gap: var(--space-sm); }
.cgap-md { column-gap: var(--space-md); }
.cgap-bs { column-gap: var(--space-bs); }
.cgap-lg { column-gap: var(--space-lg); }
.cgap-xl { column-gap: var(--space-xl); }
.cgap-2xl { column-gap: var(--space-2xl); }
.cgap-3xl { column-gap: var(--space-3xl); }

.pad-xs { padding: var(--space-xs); }
.pad-sm { padding: var(--space-sm); }
.pad-md { padding: var(--space-md); }
.pad-bs { padding: var(--space-bs); }
.pad-lg { padding: var(--space-lg); }
.pad-xl { padding: var(--space-xl); }
.pad-2xl { padding: var(--space-2xl); }
.pad-3xl { padding: var(--space-3xl); }
.pad-none { padding: 0; }

.px-xs { padding-inline: var(--space-xs); }
.px-sm { padding-inline: var(--space-sm); }
.px-md { padding-inline: var(--space-md); }
.px-bs { padding-inline: var(--space-bs); }
.px-lg { padding-inline: var(--space-lg); }
.px-xl { padding-inline: var(--space-xl); }
.px-2xl { padding-inline: var(--space-2xl); }
.px-3xl { padding-inline: var(--space-3xl); }

.py-xs { padding-block: var(--space-xs); }
.py-sm { padding-block: var(--space-sm); }
.py-md { padding-block: var(--space-md); }
.py-bs { padding-block: var(--space-bs); }
.py-lg { padding-block: var(--space-lg); }
.py-xl { padding-block: var(--space-xl); }
.py-2xl { padding-block: var(--space-2xl); }
.py-3xl { padding-block: var(--space-3xl); }

.pt-xs { padding-top: var(--space-xs); }
.pt-sm { padding-top: var(--space-sm); }
.pt-md { padding-top: var(--space-md); }
.pt-bs { padding-top: var(--space-bs); }
.pt-lg { padding-top: var(--space-lg); }
.pt-xl { padding-top: var(--space-xl); }
.pt-2xl { padding-top: var(--space-2xl); }
.pt-3xl { padding-top: var(--space-3xl); }

.pr-xs { padding-right: var(--space-xs); }
.pr-sm { padding-right: var(--space-sm); }
.pr-md { padding-right: var(--space-md); }
.pr-bs { padding-right: var(--space-bs); }
.pr-lg { padding-right: var(--space-lg); }
.pr-xl { padding-right: var(--space-xl); }
.pr-2xl { padding-right: var(--space-2xl); }
.pr-3xl { padding-right: var(--space-3xl); }

.pb-xs { padding-bottom: var(--space-xs); }
.pb-sm { padding-bottom: var(--space-sm); }
.pb-md { padding-bottom: var(--space-md); }
.pb-bs { padding-bottom: var(--space-bs); }
.pb-lg { padding-bottom: var(--space-lg); }
.pb-xl { padding-bottom: var(--space-xl); }
.pb-2xl { padding-bottom: var(--space-2xl); }
.pb-3xl { padding-bottom: var(--space-3xl); }

.pl-xs { padding-left: var(--space-xs); }
.pl-sm { padding-left: var(--space-sm); }
.pl-md { padding-left: var(--space-md); }
.pl-bs { padding-left: var(--space-bs); }
.pl-lg { padding-left: var(--space-lg); }
.pl-xl { padding-left: var(--space-xl); }
.pl-2xl { padding-left: var(--space-2xl); }
.pl-3xl { padding-left: var(--space-3xl); }

.mar-xs { margin: var(--space-xs); }
.mar-sm { margin: var(--space-sm); }
.mar-md { margin: var(--space-md); }
.mar-bs { margin: var(--space-bs); }
.mar-lg { margin: var(--space-lg); }
.mar-xl { margin: var(--space-xl); }
.mar-2xl { margin: var(--space-2xl); }
.mar-3xl { margin: var(--space-3xl); }

.mx-xs { margin-inline: var(--space-xs); }
.mx-sm { margin-inline: var(--space-sm); }
.mx-md { margin-inline: var(--space-md); }
.mx-bs { margin-inline: var(--space-bs); }
.mx-lg { margin-inline: var(--space-lg); }
.mx-xl { margin-inline: var(--space-xl); }
.mx-2xl { margin-inline: var(--space-2xl); }
.mx-3xl { margin-inline: var(--space-3xl); }

.my-xs { margin-block: var(--space-xs); }
.my-sm { margin-block: var(--space-sm); }
.my-md { margin-block: var(--space-md); }
.my-bs { margin-block: var(--space-bs); }
.my-lg { margin-block: var(--space-lg); }
.my-xl { margin-block: var(--space-xl); }
.my-2xl { margin-block: var(--space-2xl); }
.my-3xl { margin-block: var(--space-3xl); }

.mt-xs { margin-top: var(--space-xs); }
.mt-sm { margin-top: var(--space-sm); }
.mt-md { margin-top: var(--space-md); }
.mt-bs { margin-top: var(--space-bs); }
.mt-lg { margin-top: var(--space-lg); }
.mt-xl { margin-top: var(--space-xl); }
.mt-2xl { margin-top: var(--space-2xl); }
.mt-3xl { margin-top: var(--space-3xl); }

.mr-xs { margin-right: var(--space-xs); }
.mr-sm { margin-right: var(--space-sm); }
.mr-md { margin-right: var(--space-md); }
.mr-bs { margin-right: var(--space-bs); }
.mr-lg { margin-right: var(--space-lg); }
.mr-xl { margin-right: var(--space-xl); }
.mr-2xl { margin-right: var(--space-2xl); }
.mr-3xl { margin-right: var(--space-3xl); }

.mb-xs { margin-bottom: var(--space-xs); }
.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-bs { margin-bottom: var(--space-bs); }
.mb-lg { margin-bottom: var(--space-lg); }
.mb-xl { margin-bottom: var(--space-xl); }
.mb-2xl { margin-bottom: var(--space-2xl); }
.mb-3xl { margin-bottom: var(--space-3xl); }

.ml-xs { margin-left: var(--space-xs); }
.ml-sm { margin-left: var(--space-sm); }
.ml-md { margin-left: var(--space-md); }
.ml-bs { margin-left: var(--space-bs); }
.ml-lg { margin-left: var(--space-lg); }
.ml-xl { margin-left: var(--space-xl); }
.ml-2xl { margin-left: var(--space-2xl); }
.ml-3xl { margin-left: var(--space-3xl); }
```
<!-- gen:end css:gaps-pads-margins.css -->

## Shapes and Sizes

Two shape vocabularies, one per element: the named shapes (`.rect` `.mincurved` `.modern` `.curved` `.round`) are the semantic choice and follow the `data-radius` axis; the **step radii** (`.radius-xs` … `.radius-full`) are for when you need a specific rung. Do not stack both on one element.

`.h-*` sets a fixed height. Add `.hgrow` when the element must keep that size as a minimum and grow with content.

`.measure-*` caps width; `.max-h-*` caps height; both ride the same `--measure-*` ladder, so a dialog and its scrolling body can share a rung. `.clamp-*` combines a measure cap with inline auto-centring.

<!-- gen:begin css:shapes-sizes.css -->
```css
.rect { border-radius: 0 }
.mincurved { border-radius: var(--radius-sm)}
.modern { border-radius: var(--radius-md)}
.curved { border-radius: var(--radius-bs)}
.round { border-radius: var(--radius-full)}

.radius-xs { border-radius: var(--radius-xs);}
.radius-sm { border-radius: var(--radius-sm);}
.radius-md { border-radius: var(--radius-md);}
.radius-bs { border-radius: var(--radius-bs);}
.radius-lg { border-radius: var(--radius-lg);}
.radius-full { border-radius: var(--radius-full);}

.h-xs { height: var(--h-xs) ;}
.h-sm { height: var(--h-sm);}
.h-md { height: var(--h-md);}
.h-bs { height: var(--h-bs);}
.h-lg { height: var(--h-lg);}
.h-xl { height: var(--h-xl);}
.h-2xl { height: var(--h-2xl);}
.h-3xl { height: var(--h-3xl);}

.wfull { width: 100%; }
.hfull { height: 100%; }
.wmax { width: max-content; }
.hmax { height: max-content; }
.full { width: 100%; height: 100%; }
.wmin0 { min-width: 0; }
.hmin0 { min-height: 0; }
.min0 { min-width: 0; min-height: 0; }
.hfull-dvh { min-height: 100dvh; }
.hfull-fitted { min-height: calc(100dvh - var(--header-height) - var(--footer-height)); }

/* fsui-unify: C24 */
/* The measure ladder: a width that fills up to a readable limit. */
.measure-xs { width: 100%; max-width: var(--measure-xs); }
.measure-sm { width: 100%; max-width: var(--measure-sm); }
.measure-md { width: 100%; max-width: var(--measure-md); }
.measure-lg { width: 100%; max-width: var(--measure-lg); }
.measure-xl { width: 100%; max-width: var(--measure-xl); }
.measure-2xl { width: 100%; max-width: var(--measure-2xl); }
.measure-3xl { width: 100%; max-width: var(--measure-3xl); }
.measure-4xl { width: 100%; max-width: var(--measure-4xl); }

/* The same tokens as a max-height cap, for scrolling regions. */
.max-h-xs { max-height: var(--measure-xs); }
.max-h-sm { max-height: var(--measure-sm); }
.max-h-md { max-height: var(--measure-md); }
.max-h-lg { max-height: var(--measure-lg); }
.max-h-xl { max-height: var(--measure-xl); }
.max-h-2xl { max-height: var(--measure-2xl); }
.max-h-3xl { max-height: var(--measure-3xl); }
.max-h-4xl { max-height: var(--measure-4xl); }
```
<!-- gen:end css:shapes-sizes.css -->
