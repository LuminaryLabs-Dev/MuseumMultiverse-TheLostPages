# Lost Pages Game Model

Status: supporting content scaffold

## Game promise

Each page is a tiny, readable game. It should be completable in a short phone session, understandable from the page context, and connected to a collectible or story fragment.

## Universal loop

```text
see prompt
  -> perform page verb
  -> receive immediate feedback
  -> advance progress
  -> trigger reveal
  -> earn fragment
  -> persist completion
```

## Required game fields

Each page game must define:

- **Primary verb**: tap, align, catch, restore, clear, sort, reveal, unlock.
- **Objective**: what completion means.
- **Input model**: taps, drags, device movement, keyboard/mouse debug controls.
- **Progress states**: clear countable milestones.
- **Feedback**: visual, text, haptic/audio if available.
- **Win state**: reward shown and persisted.
- **Replay state**: page can be reviewed without breaking progress.
- **Failure model**: preferably soft-fail or no-fail unless a later design requires stakes.

## Design constraints

- One primary mechanic per page.
- One reward per page.
- No hidden required gesture without visible instruction.
- Debug controls must preserve desktop review.
- Phone AR behavior must be tested before being claimed.

## Eight-page mechanic ladder

| Page | Verb | Skill taught |
|---|---|---|
| 01 | Tap | Wake exhibits and claim a fragment |
| 02 | Align | Pattern recognition and portal opening |
| 03 | Catch | Motion tracking and memory reveal |
| 04 | Restore | Word/order reconstruction |
| 05 | Clear | Tiny platform challenge |
| 06 | Sort | Classification between worlds |
| 07 | Reveal/lock | Threat management |
| 08 | Light/unlock | Final progression check |

## Tuning rule

Tuning belongs in `src/experiences/<slug>/tuning.js`. Page docs should explain intent, not hardcode values that can drift silently from implementation.
