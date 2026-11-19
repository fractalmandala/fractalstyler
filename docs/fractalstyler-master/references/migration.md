# Migration and Conversions

Moving a project from another styling system onto Fractalstyler. Read this for Conversion (B) and Modified (C) routes.

The governing rule: migrate a slice, verify the slice, then delete what the slice no longer needs. Never begin by removing the old variables or the old framework's import - every screen still using them goes blank or unstyled, and you lose the reference you are converting against.

The other governing rule: the ladder is the design, use it to bring pixel equality with the old system, or as much as possible.
> But modify old system to match the ladder. A converted screen that matches the old `13px` gap by hardcoding `13px` has not been migrated, it has been re-broken. Map to the nearest rung and let the page settle onto Fractalstyler's rhythm.

## Phase 0 - Baseline And Inventory

Do this before touching a file, and keep the output. It is your diff surface and your exit criteria.

1. Screenshots of every distinct route/state at 900px, 1100px, 1300px and 1500px, in each theme the project supports. Without a before-image, every later argument about "did it change?" is a guess.
2. Class census - which styling classes the project actually uses, and how often. `grep -rhoE 'class(Name)?="[^"]+"' src | tr ' ' '\n' | sort | uniq -c | sort -rn` is enough to see the shape of it. Then decompile the real meaning of the frequent ones with the bundled script, which asks the actual Tailwind compiler rather than trusting the class name:

```bash
node <skill-dir>/scripts/untailwind/untailwind.mts src//*.svelte --theme src/app.css --summary
```

3. `--summary` gives the element and class counts plus every unresolved class; drop it for the annotated CSS. Pass `--theme` whenever the project declares custom tokens, or those come back as `guessed`.
4. Token census - every custom property the project declares, and every place a raw literal appears (`#hex`, `rgba(`, `[0-9]+px`, `text-\[[0-9]`).
5. Coupling map - which files import the old system (entry CSS, config, plugin, build step), and which are third-party styles you will not convert.
6. Commit a clean tree so every later phase is one revert away.

Then estimate by file count per band, and say the number out loud before starting. A conversion's real cost is the long tail of small pages, not the ten components you can see.

## Phase 1 - Install Alongside

Install or link per the user's NPM/local answer, import the package after the existing entry CSS, and change no markup yet. The app should look exactly as it did. Confirm with the Phase 0 screenshots.

Coexistence is allowed only inside this phase and as a deliberate, documented bridge. Say in your report which bridge you used and which phase retires it.

If the old system emits utility classes that will collide with Fractalstyler's short names (`rounded`, `border`, `grow`, `wrap`, `full`), check for collisions before Phase 3.

## Phase 2 - Map Tokens, Do Not Delete Them

Declare the Fractalstyler theme file and build a mapping table for the project's own tokens. Old token → Fractalstyler role → decision. This table is the artefact that makes the rest mechanical, and it is what you show the user when a value must change.

Colour maps by role, never by value:

| Old (Tailwind example) | Fractalstyler | Note |
|:---|:---|:---|
| `bg-white` / `bg-gray-50` | `--bg` / `--bg-surface` | Pick by hierarchy: page, then surface, then panel. |
| `bg-gray-100` / `bg-gray-200` | `--bg-panel` | The third step of the same ladder. |
| `bg-gray-900` / `bg-black` | `--text-primary` (or `--bg` in dark mode) | A dark *background* in light mode is usually `--bg-button`. |
| `text-gray-500` / `-600` | `--text-secondary` / `--text-muted` | Two rungs, not a palette. |
| `border-gray-200` / `-300` | `--border` / `--border-subtle` / `--border-strong` | Three weights; pick by prominence. |
| `bg-blue-600`, brand colours | `--theme-color` family, or a `data-theme` palette | Three numbers, not a hex per role. |
| `red-500` / `green-*` / `amber-*` / `sky-*` | `--danger` / `--success` / `--warning` / `--info` | Use the `-00/-25` ramp pair for a soft status block (`.msg`). |
| `dark:bg-*` / `dark:text-*` | Nothing - the `[data-mode]` recipe already differs | Delete the variant; set `data-mode`. |

Where a value is contested, settle it with the bundled compiler instead of memory (`scripts/untailwind`), or ask the MCP server to snap it (`./mcp-tools.md` - but check the step it returns, its `approxPx` table lags the real ladders) - `node <skill-dir>/scripts/untailwind/untailwind.mts --classes "md:p-6 text-lg"` returns the declarations Tailwind actually emits. The tables below are the common answers, not a substitute for checking.

Check the `# compiler:` line the script prints before trusting a mapping. It uses the project's own `tailwindcss` v4 when one is reachable and the skill's shipped copy only as a floor, so numbers match the version being converted, not a fixed release. A v3 project is refused outright (v3 utilities come from a `tailwind.config` and a JS pipeline the script does not implement) - in that case build the Phase 2 table from the shipped `tailwind.config` and `theme.css` by hand, and say so.

Spacing, radius, size map to the nearest rung:

| Old | Fractalstyler | Rung |
|:---|:---|:---|
| `gap-1` `p-1` (0.25rem) | `--space-xs` | exact |
| `gap-2` `p-2` (0.5rem) | `--space-sm` | exact |
| `p-3` (0.75rem) | `--space-md` | exact |
| `gap-4` `p-4` (1rem) | `--space-bs` | exact |
| `p-6` (1.5rem) / `p-8` (2rem) | `--space-lg` / `--space-xl` | exact |
| `rounded-sm` (2px v3 / 4px v4) | `--radius-xs` | near |
| `rounded-md` (6px) | `--radius-md` | exact |
| `rounded-lg` (8px) / `rounded-xl` (12px) | `--radius-md` / `--radius-bs` | nearest rung, not exact |
| `rounded-full` | `--radius-full`, or the `.round` shape | exact |
| `text-xs` (12px) | `--text-sm` (12px) | exact |
| `text-sm` (14px) | `--text-md` (12.8px) or `--text-bs` (15.2px) | no exact rung - pick by role in the hierarchy, then re-check the steps above and below it |
| `text-base` (16px) / `text-lg` (18px) / `text-2xl` (24px) | `--text-bs` / `--text-lg` / `--text-2xl` | role match; remember the rungs grow at 1025px and 1281px |
| `h-8` / `h-10` (32 / 40px) | `--h-lg` (32) / `--h-xl` (40) | exact |
| `max-w-prose` (65ch) / `max-w-3xl` | `--prose-clamp` (65ch) / `--measure-*` | exact / role |
| `shadow-md` / `shadow-xl` | `--shadow-md` / `--shadow-xl` | rung-for-rung |
| `z-10` / `z-50` | `--z-raised` / `--z-modal` / `--z-toast` | bands, not numbers |
| `space-x-2` / `space-y-4` | `.gap-bs` on the container | Fractalstyler has no sibling-margin utility; gaps replace `space-*` |
| `duration-200` / `ease-out` | `--motionin*` / `--motionout*`, or a `.spring-*` | by feel, not by ms |
| `sm:` `md:` `lg:` `xl:` `2xl:` prefixes | `.md-hide` `.lg-only` … plus the responsive containers | four bands (769 / 1025 / 1281 / 1441), not five |

Two conversion traps worth naming: Tailwind's axis-relative `items-center` / `justify-between` become Fractalstyler's physical `ycenter` / `xbetween` on the container, and which property they touch depends on whether the container is a `.box` or a `.row` - a `flex-col` + `items-center` pair becomes `.box.xcenter`, not `.row.ycenter`.

## Phase 3 - Shell And Layout First

Replace the page/frame structures with the canonical markups from `canonical-markups.md` - `.app-shell`, `.app-header`, `.app-main`, `.main-section`, `.sidebar-left` / `.sidebar-right`, `.content-section`, `.page-header`, `.page-title`, `.page-desc`.

One pass here retires most of the project's structural CSS. Do not convert leaf components before the shell is right, or you will re-measure every component against a moving frame.

## Phase 4 - Containers And Spacing

`flex` / `grid` wrappers → `.row`, `.box` or `.column`, `.grid-*`, `.reel`, `.card-grid`. Alignment prefixes move onto the container as physical modifiers. Padding and gaps follow the Phase 2 table, then the house gap ladder (outer `gap-xl`, second level `gap-lg`, cards `gap-bs`).

Add `.min0` wherever a flex child must truncate rather than stretch the row - this is the failure that shows up only after migration, on long strings.

## Phase 5 - Components And States

Buttons, inputs, fields, cards, tags, tables, menus, dialogs → the recipes in `components.md`, with the state semantics from `interactions.md`.

Watch for what the old system gave you for free and Fractalstyler does not: a `.button` with no variant has no fill; a `.field` with no `.border` is invisible; `.tag` needs `--tag-color`. These are not regressions, they are the closed system asking you to choose. Choose deliberately, per the Phase 2 table.

## Phase 6 - Typography

Swap the size utilities for role classes wherever a role exists (`.page-title`, `.card-title`, `.text-body`), keep primitives elsewhere, and strip every class from inside a `.prose-content` region.

## Phase 7 - Motion

Replace ad-hoc transitions with `.spring` + a flavour, entrances with `.pop` + `.enter-*`, mounts with `.anim-in`, reveals with `.reveal` and its observer. Delete hand-written `@keyframes` whose job a documented `.anim-*` class already does; keep the ones that do not, and say which and why.

## Phase 8 - The Removal Gate

Old styling gets deleted only when its consumers are gone, in this order:

1. Project-declared variables that nothing references anymore.
2. Per-component `<style>` blocks and CSS-module imports whose markup is fully converted.
3. The old framework's entry import.
4. The plugin, its config file, and its dev dependency.
5. A final grep clean: no utility class from the old system, no `@apply`, no `tailwind`/equivalent string anywhere in source or config.

Before step 3, run a visual diff against Phase 0 at all four widths and both modes, and confirm the differences you see are the ones you intended (ladder rhythm, not broken layout).

## Verification Per Phase

After every phase, not only at the end:

- The build passes and the app renders - not "the build passes".
- Every styling class now in the tree exists in the resolved `registry.md`.
- No `<style>` block, `style=` attribute, hex literal, or oversized px literal was introduced.
- The Phase 0 screenshots still match in structure at all four widths.
- Tab order and focus visibility on anything touched.
- Both modes, both directions for anything with a `data-theme` override.

Run the contract linter after every phase - `node <fractalstyler-root>/lint/cli.ts <absolute project path>` - and treat its rules as the mechanical definition of "aligned" (`./contract-lint.md`; note that a target of `.` audits the package, not your project, so always pass an absolute path). Its `fs/unknown-class` output is the cheapest drift detector in the workflow, and its suggestions are fuzzy hints, not approved classes.

Report per phase: files touched, classes removed, classes added, linter result, differences you could not explain. An unexplained visual difference is a finding, not a detail.

## What Not to Migrate

- Third-party CSS a library needs. Leave it loaded; override in `custom.css` within its scope.
- Icons - they come from `fractalicons`. Do not carry an old icon set's classes across.
- JS-driven styling that measures and writes values (virtual lists, canvas overlays). Keep the logic; it is behaviour, not styling. Only its *values* move onto the ladder.
- A component that is genuinely unsupportable by the closed set. Do not fake it. Name the missing class or token, explain the requirement, and put it in the report as an open gap.

## Modified Projects Only

For route C, none of the above changes, but the delivery rule does: the user gets the finished conversion, not a progress report. Do not mark anything done, do not ask whether to continue, and do not stop at "the shell is converted" - deliver the migrated project, then report gaps.
