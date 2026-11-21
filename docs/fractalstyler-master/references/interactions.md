# Interactions

States, variants and the interactive primitives. `./components.md` shows the markup these classes go into; this file explains what each state means and who drives it.

The CSS below is the definition layer - read it, do not paste it.

## Styling Ends Where Behavior Begins

Fractalstyler styles a state; your markup and typescript create it. Every one of these is a two-part contract, and shipping only the CSS half is a defect:

| Class | State it styles | Who must set it |
|:---|:---|:---|
| `.collapse` / `.collapse.open` | height animates `0fr` → `1fr` | toggle `.open`, keep `aria-expanded` in sync, and put padding on the content *inside* the clipping child |
| `.caret` / `.caret.open` | chevron rotation | the owning control's open state |
| `.indicator` | the sliding tab highlight | JS writes `--ix --iy --iw --ih` (unitless pixels) to the active item's box |
| `.track` + `.fill` + `.thumb` | slider, progress, meter | the control writes `--value` (and `--from` for a range) as 0-1 fractions |
| `.motion` / `.tilt` | direct manipulation | JS writes `--mx --my --ms --mr --mo` (or `--rx --ry`). They are registered non-inheriting, so a moving parent will not leak into a child |
| `.carousel-track.is-draggable` / `.is-dragging` | drag-to-scroll | pointer handlers manage `--px/--py` and both classes |
| `.item.highlighted` | menu/list keyboard cursor | the list's own key handling |

Native controls do the rest for you: `<dialog>` gives stacking, focus trap and dismissal; `:popover-open` gives the open state; `<input type="checkbox">` gives `checked` and `:indeterminate`.

## State Classes Are Not The State

`.disabled` and `[aria-disabled='true']` only *look* disabled. Use the real `disabled` attribute - or `aria-disabled` plus your own guard - and remember the CSS sets `pointer-events: none` on disabled buttons, which also kills their tooltips and hover explanations.

`.is-invalid` and `[aria-invalid='true']` restyle the border. Both are required for an accessible invalid field: the attribute for assistive tech, `.field` / `.input` for the eye, and a real text error message beside them. A red border alone is not a valid error state, and `--danger` is not distinguishable from `--warning` for colour-blind users.

## Focus Must Survive

`.input`, `.select`, `.field` and `.button` all draw their own focus indicator - a `--ring` box-shadow or a `--theme-color` outline - so removing the default is safe there. Where it is not safe:

- `.item` sets `outline: none` and signals `:focus-visible` with a `--state-hover` background tint only. That is a weak indicator. Pair `.item` with `.focus-ring` (or `.focus-theme`) in menus and lists.
- `.bare` strips the outline to reset a control to nothing; whatever composes on top of it must restore a visible ring. `.bare` sits in `@layer base`, so `.focus-ring`, padding, fill and border utilities composed on it always win.
- `.focus-none` is for controls whose wrapper already draws the ring. Never on a lone interactive element.

Tab through every interactive composition before calling it done.

## Variants, Shapes, Heights

| Axis | Classes |
|:---|:---|
| Variant | `.primary` `.secondary` `.themed` `.outline` `.ghost` `.link` |
| Status fill | `.info` `.success` `.warning` `.danger`, `.neutral` |
| Shape | `.rect` `.mincurved` `.modern` `.curved` `.round` |
| Height | `.h-xs` `.h-sm` `.h-md` `.h-bs` `.h-lg` `.h-xl`, plus `.hgrow` to grow past it |

The same set works across a button, an input, a select, a card or a plain `div`: `<button class="primary h-md curved">`.

Ink on a fill is computed, not chosen. Each filled variant derives its text colour from its own fill via `oklch(from … )`, behind an `@supports` fallback. To force one, set the matching override in the theme file - `--on-button`, `--on-button-secondary`, `--on-theme`, `--on-info`, `--on-success`, `--on-warning`, `--on-danger` - never a colour on the element. `.ink-auto` does the same job for a background you set yourself, reading `--ink-bg`. Auto-ink is a starting point, not a passing grade: check the contrast of every fill-and-text pair in both modes.

`.tone-neutral` / `-info` / `-success` / `-warning` / `-danger` re-point `--theme-color` so `.fill`, `.ring` and `.text-theme` follow. A tone is not the same as a filled status variant - `.tone-danger` colours accents, `.danger` colours the surface.

## Component Props

Shapes, heights, tones and states consumed through `data-*` attributes and `types.css`. The CSS below is the definition layer for those props.

<!-- gen:begin css:types.css -->
<!-- gen:end css:types.css -->
