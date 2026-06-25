# Lost Pages Technical Build Map

Status: supporting content scaffold

## Purpose

This document maps creative/page docs to the implementation files an auto agent should inspect or edit.

It should distinguish current implementation from active product direction. If active feedback changes product direction before source changes are made, describe that direction as pending rather than implemented.

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

## Route model

Current route families:

- `/launcher/` — phone-friendly entry.
- `/print/` — print review route; active direction says this should become the primary non-AR presentation/review surface.
- `/book/` — current composition-book/reference route; active direction says it is pending demotion, hiding, redirect, removal, or retention only as legacy/debug/experimental.
- `/ar/<slug>/` — QR-launched AR route.
- `/ar/<slug>/?debug=1` — debug version of same route.
- `/debug/ar/<slug>/` — desktop debug route.

Do not remove `/book/` from docs or route assumptions until source route behavior has actually changed.

## Pending route/navigation decision

Before implementation, decide one of:

```text
/book/ removed
/book/ redirects to /print/
/book/ hidden from public navigation but kept as debug/legacy
/book/ retained intentionally as an experimental composition route
```

The current State Intelligence Sync only records this direction. It does not implement it.

## Implementation areas

| Area | Use |
|---|---|
| `src/ar/registry/experiences.js` | active slugs and route generation |
| `src/experiences/<slug>/copy.js` | title, QR, instructions, reward copy |
| `src/experiences/<slug>/level.js` | page-specific level data |
| `src/experiences/<slug>/tuning.js` | mechanic tuning |
| `src/experiences/<slug>/index.js` | page manifest export |
| `print/magazine-pages/` | print-facing copy |
| `scripts/export-static-routes.mjs` | direct route export for GitHub Pages |
| `src/app/routes/router.js` | route resolution and public route behavior |
| `src/app/launcher/renderPrint.js` | print review/presentation surface |
| `src/app/launcher/bookScene.js` | current 3D book/composition route implementation |
| `src/app/launcher/pageTextures.js` | generated page textures used by print/book surfaces |
| `src/ar/runtime/session.js` | NexusRealtime-backed runtime adapter |

## Agent safety rules

- Do not change reusable AR/runtime architecture without checking whether the change belongs in NexusRealtime.
- Do not claim phone/WebXR/headset proof without actual device testing.
- Do not change slugs casually; slugs affect QR routes, static export, print docs, and progress.
- If a page doc changes a reward name or objective, update runtime copy and print copy in the same bounded batch.
- Do not treat active feedback as implemented until source files and validation evidence exist.
- During State Intelligence Sync turns, inspect implementation only for evidence and do not edit source files unless explicitly instructed.
