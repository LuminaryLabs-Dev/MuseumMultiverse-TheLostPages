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
- `/sim/ar/sleeping-gallery` opens the camera-free Page 01 player simulator:
  trace, auto-run, Jump, checkpoint recovery, and saved reward.
- `/sim/ar/frame-that-breathes` opens the camera-free Page 02 player simulator:
  match Bridge/Step/Gate, build the route, auto-run, Jump/recover, enter, save.
- `/`, `/launcher`, `/print`, `/book`, and `/phone` currently fall through to the same shared booklet/print reader surface.
- `/book` is retained as a compatibility/static entry, not the preferred separate public review surface.
- `docs/` contains project docs.
- `agent/` contains long-running repo-local operating state.

## Key docs

- `goal.md`
- `CHANGELOG.md`
- `docs/CURRENT-STATE.md`
- `docs/DOCUMENTATION-MAP.md`
- `docs/SIMULATOR-PLAYER-PROOF.md`
- `docs/FINAL-PRODUCT-GOAL.md`
- `docs/SIMPLE-GAMEPLAY-CONTRACT.md`
- `docs/ARCHITECTURE-SKILL-MAP.md`
- `docs/GOAL-MATRIX.md`
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

Page 01 and Page 02 rules proof:

```bash
npm run proof:page01
npm run proof:page02
```

The build runs the composition check, Vite, and static route export so direct routes can open on GitHub Pages.

`package.json` and `package-lock.json` are pinned to NexusEngine commit `55b7f33f6d008b2e3b120e370f09b96ed73105e9`.

## Static routes

The local build exports all routes below. The Page 02 simulator URL is not
public until this local work is explicitly committed, pushed, and deployed.

```text
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/launcher/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/print/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/book/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/ar/<slug>/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/debug/ar/<slug>/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/sim/ar/sleeping-gallery/
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/sim/ar/frame-that-breathes/
```

Static route export is handled by `scripts/export-static-routes.mjs`.

## Current non-AR review direction

The shared booklet/print reader is the current source-backed non-AR surface for root, launcher, print, book, and phone route entries. It should read as a physical tabletop surface with grounded paper shadows, squared paper pages, subtle physical reactivity, and no pointer-following glow effect.

`/book` remains a compatibility/static alias and should stay out of the primary
hero navigation.

## Deploy

Source pushes run `.github/workflows/deploy-lost-pages.yml` to validate and
archive a candidate build. They do not publish a site or send notifications.

Run `npm run build:luminary`, then `npm run stage:luminary` for a read-only
release preview. Actual staging requires the completed product and its
acceptance evidence. Website's default branch publishes the generated files
under `/lostpages/`; it does not build or contain this source application.
See [Static release contract](docs/STATIC-RELEASE.md) for gates and rollback.

## Agent operating folder

This repository uses tracked `agent/` as the active operating folder.

Start future agent work from:

```text
goal.md
docs/CURRENT-STATE.md
agent/start-here.md
agent/pointer.md
agent/workflow.md
```

Use this prompt for state alignment and inference turns:

```text
agent/prompts/state-intelligence-sync.md
```

The `.agent/` tree preserves the completed picture-frame discovery interview.
It is a provisional design archive, not an active question loop or an
implementation authority. Start current work from `goal.md` and tracked
`agent/`; use `docs/DOCUMENTATION-MAP.md` whenever two documents appear to
overlap.

## Notes

- Published QR codes must point at the intended public HTTPS origin; routine
  gameplay proof uses direct simulator/debug routes instead of physical scans.
- NexusEngine owns reusable renderer-independent contracts; Lost Pages owns
  copy, routes, QR, experience manifests, and host presentation adapters.
- Feedback-only turns should update feedback docs and should not change app code unless implementation is explicitly requested.
