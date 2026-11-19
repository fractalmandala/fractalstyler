# Vendored packages

`node_modules` here is not an install artifact. It is the copy of Tailwind's compiler that makes
`scripts/untailwind` runnable from anywhere — a skill folder, a checkout, a global install, or a directory
with no `node_modules` above it — with no `npm install` step.

This is the **floor**, not the authority. `lib/deps.mts` looks for the target project's own `tailwindcss` v4
first, because a class means what *that* version's compiler says it means (`md:p-6` differs between releases).
The copy below answers only when the project has none, and the run report says which one spoke
(`# compiler: tailwindcss@<version> — the target project, …` / `the skill's shipped copy`). A project on
Tailwind v3 is refused outright rather than answered by this floor, because v3's utilities come from a
`tailwind.config` and a JS plugin pipeline this script does not implement.

| Package        | Version | Why it is here                                          |
| -------------- | ------- | ------------------------------------------------------- |
| `tailwindcss`  | 4.3.5   | `compile()` + `theme.css` + `utilities.css`: the dictionary |
| `postcss`      | 8.5.33  | parses the CSS the compiler emits                        |
| `source-map-js`| 1.2.2   | required by postcss at load time                         |
| `nanoid`       | 3.3.20  | required by postcss at load time                         |
| `picocolors`   | 1.1.1   | required by postcss at load time                         |

All five are MIT. Each keeps its own `LICENSE` and `package.json` inside its directory; `anchor.cjs` exists
only so `require()` from these scripts resolves into this folder rather than upward into the operating
system. Nothing is imported by a bare specifier from outside.

## Refreshing the copy

Copy the same packages out of any project that has them, keeping the flat `node_modules` layout:

```sh
VENDOR=<skill>/scripts/untailwind/vendor/node_modules
for p in tailwindcss postcss source-map-js nanoid picocolors; do
  rsync -a --delete node_modules/$p/ $VENDOR/$p/
done
```

Then run the script against a real file and check the numbers (`md:p-6` must stay `1.5rem`, `text-lg` must
stay `1.125rem / 1.75rem`). Do not hand-edit anything in this folder.
