# 011 Simple Gameplay Contract

Status: completed 2026-08-08

## Goal

Complete Pass 5 by turning the shared `Plan -> Run -> Reward` grammar into one
renderer-neutral interaction contract that all eight pages can read, simulate,
present, save, recover, and replay.

## Inputs

- `goal.md`
- `docs/FINAL-PRODUCT-GOAL.md`
- `docs/GOAL-MATRIX.md`
- `docs/SIMULATOR-PLAYER-PROOF.md`
- all eight page packets

## Required Decisions

- exact phases and legal transitions;
- one semantic command envelope;
- one active hero-control selector;
- auto-run, Jump, grounded, and safe-stop invariants;
- contextual action eligibility and rejection;
- immediate, accepted, rejected, checkpoint, complete, and reward feedback;
- miss, two-second local rewind, third-miss Help, pause, restore, and replay;
- versioned per-page save and idempotent reward receipts;
- Page 08 readiness from seven earlier receipts and slot-eight award afterward;
- per-page verbs that extend the shared contract without adding movement input.

## Rules

- Keep normal movement to auto-run plus `Jump`.
- Expose a page action only at a safe stop; it must never compete with Jump.
- Keep reset, seed, metrics, scenario selection, and tuning in advanced/debug
  surfaces.
- Specify semantic outcomes, not renderer, camera, DOM, or Three.js ownership.
- Routine proof uses deterministic NexusEngine scenarios and direct-route
  Playwright player goals, never physical QR scans.
- Optimize for objective clarity, feedback, recovery, completion, and reward;
  do not use environment detail or object count as acceptance.

## Output

- `docs/SIMPLE-GAMEPLAY-CONTRACT.md`;
- an eight-page verb/phase table;
- transition and invariant audits;
- a simulation review of the contract;
- no application/source implementation.

## Completion

Every page can express a readable loop using the same phase, command, control,
feedback, recovery, save, and replay rules, with no ambiguous simultaneous
hero actions.
