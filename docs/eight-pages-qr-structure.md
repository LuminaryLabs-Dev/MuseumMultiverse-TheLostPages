# Eight Pages QR Structure

Status: active route map

Lost Pages is an eight-page printed AR companion. The registry is the route
authority; the table below mirrors the current manifests and does not claim
that every experience is complete.

Each page should have one QR target. Each target should resolve to a static route in the deployed Pages build.

## Current Page Map

| Page | Runtime title | Slug | Current interaction | Reward |
|---:|---|---|---|---|
| 01 | The Character Map | `sleeping-gallery` | Place and unfold a wall map, solve its maze, claim the fragment. | Gallery Key Fragment |
| 02 | The Frame That Breathes | `frame-that-breathes` | Place the frame, align three glyphs, open it. | Canvas Whisper |
| 03 | The Lost Child's Sketchbook | `lost-childs-sketchbook` | Place the page, catch three sketches, reveal the memory. | Memory Sketch |
| 04 | The Curator's Warning | `curators-warning` | Place the warning, restore four words, read it. | Red Seal Note |
| 05 | Tiny Platformer Diorama | `tiny-platformer-diorama` | Place the course, clear three hazards, enter the gate. | Tiny Portal Badge |
| 06 | The In-Between Exhibit | `in-between-exhibit` | Place the board, sort four artifacts, stabilize it. | Portal Stabilizer |
| 07 | The Monster Behind the Canvas | `monster-behind-canvas` | Place the canvas, pulse three symbols, lock it. | Shadow Exhibit Fragment |
| 08 | The Secret Portal Room | `secret-portal-room` | Place the portal, light eight sockets, unlock it. | Final Portal Key |

Page 01 is the substantial Character Map vertical slice. Pages 02-08 are small
debug-playable demos. See `CURRENT-STATE.md` for proof and gaps; Pass 3 may
revise the final interaction contract without changing route identity.

## Route Families

- `/launcher/`, `/book/`, `/print/`, `/phone/`, and `/` currently open the
  shared reader surface.
- `/ar/<slug>/` opens a QR-launched AR route.
- `/debug/ar/<slug>/` opens a desktop debug route.

## Static Export Requirement

GitHub Pages needs a static `index.html` at each direct route that a phone may open.

The build exports route copies for the shared entries, AR slugs, debug AR
slugs, and the Page 01 simulator.

## Page Mapping Rule

The source of truth for AR route slugs is the experience registry.

When an experience is added, removed, or renamed, update this map,
`TRACEABILITY-MATRIX.md`, static export, print copy, and QR targets together.
