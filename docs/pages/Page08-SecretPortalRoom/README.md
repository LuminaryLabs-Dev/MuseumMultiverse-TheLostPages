# Page 08 — The Secret Portal Room

Status: supporting content scaffold
Slug: `secret-portal-room`
Route: `/ar/secret-portal-room/`
Debug route: `/debug/ar/secret-portal-room/`
Print source: `print/magazine-pages/08-secret-portal-room.md`
Runtime source: `src/experiences/secret-portal-room/`
QR title: Scan to Unlock the Lost Room
Reward: Final Portal Key
Primary verb: light / open

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
3. The scene shows eight sockets or fragment positions.
4. Previously earned rewards light their matching sockets.
5. The reader completes the final interaction.
6. The portal room opens and awards the Final Portal Key.

## Experience structure

```text
entry gate
  -> final portal room scene
  -> eight socket progress display
  -> light/open interactions
  -> final portal reveal
  -> reward claim
```

## Game outline

Objective: light eight sockets and open the final portal.

Inputs: tap sockets or confirm final action; desktop debug click controls.

Win state: final portal opened, Final Portal Key saved.

Soft fail: missing fragments should show a partial state and guide replay without pretending completion happened.

## Implementation map

- Copy: `src/experiences/secret-portal-room/copy.js`
- Level data: `src/experiences/secret-portal-room/level.js`
- Tuning: `src/experiences/secret-portal-room/tuning.js`
- Manifest: `src/experiences/secret-portal-room/index.js`

## Acceptance checklist

- Page can show empty, partial, and complete states.
- Eight-socket progress is legible.
- Final reward does not claim missing progress.
- Reward name matches print/runtime/docs.
