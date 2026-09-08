# Museum Multiverse: Lost Pages

An AR companion magazine for Museum Multiverse.

## Current publishing boundary

Lost Pages builds here; Website receives only the generated static release
under `/lostpages/`. See [Static release contract](docs/STATIC-RELEASE.md) for
canonical numbered links, build/stage/push commands and required release gates.
The source CI builds candidates only; it no longer auto-deploys or notifies.
The historical gameplay descriptions below describe existing prototypes, not
completion of the new eight-page joystick-and-jump comic/AR product.

## What is in the repo

- `src/` contains the browser app, page data, routes, route surfaces, and authored experiences.
- `print/magazine-pages/` contains the copy source for each printed page.
- `/ar/:slug` routes launch page-specific experiences.
- `/debug/ar/:slug` and `/ar/:slug?debug=1` keep the desktop/debug surface.
- `/sim/ar/sleeping-gallery` opens the camera-free Page 01 procedural room simulator.
- `/`, `/launcher`, `/print`, `/book`, and `/phone` currently fall through to the same shared booklet/print reader surface.
- `/book` is retained as a compatibility/static entry, not the preferred separate public review surface.
- `docs/` contains project docs.
- `agent/` contains long-running repo-local operating state.

## Key docs

- `docs/project-overview.md`
- `docs/eight-pages-qr-structure.md`
- `docs/repository-map.md`
- `docs/nexusengine-dependencies.md`
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

`package.json` and `package-lock.json` are pinned to NexusEngine commit `55b7f33f6d008b2e3b120e370f09b96ed73105e9`.

## Static routes

```text
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/launcher/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/print/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/book/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/ar/<slug>/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/debug/ar/<slug>/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/sim/ar/sleeping-gallery/
```

Static route export is handled by `scripts/export-static-routes.mjs`.

## Current non-AR review direction

The shared booklet/print reader is the current source-backed non-AR surface for root, launcher, print, book, and phone route entries. It should read as a physical tabletop surface with grounded paper shadows, squared paper pages, subtle physical reactivity, and no pointer-following glow effect.

A later pass may decide whether `/book` stays as a compatibility/legacy route, redirects to `/print`, or is removed from public/static paths.

## Deploy

Source pushes run `.github/workflows/deploy-lost-pages.yml` to validate and
archive a candidate build. They do not publish a site or send notifications.

Run `npm run build:luminary`, then `npm run stage:luminary` for a read-only
release preview. Actual staging requires the completed product and its
acceptance evidence. Website's default branch publishes the generated files
under `/lostpages/`; it does not build or contain this source application.
See [Static release contract](docs/STATIC-RELEASE.md) for gates and rollback.

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
- Device-specific experience mode selection lives in NexusEngine; Lost Pages owns copy, routes, QR, experience manifests, and host presentation adapters.
- Feedback-only turns should update feedback docs and should not change app code unless implementation is explicitly requested.
