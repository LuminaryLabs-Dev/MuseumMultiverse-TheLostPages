# Page 03 — The Lost Child's Sketchbook

Status: active design-intent packet

Final contract: `../../FINAL-PRODUCT-GOAL.md`.
Slug: `lost-childs-sketchbook`
Route: `/ar/lost-childs-sketchbook/`
Debug route: `/debug/ar/lost-childs-sketchbook/`
Print source: `print/magazine-pages/03-lost-childs-sketchbook.md`
Runtime source: `src/experiences/lost-childs-sketchbook/`
QR title: Scan the Forgotten Drawing
Reward: Memory Sketch
Primary verbs: jump, reveal

## DNA

Page 03 shifts from gallery mystery to personal memory. The museum contains a lost child's sketchbook, and the drawings are trying to escape before the memory disappears.

## Design doc

The print page should look like a torn sketchbook insert placed inside the magazine. Use pencil marks, margin notes, creature doodles, and a clean QR block. Keep sketch texture light enough for readability.

## Projected assets

| Asset | Status | Use |
|---|---|---|
| sketchbook page background | planned | print/page identity |
| sketch creature/platform sprites | needed | predictable moving platforms |
| memory reveal illustration | needed | completion moment |
| Memory Sketch collectible icon | needed | reward UI |
| pencil trail particles | optional | movement feedback |

## Full outline

1. Reader scans the sketchbook page.
2. Start gate frames the forgotten drawing.
3. Glide, Lift, and Loop sketch creatures become predictable moving platforms.
4. JR auto-runs while the reader uses Jump to cross them; safe landings record
   their impressions automatically.
5. At the final static landing, the reader reveals the memory.
6. The Memory Sketch is awarded and saved.

## Experience structure

```text
entry gate
  -> sketchbook scene
  -> predictable moving-platform loop
  -> checkpoint-safe Jump progress
  -> memory reveal
  -> reward claim
```

## Game outline

Objective: cross three moving sketch platforms and reveal the memory.

Inputs: shared Jump on phone; keyboard/pointer debug equivalent; explicit
Reveal Memory at the safe goal.

Win state: all three platforms crossed, memory revealed, reward saved.

Soft fail: restore the exact platform phase at the last checkpoint and retry.

## Implementation map

- Copy: `src/experiences/lost-childs-sketchbook/copy.js`
- Level data: `src/experiences/lost-childs-sketchbook/level.js`
- Tuning: `src/experiences/lost-childs-sketchbook/tuning.js`
- Manifest: `src/experiences/lost-childs-sketchbook/index.js`

## Acceptance checklist

- Moving-platform paths, direction, and safe saddles are easy to distinguish
  from background texture.
- Platform timing and checkpoint recovery are visible.
- Memory reveal communicates completion.
- Reward name matches print/runtime/docs.
