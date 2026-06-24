# Museum Multiverse: Lost Pages

An AR companion magazine for Museum Multiverse.

## What is in the repo

- `src/` contains the browser app, page data, routes, and AR integration.
- `print/magazine-pages/` contains the copy source for each printed page.
- `/ar/:slug` routes launch page-specific immersive AR experiences.
- `/debug/ar/:slug` and `/ar/:slug?debug=1` keep the desktop debug surface.
- `/book` renders the full composition-book reference page.
- `docs/` contains project docs.
- `agent/` contains long-running repo-local operating state.

## Key docs

- `docs/project-overview.md`
- `docs/eight-pages-qr-structure.md`
- `docs/repository-map.md`
- `docs/nexusrealtime-dependencies.md`
- `docs/deployment-and-discord.md`
- `docs/feedback-loop.md`
- `docs/agent-operating-model.md`

## Run locally

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4176
```

## Build

```bash
npm run build
```

The build runs Vite and exports static route copies into `dist/` so direct phone routes can open on GitHub Pages.

## Static phone routes

```text
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/launcher/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/ar/<slug>/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/debug/ar/<slug>/
```

Static route export is handled by `scripts/export-static-routes.mjs`.

## Deploy

This repo deploys from `main` with GitHub Actions.

Workflow file:

```text
.github/workflows/deploy-lost-pages.yml
```

The workflow builds `dist/`, exports direct static routes, uploads the Pages artifact, deploys to Pages, and sends the short message from `output.md`.

Set Pages to:

```text
Settings → Pages → Build and deployment → Source → GitHub Actions
```

## Agent operating folder

The preferred hidden folder name would be `.agent/`, but hidden path writes were blocked during setup. This repository uses `agent/` as the repo-local agent operating folder.

Start future agent work from:

```text
agent/start-here.md
agent/pointer.md
agent/workflow.md
```

## Notes

- QR codes must point at a LAN/public HTTPS origin.
- Normal QR scans show one `Start AR` gate, then full-screen AR.
- Device-specific AR mode selection lives in `NexusRealtime`; Lost Pages owns copy, routes, QR, and experience manifests.
