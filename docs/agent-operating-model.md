# Agent Operating Model

Lost Pages uses tracked `agent/` as its active long-running operating folder.
The `.agent/` tree is a preserved provisional design-discovery archive and has
no active execution authority.

## Core Files

- `goal.md` owns the active twelve-pass mission and pass status.
- `docs/CURRENT-STATE.md` owns current implementation truth.
- `agent/start-here.md` tells future runs where to begin.
- `agent/pointer.md` names the next prompt and workflow.
- `agent/workflow.md` defines the full run loop.
- `agent/goal.md` points older readers to root `goal.md`.
- `agent/dependencies.md` explains the NexusEngine boundary.
- `agent/memory.md` stores durable rules.
- `agent/run-log.md` records run results.
- `agent/change-log.md` records changes to the operating system.

## Prompt And Workflow Rule

Prompts say what to do.

Workflows say how to do it.

The pointer says which prompt and workflow are active now.

## Every Run Should End With

- validation attempted
- pass/matrix status updated when evidence changes
- output.md updated when the batch changes public-facing release notes
- run-log updated
- pointer updated
- feedback processed if needed
- memory updated if a durable rule changed

Commit, push, deploy, or notify only when the active user instruction or
scheduled workflow explicitly authorizes that external action.
