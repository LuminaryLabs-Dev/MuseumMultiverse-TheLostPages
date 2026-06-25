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

## Current Active Feedback

- Keep deploy chat messages short.
- Use pointer and workflow files before editing.
- Feedback intake should update feedback docs on `main` only and must not change app code unless implementation is explicitly requested.
- Main print view should become the primary review/presentation surface.
- The dedicated 3D book view should be removed, hidden, redirected, or demoted unless deliberately retained as legacy/debug/experimental.
- Page surfaces should look like squared paper with texture, shading, and paper-like edges.
- Main print view should feel like paper on a tabletop or physical surface.
- Add grounded drop shadows under the page layout.
- Use subtle physical orientation/parallax rather than cursor glow.
- Remove pointer-following glow effects.
- Background still feels too dense and digital; future direction should use a physical book-opening transition into the page layout.

## Pending Implementation Directions

These are not implemented by this ledger. They should guide future bounded implementation turns.

1. Make `/print/` the primary non-AR presentation/review route.
2. Decide whether `/book/` is removed, redirected, hidden, or retained as experimental/debug/legacy.
3. Replace dense digital/grid background treatment with a tabletop-like surface.
4. Add grounded shadows under the page layout.
5. Replace pointer glow with subtle physical parallax/orientation or paper-lift response.
6. Plan a physical book-opening transition into the main page layout.
7. After implementation, move resolved feedback to `processed-feedback.md` with evidence.

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

## Known Drift Addressed In This Sync

- Several docs treated `/book/` or book/print as a primary core surface while active feedback now prefers a print-first presentation surface.
- Active feedback had newer items that were not fully mirrored in feedback inbox/log.
- The repo did not have a first-class State Intelligence Sync workflow, prompt, or ledger.

## Durable Inferences

- Future visual work should preserve the physical print artifact metaphor over digital spectacle.
- Feedback capture and implementation must remain separate modes.
- A docs alignment turn should run before implementing major feedback if non-agent docs are stale.
- The route/docs model should distinguish current implementation from pending product direction.
- Device, phone, camera, WebXR, and AR claims remain evidence-bound and must not be inferred from docs.

## Do Not Touch Yet

Do not edit these in a State Intelligence Sync turn unless explicitly requested:

- `src/*`
- `print/*`
- `scripts/*`
- `.github/*`
- runtime behavior
- route behavior
- visual implementation
- AR/game implementation

## Needs User Decision

- Should `/book/` be deleted, redirected to `/print/`, hidden from launcher UI, or retained as a debug/experimental route?
- Should `/print/` become the only non-AR review path shown publicly?
- Should the physical book-opening transition be a CSS/DOM transition, a canvas transition, or a lightweight WebGL transition?

## Evidence / Validation Boundaries

- Current State Intelligence Sync changes are documentation/intelligence changes only.
- No build or browser preview is implied by a sync turn.
- No phone, camera, WebXR, or AR path is proven unless directly tested.
- Feedback should remain active until implementation is completed and evidenced.

## Recommended Next Turns

1. Run a print-view implementation planning turn.
2. Decide `/book/` route treatment.
3. Implement print-first tabletop visual/navigation pass.
4. Run `agent/prompts/004-ar-route-check.md` for AR route QA when product/navigation direction is stable.
5. Run QR/print readiness after AR route QA and print-view direction are validated.
