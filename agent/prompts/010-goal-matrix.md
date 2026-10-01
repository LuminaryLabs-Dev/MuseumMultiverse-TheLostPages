# 010 Goal Matrix

Status: completed 2026-08-08

## Goal

Complete Pass 4 by mapping every final shared and page-specific requirement to
current evidence, gap, dependency, next action, validation, and status.

## Inputs

- `goal.md`
- `docs/FINAL-PRODUCT-GOAL.md`
- `docs/CURRENT-STATE.md`
- `docs/SIMULATOR-PLAYER-PROOF.md`
- `docs/TRACEABILITY-MATRIX.md`
- all eight page packets
- live source and existing proof reports

## Matrix Contract

```text
Goal | Page | Final target | Current evidence | Gap | Dependency | Next action | Validation | Status
```

## Rules

- Separate current evidence from the final target.
- Use stable row ids and one owner per requirement.
- Include shared rows once and page-specific rows for all eight routes.
- Treat unknown, unverified, blocked, partial, and complete as different states.
- Object count is not a completion criterion.
- Gameplay rows name deterministic simulator and Playwright player proof.
- Physical QR scanning is not the gameplay harness.
- Rank dependencies so Pass 5 can select the shared simple gameplay contract
  without starting several architectures at once.

## Output

- one canonical goal matrix;
- a summary by pass and page;
- a short critical path into Pass 5;
- no application/source implementation.

## Completion

Every final requirement is represented, every current gap has a next action and
validation path, and no row silently treats a proposal as implementation.
