# Lost Pages Current State

Status: historical snapshot; superseded for current-state claims

## Reconciliation notice — 2026-09-22

The August snapshot below remains historical evidence. Current source baseline is
`a0cc7c3`; working-tree changes are not all committed. The shared Three.js museum
runtime loads eight page scenes but has proximity completion without persistent
rewards, checkpoints or complete page-specific games. Pages 01–02 simulator
prototypes remain a separate path. A load smoke is not completion proof.

See [reconciliation baseline](../agent/reports/reconciliation-baseline.md) for
the current implementation pass, source inventory, proof corrections and remaining
work. Joystick versus auto-run is awaiting clarification before gameplay migration.
The earlier claims below about current deployment, assets and next page are stale.

Snapshot date: 2026-08-08
Committed revision: `9e3d534c7f456ee3eb5cb1f29ecc25f0b8632c62`

This is the canonical dated snapshot of what Lost Pages currently is. It keeps
implemented behavior, validated behavior, unverified behavior, historical
systems, and proposed direction separate.

## Executive State

Lost Pages is a public Vite/Three.js AR companion magazine with eight registered
QR routes, matching desktop debug routes, a shared comic-page reader, and two
complete local NexusEngine greybox player slices. Page 01 traces and runs the
Character Map to a saved Gallery Key Fragment. Page 02 matches Bridge, Step,
and Gate into a visible living-frame route, auto-runs, recovers, Jumps, enters a
grounded portal, and saves the Breathing Frame Mark. Pages 03-08 still have
authored copy, placement descriptors, objectives, rewards, and small debug
loops rather than complete games. The public GitHub Pages deployment remains
on committed baseline `9e3d534`; both player slices are local and uncommitted.
Physical AR and the final eight-page journey are not complete.

## Evidence Summary

| Area | Current evidence | Classification |
|---|---|---|
| Git | Local `main`, `origin/main`, and `HEAD` match at `9e3d534`. | Verified |
| History | 322 commits from 2026-06-24 through 2026-07-10. | Verified |
| Build | Local working tree build passes, exports 23 routes, and produces 223.60 kB gzip JS / 12.99 kB gzip CSS. | Verified local |
| Dependency | `nexusengine@0.0.3` resolves to commit `55b7f33`. | Verified |
| Public deploy | Latest Pages workflow for `9e3d534` completed successfully. | Verified |
| Public routes | Root, Page 01 AR, and Page 02 debug samples return HTTP 200. | Verified samples |
| Public QR origin | Deployed Page 02 debug route points to the GitHub Pages AR URL. | Verified sample |
| Reader | Desktop and 390x844 launch screenshots show the active card-stack reader. | Verified samples |
| Page 01 | Direct simulator completes placement, five-point route trace, auto-run, one miss/recovery, Jump, claim, and saved receipt. | Verified local player slice |
| Simulator | `npm run proof:page01` passes deterministic replay, invalid/stale inputs, Help, pause/restore, save failure, migration, and idempotence. | Verified local rules |
| Player view | Playwright completes the 390x844 path and verifies desktop reward layout with zero console errors. | Verified local UX |
| Page 02 | Direct simulator completes placement, three socket changes, built route, one miss/recovery, Jump, grounded portal entry, and saved slot-2 receipt. | Verified local player slice |
| Page 02 proof | `npm run proof:page02` passes deterministic replay, invalid/repeated/stale/unsafe no-mutation, pause/restore, save failure, and slots 1-2 replay safety. | Verified local rules |
| Pages 03-08 | Manifests and generic debug runtime exist. | Source-backed only |
| Physical AR | Phone camera, WebXR, real surfaces, tracking drift, and safe placement. | Unverified |
| Final journey | Shared platforming, cross-page progression, and final portal completion. | Proposed/incomplete |

## Active Route Surface

The production build exports:

- `/`
- `/launcher/`
- `/print/`
- `/book/`
- `/phone/`
- eight `/ar/<slug>/` routes
- eight `/debug/ar/<slug>/` routes
- `/sim/ar/sleeping-gallery/`
- `/sim/ar/frame-that-breathes/`

Root, launcher, print, book, and phone currently enter the same shared
card-stack reader. `/book/` is a compatibility route, not a separately validated
canonical product. Each AR route has a launch surface; each debug route exposes
desktop controls and a fallback preview.

## Eight-Page Implementation Matrix

| Page | Slug | Current mechanic | Scene objects | Fresh proof | Current gap |
|---:|---|---|---:|---|---|
| 01 | `sleeping-gallery` | Trace Direct route, auto-run, Jump, recover, claim saved fragment. | 125 | Full local simulator and mobile/desktop player proof | Final duration/pacing, physical wall AR, tracking recovery, and final art remain open. |
| 02 | `frame-that-breathes` | Match Bridge/Step/Gate, lock visible route, auto-run, Jump/recover, enter grounded portal, save mark. | 4 | Full local simulator and mobile/desktop player proof | Final duration/pacing, physical wall AR, tracking recovery, and final art remain open. |
| 03 | `lost-childs-sketchbook` | Place page, catch three sketches, reveal memory. | 4 | Source only | No deterministic moving-platform course or completion proof. |
| 04 | `curators-warning` | Place warning, restore four words, read warning. | 5 | Source only | No word-built route, traversal, or recovery proof. |
| 05 | `tiny-platformer-diorama` | Place course, jump three hazards, enter gate. | 5 | Source only | A tiny click demo, not the planned picture-frame platformer. |
| 06 | `in-between-exhibit` | Place board, sort four artifacts, stabilize. | 5 | Source only | No artifact-built lanes, validated zones, or traversal. |
| 07 | `monster-behind-canvas` | Place canvas, pulse three symbols, lock canvas. | 4 | Source only | No light-built route, exposure simulation, or recovery. |
| 08 | `secret-portal-room` | Place portal, light eight sockets, unlock it. | 9 | Source only | Current data requires eight rewards even though Page 08 creates the eighth; final contract requires seven prior receipts. |

Object counts are declared `sceneRecipe.objects` counts. Room geometry and
runtime-generated presentation objects are not included.

## Architecture Truth

Current:

- Vite owns the static browser application and route export.
- Three.js owns active 3D presentation.
- NexusEngine is pinned in both package manifest and lockfile.
- Lost Pages owns story, routes, QR data, authored descriptors, print/page
  composition, and host/render adapters.
- Local services and kit wrappers exist under `src/domains/` and `src/kits/`.
- Pages 01 and 02 are the current references for deterministic domain state
  with host-owned canvas/SVG/AR presentation.
- Both local player slices compose renderer-neutral `n:auto-runner`,
  `n:journey-progress`, and `n:lost-pages-gameplay` services with app-owned
  storage, simulator, canvas/SVG, semantic-input, and player-shell adapters.

Not current:

- NexusRealtime is not an installed or imported runtime dependency.
- A-Frame is not installed.
- No inspected current source proves WebXR plane detection, hit-test placement,
  environment depth, or scene-mesh placement.
- The provisional five-orchestrator skill graph has not created or promoted
  runtime skills.

## Asset Truth

Current:

- Page 01 uses a dedicated local Sleeping Gallery reference image in the active
  paper page builder.
- The app bundles cover art, QR output, a notebook GLB, one MM_GDoC frame GLB,
  and several MM_GDoC textures.
- The active reader can generate comic textures for pages without dedicated
  source art.

Incomplete:

- `public/assets/comic-pages/` is explicitly a placeholder asset area.
- Pages 02-08 do not have verified final key art in the active page builder.
- Staged MM_GDoC models/textures are not proven as optimized, attributed,
  collision-ready gameplay assets.
- Final visual identity, material roles, lighting, and semantic silhouettes
  remain future passes.

Known copy drift: the Page 01 runtime is The Character Map, while its print
Markdown still describes the superseded Sleeping Gallery five-frame
interaction. The final target now selects the Character Map route-building
contract; print and runtime implementation alignment remains a matrix gap.

## Validation Truth

Freshly run on 2026-08-08:

- `npm ls --depth=0`
- `npm run build`
- static route inventory
- desktop reader launch and screenshot
- mobile-sized reader launch, scroll, and screenshot
- Page 01 debug launch and screenshot
- Page 02 debug completion
- Page 02 public debug launch at 390x844
- `npm run proof:page01`: identical-input NexusEngine replay, invalid/stale
  no-mutation, 60-tick recovery, third-miss Help, exact pause/restore,
  save-before-reward failure, idempotent replay/reset, migration, Page 08 gate,
  Jump buffer/coyote grace, and 0.0089 ms runner p95
- Page 01 direct simulator Playwright completion at 390x844: placement, route
  trace, visible Jump, one miss/recovery, final claim, persisted named reward,
  predictable hero focus, and Reset under closed `More`
- Page 01 desktop reward layout at 1440x900
- `npm run proof:page02`: identical-input NexusEngine replay, closed glyph
  order, invalid/repeated/stale/unsafe/airborne no-mutation, 60-tick recovery,
  exact pause/restore, save-before-reward failure, and slots 1-2 replay safety
- Page 02 direct simulator Playwright completion at 390x844: placement, three
  visible socket changes, built route, recovery, keyboard Jump, grounded portal
  entry, named slot-2 reward, next action, and Reset under closed `More`
- Page 02 desktop reward layout at 1440x900
- zero browser console errors across the final Page 01 and Page 02 paths
- sampled public route HTTP checks
- latest GitHub Pages workflow inspection

Build warnings that remain open:

- The local production JavaScript bundle is 825.15 kB / 223.60 kB gzip and exceeds
  Vite's default chunk warning threshold.
- The local CSS bundle is 58.54 kB / 12.99 kB gzip, within the pinned 13 kB
  Page 01 ceiling with almost no remaining headroom.
- NexusEngine headless-editor imports cause Vite to externalize `node:fs/promises`
  and `node:path` for browser compatibility.

Not freshly proven:

- all eight debug loops to completion
- Pages 03-08 simulator routes, deterministic replay, failure, recovery, and
  reset scenarios
- real phone camera permission
- WebXR session entry
- real wall, tabletop, and floor placement
- tracking loss and recovery
- accessibility and reduced-motion parity
- lower-end device performance
- five-minute content duration per experience
- complete cross-page save and finale behavior

Fresh Page 01 and Page 02 simulator/player evidence is recorded in
`agent/reports/2026-08-08-page01-player-slice-proof.md` and
`agent/reports/2026-08-08-page02-player-slice-proof.md`. The earlier partial
baseline remains at `agent/reports/2026-08-08-simulator-player-baseline.md`.

## Local Environment Boundary

The ignored `.env.local` contains a `VITE_PUBLIC_ORIGIN` host for an expired
Cloudflare tunnel. Local production builds therefore render QR targets for that
dead host unless the environment value is changed or unset. The committed
GitHub Pages workflow overrides it with the correct GitHub Pages origin, so the
sampled deployed QR target is correct.

The ignored environment file is user-local and was not edited during this
truth pass.

## Documentation Authority

Use these sources in order:

1. Current source, package lock, build output, and runtime proof for behavior.
2. `docs/CURRENT-STATE.md` for the latest dated implementation snapshot.
3. `CHANGELOG.md` for reconstructed product history.
4. Root `goal.md` for the active mission and ordered pass status.
5. `docs/DOCUMENTATION-MAP.md` for documentation authority.
6. Tracked `agent/` for active execution, pointer, workflow, and feedback state.
7. `.agent/` for preserved provisional picture-frame discovery only.

The overlapping agent-tree claims were reconciled during Pass 2: `.agent/` is
an archive and tracked `agent/` is the active execution surface.

## Final Target, Not Current Behavior

The canonical target is `docs/FINAL-PRODUCT-GOAL.md`:

- Twelve ordered full-project passes from truth cleanup through release.
- An additive all-eight NexusEngine testing space using direct routes, semantic
  inputs, deterministic replay, and separate Playwright player-view proof.
- One simple primitive interaction grammar shared across all eight pages.
- Complete greybox gameplay, failure, recovery, replay, and reward on every
  page.
- Shared auto-run plus one-button Jump, with one contextual action only at safe
  stops.
- Picture-frame platforming as the Page 05 hero experience, taught on Page 02
  and selectively remixed on Page 08.
- Physical surface families for wall, tabletop, and floor/pedestal scenes.
- Shared semantic saves and a receipt-driven Page 08 finale requiring seven
  prior receipts before Page 08 creates slot eight.
- Four to five orchestrators plus bounded middle and atomic skill support.
- Final art replacing generated and placeholder page imagery.

## Next Boundary

Pass 8 continues with the bounded Page 03 player slice in
`agent/prompts/015-page03-player-slice.md`. It must turn Glide, Lift, and Loop
into a deterministic moving-platform run with one Reveal Memory finish before
Page 04 or any all-page framework, A-Frame host, environment dressing, or final
assets.
