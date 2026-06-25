# Scheduled Turn Lock

Status: completed
Slot: none
Started: none
Completed: none
Selected mode: none
Selected objective: none
Last commit: none
Next recommended turn: none

## Rule

If status is `active` and not stale, scheduled turns must stop.

A lock is stale if it has been active for more than 60 minutes without a completion update.

## Status values

- `active` — a scheduled turn appears to be running.
- `completed` — no scheduled turn is currently running.
- `blocked` — the last scheduled turn stopped on a blocker.
- `stale` — a prior active lock exceeded the stale threshold.

## Scheduled turn slots

- Slot A: every hour at `:00`
- Slot B: every hour at `:15`
- Slot C: every hour at `:30`
- Slot D: every hour at `:45`

## Lock update guidance

Scheduled turns should update this file when they begin and when they complete or block.

If a scheduled turn cannot safely update the lock, it should stop and report the reason rather than proceeding with overlapping work.
