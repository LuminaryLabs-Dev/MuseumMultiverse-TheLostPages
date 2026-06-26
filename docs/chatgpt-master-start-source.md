# Museum Multiverse: Lost Pages - ChatGPT Master Start Source

Status: active master starting source  
Repository: `LuminaryLabs-Dev/MuseumMultiverse-TheLostPages`  
Primary branch: `main`  
Last synthesized: 2026-06-26  
Primary audience: future ChatGPT / agent runs, project operators, and contributors

## 1. What this document is

This is the master starting source for ChatGPT work on **Museum Multiverse: Lost Pages**.

Use it as the first orientation document before editing the repo, planning the next run, updating the custom ChatGPT project context, or explaining the state of Lost Pages to a collaborator.

This document summarizes product purpose, route and QR structure, the eight-page map, print source structure, runtime/dependency boundaries, build/deployment state, active agent workflow, active feedback, known gaps, and recommended next work. It does not replace the repo operating files.

## 2. Current one-sentence state

Lost Pages is an active Vite-based AR companion magazine prototype with eight authored page modules, direct route exports, NexusRealtime-backed runtime adapters, print copy sources, supporting docs, and a repo-local `agent/` operating system. Current source inspection shows root, launcher, print, book, and phone route entries all fall through to the shared booklet/print reader surface, while `/ar/<slug>/` and `/debug/ar/<slug>/` remain separate experience routes. Build, browser, route, device, and lockfile validation are still pending.

## 3. Product definition

**Museum Multiverse: Lost Pages** is an eight-page AR companion magazine.

The target product is a printed artifact where each page includes one QR code. Each QR code opens a public static route on a phone. That route launches a page-specific web, debug, or AR experience.

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

- the main print/booklet reader should be the primary non-AR review and presentation surface
- the dedicated book route should be removed, hidden, redirected, or demoted unless deliberately retained as a compatibility, debug, experimental, or legacy entry
- the print-view background should feel like a tabletop or physical surface
- page layout should have grounded drop shadows
- page layout may have subtle physical orientation/parallax
- pointer-following glow should stay removed
- the background should avoid dense digital-grid feeling
- a physical opening transition into the page layout is desirable

Do not claim build, browser, phone, camera, WebXR, deployed-route, or AR proof unless it was actually tested.

## 5. Repository shape

| Area | Purpose |
|---|---|
| `src/` | Browser app, route resolution, runtime integration, page data, route surfaces, and authored experiences. |
| `src/experiences/` | Eight page-specific experience modules. |
| `src/ar/registry/experiences.js` | Source of truth for active slugs and route generation. |
| `print/magazine-pages/` | Print-facing Markdown copy for each page. |
| `docs/` | Product, design, QA, technical, state-alignment, and supporting-content documentation. |
| `agent/` | Repo-local long-running operating state. |
| `scripts/` | Build, static export, deploy, and composition helpers. |
| `.github/workflows/deploy-lost-pages.yml` | GitHub Actions workflow for build, Pages deploy, and deploy chat notification. |
| `output.md` | Current short deploy chat message source. |
| `output-rules.md` | Deploy chat style rules. |

## 6. Build, dependency, and deployment state

The app is a private ESM Vite project.

Current package commands:

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 4176
npm run check:composition
npm run build
npm run preview
```

Current build command path:

```bash
npm run check:composition && vite build && node scripts/export-static-routes.mjs
```

Production/luminary command path also exists:

```bash
npm run build:luminary
npm run deploy:luminary
```

Current inspected dependency state:

- `package.json` pins `nexusrealtime` to commit `ebd19e298d71bfbc51bf452394085ce1d909cb94`.
- `package-lock.json` still references the older `0.0.1` target.
- A network-enabled dependency hygiene turn should run `npm install`, regenerate `package-lock.json`, and then run the available checks.

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

Current inspected route behavior:

| Route | Current meaning |
|---|---|
| `/` | Shared booklet/print reader surface. |
| `/launcher/` | Shared booklet/print reader surface. |
| `/print/` | Shared booklet/print reader surface. |
| `/book/` | Shared booklet/print reader surface, retained as a compatibility/static entry. |
| `/phone/` | Shared booklet/print reader surface. |
| `/ar/<slug>/` | Experience route. |
| `/ar/<slug>/?debug=1` | Debug version of same slug. |
| `/debug/ar/<slug>/` | Desktop debug route. |
| `?page=<slug>` | Legacy/search-param route into an experience. |

Static route export is handled by `scripts/export-static-routes.mjs`. The export list includes launcher, book, print, ar, phone, every `/ar/<slug>/`, and every `/debug/ar/<slug>/`.

`src/app/launcher/bookScene.js` still exists as legacy source, but it is not the current default public non-experience route path.

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

Important risk: print Markdown duplicates copy that also exists in `src/experiences/<slug>/copy.js`. Before printing, run a copy-sync check so printed copy, launcher copy, QR labels, collectibles, and route manifests do not drift apart.

## 10. Runtime and NexusRealtime boundary

Lost Pages should own magazine copy, route slugs, page data, QR targets, AR experience manifests, Museum Multiverse content and tone, print presentation, and deploy chat output.

NexusRealtime should own reusable runtime systems, AR/XR runtime patterns, session behavior, device behavior, generic input/rendering abstractions, and simulator/runtime capabilities that could serve other Museum Multiverse apps.

Boundary rule:

> Lost Pages configures reusable runtime behavior; it should not become the reusable runtime package.

Runtime adapter file:

```text
src/ar/runtime/session.js
```

## 11. Launcher, print, book, and visual direction

Current source-backed public non-experience behavior sends root, launcher, print, book, and phone route entries to the same booklet/print reader surface.

Relevant files:

| Area | Files | Current direction |
|---|---|---|
| Route resolution | `src/app/routes/router.js` | Experience routes are preserved; all other paths fall through to the print/booklet surface. |
| Top-level rendering | `src/main.js` | Non-experience routes render through `renderBookletSurface()`. |
| Booklet/print reader | `src/app/launcher/renderPrint.js` | Shared reader markup, page controls, and QR rendering. |
| Styling and motion | `src/app/launcher/cleanLauncher.css`, `src/app/launcher/launcherMotion.js` | Tabletop/paper styling and subtle physical motion. |
| Legacy book source | `src/app/launcher/bookScene.js`, `src/app/launcher/pageTextures.js` | Legacy source remains but is not the default public non-experience route path. |

Visual direction:

- avoid heavy sepia as default
- keep squared paper page surfaces, not rounded cards
- maintain tabletop/physical surface treatment
- keep grounded shadows under page layout
- keep reactivity subtle and physical
- do not reintroduce pointer-following glow
- judge the opening/booklet transition in browser/device preview before further motion polish

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

The launcher cleanup pass is complete. The next best run should check route behavior and confirm phone-openable route assumptions. Keep the pointer in place until route QA is actually run or blocked.

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

Current known gaps and next checks:

1. Dependency hygiene is pending: regenerate `package-lock.json` for the pinned NexusRealtime commit.
2. Build validation is pending: run `npm run check:composition` and `npm run build`.
3. Browser preview is pending for root, launcher, print, book, phone, one AR route, and one debug route.
4. Phone/device proof is not established by docs alone.
5. AR route QA is pending.
6. QR print readiness comes after route QA and stable print-view direction.
7. Copy can drift between print Markdown and JS copy files.
8. Feedback should remain active until implementation and validation evidence are recorded.

## 15. Recommended next runs

Recommended next turn:

```text
Run dependency hygiene and QA: npm install, regenerate package-lock.json, run npm run check:composition, run npm run build, and preview root, launcher, print, book, phone, one /ar/<slug>/ route, and one /debug/ar/<slug>/ route. Record evidence before processing feedback.
```

Recommended QA pointer still pending:

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

Update this document when route families, experience slugs, experience count, print source naming, deployment target, dependency boundary, current pointer structure, agent operating model, core product goal, validation status, major visual direction, state intelligence workflow, or primary non-AR review surface direction changes.

Keep this file as the high-level master source. Do not turn it into a run log. Detailed execution history belongs in `agent/run-log.md`; durable instructions belong in `agent/memory.md`; active work belongs in `agent/pointer.md`.
