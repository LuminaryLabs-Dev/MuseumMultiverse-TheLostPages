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

## Do not do this

- Do not invent a new page structure when docs already define one.
- Do not move slugs without updating routes, print, QR, rewards, docs, and static export.
- Do not claim AR/device proof from code review alone.
- Do not copy reusable runtime logic into Lost Pages if it belongs in NexusRealtime.
- Do not make visual changes from feedback notes alone unless the prompt asks for that visual pass.

## Required output from a competent agent run

```text
changed files
validation performed
validation not performed
remaining risks
next pointer or recommended next work
```
