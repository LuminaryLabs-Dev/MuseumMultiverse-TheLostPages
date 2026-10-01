# Lost Pages Changelog

Status: reconstructed through 2026-08-08

This changelog groups the repository's complete Git history into product phases.
Git remains the line-by-line ledger for all 322 commits; this file records the
meaningful product, architecture, presentation, and operating-system changes
that produced the current application.

## Evidence Cutoff

- First commit: `1e673af` on 2026-06-24.
- Current committed revision: `9e3d534` on 2026-07-10.
- Local `main` matches `origin/main` at that revision.
- The latest GitHub Pages workflow completed successfully from that revision.
- The public root and sampled direct AR/debug routes returned HTTP 200 on
  2026-08-08.
- The current checkout also contains an untracked `.agent/` discovery tree.
  That material post-dates the committed application and is provisional design
  history, not shipped runtime behavior.

## Status Language

- **Current** means present in the committed source at the evidence cutoff.
- **Validated** means the named check was run against the current revision.
- **Historical** means it was once implemented or documented but was replaced.
- **Proposed** means it exists only in planning or discovery records.
- **Unverified** means current evidence does not prove the claim.

## 2026-08-08 — Truth and History Pass

Current documentation work:

- Reconstructed the repository timeline from all 322 commits.
- Added `docs/CURRENT-STATE.md` as the dated active-truth snapshot.
- Separated committed application behavior from untracked provisional design.
- Confirmed that the production build passes and exports 22 static routes.
- Confirmed the installed dependency is NexusEngine commit `55b7f33`.
- Confirmed Page 01 declares 125 scene objects; Pages 02-08 declare 4-9 each.
- Completed the Page 02 debug loop from placement through portal completion.
- Confirmed the latest public Pages deployment was successful and its sampled
  QR destination uses the GitHub Pages origin.
- Recorded that ignored `.env.local` still names an expired Cloudflare tunnel;
  it affects local QR builds but is overridden by the Pages workflow.

No application, runtime, print, route, or deployment behavior changed in this
pass.

## 2026-08-08 — Documentation Cleanup and Proof Strategy

- Established root `goal.md` as the active twelve-pass program.
- Assigned one authority per topic in `docs/DOCUMENTATION-MAP.md`.
- Made tracked `agent/` the active execution surface and preserved `.agent/`
  as a provisional design-discovery archive.
- Replaced the stale Page 01 five-frame page packet with the current Character
  Map contract while retaining the print-copy mismatch as an explicit gap.
- Marked the June master source, June state ledger, NexusRealtime prompt, and
  older pointer chain as historical or superseded.
- Added `docs/SIMULATOR-PLAYER-PROOF.md`: routine gameplay uses an additive
  NexusEngine simulation space and direct-route Playwright player proof, not
  physical QR scanning.
- Ran a Page 01 deterministic completion/reset baseline and a 390-by-844
  Playwright player path. Domain proof passed; visible completion feedback was
  partial and is now a tracked additive fix.

No application, runtime, print, route, or deployment behavior changed in this
documentation pass.

## 2026-08-08 — Final Product Goal Pass

- Defined one shared `Plan -> Run -> Reward` grammar for all eight pages.
- Fixed JR to auto-run with `Jump` as the only motion hero control and one
  contextual action only at safe stops.
- Made Page 05 the full living-picture-frame platformer, with Page 02 as its
  teaching route and Page 08 as a short mastery remix.
- Defined duration, difficulty, failure, recovery, save, replay, accessibility,
  support, spatial-host, performance, art, and release targets.
- Corrected the final Page 08 contract to require seven prior receipts before
  creating its own eighth reward.
- Kept `/book/` as a hidden compatibility alias to the shared reader.
- Added semantic simulator actions and a direct-route Playwright player goal
  for every page.
- Simulated the final flow and found the one-action-at-a-time structure stable;
  final player-visible quality remains unverified until implementation.

No application behavior changed in this specification pass.

## 2026-08-08 — Goal Matrix Pass

- Converted the final product contract into 61 stable execution rows: 29
  shared outcomes and four outcome rows for each of eight pages.
- Recorded current evidence, gap, exact dependencies, bounded next action,
  validation, and status for every row.
- Mapped every final-specification section to matrix owners and fixed the Pass
  5 critical path around interaction, feedback, recovery, and save semantics.
- Validated unique row ids, nine-column shape, controlled statuses, exact
  dependency references, four rows per page, twelve pass rows, and all eight
  page contract counts.

No application behavior changed in this planning pass.

## 2026-08-08 — Simple Gameplay Contract Pass

- Defined eight shared primary phases and their only legal transitions.
- Defined one semantic command/result envelope and deterministic one-hero
  selector for touch, pointer, keyboard, switch, simulator, and replay input.
- Fixed Jump/context mutual exclusion, fixed-tick auto-run, local checkpoint
  recovery, optional third-miss Help, pause/restore, and reset/replay rules.
- Defined copy-on-write per-page saves, idempotent reward slots, persistence
  before celebration, and Page 08's seven-valid-receipt gate.
- Mapped all eight pages to the shared phases without adding free movement or
  new finale controls.
- Simulated eight normal paths and adversarial input/save/progression cases;
  specification consistency passed and runtime quality remains unverified.

No application behavior changed in this contract pass.

## 2026-08-08 — Product Architecture and Skill Pass

- Recentered architecture on the actual eight-page application outcome rather
  than workspace, tooling, or foundation completeness.
- Cleared three renderer-neutral owners only: Lost Pages Gameplay, Auto Runner,
  and Journey Progress; page rules remain authored pure configuration.
- Assigned all DOM/canvas/Three.js, input, storage provider, simulator, and AR
  host responsibilities to explicit app adapters.
- Defined one right-handed placement frame, host mappings, mesh pivot/bounds/
  contact rules, and measurable greybox performance budgets.
- Deferred A-Frame unless Pass 9 supported-phone evidence proves a need.
- Classified 4 temporal orchestrators, 6 middle routes, and 14 atomic existing
  skills as just-in-time reuse; no skill mutation or external repo work.
- Reduced Pass 7 to one Page 01 player path and a short context capsule.
- Rebuilt successfully: 22 routes, 209.42 kB gzip JS baseline.

No application behavior changed in this architecture pass.

## 2026-08-08 — Page 01 Player Slice

- Replaced the procedural-room `Find wall -> Place map -> Solve maze` simulator
  UI with the actual Page 01 product flow: place, trace five Direct-route
  points, lock, auto-run, Jump, local checkpoint recovery, claim, and saved
  reward.
- Added the Page 01-consumed renderer-neutral Lost Pages Gameplay, Auto Runner,
  and Journey Progress DSKs plus pure authored route configuration.
- Added injected local/memory storage ports, versioned Journey/Page records,
  legacy-array migration, idempotent reward slots, and the seven-receipt Page 08
  eligibility rule.
- Added a one-hero mobile/desktop player shell; Pause, Help, replay, and Reset
  Route remain under `More` and never compete with Jump.
- Added `npm run proof:page01` as the durable NexusEngine replay/rules gate.
- Kept Pages 02-08, physical AR, A-Frame, environment dressing, reader changes,
  final assets, skill mutation, and external repositories out of the pass.

Validation:

- `npm run proof:page01` passed deterministic identical-input replay,
  invalid/stale no-mutation, 60-tick recovery, third-miss Help, exact
  pause/restore, save-before-reward failure, idempotent replay/reset, legacy
  migration, missing-record repair, confirmed reset, Page 08 gating, Jump
  buffer, and coyote grace.
- Auto Runner measured 0.0089 ms p95 per fixed tick.
- Playwright completed the actual 390x844 player path with one deliberate miss,
  verified the 1440x900 reward view and persisted slot-1 receipt, and reported
  zero console errors.
- `npm run build` passed and exported 22 routes at 220.74 kB gzip JavaScript and
  12.99 kB gzip CSS, within the pinned Page 01 ceilings.

This work is local and uncommitted; the public Pages deployment remains on
committed baseline `9e3d534`.

## 2026-08-08 — Page 02 Player Slice

- Added one pure Page 02 authored definition for the closed Bridge, Step, Gate
  order, living-frame route geometry, player copy, beat ids, final portal
  command, Page 03 handoff, and slot-2 reward metadata.
- Reused Lost Pages Gameplay, Auto Runner, and Journey Progress without a new
  shared owner. Auto Runner now emits authored checkpoint/hazard ids; the
  coordinator consumes page-authored commands/copy instead of Page 01 strings.
- Added the direct `/sim/ar/frame-that-breathes/` route and a visible SVG
  greybox where each accepted glyph changes the built route.
- Added `npm run proof:page02` and preserved `npm run proof:page01` as a
  regression gate.
- Kept Pages 03-08, physical AR, A-Frame, final assets, environment dressing,
  skills, external repositories, deployment, and publication out of the slice.

Validation:

- `npm run proof:page02` passed identical Nexus replay, closed-order and
  invalid/repeated/stale/unsafe/airborne no-mutation, 60-tick recovery with
  glyph preservation, exact pause/restore, save-before-reward failure, and
  idempotent slots 1-2 reset/replay.
- `npm run proof:page01` remained green with 0.0089 ms runner p95.
- Playwright completed the direct 390x844 Page 02 path, captured the built
  frame and recovery, cleared with keyboard Space, entered the grounded portal,
  verified the saved Breathing Frame Mark and 1440x900 reward view, kept Reset
  under `More`, and reported zero console messages.
- `npm run build` passed and exported 23 routes at 223.60 kB gzip JavaScript and
  12.99 kB gzip CSS, within the pinned ceilings.

This work is local and uncommitted; the public Pages deployment remains on
committed baseline `9e3d534`. Pass 8 remains active and advances to Page 03.

## 2026-07-11 through 2026-08-08 — Provisional Design Discovery

Status: proposed, uncommitted, not implementation authority

- A local `.agent/` discovery tree grew to 124 files and roughly 31,000 lines.
- It explored picture-frame platforming, a shared eight-route platformer,
  surface placement, accessibility, progression, assets, validation, Domain
  Service Kits, orchestrators, middle-layer skills, and atomic skills.
- It retained hundreds of questions and 85 provisional decision batches.
- It explicitly prohibited application and runtime implementation during the
  discovery interview.
- No source file, installed dependency, public route, or deployed experience
  was changed by that discovery tree.
- The active project direction has now shifted from repeated design questions
  to twelve ordered, evidence-backed full-project passes.

## 2026-07-10 — NexusEngine Vertical Slice and Card-Stack Proof

Commit range: `09b927c` through `9e3d534` — 5 commits

- Replaced active NexusRealtime imports and dependency identity with pinned
  NexusEngine.
- Rebuilt Page 01 as the Character Map wall-maze vertical slice.
- Added 121 deterministic maze regions plus map, character, goal, and reward
  descriptors.
- Added local NexusEngine Domain Service Kit composition for map state,
  character movement, unfolding, goal, reset, and snapshots.
- Added `/sim/ar/sleeping-gallery/` for camera-free procedural-room proof.
- Reworked the public reader into a continuous visible card stack.
- Bounded motion-time rendering, improved card separation, and added runtime
  telemetry.
- Fit the active page to desktop and phone viewport proportions.
- Changed the outgoing page motion to fall down-left and toward the viewer.

Validation recorded at the time included the production build, Page 01 desktop
debug completion, simulator completion, browser screenshots, zero-console-error
checks, and card-motion performance proof. Physical AR remained unverified.

## 2026-07-07 through 2026-07-09 — Comic Art and Cover Iteration

Commit range: `2a868b2` through `73f2113` — 58 commits

- Iterated enchanted rail motion, edge treatments, and page-turn feedback.
- Replaced and repeatedly repaired the cover splash art delivery path.
- Moved the cover image from remote/payload experiments to a bundled local
  application asset.
- Centered pages and refined page composition.
- Added first-page and Page 02 visual iterations.
- Added a comic asset placeholder directory.
- Rendered initial generated comic page artwork and routed it through the paper
  page builder.
- Restored the high-resolution texture path after temporary experiments.

Current boundary: Page 01 has a dedicated local reference image in the active
page builder. The remaining pages still depend on generated or temporary comic
composition and therefore have an open asset-replacement requirement.

## 2026-07-02 through 2026-07-05 — Local Composition Services and QR Output

Commit range: `36c6d72` through `04d16de` — 58 commits

- Restricted normal AR launch to mobile and disabled the desktop launch action.
- Added local paper renderer, skinned-paper, page builder, mesh, rail movement,
  page pivot, and Lost Page composition services and kit wrappers.
- Moved page motion and texture creation behind reusable descriptors.
- Tested and then removed an early viewport-fit service before later solving
  viewport fit directly in the active rail implementation.
- Iterated fixed, spiral, mouse-driven, and S-curve rail models.
- Added centered page pivots and visual-origin handling.
- Replaced fake QR artwork with generated QR codes on the visible rail.

Historical experiments removed during this phase include temporary connector
checks, temporary runtime files, and the first viewport-fit wrapper.

## 2026-06-26 — Three.js Hub and Stable Rail Evolution

Commit range: `5277054` through `cb844ad` — 52 commits

- Simplified the initial cover/title transition.
- Added a Three.js page-frame surface.
- Replaced the non-AR booklet presentation with a Three.js portal hub.
- Reworked the hub into a vertical Bezier rail and then into the stable comic
  card rail used by the current app.
- Added comic-page shaders, page depth, paper response, and scroll motion.
- Tried embedded AR-route iframes as card contents, then moved to generated
  card pages and stabilized wheel forwarding and card input.
- Removed the portal swirl from the active presentation.

The portal hub, iframe-card path, and earlier rail models are historical
learning paths. They are not the current root presentation.

## 2026-06-25 — Print-First Presentation and Early Service Kits

Commit range: `3112bc8` through `511521f` — 110 commits

- Added scheduled bounded-turn rules, a run lock, and state ledgers.
- Split `/print/` and `/book/`, made print primary, and later routed all public
  non-AR entries through one shared reader surface.
- Added tabletop paper styling, grounded shadows, subtle tilt, and removed the
  pointer-following glow and striped background.
- Added a cached Three.js paper surface and fallback presentation.
- Added route QR, booklet navigation, comic panel, progress, paper, and launch
  domain services with local kit wrappers.
- Added the print composition check and placed it in the production build.
- Added a consistent AR landing page separate from the launched experience.
- Added a cover splash and began route/source QA.
- Recorded build, browser, phone, camera, and WebXR validation as incomplete
  where the available environment could not prove them.

The early kit work used NexusRealtime. That dependency path was superseded by
the NexusEngine cutover on 2026-07-10.

## 2026-06-24 — Repository Foundation

Commit range: `1e673af` through `2225cf1` — 39 commits

- Created the Vite browser application, eight experience manifests, print copy,
  QR helpers, AR/debug routes, assets, and initial proof images.
- Added the GitHub Pages build/deploy workflow and optional Discord
  notification sourced from `output.md`.
- Added the tracked `agent/` operating workspace, long-term goal, feedback
  records, pointer, workflows, run log, and change log.
- Added the first project, page, architecture, style, asset, QA, and traceability
  documentation set.
- Added static direct-route export for phone-openable Pages routes.
- Simplified the initial launcher into comic-book spreads.
- Established paper-like presentation and the print-first direction.
- Added State Intelligence Sync and Autonomous Bounded Turn workflows.

## Superseded Paths

| Historical path | Current truth |
|---|---|
| NexusRealtime runtime dependency | NexusEngine commit `55b7f33` is installed and imported. |
| Separate preferred `/book/` product | `/book/` is a compatibility route into the shared reader; final treatment remains open. |
| Portal swirl / portal hub | Stable card-stack rail is the active root surface. |
| Embedded iframe cards | Active pages use app-owned paper/card textures. |
| Remote cover payload loading | Cover art is bundled locally. |
| Threshold page switching | Current rail uses continuous wheel/touch progress and delayed settling. |
| Repeated discovery questions as execution | The twelve-pass goal matrix is the new execution direction. |

## Still Open at the Evidence Cutoff

- Pages 02-08 are small descriptor-driven demos, not full greybox experiences.
- Page 01 is the only 100-plus-object vertical slice.
- Physical phone camera, WebXR, wall/table/floor placement, and real AR are not
  freshly proven.
- A-Frame is not installed; Three.js and app-owned adapters render the current
  experience surfaces.
- Placeholder/generated art remains across the magazine.
- Shared platforming, checkpoints, failure, recovery, replay, cross-page save,
  and final-portal progression remain incomplete or proposed.
- Pages 02-08 still need the additive simulator/player proof surface defined by
  the active twelve-pass program.
