# Start Here

Status: active

## Purpose

This repo uses `agent/` as the long-running Lost Pages operating surface.

The preferred folder name is `.agent/`, but this repo uses `agent/` because hidden path writes were blocked in the connector. Treat `agent/` as the repo-local agent folder.

## Read Order

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

## Rules

- Read `pointer.md` before choosing work.
- Do not invent the next task when the pointer already names one.
- Keep each run bounded.
- Update `output.md` with the shortest useful deploy message.
- Update the pointer after a successful run.
- Record durable feedback in `agent/feedback/`.
