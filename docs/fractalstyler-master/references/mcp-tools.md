# Fractalstyler MCP Tools

An interactive co-pilot over stdio: class search, token lookup, intent guidance and a rules dump, without reading the registry by hand. It lives at `mcp/server.ts` in the Fractalstyler package and ships as the `fractalstyler-mcp` bin. Everything below was observed by running the server; re-verify after an update.

## Configuring It

```json
{
  "mcpServers": {
    "fractalstyler": {
      "command": "npx",
      "args": ["-y", "@fractaldesign/fractalstyler", "mcp"]
    }
  }
}
```

Working against the local package instead of the published one - which is what Question 1 in `beginning-fractalstyler.md` decides - point at the source:

```json
{
  "mcpServers": {
    "fractalstyler": {
      "command": "node",
      "args": ["/Users/amrit/fractaldesign/packages/fractalstyler/mcp/server.ts"]
    }
  }
}
```

Needs Node 22.18+. No arguments, no port, no state: it reads `registry.json` from its own package at startup, so the same freshness caveat as the linter applies - an old installed package answers with an old registry.

If it is not configured, nothing here is lost: `registry.md`, `tokens.md` and these skill references carry the same information, and reading them is the fallback.

## Tools

| Tool | Arguments | What it returns |
|:---|:---|:---|
| `guide_styling` | `intent`, optional `context` | A curated layer guide (spacing, typography, containers, cards, controls, surfaces, principles) with the classes for that intent |
| `search_classes` | `query`, optional `layer`, `limit` | Registry rows - class, property, description, example markup |
| `get_tokens` | optional `scale` (`space`/`typography`/`radius`/`shadow`/…) | A scale's steps, token names and an `approxPx` table |
| `snap_to_tokens` | `gap`, `padding`, `fontSize`, `radius` in px | Nearest step, the `var(--…)` and the class(es) for each |
| `css_to_classes` | a CSS declaration string | A composed class string, plus which declarations it could not map |
| `lint_markup` | a markup snippet | `{ passed, diagnostics, totalClassesChecked }` |
| `get_system_rules` | - | The closed-world rules, layer cascade and progressive discovery index as markdown |

Prompts: `design_component` (plan a new component in composition classes) and `audit_markup` (review a snippet for contract compliance). Resources: `fractalstyler://registry`, `fractalstyler://tokens`, `fractalstyler://rules`.

## Where It Earns Its Place

- Mid-composition lookup. `search_classes "gap"` or `"card"` is faster and cheaper than loading `classes.md` when you need one answer, and it returns the real `property` line so you can see what the class does.
- Orienting in an unfamiliar layer. `guide_styling "responsive card grid"` beats guessing which reference to open.
- Translating a design spec. A handoff that says "16px gap, 24px padding, 8px radius" becomes `gap-bs pad-lg radius-md` in one `snap_to_tokens` call.
- Quoting the rules verbatim. `get_system_rules` is the system's own statement of the closed-world law - useful when you need to show a user why you refused an inline style.

## Verified Limits

Treat these as current behaviour, and prefer the registry over the server whenever an answer matters:

- `snap_to_tokens` snaps against a hardcoded `approxPx` table, not the live ladders. Observed: `fontSize: 18` → `bs`, `24` → `xl`, `32` → `2xl`; but the real `--text-bs` is `0.95rem` (15.2px), `--text-lg` is `1.12rem` (17.9px) and `--text-2xl` is `1.54rem` (24.6px), so those three land a rung low. Radius shows the same drift (`6` → `sm`, `12` → `md`, `16` → `bs`, against a real ladder of `xs 2 / sm 3 / md 6 / bs 12 / lg 16`). Use it for the shape of an answer, then confirm the step in `tokens.md`. For conversion work this matters twice over: the numbers you are snapping from are usually Tailwind's, whose ladder is also not Fractalstyler's - see `migration.md` Phase 2.
- `lint_markup` currently checks nothing. On four different snippets containing a real unknown class and an inline `style=`, it returned `passed: true` with `totalClassesChecked: 0`. Do not use it as a gate. Use the CLI linter (`contract-lint.md`), which does flag those same inputs correctly.
- `css_to_classes` guesses intent. `display: flex; align-items: center` came back as `.box.xcenter` (column) with no comment on the choice; a `background: #ffffff` was reported unmapped rather than resolved to a role. Read its output as a first draft and pick the container yourself.
- Fuzzy suggestions are string distance, not advice. Both the server and the CLI will offer near-miss names; verify each in the registry before using it.

## Working Rule

Ask the server to *find* things; use the files to *decide*. Any class, token or step the server proposes that you are about to write into markup gets checked against the resolved `registry.md` - same rule as everywhere else in this skill.

Related: `./contract-lint.md` for verification, `./variables.md` for the authoritative ladders, `./classes.md` and `./components.md` for composition.
