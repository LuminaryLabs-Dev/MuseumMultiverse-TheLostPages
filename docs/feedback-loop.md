# Feedback Loop

Lost Pages uses repo-local feedback files so important user direction survives beyond chat.

## Files

- `agent/feedback/active-feedback.md` stores current feedback.
- `agent/feedback/processed-feedback.md` stores addressed feedback.
- `agent/feedback/how-to-feedback.md` explains the process.
- `agent/feedback/archive/` stores older feedback.

## Flow

User feedback becomes active feedback.

Active feedback becomes a prompt or a bounded edit.

Finished feedback moves to processed feedback.

Durable rules move to agent memory.

Agent system changes move to the change log.

The next task moves to the pointer.

The short public summary moves to output.md.

## Rule

Do not store every sentence forever. Store feedback that is explicit, repeated, or important for future runs.
