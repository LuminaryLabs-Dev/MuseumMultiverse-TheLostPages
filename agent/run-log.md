# Run Log

## 2026-07-09

Completed:

- Pulled and merged 11 remote commits while preserving 2 local commits and the existing stash.
- Audited the live Lost Pages runtime against current NexusEngine `main` and its Domain Service Kit contract.
- Built the app and exported 21 static routes.
- Desktop-tested all eight debug routes through Find Surface and Place.
- Completed the Sleeping Gallery fallback loop through its reward state.
- Recorded the NexusEngine cutover, 100-300+ object target, DSK boundary, UX hierarchy, and recommended vertical-slice order.

Validation:

- `npm run build` passed.
- Eight-route Playwright sweep passed for desktop fallback placement and second-step progression.
- Phone, deployed QR origin, camera permission, WebXR, and real AR remain unverified.
- `npm ls --depth=0` reported the installed NexusRealtime commit does not match `package.json`.

Next:

- Implement the bounded NexusEngine parity cutover and DSK contract foundation before scaling Sleeping Gallery.

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

## 2026-07-10 Page 01 Character Map

Completed:

- Pulled Lost Pages, NexusEngine, NexusEngine-Kits, and NexusEngine-ProtoKits from origin before editing.
- Replaced the Page 01 five-frame interaction with a 121-region deterministic canvas maze, wall-first placement state, swipe character, maze-heart goal, and Gallery Key Fragment claim.
- Added six native local NexusEngine DSKs and the `engine.n.characterMap` composition API.
- Replaced active source imports and the package dependency with pinned NexusEngine commit `55b7f33f6d008b2e3b120e370f09b96ed73105e9` and regenerated the lockfile.

Validation:

- `npm run build` passed and exported 21 static routes.
- Playwright desktop debug completed find, place, unfold, deterministic solve, claim, and complete with zero console errors.
- Mobile-sized route reached the camera-first screen showing only `Find a wall` after launch when camera access was unavailable.
- Physical-phone camera and real wall-plane detection remain unproven.

Simulator and publication preparation:

- Added the native `n:ar-simulator` DSK and camera-free `/sim/ar/sleeping-gallery/` static route.
- Generated a seeded procedural room with a classified wall, map anchor, 18 room objects, and the shared 121-region Character Map.
- NexusSimulator `ar-simtime` passed Page 01 completion, 300-second content, and Gallery Key Fragment collection checks.
- Browser simulator proof passed find wall, place map, unfold, solve, and zero console errors.

## 2026-07-10 Continuous Card Stack

Completed:

- Replaced the single-visible-page enchanted turn with continuous card-stack descriptors.
- Kept three upcoming cards visibly offset behind the active page.
- Bounded wheel deltas, added continuous touch movement, delayed settling, disabled threshold flash, and widened mobile framing.

Validation:

- Descriptor probe confirmed four visible cards at rest and continuous front-card peel during partial progress.
- `npm run build` passed and exported 22 static routes.
- Playwright human-view screenshots passed at 1440x900 and 390x844 with zero console errors.

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
