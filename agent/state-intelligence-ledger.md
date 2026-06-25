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

## Pending Implementation Directions

These are not implemented by this ledger. They should guide future bounded implementation turns.

1. Make `/print/` the primary non-AR presentation/review route.
2. Decide whether `/book/` is removed, redirected, hidden, or retained as experimental/debug/legacy.
3. Replace dense digital/grid background treatment with a tabletop-like surface.
4. Add grounded shadows under the page layout.
5. Replace pointer glow with subtle physical parallax/orientation or paper-lift response.
6. Plan a physical book-opening transition into the main page layout.
7. After implementation, move resolved feedback to `processed-feedback.md` with evidence.

## Highest-Priority Scheduled Implementation Theme

When no blocker exists and docs remain aligned, the next scheduled implementation should likely select:

```text
Mode 4 — Implementation
Objective: Make `/print/` feel like the primary tabletop review surface.
```

A coherent first implementation batch may include:

- remove pointer-following glow
- replace dense digital/grid background with tabletop-like surface
- add grounded shadows under the page layout
- add subtle physical parallax/orientation or paper-lift response
- de-emphasize `/book/` in public navigation if source makes this clear
- preserve `/book/` as redirect/debug/legacy only if route treatment is unambiguous
- update docs/run-log/output
- audit changed files and record the next fix

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

- Should `/book/` be deleted, redirected to `/print/`, hidden from launcher UI, or retained as a debug/experimental route?
- Should `/print/` become the only non-AR review path shown publicly?
- Should the physical book-opening transition be a CSS/DOM transition, a canvas transition, or a lightweight WebGL transition?

## Evidence / Validation Boundaries

- Current State Intelligence Sync and Autonomous Bounded Turn prompt changes are documentation/intelligence changes only.
- Scheduled prompt and lock changes do not prove the UI changed.
- No build or browser preview is implied by an agent prompt/docs turn.
- No phone, camera, WebXR, or AR path is proven unless directly tested.
- Feedback should remain active until implementation is completed and evidenced.

## Recommended Next Turns

1. Run one scheduled Autonomous Bounded Turn with implementation pressure and max-upgrade behavior.
2. Implement the print-first tabletop visual/navigation pass if no blocker exists.
3. Audit the print-view UI implementation and run build/preview validation.
4. Decide `/book/` route treatment if implementation reaches navigation/route behavior.
5. Run `agent/prompts/004-ar-route-check.md` for AR route QA when product/navigation direction is stable.
6. Run QR/print readiness after AR route QA and print-view direction are validated.
