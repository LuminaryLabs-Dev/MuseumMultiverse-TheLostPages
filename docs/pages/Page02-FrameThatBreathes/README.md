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

Page 02 proves that the museum's art is not static. The frame breathes, the canvas listens, and the reader learns that a printed page can be an activation ritual.

## Design doc

The print page should center a formal painting frame with subtle impossible motion cues: shifted borders, breath marks, and glyph anchors. The QR should feel like a seal attached to the frame, but it must remain clean and scannable.

## Projected assets

| Asset | Status | Use |
|---|---|---|
| breathing frame illustration | planned | print and scene identity |
| three alignment glyphs | needed | puzzle targets |
| opened canvas portal state | needed | reveal moment |
| Canvas Whisper collectible icon | needed | reward UI |
| frame inhale/exhale particles | optional | atmosphere |

## Full outline

1. Reader scans the painting page.
2. Start gate explains the frame must be opened.
3. Three glyphs appear misaligned around or within the frame.
4. Reader aligns the glyphs.
5. The painting opens or breathes outward.
6. The Canvas Whisper appears as the page reward.

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
