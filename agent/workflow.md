# Lost Pages Agent Workflow

Status: active

## Required Run Loop

1. Read `agent/start-here.md`.
2. Read `agent/pointer.md`.
3. Read this file.
4. Read `agent/goal.md`.
5. Read `agent/dependencies.md`.
6. Read `agent/feedback/active-feedback.md`.
7. Read the workflow named in the pointer.
8. Read the prompt named in the pointer.
9. Inspect only the source files needed for the selected prompt.
10. Execute one bounded batch.
11. Validate with the closest available check.
12. Update `output.md` with the shortest useful deploy message.
13. Update `agent/run-log.md`.
14. Update `agent/feedback/processed-feedback.md` if feedback was addressed.
15. Update `agent/memory.md` if a durable rule was learned.
16. Update `agent/change-log.md` if agent system files changed.
17. Update `agent/pointer.md` to the next best prompt.
18. Push the whole batch.

## Push Discipline

Do not create several public deploy messages for one agent run.

For multi-file work, batch changes first and publish once.

`output.md` should be updated last so the deploy chat describes the whole batch, not each intermediate file edit.

## Self Learning Loop

Feedback becomes active feedback.

Active feedback becomes a prompt or a bounded edit.

Run results become run log entries.

Durable lessons become memory.

Agent system changes become change log entries.

The next task becomes the pointer.

The public summary becomes output.md.

## Pointer Rules

If the prompt passes, move the pointer to the next best prompt.

If a more urgent issue is found, point to that issue instead.

If the prompt is blocked, keep the pointer on the blocked prompt and record the blocker.

If the prompt is obsolete, mark it skipped in the run log and point to the next useful prompt.

## Output Rules

`output-rules.md` describes the deploy chat style.

`output.md` is the current deploy chat message source.

Keep `output.md` short, user-facing, and updated once per completed batch.
