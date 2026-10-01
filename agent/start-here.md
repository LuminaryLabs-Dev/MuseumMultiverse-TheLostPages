# Start Here

Status: active

## Purpose

This repo uses `agent/` as the long-running Lost Pages operating surface.

The `.agent/` tree is a preserved provisional design-discovery archive. It does
not choose work or override tracked `agent/`, root `goal.md`, or current proof.

## Standard Read Order

1. `goal.md`
2. `docs/CURRENT-STATE.md`
3. `docs/DOCUMENTATION-MAP.md`
4. `docs/FINAL-PRODUCT-GOAL.md` for product or gameplay work
5. `docs/SIMPLE-GAMEPLAY-CONTRACT.md` for gameplay behavior
6. `agent/start-here.md`
7. `agent/pointer.md`
8. `agent/workflow.md`
9. `agent/dependencies.md`
10. `agent/feedback/active-feedback.md`
11. The workflow named in the pointer
12. The task file named in the pointer
13. `memory.md`
14. `agent/memory.md`
15. `agent/run-log.md`
16. `agent/change-log.md`
17. `output-rules.md`
18. `output.md`

## State Intelligence Sync Read Order

Use this fuller read order when the user asks to align repo state, infer future rules, report drift, or run the State Intelligence Sync turn.

1. `goal.md`
2. `docs/CURRENT-STATE.md`
3. `docs/DOCUMENTATION-MAP.md`
4. `agent/start-here.md`
5. `agent/pointer.md`
6. `agent/workflow.md`
7. `agent/dependencies.md`
8. `agent/feedback/active-feedback.md`
9. `agent/feedback/feedback-inbox.md`
10. `agent/feedback/feedback-rules.md`
11. `agent/feedback/feedback-log.md`
12. `agent/feedback/processed-feedback.md`
13. `memory.md`
14. `agent/memory.md`
15. `agent/run-log.md`
16. `agent/change-log.md`
17. `agent/state-intelligence-ledger.md`
18. `output-rules.md`
19. `output.md`

## Autonomous Bounded Turn Read Order

Use this read order when the user says:

```text
Run one Lost Pages Autonomous Bounded Turn.
```

That prompt is the top-level mode selector. It reads repo state, selects exactly one bounded mode, completes or blocks it, updates state, and stops.

1. `goal.md`
2. `docs/CURRENT-STATE.md`
3. `docs/DOCUMENTATION-MAP.md`
4. `agent/start-here.md`
5. `agent/pointer.md`
6. `agent/workflow.md`
7. `agent/dependencies.md`
8. `agent/state-intelligence-ledger.md`
9. `agent/scheduled-turn-lock.md` if present
10. `agent/prompts/autonomous-bounded-turn.md`
11. `agent/feedback/active-feedback.md`
12. `agent/feedback/feedback-inbox.md`
13. `agent/feedback/feedback-rules.md`
14. `agent/feedback/feedback-log.md`
15. `agent/feedback/processed-feedback.md`
16. `memory.md`
17. `agent/memory.md`
18. `agent/run-log.md`
19. `agent/change-log.md`
20. `docs/SIMULATOR-PLAYER-PROOF.md`
21. `docs/STATE-ALIGNMENT-MAP.md`
22. `docs/DNA.md`
23. `docs/FULL-OUTLINE.md`
24. `docs/STYLE-GUIDE.md`
25. `docs/TECHNICAL-BUILD-MAP.md`
26. `docs/QA-ACCEPTANCE.md`
27. `docs/TRACEABILITY-MATRIX.md`
28. `README.md`
29. `output-rules.md`
30. `output.md`

## Scheduled Autonomous Turn Read Order

Use this read order when a scheduled Slot A/B/C/D automation runs.

1. `agent/scheduled-turn-lock.md`
2. `agent/prompts/autonomous-bounded-turn.md`
3. the Autonomous Bounded Turn read order above

Scheduled turns should check the lock before editing source or docs. If the lock is active and not stale, the turn should stop.

## Rules

- Read `pointer.md` before choosing work.
- The pointer selects work inside the active pass; it cannot skip or redefine
  the pass order in root `goal.md`.
- Keep each run bounded to one coherent objective.
- Scheduled Autonomous Bounded Turns should make the largest safe coherent upgrade toward active goals and feedback, not one tiny edit by default.
- Implementation is preferred after feedback is captured and docs are aligned, unless a real blocker exists.
- Every implementation turn should audit the changed area and record the next concrete fix.
- Gameplay turns use `docs/SIMULATOR-PLAYER-PROOF.md`: deterministic simulator
  proof first, direct-route Playwright player proof second.
- Gameplay implementation must preserve the phases, one-hero selector,
  mutual-exclusion, recovery, save, and replay invariants in
  `docs/SIMPLE-GAMEPLAY-CONTRACT.md`.
- Update `output.md` with the shortest useful deploy message.
- Update the pointer after a successful run only when the active task was completed or the pointer is stale, blocked, or misleading.
- Record durable feedback in `agent/feedback/`.
- Use `agent/prompts/state-intelligence-sync.md` when the user asks for repo alignment, drift detection, or future-turn inference.
- Use `agent/prompts/autonomous-bounded-turn.md` when the user asks for one generic bounded turn that should derive its own objective from repo state.
- State Intelligence Sync turns may update docs and agent knowledge, but must not edit app/source implementation unless explicitly requested.
- Autonomous Bounded Turns must select exactly one mode, execute or block exactly one coherent objective, update state, and stop.
