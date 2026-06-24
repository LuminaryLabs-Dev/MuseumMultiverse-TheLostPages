# Lost Pages Technical Build Map

Status: supporting content scaffold

## Purpose

This document maps creative/page docs to the implementation files an auto agent should inspect or edit.

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

- `/launcher/` — phone-friendly entry.
- `/book/` — full composition/book view.
- `/print/` — print review.
- `/ar/<slug>/` — QR-launched AR route.
- `/ar/<slug>/?debug=1` — debug version of same route.
- `/debug/ar/<slug>/` — desktop debug route.

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
| `src/ar/runtime/session.js` | NexusRealtime-backed runtime adapter |

## Agent safety rules

- Do not change reusable AR/runtime architecture without checking whether the change belongs in NexusRealtime.
- Do not claim phone/WebXR/headset proof without actual device testing.
- Do not change slugs casually; slugs affect QR routes, static export, print docs, and progress.
- If a page doc changes a reward name or objective, update runtime copy and print copy in the same bounded batch.
