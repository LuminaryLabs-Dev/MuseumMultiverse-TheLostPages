# Museum Multiverse: Lost Pages

An AR companion magazine for Museum Multiverse.

## What is in the repo

- `src/` contains the browser app, page data, routes, route surfaces, and authored experiences.
- `print/magazine-pages/` contains the copy source for each printed page.
- `/ar/:slug` routes launch page-specific experiences.
- `/debug/ar/:slug` and `/ar/:slug?debug=1` keep the desktop/debug surface.
- `/`, `/launcher`, `/print`, `/book`, and `/phone` currently fall through to the same shared booklet/print reader surface.
- `/book` is retained as a compatibility/static entry, not the preferred separate public review surface.
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
- `docs/STATE-ALIGNMENT-MAP.md`
- `docs/TECHNICAL-BUILD-MAP.md`
- `docs/QA-ACCEPTANCE.md`

## Run locally

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4176
```

## Build

```bash
npm run build
```

The build runs the composition check, Vite, and static route export so direct routes can open on GitHub Pages.

`package.json` is pinned to a specific NexusRealtime commit. `package-lock.json` still needs regeneration in a network-enabled environment so it matches that dependency target.

## Static routes

```text
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/launcher/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/print/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/book/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/ar/<slug>/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/debug/ar/<slug>/
```

Static route export is handled by `scripts/export-static-routes.mjs`.

## Current non-AR review direction

The shared booklet/print reader is the current source-backed non-AR surface for root, launcher, print, book, and phone route entries. It should read as a physical tabletop surface with grounded paper shadows, squared paper pages, subtle physical reactivity, and no pointer-following glow effect.

A later pass may decide whether `/book` stays as a compatibility/legacy route, redirects to `/print`, or is removed from public/static paths.

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

Use this prompt for state alignment and inference turns:

```text
agent/prompts/state-intelligence-sync.md
```

## Notes

- QR codes must point at a LAN/public HTTPS origin.
- Device-specific experience mode selection lives in NexusRealtime; Lost Pages owns copy, routes, QR, and experience manifests.
- Feedback-only turns should update feedback docs and should not change app code unless implementation is explicitly requested.
