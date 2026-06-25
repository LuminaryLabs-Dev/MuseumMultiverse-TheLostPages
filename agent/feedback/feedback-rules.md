# Feedback Rules

Status: active

## Purpose

Use this file to make feedback intake consistent across Lost Pages agent runs.

## Intake rule

When the user asks to add feedback, capture the feedback first. Do not implement product, visual, route, runtime, or copy changes unless the user explicitly asks for implementation.

## Feedback flow

```text
user feedback
  -> feedback-inbox.md
  -> active-feedback.md if still relevant
  -> processed-feedback.md after implementation, rejection, or supersession
  -> feedback-log.md for date-based record
```

## Classification labels

Use plain labels when recording feedback:

- product direction
- visual direction
- route/navigation direction
- print direction
- AR/runtime direction
- copy direction
- agent workflow direction
- deployment/output direction
- state alignment direction

## Status labels

Use these status labels consistently:

- `captured` — feedback has been recorded.
- `aligned-to-docs` — non-agent docs reflect the feedback as current or pending direction.
- `ready-for-implementation` — feedback has enough constraints for a bounded implementation turn.
- `implemented` — source/docs changes were made and evidence exists.
- `processed` — implemented, rejected, or superseded feedback has been summarized in `processed-feedback.md`.
- `superseded` — a newer direction replaced this feedback.
- `blocked` — feedback cannot be applied until a dependency or decision is resolved.

## Active feedback rule

Add feedback to `active-feedback.md` when it should affect future work.

## Processed feedback rule

Move or summarize feedback in `processed-feedback.md` when it has been implemented, rejected, or replaced by newer direction.

Do not mark feedback processed from intake alone.

## State Sync Rule

A State Intelligence Sync may update docs and memory to reflect feedback, but it must not implement app/product behavior unless explicitly requested.

If feedback is captured but not implemented:

- `active-feedback.md` should contain the actionable direction.
- `feedback-inbox.md` should contain the raw/context entry.
- `feedback-log.md` should record capture status.
- non-agent docs may mention the direction as pending or active product direction.
- `processed-feedback.md` must not mark it done.

## Pointer rule

Only update `agent/pointer.md` if the feedback clearly changes the next best task. Otherwise leave the pointer alone.

## Proof rule

Record whether feedback was only captured, aligned to docs, implemented, processed, superseded, or blocked. Do not claim implementation from intake alone.
