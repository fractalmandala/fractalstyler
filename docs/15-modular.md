---
title: Modular
description: The sveltemodular workspace chrome — the dockable, splittable, tabbed workspace the Fractalsvelte UI is built on.
id: 15
---

`modular.css` is the chrome of the **sveltemodular** workspace: a dockable,
splittable, tabbed window manager built in Svelte 5. It is not part of the
design system — it is a *consumer* of it, and the reference implementation of
what a well-behaved third-party layer looks like.

Everything in it is scoped under `:where(.modular)`, so it cannot leak into the
rest of a page, and every value it uses is a Fractalstyler token with a safe
fallback:

```css
:where(.modular) {
	--modular-panel: var(--bg-surface, #ffffff);
	--modular-radius: var(--radius-sm, 4px);
}
```

Read it as the answer to "what does an extension layer owe the system?":
scoped selectors, token-routed values with fallbacks, its own dark theme, and
no new vocabulary of its own.

## The pieces

| Class | What it is |
|:---|:---|
| `.modular` | The workspace root — the flex column every other piece lives in |
| `.modular-root` | The content area under the chrome |
| `.modular-split` | A split container; `data-axis="x"` or `data-axis="y"` |
| `.modular-split-child` | One side of a split |
| `.modular-divider` | The draggable divider between two sides |
| `.modular-split-ratio-pill` | The label that appears on the divider while dragging |
| `.modular-panel` | A panel; `[data-focused]` marks the focused one |
| `.modular-tabbar` | The tab strip |
| `.modular-tab` | One tab; `.selected` marks the current one |
| `.modular-tab-title` | The tab's title |
| `.modular-badge` | The count badge on a tab |
| `.modular-tab-close` | The close button on a tab |
| `.modular-tab-accessory` | Anything a tab carries besides its title |
| `.modular-tab-actions` | The action area of a tab |
| `.modular-action-button`, `.modular-menu-button` | Buttons in the tab chrome; `.active` marks the pressed one |
| `.modular-panel-body` | The scrollable body of a panel |
| `.modular-view` | A view inside a panel |
| `.modular-drop-overlay` | The overlay that appears while dragging a panel |
| `.modular-drop-indicator` | Where the panel would land: `data-zone="center" \| "left" \| "right" \| "top" \| "bottom"` |
| `.modular-maximized` | A maximised panel |
| `.modular-maximized-bar` | The bar across the top of a maximised panel |
| `.modular-maximized-title` | The title in that bar |
| `.modular-maximized-body` | The body of a maximised panel |
| `.modular-floating` | A floating window; `data-layer="stage"` floats it above the stage |
| `.modular-floating-resize` | The drag handle in its corner |
| `.modular-tabbar-drag` | The handle that drags the whole tabbar |
| `.modular-hidden-tray` | The tray that holds the hidden-panel button |
| `.modular-hidden-button` | The button that brings the hidden panels back |
| `.modular-stage` | The area panels are dropped into |
| `.modular-stage-child` | One child of the stage |
| `.modular-stage-backdrop` | The backdrop behind the stage |
| `.modular-empty` | The empty state — nothing is open |
| `.modular-chrome` | A chrome strip; its direct children are laid out in a row |
| `dialog.modular-menu` | The context menu, a native `<dialog>` |
| `.modular-menu-item` | One item in that menu; `.danger` marks the destructive one |
| `.modular-menu-separator` | The rule between groups of items |
| `.modular-popout-body` | The body of a popout window |
| `.modular-popout-view` | A view inside a popout window |

## Its own theme

The workspace reads the system's colours by default and can be themed on its
own with `data-theme`:

```html
<div class="modular" data-theme="dark">…</div>
```

The dark block redefines the `--modular-*` values only — the system tokens
underneath are untouched, so the rest of the page keeps its theme.

This is a different meaning of `data-theme` from the system's named palettes
(`fractalsvelte`, `aurora`, and the rest in [Colors and Themes](./08-colors-themes.md)).
`.modular[data-theme='dark']` is the workspace's own light/dark switch. Do not
put `data-theme="dark"` on `<html>` expecting a named palette, and do not put
a palette name on `.modular` expecting the workspace chrome to change.

## Why it is not in `index.css`

`modular.css` is not part of the aggregate stylesheet. It is app chrome, not
design system: a consumer that wants it imports it on purpose.

```js
import '@fractaldesign/fractalstyler/styles/modular.css';
```

It is still indexed by the registry, so its classes are known to the linter and
to the agent skill.

## The rule it follows

`modular.css` is the example a project should copy when it writes its own
layer: scope everything, route every value through a token, give every token a
fallback, and add no new vocabulary.
