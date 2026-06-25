# Lost Pages Full Outline

Status: supporting content scaffold

## One-line outline

An eight-page printed museum magazine becomes a sequence of QR-launched micro-experiences that wake the museum, open living frames, restore lost memories, decode curator warnings, play tiny worlds, stabilize portals, manage the canvas shadow, and open the final room.

## Reader journey

```text
Page 01: discover the magazine is alive
Page 02: learn art can breathe and open
Page 03: recover a child's lost museum memory
Page 04: decode the curator's warning system
Page 05: play inside a miniature exhibit world
Page 06: sort artifacts between overlapping realities
Page 07: resolve the canvas shadow encounter
Page 08: use the collected fragments to open the portal room
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
- The main print view is treated as the primary non-AR review/presentation surface.

### Stage 5 — Final portal readiness

- All reward slots are tracked.
- Page 08 can detect prior progress.
- The final portal room communicates empty, partial, and complete progress states.

## Page-by-page outline

| Page | Slug | Role | Interaction | Reward |
|---|---|---|---|---|
| 01 | `sleeping-gallery` | Entry portal | Tap five lit frames | Gallery Key Fragment |
| 02 | `frame-that-breathes` | Living painting | Align three glyphs | Canvas Whisper |
| 03 | `lost-childs-sketchbook` | Memory recovery | Catch sketch creatures | Memory Sketch |
| 04 | `curators-warning` | Warning decode | Restore warning words | Red Seal Note |
| 05 | `tiny-platformer-diorama` | Playable miniature | Clear hazards and goal gate | Tiny Portal Badge |
| 06 | `in-between-exhibit` | Reality sorting | Sort artifacts by world | Portal Stabilizer |
| 07 | `monster-behind-canvas` | Canvas shadow encounter | Reveal and seal the canvas | Shadow Exhibit Fragment |
| 08 | `secret-portal-room` | Finale | Light eight sockets | Final Portal Key |

## Current active direction

Active feedback prefers the main print view over a dedicated 3D book view.

Pending implementation decisions:

- whether `/book/` should be removed, redirected, hidden, or retained as legacy/debug/experimental
- how `/print/` becomes the primary presentation route
- how the physical tabletop background, grounded shadow, non-glow reactivity, and book-opening transition are implemented

Do not mark these decisions implemented until the source and route changes are made and validated.

## Final outcome

The finished repo should support a printed eight-page artifact, a phone-friendly launcher, a primary print review/presentation surface, direct AR routes for every QR code, desktop debug routes, short deploy messages, and durable agent handoff state.
