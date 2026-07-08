# Page 02 — The Frame That Breathes

Status: supporting content scaffold
Slug: `frame-that-breathes`
Route: `/ar/frame-that-breathes/`
Debug route: `/debug/ar/frame-that-breathes/`
Print source: `print/magazine-pages/02-frame-that-breathes.md`
Runtime source: `src/experiences/frame-that-breathes/`
QR title: Scan to Open the Painting
Reward: Canvas Whisper
Primary verb: align

## DNA

Page 02 proves that the museum's art is not static. The comic page itself becomes the activation ritual: four panels of rising wonder, with the QR sealed over a central burst.

## Design doc

The print page should read as a four-panel comic beat, not a static poster. The QR sits over a central burst circle, stays clean and scannable, and lets the page feel like JR's imagination is breaking through the paper.

## Projected assets

| Asset | Status | Use |
|---|---|---|
| breathing frame illustration | planned | print and scene identity |
| three alignment glyphs | needed | puzzle targets |
| center burst QR badge | needed | page two print composition |
| opened canvas portal state | needed | reveal moment |
| Canvas Whisper collectible icon | needed | reward UI |
| frame inhale/exhale particles | optional | atmosphere |

## Full outline

1. Reader scans the painting page.
2. Start gate explains the frame must be opened.
3. Four comic panels establish JR's awe and the museum's first shift.
4. The center burst QR is revealed and scanned.
5. Three glyphs appear misaligned around or within the frame.
6. Reader aligns the glyphs and the painting opens.
7. The Canvas Whisper appears as the page reward.

## Experience structure

```text
entry gate
  -> breathing frame scene
  -> three glyph alignment puzzle
  -> alignment confirmation
  -> canvas opening reveal
  -> reward claim
```

## Game outline

Objective: align three glyphs to open the frame.

Inputs: drag/tap alignment on phone; mouse/keyboard equivalents in debug.

Win state: all glyphs aligned, canvas opens, reward saved.

Soft fail: wrong alignment should visibly drift back or remain incomplete without blocking replay.

## Implementation map

- Copy: `src/experiences/frame-that-breathes/copy.js`
- Level data: `src/experiences/frame-that-breathes/level.js`
- Tuning: `src/experiences/frame-that-breathes/tuning.js`
- Manifest: `src/experiences/frame-that-breathes/index.js`

## Acceptance checklist

- Route and debug route open the same intended page.
- Alignment targets are visible and understandable.
- Reveal state clearly differs from puzzle state.
- Reward name matches print/runtime/docs.
