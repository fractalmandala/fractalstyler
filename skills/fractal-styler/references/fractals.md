# Fractalstyler2 — Class Reference

GENERATED FILE — do not edit. Emitted by `scripts/update-registry.js` from the
parsed stylesheet. 192 classes across 100 tokens.

**The classes below are the entire public API.** The system defines no
authoring mixins and no SASS functions — `+stack`, `+surface`, `space()` and
friends do not exist. Compose in markup.

`*` marks a family: substitute a preset step (`3xs 2xs xs sm md lg xl 2xl 3xl`)
or a value from the literal ladder: `0, 1, 2, 4, 6, 8, 12`, then every
multiple of 8 — to 64px for gap/pad/marg and radius, to 512px for sizing.
Append `-mob` or `-desk` to bind a
class to one side of the 768px seam.

---

## L0 — Tokens

Raw values. Every token also exists as a class.

| Class | Applies | Source |
|:---|:---|:---|
| `.bdr` | border: 1px solid red | `_01_base.sass` |

---

## L1 — Dimensions

Space, size, radius. Preset steps (3xs..3xl) and the literal ladder, each in three bands: base, -mob, -desk.

| Class | Applies | Source |
|:---|:---|:---|
| `.gap-*` | gap: calc(var(--space-*) * var(--gap-scale)) \| {N}px | `_02_dimensions.sass` |
| `.rgap-*` | row-gap: calc(var(--space-*) * var(--gap-scale)) \| {N}px | `_02_dimensions.sass` |
| `.cgap-*` | column-gap: calc(var(--space-*) * var(--gap-scale)) \| {N}px | `_02_dimensions.sass` |
| `.pad-*` | padding: calc(var(--space-*) * var(--pad-scale)) \| {N}px | `_02_dimensions.sass` |
| `.pad-x-*` | padding-inline: calc(var(--space-*) * var(--pad-scale)) \| {N}px | `_02_dimensions.sass` |
| `.pad-y-*` | padding-block: calc(var(--space-*) * var(--pad-scale)) \| {N}px | `_02_dimensions.sass` |
| `.pad-top-*` | padding-top: calc(var(--space-*) * var(--pad-scale)) \| {N}px | `_02_dimensions.sass` |
| `.pad-right-*` | padding-right: calc(var(--space-*) * var(--pad-scale)) \| {N}px | `_02_dimensions.sass` |
| `.pad-bottom-*` | padding-bottom: calc(var(--space-*) * var(--pad-scale)) \| {N}px | `_02_dimensions.sass` |
| `.pad-left-*` | padding-left: calc(var(--space-*) * var(--pad-scale)) \| {N}px | `_02_dimensions.sass` |
| `.marg-*` | margin: calc(var(--space-*) * var(--gap-scale)) \| {N}px | `_02_dimensions.sass` |
| `.marg--*` | margin: calc(var(--space-*) * var(--gap-scale) * -1) \| -{N}px | `_02_dimensions.sass` |
| `.marg-x-*` | margin-inline: calc(var(--space-*) * var(--gap-scale)) \| {N}px | `_02_dimensions.sass` |
| `.marg-y-*` | margin-block: calc(var(--space-*) * var(--gap-scale)) \| {N}px | `_02_dimensions.sass` |
| `.marg-top-*` | margin-top: calc(var(--space-*) * var(--gap-scale)) \| {N}px | `_02_dimensions.sass` |
| `.marg-top--*` | margin-top: calc(var(--space-*) * var(--gap-scale) * -1) \| -{N}px | `_02_dimensions.sass` |
| `.marg-bottom-*` | margin-bottom: calc(var(--space-*) * var(--gap-scale)) \| {N}px | `_02_dimensions.sass` |
| `.marg-bottom--*` | margin-bottom: calc(var(--space-*) * var(--gap-scale) * -1) \| -{N}px | `_02_dimensions.sass` |
| `.marg-left-*` | margin-left: calc(var(--space-*) * var(--gap-scale)) \| {N}px | `_02_dimensions.sass` |
| `.marg-right-*` | margin-right: calc(var(--space-*) * var(--gap-scale)) \| {N}px | `_02_dimensions.sass` |
| `.radius-*` | border-radius: {N}px | `_02_dimensions.sass` |
| `.radius-full` | border-radius: var(--radius-full) | `_02_dimensions.sass` |
| `.w-*` | width: {N}px | `_02_dimensions.sass` |
| `.h-*` | height: {N}px | `_02_dimensions.sass` |
| `.square-*` | width: {N}px; height: {N}px | `_02_dimensions.sass` |
| `.min0` | min-width: 0; min-height: 0 | `_02_dimensions.sass` |
| `.wfull` | width: 100% | `_02_dimensions.sass` |
| `.hfull` | height: 100% | `_02_dimensions.sass` |
| `.full` | width: 100%; height: 100% | `_02_dimensions.sass` |
| `.hfull-vh` | min-height: 100vh | `_02_dimensions.sass` |
| `.hfull-vh-fitted` | min-height: calc(100vh - var(--header-height) - var(--footer-height)) | `_02_dimensions.sass` |
| `.radius-xs` | .radius-xs component / container | `_02_dimensions.sass` |
| `.radius-sm` | .radius-sm component / container | `_02_dimensions.sass` |
| `.radius-md` | .radius-md component / container | `_02_dimensions.sass` |
| `.radius-bs` | .radius-bs component / container | `_02_dimensions.sass` |
| `.radius-lg` | .radius-lg component / container | `_02_dimensions.sass` |
| `.minw0` | .minw0 component / container | `_02_dimensions.sass` |
| `.minh0` | .minh0 component / container | `_02_dimensions.sass` |
| `.h-sm` | .h-sm component / container | `_02_dimensions.sass` |
| `.h-md` | .h-md component / container | `_02_dimensions.sass` |
| `.h-bs` | .h-bs component / container | `_02_dimensions.sass` |
| `.h-lg` | .h-lg component / container | `_02_dimensions.sass` |

---

## L2 — Containers

Flow and alignment. x* is ALWAYS horizontal, y* is ALWAYS vertical, in every container.

| Class | Applies | Source |
|:---|:---|:---|
| `.box` | .box component / container | `_03_containers.sass` |
| `.box.xcenter` | Modifier for .box | `_03_containers.sass` |
| `.box.xleft` | Modifier for .box | `_03_containers.sass` |
| `.box.xright` | Modifier for .box | `_03_containers.sass` |
| `.box.ycenter` | Modifier for .box | `_03_containers.sass` |
| `.box.ytop` | Modifier for .box | `_03_containers.sass` |
| `.box.ybot` | Modifier for .box | `_03_containers.sass` |
| `.box.ybetween` | Modifier for .box | `_03_containers.sass` |
| `.box.yevenly` | Modifier for .box | `_03_containers.sass` |
| `.box.yaround` | Modifier for .box | `_03_containers.sass` |
| `.row` | .row component / container | `_03_containers.sass` |
| `.row.xleft` | Modifier for .row | `_03_containers.sass` |
| `.row.xcenter` | Modifier for .row | `_03_containers.sass` |
| `.row.xright` | Modifier for .row | `_03_containers.sass` |
| `.row.xbetween` | Modifier for .row | `_03_containers.sass` |
| `.row.xevenly` | Modifier for .row | `_03_containers.sass` |
| `.row.xaround` | Modifier for .row | `_03_containers.sass` |
| `.row.ycenter` | Modifier for .row | `_03_containers.sass` |
| `.row.ytop` | Modifier for .row | `_03_containers.sass` |
| `.row.ybot` | Modifier for .row | `_03_containers.sass` |
| `.grid` | .grid component / container | `_03_containers.sass` |
| `.grid.center` | Modifier for .grid | `_03_containers.sass` |
| `.grid.xcenter` | Modifier for .grid | `_03_containers.sass` |
| `.grid.xleft` | Modifier for .grid | `_03_containers.sass` |
| `.grid.xright` | Modifier for .grid | `_03_containers.sass` |
| `.grid.xstretch` | Modifier for .grid | `_03_containers.sass` |
| `.grid.ycenter` | Modifier for .grid | `_03_containers.sass` |
| `.grid.ytop` | Modifier for .grid | `_03_containers.sass` |
| `.grid.ybot` | Modifier for .grid | `_03_containers.sass` |
| `.grid.ystretch` | Modifier for .grid | `_03_containers.sass` |
| `.grid.xbetween` | Modifier for .grid | `_03_containers.sass` |
| `.grid.xevenly` | Modifier for .grid | `_03_containers.sass` |
| `.grid.xaround` | Modifier for .grid | `_03_containers.sass` |
| `.grid.ybetween` | Modifier for .grid | `_03_containers.sass` |
| `.grid.yevenly` | Modifier for .grid | `_03_containers.sass` |
| `.grid.yaround` | Modifier for .grid | `_03_containers.sass` |
| `.wrap` | .wrap component / container | `_03_containers.sass` |
| `.grow` | .grow component / container | `_03_containers.sass` |
| `.shrink-0` | .shrink-0 component / container | `_03_containers.sass` |
| `.relative` | .relative component / container | `_03_containers.sass` |
| `.absolute` | .absolute component / container | `_03_containers.sass` |
| `.fixed` | .fixed component / container | `_03_containers.sass` |
| `.sticky` | .sticky component / container | `_03_containers.sass` |
| `.scroll-y` | Vertical scroll inside a bounded height; needs an .h-* or a constraining flex parent | `_03_containers.sass` |
| `.scroll-x` | Horizontal scroll inside a bounded width; .reel adds snap points | `_03_containers.sass` |

---

## L3 — Layouts

Grids that step only through divisors, reading measures, frames, reels.

| Class | Applies | Source |
|:---|:---|:---|
| `.frame-16-9` | aspect-ratio: 16 / 9 | `_04_layouts.sass` |
| `.frame-9-16` | aspect-ratio: 9 / 16 | `_04_layouts.sass` |
| `.frame-4-3` | aspect-ratio: 4 / 3 | `_04_layouts.sass` |
| `.frame-3-4` | aspect-ratio: 3 / 4 | `_04_layouts.sass` |
| `.frame-3-2` | aspect-ratio: 3 / 2 | `_04_layouts.sass` |
| `.frame-2-3` | aspect-ratio: 2 / 3 | `_04_layouts.sass` |
| `.frame-1-1` | aspect-ratio: 1 / 1 | `_04_layouts.sass` |
| `.grid-1` | .grid-1 component / container | `_04_layouts.sass` |
| `.grid-2` | .grid-2 component / container | `_04_layouts.sass` |
| `.grid-3` | .grid-3 component / container | `_04_layouts.sass` |
| `.grid-4` | .grid-4 component / container | `_04_layouts.sass` |
| `.grid-6` | .grid-6 component / container | `_04_layouts.sass` |
| `.card-grid` | .card-grid component / container | `_04_layouts.sass` |
| `.prose` | .prose component / container | `_04_layouts.sass` |
| `.reel` | .reel component / container | `_04_layouts.sass` |

---

## L4 — Shells

Page and application scaffolding. Each shell class is paired with a canonical markup — see canonical-markups.md.

| Class | Applies | Source |
|:---|:---|:---|
| `.app-shell` | .app-shell component / container | `_05_shells.sass` |
| `.app-header` | .app-header component / container | `_05_shells.sass` |
| `.app-main` | .app-main component / container | `_05_shells.sass` |
| `.main-section` | .main-section component / container | `_05_shells.sass` |
| `.sidebar-left` | , | `_05_shells.sass` |
| `.sidebar-right` | .sidebar-right component / container | `_05_shells.sass` |
| `.app-footer` | .app-footer component / container | `_05_shells.sass` |

---

## L5 — Visuals & Interactions

Surfaces, ink, borders, type, controls. The outermost layer.

| Class | Applies | Source |
|:---|:---|:---|
| `.bg` | .bg component / container | `_06_visuals.sass` |
| `.surface` | .surface component / container | `_06_visuals.sass` |
| `.panel` | .panel component / container | `_06_visuals.sass` |
| `.sunken` | .sunken component / container | `_06_visuals.sass` |
| `.raised` | .raised component / container | `_06_visuals.sass` |
| `.extra` | .extra component / container | `_06_visuals.sass` |
| `.text-primary` | .text-primary component / container | `_06_visuals.sass` |
| `.text-secondary` | .text-secondary component / container | `_06_visuals.sass` |
| `.text-muted` | .text-muted component / container | `_06_visuals.sass` |
| `.text-inverse` | .text-inverse component / container | `_06_visuals.sass` |
| `.text-white` | .text-white component / container | `_06_visuals.sass` |
| `.text-black` | .text-black component / container | `_06_visuals.sass` |
| `.text-theme` | .text-theme component / container | `_06_visuals.sass` |
| `.text-success` | .text-success component / container | `_06_visuals.sass` |
| `.text-warning` | .text-warning component / container | `_06_visuals.sass` |
| `.text-danger` | .text-danger component / container | `_06_visuals.sass` |
| `.text-info` | .text-info component / container | `_06_visuals.sass` |
| `.bg-success` | .bg-success component / container | `_06_visuals.sass` |
| `.bg-warning` | .bg-warning component / container | `_06_visuals.sass` |
| `.bg-danger` | .bg-danger component / container | `_06_visuals.sass` |
| `.bg-info` | .bg-info component / container | `_06_visuals.sass` |
| `.border` | .border component / container | `_06_visuals.sass` |
| `.border-subtle` | .border-subtle component / container | `_06_visuals.sass` |
| `.border-strong` | .border-strong component / container | `_06_visuals.sass` |
| `.bt` | .bt component / container | `_06_visuals.sass` |
| `.br` | .br component / container | `_06_visuals.sass` |
| `.bb` | .bb component / container | `_06_visuals.sass` |
| `.bl` | .bl component / container | `_06_visuals.sass` |
| `.bt-str` | .bt-str component / container | `_06_visuals.sass` |
| `.br-str` | .br-str component / container | `_06_visuals.sass` |
| `.bb-str` | .bb-str component / container | `_06_visuals.sass` |
| `.bl-str` | .bl-str component / container | `_06_visuals.sass` |
| `.bt-sub` | .bt-sub component / container | `_06_visuals.sass` |
| `.br-sub` | .br-sub component / container | `_06_visuals.sass` |
| `.bb-sub` | .bb-sub component / container | `_06_visuals.sass` |
| `.bl-sub` | .bl-sub component / container | `_06_visuals.sass` |
| `.text-xs` | .text-xs component / container | `_06_visuals.sass` |
| `.text-sm` | .text-sm component / container | `_06_visuals.sass` |
| `.text-md` | .text-md component / container | `_06_visuals.sass` |
| `.text-bs` | .text-bs component / container | `_06_visuals.sass` |
| `.text-lg` | .text-lg component / container | `_06_visuals.sass` |
| `.text-xl` | .text-xl component / container | `_06_visuals.sass` |
| `.text-2xl` | .text-2xl component / container | `_06_visuals.sass` |
| `.text-3xl` | .text-3xl component / container | `_06_visuals.sass` |
| `.text-4xl` | .text-4xl component / container | `_06_visuals.sass` |
| `.text-5xl` | .text-5xl component / container | `_06_visuals.sass` |
| `.ls-tight-bs` | .ls-tight-bs component / container | `_06_visuals.sass` |
| `.ls-tight-lg` | .ls-tight-lg component / container | `_06_visuals.sass` |
| `.ls-tight-xl` | .ls-tight-xl component / container | `_06_visuals.sass` |
| `.ls-wide-bs` | .ls-wide-bs component / container | `_06_visuals.sass` |
| `.ls-wide-lg` | .ls-wide-lg component / container | `_06_visuals.sass` |
| `.ls-wide-xl` | .ls-wide-xl component / container | `_06_visuals.sass` |
| `.weight-300` | .weight-300 component / container | `_06_visuals.sass` |
| `.weight-400` | .weight-400 component / container | `_06_visuals.sass` |
| `.weight-500` | .weight-500 component / container | `_06_visuals.sass` |
| `.weight-600` | .weight-600 component / container | `_06_visuals.sass` |
| `.weight-700` | .weight-700 component / container | `_06_visuals.sass` |
| `.weight-800` | .weight-800 component / container | `_06_visuals.sass` |
| `.mono` | .mono component / container | `_06_visuals.sass` |
| `.sans` | .sans component / container | `_06_visuals.sass` |
| `.tt-u` | .tt-u component / container | `_06_visuals.sass` |
| `.tt-c` | .tt-c component / container | `_06_visuals.sass` |
| `.ta-c` | .ta-c component / container | `_06_visuals.sass` |
| `.ta-l` | .ta-l component / container | `_06_visuals.sass` |
| `.truncate` | .truncate component / container | `_06_visuals.sass` |
| `.hide-mobile` | .hide-mobile component / container | `_06_visuals.sass` |
| `.hide-desktop` | .hide-desktop component / container | `_06_visuals.sass` |
| `.shadow-sm` | .shadow-sm component / container | `_06_visuals.sass` |
| `.shadow-md` | .shadow-md component / container | `_06_visuals.sass` |
| `.shadow-bs` | .shadow-bs component / container | `_06_visuals.sass` |
| `.input` | .input component / container | `_07_interactions.sass` |
| `.input.small` | Modifier for .input | `_07_interactions.sass` |
| `.select` | .select component / container | `_07_interactions.sass` |
| `.select.small` | Modifier for .select | `_07_interactions.sass` |
| `.link` | .link component / container | `_07_interactions.sass` |
| `.link-plain` | .link-plain component / container | `_07_interactions.sass` |
| `.link-parent` | .link-parent component / container | `_07_interactions.sass` |
| `.link-parent.primary` | Modifier for .link-parent | `_07_interactions.sass` |
| `.link-parent.ghost` | Modifier for .link-parent | `_07_interactions.sass` |
| `.link-parent.is-icon` | Modifier for .link-parent | `_07_interactions.sass` |
| `.link-parent.outline` | Modifier for .link-parent | `_07_interactions.sass` |
| `.link-parent.small` | Modifier for .link-parent | `_07_interactions.sass` |

---

## Semantic Tokens

```css
:root {
  --white-fixed: #FFFFFF;
  --black-fixed: #171717;
  --bg: #ffffff;
  --bg-surface: #FAFAFA;
  --bg-panel: #FBFBF9;
  --bg-sunken: #F7F6F0;
  --bg-raised: #F4F4F5;
  --bg-extra: #F7F8F9;
  --bg-input: #FAF7F7;
  --bg-button: #CED8D3;
  --text-primary: #262627;
  --text-secondary: #777777;
  --text-muted: #a3a4a7;
  --text-inverse: #ffffff;
  --state-surface: #F2EFE9;
  --state-hover: #ECE7DF;
  --state-selected: #E4DFD5;
  --border: #d8d8d8;
  --border-subtle: #eceaea;
  --border-strong: #cfcfcf;
  --theme-color: #2F9E44;
  --theme-color-alt: #2d9206;
  --success: #10B981;
  --success-hover: #059669;
  --warning: #F59E0B;
  --warning-hover: #D97706;
  --danger: #EF4444;
  --danger-hover: #DC2626;
  --info: #3B82F6;
  --info-hover: #2563EB;
  --ring: rgba(0, 127, 78, 0.35);
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 4px 12px rgba(15, 23, 42, 0.08);
  --shadow-bs: 0 12px 32px rgba(15, 23, 42, 0.12);
  --font-sans: system-ui, sans-serif;
  --font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
  --text-xs: 0.67rem;
  --text-sm: 0.75rem;
  --text-md: 0.875rem;
  --text-bs: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 2.75rem;
  --unit-space: 0.25rem;
  --space-xs: var(--unit-space);
  --space-sm: calc(var(--unit-space) * 2);
  --space-md: calc(var(--unit-space) * 3);
  --space-bs: calc(var(--unit-space) * 4);
  --space-lg: calc(var(--unit-space) * 6);
  --space-xl: calc(var(--unit-space) * 8);
  --space-2xl: calc(var(--unit-space) * 12);
  --space-3xl: calc(var(--unit-space) * 16);
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-bs: 16px;
  --radius-lg: 32px;
  --radius-full: 9999px;
  --control-h-sm: 21px;
  --control-h-bs: 32px;
  --control-h-lg: 38px;
  --avatar-size: 32px;
  --switch-w: 40px;
  --switch-h: 22px;
  --switch-thumb: 16px;
  --transin1: cubic-bezier(0.470, 0.000, 0.745, 0.715);
  --transin2: cubic-bezier(0.550, 0.055, 0.675, 0.190);
  --transin3: cubic-bezier(0.755, 0.050, 0.855, 0.060);
  --transout1: cubic-bezier(0.390, 0.575, 0.565, 1.000);
  --transout2: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  --transout3: cubic-bezier(0.230, 1.000, 0.320, 1.000);
  --speed1: 90ms;
  --speed2: 140ms;
  --speed3: 220ms;
  --motionin1: var(--speed1) var(--transin1);
  --motionout1: var(--speed1) var(--transout1);
  --motionin2: var(--speed2) var(--transin2);
  --motionout2: var(--speed2) var(--transout2);
  --motionin3: var(--speed3) var(--transin3);
  --motionout3: var(--speed3) var(--transout3);
  --header-height: 48px;
  --footer-height: 32px;
  --fit-height: calc(var(--header-height) + var(--footer-height));
  --prose-clamp: 65ch;
  --content-clamp: 1280px;
  --app-inline: var(--space-lg);
  --card-min: 240px;
  --height-sm: 16px;
  --height-md: 20px;
  --height-bs: 24px;
  --height-lg: 32px;
  --sidebar-width: 280px;
  --sidebar-width-left: 280px;
  --sidebar-width-right: 280px;
  --z-sticky: 100;
  --z-raised: 200;
  --z-modal: 300;
}
```
