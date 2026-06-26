# Run Log

## 2026-06-24

Completed:

- Added deploy output files, agent operating files, project docs, feedback files, route export work, launcher cleanup, subtle motion, paper page styling, and supporting content docs.

Next:

- Run `prompts/004-ar-route-check.md`.

Notes:

- The repo uses `agent/` as the active operating folder.
- Build and device QA were not run in this environment.

## 2026-06-25

Completed:

- Implemented State Intelligence Sync, Autonomous Bounded Turn, scheduled turn policy, and supporting state ledgers.
- Applied the print-first tabletop UI/navigation pass.
- Split `/print` from `/book`, then collapsed all public non-AR paths back into the booklet reader surface.
- Added cached Three.js paper background with precomputed albedo, normal, and depth maps.
- Removed the prior stripe-style background treatment.
- Pinned `nexusrealtime` in `package.json` to main commit `ebd19e298d71bfbc51bf452394085ce1d909cb94`.
- Added local service-kit scaffolding under `src/kits/`.
- Added local domain services under `src/domains/`.
- Added `src/data/bookletPanels.js` and `scripts/check-print-composition.mjs`.
- Reworked the public non-AR surface into a one-page comic booklet reader with title/opening beat, page controls, and panel reveal state.
- Added a flat glossy flipbook treatment with sharp page edges.
- Added cover-turn-first behavior and vertical deck/page flip motion.
- Wired launcher and print surfaces through a NexusRealtime `createRealtimeGame()` instance with local runtime kits and `engine.n.*` services.
- Updated the deploy workflow to use `npm install` while this dependency migration is pending lockfile regeneration.

Validation:

- Open PR search returned no open PRs before these source batches.
- Source files were inspected after update through the GitHub connector.
- Added `npm run check:composition` into the build path.
- Build and browser preview were not run from this connector environment.
- `package-lock.json` was not regenerated in this environment.

Post-change audit:

- Improved: root, launcher, print, and book routes now resolve to the same booklet reader path.
- Improved: title/opening state and panel reveal controls are driven by local services.
- Improved: route, paper surface, booklet reader, and panel sequence behavior now have local kit/service boundaries.
- Improved: flipbook motion is CSS transform/opacity based for performance.
- Still needs review: browser build, deployed route behavior, readability, animation timing, and lower-end fallback.
- Still needs follow-up: regenerate and commit `package-lock.json` in an environment with network access.

Next:

- Run `npm install`, `npm run check:composition`, `npm run build`, and browser checks.
- Regenerate and commit `package-lock.json` for the pinned NexusRealtime main commit.
- Validate root, launcher, print, book, one AR route, and one debug route.

## 2026-06-26

Completed:

- Ran State Intelligence Sync and QA/Validation source-inspection turns.
- Confirmed route source preserves AR/debug routes before the shared booklet fallback.
- Recorded dependency hygiene as blocked until network-enabled install/lockfile/build checks can run.
- Added a cover splash module that appears on app load and whenever the browser tab returns after being away.
- The cover splash remains visible for one second, then fades automatically without any click or confirmation step.
- Loaded the splash before the main app module from `index.html`.

Validation:

- GitHub source inspection only.
- `npm install` was not run.
- `npm run build` was not run.
- Browser resume behavior was not previewed in this environment.

Post-change audit:

- Improved: the cover now acts as a short passive re-entry/loading beat instead of requiring interaction.
- Improved: the splash overlay uses fixed positioning, opacity transitions, and pointer-events none so it does not block clicks after fade-out.
- Still needs review: deployed browser behavior on desktop and phone.

Next:

- Run dependency hygiene and QA in an environment with a repo checkout and network access: `npm install`, commit the regenerated `package-lock.json`, run `npm run check:composition`, run `npm run build`, and preview root, launcher, print, book, phone, one `/ar/<slug>/`, and one `/debug/ar/<slug>/` route.

### AR route source-inspection QA turn

Completed:

- Confirmed open PR search returned no open PRs targeting `main` before work.
- Confirmed `agent/scheduled-turn-lock.md` was not active before work.
- Inspected `src/app/routes/router.js`, `src/main.js`, `src/ar/registry/experiences.js`, `src/data/pages.js`, `src/lib/origin.js`, `src/app/routes/basePath.js`, `scripts/export-static-routes.mjs`, `package.json`, `package-lock.json`, and `.github/workflows/deploy-lost-pages.yml`.
- Source evidence: `/debug/ar/<slug>/`, `/ar/<slug>/`, `/ar/<slug>/?debug=1`, and `?page=<slug>` are matched before the default print/booklet fallback.
- Source evidence: the static export script writes `launcher`, `book`, `print`, `ar`, `phone`, every `ar/<slug>`, and every `debug/ar/<slug>` route from the registry.
- Source evidence: the registry currently imports eight experience modules and `src/data/pages.js` builds QR page URLs as `/ar/<slug>/` under the resolved public origin.
- Source evidence: the GitHub Pages workflow sets `VITE_BASE_PATH` and `VITE_PUBLIC_ORIGIN`, runs `npm install`, then runs `npm run build`.

Validation:

- Source inspection through the GitHub connector only.
- No app/source files were changed.
- `npm install` was not run.
- `npm run check:composition` was not run.
- `npm run build` was not run.
- Browser preview, deployed-route checks, phone checks, camera/WebXR checks, and AR launch checks were not run.

Post-change audit:

- Improved: route QA now has source-backed evidence for route parsing, QR route formation, static route export coverage, and deployment build intent.
- Still needs review: actual command build, deployed route status, browser behavior, phone behavior, and AR/camera/WebXR launch.
- Risk: unknown or misspelled AR slugs currently resolve to an experience route with no manifest, then fall through to the booklet surface rather than showing a dedicated not-found/error route.
- Feedback remains active; no feedback moved to processed because validation is inspection-only.

Next:

- In a network-enabled repo checkout or CI runner, run `npm install`, commit the regenerated `package-lock.json`, run `npm run check:composition`, run `npm run build`, then preview root, launcher, print, book, phone, one known `/ar/<slug>/`, one known `/debug/ar/<slug>/`, and one intentionally invalid `/ar/<bad-slug>/` route.

### Feedback status repair sync turn

Completed:

- Selected Mode 2 — State Intelligence Sync.
- Confirmed open PR search returned no open PRs targeting `main` before work.
- Confirmed `agent/scheduled-turn-lock.md` was completed, not active.
- Reconciled active feedback and feedback inbox status for the print-first tabletop/booklet implementation.
- Updated product docs to distinguish source-backed implementation from validation-complete or processed feedback.
- Kept `agent/pointer.md` unchanged on `prompts/004-ar-route-check.md` because command/browser/device route QA remains incomplete.

Validation:

- GitHub source/document inspection only.
- No `src/`, `print/`, `scripts/`, or `.github/` files changed.
- `npm install` was not run.
- `npm run check:composition` was not run.
- `npm run build` was not run.
- Browser preview, deployed-route checks, phone checks, camera/WebXR checks, and AR launch checks were not run.

Post-change audit:

- Improved: feedback and docs now say tabletop/booklet work is source-backed but still unvalidated.
- Improved: stale “not implemented” feedback status was corrected without moving feedback to processed.
- Still needs review: dependency lockfile, build, browser, deployed routes, phone, AR launch, paper fallback, and final `/book/` treatment.

Next:

- Run dependency hygiene and QA in a network-enabled repo checkout or CI runner: `npm install`, regenerate and commit `package-lock.json`, run `npm run check:composition`, run `npm run build`, then preview root, launcher, print, book, phone, one known `/ar/<slug>/`, one known `/debug/ar/<slug>/`, and one intentionally invalid `/ar/<bad-slug>/` route.
