# Lost Pages State Intelligence Ledger

Status: active
Last updated: 2026-06-25

## Current True State

- `/print/` is the primary review path.
- `/book/` remains as a legacy composition route.
- `/print/` now renders as a one-page comic booklet reader with a title/opening beat and panel reveal controls.
- Launcher and print surfaces now create a NexusRealtime `createRealtimeGame()` instance.
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
- Confirm the paper background and fallback behavior on representative browsers.
- Decide final `/book/` route treatment.
- Keep DOM text, controls, and QR output readable.
- Do not reintroduce cursor glow or stripe backgrounds.

## Recently Implemented

- One-page booklet reader.
- Panel reveal controls.
- Local service kit scaffolding.
- NexusRealtime game mounting for launcher/print surfaces.
- Composition check script in the build path.

## Validation Boundary

- Source was pushed to `main`.
- Source was inspected through the GitHub connector.
- Build and browser preview were not run here.

## Recommended Next Turn

Run dependency hygiene and QA: `npm install`, regenerate `package-lock.json`, run `npm run check:composition`, run `npm run build`, preview `/launcher/`, `/print/`, and `/book/`, then process feedback only after evidence passes.
