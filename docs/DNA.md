# Museum Multiverse: Lost Pages DNA

Status: supporting content scaffold
Owner: project/product docs, not `agent/`

## Core identity

Lost Pages is a printed AR companion magazine for Museum Multiverse. The artifact is a small, strange, readable magazine that behaves like a museum object: every printed page contains a QR portal into a page-specific interactive scene.

## Product promise

A reader should be able to hold the printed magazine, scan one page, enter one focused AR/web interaction, earn or reveal one story fragment, and understand how that page contributes to the final portal.

## Creative pillars

1. **Printed artifact first** — the magazine page must work as a designed object before the phone is involved.
2. **QR as portal** — every QR code should feel like a doorway, not a utility sticker.
3. **Micro-game per page** — every route needs one clear action loop and one clear reward.
4. **Museum magic, not generic AR** — scenes should feel like haunted exhibit labels, living frames, curator warnings, sketchbook creatures, and hidden rooms.
5. **Readable over ornamental** — avoid overdone PDF styling, heavy sepia, unreadable texture, and dense digital backgrounds.
6. **Agent-safe structure** — every page must have docs that map DNA, design, assets, routes, game logic, and implementation files.
7. **Print view first** — the shared booklet/print reader is the primary non-AR review/presentation surface.

## Core loop

```text
printed page
  -> QR scan
  -> public static route
  -> Start AR / fallback gate
  -> page-specific interaction
  -> reward / story fragment
  -> progress toward final portal
```

## Tone

The tone is playful, eerie, handmade, and museum-specific. It should feel like a comic-book field guide discovered in a closed gallery after hours.

## Visual DNA

- Bold page hierarchy.
- Museum signage mixed with sketchbook/comic energy.
- Limited texture and readable contrast.
- Reactive motion that supports discovery rather than spectacle.
- Avoid heavy sepia as the default look.
- Page surfaces should read as squared paper, not rounded UI cards.
- The primary non-AR review/presentation surface is the shared booklet/print reader used by root, launcher, print, book, and phone entries.
- The dedicated 3D book implementation is no longer the preferred public review surface; `/book/` remains only as a compatibility/static entry until a later route decision.
- The print/booklet reader should feel like paper on a physical tabletop.
- Avoid flat digital-grid backgrounds and pointer-following glow effects.
- Use grounded shadows and subtle physical parallax/orientation when motion is needed.
- A first-pass opening/settling transition into the shared booklet/print reader exists, but it still needs browser/device review before further polish.

## Current implementation versus pending direction

Current source-backed public non-AR behavior sends root, launcher, print, book, and phone entries to the shared booklet/print reader surface. Active feedback is partially implemented in source, but not processed because build, browser, deployed-route, phone/device, paper fallback, and AR launch validation are still pending.

The unresolved product decision is the final treatment of `/book/`: keep as compatibility/legacy, redirect to `/print/`, hide from public navigation/static export, or remove.

## Ownership boundary

Lost Pages owns story, pages, copy, slugs, QR structure, print layout, AR manifests, collectibles, and page-specific tuning. NexusRealtime owns reusable runtime systems, AR/XR session behavior, device capability patterns, and reusable input/rendering abstractions.

## Completion arc

The eight pages should feel like a sequence of museum thresholds. Pages 01-07 teach the reader how the haunted museum works. Page 08 resolves the loop by using the collected fragments to unlock the final portal room.
