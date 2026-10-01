# Lost Pages QA and Acceptance

Status: supporting content scaffold

## Purpose

This document defines the evidence an auto agent should record before claiming a Lost Pages page, route, visual surface, or State Intelligence Sync is ready.

Gameplay proof follows `SIMULATOR-PLAYER-PROOF.md`. Physical QR scanning is not
the routine test harness.

Exact final player goals, duration bands, controls, failure/recovery behavior,
and release acceptance live in `FINAL-PRODUCT-GOAL.md`.

## Gameplay Proof Ladder

For every shared mechanic and page loop:

1. **Simulator proof** — compose the shipped domain kits, drive semantic inputs
   on a fixed seed/clock, and prove startup, normal play, failure, recovery,
   reset, snapshot, deterministic replay, reward, and completion.
2. **Player proof** — open the direct simulator or debug URL with Playwright,
   use the visible hero controls, and prove the player can understand every
   meaningful state change.
3. **Additive review** — if either layer is partial or failed, add the smallest
   missing interaction or feedback capability and rerun both layers. Limit one
   bounded batch to three cycles.

Simulator success cannot substitute for human-view acceptance. Environment
detail and object count cannot substitute for either layer.

## Route QA

For each slug:

- `/ar/<slug>/` opens the expected page.
- `/ar/<slug>/?debug=1` preserves debug behavior.
- `/debug/ar/<slug>/` opens desktop debug surface.
- Static export includes direct route folders.
- Launcher QR target points to intended public origin.

Use direct URLs for the gameplay path. QR destinations may be checked as data
and rendered output; do not require a physical QR scan during normal iteration.

## Page QA

For each page:

- Page title matches registry/copy/print docs.
- QR title matches page docs.
- Collectible/reward name matches shared reward slot.
- Page objective is visible.
- Completion state is clear.
- Replay/reopen behavior does not corrupt progress.

## Print QA

- QR is readable and not visually crowded.
- Body copy is legible at print size.
- Page number, title, scan prompt, and route intent are visible.
- Print copy and runtime copy are checked for drift.

## Print-view presentation QA

When the print view is implemented as the primary review/presentation surface, verify:

- `/print/` opens the intended primary review surface.
- `/book/` behavior matches the documented decision: removed, redirected, hidden, legacy, debug, or experimental.
- Background reads as a physical tabletop or surface rather than a dense digital grid.
- Page layout has grounded shadows.
- Reactivity is subtle and physical.
- Pointer-following glow is not present unless a later style decision restores it.
- Any physical book-opening transition does not block readability or QR review.

## State Sync QA

A State Intelligence Sync is valid when:

- active feedback is mirrored in inbox/log or intentionally noted as not mirrored
- docs distinguish pending direction from implemented behavior
- no implementation is claimed from docs-only changes
- no source/runtime/build files were changed unless explicitly requested
- processed feedback is not marked done unless implementation, rejection, or supersession is evidenced
- a future implementation turn is clearly recommended when needed

## Device proof language

Use these terms precisely:

- **Inspected** — code/docs were reviewed.
- **Built** — `npm run build` or equivalent was run.
- **Previewed** — local preview route was opened.
- **Desktop tested** — desktop browser route was tested.
- **Phone tested** — actual phone route was tested.
- **AR tested** — actual AR/camera/WebXR path was tested.

Do not use a stronger claim than the evidence supports.

## Acceptance standard for docs-only scaffolds

A docs-only batch is acceptable when it adds clear source-of-truth structure, does not claim runtime validation, and gives future agents enough paths, constraints, and page intent to build without inventing the project shape.
