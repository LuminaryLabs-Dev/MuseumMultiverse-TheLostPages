# Page 04 — The Curator's Warning

Status: active design-intent packet

Final contract: `../../FINAL-PRODUCT-GOAL.md`.
Slug: `curators-warning`
Route: `/ar/curators-warning/`
Debug route: `/debug/ar/curators-warning/`
Print source: `print/magazine-pages/04-curators-warning.md`
Runtime source: `src/experiences/curators-warning/`
QR title: Scan the Red Seal
Reward: Red Seal Note
Primary verbs: restore, jump, read

## DNA

Page 04 is the museum's warning system. It should feel official, urgent, and partially corrupted, as if a curator left a sealed instruction that the museum itself tried to erase.

## Design doc

Use red seal language, warning labels, partial blackouts, stamped typography, and restored-word gaps. The print page should look like a document that was both preserved and censored. QR placement should feel like part of the seal system.

## Projected assets

| Asset | Status | Use |
|---|---|---|
| red seal emblem | needed | print and AR identity |
| warning word tiles | needed | restore mechanic |
| corrupted text strips | needed | incomplete state |
| Red Seal Note collectible icon | needed | reward UI |
| stamp impact effect | optional | completion feedback |

## Full outline

1. Reader scans the red seal.
2. Start gate warns that the message is incomplete.
3. At four safe stops the reader restores FOLLOW, VOICES, SEALED, and WING.
4. Each accepted word builds the next route segment.
5. JR auto-runs between stops with the shared Jump.
6. The reader reaches the perch and reads the untimed warning.
7. The Red Seal Note is awarded.

## Experience structure

```text
entry gate
  -> corrupted warning surface
  -> word-built route and shared Jump
  -> grounded reading perch
  -> warning reveal
  -> reward claim
```

## Game outline

Objective: restore four words, traverse the route they build, and read the
curator's warning.

Inputs: tap/drag or select one obvious word at a safe stop; shared Jump during
auto-run; desktop keyboard/pointer equivalents.

Win state: warning text restored, reward saved.

Soft fail: wrong placements should remain movable or clearly reject without punishing the player.

## Implementation map

- Copy: `src/experiences/curators-warning/copy.js`
- Level data: `src/experiences/curators-warning/level.js`
- Tuning: `src/experiences/curators-warning/tuning.js`
- Manifest: `src/experiences/curators-warning/index.js`

## Acceptance checklist

- Restored words are legible.
- Each accepted word visibly creates the matching route segment.
- Red seal visual identity is consistent across print and runtime.
- Completion state clearly reveals the warning.
- Reward name matches print/runtime/docs.
