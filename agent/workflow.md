# Lost Pages Agent Workflow

Status: active

## Required Run Loop

1. Read `agent/start-here.md`.
2. Read `agent/pointer.md`.
3. Read this file.
4. Read `agent/goal.md`.
5. Read `agent/dependencies.md`.
6. Read `agent/feedback/active-feedback.md`.
7. Read the workflow named in the pointer, unless the user explicitly triggers a different workflow or prompt.
8. Read the prompt named in the pointer, unless the user explicitly triggers a different prompt.
9. Inspect only the source files needed for the selected prompt.
10. Execute one bounded batch.
11. Validate with the closest available check.
12. Update `output.md` with the shortest useful deploy message.
13. Update `agent/run-log.md`.
14. Update `agent/feedback/processed-feedback.md` if feedback was addressed.
15. Update `agent/memory.md` if a durable rule was learned.
16. Update `agent/change-log.md` if agent system files changed.
17. Update `agent/pointer.md` to the next best prompt only when the active task is completed, blocked, obsolete, or superseded.
18. Push the whole batch.

## Push Discipline

Do not create several public deploy messages for one agent run.

For multi-file work, batch changes first and publish once.

`output.md` should be updated last so the deploy chat describes the whole batch, not each intermediate file edit.

## Self Learning Loop

Feedback becomes active feedback.

Active feedback becomes a prompt, a bounded edit, or a State Intelligence Sync turn.

Active feedback plus docs drift becomes a State Intelligence Sync turn.

State Intelligence Sync turns produce implementation prompts, pointer recommendations, durable memory, and docs alignment.

Autonomous Bounded Turns select exactly one eligible mode from repo state, complete or block one objective, update state, and stop.

Run results become run log entries.

Durable lessons become memory.

Agent system changes become change log entries.

The next task becomes the pointer.

The public summary becomes output.md.

## Autonomous Bounded Turns

Use an Autonomous Bounded Turn when the user wants a generic, reusable turn without supplying a target goal.

The reusable prompt is:

```text
agent/prompts/autonomous-bounded-turn.md
```

Trigger phrase:

```text
Run one Lost Pages Autonomous Bounded Turn.
```

This prompt is a top-level mode selector. It reads repo state and then chooses exactly one of:

1. Feedback Intake
2. State Intelligence Sync
3. Implementation Planning
4. Implementation
5. QA / Validation
6. Cleanup / Processed Feedback

An Autonomous Bounded Turn must:

- read the required repo state before selecting a mode
- produce a turn ledger before editing
- pick the first eligible mode from the priority ladder
- execute exactly one objective
- avoid running a queue of follow-up work
- avoid starting the recommended next turn
- update `output.md` once at the end if repo state changed
- stop after the selected objective is complete or blocked

An Autonomous Bounded Turn should not move `agent/pointer.md` unless the pointed task completed, is blocked, is obsolete, or is clearly superseded by a higher-priority repo-state issue.

## State Intelligence Sync Turns

Use a State Intelligence Sync turn when the goal is to align agent state and non-agent docs, infer durable rules, report drift, or prepare a future implementation turn.

The reusable workflow is:

```text
agent/workflows/state-intelligence-sync-workflow.md
```

The reusable prompt is:

```text
agent/prompts/state-intelligence-sync.md
```

A State Intelligence Sync turn may update:

- `agent/memory.md`
- `agent/feedback/*`
- `agent/run-log.md`
- `agent/change-log.md`
- `agent/state-intelligence-ledger.md`
- `docs/*`
- `docs/pages/*`
- `README.md`
- `output.md` as a short public summary

A State Intelligence Sync turn must not update these unless explicitly instructed:

- `src/*`
- `print/*`
- `scripts/*`
- `.github/*`
- runtime behavior
- route behavior
- visual implementation
- AR/game implementation

A State Intelligence Sync turn should not mark feedback processed unless implementation is already evidenced.

A State Intelligence Sync turn should not move the pointer unless the current pointer is stale, blocked, obsolete, or misleading.

## Pointer Rules

If the prompt passes, move the pointer to the next best prompt.

If a more urgent issue is found, point to that issue instead.

If the prompt is blocked, keep the pointer on the blocked prompt and record the blocker.

If the prompt is obsolete, mark it skipped in the run log and point to the next useful prompt.

If a user-triggered State Intelligence Sync completes, leave the current implementation pointer in place unless it is clearly stale, blocked, obsolete, or superseded.

If a user-triggered Autonomous Bounded Turn completes, leave the current implementation pointer in place unless the selected objective directly completed, blocked, obsoleted, or superseded it.

## Output Rules

`output-rules.md` describes the deploy chat style.

`output.md` is the current deploy chat message source.

Keep `output.md` short, user-facing, and updated once per completed batch.
