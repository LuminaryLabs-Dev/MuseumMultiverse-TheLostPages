# Lost Pages Agent Memory

Status: active operating rules

Product and architecture conventions live in `../memory.md`; do not duplicate
them here.

## Start Order

1. `../goal.md`
2. `../docs/CURRENT-STATE.md`
3. `../docs/DOCUMENTATION-MAP.md`
4. `../docs/FINAL-PRODUCT-GOAL.md` for product or gameplay work
5. `../docs/SIMPLE-GAMEPLAY-CONTRACT.md` for gameplay behavior
6. `../docs/GOAL-MATRIX.md` for execution work
7. `start-here.md`
8. `pointer.md`
9. `workflow.md`
10. `dependencies.md`
11. `feedback/active-feedback.md`
12. `../docs/SIMULATOR-PLAYER-PROOF.md` for gameplay work
13. relevant source, docs, reports, and proof

## Operating Rules

- Use `agent/` as the active execution and feedback workspace.
- Treat `.agent/` as preserved provisional discovery, not an active interview.
- Keep one active pointer and one bounded capability in progress.
- Prompts define the target; workflows define the execution loop.
- Preserve unrelated work and never discard an unowned dirty change.
- Distinguish current, historical, proposed, source-backed, built, previewed,
  desktop-tested, phone-tested, and AR-tested states.
- Update `run-log.md` for completed or blocked work.
- Update `change-log.md` when the operating system or documentation authority
  changes.
- Update `../memory.md` only for lasting repository conventions.
- Update `../goal.md` when pass status or completion criteria change.
- Keep active feedback in `feedback/active-feedback.md`; do not mark feedback
  processed without implementation, rejection, or supersession evidence.
- Update `output.md` once at the end of a publishable batch and keep it short.
- Validate visible work through browser/human-view proof when possible.
- Use the direct NexusEngine simulator space for gameplay rules and Playwright
  for separate player-visible acceptance; do not rely on physical QR scans.
- Do not claim physical AR from simulator, fallback, source, or build evidence.

## Documentation Pass Boundary

During Truth, Documentation Cleanup, Final Product Goal, and Goal Matrix passes,
do not change application behavior unless the active pass explicitly requires a
runtime correction and its scope is documented first.
