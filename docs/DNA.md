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

Inside every route, the final shared gameplay rhythm is:

```text
Plan with one page action
  -> auto-run with one Jump control
  -> use context only at safe stops
  -> persist reward
```

Page 05 is the full living-picture-frame platformer; Page 02 teaches that
language and Page 08 uses a small mastered subset.

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
- The dedicated 3D book implementation is no longer the preferred public
  review surface; `/book/` remains a hidden compatibility/static alias to the
  shared reader.
- The print/booklet reader should feel like paper on a physical tabletop.
- Avoid flat digital-grid backgrounds and pointer-following glow effects.
- Use grounded shadows and subtle physical parallax/orientation when motion is needed.
- A first-pass opening/settling transition into the shared booklet/print reader exists, but it still needs browser/device review before further polish.

## Current implementation versus pending direction

Current source-backed public non-AR behavior sends root, launcher, print, book,
and phone entries to the shared booklet/print reader surface. The production
build, desktop and mobile-sized reader samples, representative debug routes,
and sampled public routes were validated on 2026-08-08. Real phone-camera,
WebXR, physical-placement, accessibility, and lower-end-device proof remain
open.

The final `/book/` decision is to keep the current compatibility/static alias
while hiding it from primary navigation.

## Ownership boundary

Lost Pages owns story, pages, copy, slugs, QR structure, print layout, AR
manifests, collectibles, authored descriptors, and browser/render adapters.
NexusEngine owns reusable renderer-independent domain and simulation contracts.
Three.js, DOM, canvas, camera, WebXR, storage providers, and platform lifecycle
remain explicit Lost Pages host concerns unless a separately approved shared
adapter is promoted.

## Completion arc

The eight pages should feel like a sequence of museum thresholds. Pages 01-07 teach the reader how the haunted museum works. Page 08 resolves the loop by using the collected fragments to unlock the final portal room.
