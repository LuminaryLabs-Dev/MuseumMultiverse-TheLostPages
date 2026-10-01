# Page 08 — The Secret Portal Room

Status: active design-intent packet

Final contract: `../../FINAL-PRODUCT-GOAL.md`.
Slug: `secret-portal-room`
Route: `/ar/secret-portal-room/`
Debug route: `/debug/ar/secret-portal-room/`
Print source: `print/magazine-pages/08-secret-portal-room.md`
Runtime source: `src/experiences/secret-portal-room/`
QR title: Scan to Unlock the Lost Room
Reward: Final Portal Key
Primary verbs: familiar context, jump, enter

## DNA

Page 08 is the finale and back-page portal. It should make the magazine feel like a completed museum artifact. The prior seven fragments matter here, and the final scene should show empty, partial, and complete progress states.

## Design doc

The print page should frame the final portal room as a mysterious threshold. Use eight socket positions, door geometry, final-room signage, and a clean QR callout. The page must still read as the back/final page of the printed artifact.

## Projected assets

| Asset | Status | Use |
|---|---|---|
| secret portal room illustration | planned | print/page identity |
| eight socket states | needed | progress visualization |
| final portal door states | needed | scene progression |
| Final Portal Key icon | needed | reward UI |
| fragment constellation overlay | optional | progress connection |
| portal completion audio | optional | completion feedback |

## Full outline

1. Reader scans the final page.
2. Start gate introduces the final room.
3. The hub shows seven prior reward sockets and one reserved Final Portal Key
   socket.
4. Fewer than seven receipts exposes exact missing pages and Continue Journey.
5. Seven receipts unlock a three-phase route using only familiar actions and
   the shared Jump.
6. Reader enters the restored portal.
7. Page 08 completion creates slot eight and awards the Final Portal Key.

## Experience structure

```text
entry gate
  -> final portal room scene
  -> seven-receipt eligibility display
  -> three familiar route phases
  -> final portal reveal
  -> reward claim
```

## Game outline

Objective: verify seven earlier rewards, complete the familiar final route,
and enter the restored portal.

Inputs: familiar contextual actions at safe stops, shared Jump during auto-run,
and explicit final portal entry.

Win state: final portal opened, Final Portal Key saved.

Soft fail: missing fragments should show a partial state and guide replay without pretending completion happened.

## Implementation map

- Copy: `src/experiences/secret-portal-room/copy.js`
- Level data: `src/experiences/secret-portal-room/level.js`
- Tuning: `src/experiences/secret-portal-room/tuning.js`
- Manifest: `src/experiences/secret-portal-room/index.js`

## Acceptance checklist

- Page can show empty, partial, and complete states.
- Seven prior sockets and the reserved eighth key socket are distinguishable.
- Final reward is created only after the finale and never gates its own start.
- Reward name matches print/runtime/docs.
