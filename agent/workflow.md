# Lost Pages Agent Workflow

Status: active

## Run Loop

1. Read `agent/start-here.md`.
2. Read `agent/pointer.md`.
3. Read the workflow named in the pointer.
4. Read the prompt named in the pointer.
5. Execute one bounded batch only.
6. Validate the result with the closest available check.
7. Update `output.md` with the shortest useful deploy message.
8. Update `agent/run-log.md`.
9. Update `agent/pointer.md` to the next best prompt.
10. Push to `main`.

## Pointer Rules

If the prompt passes, move the pointer to the next best prompt.

If a more urgent issue is found, point to that issue instead.

If the prompt is blocked, keep the pointer on the blocked prompt and record the blocker.

If the prompt is obsolete, mark it skipped in the run log and point to the next useful prompt.

## Output Rules

`output-rules.md` describes the deploy chat style.

`output.md` is the current deploy chat message.

Keep `output.md` short and user-facing.
