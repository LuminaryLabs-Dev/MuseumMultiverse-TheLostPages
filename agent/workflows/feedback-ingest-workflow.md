# Feedback Ingest Workflow

Status: active

Use this workflow when the user gives direction that should survive the chat.

## Steps

1. Read `agent/feedback/how-to-feedback.md`.
2. Add current durable direction to `agent/feedback/active-feedback.md`.
3. If the direction is already handled, add it to `processed-feedback.md` instead.
4. If it changes a durable rule, update `agent/memory.md`.
5. If it changes agent structure, update `agent/change-log.md`.
6. If it creates work, add or update a prompt and pointer.
7. Update `output.md` with a short deploy message.

## Acceptance

Future runs should be able to see and act on the feedback without needing the original chat.
