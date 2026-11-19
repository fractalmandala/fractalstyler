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
- `.bare` strips the outline to reset a control to nothing; whatever composes on top of it must restore a visible ring.
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

<!-- gen:begin css:components.css -->
```css

.avatar-group.circle > .avatar-more {
  border-radius: 50%;
}
.avatar-group.rounded > .avatar-more {
  border-radius: 12%;
}
.avatar-group.gap-overlap {
  --avatar-ring: var(--bg-panel);
}
.avatar-group.gap-overlap > .avatar-more {
  box-shadow: 0 0 0 2px var(--bg-panel);
}
.avatar-group.gap-overlap.row > * + * {
  margin-inline-start: calc(var(--avatar-size) * -0.25);
}
.avatar-group.gap-overlap.box > * + * {
  margin-block-start: calc(var(--avatar-size) * -0.25);
}
.avatar-group .avatar-more {
  width: var(--avatar-size);
  height: var(--avatar-size);
  font-size: calc(var(--avatar-size) * 0.38);
}

.badge {
  padding-inline: var(--space-sm);
  font-weight: 500;
  white-space: nowrap;
}

.tag {
  padding-inline: var(--space-sm);
  font-weight: 500;
  white-space: nowrap;
  background-color: var(--tag-color);
}
/* Text that picks white or near-black from the fill behind it, named by --ink-bg. */
.ink-auto { color: var(--text-primary); }
@supports (color: oklch(from red l c h)) {
  .ink-auto { color: oklch(from var(--ink-bg, var(--bg)) clamp(0.2, (0.62 - l) * 1000, 1) 0 0); }
}
.tag.ink-auto {
  color: var(--text-primary);
}
@supports (color: oklch(from red l c h)) {
  .tag.ink-auto {
    color: oklch(from var(--tag-color) clamp(0.2, (0.62 - l) * 1000, 1) 0 0);
  }
}
.tag.text-only {
  background-color: transparent;
  color: var(--tag-color);
}
.tag .tag-remove {
  height: 1.5em;
  width: 1.5em;
  margin-inline-end: calc(var(--space-xs) * -1);
  color: inherit;
}

.switch-box {
  display: inline-flex;
  flex-shrink: 0;
}
.switch-box input {
  appearance: none;
  margin: 0;
  width: 2em;
  height: 1.125em;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  background: radial-gradient(circle at 0.5em 50%, var(--text-muted) 0.32em, transparent 0.34em), var(--bg-input);
  cursor: pointer;
  transition: background 0.15s;
}
.switch-box input:checked {
  border-color: var(--theme-color);
  background: radial-gradient(circle at calc(100% - 0.5em) 50%, #fff 0.32em, transparent 0.34em), var(--theme-color);
}
.switch-box input[aria-invalid=true] {
  border-color: var(--danger);
}
.switch-box input:focus-visible {
  outline: 2px solid var(--theme-color);
  outline-offset: 2px;
}
.switch-box input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox-box {
  display: inline-grid;
  place-items: center;
  flex-shrink: 0;
}
.checkbox-box > * {
  grid-area: 1/1;
}
.checkbox-box input {
  appearance: none;
  margin: 0;
  width: 1.125em;
  height: 1.125em;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-xs);
  background-color: var(--bg-input);
  cursor: pointer;
}
.checkbox-box input:checked, .checkbox-box input[type=checkbox]:indeterminate {
  background-color: var(--theme-color);
  border-color: var(--theme-color);
}
.checkbox-box input[aria-invalid=true] {
  border-color: var(--danger);
}
.checkbox-box input:focus-visible {
  outline: 2px solid var(--theme-color);
  outline-offset: 2px;
}
.checkbox-box input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.checkbox-box svg {
  color: #fff;
  font-size: 0.75em;
  pointer-events: none;
}
.checkbox-box.radio input {
  border-radius: 50%;
}
.checkbox-box.radio input:checked {
  background: radial-gradient(circle, var(--theme-color) 40%, var(--bg-input) 45%);
}


.slide-unlock {
  min-width: 16rem;
  user-select: none;
  touch-action: none;
}

.split-button > :first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.split-button > :last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.card-clickable {
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.card-clickable:hover {
  border-color: var(--border-strong);
}
.card-clickable:focus-visible {
  outline: 2px solid var(--theme-color);
  outline-offset: 2px;
}
.card-clickable.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.split-button.rect > :first-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.split-button.rect > :last-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.split-button.mincurved > :first-child {
  border-top-left-radius: var(--radius-sm);
  border-bottom-left-radius: var(--radius-sm);
}
.split-button.mincurved > :last-child {
  border-top-right-radius: var(--radius-sm);
  border-bottom-right-radius: var(--radius-sm);
}
.split-button.modern > :first-child {
  border-top-left-radius: var(--radius-md);
  border-bottom-left-radius: var(--radius-md);
}
.split-button.modern > :last-child {
  border-top-right-radius: var(--radius-md);
  border-bottom-right-radius: var(--radius-md);
}
.split-button.curved > :first-child {
  border-top-left-radius: var(--radius-bs);
  border-bottom-left-radius: var(--radius-bs);
}
.split-button.curved > :last-child {
  border-top-right-radius: var(--radius-bs);
  border-bottom-right-radius: var(--radius-bs);
}
.split-button.round > :first-child {
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;
}
.split-button.round > :last-child {
  border-top-right-radius: 9999px;
  border-bottom-right-radius: 9999px;
}

.is-invalid, .checkbox-box input.is-invalid, .border.is-invalid, .border-strong.is-invalid {
  border-color: var(--danger);
}

.select-wrap > select.select {
  background-image: none;
  padding-right: calc(var(--space-sm) + 1.25em);
}
.select-wrap > .select-chevron {
  position: absolute;
  right: var(--space-sm);
  pointer-events: none;
}

.input { display: block; padding-inline: var(--space-md); transition: background var(--motionin1), border-color var(--motionin1), color var(--motionin1); }
.input:focus-visible { outline: none; border-color: var(--theme-color); box-shadow: 0 0 0 2px var(--ring); }
.input.fitted { width: max-content; }
.select { display: block; padding-inline: var(--space-bs); appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23697080' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; cursor: pointer; }
.select:focus-visible { outline: none; border-color: var(--theme-color); box-shadow: 0 0 0 2px var(--ring); }
.select.fitted { width: max-content; }
.link { color: var(--theme-color); text-decoration: none; transition: color var(--motionin1); }
.link:hover { color: var(--theme-color-down); }
.link-plain { color: var(--text-primary); text-decoration: none; transition: color var(--motionin1); }
.link-plain:hover { color: var(--theme-color); }
.link-parent { color: var(--text-primary); text-decoration: none; }
.link-parent .link-title { transition: color var(--motionin1); text-decoration: none; }
.link-parent:hover .link-title { color: var(--theme-color); }
a.nav-link { padding: var(--space-sm) var(--space-md); border-radius: var(--radius-sm); }
a.nav-link:hover { background-color: var(--state-selected); }
button, .button { display: flex; align-items: center; justify-content: center; text-decoration: none; white-space: nowrap; cursor: pointer; user-select: none; transition: background var(--motionin1), border-color var(--motionin1), color var(--motionin1); padding-inline: var(--space-md); }
button:focus-visible, .button:focus-visible { outline: 2px solid var(--ring); outline-offset: 1px; }
button:disabled, .button:disabled, .button[aria-disabled='true'] { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
:is(button, .button):not(.no-scaling):active {transform: scale(0.98);}

button.h-xs:not(.btn-icon), 
button.h-sm:not(.btn-icon), 
button.h-md:not(.btn-icon), 
.button.h-xs:not(.btn-icon), 
.button.h-sm:not(.btn-icon), 
.button.h-md:not(.btn-icon) { 
	padding-inline: var(--space-sm); 
}

.button-group, .split-button { display: inline-flex; align-items: stretch; vertical-align: middle; }
.button-group.vertical, .split-button.vertical { flex-direction: column; }
.button-group:not(.vertical), .split-button:not(.vertical) { flex-direction: row; }
.button-group .button, .button-group button, .split-button .button, .split-button button { border-radius: 0; }
.button-group .button:first-child, .button-group button:first-child, .split-button .button:first-child, .split-button button:first-child { border-top-left-radius: var(--radius-sm); border-bottom-left-radius: var(--radius-sm); }
.button-group .button:last-child, .button-group button:last-child, .split-button .button:last-child, .split-button button:last-child { border-top-right-radius: var(--radius-sm); border-bottom-right-radius: var(--radius-sm); }
.button-group .button:not(:first-child), .button-group button:not(:first-child), .split-button .button:not(:first-child), .split-button button:not(:first-child) { margin-left: -1px; position: relative; z-index: 1; }
.button-group .button:hover, .button-group .button:focus-visible, .button-group button:hover, .button-group button:focus-visible, .split-button .button:hover, .split-button .button:focus-visible, .split-button button:hover, .split-button button:focus-visible { z-index: 2; }
.button-group.vertical .button, .button-group.vertical button, .split-button.vertical .button, .split-button.vertical button { border-radius: 0; }
.button-group.vertical .button:first-child, .button-group.vertical button:first-child, .split-button.vertical .button:first-child, .split-button.vertical button:first-child { border-top-left-radius: var(--radius-sm); border-top-right-radius: var(--radius-sm); }
.button-group.vertical .button:last-child, .button-group.vertical button:last-child, .split-button.vertical .button:last-child, .split-button.vertical button:last-child { border-bottom-left-radius: var(--radius-sm); border-bottom-right-radius: var(--radius-sm); }
.button-group.vertical .button:not(:first-child), .button-group.vertical button:not(:first-child), .split-button.vertical .button:not(:first-child), .split-button.vertical button:not(:first-child) { margin-left: 0; margin-top: -1px; position: relative; z-index: 1; }
.button-group.vertical .button:hover, .button-group.vertical .button:focus-visible, .button-group.vertical button:hover, .button-group.vertical button:focus-visible, .split-button.vertical .button:hover, .split-button.vertical .button:focus-visible, .split-button.vertical button:hover, .split-button.vertical button:focus-visible { z-index: 2; }
@keyframes vibrating { 0% { transform: scale(0); } 50% { transform: scale(1.03); } 100% { transform: scale(0); } }
a.btn, a.button { display: flex; align-items: center; justify-content: center; font-size: var(--text-md); text-decoration: none; cursor: pointer; user-select: none; transition: background var(--motionin1), border-color var(--motionin1), color var(--motionin1); padding-inline: var(--space-md); }
a.btn:focus-visible, a.button:focus-visible { outline: 2px solid var(--ring); outline-offset: 1px; }
a.btn:disabled, a.button:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }

.btn-icon, button.btn-icon { flex-shrink: 0; aspect-ratio: 1; padding: 0; padding-inline: 0; }

/* An icon button that is exactly its icon: no padding or border, and its size comes from the icon, not the size class. */
.btn-icon.fit-icon, .btn-icon.fit-icon:hover { padding: 0; border-width: 0; height: auto; min-block-size: 0; }

/* a card's size sets its text scale, not its height */
.card, .card.h-xs, .card.h-sm, .card.h-md, .card.h-bs, .card.h-lg, .card.h-xl { height: auto; min-block-size: 0; }
.card.h-sm { font-size: var(--text-xs); }
.card.h-md { font-size: var(--text-sm); }
.card.h-bs, .card.h-lg { font-size: var(--text-md); }
.card.h-xl { font-size: var(--text-bs); }
.card-sized.h-lg { font-size: var(--text-bs); }
.card-sized.h-xl { font-size: var(--text-lg); }
.card-sized .card-title { font-size: 1.5em; }
.card-sized .card-desc { font-size: 1.075em; }
.card-sized .card-label { font-size: 1em; }
.card-sized .card-sub { font-size: 0.95em; }

.banner.h-sm, .banner.h-md, .banner.h-bs, .banner.h-lg, .banner.h-xl { height: auto; }
.banner.h-sm { padding: var(--space-xs) var(--space-sm); font-size: var(--text-sm); }
.banner.h-md { padding: var(--space-sm) var(--space-md); font-size: var(--text-md); }
.banner.h-bs { padding: var(--space-sm) var(--space-md); font-size: var(--text-bs); }
.banner.h-lg { padding: var(--space-md) var(--space-bs); font-size: var(--text-lg); }
.banner.h-xl { padding: var(--space-md) var(--space-lg); font-size: var(--text-xl); }

/* fsui-unify: C09 — .tint recipe moved to component-props.css and merged with .soft */

/* A framed control: the frame shows focus for whatever is focused inside it,
   so the input or trigger it wraps draws no ring of its own. */
.field { transition: border-color var(--motionin1), box-shadow var(--motionin1); }
.field:focus-within { border-color: var(--theme-color); box-shadow: 0 0 0 2px var(--ring); }
.field.is-invalid:focus-within { border-color: var(--danger); }
.field > .input:focus-visible, .field > [role='combobox']:focus-visible { outline: none; box-shadow: none; }

/* A region that opens and closes by height. The single child clips, so put
   padding on what is inside that child, not on the child itself. */
.collapse { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--motionout3); }
.collapse.open { grid-template-rows: 1fr; }
.collapse > * { min-height: 0; overflow: hidden; }
@media (prefers-reduced-motion: reduce) { .collapse { transition: none; } }

/* A table of records: collapsed borders, a quiet header row, optional stripes. */
.data-table { width: 100%; border-collapse: collapse; font-size: var(--text-md); color: var(--text-primary); }
.data-table caption { caption-side: top; text-align: left; padding: var(--space-md) var(--space-bs) var(--space-xs); }
.data-table th, .data-table td { padding: var(--space-sm) var(--space-bs); border-bottom: 1px solid var(--border); }
/* left by default, at no specificity, so ta-c and ta-r on a cell win */
:where(.data-table th, .data-table td) { text-align: left; }
.data-table th { font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-secondary); background-color: var(--state-hover); white-space: nowrap; }
.data-table tbody tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover td { background-color: var(--state-hover); }
.data-table.striped tbody tr:nth-child(even) td { background-color: var(--state-hover); }
.data-table tr.selected td { background-color: var(--state-selected); }
.data-table .data-table-select { width: 2.75rem; padding-right: 0; }
.data-table .data-table-empty { padding-block: var(--space-2xl); text-align: center; }

/* The notched bottom edge of a bookmark ribbon. */
.ribbon-bookmark { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%); padding-bottom: var(--space-sm); }

/* Drag-to-scroll on top of .reel: no scrollbar, grab cursors, and no snapping mid-drag. */
.carousel-track { scrollbar-width: none; touch-action: pan-y pinch-zoom; user-select: none; -webkit-user-select: none; }
.carousel-track::-webkit-scrollbar { display: none; }
.carousel-track.is-draggable { cursor: grab; }
.carousel-track.is-dragging { cursor: grabbing; scroll-snap-type: none; scroll-behavior: auto; }
.carousel-track.is-dragging * { pointer-events: none; user-select: none; }

/* A slider track. Upright, its size class sets the thickness and the length is fixed. */
.track-min { min-width: 14em; }
.track-v { height: 10em; }
.track-v.h-xs { width: var(--h-xs); height: 10em; }
.track-v.h-sm { width: var(--h-sm); height: 10em; }
.track-v.h-md { width: var(--h-md); height: 10em; }
.track-v.h-bs { width: var(--h-bs); height: 10em; }
.track-v.h-lg { width: var(--h-lg); height: 10em; }
.track-v.h-xl { width: var(--h-xl); height: 10em; }

/* fsui-unify: C22 */
/* A key cap: a hairline box with a heavier floor, like a physical key. */
.kbd { display: inline-flex; align-items: center; justify-content: center; min-width: 1.75em; padding-inline: var(--space-xs); border: 1px solid var(--border-strong); border-bottom-width: 2px; border-radius: var(--radius-sm); background-color: var(--bg-surface); color: var(--text-primary); font-family: var(--font-mono); font-weight: 500; line-height: 1; white-space: nowrap; }


/* Ink on filled variants.
 * Each fill picks its own text colour: white on a dark fill, near-black on a
 * light one, computed from the fill token, so a theme only has to set the fill.
 * To force a colour instead, set the matching override token in the theme:
 *   --on-button, --on-button-secondary, --on-theme,
 *   --on-info, --on-success, --on-warning, --on-danger
 * Browsers without relative colour syntax use the fixed fallback in each rule.
 */
.primary {
  background-color: var(--bg-button);
  border: 1px solid var(--bg-button);
  color: var(--on-button, var(--text-inverse));
}
.primary:hover {
  background-color: var(--bg-button-hover);
  border: 1px solid var(--bg-button-hover);
}
.primary.selected {
  background-color: var(--bg-button-active);
  border: 1px solid var(--bg-button-active);
}

.secondary {
  background-color: var(--bg-button-secondary);
  border: 1px solid var(--bg-button-secondary);
  color: var(--on-button-secondary, var(--text-primary));
}
.secondary:hover {
  background-color: var(--bg-button-secondary-hover);
  border: 1px solid var(--bg-button-secondary-hover);
}
.secondary.selected {
  background-color: var(--bg-button-secondary-active);
  border: 1px solid var(--bg-button-secondary-active);
}

.themed {
  background-color: var(--theme-color);
  border: 1px solid var(--theme-color);
  color: var(--on-theme, var(--white-fixed));
}
.themed:hover {
  background-color: var(--theme-color-down);
  border: 1px solid var(--theme-color-down);
}
.themed.selected {
  background-color: var(--theme-color-down);
  border: 1px solid var(--theme-color-down);
}

.outline {
  background-color: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-strong);
}
.outline:hover {
  color: var(--theme-color);
  border: 1px solid var(--theme-color);
}
.outline.selected {
  color: var(--text-primary);
  background-color: var(--state-selected);
  border: 1px solid var(--border-strong);
}

.ghost {
  background-color: transparent;
  border: 1px solid transparent;
  color: var(--text-primary);
}
.ghost:hover {
  background-color: var(--state-hover);
}
.ghost.selected {
  background-color: var(--state-selected);
}

.link {
  background-color: transparent;
  border: 1px solid transparent;
  text-decoration: none;
  text-decoration-color: var(--theme-color);
  color: var(--theme-color);
}
.link:hover {
  text-decoration: underline;
  color: var(--theme-color);
}


.info {
  background-color: var(--info);
  border: 1px solid var(--info);
  color: var(--on-info, var(--white-fixed));
}

.success {
  background-color: var(--success);
  border: 1px solid var(--success);
  color: var(--on-success, var(--white-fixed));
}

.warning {
  background-color: var(--warning);
  border: 1px solid var(--warning);
  color: var(--on-warning, var(--white-fixed));
}

.danger {
  background-color: var(--danger);
  border: 1px solid var(--danger);
  color: var(--on-danger, var(--white-fixed));
}
.danger:hover {
  background-color: var(--danger-hover);
  border: 1px solid var(--danger-hover);
}

.msg.info { background-color: var(--info-00); border: 1px solid var(--info-25); color: var(--info-100); }
.msg.success { background-color: var(--success-00); border: 1px solid var(--success-25); color: var(--success-100); }
.msg.warning { background-color: var(--warning-00); border: 1px solid var(--warning-25); color: var(--warning-100); }
.msg.danger { background-color: var(--danger-00); border: 1px solid var(--danger-25); color: var(--danger-100); }
.msg.neutral { background-color: var(--neutral-00); border: 1px solid var(--neutral-25); color: var(--neutral-100); }

@supports (color: oklch(from red l c h)) {
  .primary { color: var(--on-button, oklch(from var(--bg-button) clamp(0.2, (0.62 - l) * 1000, 1) 0 0)); }
  .secondary { color: var(--on-button-secondary, oklch(from var(--bg-button-secondary) clamp(0.2, (0.62 - l) * 1000, 1) 0 0)); }
  .themed { color: var(--on-theme, oklch(from var(--theme-color) clamp(0.2, (0.62 - l) * 1000, 1) 0 0)); }
  .info { color: var(--on-info, oklch(from var(--info) clamp(0.2, (0.62 - l) * 1000, 1) 0 0)); }
  .success { color: var(--on-success, oklch(from var(--success) clamp(0.2, (0.62 - l) * 1000, 1) 0 0)); }
  .warning { color: var(--on-warning, oklch(from var(--warning) clamp(0.2, (0.62 - l) * 1000, 1) 0 0)); }
  .danger { color: var(--on-danger, oklch(from var(--danger) clamp(0.2, (0.62 - l) * 1000, 1) 0 0)); }
}

/* With a size, the control keeps that size as its minimum height and grows with its content. */
.hgrow.h-xs { height: auto; min-height: var(--h-xs); }
.hgrow.h-sm { height: auto; min-height: var(--h-sm); }
.hgrow.h-md { height: auto; min-height: var(--h-md); }
.hgrow.h-bs { height: auto; min-height: var(--h-bs); }
.hgrow.h-lg { height: auto; min-height: var(--h-lg); }
.hgrow.h-xl { height: auto; min-height: var(--h-xl); }

/* fsui-unify: C21 C03 C09 */
/* An unstyled native control — the starting point for composed ones. */
.bare { appearance: none; -webkit-appearance: none; background: none; border: none; padding: 0; margin: 0; font: inherit; color: inherit; outline: none; min-width: 0; }

/* A row in a menu, list, listbox, tree or command palette. */
.item { display: flex; align-items: center; justify-content: flex-start; gap: var(--space-sm); width: 100%; min-height: var(--h-lg); padding: var(--space-xs) var(--space-sm); border: none; border-radius: var(--radius-md); background-color: transparent; color: var(--text-primary); font-size: var(--text-md); text-align: left; cursor: pointer; user-select: none; outline: none; transition: background-color var(--motionin1), color var(--motionin1); }
.item:hover, .item:focus-visible, .item.highlighted { background-color: var(--state-hover); }
.item.selected, .item[aria-selected='true'], .item[aria-current='page'], .item[aria-current='true'] { background-color: var(--state-selected); }
.item.disabled, .item:disabled, .item[aria-disabled='true'] { opacity: 0.5; pointer-events: none; }

/* Track, fill, thumb: a slider, a progress bar, a meter. The control sets
 * --value (and --from for a range) between 0 and 1. Distinct from .track-v. */
.track { position: relative; flex: none; background-color: var(--state-selected); border-radius: var(--radius-full); }
.fill { position: absolute; inset-block: 0; left: calc(var(--from, 0) * 100%); width: calc((var(--value, 0) - var(--from, 0)) * 100%); border-radius: inherit; background-color: var(--theme-color); }
.thumb { position: absolute; top: 50%; left: calc(var(--value, 0) * 100%); translate: -50% -50%; aspect-ratio: 1; border-radius: var(--radius-full); border: 1px solid var(--border-strong); background-color: var(--white-fixed); box-shadow: var(--shadow-sm); }
.track.vertical .fill { inset-block: auto; inset-inline: 0; left: 0; width: auto; bottom: calc(var(--from, 0) * 100%); height: calc((var(--value, 0) - var(--from, 0)) * 100%); }
.track.vertical .thumb { top: auto; left: 50%; bottom: calc(var(--value, 0) * 100%); translate: -50% 50%; }

/* A ring that fills with --value: progress rings, countdowns. Its thickness follows the text size. */
.ring { flex: none; aspect-ratio: 1; border-radius: var(--radius-full); background: conic-gradient(var(--theme-color) calc(var(--value, 0) * 360deg), var(--state-selected) 0); mask: radial-gradient(farthest-side, transparent calc(100% - 0.3em), black calc(100% - 0.3em + 1px)); -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 0.3em), black calc(100% - 0.3em + 1px)); }

/* The sliding highlight behind the active tab or segment. JavaScript springs
 * --ix --iy --iw --ih (pixels, unitless) to the active item's box. */
.indicator { position: absolute; top: 0; left: 0; width: calc(var(--iw, 0) * 1px); height: calc(var(--ih, 0) * 1px); translate: calc(var(--ix, 0) * 1px) calc(var(--iy, 0) * 1px); pointer-events: none; }

/* A chevron that turns when its owner opens. */
.caret { flex: none; transition: rotate calc(var(--spring-ms) * var(--motion-scale)) var(--spring); }
.caret.open { rotate: 180deg; }
.caret.quarter.open { rotate: 90deg; }

/* Tones re-point the accent, so .fill, .ring and .text-theme follow.
 * Not the same as the filled .danger / .info variants. */
.tone-neutral { --theme-color: var(--text-secondary); }
.tone-info { --theme-color: var(--info); }
.tone-success { --theme-color: var(--success); }
.tone-warning { --theme-color: var(--warning); }
.tone-danger { --theme-color: var(--danger); }

/* A current-colour status dot — badges, pulses, wave indicators. */
.dot { flex: none; width: 0.5em; height: 0.5em; border-radius: var(--radius-full); background-color: currentColor; }
```
<!-- gen:end css:components.css -->

## Component Props

Shapes, heights, tones and the soft/tint channels the components consume. The CSS below is the definition layer for those props.

<!-- gen:begin css:component-props.css -->
<!-- gen:end css:component-props.css -->

