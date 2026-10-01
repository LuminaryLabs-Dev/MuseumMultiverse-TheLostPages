# Project Overview

Museum Multiverse: Lost Pages is an AR companion magazine.

The product goal is an eight page printed artifact where each page can be scanned by phone. A scan opens a static public route that launches a page-specific web or AR experience.

## Audience

- people holding the printed magazine
- people opening the public site on a phone
- reviewers using desktop debug routes
- future agents and contributors continuing the project

## Experience Shape

The site should support:

- a launcher screen
- a main print review / presentation screen
- optional or legacy book/composition review only if intentionally retained
- direct AR routes for QR codes
- debug routes for desktop review
- static hosting on GitHub Pages

## Current Product Direction

Active feedback prefers the main print view as the primary non-AR review/presentation surface.

The final product keeps `/book/` as a hidden compatibility alias to the shared
reader. It is not a primary navigation destination or separate review product.

The print-view visual direction should feel physical: tabletop-like surface, squared paper, grounded shadows, subtle orientation/parallax, and no pointer-following glow effect.

## Operating Shape

The active mission and pass status live in root `goal.md`.

The dated implementation snapshot lives in `docs/CURRENT-STATE.md`; the
documentation ownership map lives in `docs/DOCUMENTATION-MAP.md`.

The final shared flow and all eight measurable page contracts live in
`docs/FINAL-PRODUCT-GOAL.md`.

Human docs live in `docs/`.

Active execution, feedback, and handoff state live in tracked `agent/`.
Provisional picture-frame discovery is preserved under `.agent/` as history.

State alignment and inference rules live in `agent/state-intelligence-ledger.md`, `agent/prompts/state-intelligence-sync.md`, and `docs/STATE-ALIGNMENT-MAP.md`.

Deploy chat text lives in `output.md`.
