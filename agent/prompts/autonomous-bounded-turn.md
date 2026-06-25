# Lost Pages Autonomous Bounded Turn

Status: active reusable prompt
Trigger phrase: `Run one Lost Pages Autonomous Bounded Turn.`

## Purpose

Use this prompt when the user wants one bounded Lost Pages turn but is not supplying a specific target goal.

The turn must read repo state, choose exactly one highest-priority eligible objective from the repo's own agent state, docs, feedback, pointer, and ledger, execute or block that objective, update state, and stop.

This is an on-demand turn, not a scheduled job. Do not continue into additional turns. Do not run background work. Do not execute a queue.

## Primary goal

Derive the best single bounded turn from current repo state.

The user is not providing a specific target goal. Choose the highest-priority eligible objective from the repo itself.

## First: read repo state

Read these before deciding what to do:

1. `agent/start-here.md`
2. `agent/pointer.md`
3. `agent/workflow.md`
4. `agent/goal.md`
5. `agent/dependencies.md`
6. `agent/state-intelligence-ledger.md`
7. `agent/feedback/active-feedback.md`
8. `agent/feedback/feedback-inbox.md`
9. `agent/feedback/feedback-rules.md`
10. `agent/feedback/feedback-log.md`
11. `agent/feedback/processed-feedback.md`
12. `agent/memory.md`
13. `agent/run-log.md`
14. `agent/change-log.md`
15. `docs/STATE-ALIGNMENT-MAP.md`
16. `docs/DNA.md`
17. `docs/FULL-OUTLINE.md`
18. `docs/STYLE-GUIDE.md`
19. `docs/TECHNICAL-BUILD-MAP.md`
20. `docs/QA-ACCEPTANCE.md`
21. `docs/TRACEABILITY-MATRIX.md`
22. `docs/chatgpt-master-start-source.md`
23. `README.md`
24. `output-rules.md`
25. `output.md`

Inspect implementation files only if needed as evidence for the selected turn. Do not edit implementation files until the selected turn mode allows it.

## Second: produce a turn ledger before editing

Before changing files, produce a concise turn ledger with:

- selected mode
- selected objective
- why this objective won
- active feedback considered
- in scope
- out of scope
- expected files
- validation plan
- stop condition
- no-go conditions

## Third: select exactly one turn mode

Choose the first eligible mode from this priority ladder.

### Mode 1 — Feedback Intake

Use this if the current user message contains new Lost Pages feedback.

Allowed:

- `agent/feedback/*`
- `agent/memory.md` only for durable operating rules

Forbidden:

- `src/*`
- `print/*`
- `scripts/*`
- `.github/*`

### Mode 2 — State Intelligence Sync

Use this if agent state and non-agent docs disagree, feedback is not mirrored, docs overclaim implementation, or the repo needs inference expansion.

Allowed:

- `agent/*`
- `docs/*`
- `README.md`
- `output.md`

Forbidden unless explicitly requested:

- `src/*`
- `print/*`
- `scripts/*`
- `.github/*`

### Mode 3 — Implementation Planning

Use this if active feedback is clear and docs are aligned, but implementation has unresolved decisions.

Allowed:

- `agent/*`
- `docs/*`
- `README.md`
- `output.md`
- new prompt/plan files

Forbidden unless explicitly requested:

- `src/*`

### Mode 4 — Implementation

Use this only if docs are aligned, active feedback is ready for implementation, and no user decision is blocking.

Allowed:

- only the source/docs files required for one bounded objective

Forbidden unless the selected objective explicitly requires them:

- unrelated route changes
- runtime changes
- AR changes
- print changes
- deploy changes
- game changes

### Mode 5 — QA / Validation

Use this if implementation exists but validation is missing.

Allowed:

- validation commands
- `agent/run-log.md`
- `docs/QA-ACCEPTANCE.md` if QA rules change
- `agent/feedback/processed-feedback.md` only if evidence supports it
- `output.md`

Source edits are allowed only for small fixes directly required by the selected QA objective.

### Mode 6 — Cleanup / Processed Feedback

Use this if implemented/validated feedback is still active or state files need cleanup.

Allowed:

- `agent/feedback/*`
- `agent/run-log.md`
- `agent/state-intelligence-ledger.md`

Forbidden:

- `src/*`

## Fourth: obey these bounds

- Execute exactly one objective.
- Do not combine unrelated workstreams.
- Do not start the next recommended turn.
- Do not implement from feedback unless implementation is explicitly selected and justified.
- Do not edit `src/`, `print/`, `scripts/`, or `.github/` during feedback intake, state sync, or planning.
- Do not touch NexusRealtime or generic runtime architecture unless the selected objective explicitly requires runtime work.
- Do not change slugs, QR routes, static export, or rewards without checking traceability docs.
- Do not claim build success unless a build was actually run.
- Do not claim browser, phone, camera, WebXR, or AR testing unless actually tested.
- Keep `output.md` short and update it once at the end if the batch changes repo state.
- Make one coherent commit or PR batch.
- Stop after the selected objective is complete or blocked.

## Fifth: app-specific current priorities

Use repo state as source of truth, but these are known active themes:

- `/print/` should become the primary non-AR review/presentation surface.
- `/book/` is pending decision: remove, redirect, hide, or retain as debug/experimental/legacy.
- print view should feel like a physical tabletop surface.
- page layout needs grounded shadows.
- pointer-following glow should be removed.
- reactivity should be subtle and physical: orientation, parallax, paper lift, or similar.
- physical book-opening transition into the page layout is desired.
- AR route QA remains pending.
- QR/print readiness comes after route QA and print-view direction are stable.

## Sixth: update state correctly

Depending on the selected mode, update the relevant files:

- `agent/run-log.md` after any completed turn.
- `agent/change-log.md` if agent operating files changed.
- `agent/memory.md` only for durable rules.
- `agent/feedback/active-feedback.md` for unresolved direction.
- `agent/feedback/feedback-inbox.md` for raw captured feedback.
- `agent/feedback/feedback-log.md` for feedback state changes.
- `agent/feedback/processed-feedback.md` only when implementation, rejection, or supersession is evidenced.
- `agent/state-intelligence-ledger.md` for current truth, pending work, inferences, and next-turn guidance.
- `docs/*` when non-agent product truth changes.
- `output.md` once at the end with a short public message.

Do not move `agent/pointer.md` unless:

- the pointed task completed,
- the pointed task is blocked,
- the pointed task is obsolete,
- or a higher-priority repo-state issue clearly supersedes it.

## Seventh: final response format

End with:

1. Selected mode
2. Selected objective
3. Why this objective was selected
4. Files changed
5. Files intentionally not changed
6. Validation performed
7. Validation not performed
8. Feedback status changes
9. Remaining risks
10. Recommended next turn

Then stop.
