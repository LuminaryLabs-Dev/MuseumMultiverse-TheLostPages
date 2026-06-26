# Lost Pages Technical Build Map

Status: supporting content scaffold
Last aligned: 2026-06-26

## Purpose

This document maps product docs to the implementation files an auto agent should inspect or edit.

## Source-of-truth chain

```text
docs/DNA.md
  -> docs/pages/PageXX-*/
  -> print/magazine-pages/XX-<slug>.md
  -> src/experiences/<slug>/copy.js
  -> src/experiences/<slug>/level.js
  -> src/experiences/<slug>/tuning.js
  -> src/experiences/<slug>/index.js
  -> src/ar/registry/experiences.js
  -> src/app/routes/router.js
  -> scripts/export-static-routes.mjs
```

## Current inspected route model

`src/app/routes/router.js` currently preserves the experience routes first, then sends every other public path to `type: 'print'`. `src/main.js` renders that print route through `renderBookletSurface()`, which calls `renderPrintMarkup()`.

| Path family | Current inspected behavior |
|---|---|
| `/` | Shared booklet/print reader surface. |
| `/launcher/` | Shared booklet/print reader surface. |
| `/print/` | Shared booklet/print reader surface. |
| `/book/` | Shared booklet/print reader surface, retained as a compatibility/static entry. |
| `/phone/` | Shared booklet/print reader surface. |
| `/ar/<slug>/` | Experience route. |
| `/ar/<slug>/?debug=1` | Experience debug route. |
| `/debug/ar/<slug>/` | Desktop debug route. |
| `?page=<slug>` | Legacy search-param route into an experience. |

`src/app/launcher/bookScene.js` still exists as legacy source, but it is not the current default public non-experience route path.

## Dependency state

`package.json` is pinned to a specific NexusRealtime commit. `package-lock.json` still references the older dependency target and needs regeneration before dependency hygiene is complete.

## Implementation areas

| Area | Use |
|---|---|
| `src/ar/registry/experiences.js` | active slugs and route generation |
| `src/experiences/<slug>/copy.js` | title, instructions, reward copy |
| `src/experiences/<slug>/level.js` | page-specific level data |
| `src/experiences/<slug>/tuning.js` | mechanic tuning |
| `src/experiences/<slug>/index.js` | page manifest export |
| `print/magazine-pages/` | print-facing copy |
| `scripts/export-static-routes.mjs` | direct static route export |
| `src/app/routes/router.js` | route resolution |
| `src/main.js` | top-level route rendering |
| `src/app/launcher/renderPrint.js` | shared booklet/print reader markup and code rendering |
| `src/app/launcher/cleanLauncher.css` | tabletop and paper-surface styling |
| `src/app/launcher/launcherMotion.js` | subtle physical motion |
| `src/app/launcher/bookScene.js` | legacy book implementation source |
| `src/ar/runtime/session.js` | NexusRealtime-backed runtime adapter |

## Agent safety rules

- Do not change reusable runtime architecture without checking whether the change belongs in NexusRealtime.
- Do not claim build, route, browser, device, or immersive proof without actual testing.
- Do not change slugs casually; slugs affect routes, static export, print docs, and progress.
- Do not treat active feedback as processed until implementation and validation evidence exist.
- During State Intelligence Sync turns, inspect implementation only for evidence and do not edit source files unless explicitly instructed.
