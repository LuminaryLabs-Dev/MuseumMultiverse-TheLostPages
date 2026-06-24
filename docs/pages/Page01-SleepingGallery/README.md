# Page 01 — The Sleeping Gallery

Status: supporting content scaffold
Slug: `sleeping-gallery`
Route: `/ar/sleeping-gallery/`
Debug route: `/debug/ar/sleeping-gallery/`
Print source: `print/magazine-pages/01-sleeping-gallery.md`
Runtime source: `src/experiences/sleeping-gallery/`
QR title: Scan to Wake the Museum
Reward: Gallery Key Fragment
Primary verb: tap

## DNA

Page 01 is the cover and entry portal. It introduces the reader to the idea that the museum is asleep and the printed magazine can wake it. The page should feel like the first forbidden scan after hours.

## Design doc

The print page should foreground a quiet gallery wall, sleeping frames, and a clear QR portal. Use bold title hierarchy, readable scan copy, and a visual cue that five frames are waiting to be awakened. Keep the QR area clean and give the page a strong entry-cover composition.

## Projected assets

| Asset | Status | Use |
|---|---|---|
| sleeping gallery cover art | planned | print background and launcher card |
| five lit frame states | needed | AR tap targets and progress feedback |
| gallery key fragment icon | needed | reward UI |
| subtle frame glow sprite | optional | interaction feedback |
| wake chime audio | optional | reward/activation feedback |

## Full outline

1. Reader scans the cover/entry page.
2. Route opens with a Start AR gate.
3. The gallery appears asleep.
4. Five frames glow one by one or are visible as dormant tap targets.
5. Reader taps all five lit frames.
6. The gallery wakes and reveals the Gallery Key Fragment.
7. Completion is stored as the first progress slot.

## Experience structure

```text
entry gate
  -> sleeping gallery scene
  -> five frame tap targets
  -> progress count
  -> gallery wake reveal
  -> reward claim
```

## Game outline

Objective: tap five lit frames and claim the Gallery Key Fragment.

Inputs: phone tap; desktop debug click.

Win state: all frames active, reward shown, progress saved.

Soft fail: missed taps should do nothing harmful.

## Implementation map

- Copy: `src/experiences/sleeping-gallery/copy.js`
- Level data: `src/experiences/sleeping-gallery/level.js`
- Tuning: `src/experiences/sleeping-gallery/tuning.js`
- Manifest: `src/experiences/sleeping-gallery/index.js`

## Acceptance checklist

- Page 01 route opens directly.
- Start AR gate appears before immersive behavior.
- Five-frame progress is visible.
- Reward name matches print, launcher, docs, and shared progress.
- No phone/AR proof is claimed unless device-tested.
