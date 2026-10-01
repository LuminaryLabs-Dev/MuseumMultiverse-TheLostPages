# Lost Pages Product Architecture and Skill Map

Status: canonical Pass 6 handoff  
Evidence date: 2026-08-08  
Runtime baseline: committed `9e3d534`, NexusEngine `55b7f33`

## Product Outcome First

The deliverable is eight playable page experiences. Architecture, kits,
skills, simulator routes, and documentation count only when they directly
advance a named player path.

The first path is Page 01:

```text
confirm placement
  -> trace and lock the highlighted Direct route
  -> JR auto-runs
  -> press Jump at one generous crease
  -> miss once and recover locally
  -> finish and see a saved Gallery Key Fragment
```

Pass 7 proved that path in NexusEngine and in the actual mobile/desktop player
view. Pass 8 may now reuse it for Page 02, but framework expansion, room
decoration, and new host dependencies remain deferred.

## Current Evidence and Disposition

| Current surface | Evidence | Pass 6 disposition |
|---|---|---|
| Page 01 Character Map services | Browser-free local DSKs expose map, character, unfold, goal, snapshot, and reset. | Reuse the deterministic maze/map data; adapt, do not delete, the current manual-swipe path. |
| Pages 02-08 runtime | `src/ar/runtime/session.js` composes generic NexusEngine objective/target kits. | Preserve as compatibility while new player slices replace behavior additively. |
| `objective-flow-kit` | Linear action counter with no Pass 5 phase, command, checkpoint, restore, or hero contract. | Reuse only on untouched compatibility routes; not final gameplay authority. |
| `micro-platformer-kit` | Forwards Jump/Enter into interaction targets; it owns no runner physics. | Do not treat as the shared runner. Replace only where the new slice consumes it. |
| `collectible-kit` and current progress service | Store unversioned arrays through browser-local storage; Page 08 currently requires eight. | Preserve old data, but put the final semantic ledger behind an injected storage port. |
| NexusEngine replay/snapshot APIs | Package root exports `createReplayRunner`, `assertReplayDeterministic`, and snapshot helpers. | Reuse directly for proof. Do not invent or import unexported scenario facades. |
| Three.js and AR surfaces | Three.js 0.184 and NexusEngine AR/placement APIs are installed and active. | Keep them as Lost Pages presentation/host adapters. |
| A-Frame | Not installed; no installed Codex A-Frame skill; no current player gate requires it. | Deferred. Add only if Pass 9 device evidence proves the existing host cannot meet placement/recovery. |

The 2026-08-08 production build passes and exports 22 routes. Its current main
chunk is 776.15 kB minified / 209.42 kB gzip. That is a baseline, not proof of
the final game.

## Minimal Product Composition

Only three new renderer-neutral owners are cleared for the Page 01 slice:

1. **Lost Pages Gameplay** — phases, command validation, hero selection,
   feedback, page-plan state, checkpoints, recovery, replay, and orchestration.
2. **Auto Runner** — fixed-tick route movement, grounded state, Jump buffer,
   collision, landing, miss, and runner snapshot.
3. **Journey Progress** — versioned page records, injected persistence,
   idempotent reward slots, migration, corruption isolation, and Page 08
   eligibility.

Page-specific rules are authored pure data/reducers injected into Lost Pages
Gameplay. They are not eight competing runtimes or eight new DSKs.

```text
authored page definition
  -> Lost Pages Gameplay
       -> Auto Runner
       -> Journey Progress
  -> semantic player/render descriptors
       -> simulator player adapter
       -> DOM/canvas/Three.js adapter
       -> AR host adapter later
```

The coordinator is allowed to call the other two services. Auto Runner and
Journey Progress never import each other or the coordinator. Adapters consume
snapshots and dispatch semantic commands; they never decide outcomes.

## DSK Contract Map

| Module / domain id | Owned meaning and state | Inputs | Outputs | Reset / snapshot | Dependencies | Proof and promotion | Forbidden imports |
|---|---|---|---|---|---|---|---|
| Lost Pages Gameplay / `n:lost-pages-gameplay` | Primary phase, transient mode, revision, accepted page plan, objective, hero descriptor, feedback, checkpoint bundle, misses/help, completion state. | Pass 5 Command envelope, authored page reducer, runner facts, journey results. | CommandResult, semantic events, player descriptor, composite snapshot. | Route reset preserves receipts; replay clears attempt state; load restores exact phase/tick. | `n:auto-runner`, `n:journey-progress`, optional existing map data service. | Pages 01-02 isolated/integrated/replay/player proof with distinct route reducers; local reusable owner. | DOM, canvas, SVG, Three.js, camera, WebXR, localStorage, wall clock, timers. |
| Auto Runner / `n:auto-runner` | Fixed tick, route edge, position/velocity, grounded, buffered Jump, collision, landing, miss, safe/final stop. | Authored route descriptor and beat ids, `jump.press`, integer ticks, pause/resume, restore. | `jump.buffered`, `landed`, authored checkpoint/hazard ids, `missed`, `safe-stop`, `final-stop`; runner snapshot. | Initial, checkpoint, exact load, route reset. | Serializable route data only. | Pages 01-02 arc/collision/miss/restore replay fixtures; local reusable owner. | Renderer objects, input devices, audio, storage, wall clock, host transform. |
| Journey Progress / `n:journey-progress` | Schema version, independent page records, reward slots 1-8, pending write, migration result, Page 08 eligibility. | Semantic page/checkpoint record, completion request, storage-port result, reset confirmation. | Validated record, persistence result, existing/new receipt, exact missing pages. | Route reset is a no-op for rewards; confirmed all-reset clears; snapshot excludes provider objects. | Injected storage port and fixed reward registry. | Pages 01-02 memory/localStorage, migration, failure, duplicate, slot-preservation, and seven-ready/eight-complete fixtures; local reusable owner. | `window`, localStorage, filesystem, network, renderer, camera, gameplay timing. |
| Existing Character Map family | Deterministic 11x11 maze and current manual-map compatibility behavior. | Seed, map queries, current swipe/unfold commands. | Serializable map/goal snapshots. | Existing reset/snapshot, with missing composite load noted. | Current Page 01 local kits. | Reuse map data in Page 01; current manual route remains compatibility until final route proves parity. | No new presentation or save ownership. |

Promotion outside this repository is not authorized. Two distinct page slices
now provide the minimum local reuse evidence, but the current product outcome
is Pages 03-08. Any later NexusEngine/ProtoKit proposal remains a separate,
explicitly approved action and may not write another repository from this lane.

## App-Owned Adapter Map

| Adapter | Owns | Must not own | First proof |
|---|---|---|---|
| Semantic input | Touch, pointer, keyboard, switch order, DOM target to Command envelope. | Eligibility, phase changes, reward, physics. | Equal command results for pointer and keyboard. |
| Player shell | One objective, one hero target, feedback, progress, `More` disclosure, focus. | Domain transitions or duplicate reset logic. | 390x844 and desktop Page 01-02 paths. |
| Greybox renderer | JR, route, safe/hazard/checkpoint/goal shapes from descriptors. | Collision, landing, completion, object eligibility. | Effects-off screenshot still communicates roles. |
| Storage provider | Read/write/remove serialized records and report exact success/failure. | Migration, receipt identity, eligibility, reset policy. | Memory and localStorage provider parity. |
| Simulator player adapter | Deterministic placement confirm, fixed seed/tick controls, scenario state, digest. | Alternate gameplay state or proof-only completion shortcuts. | Same kit graph and snapshot as runtime. |
| Three.js/canvas/SVG adapter | Camera, meshes, batching, materials, disposal, resize, animation presentation. | Gameplay truth or host tracking policy. | Visual descriptors match domain ids/transforms. |
| Physical AR host | Support detection, anchor/hit test, tracking pause, Re-place, host transform. | Canonical route coordinates, checkpoint, reward, or failure. | Pass 9 direct-device wall/table/floor checks. |

## Canonical 3D Frame and Placement

Gameplay uses one right-handed local frame:

- `+X` is route progress;
- `+Y` is world-up and Jump height;
- `-Z` is camera/host forward;
- origin is checkpoint zero at JR's foot contact;
- gameplay units are normalized and converted once through the host's uniform
  scale; domain physics never reads physical room scale.

Each renderable record declares `sourceFrame`, local transform, semantic pivot,
local bounds, support anchor, facing, and gameplay role. JR's pivot is at the
feet. A platform's support anchor is its top-center. A wall landmark declares a
back-plane mount anchor. Conversion occurs once at the asset/host boundary;
render, collision, interaction, and proof must use the same resulting record.

Host mapping is a rigid transform plus uniform scale:

| Host family | Canonical mapping |
|---|---|
| Simulator/fallback | Identity route frame; camera begins at `+Z` and looks toward `-Z`. |
| Wall | `+X` follows wall-right, `+Y` follows gravity-up, `+Z` follows the wall normal toward the player. |
| Tabletop/floor | `+X` follows route tangent, `+Y` follows gravity-up, `-Z` follows route depth away from the player. |

Placement acceptance requires finite local/world bounds, correct origin and
pivot, contact error within 5 mm after physical scaling, no unintended
penetration, a non-overlapping route/safe-stop envelope, and visible landmark
framing from the declared camera. These checks use `object-placement-it` plus
the coordinate, pivot, bounds, and surface-contact specialists in Pass 9.

## A-Frame Decision

Disposition: **keep separate / deferred**.

A-Frame would add another entity, renderer, lifecycle, and bundle surface while
the current stack already has Three.js, NexusEngine AR support, and an app-owned
host seam. It is not needed to prove gameplay. Pass 9 may reopen the decision
only if an actual supported-phone test shows the existing host cannot provide:

- stable wall/table/floor hit testing and anchors;
- tracking-loss pause and Re-place;
- the canonical rigid transform and scale;
- accessible DOM hero controls alongside WebXR;
- the declared performance floor.

If selected later, A-Frame is only an app-owned physical-host/renderer adapter.
It consumes the same descriptors and dispatches the same commands; it cannot
own phase, movement, checkpoint, save, reward, or simulator behavior. Adding it
is a major dependency decision and requires explicit approval.

## Runtime Composition and Lifecycle

| Order | Create / run | Reset / teardown |
|---:|---|---|
| 1 | Load authored page definition and validate closed ids. | Release authored reference only. |
| 2 | Create Journey Progress with memory or localStorage port. | Route reset preserves it; all-reset is separately confirmed. |
| 3 | Create Auto Runner with fixed tick and shared tuning. | Stop tick; clear attempt runner state. |
| 4 | Create Lost Pages Gameplay with page reducer plus the two service APIs. | Reset attempt; retain journey receipts. |
| 5 | Mount one host, input adapter, player shell, and renderer. | Remove listeners, cancel render work, dispose renderer assets. |
| 6 | Bind simulator/replay only on simulator/debug routes. | Drop proof adapter; never mutate through a bypass. |

Tick order is input commands, gameplay validation, runner fixed step, runner
facts, gameplay reconciliation, journey write result, then descriptor render.
Save and renderer work do not run inside the fixed physics step.

## Pinned Greybox Budgets

| Concern | Pass 7 budget |
|---|---|
| Player interaction | Ack <=100 ms; accepted/rejected meaning <=250 ms; recovery <=2 s. |
| Domain time | Fixed 60 Hz integer tick; simulation p95 <=4 ms on the reference player device. |
| Render time | 60 fps target; sustained >=30 fps floor; no semantic cue dropped before decoration. |
| Bundle | Current 209.42 kB gzip JS is the baseline; Page 01 additions keep the direct-route total <=225 kB gzip or introduce route-level splitting. |
| CSS | Current 10.38 kB gzip baseline; direct player additions keep total <=13 kB gzip. |
| Greybox scene | No new image/model dependency; <=80 draw calls; Page 01's 121 cells are batched/instanced or canvas-rendered. |
| Active simulation | <=32 active colliders/route bodies; authored descriptor count is not a quality gate. |
| Pixel ratio | Cap gameplay WebGL at 1.5 on the reference mobile profile. |
| Allocation | No new mesh, material, texture, or DOM listener allocation per fixed tick/render frame. |

The three current 2.7-3.3 MB PNG assets are recorded Pass 10/11 load risks;
they do not justify delaying the Page 01 interaction slice.

## Existing Skill Architecture

All selected skills already exist. They are invoked one bounded chain at a
time; they are not an agent swarm and do not become product dependencies.

### Four temporal orchestrators

| Orchestrator | Activation | Output / gate | Disposition |
|---|---|---|---|
| `nexus-goal-matrix-control-it` | Pass boundary or one matrix transition. | One eligible row, one evidence decision, one next action. | reuse |
| `game-it` | One player-visible implementation slice. | Running player outcome with rules, failure, and human proof aligned. | reuse |
| `human-view-orchestrator` | One bounded player-review batch after runtime proof. | Human-view pass/partial/fail and smallest visible repair. | reuse |
| `release-readiness-scout` | Pass 12 candidate audit only. | Packaging/launch blockers; no release action by itself. | reuse |

Only one is the active outcome owner at a time. `pass-orchestrator` remains an
optional execution route, not a fifth owner, because matrix control plus
`game-it` already cover the current sequence and slice.

### Six middle routes

| Route | Concern | Gate | Disposition |
|---|---|---|---|
| `nexus-goal-route-it` | Select one high-leverage unblocked row. | Exact input, output, owner, and acceptance gate. | reuse |
| `dsk-map-it` | Separate reusable rules from runtime/adapter/host/proof. | No glue promoted as domain meaning. | reuse |
| `runtime-kit-graph-it` | Creation, tick, reset, teardown, and proof composition. | Acyclic inspectable graph; no proof bypass. | reuse |
| `player-space-compose-it` | Player-relative frame, route, landmark, and reserved volumes. | Ordinary player view reads spawn, path, stop, and goal. | reuse in Pass 9; no room dressing in Pass 7 |
| `nexus-goal-harness-bind-it` | Bind one simulator run to one matrix row. | Immutable scope/revision/input/output/gate binding. | reuse |
| `asset-pipeline-gate-it` | Gate final GLB/texture use. | Proven catalog, fallback, disposal, rights, budget, and human view. | reuse in Pass 10 |

### Fourteen atomic specialists

| Specialist | Bounded responsibility | Gate | Disposition |
|---|---|---|---|
| `architecture-dsk-contract-it` | Audit one DSK owner/state/input/output/reset/snapshot boundary. | No browser/renderer/host responsibility in the domain. | reuse |
| `kit-domain-service-specialist-it` | Build or audit one selected service boundary. | API, tokens, serializable state, reset, snapshot, isolated/integrated proof. | reuse |
| `human-interaction-contract-it` | Preserve actions while enforcing hero/context/advanced hierarchy. | Capability parity and normal pointer/keyboard proof. | reuse |
| `add-it` | Add the smallest missing layer without narrowing stable behavior. | Existing behavior plus new player outcome both pass. | reuse |
| `simulate-it` | Predict and adversarially review the intended rule sequence. | Stable prediction with assumptions and unverified runtime labeled. | reuse |
| `nexus-simulator-game-proof-it` | Deterministic same-kit rules proof. | Declared kits/seed/ticks/scenarios/snapshots/digests pass. | reuse |
| `playwright-it` | Direct visible player interaction and screenshots. | Named mobile/desktop goal and zero blocking errors. | reuse |
| `object-placement-it` | Place one mesh-backed object from normalized descriptor. | Contact, containment, overlap, clearance, and context review. | reuse in Pass 9/10 |
| `mesh-coordinate-frame-it` | Normalize handedness, axes, forward, and units once. | Known origin/up/forward/world point. | reuse |
| `mesh-origin-pivot-it` | Fix semantic pivot and attachment/support anchors. | Rotation/scale proof keeps intended point fixed. | reuse |
| `mesh-bounds-it` | Measure local and transformed bounds. | Finite bounds and visible known reference. | reuse |
| `mesh-surface-contact-it` | Mount/ground against an explicit plane. | Contact and penetration numbers plus low-side view. | reuse |
| `performance-render-budget-it` | Turn visible render risks into measurable caps. | Profiled frame/player moments and downgrade path. | reuse |
| `nexus-goal-evidence-it` | Match artifacts to one matrix acceptance gate. | Observed/weak/missing/contradictory evidence decision. | reuse |

### Skill-it / Bop-it disposition

```text
Goal: eight complete player experiences
Outcome owner: one temporal orchestrator above
Route: one middle concern above
Specialist: one atomic operation above
Gate: one matrix validation cell
Disposition: reuse
Mutation authority: not-required
```

No evidence-backed skill gap exists. `skill-graph-assembler` stops because
there is no approved mutation packet. `orchestration-game-series-it` remains
separate because it owns disposable experiments. `release-it` remains separate
because it requires a `Test/<NewApp>` move that is invalid for this repository.
No skill is added, refined, merged, retired, or materialized.

## Pass 7 Product Slice

Status: complete 2026-08-08. Pass 7 did not build a framework; it made Page 01
play correctly and stopped at the declared product gate.

Implementation order:

1. Add the three renderer-neutral owners only as Page 01 needs them.
2. Derive a short highlighted Direct route from the existing deterministic map.
3. Bind route trace/undo/lock, auto-run, one crease Jump, one deliberate miss,
   checkpoint recovery, final claim, and idempotent saved receipt.
4. Replace the Page 01 simulator's equal-weight Reset with the one-hero player
   shell; keep Reset under `More`.
5. Prove normal, invalid, miss, third-miss Help, pause/restore, reward, replay,
   route reset, save migration, and identical-input determinism.
6. Play the direct simulator path at 390x844 and desktop; require the visible
   Gallery Key Fragment panel and clear recovery.
7. Only after Page 01 passes, expose the same primitives for Page 02.

Pass 7 may touch the Page 01 simulator/player seam and the exact shared domain
owners it consumes. It may not implement Pages 02-08, add A-Frame, replace
final art, rebuild the reader, create skills, or expand into a general editor.

## Pass 8 Page 02 Reuse

Status: complete 2026-08-08 for the Page 02 slice; Pass 8 remains active.

Page 02 adds one authored definition with a closed Bridge/Step/Gate reducer,
serializable living-frame SVG descriptors, page copy, beat ids, and slot-2
reward metadata. The three existing owners remain authoritative. The simulator
adapter now selects one of two explicit page factories and the player view
branches only on `character-map` versus `living-frame`; there is no selector,
editor, fourth domain owner, dependency, or physical-host change. Nexus replay,
Page 01 regression, mobile/desktop player proof, and the 23-route build pass.

## Deferred Work

- all-page simulator selector until individual Pass 8 page slices prove need;
- Pages 03-08 adapters until each preceding bounded slice is proven;
- physical wall/table/floor host work until Pass 9;
- A-Frame unless direct-device evidence reopens it;
- object-density/world dressing and final assets until Pass 10;
- generalized editor, authoring UI, telemetry platform, or skill mutation;
- external NexusEngine/ProtoKit promotion without separate approval and proof.

This deferral list prevents workspace and tooling completeness from replacing
the application outcome.
