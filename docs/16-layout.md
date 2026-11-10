---
title: Layout
description: The Svelte components that render the application shell — header, main, sidebars, footer — and the layout state that fills them.
id: 16
---

`src/lib/layout/` is the Svelte 5 layer over `layout-shell.css`. The
stylesheet defines *what* the shell looks like; these components define the
**canonical markup** — so nobody has to remember that the header is
`.app-header`, that the content column is `.main-section`, or that the left
rail is `.sidebar-left`.

Every component is a thin wrapper: it renders one canonical class, takes a
`class` for your own additions, and accepts `children` as a snippet. None of
them writes a style.

## The anatomy

```
.app-shell                    ← AppShell
├── .app-header              ← header slot
├── .app-main                 ← the row
│   ├── .sidebar-left         ← left slot (a drawer below 1025px)
│   ├── .main-section        ← the children
│   └── .sidebar-right        ← right slot (from 1281px)
└── .app-footer              ← footer slot
```

## The components

### `AppShell` — the whole chrome

The one component that renders the shell. Every region is optional, and every
region can be filled by a prop **or** by the shared layout state.

| Prop | Type | Default | What it does |
|:---|:---|:---|:---|
| `header` | `Snippet` | — | the header content |
| `sidebarLeft` | `Snippet` | — | the left rail |
| `sidebarRight` | `Snippet` | — | the right rail |
| `footer` | `Snippet` | — | the footer content |
| `children` | `Snippet` | — | the main column |
| `clamped` | `boolean` | `false` | limits the header and main to the content width (`--content-clamp`), centred |
| `open` | `boolean` | `false` | opens the left drawer — the shell gets `.open` |
| `class` | `string` | `''` | added to the shell |

```svelte
<script>
	import { AppShell } from '$lib/layout';
</script>

<AppShell clamped>
	{#snippet header()}
		<strong>My app</strong>
	{/snippet}

	{#snippet sidebarLeft()}
		<nav class="box gap-sm">
			<a class="nav-link" href="/">Home</a>
		</nav>
	{/snippet}

	<h1>Hello</h1>
</AppShell>
```

### `AppHeader` / `AppFooter`

The two ends of the shell, for when you compose the regions yourself instead
of using the shell.

```svelte
<AppHeader clamped>
	<strong>My app</strong>
</AppHeader>
```

| Component | Prop | What it does |
|:---|:---|:---|
| `AppHeader` | `clamped` | limits the header to the content width |
| `AppFooter` | — | the footer row |

### `MainSection`

The main column.

| Prop | Type | Default | What it does |
|:---|:---|:---|:---|
| `solo` | `boolean` | `false` | the column is the only one — it gets the page padding (`.solo`) |

### `ContentSection`

A block of content inside the main column, with a **measure** — how wide the
text may get.

| Prop | Type | Default | What it does |
|:---|:---|:---|:---|
| `variant` | `'narrow-full' \| 'narrow-wide' \| 'narrow-half' \| 'null'` | `'narrow-full'` | the measure |

The measure is responsive, and it tightens as the viewport narrows:

| Variant | from 769px | from 1025px | from 1281px | from 1441px |
|:---|:---|:---|:---|:---|
| `narrow-full` | 640px | 640px | 680px | 680px |
| `narrow-wide` | 720px | 750px | 1024px | 1280px |
| `narrow-half` | 640px | 750px | 800px | 1024px |
| `null` | no left padding — the content goes edge to edge | | | |

### `NavSection`

A titled group of links, for a sidebar.

| Prop | Type | Default | What it does |
|:---|:---|:---|:---|
| `title` | `string` | *required* | the group heading |
| `class` | `string` | `''` | added to the section |

```svelte
<NavSection title="Library">
	<a class="nav-link" href="/docs">Docs</a>
	<a class="nav-link" href="/blog">Blog</a>
</NavSection>
```

It renders a `.nav-section` with a `.nav-header` heading and a `.box` of
children.

### `TocSection`

A table of contents, for the right rail. It takes either a list of items or
children.

| Prop | Type | Default | What it does |
|:---|:---|:---|:---|
| `items` | `TocItem[]` | — | the entries — each becomes an anchor to `#id` |
| `title` | `string` | `'On this page'` | the heading |
| `class` | `string` | `''` | added to the section |

```svelte
<TocSection
	items={[
		{ id: 'intro', label: 'Introduction' },
		{ id: 'usage', label: 'Usage', active: true }
	]}
/>
```

Each item renders as a `.nav-link` anchor to `#id`, with `.active` on the one
you are reading. `TocItem` is `{ id: string; label: string; active?: boolean }`.

The section renders a `.toc-section` with a `.nav-header` heading and a `.box`
of the entries — the same shape as `NavSection`, so the two sit together in a
rail without looking different.

## The layout state

`layoutState` is a reactive singleton that holds the shell's regions. It exists
so that a **nested route can set its own sidebar or table of contents** without
prop drilling through every layout in between.

```svelte
<script>
	import { layoutState } from '$lib/layout';

	// in a page or a nested route
	layoutState.setRight(myTocSnippet);
	layoutState.setToc([{ id: 'intro', label: 'Introduction' }]);
</script>
```

| What | |
|:---|:---|
| `layoutState.sidebarLeft` / `.sidebarRight` / `.header` / `.footer` | the region snippets |
| `layoutState.tocItems` | the table of contents |
| `layoutState.isOpen` | whether the left drawer is open |
| `setLeft()` / `setRight()` / `setHeader()` / `setFooter()` / `setToc()` | set a region |
| `toggleSidebar(open?)` | opens, closes, or flips the drawer |
| `reset()` | clears everything |

**A prop always wins over the state.** The shell reads
`prop ?? layoutState.<region>`, so a page that passes `sidebarLeft` explicitly
keeps that, and the shared state is only the fallback.

The drawer is the other half of this: `layoutState.toggleSidebar()` sets
`isOpen`, the shell renders `.open` on it, and below 1025px the left rail
becomes a fixed drawer over the content.

## The responsive behaviour, in one place

| The viewport | What happens |
|:---|:---|
| below 1025px | the left rail is hidden — it becomes a drawer, opened with `.open` on the shell |
| from 1025px | the left rail is visible |
| from 1281px | the right rail becomes visible |
| the `--header-height` and `--footer-height` tokens | the header and footer heights; the main area is fitted to the viewport minus them, so the page never scrolls twice |

## Notes

- The components live in `src/lib/layout/`, and `index.ts` is the barrel.
  Inside this repository:

  ```js
  import { AppShell, layoutState } from '$lib/layout';
  ```

  In a project that installs the package:

  ```js
  import { AppShell, layoutState } from '@fractaldesign/fractalstyler/layout';
  ```
- The classes they render are documented in
  [Layout Shell](./07-layout-shell.md); this page is about the components
  that put them together.
- They are exported from the package under `./layout` — the components, the
  `layoutState` singleton, the `LayoutState` class and the `TocItem` type.
