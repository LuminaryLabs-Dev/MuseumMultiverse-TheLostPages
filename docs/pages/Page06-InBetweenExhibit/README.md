# Page 06 — The In-Between Exhibit

Status: supporting content scaffold
Slug: `in-between-exhibit`
Route: `/ar/in-between-exhibit/`
Debug route: `/debug/ar/in-between-exhibit/`
Print source: `print/magazine-pages/06-in-between-exhibit.md`
Runtime source: `src/experiences/in-between-exhibit/`
QR title: Scan Between Worlds
Reward: Portal Stabilizer
Primary verb: sort

## DNA

Page 06 establishes that the museum is split between realities. Artifacts do not belong to one world anymore, and the reader must stabilize the overlap.

## Design doc

The print page should show two or more overlapping exhibit realities. Use split labels, double-exposed artifact silhouettes, and portal-edge marks. The QR block should feel like a crossing point between worlds while remaining scannable.

## Projected assets

| Asset | Status | Use |
|---|---|---|
| overlapping exhibit background | planned | print/page identity |
| artifact item sprites | needed | sort targets |
| world zone markers | needed | destination areas |
| Portal Stabilizer icon | needed | reward UI |
| portal edge particles | optional | transition feedback |
| correct/incorrect sort cues | needed | gameplay feedback |

## Full outline

1. Reader scans the in-between exhibit page.
2. Start gate explains that artifacts are misplaced.
3. Artifact targets appear between world zones.
4. Reader sorts artifacts into the correct worlds.
5. The exhibit stabilizes.
6. Portal Stabilizer is awarded and saved.

## Experience structure

```text
entry gate
  -> unstable exhibit scene
  -> artifact sorting loop
  -> world-zone feedback
  -> stabilized reveal
  -> reward claim
```

## Game outline

Objective: sort artifacts into matching worlds.

Inputs: drag/tap artifacts into zones; desktop debug drag/click.

Win state: required artifacts sorted, stabilization reveal shown, reward saved.

Soft fail: incorrect sorting should give feedback and return the artifact to the unsorted state.

## Implementation map

- Copy: `src/experiences/in-between-exhibit/copy.js`
- Level data: `src/experiences/in-between-exhibit/level.js`
- Tuning: `src/experiences/in-between-exhibit/tuning.js`
- Manifest: `src/experiences/in-between-exhibit/index.js`

## Acceptance checklist

- Artifact categories are understandable.
- Sort feedback is immediate.
- Stabilized state is visually distinct.
- Reward name matches print/runtime/docs.
