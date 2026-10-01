# Lost Pages Full Outline

Status: supporting content scaffold

## One-line outline

An eight-page printed museum magazine becomes a sequence of QR-launched micro-experiences that wake the museum, open living frames, restore lost memories, decode curator warnings, play tiny worlds, stabilize portals, manage the canvas shadow, and open the final room.

## Reader journey

```text
Page 01: trace a map route and learn the shared Jump
Page 02: build a route with breathing-frame glyphs
Page 03: cross predictable moving sketch platforms
Page 04: restore words that become the safe route
Page 05: complete the full living-picture-frame platformer
Page 06: sort artifacts that build four route lanes
Page 07: reveal hidden routes and contain the canvas shadow
Page 08: use seven receipts to complete the final portal route
```

## Product stages

### Stage 1 — Route and content proof

- All eight slugs registered.
- Static `/ar/<slug>/` and `/debug/ar/<slug>/` routes exported.
- Launcher QR targets match public origin assumptions.
- Desktop debug route works separately from mobile AR route.

### Stage 2 — Page design proof

- Each print page has a readable hierarchy.
- Each page has a QR block with explicit scan copy.
- Page text, route copy, collectible name, and game objective stay synchronized.
- Page docs define projected assets before asset production begins.

### Stage 3 — AR/game proof

- Each route has one Start AR gate.
- Each page has a short, understandable game loop.
- Each page has a completion state and collectible/reward state.
- Debug modes expose enough state for desktop review.

### Stage 4 — Print readiness

- Print Markdown, launcher copy, route manifest, QR label, and page docs are checked for drift.
- Final QR targets use the intended public deployment origin.
- Each print page can stand alone as a magazine page without relying on the phone.
- The shared booklet/print reader is treated as the primary non-AR review/presentation surface.

### Stage 5 — Final portal readiness

- All reward slots are tracked.
- Page 08 can detect prior progress.
- The final portal room communicates empty, partial, and complete progress states.

## Page-by-page outline

| Page | Slug | Role | Interaction | Reward |
|---|---|---|---|---|
| 01 | `sleeping-gallery` | Entry portal | Trace and lock the Character Map, then complete the Jump lesson | Gallery Key Fragment |
| 02 | `frame-that-breathes` | Living painting | Match three glyphs, run their route, enter the frame | Canvas Whisper |
| 03 | `lost-childs-sketchbook` | Memory recovery | Jump across three predictable sketch platforms, reveal memory | Memory Sketch |
| 04 | `curators-warning` | Warning decode | Restore four words that build the route, read the warning | Red Seal Note |
| 05 | `tiny-platformer-diorama` | Hero picture frame | Shift three layers and traverse the living-frame course | Tiny Portal Badge |
| 06 | `in-between-exhibit` | Reality sorting | Match four artifacts, run their lanes, seal the exhibit | Portal Stabilizer |
| 07 | `monster-behind-canvas` | Canvas shadow encounter | Reveal three path parts, traverse them, seal the canvas | Shadow Exhibit Fragment |
| 08 | `secret-portal-room` | Finale | Verify seven receipts, complete three familiar phases, enter portal | Final Portal Key |

## Current active direction

Active feedback prefers the shared booklet/print reader over a dedicated 3D book view for public non-AR review and presentation.

Source-backed implementation state:

- root, launcher, print, book, and phone route entries currently share the booklet/print reader surface
- `/book/` remains as a compatibility/static route entry, not as the preferred separate public review surface
- tabletop/paper styling, grounded paper shadows, no pointer-following glow, subtle physical motion direction, and a first-pass opening/settling transition are source-backed

Fresh 2026-08-08 validation:

- production build and 22-route export passed
- desktop and mobile-sized reader samples passed
- Page 01 full direct simulator player slice and Page 02 legacy debug loop passed
- sampled public routes and the deployed Page 02 QR origin passed

Pending validation and decisions:

- complete all eight debug loops and prove phone-camera, WebXR, physical
  placement, accessibility, recovery, save/reset, and performance behavior
- keep `/book/` as a hidden compatibility/static alias to the shared reader
- judge the physical opening/settling transition in browser/device preview before polishing it further

Do not mark these active feedback themes processed until implementation and validation evidence exist.

## Final outcome

The finished repo should support a printed eight-page artifact, a phone-friendly launcher, a primary print/booklet review surface, direct AR routes for every QR code, desktop debug routes, short deploy messages, and durable agent handoff state.

The objective shared gameplay, UX, duration, save, simulator, accessibility,
spatial-host, art, and release contract lives in `FINAL-PRODUCT-GOAL.md`.
