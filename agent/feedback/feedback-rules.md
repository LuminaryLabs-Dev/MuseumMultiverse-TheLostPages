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

## Active feedback rule

Add feedback to `active-feedback.md` when it should affect future work.

## Processed feedback rule

Move or summarize feedback in `processed-feedback.md` when it has been implemented, rejected, or replaced by newer direction.

## Pointer rule

Only update `agent/pointer.md` if the feedback clearly changes the next best task. Otherwise leave the pointer alone.

## Proof rule

Record whether feedback was only captured or actually implemented. Do not claim implementation from intake alone.
