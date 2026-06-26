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
- Added a Three.js page-frame foundation pass for left/right page frames and overlay slots.
- Replaced the public non-AR booklet/page surface with a Three.js hub for launching eight AR experiences.
- Updated the Three.js hub from circular portals to a vertical Bezier rail of floating comic-page cards.
- Added softmax focus smoothing so the camera travels along the card rail instead of snapping between pages.
- Simplified the rail UI so the visible overlay is title-only.
- Moved the page number, title, prompt, collectible label, and launch callout onto the generated comic-page card textures.
- Rebalanced the Bezier rail, camera distance, card sizing, and card transform math so the active page is larger and nearby pages peel left/right/back instead of all facing the camera.
- Added a custom page shader for paper grain, edge darkening, glossy highlights, halftone shadowing, and scroll-responsive page curl.
- Added physical page side thickness, contact shadows, and raymarch-like portal glow plane behind the focused page.
- Added texture caching so generated comic-page textures are reused per slug.
- Added idle snap-to-page behavior so the rail settles after scrolling.
- Removed the portal swirl/glow plane from the rail scene.
- Added live embedded `/ar/<slug>/?embed=1` iframes as the visible page content over the 3D page cards.
- Kept the Three.js page frames/thickness/shadows behind the iframe pages so the rail still reads as physical 3D comic pages.
- Reduced camera movement so the camera barely drifts while cards shuffle in/out around center.
- Skipped splash/observers inside embedded iframe pages to avoid nested splash overlays.

Validation:

- GitHub source inspection only.
- `npm install` was not run.
- `npm run build` was not run.
- Browser behavior was not previewed in this environment.

Post-change audit:

- Improved: the public non-AR surface is now centered on one Three.js scene that launches eight AR experiences.
- Improved: the odd swirl effect has been removed.
- Improved: cards now show live page content via embedded route pages while remaining framed by Three.js geometry.
- Improved: camera movement is minimized; page cards perform the motion/shuffle.
- Still needs review: deployed browser behavior on desktop and phone.

Next:

- Run dependency hygiene and QA in an environment with a repo checkout and network access: `npm install`, commit the regenerated `package-lock.json`, run `npm run check:composition`, run `npm run build`, and preview root, launcher, print, book, phone, one `/ar/<slug>/`, and one `/debug/ar/<slug>/` route.
