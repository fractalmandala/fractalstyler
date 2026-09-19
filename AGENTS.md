---
title: Agent Instructions
description: Master rules, styling constraints, ecosystem contracts, and guidelines for AI agents working in fractalstyler.
type: fractalstyler
---

> You cannot add ad-hoc CSS anywhere. Styles are added ONLY inside the system's designated files (`src/lib/styles`), always via fractal composition and existing tokens. No scoped `<style>` blocks anywhere, including components. 

> All colors, spacing, radii, and shadows resolve from the shared token vocabulary. Source of truth: `_00_tokens.sass` for the contract. Never invent token names, never hardcode a value a token covers.

**You MUST understand and use the `fractalstyler` styling system — it ships as SASS, so assume a preprocessor.**

If you find existing violations of these rules, drop a comment to the user. The project is in flux and they might be known, temporary violations. The project is part of a core set that should always be in sync. You are never working in any one of these projects alone. You are working in a WIP ecosystem.

---

## Dev Servers

Always first check with user if they have a dev server active before starting your own. If they do, use that. Always kill servers that you have started when done. Do not leave them running in the background.

---

## Other Rules

- Always keep docs, `README.md`, and `AGENTS.md` up to date in any project.
- All documentation files should have structured YAML frontmatter:

```yaml
---
title: ...
description: ...
type: {project/site name}
---
```

- If you see a doc without frontmatter, add it.
- **"Done"** always means that for any fix/feature/mod the docs have been updated, the registry is regenerated via `pnpm registry`, package version has been bumped if applicable, and the build passes cleanly (`pnpm check && pnpm build`).

### Adding a class to the system

1. **Put it in the partial that owns its layer.** The layer is the file, not a
   label you choose:

   | File | Layer |
   |:---|:---|
   | `_00_tokens.sass`, `_01_config.sass` | L0 tokens |
   | `_02_dimensions.sass` | L1 dimensions |
   | `_03_containers.sass` | L2 containers |
   | `_04_layouts.sass` | L3 layouts |
   | `_05_shells.sass` | L4 shells |
   | `_06_visuals.sass`, `_07_interactions.sass` | L5 visuals |
   | `_08_own.sass` | **not the system** — third-party overrides only |

2. **Document it on the selector line.** A trailing `// …` comment becomes the
   description in `registry.json`, `REGISTRY.md`, and the skill reference an
   agent greps. Without it the class is indexed with a useless placeholder
   (`.foo component / container`) and an agent finding it learns nothing.

   ```sass
   .scroll-y // Vertical scroll inside a bounded height; needs an .h-*
   	overflow-y: auto
   ```

   The same works for `&.modifier` variants.

3. **Run `pnpm registry`.** Plain classes, `&.modifier` variants, and indented
   child classes are discovered automatically. It rewrites `REGISTRY.md`,
   `docs/REGISTRY.md`, `registry.json`, `src/lib/themes.ts`, `src/lib/version.ts`,
   both `skills/fractal-styler/references/*.md`, and syncs `plugin.json`'s version.

4. **Loop-generated and wildcard families are invisible to the parser.** A class
   emitted by an `@each` (`.gap-*`, `.frame-16-9`) never appears as a literal
   selector line, so it needs a hand-written `addEntry(...)` in
   `scripts/update-registry.js` alongside the existing ones.

5. **Run `pnpm check`.** `validate-deck.js` compiles the SASS fresh, so no build
   step is needed first — but it means a class you have not actually defined
   will fail wherever a doc mentions it.

6. **Walk the surface pass below**, and add the class to the doc chapter that
   owns its layer. The validator checks that a documented class *exists*; only
   the table below catches a class that exists and is documented nowhere.

---

### The surface pass (fractalstyler)

Every substantive change to the system leaks into surfaces that describe it.
After any change to classes, tokens, the CLI, or the packaging story, walk all
of these before calling it done — the ones marked *generated* need only a
`pnpm registry`:

| Surface | What goes stale |
|:---|:---|
| `README.md` | The tagline, the quick start, the layer summary |
| `docs/01`–`14` | Whichever chapter owns the layer you touched; `14` for anything the package exports |
| `docs/specs/*` | The spec for whichever language moved — these are what a reviewer checks against |
| `docs/README.md`, root index tables | Chapter one-liners |
| `AGENTS.md` | How the project is described to agents |
| `skills/fractal-styler/SKILL.md` | The rules an agent is handed |
| `references/fractals.md`, `references/tokens.md` | *generated* |
| `REGISTRY.md`, `registry.json`, `version.ts` | *generated* |
| `src/lib/mcp/server.ts` | Tool descriptions, GUIDELINES, prompts |
| `src/lib/mcp/schemas/*.json`, `instructions.md` | Hand-copies of the tool defs — these ship to agent configs |
| `src/lib/cli.ts` | Usage banner and the post-init next steps |
| `package.json` / `plugin.json` | `description`, `keywords`, `exports` |
| `src/lib/styles/canonical-markups.md` | Shell structures, if L4 moved |

`pnpm check` runs `scripts/validate-deck.js`, which walks `docs/` (recursively —
`agents/` and `specs/` included), `skills/`, the components, and the MCP surface,
asserting six things mechanically:

1. **Class names** resolve against the *compiled stylesheet*, not `registry.json`.
   The registry carries wildcard families, and matching on those stems accepted
   `.radius-md` — a class that does not exist — everywhere it appeared.
2. **Links** resolve, and **anchors** match a real heading (GitHub's slug rules).
3. **Stated counts** match reality — token contract size, theme count.
4. **No phantom API**: nothing teaches the mixins that never shipped.
5. **No `>` combinators** in the stylesheet, one allowlisted exception.
6. **Framing**: the system is never described as SASS-only.

It still cannot catch a stale sentence — that is what the table is for.

**Two framing rules that keep getting broken:**

1. **This is a SASS system.** It ships as editable SASS,
   from one source.
2. **There are no authoring mixins.** `+stack`, `+surface`, `space()` and
   friends do not exist. If a surface teaches them, it is wrong.
3. **No child combinators.** `> *` and
   its relatives are forbidden; selectors are plain descendants, and anything that needs to
   be targeted precisely gets a name instead. Exactly one exception exists —
   the `.reel` snap rail — and it is allowlisted by literal match in
   `reserve/scripts/validate-deck.js`. Reach for a name, not a combinator.
- For any icons, use the package `fractalicons`, install it from [NPM](https://www.npmjs.com/package/fractalicons).
- Do not use local reference file paths for package dependencies in production configuration; always use the NPM sources.

> If you find yourself using styling not in `fractalstyler`, or using components not from `fractalsvelte-ui`, then either 1) you are being careless and non-compliant, or 2) you must notify the user for feature request(s) in those projects.
