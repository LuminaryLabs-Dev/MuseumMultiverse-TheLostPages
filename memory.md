# Lost Pages Repository Memory

Status: active

## Purpose

Museum Multiverse: Lost Pages is an eight-page printed AR companion magazine.
Each page owns one QR route and one short experience that contributes to the
Page 08 final portal.

## Canonical Documents

- `goal.md` owns the active mission and twelve-pass status.
- `docs/CURRENT-STATE.md` owns the latest dated implementation snapshot.
- `CHANGELOG.md` and Git own project history.
- `docs/DOCUMENTATION-MAP.md` assigns documentation authority.
- `docs/FINAL-PRODUCT-GOAL.md` owns the final shared gameplay and eight page
  contracts.
- `docs/SIMPLE-GAMEPLAY-CONTRACT.md` owns exact phases, semantic commands,
  hero selection, feedback, recovery, save, reward, and replay rules.
- `docs/ARCHITECTURE-SKILL-MAP.md` owns product-facing domain/adapter
  boundaries, canonical placement coordinates, budgets, and skill routing.
- `docs/GOAL-MATRIX.md` owns execution evidence, gaps, dependencies, next
  actions, validation, and row status.
- `agent/` owns active execution, feedback, and operating state.
- `.agent/` preserves provisional picture-frame discovery and has no active
  implementation authority.

## Architecture

- The application is a static Vite browser app with eight registered AR routes,
  eight matching debug routes, a shared reader, and a Page 01 simulator.
- NexusEngine is the active pinned runtime dependency. Do not restore
  NexusRealtime imports, packages, or compatibility layers.
- Lost Pages owns story, copy, page manifests, QR behavior, routes, authored
  descriptors, print presentation, and explicit browser/render adapters.
- Reusable deterministic gameplay rules belong in NexusEngine Domain Service
  Kits or the ProtoKit path.
- Domain rules stay renderer-independent. Three.js, DOM, canvas, camera,
  WebXR, storage providers, GPU work, and lifecycle handling stay in adapters.
- A-Frame is not installed. If later selected, it must remain an optional
  app-owned host/renderer adapter rather than gameplay authority.
- A-Frame is deferred until Pass 9 and may be reconsidered only from direct
  supported-phone evidence that the current Three.js/NexusEngine host cannot
  meet placement and recovery. Adding it requires explicit approval.
- The first gameplay implementation has three renderer-neutral owners only:
  Lost Pages Gameplay, Auto Runner, and Journey Progress. Page 01 consumes all
  three in the direct simulator; page rules remain pure authored
  reducers/configuration, not eight runtimes.

## Product Conventions

- The experience registry is the source of truth for page slugs and route
  manifests.
- Each experience folder contains authored `copy.js`, `level.js`, `tuning.js`,
  and `index.js` data.
- Printed QR codes require a public HTTPS `VITE_PUBLIC_ORIGIN`; never publish
  localhost or expired-tunnel QR targets.
- Normal player UX exposes only the current hero action: launch, place, or the
  active objective. Debug, reset, tuning, and metrics belong in debug or
  advanced views.
- Greybox every complete gameplay loop with readable primitives before binding
  final assets.
- Every finished route needs clear entry, action, feedback, success, failure,
  recovery, replay, reward, and progression behavior.
- The shared final grammar is `Plan -> Run -> Reward`: JR auto-runs, `Jump` is
  the only motion hero control, and one contextual action appears only at safe
  stops.
- The eight primary phases are start, placement, plan, run, safe stop,
  complete, reward, and replay. Pause/recovery are transient and restore the
  exact canonical phase/tick.
- Jump and context are mutually exclusive. Rejected actions never mutate
  state; misses restore a local checkpoint within two seconds while preserving
  accepted plan state; the third miss exposes optional Help.
- Completion and its idempotent receipt persist before reward presentation.
  Route reset and replay preserve earned journey rewards.
- Page 05 is the full living-picture-frame platformer; Page 02 teaches its
  route-building language and Page 08 remixes a small subset.
- Page 08 requires the seven earlier reward receipts, then writes its own eighth
  reward only after final completion.
- Keep generated or placeholder art labeled until it is replaced and verified.

## Execution Convention

- Work through the twelve passes in `goal.md` in order.
- Finish a pass across all eight pages before advancing.
- Within a pass, implement one bounded user-facing capability at a time.
- Update pass status, the goal matrix, and the changelog from evidence.
- Preserve historical plans without letting them override current truth.
- The eight playable experiences are the deliverable. Tooling, skills, docs,
  simulators, and foundation code are supporting means and must name the
  current page outcome they unblock.
- Pass 7 proved Page 01. Pass 8 has now proved Page 02 with the same three
  owners and advances one consumed page at a time to Page 03; do not create an
  all-page framework ahead of the current player slice.
- Authored page definitions own closed plan targets, player copy, route/view
  descriptors, beat ids, final contextual command, next page, and reward
  metadata. Lost Pages Gameplay, Auto Runner, and Journey Progress remain the
  only renderer-neutral owners; canvas/SVG/DOM/AR remain app adapters.

## Validation Convention

- A build proves compilation and route export, not usability or AR.
- Routine gameplay proof uses the additive NexusEngine simulator space and
  direct simulator/debug URLs, not a physical QR scan.
- Simulator proof covers composition, fixed seed/clock, semantic inputs,
  failure, recovery, reset, snapshots, replay, and deterministic results.
- Playwright proof separately covers visible objective clarity, usable hero
  controls, feedback, recovery, completion, and reward comprehension.
- Iterate one bounded capability for at most three simulator/player review
  cycles; stop on a stable pass or one recorded blocker.
- Prioritize user feedback and interaction structure over environment detail,
  object count, or technical counters.
- Use browser launch, interaction, and screenshot proof for visible flows.
- Use an actual supported phone for phone-camera claims.
- Use a real AR session and physical surface for physical-AR claims.
- Keep simulator proof, desktop fallback proof, deployed-route proof, and
  physical-device proof distinct.
- Treat indirect or stale evidence as unverified.
- `npm run proof:page01` is the durable renderer-free Page 01 rules gate; the
  direct simulator at 390x844 plus desktop is its separate player-view gate.
- `npm run proof:page02` is the equivalent Page 02 gate and must also preserve
  the Page 01 receipt while writing slot 2 before reward presentation.
