# Typography

Use semantic classes consistently.
Use primitive classes inside components, consistently.

The CSS below is the definition layer - read it to learn what each name resolves to. Do not paste it into a project; the project imports the package.

## Roles First, Primitives Second

A role class carries intent and is the pair the theme and the components expect: `.page-title`, `.page-desc`, `.page-heading-xl` / `-lg` / `-bs`, `.text-body` / `.text-body-lg` / `.text-body-sm`, `.card-title`, `.card-desc`, `.nav-link`, `.nav-link-sm`, `.nav-header` and their `.toc-link`, `.toc-link-sm`, `.toc-header` twins. A primitive carries one property: `.text-lg`, `.weight-600`, `.lh13`, `.ls-tight-bs`, `.tt-u`, `.ta-c`.

The rule, made decidable:

- Text that fills a documented slot in a canonical markup or a component recipe takes the role for that slot. Adding `.text-3xl` beside `.page-title` is drift - the role already owns size, line-height, weight and tracking.
- Text that has no role - a label in a custom row, a caption inside your own card body - takes primitives, chosen from the same ladders.
- Never mix a role with a primitive that overrides the same property. On one element pick one; if the role is wrong, the slot is wrong.
- Roles are not headings. `.page-heading-lg` is a size rung: keep the `h1`-`h6` level the document outline needs and let the rung set the look. Do not put `.page-title` on a `<p>` because it is the biggest thing on screen.

## The Size Ladder Is Responsive

`--text-md` … `--text-5xl` point at `--text-static-*`, and those values step up at 1025px and again at 1281px. A `.text-lg` is therefore 1.12rem on small screens, 1.2rem above 1025px, 1.4rem above 1281px. Pick rungs by relative hierarchy, never by the pixel value you saw on your monitor, and do not hardcode a size to pin something that should scale.

`--text-fluid-*` exists but is not wired into `--text-*` in this snapshot; the one place a fluid value is used is `.prose-content p`, which repeats a `clamp()` literal rather than the token. Treat both as package questions, not as licence for a literal in your markup.

## Prose Versus Composed Text

Three different measures, and they are not interchangeable:

| Class | What it is | Where |
|:---|:---|:---|
| `.prose` / `.prose-left` | a reading measure container: `--prose-clamp` wide, flex column, small gap, centred or start-aligned | wrapping any stacked text |
| `.prose-content` | the document styling context: it styles bare descendant elements (`p`, `ul`, `ol`, `li`, `h2`, `h3`, `blockquote`, `a`, `figure`, `em`) with no classes at all | only on the `<article>` of a long-form page |
| `.text-body*` | body-copy rungs for composed, non-prose pages | inside `.box`, cards, sections |

Inside `.prose-content`, adding a class to a paragraph or heading is drift - the descendant selectors win the race anyway (`.prose-content p` outranks `.text-body`), so the class only misleads the next reader. Only two things belong there: elements the layer does not style (`h4`-`h6`, `table`, `pre`, images and their `.frame-*` wrappers), and the hooks it looks for by name (`.doc-element`, a `div.scroll-x`).

## Conventions Worth Knowing

- `em` means inline code in this system. `.prose-content p em`, `.page-header p em` and `p.code-in-p em` all render it as a code chip, not as italic. Use `<em>` for `code` inside prose; use `.kbd` for a key cap. For real italics, avoid `em` in those containers.
- `.mleft` is a narrow-screen escape hatch: `.ta-c.mleft` and `.ta-r.mleft` fall back to left-aligned at or below 1024px. That is the documented responsive alignment pattern - do not write a media query for it.
- `.truncate` is the only overflow-clamp class; multi-line clamp is a gap in the current stylesheet. It needs a width constraint to be meaningful, so pair it with `.min0` inside a flex row.
- `.tabular-nums` on anything whose digits must align - timers, counters, table cells.
- `.header-nav a` is styled by the parent; header nav links carry no class at all.

<!-- gen:begin css:typography.css -->
```css
.text-xs { font-size: var(--text-xs);}
.text-sm { font-size: var(--text-sm);}
.text-md { font-size: var(--text-md);}
.text-bs { font-size: var(--text-bs);}
.text-lg { font-size: var(--text-lg);}
.text-xl { font-size: var(--text-xl);}
.text-2xl { font-size: var(--text-2xl);}
.text-3xl { font-size: var(--text-3xl);}
.text-4xl { font-size: var(--text-4xl);}
.text-5xl { font-size: var(--text-5xl);}

.text-body { 
	font-size: var(--text-bs);
  line-height: 1.55;
}
.text-body-lg { 
	font-size: var(--text-lg);
  line-height: 1.5;
}
.text-body-sm { 
	font-size: var(--text-sm);
  line-height: 1.5;
}
.page-title { 
	font-size: var(--text-3xl);
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.02rem;
}
.page-desc { 
	font-size: var(--text-bs);
}
.page-heading-xl { 
	font-size: var(--text-xl);
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.01rem;
}
.page-heading-lg { 
	font-size: var(--text-lg);
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.01rem;
}
.page-heading-bs { 
	font-size: var(--text-bs);
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.01rem;
}
.card-title { font-size: var(--text-lg);
  font-weight: 600;
  line-height: 1.2;
}
.card-desc { 
	font-size: var(--text-md);
  line-height: 1.2;
}
.nav-link { 
	font-size: var(--text-md);
  line-height: 1.2;
  letter-spacing: 0.01rem;
}
.nav-link-sm { 
	font-size: var(--text-sm);
  line-height: 1.2;
}
.nav-header { 
	font-size: var(--text-sm);
  line-height: 1.1;
  font-weight: 500;
  padding: var(--space-sm);
}
.header-nav a { 
	text-transform: uppercase;
  font-size: var(--text-sm);
  font-weight: 500;
}
.header-nav a:hover { 
	color: var(--theme-color);
}

.lh11 { line-height: 1.1; }
.lh12 { line-height: 1.2; }
.lh13 { line-height: 1.3; }
.lh14 { line-height: 1.4; }
.lh15 { line-height: 1.5; }
.lh16 { line-height: 1.6; }

.ls-tight-bs { letter-spacing: -0.01rem; }
.ls-tight-lg { letter-spacing: -0.02rem; }
.ls-tight-xl { letter-spacing: -0.03rem; }
.ls-wide-bs { letter-spacing: 0.01rem; }
.ls-wide-lg { letter-spacing: 0.02rem; }
.ls-wide-xl { letter-spacing: 0.03rem; }

.weight-300 { font-weight: 300; }
.weight-400 { font-weight: 400; }
.weight-500 { font-weight: 500; }
.weight-600 { font-weight: 600; }
.weight-700 { font-weight: 700; }
.weight-800 { font-weight: 800; }

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

/* fsui-unify: C13 */
.clamp-2 { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden; }
.clamp-3 { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; line-clamp: 3; overflow: hidden; }

.font-sans { font-family: var(--font-sans); }
.font-mono { font-family: var(--font-mono); }

.prose-content blockquote { 
	border-left: 4px solid var(--theme-color);
  padding-left: 1rem;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
}
.prose-content blockquote p { 
	margin-bottom: 0;
}
.prose-content p, 
.prose-content ul, 
.prose-content ol { 
	margin-bottom: 1.5rem;
  margin-top: 0;
  line-height: 1.6;
  font-weight: 400;
  letter-spacing: 0;
  font-size: clamp(1rem, 0.9489rem + 0.2273vw, 1.125rem);
  color: var(--text-primary);
}
.prose-content li { 
	margin-bottom: 0.5rem;
}
.prose-content h2 { 
	margin-top: 2rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
  font-weight: 600;
}
.prose-content h3 { 
	margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: 800;
  text-transform: capitalize;
  font-size: var(--text-bs);
}
.prose-content p em, 
.prose-content li em { 
	background-color: var(--bg-panel);
  border: 1px solid var(--border-strong);
  font-size: 1rem;
  padding-inline: 4px;
  border-radius: 2px;
}
.prose-content .doc-element, 
.prose-content figure, 
.prose-content div.scroll-x { 
	margin-bottom: 1.5rem;
}
.prose-content a { 
	text-decoration: underline;
  text-decoration-color: var(--theme-color);
}

.tabular-nums { font-variant-numeric: tabular-nums; }

.page-header p em { font-style: normal; font-size: var(--text-md); background-color: var(--neutral-00); padding: 2px 4px; border: 1px solid var(--neutral-25); color: var(--neutral-100); border-radius: var(--radius-xs) }

p.code-in-p em { background-color: var(--neutral-00); font-size: var(--text-bs); padding: 3px 8px; color: var(--text-primary); font-style: normal; }
```
<!-- gen:end css:typography.css -->