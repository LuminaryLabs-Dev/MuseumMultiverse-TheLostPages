# Feedback Inbox

Status: active

Use this file for newly captured user feedback before it is fully resolved or implemented.

## Status labels

- `captured`
- `aligned-to-docs`
- `ready-for-implementation`
- `implemented`
- `processed`
- `superseded`
- `blocked`

## 2026-06-24 — Prioritize main print view over book view

Status: `aligned-to-docs`, `ready-for-implementation`, not implemented

Raw feedback:

- The current `/book` view should be deleted, removed, or de-emphasized.
- Focus on the main print view as the primary product/review surface.
- There should no longer be a separate book view as a core product path unless a later decision reintroduces it.

Context:

- User provided screenshots showing the 3D book/page-turn view and the main print-style page view.
- Feedback intake only. Implementation was not requested in this turn.

Classification:

- Product direction
- Visual/navigation direction
- Active feedback
- Not yet implemented

Recommended future action:

- Plan a bounded visual/navigation pass that makes the main print view the primary surface.
- Decide whether `/book/` should be removed, redirected, hidden, or retained only as an experimental/debug route.
- Update route docs, launcher navigation, style guide, output message, and agent run log only if implementation occurs.

## 2026-06-24 — Tabletop print-view background direction

Status: `aligned-to-docs`, `ready-for-implementation`, not implemented

Raw feedback:

- The main print view background should feel like a tabletop or physical surface.
- Add a grounded drop shadow under the page layout.
- The page layout should be slightly reactive through subtle orientation or parallax.
- Remove the current cursor glow effect.

Context:

- User provided a screenshot of the current main print-style view.
- Feedback intake only. Implementation was not requested in this turn.

Classification:

- Visual direction
- Print-view direction
- Interaction/motion direction
- Active feedback
- Not yet implemented

Recommended future action:

- Plan a bounded print-view visual pass.
- Replace the flat digital/grid feeling with a tabletop-like background.
- Add realistic drop shadowing under the page spread.
- Keep any reactivity subtle and physical, not glow-based.

## 2026-06-24 — Feedback intake must stay feedback-only unless implementation is explicit

Status: `captured`, `aligned-to-docs`, active operating rule

Raw feedback:

- When the user gives Lost Pages feedback, append it to feedback docs on `main` only.
- Do not make JavaScript, app, route, visual, product, or runtime changes unless the user explicitly asks for implementation.

Context:

- This rule was added after feedback intake started updating durable repo feedback files.
- It should govern future feedback-only turns.

Classification:

- Agent workflow direction
- Feedback handling direction
- Active feedback
- Durable operating rule

Recommended future action:

- Keep feedback intake separate from implementation turns.
- Use State Intelligence Sync when feedback must be mirrored into docs and memory.

## 2026-06-24 — Physical book-opening transition into print layout

Status: `captured`, `aligned-to-docs`, not implemented

Raw feedback:

- Background still feels too dense and digital.
- Future direction should use a physical book-opening transition into the page layout.
- Preserve the style intent in design rules before any code pass.

Context:

- This feedback extends the tabletop print-view direction.
- Implementation was not requested at intake time.

Classification:

- Visual direction
- Print-view direction
- Interaction/motion direction
- Product presentation direction
- Active feedback
- Not yet implemented

Recommended future action:

- Before implementing, decide how `/book/` relates to `/print/`.
- Plan a print-view visual/navigation pass that includes the physical transition.
- Keep the direction documented as pending until implementation is evidenced.
