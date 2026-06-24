# Lost Pages QA and Acceptance

Status: supporting content scaffold

## Purpose

This document defines the evidence an auto agent should record before claiming a Lost Pages page or route is ready.

## Route QA

For each slug:

- `/ar/<slug>/` opens the expected page.
- `/ar/<slug>/?debug=1` preserves debug behavior.
- `/debug/ar/<slug>/` opens desktop debug surface.
- Static export includes direct route folders.
- Launcher QR target points to intended public origin.

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
