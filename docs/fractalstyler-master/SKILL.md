---
name: fractalstyler-master
description: The skill that masters use of the Fractalstyler styling system - how to compose with it, how to migrate other systems onto it, and how to keep drift in check. Use whenever Fractalstyler is to be used, audited, or ported to in a project.
---

# Fractalstyler Master

Someone in the world has to be the leading expert on Fractalstyler, and that entity is an agent using this skill. Use it whenever you are instructed to "use fractalstyler", "port this project to fractalstyler", "style this with fractalstyler", or asked to audit a codebase for Fractalstyler drift.

Fractalstyler is a lean styling and design system built on the principle of minimal styling, maximal customizability. A closed set of class definitions plus a variable system provide layout and visual flexibility. It creates components, themes, layouts and shells. You compose in markup; you variate through tokens.

## Contents

- Golden Rules
- The 4 Questions
- References
- Progressive Discovery
- Basic Design Rules
- Bundled Scripts
- Verification Contract

## Golden Rules

As the fractalstyler master, you are keeper and steward of its golden rules - always ensuring these are followed wherever fractalstyler is being used.

1. No new classes - fractalstyler styles by adding from an existing set of defined classes to the inline markup, and variates UI by changing the values assigned to variables. It does not create new classes, it does not add `<style>` tags to files.

> Principle - fractalstyler is built to inhibit class bloat.
> Check - if you are creating and using classes not defined in fractalstyler, you are drifting away.

2. Canonical markups for layouts and shells - fractalstyler defines classes and the EXACT markups to use for laying out app shells, headers, page content, sidebars, and more. Always use them instead of creating or recreating your own.

> Principle - fractalstyler is built for consistency and speed of setup.
> Check - the app/site shell, the layout for sidebars, headers and footers, page headers and page content - if you have created new styling/classes for these, you have drifted away.

3. Variable names are fixed, values are not - do not get lost into whether a variable, say `--bg-surface` should be #FFFFFF or #FCFCFC or something else. The point of variables is that users can define them however they like. What's important is that all sizes, gaps, radius values, colors - are using the variables names defined by Fractalstyler.

> Principle - fractalstyler extends a set of variables that allow complete customization of looks without reinvention.
> Check - the variables set is basically the key to themeing. If you are using variables outside it, or not using them, you are reducing the scope and features of fractalstyler.

4. Where the required styling (in migration or conversion projects) is simply not possible with fractalstyler classes, retain them, but always highlight this to the user. 
5. Keep all such classes, and any extra non-fractalstyler classes in one project stylesheet (`custom.css`) that the app imports **after** `@fractaldesign/fractalstyler/styles`. The package ships a `custom.css` layer but `index.css` does not import it - a class written there and never imported emits nothing. Do not keep them in `<style>` tags.
6. The exception to the `<style>` tag rule is in case of components, where each component carries its styling in its own `<style>` tag. In those cases - retain.
7. `custom.css` is a narrow exception, not an escape hatch. Every class there must carrt a comment saying why, and it is not a place to park first-party layout because the class set proved inconvenient. If you reach for it on your own markup, stop and run the gap ladder instead.
8. The gap ladder, when the system cannot express something. Never improvise silently:
  - Search the resolved `registry.json` (or `./references/classes-index.md`) for the property you need.
  - Look for a composition that achieves it - a container plus modifier plus child, or an existing token.
  - Look for a documented variable or axis that achieves it.
  - If the need is recurring and belongs to Fractalstyler: say so, name the class or token you would add, and ask before extending the system.
  - If it belongs only to a third party: `custom.css`, per the paragraph above.

## The 4 Questions

When you begin in a project with fractalstyler, you must have a clear answer for 4 questions. If the user has not volunteered the information, ask these questions before proceeding. Do not assume, do not take any past history as convention, do not guess. Establish a clear line between user confirmation on each of these questions, and the answer you form. 

1. Whether to install via NPM or use local version?
2. Whether a fresh project, a conversion project, or modified?
3. Whether to add SASS dev dependency?
4. Whether to use Fractalstyler variable default values?

Ask all 4 questions first - you need all 4 answers before you can begin.

### Question 1 - Whether to install via NPM or use local version?

Fractalstyler is frequently being updated with new classes, canonical components etc., so the NPM package may not always be the absolute "latest and current" version. Always ask directly - "whether to install package, or use local version?"

### Question 2 - Whether a fresh project, a conversion project, or modified?

The workflows to use, steps to take, things to specifically implement, are different depending on what type of project you are working in:
A. **Fresh** - no styling, no legacy, clean install and use Fractalstyler
B. **Conversion** - project has existing styling (like Tailwind, or others), that has to be converted to Fractalstyler.
C. **Modified** - installation/setup of a project, which has other styling built in, but installation has to be done without it, and with Fractalstyler.

#### A. Fresh Fractalstyler

In a fresh installation
- follow the user instructions on whether to install via NPM/local version, and on variable default values yes/no.
- depending on the answers, define the variables in a css file in this project
- then follow this sequence:

1. Begin usage by first establishing the basic shell and layout, using the canonical layouts
 - canonical app-shell
 - canonical header and/or footer
 - canonical sidebars
 - canonical central content section
 - canonical page header
 - canonical article, prose content etc.
2. typography - establish canonical header-nav links, sidebar nav links and sections, page title and desc, page headings, text body classes, card title and desc
3. Interactions - use the components and component props fractalstyler gives for buttons, inputs, and more
4. For styling from here onwards, refer to the section `## Progressive Discovery`.

#### B. Conversion Project

If the project has existing styling (usually Tailwind, sometimes CSS modules etc.), break your work into 5 phases.

1. Phase 1 - align variables. That is, remove the current variables being used in the project, and instead use fractalstyler variables. Here, some conversion rules are to be followed. See `./references/migration.md`

2. Phase 2 - align classes. This has to be done in stages. Start with outer layer - the shell and layouts. then containers - flex, grid, etc. See `./references/classes.md`

3. Phase 3 - align inputs, interactions, buttons - `./references/interactions.md`

4. Phase 4 - align typography `./references/typography.md`

5. Phase 5 - align layout and shell - `./references/canonical-markups.md`

#### B. Modified Project

In a modified project, first install and set it up, then treat it like a conversion project, but do not confirm any done or completion to user before the conversion is complete - deliver the full modified project to user before anything else.

### Question 3 - Whether to add SASS dev dependency?

State the consequence before asking for the answer: **Fractalstyler is plain CSS and nothing in the closed-class workflow needs Sass.** Yes only keeps Sass available for the project's own pre-existing pipeline; it does not change how you style with Fractalstyler, and it must not become a route to authoring new selectors.

If the user replies yes, `pnpm add -D sass` or `npm i -D sass` depending on the package manager of the project.

Then in the `vite.config.ts` file add the preprocessor (illustrative - the surrounding lines already exist in the project):

```ts
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    // existing plugins stay here
    sveltekit({
      // existing options stay here
      preprocess: [
        vitePreprocess() // add this
      ],
    })
  ],
})
```

### Question 4 - Whether to use Fractalstyler variable default values?

**Yes** means the project writes no value overrides: import the package and stop.

**No** means the user owns the values - so user must give values for all the variables. Where they gave nothing for a value, leave the shipped default rather than inventing a value and presenting it as theirs.

The names are fixed either way; only values move. `./references/variables.md` is the token map. Default values come from the resolved root - read them from `./references/tokens.md` (generated from the layers on every release) and, where the two disagree, from the layer CSS.

## References

- Begin Steps - setup interview and build order - `./references/beginning-fractalstyler.md`
- Class Index - every class the system defines, grouped by layer - `./references/classes-index.md`
- Token Reference - every system token and its default - `./references/tokens.md`
- Canonical Markups - shell and page structure contracts, sidebar variants, scroll ownership, native/GPUI boundary - `./references/canonical-markups.md`
- Classes - containers, alignment, spacing, shape, size, elevation - `./references/classes.md`
- Typography - semantic roles versus primitives - `./references/typography.md`
- Components - composition recipes: which classes together, in what nesting - `./references/components.md`
- Interactions - states, variants, focus, invalid, disabled, and the behavior JavaScript owns - `./references/interactions.md`
- Colors and Themes - palette, mode, subtree theming, status ramps - `./references/colors-and-themes.md`
- Motion and Animation - which motion pattern for which transition, and reduced motion - `./references/motion-animation.md`
- Variables - the token map, where values live, axes, what you may set - `./references/variables.md`
- Migration and Conversions - incremental conversion, token mapping, removal gates - `./references/migration.md`
- Contract Lint - the CLI that verifies all of this mechanically, and what it cannot see - `./references/contract-lint.md`
- MCP Tools - interactive class/token lookup, and where its answers need checking - `./references/mcp-tools.md`

### External References

- The NPM package - `https://www.npmjs.com/package/@fractaldesign/fractalstyler`
- Github - `https://github.com/fractalmandala/fractalstyler`
- Local - `~/fractaldesign/packages/fractalstyler`
- Registry - Local `/Users/amrit/fractaldesign/packages/fractalstyler/registry.json` (machine) and `registry.md` (human index) | Github `https://github.com/fractalmandala/fractalstyler/blob/main/registry.json`
- Token reference - `./references/tokens.md`
- `fractalstyler-mcp`, where configured, for class lookup and guidance

## Progressive Discovery

Resolve the package root first; these paths are inside it. Load the matching skill reference alongside the layer you are working in.

| Styling Task | File to Inspect | Responsibility |
|:---|:---|:---|
| Active files and cascade order | `src/lib/styles/index.css` | Master composition contract. |
| Spacing, gaps, padding, margins | `src/lib/styles/gaps-pads-margins.css` | The space ladder. (`classes.md`) |
| Radius, control heights, sizing, measure / max-height | `src/lib/styles/shapes-sizes.css` | Shape channels and sizing helpers. (`classes.md`) |
| Flex/grid containers, axis alignment, responsive grids | `src/lib/styles/containers.css` | Structural containers plus grid, frame and reel helpers. (`classes.md`) |
| Text sizes, roles, weights, tracking, line clamp | `src/lib/styles/typography.css` | Typography primitives, roles, and modifiers. (`typography.md`) |
| Borders, elevation, focus rings, glass, rim, glow | `src/lib/styles/border-elevation-focus.css` | The partition-law border set and the shadow ladder. (`classes.md`) |
| Page frames, headers, sidebars, rails, overlays | `src/lib/styles/layout-shell.css` | Application shell hierarchy, plus `.floating` / `.dialog` / `.layer`. (`canonical-markups.md`) |
| Colors, semantic tokens, dark mode, `data-theme` palettes | `src/lib/styles/colors-themes.css` | Parametric `--hue` / `--chroma` / `--tint` recipe; light/dark via `data-mode`. (`colors-and-themes.md`) |
| Named palettes, expanded to literal token sets | `themes/fsui-themes.css` | 24 themes, 70 roles per mode each; `data-theme="<name>"` + `data-mode`. (`colors-and-themes.md`) |
| Raw brand ramps (`--fs-green50`, …) | `src/lib/styles/colorpacks.css` | Ingredients for authoring a palette. Ships no classes and no roles. (`colors-and-themes.md`) |
| Motion, springs, keyframes, view transitions | `src/lib/styles/motion-animation.css` | Easings, durations, `.spring-*`, `.anim-spin/pulse/fade-*`, `.lift`, `.press`, `.vt-name`. (`motion-animation.md`) |
| Buttons, links, tags, avatars, switches, `.kbd` | `src/lib/styles/components.css` | The interactive elements. (`components.md`, `interactions.md`) |
| Variants, control parts, tones, soft/tint | `src/lib/styles/component-props.css` | The classes Fractalsvelte UI consumes. (`components.md`, `interactions.md`) |
| Visibility by breakpoint band | `src/lib/styles/configurations.css` | `.md-only`, `.lg-only`, `.xl-only` and their `-hide` counterparts. (`classes.md`) |
| Mapping an existing styling system onto Fractalstyler | - | (`migration.md`) |

## Basic Design Rules

1. Do not use high border-radius. 3px, 6px are the working range.
2. Do not use borders around cards, items. Use borders extremely sparingly. Any 2 items/elements next to each other should not both have borders ever. Separate with spacing, a background step, or one divider.
3. You are only allowed to use `fractalstyler` classes, from the resolved registry. `fractalstyler-mcp` answers "which class?" without reading the whole registry - see `./references/mcp-tools.md` for what it is good at and where its numbers are stale.
4. You can also refer to `registry.json`, or `./references/classes-index.md` for the same list without leaving the skill.
5. Do not use gap-xs. At largest containers on pages, use gap-xl (when containers are `box` class), and second level use gap-lg, at 3rd level like cards use gap-bs. For items clamped closer, inside cards for example, like a heading and description in a `box` class, use `gap-md` or `gap-sm` on the box.
7. Alignment modifiers never stand alone. `.xcenter`, `.ytop`, `.center` resolve only on a container: `.row.xcenter`, `.box.ycenter`, `.grid.xcenter`. There is no bare `.xcenter`.
8. One scroll owner per region. `.scroll-y`, `.scroll-x`, `.scroll-menu`, `.reel` and a sidebar's own `overflow-y` each claim scrolling; nesting two makes both unusable.
9. Give flex children room to shrink. A text child inside a `.row` that must truncate takes `.min0` (or `.wmin0`); otherwise its content width pushes the row wider than its parent.

## Bundled Scripts

### `scripts/untailwind` - Tailwind classes → the CSS they really compile to

Before mapping anything onto a Fractalstyler rung, ask the real compiler what the class does. The output annotates every declaration with its utility, its pixel equivalent, and whether the value came from the project's own theme.

```bash
S=skills/fractalstyler-master/scripts/untailwind
node $S/untailwind.mts --classes "flex items-center gap-4 text-lg tracking-tight md:p-6"
node $S/untailwind.mts src/routes/+page.svelte --theme src/app.css --summary
echo "text-fg bg-brand p-3" | node $S/untailwind.mts - --theme src/theme.css --format sass
```

`--help` lists the flags. Run it on a whole file to census a page, on `--classes` to check one suspicious utility, and with `--theme` whenever the project defines custom tokens - without it those come back as `guessed`. Needs Node 23.6+, which runs TypeScript directly.

It takes values from the real Tailwind v4 compiler and owns no dependencies to install. 

Resolution order: 
the target project's own `tailwindcss` v4 when one is reachable (from each input file's project, 
then the working directory) → `scripts/untailwind/vendor/node_modules/`,
the copy the skill ships, as the floor for when there is none. 
 
Using the project's compiler is the point, because a class means what that version says it means: `md:p-6` is `48rem` in one release and `768px` in another.

The last line of every run says which compiler answered (`# compiler: tailwindcss@4.3.5 — the target project, …`). Believe it over your assumption, and set `UNTAILWIND_TAILWINDCSS_DIR` to force a particular package.

## Verification Contract

Never report "done", "correct" or "consistent" on reasoning alone. Run these and report which ran.

1. Every styling class you introduced exists in the resolved `registry.json`.
2. No `<style>` block, `style=` attribute, raw hex literal, or pixel value beyond a documented hairline was added.
3. Every dimension, colour, radius, gap and duration resolves through a Fractalstyler variable name.
4. No selector from the previous styling system remains in touched files, and nothing they imported is still needed by them.
5. Run the contract linter over the project - `node <fractalstyler-root>/lint/cli.ts <absolute project path>` - and finish with 0 errors. See `./references/contract-lint.md` for what it catches, what it waves through, and the `.`-means-self-mode trap. Where the project defines its own checks (`pnpm check`, a build), run those too.

6. Render each affected screen at a narrow and a wide width. Look for overflow, clipped text, and children that needed `.min0`.
7. Toggle every mode and theme the project supports; confirm text stays readable on its own background in each.
8. Tab through the changed region. Everything interactive shows focus, and nothing that needed focus lost it.
9. Turn motion down (the OS reduced-motion setting; the layer answers it with `@media (prefers-reduced-motion)` setting `--motion-scale: 0`) and confirm nothing essential is now invisible or stuck mid-state. There is no `data-motion` attribute in the current layers - do not reach for one.
10. Drive every state you shipped: hover, selected, disabled, invalid, empty, loading.