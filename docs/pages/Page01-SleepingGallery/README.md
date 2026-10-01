# Page 01 — The Character Map

Status: current vertical-slice packet

Final target: `../../FINAL-PRODUCT-GOAL.md`. This packet records the current
Character Map slice; the final target extends it into the shared
Plan-Run-Reward and Jump grammar.
Slug: `sleeping-gallery`
Route: `/ar/sleeping-gallery/`
Debug route: `/debug/ar/sleeping-gallery/`
Simulator route: `/sim/ar/sleeping-gallery/`
Print source: `print/magazine-pages/01-sleeping-gallery.md`
Runtime source: `src/experiences/sleeping-gallery/`
QR title: Scan to Find the Maze
Reward: Gallery Key Fragment
Primary verbs: place, swipe, claim

## DNA

Page 01 is the current reference slice. A shy visitor unfolds a living character
map on a museum wall, guides its character through a deterministic maze, and
awakens the first fragment. It introduces placement, readable spatial play,
and the cross-page reward arc.

## Design doc

The final print page should foreground the folded character map, maze heart,
first-fragment promise, and a clean QR portal. The current print Markdown still
describes the superseded five-frame interaction; that copy drift is open for
Pass 3 and must not be treated as current runtime behavior.

## Projected assets

| Asset | Status | Use |
|---|---|---|
| Character Map reader art | source-backed | current dedicated reader page |
| 121 maze regions | implemented primitive/canvas | deterministic maze state |
| folded wall map | implemented primitive/canvas | placement and unfold state |
| maze character and heart | implemented primitive/canvas | movement and goal readability |
| Gallery Key Fragment identity | functional placeholder | reward feedback and progression |
| final map, character, heart, and reward art | pending | Pass 10 visual production |
| movement, unfold, solve, and reward audio | optional/pending | polish feedback |

## Full outline

1. Reader scans the cover/entry page and opens the route.
2. Reader starts the experience and finds a clear wall.
3. Reader places and unfolds the Character Map.
4. Reader swipes the character through the 11-by-11 maze.
5. Reaching the maze heart awakens the Gallery Key Fragment.
6. Reader claims the fragment and reaches completion.

## Experience structure

```text
entry gate
  -> find wall
  -> place and unfold map
  -> swipe through deterministic maze
  -> reach maze heart
  -> reward claim
```

## Game outline

Objective: unfold the wall map, reach the maze heart, and claim the Gallery Key
Fragment.

Inputs: phone swipe/pointer; desktop debug controls.

Win state: maze solved, reward claimed, experience state complete.

Recovery target: an invalid maze move must preserve a readable state and allow
the player to continue or reset. Final failure/recovery acceptance remains a
Pass 3 decision.

## Implementation map

- Copy: `src/experiences/sleeping-gallery/copy.js`
- Level data: `src/experiences/sleeping-gallery/level.js`
- Tuning: `src/experiences/sleeping-gallery/tuning.js`
- Manifest: `src/experiences/sleeping-gallery/index.js`

## Acceptance checklist

- Page 01 route opens directly.
- Start gate appears before immersive behavior.
- Debug flow reaches find, place, unfold, solve, claim, and complete.
- Maze generation is deterministic for the declared seed.
- The manifest declares 121 map regions plus map, character, heart, and reward.
- Reward name matches print, launcher, docs, and shared progress.
- Simulator completes without camera access.
- Physical wall AR, phone camera, and tracking are not claimed until
  device-tested.
