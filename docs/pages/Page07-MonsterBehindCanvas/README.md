# Page 07 — The Monster Behind the Canvas

Status: active design-intent packet

Final contract: `../../FINAL-PRODUCT-GOAL.md`.
Slug: `monster-behind-canvas`
Route: `/ar/monster-behind-canvas/`
Debug route: `/debug/ar/monster-behind-canvas/`
Print source: `print/magazine-pages/07-monster-behind-canvas.md`
Runtime source: `src/experiences/monster-behind-canvas/`
QR title: Scan, But Don't Blink
Reward: Shadow Exhibit Fragment
Primary verbs: reveal, jump, seal

## DNA

Page 07 is the danger beat. The museum's hidden threat is no longer just implied: something is behind the canvas, and the reader must reveal and contain it.

## Design doc

The print page should use a strong canvas silhouette, shadow marks, warning-style scan copy, and a feeling of withheld movement. Keep the monster suggestive rather than over-rendered. The QR can sit near a warning placard or canvas label.

## Projected assets

| Asset | Status | Use |
|---|---|---|
| canvas shadow illustration | planned | print/page identity |
| monster silhouette states | needed | reveal sequence |
| reveal beam sprite | needed | interaction mechanic |
| lock/seal overlay | needed | containment state |
| Shadow Exhibit Fragment icon | needed | reward UI |
| blink/pulse effect | optional | tension feedback |

## Full outline

1. Reader scans the canvas warning page.
2. Start gate cautions the reader not to blink.
3. A canvas appears with a hidden shadow behind it.
4. At three safe stops the reader holds the reveal beam on EYE, RUNE, and MARK.
5. Each accepted reveal exposes the next route part; JR auto-runs it with Jump.
6. Reader seals the canvas at the final landing.
7. The Shadow Exhibit Fragment is awarded.

## Experience structure

```text
entry gate
  -> hidden canvas scene
  -> reveal beam loop
  -> soft heat meter and revealed route
  -> auto-run and Jump
  -> seal action
  -> reward claim
```

## Game outline

Objective: reveal three route parts, traverse them, and seal the canvas.

Inputs: Hold Reveal at safe stops; shared Jump during auto-run; desktop
keyboard/pointer equivalents.

Win state: monster exposed and canvas locked, reward saved.

Soft fail: heat limit cancels only the unaccepted reveal; accepted paths remain
and cooldown exposes one retry action.

## Implementation map

- Copy: `src/experiences/monster-behind-canvas/copy.js`
- Level data: `src/experiences/monster-behind-canvas/level.js`
- Tuning: `src/experiences/monster-behind-canvas/tuning.js`
- Manifest: `src/experiences/monster-behind-canvas/index.js`

## Acceptance checklist

- Threat state is clear without being visually noisy.
- Reveal beam feedback is readable.
- Heat failure preserves accepted route parts and exposes a clear retry.
- Lock/seal completion is unmistakable.
- Reward name matches print/runtime/docs.
