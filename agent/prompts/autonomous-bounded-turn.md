# Lost Pages Autonomous Bounded Turn

Status: active reusable prompt
Trigger phrase: `Run one Lost Pages Autonomous Bounded Turn.`

## Purpose

Use this prompt when the user wants one scheduled or on-demand Lost Pages turn but is not supplying a specific target goal.

The turn must read repo state, choose exactly one coherent objective from the repo's own agent state, docs, feedback, pointer, and ledger, make the largest safe upgrade batch that belongs to that objective, audit the result, update state, push to `main`, and stop.

This is not a queue runner. Do not continue into additional turns. Do not run background work. Do not start the next recommended turn.

## Full reusable prompt

```text
Run one Lost Pages Autonomous Bounded Turn.

You are working only in the GitHub repo:
LuminaryLabs-Dev/MuseumMultiverse-TheLostPages

This is a scheduled on-demand turn. Do not continue into additional turns. Do not run background work. Do not execute a queue.

Pick exactly one coherent objective, make the largest safe upgrade batch that belongs to that objective, audit the result, update state, push to main, and stop.

IMPORTANT:
The schedule name and schedule time are not the goal. They are only execution metadata. Choose the actual objective from repo state.

MAIN-BRANCH RULE:
All completed work must end on `main`.

Do not create a new PR for this scheduled turn.

Before making changes, check for open PRs targeting `main`.

If open PRs exist:

* Inspect each open PR.
* If a PR is safe, mergeable, and relevant, merge it into `main`.
* If a PR is unsafe, conflicted, blocked, stale, or needs review, do not start new work.
* Report the blocked PR and stop.
* Recommended next action should be to review, fix, close, or unblock that PR.

After open PRs are handled:

* Work from the latest `main`.
* Commit/push the selected bounded turn directly to `main`.
* Push once for the completed batch unless a scheduled-turn lock requires a separate start/completion update.
* Do not leave a feature branch or PR behind.

SCHEDULED TURN LOCK RULE:
Before making changes, check `agent/scheduled-turn-lock.md` if it exists.

If the lock status is active and not stale:

* Do not make changes.
* Report that another scheduled turn appears to be running.
* Stop.

If the lock status is active but stale:

* Mark the prior lock as stale if safe.
* Proceed only if no open PR or branch conflict exists.

If no lock file exists:

* Create `agent/scheduled-turn-lock.md` as part of this implementation plan or stop and recommend creating it if concurrency safety is required.

A lock is stale if it has been active for more than 60 minutes with no completion update.

PRIMARY GOAL:
Derive the best single bounded turn from the repo's current agent state, docs, feedback, pointer, and ledger. I am not providing a specific target goal. You must choose the highest-priority eligible objective from the repo itself.

CONCURRENCY / ACCUMULATION LOCK:
Before making changes, check whether there is already an open PR, unresolved branch, active scheduled-turn lock, or blocked prior autonomous turn.

If an open PR cannot be merged safely:

* Do not create a new branch.
* Do not make additional changes.
* Report the open PR and stop.

If the most recent autonomous turn was blocked by a user decision and no relevant repo state has changed:

* Do not repeat the same blocked work.
* Report the blocker and stop.
* Recommended next action should be the needed user decision.

FIRST: READ THE REPO STATE

Read these before deciding what to do:

1. agent/start-here.md
2. agent/pointer.md
3. agent/workflow.md
4. agent/goal.md
5. agent/dependencies.md
6. agent/state-intelligence-ledger.md
7. agent/scheduled-turn-lock.md if present
8. agent/feedback/active-feedback.md
9. agent/feedback/feedback-inbox.md
10. agent/feedback/feedback-rules.md
11. agent/feedback/feedback-log.md
12. agent/feedback/processed-feedback.md
13. agent/memory.md
14. agent/run-log.md
15. agent/change-log.md
16. docs/STATE-ALIGNMENT-MAP.md
17. docs/DNA.md
18. docs/FULL-OUTLINE.md
19. docs/STYLE-GUIDE.md
20. docs/TECHNICAL-BUILD-MAP.md
21. docs/QA-ACCEPTANCE.md
22. docs/TRACEABILITY-MATRIX.md
23. docs/chatgpt-master-start-source.md
24. README.md
25. output-rules.md
26. output.md

Inspect implementation files as needed to understand current behavior. Do not edit implementation files until the selected turn mode allows it.

SECOND: REPORT A TURN LEDGER BEFORE EDITING

Before changing files, produce a concise turn ledger with:

* selected mode
* selected objective
* why this objective won
* active feedback considered
* in scope
* out of scope
* expected files
* validation plan
* stop condition
* no-go conditions

THIRD: SELECT EXACTLY ONE TURN MODE

Choose the first eligible mode from this priority ladder:

MODE 1 — Feedback Intake

Use this if the current scheduled input contains new Lost Pages feedback.

Allowed:

* agent/feedback/*
* agent/memory.md only for durable rules

Forbidden:

* src/*
* print/*
* scripts/*
* .github/*

MODE 2 — State Intelligence Sync

Use this if agent state and non-agent docs disagree, feedback is not mirrored, docs overclaim implementation, or the repo needs inference expansion.

Allowed:

* agent/*
* docs/*
* README.md
* output.md

Forbidden unless explicitly requested:

* src/*
* print/*
* scripts/*
* .github/*

MODE 3 — Implementation Planning

Use this only if active feedback is clear and docs are aligned, but implementation has unresolved decisions that truly block source work.

Allowed:

* agent/*
* docs/*
* README.md
* output.md
* new prompt/plan files

Forbidden:

* src/* unless explicitly requested

PLANNING LIMIT RULE:
Do not keep choosing Implementation Planning for the same feedback theme unless new information, missing docs, or a real blocker exists.

MODE 4 — Implementation

Use this if docs are aligned, active feedback is ready for implementation, and no explicit user decision is blocking.

Allowed:

* all source/docs/state files required for one coherent objective

Forbidden unless the selected objective explicitly requires them:

* unrelated route changes
* runtime changes
* AR changes
* print changes
* deploy changes
* game changes

IMPLEMENTATION PRESSURE RULE:
If active feedback is already captured, docs are aligned, and no explicit user decision is blocking, prefer Mode 4 — Implementation over more planning.

For active UI feedback, prefer implementing the highest-impact coherent visual batch instead of another docs-only planning pass.

MODE 5 — QA / Validation

Use this if implementation exists but validation is missing.

Allowed:

* validation commands
* agent/run-log.md
* docs/QA-ACCEPTANCE.md if QA rules change
* agent/feedback/processed-feedback.md only if evidence supports it
* output.md

Source edits are allowed only for fixes directly required by the selected QA objective.

MODE 6 — Cleanup / Processed Feedback

Use this if implemented/validated feedback is still active or state files need cleanup.

Allowed:

* agent/feedback/*
* agent/run-log.md
* agent/state-intelligence-ledger.md

Forbidden:

* src/*

FOURTH: MAXIMUM USEFUL UPGRADE RULE

Each scheduled turn should make the largest coherent safe improvement it can toward active Lost Pages goals and feedback.

Do not reduce the turn to one tiny edit if the selected objective clearly requires several related files.

A scheduled turn may make a large multi-file batch when all changes serve the same selected objective.

The selected objective must still be one coherent workstream.

Valid large objectives include:

* Make `/print/` the primary tabletop review surface.
* Implement the print-view visual feedback batch.
* Complete AR route QA and record route evidence.
* Reconcile active feedback with docs and implementation state.
* Clean up processed feedback after a validated implementation.

Invalid overbroad objectives include:

* Improve every UI, route, AR, print, and deploy system at once.
* Start multiple unrelated queued tasks.
* Implement visual changes and AR runtime architecture in the same turn.
* Change Lost Pages and NexusRealtime in the same turn unless explicitly requested.

FIFTH: OBEY THESE BOUNDS

* Execute exactly one coherent objective.
* Do not combine unrelated workstreams.
* Do not start the next recommended turn.
* Do not implement from feedback unless implementation is explicitly selected and justified.
* Do not edit src/, print/, scripts/, or .github/ during feedback intake, state sync, or planning.
* Do not touch NexusRealtime or generic runtime architecture unless the selected objective explicitly requires runtime work.
* Do not change slugs, QR routes, static export, or rewards without checking traceability docs.
* Do not claim build success unless a build was actually run.
* Do not claim browser, phone, camera, WebXR, or AR testing unless actually tested.
* Keep output.md short and update it once at the end if the batch changes repo state.
* Push only to `main`.
* Do not create new PRs for scheduled autonomous turns.
* Merge existing safe PRs into `main` before new work.
* Stop if existing PRs are blocked or unsafe to merge.
* Push one coherent completed batch to `main`.
* Do not push partial implementation.
* Stop after the selected objective is complete or blocked.

SIXTH: APP-SPECIFIC CURRENT PRIORITIES

Use repo state as source of truth, but these are known active themes:

* /print should become the primary non-AR review/presentation surface.
* /book is pending decision: remove, redirect, hide, or retain as debug/experimental/legacy.
* print view should feel like a physical tabletop surface.
* page layout needs grounded shadows.
* pointer-following glow should be removed.
* reactivity should be subtle and physical: orientation, parallax, paper lift, or similar.
* physical book-opening transition into the page layout is desired.
* AR route QA remains pending.
* QR/print readiness comes after route QA and print-view direction are stable.

SEVENTH: POST-CHANGE AUDIT RULE

After making an implementation batch, audit the changed area before closing the turn.

The audit must inspect the affected files and report:

1. what improved
2. what still appears wrong
3. what was validated
4. what was not validated
5. what feedback remains active
6. what can move toward processed
7. what the next turn should fix

If the turn changed UI, audit the relevant UI source files and docs after the change.

If build or browser validation cannot be run, say that clearly and do not claim visual proof.

EIGHTH: UPDATE STATE CORRECTLY

Depending on the selected mode, update the relevant files:

* agent/run-log.md after any completed turn.
* agent/change-log.md if agent operating files changed.
* agent/memory.md only for durable rules.
* agent/feedback/active-feedback.md for unresolved direction.
* agent/feedback/feedback-inbox.md for raw captured feedback.
* agent/feedback/feedback-log.md for feedback state changes.
* agent/feedback/processed-feedback.md only when implementation, rejection, or supersession is evidenced.
* agent/state-intelligence-ledger.md for current truth, pending work, inferences, and next-turn guidance.
* agent/scheduled-turn-lock.md for scheduled turn state.
* docs/* when non-agent product truth changes.
* output.md once at the end with a short public message.

Do not move agent/pointer.md unless:

* the pointed task completed,
* the pointed task is blocked,
* the pointed task is obsolete,
* or a higher-priority repo-state issue clearly supersedes it.

NINTH: NEXT-TURN HANDOFF RULE

At closeout, write a concrete next-turn recommendation.

Format:

Recommended next turn:
<one bounded objective>

Why:
<short reason>

Likely files:
<files or directories>

Validation needed:
<build / preview / route / phone / AR / inspection>

TENTH: FINAL RESPONSE FORMAT

End with:

1. Selected mode
2. Selected objective
3. Why this objective was selected
4. Existing PRs found and merge status
5. Files changed
6. Files intentionally not changed
7. Validation performed
8. Validation not performed
9. Feedback status changes
10. Post-change audit
11. Remaining risks
12. Recommended next turn

Then stop.
```

## Repo implementation notes

Scheduled automation prompts should use the same text as the prompt above. The repo copy is the source of truth for future manual refreshes of scheduler task prompts.
