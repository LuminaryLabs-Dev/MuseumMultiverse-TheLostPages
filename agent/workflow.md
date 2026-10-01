# Lost Pages Agent Workflow

Status: active

## Required Run Loop

1. Read `agent/start-here.md`.
2. Read root `goal.md`.
3. Read `docs/CURRENT-STATE.md` and `docs/DOCUMENTATION-MAP.md`.
4. Read `docs/FINAL-PRODUCT-GOAL.md` for product or gameplay work.
5. Read `docs/SIMPLE-GAMEPLAY-CONTRACT.md` for gameplay behavior.
6. Read `agent/pointer.md`.
7. Read this file.
8. Read `agent/dependencies.md`.
9. Read `agent/feedback/active-feedback.md`.
10. Read the workflow named in the pointer, unless the user explicitly triggers a different workflow or prompt.
11. Read the prompt named in the pointer, unless the user explicitly triggers a different prompt.
12. Inspect only the source files needed for the selected prompt.
13. Execute one bounded batch.
14. Validate with the closest available check.
15. Update `output.md` with the shortest useful deploy message.
16. Update `agent/run-log.md`.
17. Update `agent/feedback/processed-feedback.md` if feedback was addressed.
18. Update `agent/memory.md` if a durable rule was learned.
19. Update `agent/change-log.md` if agent system files changed.
20. Update the active pass and matrix row from evidence.
21. Update `CHANGELOG.md` when product or architecture state changes.
22. Update `agent/pointer.md` only when the active task is completed, blocked,
    obsolete, or superseded.
23. Commit, push, deploy, or notify only when explicitly authorized by the
    current user instruction or scheduled workflow.

## Push Discipline

Do not create several public deploy messages for one agent run.

For multi-file work, batch changes first and publish once.

`output.md` should be updated last so the deploy chat describes the whole batch, not each intermediate file edit.

Do not infer publication authority from the existence of changed files. When a
scheduled workflow explicitly authorizes publication, push one completed batch
to the repository's actual default branch and do not create several public
messages.

## Gameplay Proof Loop

Gameplay work follows `docs/SIMULATOR-PLAYER-PROOF.md`:

The semantic behavior being proved is fixed by
`docs/SIMPLE-GAMEPLAY-CONTRACT.md`.

1. compose the shipped domain kits in the additive testing space;
2. drive semantic inputs with a fixed seed and clock;
3. prove startup, play, failure, recovery, reset, snapshot, replay, reward, and
   completion;
4. use Playwright on the direct simulator/debug URL to prove objective, hero
   control, visible feedback, recovery, and completion comprehension;
5. add the smallest missing capability and rerun both layers;
6. stop after a stable pass, one concrete blocker, or three review cycles.

Physical QR scanning is not the routine gameplay harness. Environment detail
and object counts do not substitute for user-visible interaction quality.

## Self Learning Loop

Feedback becomes active feedback.

Active feedback becomes a prompt, a bounded edit, or a State Intelligence Sync turn.

Active feedback plus docs drift becomes a State Intelligence Sync turn.

State Intelligence Sync turns produce implementation prompts, pointer recommendations, durable memory, and docs alignment.

Autonomous Bounded Turns select exactly one eligible mode from repo state, complete or block one objective, update state, and stop.

Scheduled Autonomous Upgrade Turns make the largest coherent safe upgrade toward active goals and feedback, then audit the result and record the next fix.

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
- execute exactly one coherent objective
- avoid running a queue of follow-up work
- avoid starting the recommended next turn
- update `output.md` once at the end if repo state changed
- stop after the selected objective is complete or blocked

An Autonomous Bounded Turn should not move `agent/pointer.md` unless the pointed task completed, is blocked, is obsolete, or is clearly superseded by a higher-priority repo-state issue.

## Scheduled Autonomous Upgrade Turns

Use this behavior when the four scheduled hourly slots run the autonomous prompt.

Scheduled turns should:

- check `agent/scheduled-turn-lock.md` before work
- handle open PRs that target `main` before new work
- stop if an open PR requires review or conflict resolution
- push only to `main`
- avoid creating new PRs
- choose one coherent objective from repo state
- make the largest safe upgrade batch that belongs to that objective
- prefer implementation after active feedback is captured and docs are aligned
- avoid repeating implementation planning for the same feedback theme unless new information or a real blocker exists
- audit the changed area immediately after implementation
- record concrete next-turn guidance

Valid large scheduled objectives include:

- make `/print/` the primary tabletop review surface
- implement the print-view visual feedback batch
- complete AR route QA and record route evidence
- reconcile active feedback with docs and implementation state
- clean up processed feedback after a validated implementation

Invalid scheduled objectives include:

- changing UI, AR runtime, print, route export, and deploy messaging in one unrelated batch
- changing Lost Pages and an external shared runtime repository in the same
  turn unless explicitly requested
- running a queue of multiple unrelated tasks
- pushing partial implementation without a closeout audit

## Scheduled Turn Lock

The lock file is:

```text
agent/scheduled-turn-lock.md
```

If the lock status is `active` and not stale, scheduled turns should stop.

A lock is stale if it has been active for more than 60 minutes without a completion update.

If no lock exists, scheduled turn setup should create it before relying on 15-minute offset schedules.

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

If a scheduled autonomous upgrade turn completes implementation work that supersedes the current pointer, update the pointer only with explicit evidence and a run-log note.

## Output Rules

`output-rules.md` describes the deploy chat style.

`output.md` is the current deploy chat message source.

Keep `output.md` short, user-facing, and updated once per completed batch.
