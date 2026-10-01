# Page 05 — Tiny Platformer Diorama

Status: active design-intent packet

Final contract: `../../FINAL-PRODUCT-GOAL.md`.
Slug: `tiny-platformer-diorama`
Route: `/ar/tiny-platformer-diorama/`
Debug route: `/debug/ar/tiny-platformer-diorama/`
Print source: `print/magazine-pages/05-tiny-platformer-diorama.md`
Runtime source: `src/experiences/tiny-platformer-diorama/`
QR title: Scan to Play the Tiny World
Reward: Tiny Portal Badge
Primary verbs: shift, jump, enter

## DNA

Page 05 is the hero living-picture-frame experience: the player rearranges a
layered paper world, then platforms through the route they created.

## Design doc

The print page should feel like an exhibit case containing a miniature world. Use platform silhouettes, tiny hazards, labels, and a readable QR callout. Keep the page energetic without losing museum/exhibit framing.

## Projected assets

| Asset | Status | Use |
|---|---|---|
| Conservator's Impossible Portal frame | planned | print/page and hero landmark identity |
| layered paper route modules | needed | three shiftable picture routes |
| hazard sprites | needed | challenge objects |
| goal gate sprite | needed | completion target |
| Tiny Portal Badge icon | needed | reward UI |
| tiny jump/coin sounds | optional | game feedback |

## Full outline

1. Reader scans the diorama page.
2. Start gate introduces the tiny world.
3. The Conservator's Impossible Portal opens into three short planning bays.
4. At each safe bay the reader shifts one labeled picture layer into place.
5. JR auto-runs the resulting section with one Jump control and checkpoint
   recovery.
6. Reader enters the tiny final portal.
7. Tiny Portal Badge is saved to progress.

## Experience structure

```text
entry gate
  -> miniature world scene
  -> layer shift at safe bay
  -> auto-run and Jump loop
  -> goal gate
  -> portal badge reveal
  -> reward claim
```

## Game outline

Objective: shift three picture layers, traverse their routes, and enter the
goal portal.

Inputs: one contextual layer shift at safe stops; one Jump control during
auto-run; keyboard or pointer equivalents in debug.

Win state: goal gate reached, reward saved.

Soft fail: hazards can reset the tiny avatar or course segment without ending the route.

## Implementation map

- Copy: `src/experiences/tiny-platformer-diorama/copy.js`
- Level data: `src/experiences/tiny-platformer-diorama/level.js`
- Tuning: `src/experiences/tiny-platformer-diorama/tuning.js`
- Manifest: `src/experiences/tiny-platformer-diorama/index.js`

## Acceptance checklist

- Only the current layer action or Jump hero control is visible during normal
  play.
- Hazards are readable at phone size.
- A missed jump returns to the current planning-bay checkpoint without losing
  accepted layer positions.
- Completion is clear when the goal gate is reached.
- Reward name matches print/runtime/docs.
