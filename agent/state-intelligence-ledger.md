# Lost Pages State Intelligence Ledger

Status: active
Last updated: 2026-06-25

## Current True State

- Root, launcher, print, and book paths now resolve to the booklet reader surface.
- AR and debug routes remain separate.
- The booklet reader is one page at a time, with a title/opening beat and panel reveal controls.
- The booklet now uses a flat glossy flipbook treatment with sharp page edges.
- The cover turns first, then active pages flip vertically through a small visible stack.
- Launcher and print surfaces create a NexusRealtime `createRealtimeGame()` instance.
- Local runtime kits install services for route mapping, paper surface mounting, booklet navigation, and panel sequence state.
- `package.json` is pinned to NexusRealtime commit `ebd19e298d71bfbc51bf452394085ce1d909cb94`.
- `package-lock.json` still needs regeneration in a network-enabled environment.

## Mounted Local Services

```text
engine.n.routeQr
engine.n.paperSurface
engine.n.bookletReader
engine.n.comicPanel
```

## Local Domain Sources

```text
src/domains/route-qr/
src/domains/paper-surface/
src/domains/booklet-reader/
src/domains/comic-panel/
src/domains/progress/
src/domains/launch/
src/kits/
```

## Active Feedback Still Open

- Validate the booklet reader in build and preview.
- Confirm root, launcher, print, and book paths all show the same booklet surface.
- Confirm the paper background and fallback behavior on representative browsers.
- Keep DOM text, controls, and QR output readable.
- Do not reintroduce cursor glow or stripe backgrounds.

## Recently Implemented

- Single default booklet surface for public non-AR paths.
- Flat glossy flipbook styling.
- Cover-turn-first treatment.
- Vertical deck/page flip motion.
- Local service kit scaffolding.
- NexusRealtime game mounting for launcher/print surfaces.
- Composition check script in the build path.

## Validation Boundary

- Source was pushed to `main`.
- Source was inspected through the GitHub connector.
- Build and browser preview were not run here.

## Recommended Next Turn

Run dependency hygiene and QA: `npm install`, regenerate `package-lock.json`, run `npm run check:composition`, run `npm run build`, preview root, launcher, print, and book paths, then process feedback only after evidence passes.
