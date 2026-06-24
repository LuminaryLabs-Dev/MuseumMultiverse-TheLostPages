# Page 03 — The Lost Child's Sketchbook

Status: supporting content scaffold
Slug: `lost-childs-sketchbook`
Route: `/ar/lost-childs-sketchbook/`
Debug route: `/debug/ar/lost-childs-sketchbook/`
Print source: `print/magazine-pages/03-lost-childs-sketchbook.md`
Runtime source: `src/experiences/lost-childs-sketchbook/`
QR title: Scan the Forgotten Drawing
Reward: Memory Sketch
Primary verb: catch

## DNA

Page 03 shifts from gallery mystery to personal memory. The museum contains a lost child's sketchbook, and the drawings are trying to escape before the memory disappears.

## Design doc

The print page should look like a torn sketchbook insert placed inside the magazine. Use pencil marks, margin notes, creature doodles, and a clean QR block. Keep sketch texture light enough for readability.

## Projected assets

| Asset | Status | Use |
|---|---|---|
| sketchbook page background | planned | print/page identity |
| sketch creature sprites | needed | catch targets |
| memory reveal illustration | needed | completion moment |
| Memory Sketch collectible icon | needed | reward UI |
| pencil trail particles | optional | movement feedback |

## Full outline

1. Reader scans the sketchbook page.
2. Start gate frames the forgotten drawing.
3. Sketch creatures appear or drift across the scene.
4. Reader catches the required creatures.
5. The drawing resolves into a memory.
6. The Memory Sketch is awarded and saved.

## Experience structure

```text
entry gate
  -> sketchbook scene
  -> creature movement loop
  -> catch progress
  -> memory reveal
  -> reward claim
```

## Game outline

Objective: catch sketch creatures and reveal a memory.

Inputs: phone tap/drag; desktop click/hover debug as appropriate.

Win state: required creatures caught, memory revealed, reward saved.

Soft fail: creatures can loop or respawn rather than creating a hard failure.

## Implementation map

- Copy: `src/experiences/lost-childs-sketchbook/copy.js`
- Level data: `src/experiences/lost-childs-sketchbook/level.js`
- Tuning: `src/experiences/lost-childs-sketchbook/tuning.js`
- Manifest: `src/experiences/lost-childs-sketchbook/index.js`

## Acceptance checklist

- Creature targets are easy to distinguish from background texture.
- Catch progress is visible.
- Memory reveal communicates completion.
- Reward name matches print/runtime/docs.
