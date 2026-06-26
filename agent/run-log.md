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

- Ran one State Intelligence Sync turn to reconcile docs with current inspected source behavior.
- Confirmed there were no open PRs targeting `main` before the turn.
- Confirmed the scheduled-turn lock was not active.
- Inspected `package.json`, `package-lock.json`, `src/app/routes/router.js`, `src/main.js`, `src/app/launcher/renderPrint.js`, and `scripts/export-static-routes.mjs`.
- Aligned route docs around the current shared booklet/print reader fallback for root, launcher, print, book, and phone route entries.
- Recorded that `package.json` is pinned to the NexusRealtime commit while `package-lock.json` still needs regeneration.

Validation:

- Source inspection through the GitHub connector only.
- Build, dependency install, lockfile regeneration, browser preview, deployed-route checks, device checks, and experience runtime checks were not run.
- No app/source files were changed.

Post-change audit:

- Improved: README, technical map, master start source, and state ledger now describe the shared booklet/print route behavior consistently.
- Still needs review: actual build and preview proof for the shared booklet route and representative experience/debug routes.
- Still needs follow-up: regenerate and commit `package-lock.json` in a network-enabled environment.

Next:

- Run dependency hygiene and QA: `npm install`, regenerate `package-lock.json`, run `npm run check:composition`, run `npm run build`, and preview root, launcher, print, book, phone, and representative experience/debug routes.

### QA / Validation bounded turn

Completed:

- Confirmed there were no open PRs targeting `main` before work.
- Confirmed the scheduled-turn lock was not active.
- Inspected `package.json` and `package-lock.json`; dependency hygiene is still blocked because the lockfile still references `nexusrealtime` at `#0.0.1` while `package.json` pins `ebd19e298d71bfbc51bf452394085ce1d909cb94`.
- Inspected `src/app/routes/router.js` and `src/main.js`; route source still preserves `/ar/<slug>/`, `/ar/<slug>/?debug=1`, `/debug/ar/<slug>/`, and `?page=<slug>` before falling back to the shared booklet/print surface.
- Recorded that command-based QA could not be completed in this connector-only run.

Validation:

- GitHub source inspection only.
- `npm install` was not run.
- `package-lock.json` was not regenerated.
- `npm run check:composition` was not run.
- `npm run build` was not run.
- Browser preview, phone route checks, camera/WebXR, and AR testing were not run.

Post-change audit:

- Improved: the blocker is now explicitly recorded as a QA/dependency-runner blocker, not a product decision blocker.
- Still needs review: command validation in a network-enabled repo checkout or CI runner.
- Still needs follow-up: regenerate and commit `package-lock.json`, then run composition/build and representative route previews before processing active feedback.

Next:

- Run dependency hygiene and QA in an environment with a repo checkout and network access: `npm install`, commit the regenerated `package-lock.json`, run `npm run check:composition`, run `npm run build`, and preview root, launcher, print, book, phone, one `/ar/<slug>/`, and one `/debug/ar/<slug>/` route.
