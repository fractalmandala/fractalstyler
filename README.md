# Fractalstyler

A composition styling system — the class registry is the public API: compose
in markup, write no stylesheet. Ships as editable SASS and as plain compiled
CSS. MIT © [Fractal Mandala](https://github.com/fractalmandala)

**This library is a work in constant progress and breaking changes each bump.**

- Registry: [`REGISTRY.md`](REGISTRY.md) · [`docs/REGISTRY.api.md`](docs/REGISTRY.api.md)
- Configuration, the *why/how*: [`docs/references/configurations.md`](docs/references/configurations.md) · the *what*: [`docs/references/configurations-api.md`](docs/references/configurations-api.md)
- Agent skill: [`skills/fractal-styler/SKILL.md`](skills/fractalstyler/SKILL.md)

---

## Using it in a project

Two ways to hold the styles, and an IDE layer you can add to either.

### 1. Install and use — track the package; upgrades come from npm

```sh
pnpm add -D @fractaldesign/fractalstyler
```

```sass
@use '@fractaldesign/fractalstyler/styles' as *
```

Plain CSS consumers need no SASS toolchain:

```js
import '@fractaldesign/fractalstyler/css'; // dist/css/fractalstyler.css
```

The classes are active once the import is in place. To keep the registry and
the configuration docs greppable inside your project, run:

```sh
npx @fractaldesign/fractalstyler init --track --docs
```

which places `REGISTRY.md`, `REGISTRY.api.md` and
`references/configurations{,-api}.md` into a `fractalstyler/` folder at your
project root (`--docs-dir` to choose another). Docs are snapshots — re-run
`init` after upgrading to refresh them.

### 2. Eject — the files become yours

Copies every styles layer, the palette modules and the registry builder into
your project, where you may edit them freely (including the `$`-variables in
`_00_config.sass`, in place):

```sh
npx @fractaldesign/fractalstyler eject
```

That leaves you `src/lib/styles/` (11 layers + a seeded `_09_own.sass`),
`src/lib/palette/`, and `scripts/build-registry.mjs`. Import your local tree,
regenerate your own registry after edits (`node scripts/build-registry.mjs`,
Node only), and the linter keeps enforcing the contract against your copy:

```sh
npx @fractaldesign/fractalstyler lint src/
```

Nothing existing is ever overwritten — on a name conflict your file is kept
and reported. Delete a kept file and re-run `eject` to re-place it.

> **Drift warning**: an ejected copy no longer tracks the package — upgrades
> stop coming from npm. This is the less advisable mode; it exists so a
> project that must own its styles can still start from the whole system.

### 3. Either mode, with or without the IDE extension

Both `init` and `eject` accept `--intellisense` / `--no-intellisense`. With it
on, the CLI writes the workspace settings read by the
[Styles IntelliSense](https://github.com/fractalmandala/styles-intellisense)
VS Code extension — class completions and hovers inside `class="…"`, token
completions on `--custom-properties` — pointing at wherever your styles now
live (`node_modules/…/dist/styles` in track mode, your local folder in eject
mode), plus the copied `REGISTRY.api.md` as the description source. It also
checks the extension is installed and prints how to get it if not.

`npx @fractaldesign/fractalstyler init` with no flags asks the three questions
interactively; `--yes` takes the defaults (track + docs + intellisense).

## CLI reference

```sh
npx @fractaldesign/fractalstyler init     # scaffold: mode, docs, intellisense
npx @fractaldesign/fractalstyler eject    # copy styles + palettes + builder
npx @fractaldesign/fractalstyler lint     # contract linter (self or <dir>)
npx @fractaldesign/fractalstyler help     # all options
```

| Option | Default | Meaning |
|---|---|---|
| `--track` / `--eject` | track | How the styles are held |
| `--docs` / `--no-docs` | docs | Copy registry + configuration docs |
| `--docs-dir <dir>` | `fractalstyler/` | Where docs land |
| `--styles-dir <dir>` | `src/lib/styles` | Eject target for the layers |
| `--palette-dir <dir>` | `src/lib/palette` | Eject target for the palettes |
| `--scripts-dir <dir>` | `scripts` | Eject target for the registry builder |
| `--intellisense` / `--no-intellisense` | ask | VS Code extension settings + check |
| `--yes` / `-y` | — | Non-interactive, take the defaults |

`lint` needs the Sass compiler (an optional peer of this package):
`pnpm add -D sass`. Its own flags (`--json`, `--own <file>`, `--registry <f>`)
pass through unchanged.

## Developing this package

```sh
pnpm registry   # regenerate registry.json, REGISTRY.md, docs, skill references
pnpm vocab      # regenerate docs/REGISTRY.api.md
pnpm browser    # regenerate docs/browser.html
pnpm lint       # contract linter (self mode)
pnpm check      # validate-deck + svelte-check
pnpm css        # rebuild dist/css
```

Architecture: **L0 (Tokens) → L1 (Dimensions) → L2 (Containers) → L3
(Layouts) → L4 (Shells) → L5 (Visuals & Interactions)** — the layer map and
the edit recipes are in [`docs/references/configurations.md`](docs/references/configurations.md).
