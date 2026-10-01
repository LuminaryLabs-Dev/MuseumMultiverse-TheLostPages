# Lost Pages Game Model

Status: supporting content scaffold

## Game promise

Each page is a short, readable route game. JR auto-runs; the player shapes or
reveals the route, uses one `Jump` control during motion, and receives one
durable reward. `FINAL-PRODUCT-GOAL.md` owns exact page contracts.

## Universal loop

```text
see one prompt
  -> Plan with one page-specific action
  -> Start Run
  -> auto-run with one Jump control
  -> use one contextual action only at a safe stop
  -> persist completion and reward
  -> Continue Journey or Replay
```

## Required game fields

Each page game must define:

- **Plan/context verb**: the page-specific action used only when JR is safe.
- **Run verb**: shared fixed `Jump`; no joystick or free roaming.
- **Objective**: what completion means.
- **Input model**: taps, drags, device movement, keyboard/mouse debug controls.
- **Progress states**: clear countable milestones.
- **Feedback**: visual, text, haptic/audio if available.
- **Win state**: reward shown and persisted.
- **Replay state**: page can be reviewed without breaking progress.
- **Failure model**: checkpoint-safe soft failure with a matching recovery
  action and no reward penalty.

## Design constraints

- One primary mechanic per page.
- One reward per page.
- Only one normal hero control is active at a time.
- No hidden required gesture without visible instruction.
- Debug controls must preserve desktop review.
- Phone AR behavior must be tested before being claimed.
- Routine gameplay proof uses direct simulator/debug routes, not physical QR
  scans.

## Eight-page mechanic ladder

| Page | Context action | Shared run lesson |
|---|---|---|
| 01 | Trace and lock a map route | First generous Jump and checkpoint recovery |
| 02 | Match three frame glyphs | Traverse the route the player built |
| 03 | Reveal the memory at the goal | Read predictable moving-platform timing |
| 04 | Restore one obvious word at each stop | Alternate safe context and Jump beats |
| 05 | Shift one picture layer at each bay | Full living-frame platformer |
| 06 | Match four artifacts before the run | Traverse four visibly built lanes |
| 07 | Hold Reveal at three safe stops | Reveal, run, cool, and recover |
| 08 | Use familiar contextual actions | Short synthesis; no new control |

## Tuning rule

Tuning belongs in `src/experiences/<slug>/tuning.js`. The final duration bands
and difficulty targets live in `FINAL-PRODUCT-GOAL.md`; source values that
differ remain matrix gaps until reconciled.
