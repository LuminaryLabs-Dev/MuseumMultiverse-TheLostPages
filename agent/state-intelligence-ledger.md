# Lost Pages State Intelligence Ledger

Status: active
Last updated: 2026-06-26

## Current True State

- Root, launcher, print, book, and phone route entries resolve to the same shared booklet/print reader surface.
- Experience and debug routes remain separate.
- `src/app/routes/router.js` preserves `/ar/<slug>/`, `/ar/<slug>/?debug=1`, `/debug/ar/<slug>/`, and `?page=<slug>` before every other path falls through to `type: 'print'`.
- `src/main.js` renders the non-experience path through `renderBookletSurface()`, which calls `renderPrintMarkup()`.
- The route landing page for each experience is separate from the full 3D experience after launch.
- The booklet reader is one page at a time, with a title/opening beat and panel reveal controls.
- The booklet uses a flat glossy flipbook treatment with sharp page edges.
- The cover turns first, then active pages flip vertically through a small visible stack.
- Launcher and print surfaces create a NexusRealtime `createRealtimeGame()` instance.
- Local runtime kits install services for route mapping, paper surface mounting, booklet navigation, and panel sequence state.
- `package.json` is pinned to NexusRealtime commit `ebd19e298d71bfbc51bf452394085ce1d909cb94`.
- `package-lock.json` still needs regeneration because it references the older dependency target.
- Command-based dependency hygiene and QA remain blocked in connector-only runs that cannot execute `npm install`, regenerate lockfiles, run the composition check, run the build, or open browser/phone/AR routes.

## Mounted Local Services

```text
engine.n.routeQr
engine.n.paperSurface
engine.n.bookletReader
engine.n.comicPanel
```

## Local Domain Sources

```text
src/domains/route-qr/
src/domains/paper-surface/
src/domains/booklet-reader/
src/domains/comic-panel/
src/domains/progress/
src/domains/launch/
src/kits/
```

## Active Feedback Still Open

- Regenerate and commit `package-lock.json` for the pinned NexusRealtime commit.
- Run `npm run check:composition` and `npm run build`.
- Validate the booklet reader in browser preview.
- Confirm root, launcher, print, book, and phone paths all show the same booklet surface.
- Validate representative experience landing pages and debug routes.
- Confirm the paper background and fallback behavior on representative browsers.
- Keep DOM text, controls, and QR output readable.
- Do not reintroduce cursor glow, stripe backgrounds, rounded-card page styling, or book metaphors inside launched experiences.

## Recently Implemented

- Single default booklet surface for public non-experience paths.
- Flat glossy flipbook styling.
- Cover-turn-first treatment.
- Vertical deck/page flip motion.
- Consistent experience launch landing page.
- Local service kit scaffolding.
- NexusRealtime game mounting for launcher/print surfaces.
- Composition check script in the build path.

## Alignment Completed This Turn

- Reconciled docs that still described `/print/` and `/book/` as distinct public non-experience surfaces.
- Recorded the source-backed route fallback: all non-experience public entries render the shared booklet/print reader.
- Recorded the dependency mismatch between `package.json` and `package-lock.json`.
- Kept feedback active because build, browser, route, device, and experience validation were not run.

## QA / Validation Attempt This Turn

- Selected Mode 5 — QA / Validation.
- Confirmed open PR search returned no open PRs targeting `main`.
- Confirmed the scheduled-turn lock was not active before work.
- Inspected dependency and route source files through the GitHub connector.
- Confirmed the lockfile mismatch remains: `package.json` pins NexusRealtime commit `ebd19e298d71bfbc51bf452394085ce1d909cb94`, while `package-lock.json` still references `nexusrealtime` at `#0.0.1`.
- Confirmed route-source shape by inspection only: route code still preserves experience/debug/search-param paths before falling back to the shared booklet/print surface.
- Blocker: this run did not have a repo checkout and network-enabled command runner, so dependency install, lockfile regeneration, build, preview, phone, camera, WebXR, and AR checks were not run.
- Feedback remains active; do not move anything into processed feedback from this turn.

## Validation Boundary

- Source was inspected through the GitHub connector.
- Build, dependency installation, lockfile regeneration, browser preview, device testing, and experience testing were not run here.
- No app/source files were changed in this QA / Validation turn.

## Recommended Next Turn

Run dependency hygiene and QA in a network-enabled repo checkout or CI runner: `npm install`, regenerate and commit `package-lock.json`, run `npm run check:composition`, run `npm run build`, preview root, launcher, print, book, phone, one representative `/ar/<slug>/` route, and one representative `/debug/ar/<slug>/` route, then process feedback only after evidence passes.
