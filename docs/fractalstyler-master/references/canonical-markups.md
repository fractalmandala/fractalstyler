# Canonical Markups

The exact structures for shells, page frames, sidebars and content regions. These are the strongest constraint in Fractalstyler. Use these structures instead of creating or recreating your own.

Names here follow the layered package. Confirm every class against the resolved `registry.md`; where this snapshot and the registry disagree, the registry wins.

## How To Read These Markups

- Fixed - element nesting, the class on each structural node, and which region scrolls. Change these and you have built a different shell.
- Variable - what goes inside a region (links, buttons, content), how many `.nav-section` groups you emit, and any modifier or utility classes you add to a documented node (`.row.grow.ycenter.gap-bs` on the header spacer is normal composition).
- Insertion points - are marked with comments. Do not insert a wrapper between a documented parent and its documented child unless the reference for that region shows one.
- Scroll ownership - `.sidebar-left` and `.sidebar-right` each carry `overflow-y: auto` and a viewport-derived height, so a sidebar scrolls itself. `.main-section` does not scroll: the document scrolls it. Never add `.scroll-y` inside a sidebar, and never add it to `.main-section` while the page also relies on document scroll - two owners make neither usable.
- Breakpoint reality of the sidebars - the left rail displays from 1025px; below that it is an off-canvas drawer opened by `.app-shell.open`. The right rail displays from 1281px only. Your markup must therefore stay valid when a rail is hidden, and the drawer needs a real toggle in the header (behavior JavaScript or a `<label>` owns; CSS alone will not open it).

## Canonical App Shell

### With sidebars

```svelte
<div class="app-shell">
	<header class="app-header">
		<a class="logo-link" href="/">
			<!--logo / brand name-->
		</a>
		<div class="row grow ycenter gap-bs">
			<!--in svelte apps with tauri or gpuix, this is where the grab is for moving windows, and where double clicks land for maximise/minimise windows-->
		</div>
		<div class="row ycenter gap-bs">
			<nav class="header-nav">
				<!--each link is a plain <a> with no class-->
			</nav>
			<!--mode and theme toggles-->
		</div>
	</header>
	<main class="app-main">
		<aside class="sidebar-left">
			<nav class="nav-section">
				<span class="nav-header"></span>
				<div class="box">
					<a class="nav-link" href="/">.</a>
					<!--links of one group-->
				</div>
			</nav>
			<!--one .nav-section per group-->
		</aside>
		<section class="main-section">
			<!--root layout: render page content here-->
		</section>
		<aside class="sidebar-right">
			<nav class="toc-section">
				<span class="nav-header"></span>
				<a class="toc-link" href="/">.</a>
				<!--one .toc-link per heading on the page-->
			</nav>
		</aside>
	</main>
	<!--footer is optional; omit it entirely rather than emitting an empty one-->
	<footer class="app-footer"></footer>
</div>
```

`aside` is optional. If a page has one rail, emit only that rail - see the variants below.

### Without sidebars

```svelte
<div class="app-shell">
	<header class="app-header">
		<a class="logo-link" href="/">
			<!--logo-->
		</a>
		<div class="row grow ycenter gap-bs"></div>
		<div class="row ycenter gap-bs">
			<nav class="header-nav">
				<!--each link is a plain <a> with no class-->
			</nav>
			<!--mode and theme toggles-->
		</div>
	</header>
	<main class="app-main">
		<section class="main-section solo">
			<!--root layout: render page content here-->
		</section>
	</main>
	<footer class="app-footer"></footer>
</div>
```

`.solo` is what tells the main section it is the only column - it adds the inline page padding. With any rail present, drop `.solo` and let the rail carry the edge.

### Rail variants

Same shell in all cases; only the children of `app-main` change.

- no rails: one - `main-section.solo`
- left rail only - `sidebar-left` + `main-section`, and inside the page `content-section narrow-half`


## Canonical Page Shell

Content width and side rails are independent choices. A documentation page can sit in a shell with no rails; a dashboard can sit between two rails. Pick the frame by how the content reads, not by whether a sidebar exists.

### Long-form reading (prose)

```svelte
<section class="content-section narrow-full">
	<header class="page-header">
		<h1 class="page-title">.</h1>
		<p class="page-desc">.</p>
	</header>
	<article class="prose-content">
		<!--page content-->
		<!--with .prose-content active, give h2-h6, p, a, blockquote, ul, ol no classes and no styling-->
	</article>
</section>
```

`.prose-content` styles its descendants by element selector. Adding classes inside it fights that cascade and is drift, even when the classes are Fractalstyler's own.

### Composed page content (dashboards, settings, lists)

```svelte
<!--narrow-* classes determine width. narrow-full is narrowest, narrow-wide is widest,narrow-half sits in middle-->
<section class="content-section narrow-half">
	<header class="page-header">
		<h1 class="page-title">.</h1>
		<p class="page-desc">.</p>
	</header>
	<article class="page-content">
		<h2 class="page-heading-lg">.</h2>
		<div class="grid-3 gap-bs">
			<!--cards, controls, tables-->
		</div>
		<p class="text-body">.</p>
	</article>
</section>
```

### Width rungs

On `.content-section`, and all centred above 769px:

| Class | Behaviour |
|:---|:---|
| *(none)* | full width, `--space-bs` inline padding from 769px |
| `.narrow-full` | `--measure-lg` from 1025px, `--measure-xl` from 1281px - the standard reading column |
| `.narrow-half` | `--measure-lg`, pushed to `--measure-xl` with reserved right padding from 1025px, widening to `--measure-2xl` from 1441px - use when a right rail or floating aside sits beside it |
| `.narrow-wide` | `--measure-xl`, `--measure-2xl` from 1281px, `--measure-3xl` from 1441px - dense pages that still want a ceiling |

`.null` on `.content-section` removes inline padding - for edge-to-edge media, not for text.


## Header And Nav Rules

- `.header-nav` children are bare `<a>` tags. They inherit uppercase, size and hover from `.header-nav a`; adding a class to them is drift.
- `.nav-link` and `.nav-link-sm` belong inside `.nav-section` groups, each group a `.box` under one `.nav-header`.
- `.toc-link` belongs inside `.toc-section`, ordered as the page's headings are ordered.

## Text Roles

`page-title` and `page-desc` appear once per page and only inside `.page-header`. `page-heading-xl / -lg / -bs` are the in-page heading rungs and go on real `h2`-`h6` elements - the rung is a visual size, never a licence to downgrade a heading's level for appearance's sake.

Inside cards, use `card-title` and `card-desc` classes.

## Native / GPUI Targets

For GPUI renderers (`gpuix-fractalsvelte`, `gpuix-svelte`), replace `header`, `footer`, `aside` and `main` with `div` and keep every class and every level of nesting exactly as documented:

```svelte
<div class="app-shell">
	<div class="app-header">…</div>
	<div class="app-main">
		<div class="sidebar-left">…</div>
		<section class="main-section">…</section>
	</div>
	<div class="app-footer"></div>
</div>
```

Tag substitution alone is not a portability guarantee. On a native target, verify each of these before shipping a shell, and treat an unsupported one as a finding rather than as something to work around with new classes:

- element and descendant selectors (`.header-nav a`, `.prose-content p`, `.sidebar-left ul`) - if the renderer does not resolve them, the rail and prose structures lose their styling, and that is a renderer gap to report
- `position: sticky` on `.app-header` and on both sidebars
- `100dvh` / `100svh` viewport units and `calc()` heights
- native form controls inside `.switch-box`, `.checkbox-box`, `.input`, `.select`
- `:focus-visible` outlines, `outline-offset`, and the `oklch()` colour functions
- popovers, `<dialog>` and `::backdrop` for `.floating` / `.dialog` / `.layer`
- view transitions and `linear()` spring easings in the motion layer

Route renderer-specific layout questions to that renderer's own guidance. This file governs structure, not the native styling engine.