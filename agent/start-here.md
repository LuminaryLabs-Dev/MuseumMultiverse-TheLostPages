# Start Here

Status: active

## Purpose

This repo uses `agent/` as the long-running Lost Pages operating surface.

The preferred folder name is `.agent/`, but this repo uses `agent/` because hidden path writes were blocked in the connector. Treat `agent/` as the repo-local agent folder.

## Standard Read Order

1. `agent/start-here.md`
2. `agent/pointer.md`
3. `agent/workflow.md`
4. `agent/goal.md`
5. `agent/dependencies.md`
6. `agent/feedback/active-feedback.md`
7. The workflow named in the pointer
8. The task file named in the pointer
9. `agent/memory.md`
10. `agent/run-log.md`
11. `agent/change-log.md`
12. `output-rules.md`
13. `output.md`

## State Intelligence Sync Read Order

Use this fuller read order when the user asks to align repo state, infer future rules, report drift, or run the State Intelligence Sync turn.

1. `agent/start-here.md`
2. `agent/pointer.md`
3. `agent/workflow.md`
4. `agent/goal.md`
5. `agent/dependencies.md`
6. `agent/feedback/active-feedback.md`
7. `agent/feedback/feedback-inbox.md`
8. `agent/feedback/feedback-rules.md`
9. `agent/feedback/feedback-log.md`
10. `agent/feedback/processed-feedback.md`
11. `agent/memory.md`
12. `agent/run-log.md`
13. `agent/change-log.md`
14. `agent/state-intelligence-ledger.md`
15. `output-rules.md`
16. `output.md`

## Autonomous Bounded Turn Read Order

Use this read order when the user says:

```text
Run one Lost Pages Autonomous Bounded Turn.
```

That prompt is the top-level mode selector. It reads repo state, selects exactly one bounded mode, completes or blocks it, updates state, and stops.

1. `agent/start-here.md`
2. `agent/pointer.md`
3. `agent/workflow.md`
4. `agent/goal.md`
5. `agent/dependencies.md`
6. `agent/state-intelligence-ledger.md`
7. `agent/scheduled-turn-lock.md` if present
8. `agent/prompts/autonomous-bounded-turn.md`
9. `agent/feedback/active-feedback.md`
10. `agent/feedback/feedback-inbox.md`
11. `agent/feedback/feedback-rules.md`
12. `agent/feedback/feedback-log.md`
13. `agent/feedback/processed-feedback.md`
14. `agent/memory.md`
15. `agent/run-log.md`
16. `agent/change-log.md`
17. `docs/STATE-ALIGNMENT-MAP.md`
18. `docs/DNA.md`
19. `docs/FULL-OUTLINE.md`
20. `docs/STYLE-GUIDE.md`
21. `docs/TECHNICAL-BUILD-MAP.md`
22. `docs/QA-ACCEPTANCE.md`
23. `docs/TRACEABILITY-MATRIX.md`
24. `docs/chatgpt-master-start-source.md`
25. `README.md`
26. `output-rules.md`
27. `output.md`

## Scheduled Autonomous Turn Read Order

Use this read order when a scheduled Slot A/B/C/D automation runs.

1. `agent/scheduled-turn-lock.md`
2. `agent/prompts/autonomous-bounded-turn.md`
3. the Autonomous Bounded Turn read order above

Scheduled turns should check the lock before editing source or docs. If the lock is active and not stale, the turn should stop.

## Rules

- Read `pointer.md` before choosing work.
- Do not invent the next task when the pointer already names one, unless the user explicitly triggers the Autonomous Bounded Turn mode selector.
- Keep each run bounded to one coherent objective.
- Scheduled Autonomous Bounded Turns should make the largest safe coherent upgrade toward active goals and feedback, not one tiny edit by default.
- Implementation is preferred after feedback is captured and docs are aligned, unless a real blocker exists.
- Every implementation turn should audit the changed area and record the next concrete fix.
- Update `output.md` with the shortest useful deploy message.
- Update the pointer after a successful run only when the active task was completed or the pointer is stale, blocked, or misleading.
- Record durable feedback in `agent/feedback/`.
- Use `agent/prompts/state-intelligence-sync.md` when the user asks for repo alignment, drift detection, or future-turn inference.
- Use `agent/prompts/autonomous-bounded-turn.md` when the user asks for one generic bounded turn that should derive its own objective from repo state.
- State Intelligence Sync turns may update docs and agent knowledge, but must not edit app/source implementation unless explicitly requested.
- Autonomous Bounded Turns must select exactly one mode, execute or block exactly one coherent objective, update state, and stop.
