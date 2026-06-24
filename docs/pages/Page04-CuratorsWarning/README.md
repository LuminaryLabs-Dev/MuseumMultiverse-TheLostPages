# Page 04 — The Curator's Warning

Status: supporting content scaffold
Slug: `curators-warning`
Route: `/ar/curators-warning/`
Debug route: `/debug/ar/curators-warning/`
Print source: `print/magazine-pages/04-curators-warning.md`
Runtime source: `src/experiences/curators-warning/`
QR title: Scan the Red Seal
Reward: Red Seal Note
Primary verb: restore

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
3. Missing warning words appear as fragments or tiles.
4. Reader restores the warning message.
5. The warning locks into readable form.
6. The Red Seal Note is awarded.

## Experience structure

```text
entry gate
  -> corrupted warning surface
  -> word restoration puzzle
  -> sentence lock-in
  -> warning reveal
  -> reward claim
```

## Game outline

Objective: restore warning words and read the curator's warning.

Inputs: tap/drag word fragments; desktop debug click/drag.

Win state: warning text restored, reward saved.

Soft fail: wrong placements should remain movable or clearly reject without punishing the player.

## Implementation map

- Copy: `src/experiences/curators-warning/copy.js`
- Level data: `src/experiences/curators-warning/level.js`
- Tuning: `src/experiences/curators-warning/tuning.js`
- Manifest: `src/experiences/curators-warning/index.js`

## Acceptance checklist

- Restored words are legible.
- Red seal visual identity is consistent across print and runtime.
- Completion state clearly reveals the warning.
- Reward name matches print/runtime/docs.
