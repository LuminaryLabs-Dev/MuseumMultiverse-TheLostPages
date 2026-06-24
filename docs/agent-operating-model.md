# Agent Operating Model

Lost Pages uses `agent/` as its long-running operating folder.

The preferred hidden folder name would be `.agent/`, but hidden path writes were blocked during setup. In this repo, treat `agent/` as the same concept.

## Core Files

- `agent/start-here.md` tells future runs where to begin.
- `agent/pointer.md` names the next prompt and workflow.
- `agent/workflow.md` defines the full run loop.
- `agent/goal.md` explains the long term product goal.
- `agent/dependencies.md` explains the NexusRealtime boundary.
- `agent/memory.md` stores durable rules.
- `agent/run-log.md` records run results.
- `agent/change-log.md` records changes to the operating system.

## Prompt And Workflow Rule

Prompts say what to do.

Workflows say how to do it.

The pointer says which prompt and workflow are active now.

## Every Run Should End With

- validation attempted
- output.md updated
- run-log updated
- pointer updated
- feedback processed if needed
- memory updated if a durable rule changed
