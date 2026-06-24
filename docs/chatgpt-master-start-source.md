# Museum Multiverse: Lost Pages - ChatGPT Master Start Source

Status: active master starting source  
Repository: `LuminaryLabs-Dev/MuseumMultiverse-TheLostPages`  
Primary branch: `main`  
Last synthesized: 2026-06-24  
Primary audience: future ChatGPT / agent runs, project operators, and contributors

## 1. What this document is

This is the master starting source for ChatGPT work on **Museum Multiverse: Lost Pages**.

Use it as the first orientation document before editing the repo, planning the next run, updating the custom ChatGPT project context, or explaining the state of Lost Pages to a collaborator.

This document consolidates the current repository state across:

- product purpose
- route and QR structure
- eight-page AR experience map
- print source structure
- runtime/dependency boundary
- build and deployment path
- active agent workflow
- active feedback and known gaps
- recommended next work

This document does not replace the repo's operating files. It points to the files that remain the source of truth.

## 2. Current one-sentence state

Lost Pages is an active Vite-based AR companion magazine prototype with eight authored QR-launched AR page modules, a launcher/book/print route structure, GitHub Pages deployment, NexusRealtime-backed runtime adapters, print copy sources, and a repo-local `agent/` operating system; the next meaningful work is AR route QA followed by QR/print readiness.

## 3. Product definition

**Museum Multiverse: Lost Pages** is an eight-page AR companion magazine.

The target product is a printed artifact where each page includes one QR code. Each QR code opens a public static route on a phone. That route launches a page-specific web, debug, or AR experience.

Core audience:

- people holding the printed magazine
- people scanning or opening routes on a phone
- reviewers using desktop debug routes
- future agents and contributors continuing the project

The repo must support:

- print-facing page composition
- QR targets that work from a phone
- static GitHub Pages deployment
- debug routes for desktop review
- AR routes for mobile launch
- short deploy chat messages
- durable agent handoff state

## 4. Repository shape

### Main areas

| Area | Purpose |
|---|---|
| `src/` | Browser app, route resolution, AR runtime integration, page data, launcher/book UI, AR rendering surfaces, and authored experiences. |
| `src/experiences/` | Eight page-specific experience modules. Each experience has `copy.js`, `level.js`, `tuning.js`, and `index.js`. |
| `src/ar/registry/experiences.js` | The experience registry. This is the source of truth for active AR slugs and route generation. |
| `print/magazine-pages/` | Print-facing Markdown copy for each magazine page. |
| `docs/` | Human-facing documentation. This master document now lives here. |
| `agent/` | Repo-local long-running operating state for future ChatGPT/agent work. |
| `scripts/` | Build/deploy/static export and deploy message helpers. |
| `.github/workflows/deploy-lost-pages.yml` | GitHub Actions workflow for build, Pages deploy, and Discord/deploy chat notification. |
| `output.md` | Current short deploy chat message source. |
| `output-rules.md` | Deploy chat style rules. |

### Important docs

Read these when orienting the project:

1. `docs/project-overview.md`
2. `docs/eight-pages-qr-structure.md`
3. `docs/repository-map.md`
4. `docs/nexusrealtime-dependencies.md`
5. `docs/deployment-and-discord.md`
6. `docs/feedback-loop.md`
7. `docs/agent-operating-model.md`
8. `docs/prototype-workflow.md`
9. `docs/chatgpt-master-start-source.md` - this document

## 5. Build, dependency, and deployment state

The app is a private ESM Vite project.

Current package commands:

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4176
npm run build
npm run preview
```

Current build command:

```bash
vite build && node scripts/export-static-routes.mjs
```

Production/luminary command path also exists:

```bash
npm run build:luminary
npm run deploy:luminary
```

Runtime dependencies:

- `nexusrealtime` from `git+https://github.com/LuminaryLabs-Dev/NexusRealtime.git#0.0.1`
- `qrcode`
- `three`

Dev dependency:

- `vite`

GitHub Pages deployment runs from `main`. The workflow builds the site, exports static route copies, uploads the Pages artifact, deploys to Pages, and attempts to send a deploy chat message from `output.md`.

Expected GitHub Pages root:

```text
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/
```

Important phone route:

```text
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/launcher/
```

Direct AR route shape:

```text
https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/ar/<slug>/
```

## 6. Route model

The app resolves routes in `src/app/routes/router.js`.

Route families:

| Route | Current meaning |
|---|---|
| `/` | Launcher. |
| `/launcher/` | Launcher. |
| `/book/` | Full book/composition-notebook view. |
| `/print/` | Alias to the book/print review surface. |
| `/ar/<slug>/` | QR-launched immersive AR route. |
| `/ar/<slug>/?debug=1` | Debug route for the same slug. |
| `/debug/ar/<slug>/` | Desktop debug surface. |
| `?page=<slug>` | Legacy/search-param route into an experience. |

Static route export is handled by `scripts/export-static-routes.mjs`. The current export list includes:

- `launcher`
- `book`
- `print`
- `ar`
- `phone`
- every `/ar/<slug>/`
- every `/debug/ar/<slug>/`

This static export matters because GitHub Pages needs a real `index.html` in each direct route folder that a phone may open.

## 7. Experience registry and eight-page map

The registry file is:

```text
src/ar/registry/experiences.js
```

It currently registers eight experiences:

| Page | Slug | Title | QR title | Collectible | Core interaction |
|---|---|---|---|---|---|
| 01 | `sleeping-gallery` | The Sleeping Gallery | Scan to Wake the Museum | Gallery Key Fragment | Tap five lit frames, then claim the fragment. |
| 02 | `frame-that-breathes` | The Frame That Breathes | Scan to Open the Painting | Canvas Whisper | Align three glyphs and open the frame. |
| 03 | `lost-childs-sketchbook` | The Lost Child's Sketchbook | Scan the Forgotten Drawing | Memory Sketch | Catch sketch creatures and reveal a memory. |
| 04 | `curators-warning` | The Curator's Warning | Scan the Red Seal | Red Seal Note | Restore warning words and read the warning. |
| 05 | `tiny-platformer-diorama` | Tiny Platformer Diorama | Scan to Play the Tiny World | Tiny Portal Badge | Clear tiny hazards and enter the goal gate. |
| 06 | `in-between-exhibit` | The In-Between Exhibit | Scan Between Worlds | Portal Stabilizer | Sort artifacts into matching worlds. |
| 07 | `monster-behind-canvas` | The Monster Behind the Canvas | Scan, But Don't Blink | Shadow Exhibit Fragment | Pulse a reveal beam and lock the canvas. |
| 08 | `secret-portal-room` | The Secret Portal Room | Scan to Unlock the Lost Room | Final Portal Key | Light eight sockets and unlock the final portal. |

Each experience module follows this pattern:

```text
src/experiences/<slug>/copy.js
src/experiences/<slug>/level.js
src/experiences/<slug>/tuning.js
src/experiences/<slug>/index.js
```

The manifest factory is `src/experiences/authoring.js`. It merges copy, level, tuning, preferred AR modes, and AR metadata into a single experience manifest.

The shared reward dataset is `src/experiences/shared/rewards.js`. It uses storage key `lost-pages-progress` and defines eight reward slots. The final portal room currently requires all eight rewards.

## 8. Print source map

Print copy exists under:

```text
print/magazine-pages/
```

Current print source files:

```text
print/magazine-pages/01-sleeping-gallery.md
print/magazine-pages/02-frame-that-breathes.md
print/magazine-pages/03-lost-childs-sketchbook.md
print/magazine-pages/04-curators-warning.md
print/magazine-pages/05-tiny-platformer-diorama.md
print/magazine-pages/06-in-between-exhibit.md
print/magazine-pages/07-monster-behind-canvas.md
print/magazine-pages/08-secret-portal-room.md
```

Important risk: the print Markdown duplicates copy that also exists in `src/experiences/<slug>/copy.js`. Before printing, run a copy-sync check so printed copy, launcher copy, QR labels, collectibles, and AR route manifests do not drift apart.

## 9. Runtime and NexusRealtime boundary

Lost Pages should own:

- magazine copy
- route slugs
- page data
- QR targets
- AR experience manifests
- Museum Multiverse content and tone
- print and book presentation
- deploy chat output

NexusRealtime should own:

- reusable runtime systems
- AR/XR runtime patterns
- session behavior
- device behavior
- generic input/rendering abstractions
- simulator/runtime capabilities that could serve other Museum Multiverse apps

Boundary rule:

> Lost Pages configures reusable runtime behavior; it should not become the reusable runtime package.

Runtime adapter file:

```text
src/ar/runtime/session.js
```

That file creates NexusRealtime-backed engines, selects kits, checks AR support, creates debug/fallback runtime paths, and delegates immersive launch behavior to `createARLaunchRuntime`.

The current preferred AR modes are defined in `src/experiences/authoring.js`:

```text
page-marker
webxr-plane
camera-overlay
fallback-preview
```

Do not claim phone, camera, WebXR, or headset proof unless it was actually tested on that device/path.

## 10. Launcher, book, and visual direction

The app has two major user-facing non-AR surfaces:

| Surface | Files | Current direction |
|---|---|---|
| Launcher | `src/app/launcher/renderLauncher.js`, `src/app/launcher/cleanLauncher.css`, `src/app/launcher/launcherMotion.js` | Simpler comic-book spread launcher with subtle reactive motion. |
| Book/print | `src/app/launcher/renderPrint.js`, `src/app/launcher/bookScene.js`, `src/app/launcher/pageTextures.js` | Canvas/Three.js composition-notebook view using generated page textures and a GLB notebook model when available. |

Current feedback says the launcher/book direction should avoid a heavy sepia tone. Do not make a visual change from that note alone; treat it as input for the next visual pass.

Book-scene details to preserve unless deliberately changing the direction:

- black canvas-only background
- GLB composition notebook model if available
- fallback notebook geometry if the GLB fails to load
- two visible page textures
- generated QR textures on pages
- scroll/click/touch page-turn behavior
- `spreadIndex` kept separate from animation time

## 11. Agent operating system

The repo uses `agent/` as the long-running ChatGPT/agent operating surface. The preferred hidden folder name would have been `.agent/`, but hidden path writes were blocked, so `agent/` is the active operating folder.

Start every future run from:

```text
agent/start-here.md
agent/pointer.md
agent/workflow.md
```

Required read order from `agent/start-here.md`:

1. `agent/start-here.md`
2. `agent/pointer.md`
3. `agent/workflow.md`
4. `agent/goal.md`
5. `agent/dependencies.md`
6. `agent/feedback/active-feedback.md`
7. workflow named in the pointer
8. prompt named in the pointer
9. `agent/memory.md`
10. `agent/run-log.md`
11. `agent/change-log.md`
12. `output-rules.md`
13. `output.md`

Current pointer:

```text
Current workflow: workflows/ar-qa-workflow.md
Current prompt: prompts/004-ar-route-check.md
Next prompt if complete: prompts/005-qr-print-readiness.md
```

Pointer reason:

The launcher cleanup pass is complete. The next best run should check AR route behavior and confirm phone-openable route assumptions.

## 12. Active feedback and current gaps

Active feedback currently includes:

- keep deploy chat messages short
- track important changes in the agent folder
- use pointer and workflow files before editing
- maintain long-term goal tracking for the eight-page QR structure
- maintain dependency notes for NexusRealtime
- make static AR routes phone-openable through build/export
- keep launcher cleaner, simpler, and less PDF-heavy
- add subtle reactive JavaScript motion, not spectacle
- avoid heavy sepia tone in the next visual pass
- avoid multiple deploy chat messages for one batch
- make `output.md` a smarter deploy message source

Current known gaps / next checks:

1. **AR route QA is pending.** The current pointer is `prompts/004-ar-route-check.md`.
2. **QR print readiness is next.** The next prompt is `prompts/005-qr-print-readiness.md` if AR route QA completes.
3. **Device proof is not established by docs alone.** Do not claim live phone/WebXR/headset validation unless that test was performed and recorded.
4. **Smart deploy output is only partially started.** `scripts/render-output-message.mjs` exists, but the run log says the workflow still needs to be safely wired to call it.
5. **Copy can drift between print Markdown and JS copy files.** Sync print source and experience copy before producing final print pages.
6. **Visual direction has unresolved feedback.** Future visual work should reduce heavy sepia and preserve readability.
7. **Deployment messages can drift from actual changes.** If editing main, update `output.md` once, at the end of the completed batch.

## 13. Recommended next run

The next best bounded run is:

```text
agent/workflows/ar-qa-workflow.md
agent/prompts/004-ar-route-check.md
```

Recommended scope:

1. Inspect route resolution for `/ar/<slug>/`, `/debug/ar/<slug>/`, and `/ar/<slug>/?debug=1`.
2. Confirm every registered slug has a static route exported.
3. Confirm launcher QR targets use the expected public origin.
4. Confirm normal AR route shows one `Start AR` gate before immersive/camera-first behavior.
5. Confirm debug routes preserve desktop controls.
6. Record what was validated and what was not validated.
7. Update `output.md`, `agent/run-log.md`, and `agent/pointer.md` only after the bounded run is actually complete.

Acceptance standard:

- route evidence recorded
- no untested device claims
- pointer moved only if the check passes
- output message short and accurate

## 14. How ChatGPT should work in this repo

When starting a new ChatGPT project session, use this process:

1. Read this master document.
2. Read `agent/start-here.md` and `agent/pointer.md`.
3. Read the active workflow and prompt named by the pointer.
4. Read `agent/feedback/active-feedback.md` before planning changes.
5. Inspect only the files needed for the selected prompt.
6. Keep the run bounded.
7. Validate using the closest available check.
8. Be explicit about what was not tested.
9. Update `output.md` last if the repo was changed.
10. Update `agent/run-log.md` and `agent/pointer.md` if the run completed.
11. Update `agent/memory.md` only when a durable rule is learned.
12. Update `agent/change-log.md` only when agent operating files changed.

## 15. Master source-of-truth rules

Use these rules to prevent drift:

- Experience slugs live in `src/ar/registry/experiences.js`.
- Experience copy lives in `src/experiences/<slug>/copy.js`.
- Experience mechanics live in `src/experiences/<slug>/level.js` and `tuning.js`.
- Print copy lives in `print/magazine-pages/` but must stay synchronized with JS copy.
- Route behavior lives in `src/app/routes/router.js`.
- Static route export lives in `scripts/export-static-routes.mjs`.
- Deployment behavior lives in `.github/workflows/deploy-lost-pages.yml`.
- Runtime architecture boundary lives in `agent/dependencies.md` and `docs/nexusrealtime-dependencies.md`.
- Current task state lives in `agent/pointer.md`.
- Long-term product goal lives in `agent/goal.md`.
- Durable instructions live in `agent/memory.md`.
- User feedback lives in `agent/feedback/active-feedback.md` and `processed-feedback.md`.
- Public deploy message source lives in `output.md` and `output-rules.md`.

## 16. Update policy for this document

Update this document when any of these change:

- route families
- experience slugs
- experience count
- print source naming
- deployment target
- NexusRealtime dependency boundary
- current pointer structure
- agent operating model
- core product goal
- QR/phone validation status
- major visual direction

Keep this file as the high-level master source. Do not turn it into a run log. Detailed execution history belongs in `agent/run-log.md`; durable instructions belong in `agent/memory.md`; active work belongs in `agent/pointer.md`.
