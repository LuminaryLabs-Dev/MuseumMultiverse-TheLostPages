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

- `/launcher/` — phone-friendly entry that now promotes the print view as the primary non-AR review surface.
- `/print/` — primary non-AR tabletop print review/presentation surface. It is routed separately from `/book/` and rendered by `renderPrintMarkup()`.
- `/book/` — legacy composition-book/reference route. It is still directly available but de-emphasized in public navigation.
- `/ar/<slug>/` — QR-launched AR route.
- `/ar/<slug>/?debug=1` — debug version of same route.
- `/debug/ar/<slug>/` — desktop debug route.

Do not remove `/book/` from route assumptions until a later implementation explicitly deletes, redirects, or retires that route.

## Implemented route/navigation decision

The first print-first source pass chose this safe route treatment:

```text
/print/ = primary public review/presentation surface
/book/  = legacy composition-book route, kept available but de-emphasized
```

This avoids destructive route churn while still applying the active product feedback that the dedicated book view should no longer be the primary focus.

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
| `src/app/routes/router.js` | route resolution and public route behavior; `/print/` and `/book/` are now distinct route types |
| `src/app/launcher/renderPrint.js` | primary tabletop print review/presentation surface plus legacy book markup export |
| `src/app/launcher/renderLauncher.js` | launcher navigation and QR card layout; print view is the primary CTA |
| `src/app/launcher/cleanLauncher.css` | tabletop background, paper sheets, grounded shadows, first-pass opening transition, and no-glow surface styling |
| `src/app/launcher/launcherMotion.js` | subtle physical tilt/parallax without pointer-following glow variables |
| `src/app/launcher/bookScene.js` | legacy 3D book/composition route implementation |
| `src/app/launcher/pageTextures.js` | generated page textures used by the legacy book surface |
| `src/ar/runtime/session.js` | NexusRealtime-backed runtime adapter |

## Agent safety rules

- Do not change reusable AR/runtime architecture without checking whether the change belongs in NexusRealtime.
- Do not claim phone/WebXR/headset proof without actual device testing.
- Do not change slugs casually; slugs affect QR routes, static export, print docs, and progress.
- If a page doc changes a reward name or objective, update runtime copy and print copy in the same bounded batch.
- Do not treat active feedback as processed until source files and validation evidence exist.
- During State Intelligence Sync turns, inspect implementation only for evidence and do not edit source files unless explicitly instructed.
