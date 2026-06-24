# Page 05 — Tiny Platformer Diorama

Status: supporting content scaffold
Slug: `tiny-platformer-diorama`
Route: `/ar/tiny-platformer-diorama/`
Debug route: `/debug/ar/tiny-platformer-diorama/`
Print source: `print/magazine-pages/05-tiny-platformer-diorama.md`
Runtime source: `src/experiences/tiny-platformer-diorama/`
QR title: Scan to Play the Tiny World
Reward: Tiny Portal Badge
Primary verb: clear

## DNA

Page 05 makes the museum playful. A diorama becomes a tiny platform world, turning the exhibit into a small game inside the printed magazine.

## Design doc

The print page should feel like an exhibit case containing a miniature world. Use platform silhouettes, tiny hazards, labels, and a readable QR callout. Keep the page energetic without losing museum/exhibit framing.

## Projected assets

| Asset | Status | Use |
|---|---|---|
| diorama case illustration | planned | print/page identity |
| tiny platform tiles | needed | playable world |
| hazard sprites | needed | challenge objects |
| goal gate sprite | needed | completion target |
| Tiny Portal Badge icon | needed | reward UI |
| tiny jump/coin sounds | optional | game feedback |

## Full outline

1. Reader scans the diorama page.
2. Start gate introduces the tiny world.
3. A small platform course appears.
4. Reader clears hazards and reaches the goal gate.
5. The tiny world opens a portal badge reward.
6. Tiny Portal Badge is saved to progress.

## Experience structure

```text
entry gate
  -> miniature world scene
  -> platform/hazard loop
  -> goal gate
  -> portal badge reveal
  -> reward claim
```

## Game outline

Objective: clear tiny hazards and enter the goal gate.

Inputs: tap/press/jump controls on phone; keyboard or click controls in debug.

Win state: goal gate reached, reward saved.

Soft fail: hazards can reset the tiny avatar or course segment without ending the route.

## Implementation map

- Copy: `src/experiences/tiny-platformer-diorama/copy.js`
- Level data: `src/experiences/tiny-platformer-diorama/level.js`
- Tuning: `src/experiences/tiny-platformer-diorama/tuning.js`
- Manifest: `src/experiences/tiny-platformer-diorama/index.js`

## Acceptance checklist

- Controls are visible before play begins.
- Hazards are readable at phone size.
- Completion is clear when the goal gate is reached.
- Reward name matches print/runtime/docs.
