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

## Rules

- Read `pointer.md` before choosing work.
- Do not invent the next task when the pointer already names one.
- Keep each run bounded.
- Update `output.md` with the shortest useful deploy message.
- Update the pointer after a successful run only when the active task was completed or the pointer is stale, blocked, or misleading.
- Record durable feedback in `agent/feedback/`.
- Use `agent/prompts/state-intelligence-sync.md` when the user asks for repo alignment, drift detection, or future-turn inference.
- State Intelligence Sync turns may update docs and agent knowledge, but must not edit app/source implementation unless explicitly requested.
