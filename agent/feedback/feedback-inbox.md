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

## 2026-06-26 — Status repair note

Status: `aligned-to-docs`

This inbox was reconciled after source-backed implementation passes landed on `main`.

The print-first tabletop/booklet work is no longer purely pending implementation. Source inspection and run-log evidence show first-pass implementation exists for the shared booklet/print reader, tabletop paper styling, grounded paper shadows, no cursor glow, local service kits, and a first-pass opening/settling transition.

The feedback remains active and unprocessed because dependency hygiene, build validation, browser preview, deployed-route review, phone/device checks, paper fallback review, and AR launch validation are still pending.

## 2026-06-24 — Prioritize main print view over book view

Status: `implemented` by source-backed pass, not validated, not processed

Raw feedback:

- The current `/book` view should be deleted, removed, or de-emphasized.
- Focus on the main print view as the primary product/review surface.
- There should no longer be a separate book view as a core product path unless a later decision reintroduces it.

Context:

- User provided screenshots showing the 3D book/page-turn view and the main print-style page view.
- Feedback intake only. Implementation was not requested in the intake turn.
- A later explicit implementation turn made the non-AR public entries share the booklet/print reader surface.

Current source-backed state:

- Root, launcher, print, book, and phone route entries fall through to the shared booklet/print reader surface.
- `/book/` is still present as a compatibility/static entry, not a preferred separate public review surface.
- Final `/book/` treatment is still undecided: keep as compatibility/legacy, redirect to `/print/`, hide from public navigation/static paths, or remove.

Classification:

- Product direction
- Visual/navigation direction
- Active feedback until validation and final `/book/` decision

Recommended future action:

- Run build/browser/deployed route QA for root, launcher, print, book, and phone.
- Make a later bounded decision on whether `/book/` stays compatibility/legacy, redirects, hides, or is removed.

## 2026-06-24 — Tabletop print-view background direction

Status: `implemented` by source-backed pass, not validated, not processed

Raw feedback:

- The main print view background should feel like a tabletop or physical surface.
- Add a grounded drop shadow under the page layout.
- The page layout should be slightly reactive through subtle orientation or parallax.
- Remove the current cursor glow effect.

Context:

- User provided a screenshot of the current main print-style view.
- Feedback intake only. Implementation was not requested in the intake turn.
- Later source passes added the tabletop/paper surface treatment and removed pointer-following glow behavior.

Current source-backed state:

- Shared booklet/print reader styling uses tabletop/paper treatment and grounded paper shadows.
- Pointer-following glow remains removed.
- Motion is intended to be subtle and physical.
- The paper shader/fallback and visual quality still require build/browser/device review.

Classification:

- Visual direction
- Print-view direction
- Interaction/motion direction
- Active feedback until visual validation passes

Recommended future action:

- Validate `/print/` and the shared booklet/print reader in browser preview and deployed route review.
- Confirm shader fallback behavior on constrained browsers/devices.

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

Status: `implemented` by first-pass source-backed transition, not validated, not processed

Raw feedback:

- Background still feels too dense and digital.
- Future direction should use a physical book-opening transition into the page layout.
- Preserve the style intent in design rules before any code pass.

Context:

- This feedback extends the tabletop print-view direction.
- Implementation was not requested at intake time.
- Later source passes added a first-pass opening/settling transition into the shared booklet/print reader surface.

Current source-backed state:

- A first-pass physical opening/settling transition exists.
- The transition has not been judged in browser, phone, or deployed preview.
- Further polish should wait for visual review.

Classification:

- Visual direction
- Print-view direction
- Interaction/motion direction
- Product presentation direction
- Active feedback until visual validation passes

Recommended future action:

- Preview the opening/settling transition in browser and on a phone-sized viewport.
- Only then decide whether a more literal or complex book-opening transition is warranted.
