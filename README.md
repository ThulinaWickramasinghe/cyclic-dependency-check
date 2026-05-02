# cyclic-dependency-check

Small TypeScript demo for detecting **circular dependencies** with [madge](https://github.com/pahen/madge), runnable locally via npm scripts and on **pull requests to `main`** via GitHub Actions (with a PR comment summarizing the result).

## Prerequisites

- Node.js 20+ (matches the workflow)
- **[Graphviz](https://graphviz.org/)** on your `PATH` — required **only** for `deps:circular:graph`. Madge shells out to Graphviz (`gvpr`, etc.); without it you will see `spawn gvpr ENOENT`.

  - **macOS (Homebrew):** `brew install graphviz`
  - **Ubuntu / Debian:** `sudo apt-get install -y graphviz`
  - **Windows:** install from [graphviz.org](https://graphviz.org/download/) or `choco install graphviz` (Chocolatey)

## Setup

```bash
npm install
```

## Check for circular dependencies

Run Madge on everything under `src` using `tsconfig.json` for resolution:

```bash
npm run deps:circular
```

- **Exit code 0:** no cycles reported.
- **Exit code 1:** at least one cycle (this repo includes an intentional demo cycle under `src/demo/`).

Optional: write a dependency graph as SVG (needs Graphviz installed — see **Prerequisites**):

```bash
npm run deps:circular:graph
```

That creates `graph.svg` in the project root (add it to `.gitignore` if you do not want to commit it).

`npm run deps:circular` does **not** need Graphviz; only the image export does.

## Typecheck

```bash
npm run build
```

(`tsc --noEmit`)

## GitHub Actions

Workflow: [`.github/workflows/circular-dependencies.yml`](.github/workflows/circular-dependencies.yml).

On each pull request targeting **`main`**, it:

1. Runs `npm ci` and `npm run deps:circular` (via `npx madge` with the same flags as the npm script).
2. **Creates or updates** a single PR comment with the Madge output (search for the HTML comment marker `madge-circular-deps` in the workflow).
3. **Fails the job** if Madge exits non-zero so the PR stays red until cycles are removed.

**Fork PRs:** commenting needs permission for `GITHUB_TOKEN` to write to the pull request. On forked PRs, that may be blocked by repository settings unless you allow workflows from forks to receive write tokens (organization/repo policy).

## Demo cycle

The files `src/demo/cycle-a.ts`, `cycle-b.ts`, and `cycle-c.ts` form an **A → B → C → A** import cycle so you can see Madge output locally and in CI. Remove or refactor those imports to get a clean `deps:circular` run.
