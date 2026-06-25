# Lost Pages Agent Build Manual

Status: supporting content scaffold

## Purpose

This manual tells an auto agent how to use the product docs and the `agent/` operating folder together.

## Read order for content work

```text
docs/supporting-content/README.md
docs/DNA.md
docs/FULL-OUTLINE.md
docs/TRACEABILITY-MATRIX.md
docs/PAGE-DOC-STANDARD.md
docs/pages/PageXX-*/README.md
agent/start-here.md
agent/pointer.md
agent/workflow.md
agent/feedback/active-feedback.md
```

## Read order for State Intelligence Sync work

```text
agent/start-here.md
agent/pointer.md
agent/workflow.md
agent/goal.md
agent/dependencies.md
agent/feedback/active-feedback.md
agent/feedback/feedback-inbox.md
agent/feedback/feedback-rules.md
agent/feedback/feedback-log.md
agent/feedback/processed-feedback.md
agent/memory.md
agent/run-log.md
agent/change-log.md
agent/state-intelligence-ledger.md
docs/STATE-ALIGNMENT-MAP.md
README.md
```

## Work loop

1. Identify the target page, route, or system.
2. Read the matching product docs under `docs/`.
3. Read the current agent pointer and active feedback.
4. Inspect only the implementation files needed for the bounded task.
5. Make one coherent batch.
6. Validate with the closest available check.
7. Record what was and was not tested.
8. Update docs only when product truth changes.
9. Update `agent/` only when operational state changes.
10. Keep deploy/output messages short and accurate.

## State Intelligence Sync Before Implementation

Run a State Intelligence Sync when:

- active feedback exists but docs do not reflect it
- docs disagree with agent memory or run log
- route/product direction changed
- a future implementation turn needs clearer constraints
- user asks for repo alignment, drift detection, or inference expansion
- feedback is captured but not yet reflected in non-agent docs

A sync turn may update docs and agent knowledge, but it should not edit implementation files.

## Do not do this

- Do not invent a new page structure when docs already define one.
- Do not move slugs without updating routes, print, QR, rewards, docs, and static export.
- Do not claim AR/device proof from code review alone.
- Do not copy reusable runtime logic into Lost Pages if it belongs in NexusRealtime.
- Do not make visual changes from feedback notes alone unless the prompt asks for that visual pass.
- Do not treat active feedback as implemented from docs alignment alone.
- Do not edit `src/`, `print/`, `scripts/`, or `.github/` during State Intelligence Sync unless explicitly asked.

## Required output from a competent agent run

```text
changed files
validation performed
validation not performed
remaining risks
next pointer or recommended next work
```

## Required output from a State Intelligence Sync

```text
agent files read
non-agent docs read
implementation files inspected for evidence, if any
mismatches found
inferences added
files changed
files intentionally not changed
validation performed
validation not performed
remaining risks
recommended next turn
```
