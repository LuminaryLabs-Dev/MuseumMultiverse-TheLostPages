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
- Confirm root, launcher, print, book, and phone paths all show the expected shared booklet/print reader surface.
- Validate representative experience landing pages and debug routes.
- Confirm the paper background and fallback behavior on representative browsers.
- Keep DOM text, controls, and QR output readable.
- Do not reintroduce cursor glow, stripe backgrounds, rounded-card page styling, or book metaphors inside launched experiences.
- Decide the final `/book/` treatment: compatibility/legacy, redirect to `/print/`, hide from public navigation/static export, or remove.

## Recently Implemented, Not Yet Validated

- Single default booklet/print reader surface for public non-experience paths.
- Flat glossy flipbook styling.
- Cover-turn-first treatment.
- Vertical deck/page flip motion.
- Consistent experience launch landing page.
- Local service kit scaffolding.
- NexusRealtime game mounting for launcher/print surfaces.
- Composition check script in the build path.
- Tabletop/paper visual treatment, grounded shadows, no pointer-following glow, and first-pass opening/settling transition.

## State Intelligence Sync This Turn

- Selected Mode 2 — State Intelligence Sync.
- Confirmed open PR search returned no open PRs targeting `main` before work.
- Confirmed `agent/scheduled-turn-lock.md` was `completed`, not active.
- Reconciled active feedback and feedback inbox entries that still described print-first tabletop/booklet direction as only pending implementation.
- Updated product docs to say the shared booklet/print reader and first-pass physical presentation are source-backed but not validation-complete.
- Kept feedback active and unprocessed because build, browser, deployed-route, phone/device, paper fallback, and AR launch validation are still pending.
- Did not edit `src/`, `print/`, `scripts/`, or `.github/`.
- Did not move `agent/pointer.md`; it remains on `prompts/004-ar-route-check.md` because route QA is still not command/browser/device complete.

## AR Route Source Evidence

- `src/app/routes/router.js` strips the configured base path, normalizes trailing slashes, then checks `/debug/ar/<slug>/`, `/ar/<slug>/`, and `?page=<slug>` before returning the default print/booklet route.
- `src/main.js` renders `experience-debug` routes with `renderDebugExperience()`, valid `experience` routes with `renderImmersiveRoute()`, and all remaining routes with `renderBookletSurface()`.
- `src/ar/registry/experiences.js` imports and registers the eight expected experience modules.
- `src/data/pages.js` derives page data from the registry and builds QR targets as `/ar/<slug>/` under `resolvePublicOrigin()`.
- `src/lib/origin.js` uses `VITE_PUBLIC_ORIGIN` when configured and otherwise suppresses loopback QR origins.
- `src/app/routes/basePath.js` strips Vite base paths before route matching and re-adds base paths for static assets.
- `scripts/export-static-routes.mjs` exports `launcher`, `book`, `print`, `ar`, `phone`, every `ar/<slug>`, and every `debug/ar/<slug>` route from the registry after `dist/index.html` exists.
- `.github/workflows/deploy-lost-pages.yml` sets `VITE_BASE_PATH` and `VITE_PUBLIC_ORIGIN`, then runs `npm install` and `npm run build` before deploying Pages.
- Source-inspection risk: unknown or misspelled AR slugs currently produce a route object with no matching experience and then fall through to the booklet surface in `src/main.js`; no dedicated invalid-slug route was evidenced.

## Validation Boundary

- Source and documentation state were inspected through the GitHub connector.
- Build, dependency installation, lockfile regeneration, browser preview, deployed route checks, phone checks, camera/WebXR checks, and AR launch testing were not run here.
- No app/source files were changed in this State Intelligence Sync turn.
- No feedback moved to processed because validation evidence is still missing.

## Recommended Next Turn

Run dependency hygiene and QA in a network-enabled repo checkout or CI runner: `npm install`, regenerate and commit `package-lock.json`, run `npm run check:composition`, run `npm run build`, preview root, launcher, print, book, phone, one representative `/ar/<slug>/` route, one representative `/debug/ar/<slug>/` route, and one intentionally invalid `/ar/<bad-slug>/` route, then process feedback only after evidence passes.
