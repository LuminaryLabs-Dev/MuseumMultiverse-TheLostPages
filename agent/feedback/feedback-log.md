# Feedback Log

Status: active

Use this file as a date-based record of feedback intake and feedback state changes.

## 2026-06-24

### Prioritize main print view over book view

Source:

- User feedback in ChatGPT with screenshots of `/book` and the main print-style view.

Captured feedback:

- The dedicated 3D book view should be removed, deleted, hidden, or de-emphasized as a core product path.
- The main print view should become the focus for review and presentation.

Files updated:

- `agent/feedback/active-feedback.md`
- `agent/feedback/feedback-inbox.md`
- `agent/feedback/feedback-rules.md`
- `agent/feedback/feedback-log.md`
- non-agent docs during State Intelligence Sync

Implementation status:

- Feedback captured.
- Feedback aligned to docs as pending product direction.
- No route, visual, source, print, or runtime implementation performed.

Recommended next handling:

- Future visual/navigation pass should decide whether `/book/` becomes removed, redirected, hidden, or retained only as debug/experimental.

### Tabletop print view direction

Source:

- User feedback in ChatGPT with screenshot of the main print-style view.

Captured feedback:

- Main print view should use a tabletop-like physical background.
- Page layout needs grounded drop shadow.
- Page layout should have subtle physical orientation or parallax response.
- Current cursor glow should be removed.

Files updated:

- `agent/feedback/active-feedback.md`
- `agent/feedback/feedback-inbox.md`
- `agent/feedback/feedback-log.md`
- non-agent docs during State Intelligence Sync

Implementation status:

- Feedback captured.
- Feedback aligned to docs as pending visual direction.
- No implementation performed.

Recommended next handling:

- Future print-view visual pass should use tabletop surface treatment, grounded shadows, and subtle non-glow reactivity.

### Feedback intake must stay feedback-only unless implementation is explicit

Source:

- User feedback after feedback-only turns began.

Captured feedback:

- Feedback turns should append to feedback docs on `main` only.
- Feedback turns should not change JS/app/product/runtime files unless implementation is explicitly requested.

Files updated:

- `agent/feedback/active-feedback.md`
- `agent/feedback/feedback-inbox.md`
- `agent/feedback/feedback-log.md`
- `agent/feedback/feedback-rules.md`
- `agent/memory.md`

Implementation status:

- Operating rule captured and aligned to agent docs.
- No app/source implementation performed.

Recommended next handling:

- Continue separating feedback intake, state intelligence sync, and implementation turns.

### Physical book-opening transition into print layout

Source:

- User feedback after tabletop direction.

Captured feedback:

- Background still feels too dense and digital.
- Future direction should use a physical book-opening transition into the page layout.
- Preserve style intent in design rules before any code pass.

Files updated:

- `agent/feedback/active-feedback.md`
- `agent/feedback/feedback-inbox.md`
- `agent/feedback/feedback-log.md`
- non-agent docs during State Intelligence Sync

Implementation status:

- Feedback captured.
- Feedback aligned to docs as pending direction.
- No visual/source/runtime implementation performed.

Recommended next handling:

- Future print-view planning should decide how the physical transition relates to `/book/` and `/print/` before editing source files.
