# Lost Pages Pitch Deck

Status: markdown source deck
Audience: collaborators, stakeholders, creative leads, technical agents

## Slide 01 — Title

**Museum Multiverse: Lost Pages**

A printed AR companion magazine where each page opens a tiny haunted museum experience.

## Slide 02 — The hook

A reader scans a page and the museum answers back.

Every page is a physical artifact, a story beat, and a launch point for a page-specific AR/web interaction.

## Slide 03 — The product

Lost Pages is an eight-page printed magazine with one QR portal per page.

```text
scan page -> open route -> play micro-experience -> earn fragment -> unlock final room
```

## Slide 04 — Why it works

- Print gives the experience a collectible object.
- QR keeps access simple and phone-native.
- AR/web scenes add motion, surprise, and game logic.
- Debug routes make the project reviewable on desktop.
- Static GitHub Pages deployment keeps the prototype public and shareable.

## Slide 05 — The audience

- Readers holding the printed magazine.
- Museum/event visitors scanning pages on a phone.
- Reviewers checking desktop debug modes.
- Agents and contributors extending the project.

## Slide 06 — The world

The museum is asleep, unstable, and full of exhibits that remember things they should not. Frames breathe. Sketches escape. Warnings reassemble. Dioramas become playable worlds. A final portal waits behind the last page.

## Slide 07 — Eight-page arc

1. Wake the gallery.
2. Open the breathing frame.
3. Restore the child's sketch memory.
4. Decode the curator's warning.
5. Play the tiny platformer diorama.
6. Sort artifacts between worlds.
7. Contain the monster behind the canvas.
8. Unlock the secret portal room.

## Slide 08 — Interaction model

Each page has one short verb:

- tap
- align
- catch
- restore
- jump/clear
- sort
- reveal/lock
- light/unlock

## Slide 09 — Visual direction

Readable comic-book museum design. Bold page rhythm. Subtle motion. Strong contrast. Avoid heavy sepia, overbuilt PDF styling, or decorative clutter that weakens the scan/read/play loop.

## Slide 10 — Technical shape

- Vite static app.
- Direct route exports for GitHub Pages.
- `src/ar/registry/experiences.js` as slug source of truth.
- `src/experiences/<slug>/` for page-specific content, level, tuning, and manifest.
- NexusRealtime for reusable runtime behavior.

## Slide 11 — Production needs

- Final print page designs.
- QR validation.
- Per-page art and UI assets.
- AR scene polish.
- Copy sync between print and runtime.
- Desktop and phone QA.

## Slide 12 — Success state

A person can pick up the magazine, scan any page, enter the correct public route, complete the page's interaction, and understand how the fragment contributes to the final portal.
