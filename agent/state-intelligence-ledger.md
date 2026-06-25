# Lost Pages State Intelligence Ledger

Status: active
Last updated: 2026-06-25

## Current True State

- Lost Pages is an eight-page AR companion magazine prototype.
- The repo uses `agent/` as the active repo-local operating folder.
- `docs/` is the product/design/source-of-truth layer.
- `src/` is implementation.
- `print/` is print-facing copy.
- Current pointer remains on AR route QA: `agent/prompts/004-ar-route-check.md`.
- The State Intelligence Sync workflow exists to align knowledge before implementation turns.
- The Autonomous Bounded Turn prompt exists as the top-level generic mode selector for one on-demand bounded turn.
- Scheduled Autonomous Upgrade Turns now use the same autonomous prompt, a main-only push rule, a scheduled-turn lock, implementation pressure, maximum useful upgrade behavior, and post-change audits.
- `/print/` now has a distinct route type and renders the primary tabletop print review/presentation surface.
- `/book/` remains directly available as a legacy composition-book route and is de-emphasized in launcher/print navigation.
- The pointer-following glow effect has been removed from the launcher/print motion path; pointer motion now only drives subtle paper/card tilt.
- Launcher and print backgrounds now mount a cached Three.js/WebGL paper viewport behind the DOM.
- The paper viewport uses precomputed multi-octave noise maps, normal data, and height/depth data; it does not regenerate procedural noise every frame.
- The main background and hero surfaces no longer use the prior striped background treatment.

## Current Active Feedback

- Keep deploy chat messages short.
- Use pointer and workflow files before editing.
- Feedback intake should update feedback docs on `main` only and must not change app code unless implementation is explicitly requested.
- Main print view should remain the primary review/presentation surface.
- The dedicated 3D book view still needs a final route decision: keep as legacy/debug, redirect, or remove later.
- Page surfaces should look like squared paper with texture, shading, and paper-like edges.
- Main print view should feel like paper on a tabletop or physical surface.
- Use grounded drop shadows under the page layout.
- Use subtle physical orientation/parallax rather than cursor glow.
- Do not reintroduce pointer-following glow effects.
- First-pass physical opening/settling transition exists; polish is pending browser review.
- Background shader quality remains active until build/browser/mobile validation confirms the WebGL paper viewport and CSS fallback behave correctly.

## Available Reusable Turn Prompts

```text
agent/prompts/autonomous-bounded-turn.md
agent/prompts/state-intelligence-sync.md
```

Use `autonomous-bounded-turn.md` when the user wants one generic turn that derives the next objective from repo state.

Use `state-intelligence-sync.md` when the user specifically wants repo alignment, drift detection, or inference expansion without app/source implementation.

## Scheduled Turn Policy

The scheduled system uses four hourly slots offset by 15 minutes:

```text
Slot A — every hour at :00
Slot B — every hour at :15
Slot C — every hour at :30
Slot D — every hour at :45
```

All slots should use the same Autonomous Bounded Turn prompt.

Scheduled turns should:

- check `agent/scheduled-turn-lock.md` before editing
- check open PRs before new work
- stop when an open PR requires review or conflict handling
- push only to `main`
- avoid creating new PRs
- choose one coherent objective from repo state
- make the largest safe upgrade batch that belongs to the selected objective
- prefer implementation after active feedback is captured and docs are aligned
- avoid repeating implementation planning for the same feedback theme unless a real blocker exists
- audit the changed area immediately after implementation
- record concrete next-turn guidance

## Recently Implemented Direction

The 2026-06-25 print-first tabletop implementation pass applied:

1. `/print/` route split from `/book/` in `src/app/routes/router.js`.
2. `/print/` rendering through `renderPrintMarkup()` and `renderPrintQrCodes()` in `src/main.js`.
3. Standalone DOM-based tabletop print markup in `src/app/launcher/renderPrint.js`.
4. Launcher CTA priority changed so Print view is primary and Book is legacy.
5. Pointer glow markup removed from launcher markup.
6. Dense pointer/glow styling replaced with tabletop/paper/shadow styling in `cleanLauncher.css`.
7. Motion changed to physical tilt/parallax only in `launcherMotion.js`.
8. First-pass CSS/DOM opening-and-settling transition added for print view.

The 2026-06-25 cached paper shader pass applied:

1. Added `src/app/launcher/paperSurface.js`.
2. Mounted a WebGL paper viewport in launcher and print markup.
3. Generated deterministic multi-octave albedo, normal, and height/depth maps once per app session.
4. Cached maps in a module/window singleton for reuse across launcher and print surfaces.
5. Used a WebGL1-friendly GLSL shader with normal/depth lighting and low-power renderer settings.
6. Kept the WebGL paper as a flat 2.5D substrate behind DOM text, QR codes, and page sheets.
7. Removed the prior striped background treatment from the main background and hero surfaces.
8. Added CSS fallback treatment for browsers or devices that cannot create the WebGL paper surface.

## Pending Implementation Directions

These remain active after the source pass:

1. Validate `/launcher/`, `/print/`, and `/book/` in a browser preview.
2. Run `npm run build` and record the result.
3. Confirm the WebGL paper viewport works on representative desktop/mobile browsers and falls back cleanly when WebGL is unavailable.
4. Decide whether `/book/` should remain legacy/debug, redirect to `/print/`, or be removed from public/static paths.
5. Polish the physical opening transition after visual review.
6. Run AR route QA after print navigation stabilizes.
7. Run QR/print readiness after route QA and print-view validation.
8. Move resolved feedback to `processed-feedback.md` only after validation evidence exists.

## Highest-Priority Scheduled Implementation Theme

When no blocker exists and docs remain aligned, the next scheduled implementation should likely select:

```text
Mode 5 — QA / Validation
Objective: Validate the print-first tabletop and paper shader route batch.
```

A coherent validation batch may include:

- run `npm run build`
- inspect `/launcher/`, `/print/`, and `/book/` route behavior
- confirm `/print/` has QRs and tabletop layout
- confirm `/book/` still loads legacy book view
- confirm no pointer-following glow behavior remains
- confirm the WebGL paper viewport appears non-striped and paper-like
- confirm CSS fallback still gives a non-striped paper-like background
- update feedback status based on evidence

## Non-Agent Docs That Must Stay Aligned

- `README.md`
- `docs/chatgpt-master-start-source.md`
- `docs/project-overview.md`
- `docs/DNA.md`
- `docs/FULL-OUTLINE.md`
- `docs/STYLE-GUIDE.md`
- `docs/TECHNICAL-BUILD-MAP.md`
- `docs/QA-ACCEPTANCE.md`
- `docs/STATE-ALIGNMENT-MAP.md`
- `docs/supporting-content/README.md`

## Known Drift Addressed In Prior Sync

- Several docs treated `/book/` or book/print as a primary core surface while active feedback now prefers a print-first presentation surface.
- Active feedback had newer items that were not fully mirrored in feedback inbox/log.
- The repo did not have a first-class State Intelligence Sync workflow, prompt, or ledger.

## Durable Inferences

- Future visual work should preserve the physical print artifact metaphor over digital spectacle.
- Feedback capture and implementation must remain separate modes.
- A docs alignment turn should run before implementing major feedback if non-agent docs are stale.
- The route/docs model should distinguish current implementation from pending product direction.
- Device, phone, camera, WebXR, and AR claims remain evidence-bound and must not be inferred from docs.
- Generic autonomous turns should select one mode and one objective, not execute a queue.
- If no user target is supplied, the autonomous turn should choose the first eligible mode from its priority ladder and stop after that objective.
- After docs are aligned and feedback is implementation-ready, scheduled turns should prefer implementation over more planning.
- Scheduled implementation turns should produce a post-change audit and next-turn handoff.
- Print-view motion should be physical tilt/parallax only; no cursor-following glow should return unless user feedback reverses that direction.
- The paper/noise substrate should be generated once per app session and reused; do not regenerate procedural noise per animation frame.
- Use WebGL/Three.js for the paper substrate only while keeping text and QR codes in DOM for compatibility and readability.

## Do Not Touch Yet

Do not edit these in a State Intelligence Sync or planning turn unless explicitly requested:

- `src/*`
- `print/*`
- `scripts/*`
- `.github/*`
- runtime behavior
- route behavior
- visual implementation
- AR/game implementation

## Needs User Decision

- Should `/book/` stay as legacy/debug, redirect to `/print/`, or be removed from public/static paths?
- Should `/print/` become the only non-AR review path shown publicly?
- After browser review, should the physical book-opening transition stay CSS/DOM or move to a more advanced canvas/WebGL transition?

## Evidence / Validation Boundaries

- The print-first tabletop implementation and cached paper shader pass were pushed to source on `main`.
- The implementation was inspected through repository file review.
- `npm run build` was requested but could not be run from this connector-only environment.
- No browser preview, deployed GitHub Pages check, phone, camera, WebXR, or AR path validation has been performed in this turn.
- Feedback should remain active until implementation is completed and evidenced by build/browser validation.

## Recommended Next Turns

1. Run build and browser/deployed-route QA for `/launcher/`, `/print/`, `/book/`, `/ar/<slug>/`, and `/debug/ar/<slug>/`.
2. Verify the cached paper shader renders correctly on representative desktop/mobile browsers and that fallback styling is acceptable.
3. If validation passes, move implemented print-first/tabletop/no-glow/paper-shader feedback into `processed-feedback.md` with evidence.
4. Decide final `/book/` route treatment.
5. Run `agent/prompts/004-ar-route-check.md` for AR route QA when product/navigation direction is stable.
6. Run QR/print readiness after AR route QA and print-view direction are validated.
