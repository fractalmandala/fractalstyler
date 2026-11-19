# Setting Variables

The token set is Fractalstyler's theming surface. The names are fixed; the values belong to the project. This file is about where values live, which ones you may write, and what you must never do.

Live values come from the resolved package - read `./tokens.md` (generated from the layers) and, where it disagrees with the layer CSS, the layer CSS. The names below are the contract; treat any value as that version's default.

## Where Values Live

One file per project - the theme stylesheet, imported once from the app entry, after the package:

```css
/* app.css */
@import '@fractaldesign/fractalstyler/styles/index.css';

/* Your values only. Never a selector that styles an element directly. */
:root {
  --hue: 238;
  --chroma: 0.17;
  --tint: 0.014;
  --header-height: 3.5rem;
}
```

The order is the cascade, and the cascade is whatever `index.css` imports, in this order: <!-- gen:begin cascade -->`configurations` → `gaps-pads-margins` → `shapes-sizes` → `containers` → `typography` → `border-elevation-focus` → `layout-shell` → `colors-themes` → `motion-animation` → `components` → `component-props` → `colorpacks`<!-- gen:end cascade -->. Your file goes last, so your `:root` values win by source order. If you import only a subset of layers, keep that order - it is the order that works.

`custom.css` and `modular.css` ship beside that cascade and are **not** imported by it: they are opt-in layers, so import them explicitly, after the aggregate, when the project wants the extension point or the workspace chrome.

Two rules follow from this:

- A custom property resolves where it is declared. A token written on `:root` is computed with `:root`'s own variables; descendants inherit finished values. Overriding `--hue` on a subtree will not re-derive `--bg` there - see `colors-and-themes.md` for the `data-mode` / `data-theme` mechanism that does.
- Nothing else in the project restates a value. No component re-declares `--space-md`, no per-screen token block, no fallback literal beside a var. One source, one place.

## Two Kinds Of Variable

Theme tokens - what the project may set, in the theme file. Ladders, colour roles, chrome sizes.

| Family | Names | Notes on the ladder |
|:---|:---|:---|
| Space | `--space-xs sm md bs lg xl 2xl 3xl` | Drives every `.gap-*`, `.pad-*`, `.mar-*` family. Eight steps, one vocabulary. |
| Type | `--text-xs sm md bs lg xl 2xl 3xl 4xl 5xl` | The static rungs step up at 1025px and 1281px, so a rung is relative, not absolute. `--text-static-*` backs them; `--text-fluid-*` exists but is not wired in. |
| Radius | `--radius-xs sm md bs lg full` | `xs 2px` → `lg 16px`, `full 999px`. |
| Control height | `--h-xs sm md bs lg xl 2xl 3xl` | Controls, not panels - `xs` is 12px and `3xl` is 64px. A panel's size comes from `.measure-*`, `.max-h-*`, `.hfull`. |
| Measure | `--measure-xs sm md bs lg xl 2xl 3xl 4xl` | Widths for panels, dialogs, popovers, and the `.max-h-*` cap. |
| Colour roles | `--bg`, `--bg-surface`, `--bg-panel`, `--bg-overlay`, `--bg-input`, `--bg-button*`, `--state-hover`, `--state-selected`, `--border`, `--border-strong`, `--border-subtle`, `--text-primary`, `--text-secondary`, `--text-muted`, `--text-inverse`, `--theme-color`, `--theme-color-up`, `--theme-color-down`, `--success/-warning/-danger/-info` (+`-hover`), the `-00/-25/-50/-75/-100` ramps, `--ring`, `--scrim`, `--white-fixed`, `--black-fixed` | Declared per mode inside `@layer tokens`. Override a role only when you also override it in both modes. |
| Palette | `--hue` `--chroma` `--tint` | The three numbers that make a theme. Prefer a named `data-theme` over hand-setting these. |
| Ink overrides | `--on-button` `--on-button-secondary` `--on-theme` `--on-info` `--on-success` `--on-warning` `--on-danger` | Force the text colour on a fill. Set in a theme, never on an element. |
| Elevation | `--shadow-color` `--shadow-rim` `--shadow-xs sm md bs lg xl 2xl 3xl` | The `.shad-*` ladder reads these. |
| Chrome | `--header-height` `--footer-height` `--fit-height` `--sidebar-width` `--sidebar-width-left` `--sidebar-width-right` `--app-inline` `--content-clamp` `--prose-clamp` `--card-min` `--content-aside` | Change the shell geometry here - never by sizing `.app-header` or a sidebar with a class or a rule. |
| Stacking | `--z-sticky` `--z-raised` `--z-modal` `--z-toast`, `--z-100` … `--z-999` | Use the `.z-*` classes; touch the tokens only to re-order the bands globally. |
| Fonts | `--font-sans` `--font-mono` | Two stacks. Adding a third means the system needs a third token - a gap-ladder conversation. |
| Motion | `--speed0` … `--speed3`, `--transin1-3`, `--transout1-3`, `--motionin1-3`, `--motionout1-3`, `--spring-gentle/-snappy/-bouncy/-stiff/-slow` + `-ms` settle times, `--motion-scale` | Declared in `motion-animation.css`. `.spring-*` reads the current spring; `--motion-scale: 0` is the reduced-motion lever and `@media (prefers-reduced-motion)` sets it. |
| Brand ramps | `--fs-green*` `--fs-blue*` `--fs-orange*` `--fs-red*` `--fs-teal*` `--fs-neutral*`, `--fs-surface-white{a..h}1-9`, `--fs-surface-black{a..h}1-9`, `--fs-success/-warning/-danger/-info-00…100` | `colorpacks.css`. Ingredients for authoring a palette - no role, no class, never referenced by a member of the system. |
| Breakpoints | `--bp-sm md lg xl` (769 / 1025 / 1281 / 1441px) | Reference only. Media queries cannot consume custom properties, so the CSS repeats these as literals. Changing the token does not move a breakpoint. |

Component channels - written by classes and by JavaScript, not themed per screen: `--value` `--from` `--mx` `--my` `--ms` `--mr` `--mo` `--rx` `--ry` `--px` `--py` `--ix` `--iy` `--iw` `--ih` `--anchor` `--offset` `--size` `--tag-color` `--avatar-size` `--ink-bg` `--soft-ink` `--glass-blur` `--glass-alpha` `--vt-name` `--vt-x` `--vt-y` `--vt-r`.

Some channels are legitimately authored in the theme file (`--tag-color` for a category style, `--card-min` for a grid, `--glass-alpha` for a surface) and some are written at runtime by the component that owns them (`--value`, `--ix`, `--mx`). What you must not do is invent a new one, or set one inline to dodge the closed-class rule - `style="--gap: 13px"` is exactly as much drift as `style="gap: 13px"`.

## Shape, Density and Motion Axes

One attribute rewrites a whole ladder today, on the root or on a subtree, and it is the sanctioned way to make a region tighter:

| Attribute | Values | Rewrites |
|:---|:---|:---|
| `data-density` | `cozy` *(the default - the rule is `:root, [data-density='cozy']`)* | the radius ladder, `--h-*` and `--measure-*` together |

`data-radius` and `data-motion` are **not implemented in the current layers** - there is no `[data-radius]` or `[data-motion]` rule, so writing one changes nothing. Reduced motion comes from `@media (prefers-reduced-motion)`, which sets `--motion-scale: 0`; there is no `compact` / `comfortable` density and no `calm` / `playful` motion. Verify before teaching any of them.

Prefer the axis over restating tokens. `[data-density='cozy']` keeps every class name meaningful; a hand-edited space ladder breaks that, because `.pad-md` silently stops meaning "the third rung of the ladder".

## Defaults Versus Choices

From the 4 Questions, answer 4 decides this section:

- Yes, use the defaults - write no value overrides at all. Import the package and stop. Say plainly in your summary that the project is on shipped values.
- No, choose values - the user owns the values. Ask for the palette (or a `data-theme` name), density, and any chrome sizes they care about, then write exactly those. Where they gave nothing for a token, leave the default rather than inventing a value and presenting it as theirs.

Never argue about a value in the abstract. `--bg-surface` at one lightness or another is a user decision, not a correctness question; the class-to-token wiring is the correctness question, and that is not negotiable.

## Snapshot Traps

Verify against the resolved version before relying on any of these:

- `.clamp-bs` sits between `.clamp-sm` and `.clamp-md` on the measure ladder - it is the `bs` rung, not a typo for `md`.
- `--avatar-size` and `--tag-color` have no default anywhere; a `.avatar-more` or a filled `.tag` renders unsized until something sets them.
- The generated `tokens.md` and `registry.json` can lag the stylesheets between releases. If a value or a class looks wrong, the layer CSS wins and `pnpm registry` in the package brings the generated surfaces back in line.
- `--bg-overlayed` is read by `.overlayed` but declared nowhere - set it in the theme file, or the surface renders with no background.

## Hard Bans

No new custom property names. No `style="--x: …"` or `style="gap: …"`. No hex, `rgb()` or `oklch()` literal outside the theme file's token declarations. No pixel literal beyond a documented 1-2px hairline. No fallback value baked into markup (`var(--space-md, 12px)` hides a missing token - the token is the contract, so a missing one is a bug to report, not a gap to paper over).

## Checklist

1. Every value the project defines lives in the one theme file, and nowhere else.
2. Every token name you wrote exists in the resolved token reference or layer CSS.
3. Colour-role overrides exist for both modes, and palette changes went through `--hue` / `--chroma` / `--tint` or a `data-theme`.
4. Shell geometry changed through `--header-height`, `--sidebar-width-*`, `--app-inline`, `--content-clamp` - not through sizing classes on shell elements.
5. Density, radius and motion preferences used an axis attribute rather than restated ladders.
6. Nothing was invented, and every gap that forced a conversation is in your report.
