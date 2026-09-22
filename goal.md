# Lost Pages Active Goal

Status: active

## Current execution — 2026-09-22

Execute the approved 20-phase cleanup and eight-page delivery plan. See
[reconciliation baseline](agent/reports/reconciliation-baseline.md).
Preservation and baseline are complete. Shared clock, input cancellation,
resource cleanup and proof corrections are being validated. Gameplay migration
awaits resolution of the conflicting joystick and auto-run specifications.
The twelve-pass sequence below is historical context, not the current checklist.

## Mission

Move Lost Pages from its current foundation to eight complete, cohesive, and
validated AR experiences through twelve ordered full-project passes.

## Final Player Outcome

A player scans one of eight printed pages, opens its public route, understands
one primary action, places a readable world, completes a short replayable
experience, receives persistent feedback or a reward, and advances toward the
Page 08 final portal.

## Execution Rule

Complete each pass across all eight pages, update the goal matrix and
changelog, validate the result from the human view, and only then advance to
the next pass. Within a pass, implement one bounded player-facing capability at
a time and integrate it with the whole.

## Product-Outcome Gate

The application—not its workspace, documentation, tooling, simulator, kit
inventory, or skill graph—is the deliverable. Supporting work is accepted only
when it has one named consumer in the current product path and one observable
player gate. A foundation task that does not unblock a page interaction is
deferred.

The first two implementation proofs are complete in direct player spaces:

```text
Page 01: trace and lock -> auto-run -> Jump/recovery -> saved fragment
Page 02: match Bridge/Step/Gate -> lock -> auto-run -> Jump/recovery ->
grounded portal entry -> saved mark
```

Pass 6 stopped after one minimal ownership/dependency map. Pass 7 implemented
and proved the Page 01 path without an all-page framework, A-Frame adoption,
skill creation, environment dressing, or general tooling. Pass 8 reused those
owners for the complete Page 02 slice and now advances one page at a time to
Page 03.

## Twelve Passes

| Pass | Goal | Completion evidence | Status |
|---:|---|---|---|
| 1 | Truth and History | Git-backed changelog reaches the current revision and current, historical, proposed, and unverified states are separated. | Complete 2026-08-08 |
| 2 | Documentation Cleanup | README, goals, docs, memory, and agent state have one authority per topic; superseded direction is retained as history. | Complete 2026-08-08 |
| 3 | Final Product Goal | The finished eight-page journey, gameplay, AR, art, accessibility, and release criteria are objectively testable. | Complete 2026-08-08 |
| 4 | Goal Matrix | Every final requirement is mapped by page to evidence, gap, dependency, next action, validation, and status. | Complete 2026-08-08 |
| 5 | Simple Gameplay Contract | Every page uses a readable primitive-action loop and first-screen hero-control hierarchy. | Complete 2026-08-08 |
| 6 | Architecture and Skill | App, domain, kit, renderer, host, orchestrator, middle-skill, and atomic-skill ownership no longer overlaps. | Complete 2026-08-08 |
| 7 | Shared Simulator and Greybox Foundation | One additive NexusEngine test space proves movement, placement intent, checkpoint, failure, recovery, feedback, reset, deterministic replay, and reward behavior with primitives. | Complete 2026-08-08 |
| 8 | Eight-Page Simulator Greybox | All eight experiences are playable from entry through completion in the direct simulator/player-proof space without final art. | In progress · Pages 01-02 proven |
| 9 | AR Host and Spatial Placement | Direct routes adapt the proven loops to intended wall, tabletop, or floor/pedestal scenes with guidance and recovery; physical QR scanning is not the gameplay harness. | Pending |
| 10 | Asset and Visual Identity | Placeholder imagery is replaced and important objects communicate their semantic roles. | Pending |
| 11 | Repeated Player Polish and Proof | Bounded simulator plus Playwright loops prove feedback, animation, audio, accessibility, performance, pacing, save, reset, and visible player outcomes. | Pending |
| 12 | Release and Handoff | Remaining matrix gaps are closed, public routes are verified, and another agent can reproduce and maintain the release. | Pending |

## Matrix Contract

The canonical matrix will use:

```text
Goal | Page | Final target | Current evidence | Gap | Dependency | Next action | Validation | Status
```

The active matrix lives in `docs/GOAL-MATRIX.md`.

Every gameplay row must name both proof layers when applicable:

```text
Nexus simulator scenario + direct-route Playwright player goal
```

The canonical validation strategy is `docs/SIMULATOR-PLAYER-PROOF.md`.

## Guardrails

- Preserve source and design history; remove only duplicates or clearly
  superseded active claims.
- Keep current implementation, validation, plans, and proposals labeled.
- Keep normal player controls to launch, placement, and the current objective;
  move reset, metrics, tuning, and debug controls to debug or advanced views.
- Keep reusable deterministic rules renderer-independent.
- Keep Three.js, DOM, canvas, camera, WebXR, storage, and lifecycle work in
  explicit app-owned adapters.
- Treat physical AR as unverified until tested on an actual supported device.
- Use direct simulator/debug routes instead of physical QR scans for routine
  gameplay iteration.
- Judge the interaction, feedback, recovery, completion, and UX hierarchy
  before environment detail or object density.
- Do not count workspace organization, abstractions, skills, harness features,
  or foundation modules as progress unless the current page outcome consumes
  them and its named proof advances.
- Use readable greybox primitives before committing to final assets.
- Review each bounded capability through simulator proof and Playwright player
  proof; add the smallest missing layer and rerun, with at most three cycles per
  batch.
- Do not deploy, publish, or send external notifications without the required
  explicit approval.

## Pass 3 Decisions

`docs/FINAL-PRODUCT-GOAL.md` resolves duration and difficulty, the shared
Plan-Run-Reward grammar, one-action-at-a-time controls, Page 02 teaching versus
Page 05 living-frame mastery, Page 08's seven-prior-receipt gate, the hidden
`/book/` compatibility alias, support/fallback tiers, accessibility, simulator
actions, player goals, and release evidence. Object count is a density
guideline, not a completion gate.

## Pass 4 Decisions

`docs/GOAL-MATRIX.md` is the canonical execution matrix. It contains 61 stable
rows: 29 shared outcomes and four outcomes for each of eight pages. Every row
has current evidence, a bounded gap, exact dependencies, a next action, a
validation path, and one controlled status. Pass 5 starts with the shared
interaction, feedback, recovery, and save rows before architecture or source
implementation.

## Pass 5 Decisions

`docs/SIMPLE-GAMEPLAY-CONTRACT.md` owns the exact interaction semantics. All
pages use eight primary phases, one active hero descriptor, fixed-tick
auto-run, Jump/context mutual exclusion, local checkpoint recovery, optional
third-miss Help, save-before-reward, idempotent receipts, and identity-based
Page 08 eligibility. Renderers and hosts may present these rules but may not
reinterpret them.

## Pass 6 Decisions

`docs/ARCHITECTURE-SKILL-MAP.md` clears three renderer-neutral owners—Lost
Pages Gameplay, Auto Runner, and Journey Progress—plus explicit app adapters.
The first implementation is Page 01 only. A-Frame, all-page frameworks,
environment work, skill mutation, and external-kit promotion remain deferred
until a player-visible gate proves need.

## Pass 7 Decisions

The direct Page 01 simulator now plays the actual product slice: confirm wall
placement, trace five highlighted Direct-route points, lock the route, watch JR
auto-run, miss and recover at the crease checkpoint, clear it with one Jump,
and claim a visibly saved `gallery-key-fragment`. Lost Pages Gameplay, Auto
Runner, and Journey Progress exist only because this path consumes them.
`npm run proof:page01` proves deterministic replay, invalid-input immutability,
third-miss Help, pause/restore, save-before-reward, migration, and receipt
idempotence. Playwright proves the complete path at 390x844 and the reward
state at desktop with zero console errors. That proof established the bounded
page-definition seam consumed next by Page 02; it did not create an all-page
framework.

## Pass 8 Progress

Page 02 now confirms wall placement, matches the closed Bridge/Step/Gate order,
shows each socket and the built living-frame route, locks it into the shared
Auto Runner, recovers locally after a miss, clears the frame gap with Jump,
requires a grounded final stop for `Enter Portal`, and saves
`breathing-frame-mark` in slot 2 before showing the Breathing Frame Mark.
`npm run proof:page02` proves invalid/repeated/stale/unsafe no-mutation,
deterministic replay, exact pause/restore, 60-tick recovery, save failure, and
slot-1/slot-2 reset/replay safety. Playwright proves the actual 390x844 path and
1440x900 reward view with zero console messages. The next bounded product slice
is Page 03; Pages 04-08, physical AR, final assets, and deployment remain out of
scope for that capsule.
