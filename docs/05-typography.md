---
title: Typography
description: Explains all the styling for text content, from primitive and semantic sizes, token options to layout-based styling for nav content, prose text, page title, etc.
id: 5
---

This doc explains the contents of file `typography.css`, which sets all text-based styling in Fractalstyler (except text color). Fractalstyler offers 2 options for the core text size steps. You can either use the clamped values, like `clamp(1.2rem, 1.1156rem + 0.375vw, 1.4063rem)`, or static values with different settings at higher media queries, like `--text-static-lg` which is 1.12rem, and grows to 1.2rem above 1024px screen width, and 1.4rem above 1280px.

Either way, the classes and components consume the singular group:
- --text-xs
- --text-sm
- --text-md
- --text-bs
- --text-lg
- --text-xl
- --text-2xl
- --text-3xl
- --text-4xl
- --text-5xl

Set their values either to:

```css
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
```

or to:

```css
  --text-xs: 0.67rem;
  --text-sm: 0.75rem;
  --text-md: var(--text-fluid-md);
  --text-bs: var(--text-fluid-bs);
  --text-lg: var(--text-fluid-lg);
  --text-xl: var(--text-fluid-xl);
  --text-2xl: var(--text-fluid-2xl);
  --text-3xl: var(--text-fluid-3xl);
  --text-4xl: var(--text-fluid-4xl);
  --text-5xl: var(--text-fluid-5xl);
```

You will notice that text-xs and text-sm are set the same in all cases - 10.72px and 12px respectively. Each also exist as classes consuming their eponymous variables - `.text-xs`, `.text-sm`, and so on, up till `.text-5xl`. This defines the text sizing primitives.

## Semantic Sizes

For consistent typography, use these classes - defined once in `typography.css` and used repeatedly to control drift.

`page-title` for page titles. Works on any element but better put on an `<h1>` element.
`page-desc` for page description text. Inside a `.page-header`, an `<em>` in a paragraph renders as a small neutral chip, for naming a type or value in a page description.
`page-heading-xl`, `page-heading-lg`, and `page-heading-bs` for headers hierarchy on pages.
`text-body` for a default body text size, and `text-body-lg` and `text-body-sm` for variation in that if needed.
Inside cards, `card-title` and `card-desc` for titles and descriptions respectively.

### Layout Templates

For fixing consistent app/site header links and navigation links, and text in sidebars for documentation layouts:

1. Use class `header-nav` on the element inside headers that contains `<a>` links. `header-nav a` (uppercase, text-sm, weight 500) and `header-nav a:hover` (theme color) are styled.
2. In left sidebars (documentation), use `nav-header` for section/group label text, which isn't a link.
	- use `nav-link` for linking text, and `nav-link-sm` if nesting is needed. `nav-link` sets text-md with a slight `0.01rem` letter-spacing.
	- `a.nav-link` also gets padding and rounded corners via `components.css`, see [Components](./10-components.md).

Note: `components.css` adds `a.nav-link:hover { background-color: var(--state-selected); }` for the same nav-link elements.

### Prose Content

Set class `prose-content` on containers for prose text/documentation text in apps/sites, for example on the containing `<article>` elements. The following are styling inside `prose-content`:
- blockquote, blockquote p
- p, ul, ol, li
- p em, li em (rendered as inline code-style chips)
- h2, h3
- a, figure, .doc-element, div.scroll-x

`.tabular-nums` gives digits a fixed width, so numbers that change (counters, timers, prices in a column) do not shift the layout.

For the centered/left prose *containers* (max-width clamp, gap), see the `prose` and `prose-left` classes in [Containers](./04-containers.md).

## Modifiers

For adjusting line-height:

```css
.lh11 { line-height: 1.1; }
.lh12 { line-height: 1.2; }
.lh13 { line-height: 1.3; }
.lh14 { line-height: 1.4; }
.lh15 { line-height: 1.5; }
.lh16 { line-height: 1.6; }
```

For letter-spacing:

```css
.ls-tight-bs { letter-spacing: -0.01rem; }
.ls-tight-lg { letter-spacing: -0.02rem; }
.ls-tight-xl { letter-spacing: -0.03rem; }
.ls-wide-bs { letter-spacing: 0.01rem; }
.ls-wide-lg { letter-spacing: 0.02rem; }
.ls-wide-xl { letter-spacing: 0.03rem; }
```

Font-weights:

```css
.weight-300 { font-weight: 300; }
.weight-400 { font-weight: 400; }
.weight-500 { font-weight: 500; }
.weight-600 { font-weight: 600; }
.weight-700 { font-weight: 700; }
.weight-800 { font-weight: 800; }
```

Transform and Align:

```css
.tt-u { text-transform: uppercase; }
.tt-c { text-transform: capitalize; }
.ta-c { text-align: center; }
.ta-l { text-align: left; }
.ta-r { text-align: right; }

@media (max-width: 1024px) {
	.ta-c.mleft {
		text-align: left;
	}
}
@media (max-width: 1024px) {
	.ta-r.mleft {
		text-align: left;
	}
}
.truncate { overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.clamp-2 { line-clamp: 2; overflow: hidden; /* -webkit-box, 2 lines */ }
.clamp-3 { line-clamp: 3; overflow: hidden; /* -webkit-box, 3 lines */ }
```

The `mleft` companion class forces left alignment on `.ta-c`/`.ta-r` elements below 1024px.

`.clamp-2` and `.clamp-3` clamp a block to two or three lines (the `-webkit-line-clamp` box). Use `.truncate` for a single-line ellipsis.

Font families:

```css
.font-sans { font-family: var(--font-sans); }
.font-mono { font-family: var(--font-mono); }
```

Both tokens come from [Configurations](./01-configurations.md). Body text is sans by default; use `.font-mono` for code, kbd and numeric data.

## Resets

Finally, using `typography.css` sets the following global defaults:

1. margin: 0 for `p`, `li`, `h6`, `h5`, `h4`, `h3`, `h2`, `h1`
2. `p` and `li` set to text-wrap: pretty, the headers `h1` to `h5` to text-wrap: balance
3. `a` gets an inherit on color, and none on text-decoration.
4. `ul` and `ol` get list-style-type: none and padding-inline-start: 0.

*- for colors and themeing of text, see [Colors and Themes](./08-colors-themes.md).
