# Museum Multiverse: Lost Pages - ChatGPT Master Start Source

Status: active master starting source  
Repository: `LuminaryLabs-Dev/MuseumMultiverse-TheLostPages`  
Primary branch: `main`  
Last synthesized: 2026-06-25  
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
- state intelligence sync workflow
- active feedback and known gaps
- recommended next work

This document does not replace the repo's operating files. It points to the files that remain the source of truth.

## 2. Current one-sentence state

Lost Pages is an active Vite-based AR companion magazine prototype with eight authored QR-launched AR page modules, a launcher/print/book route structure, GitHub Pages deployment, NexusRealtime-backed runtime adapters, print copy sources, supporting docs, and a repo-local `agent/` operating system. Active product direction now prefers the main print view as the primary non-AR review/presentation surface, while the dedicated 3D book route is pending demotion, removal, redirect, or legacy/debug treatment. AR route QA is still pending.

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
- state alignment and inference turns

## 4. Current active product direction

Active feedback currently says:

- main print view should become the primary non-AR review/presentation surface
- dedicated 3D book view should be removed, hidden, redirected, or demoted unless deliberately retained as legacy/debug/experimental
- print-view background should feel like a tabletop or physical surface
- page layout should have grounded drop shadows
- page layout may have subtle physical orientation/parallax
- pointer-following glow should be removed
- background should avoid dense digital-grid feeling
- future visual direction should explore a physical book-opening transition into the page layout

These are active directions, not necessarily implemented source behavior. Do not claim route, visual, or runtime implementation until source changes and validation evidence exist.

## 5. Repository shape

| Area | Purpose |
|---|---|
| `src/` | Browser app, route resolution, AR runtime integration, page data, launcher/print/book UI, AR rendering surfaces, and authored experiences. |
| `src/experiences/` | Eight page-specific experience modules. Each experience has `copy.js`, `level.js`, `tuning.js`, and `index.js`. |
| `src/ar/registry/experiences.js` | The experience registry. Source of truth for active AR slugs and route generation. |
| `print/magazine-pages/` | Print-facing Markdown copy for each magazine page. |
| `docs/` | Product, design, QA, technical, state-alignment, and supporting-content documentation. |
| `agent/` | Repo-local long-running operating state for future ChatGPT/agent work. |
| `scripts/` | Build/deploy/static export and deploy message helpers. |
| `.github/workflows/deploy-lost-pages.yml` | GitHub Actions workflow for build, Pages deploy, and deploy chat notification. |
| `output.md` | Current short deploy chat message source. |
| `output-rules.md` | Deploy chat style rules. |

Important docs include:

1. `docs/project-overview.md`
2. `docs/eight-pages-qr-structure.md`
3. `docs/repository-map.md`
4. `docs/nexusrealtime-dependencies.md`
5. `docs/deployment-and-discord.md`
6. `docs/feedback-loop.md`
7. `docs/agent-operating-model.md`
8. `docs/prototype-workflow.md`
9. `docs/DNA.md`
10. `docs/FULL-OUTLINE.md`
11. `docs/STYLE-GUIDE.md`
12. `docs/TECHNICAL-BUILD-MAP.md`
13. `docs/QA-ACCEPTANCE.md`
14. `docs/STATE-ALIGNMENT-MAP.md`
15. `docs/chatgpt-master-start-source.md`

## 6. Build, dependency, and deployment state

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

## 7. Route model

The app resolves routes in `src/app/routes/router.js`.

Current route families:

| Route | Current meaning |
|---|---|
| `/` | Launcher. |
| `/launcher/` | Launcher. |
| `/print/` | Print review route; active direction says this should become the primary non-AR presentation/review surface. |
| `/book/` | Current composition-book/reference route; active direction says it is pending demotion, hiding, redirect, removal, or legacy/debug treatment. |
| `/ar/<slug>/` | QR-launched immersive AR route. |
| `/ar/<slug>/?debug=1` | Debug route for the same slug. |
| `/debug/ar/<slug>/` | Desktop debug surface. |
| `?page=<slug>` | Legacy/search-param route into an experience. |

Static route export is handled by `scripts/export-static-routes.mjs`. The current export list has included launcher, book, print, ar, phone, every `/ar/<slug>/`, and every `/debug/ar/<slug>/`.

Do not remove `/book/` from docs or route assumptions until implementation actually removes, redirects, or hides it.

## 8. Experience registry and eight-page map

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
| 07 | `monster-behind-canvas` | The Monster Behind the Canvas | Scan, But Don't Blink | Shadow Exhibit Fragment | Reveal and seal the canvas. |
| 08 | `secret-portal-room` | The Secret Portal Room | Scan to Unlock the Lost Room | Final Portal Key | Light eight sockets and unlock the final portal. |

Each experience module follows this pattern:

```text
src/experiences/<slug>/copy.js
src/experiences/<slug>/level.js
src/experiences/<slug>/tuning.js
src/experiences/<slug>/index.js
```

The manifest factory is `src/experiences/authoring.js`. The shared reward dataset is `src/experiences/shared/rewards.js`.

## 9. Print source map

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

Important risk: print Markdown duplicates copy that also exists in `src/experiences/<slug>/copy.js`. Before printing, run a copy-sync check so printed copy, launcher copy, QR labels, collectibles, and AR route manifests do not drift apart.

## 10. Runtime and NexusRealtime boundary

Lost Pages should own:

- magazine copy
- route slugs
- page data
- QR targets
- AR experience manifests
- Museum Multiverse content and tone
- print presentation
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

Do not claim phone, camera, WebXR, or headset proof unless it was actually tested on that device/path.

## 11. Launcher, print, book, and visual direction

The app has user-facing non-AR surfaces:

| Surface | Files | Current / pending direction |
|---|---|---|
| Launcher | `src/app/launcher/renderLauncher.js`, `src/app/launcher/cleanLauncher.css`, `src/app/launcher/launcherMotion.js` | Simpler comic-book spread launcher with subtle reactive motion. |
| Print | `src/app/launcher/renderPrint.js`, `src/app/launcher/pageTextures.js` | Active direction says this should be the primary non-AR review/presentation surface. |
| Book | `src/app/launcher/bookScene.js`, `src/app/launcher/pageTextures.js` | Current route exists, but active direction says it is pending demotion/removal/redirect/legacy treatment. |

Visual direction:

- avoid heavy sepia as default
- squared paper page surfaces, not rounded cards
- tabletop/physical surface for main print view
- grounded shadows under the page layout
- subtle physical parallax/orientation if reactive motion is used
- remove pointer-following glow
- explore a physical book-opening transition into the page layout

Do not make visual implementation claims from docs alone.

## 12. Agent operating system

The repo uses `agent/` as the long-running ChatGPT/agent operating surface. The preferred hidden folder name would have been `.agent/`, but hidden path writes were blocked, so `agent/` is the active operating folder.

Start every future run from:

```text
agent/start-here.md
agent/pointer.md
agent/workflow.md
```

Current pointer:

```text
Current workflow: workflows/ar-qa-workflow.md
Current prompt: prompts/004-ar-route-check.md
Next prompt if complete: prompts/005-qr-print-readiness.md
```

Pointer reason:

The launcher cleanup pass is complete. The next best run should check AR route behavior and confirm phone-openable route assumptions. A user may explicitly trigger `agent/prompts/state-intelligence-sync.md` before implementation when docs and agent state need alignment.

## 13. State Intelligence Sync system

Use this trigger prompt:

```text
Run the Lost Pages State Intelligence Sync turn.
```

Primary files:

```text
agent/workflows/state-intelligence-sync-workflow.md
agent/prompts/state-intelligence-sync.md
agent/state-intelligence-ledger.md
docs/STATE-ALIGNMENT-MAP.md
```

Purpose:

- read agent state
- read non-agent docs
- report current repo state
- detect drift
- infer durable future rules
- update docs/memory/feedback only
- avoid app/source implementation unless explicitly requested

## 14. Active feedback and current gaps

Current known gaps / next checks:

1. AR route QA is pending.
2. QR print readiness is next after AR route QA.
3. Device proof is not established by docs alone.
4. Smart deploy output is only partially started.
5. Copy can drift between print Markdown and JS copy files.
6. Visual/product direction has unresolved feedback around print-first presentation and book-view demotion.
7. Print-view direction needs a bounded implementation pass.
8. Deployment messages can drift from actual changes unless `output.md` is updated once at the end of a completed batch.

## 15. Recommended next runs

Recommended documentation/intelligence run:

```text
agent/workflows/state-intelligence-sync-workflow.md
agent/prompts/state-intelligence-sync.md
```

Recommended implementation planning run:

```text
Plan a print-view visual/navigation implementation pass for /print primary, /book treatment, tabletop background, grounded shadows, subtle non-glow reactivity, and physical opening transition.
```

Recommended QA run still pending:

```text
agent/workflows/ar-qa-workflow.md
agent/prompts/004-ar-route-check.md
```

## 16. Master source-of-truth rules

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
- User feedback lives in `agent/feedback/`.
- State intelligence lives in `agent/state-intelligence-ledger.md` and `docs/STATE-ALIGNMENT-MAP.md`.
- Public deploy message source lives in `output.md` and `output-rules.md`.

## 17. Update policy for this document

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
- state intelligence workflow
- primary non-AR review surface direction

Keep this file as the high-level master source. Do not turn it into a run log. Detailed execution history belongs in `agent/run-log.md`; durable instructions belong in `agent/memory.md`; active work belongs in `agent/pointer.md`.
