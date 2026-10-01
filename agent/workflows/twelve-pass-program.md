# Twelve-Pass Program Workflow

Status: active

## Purpose

Move all eight Lost Pages experiences through the ordered passes in root
`goal.md` without returning to open-ended nudging, skipping foundational work,
or mistaking technical counters for player quality.

## Pass Loop

1. Read `goal.md`, `docs/CURRENT-STATE.md`, and
   `docs/DOCUMENTATION-MAP.md`.
2. Read the active pointer, feedback, dependency boundary, and relevant final
   specification or matrix rows.
3. Select one bounded capability inside the current pass.
4. Define its player outcome and observable completion evidence before editing.
5. Prefer additive modules, adapters, configuration, and proof surfaces that
   preserve existing behavior.
6. Implement or document the smallest coherent cross-page or page-specific
   batch.
7. For gameplay, run deterministic NexusEngine simulator proof and then direct
   route Playwright player proof as defined in
   `docs/SIMULATOR-PLAYER-PROOF.md`.
8. If partial or failed, add the smallest missing interaction or feedback layer
   and rerun both proofs. Stop after three cycles or one concrete blocker.
9. Update the matrix row, current pass evidence, changelog, run log, and pointer.
10. Advance only after the pass acceptance is complete across all eight pages.

## Player-Outcome Priority

Evaluate in this order:

1. objective comprehension;
2. hero-control clarity;
3. action-to-feedback meaning;
4. failure and recovery;
5. completion and reward;
6. replay and reset;
7. consistency, accessibility, and performance;
8. spatial host quality and final art.

Do not prioritize environment decoration, nominal object count, QR scanning,
or technical state volume over the interaction outcome.

## Boundaries

- Physical QR scanning is not the routine gameplay harness.
- Simulator proof validates rules; Playwright validates player-visible UX.
- Physical phone, camera, WebXR, and surface behavior remain separate host
  evidence and must be labeled when unverified.
- Do not remove or narrow active behavior during an additive pass without
  explicit approval.
- Do not publish, deploy, or notify without explicit current authority.

## Pass Closeout

A pass closes only when:

- every relevant page has a resolved matrix status;
- source and documentation describe the same active contract;
- required simulator and player proofs are recorded;
- known limitations are labeled rather than hidden;
- the changelog and active pointer identify the next pass.
