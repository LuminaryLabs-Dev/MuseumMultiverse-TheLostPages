# Lost Pages Traceability Matrix

Status: supporting content scaffold

This matrix keeps page docs, slugs, routes, print files, runtime files, rewards, and QR intent aligned.

| Page | Page folder | Slug | Print file | Source module | QR route | Debug route | Reward |
|---|---|---|---|---|---|---|---|
| 01 | `docs/pages/Page01-SleepingGallery/` | `sleeping-gallery` | `print/magazine-pages/01-sleeping-gallery.md` | `src/experiences/sleeping-gallery/` | `/ar/sleeping-gallery/` | `/debug/ar/sleeping-gallery/` | Gallery Key Fragment |
| 02 | `docs/pages/Page02-FrameThatBreathes/` | `frame-that-breathes` | `print/magazine-pages/02-frame-that-breathes.md` | `src/experiences/frame-that-breathes/` | `/ar/frame-that-breathes/` | `/debug/ar/frame-that-breathes/` | Canvas Whisper |
| 03 | `docs/pages/Page03-LostChildsSketchbook/` | `lost-childs-sketchbook` | `print/magazine-pages/03-lost-childs-sketchbook.md` | `src/experiences/lost-childs-sketchbook/` | `/ar/lost-childs-sketchbook/` | `/debug/ar/lost-childs-sketchbook/` | Memory Sketch |
| 04 | `docs/pages/Page04-CuratorsWarning/` | `curators-warning` | `print/magazine-pages/04-curators-warning.md` | `src/experiences/curators-warning/` | `/ar/curators-warning/` | `/debug/ar/curators-warning/` | Red Seal Note |
| 05 | `docs/pages/Page05-TinyPlatformerDiorama/` | `tiny-platformer-diorama` | `print/magazine-pages/05-tiny-platformer-diorama.md` | `src/experiences/tiny-platformer-diorama/` | `/ar/tiny-platformer-diorama/` | `/debug/ar/tiny-platformer-diorama/` | Tiny Portal Badge |
| 06 | `docs/pages/Page06-InBetweenExhibit/` | `in-between-exhibit` | `print/magazine-pages/06-in-between-exhibit.md` | `src/experiences/in-between-exhibit/` | `/ar/in-between-exhibit/` | `/debug/ar/in-between-exhibit/` | Portal Stabilizer |
| 07 | `docs/pages/Page07-MonsterBehindCanvas/` | `monster-behind-canvas` | `print/magazine-pages/07-monster-behind-canvas.md` | `src/experiences/monster-behind-canvas/` | `/ar/monster-behind-canvas/` | `/debug/ar/monster-behind-canvas/` | Shadow Exhibit Fragment |
| 08 | `docs/pages/Page08-SecretPortalRoom/` | `secret-portal-room` | `print/magazine-pages/08-secret-portal-room.md` | `src/experiences/secret-portal-room/` | `/ar/secret-portal-room/` | `/debug/ar/secret-portal-room/` | Final Portal Key |

## Drift check

Before printing or deploying a page-specific change, compare this table against:

- `src/ar/registry/experiences.js`
- `src/experiences/<slug>/copy.js`
- `src/experiences/shared/rewards.js`
- `print/magazine-pages/`
- launcher QR generation
- static route export
