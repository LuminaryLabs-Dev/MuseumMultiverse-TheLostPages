# Active Feedback

Status: active

## Current Feedback

- Keep deploy chat messages short.
- Track important changes in the agent folder.
- Use pointer and workflow files before editing.
- Add long term goal tracking for the eight page QR structure.
- Add dependency notes for NexusRealtime.
- Add prototype and overall workflows.
- Add a feedback folder for durable user direction.
- Make the Pages workflow export static routes so direct routes can open from a phone.
- Keep the launcher cleaner, simpler, and comic-book-like.
- Keep motion subtle and physical.
- Avoid heavy sepia as the default visual tone.
- Page surfaces should look like squared paper, not rounded cards.
- `/print/` is the primary surface; `/book/` remains legacy until a final route decision.
- The print view should keep tabletop/paper styling, grounded shadows, no cursor glow, and no stripe background.
- Background paper shader pass is source-backed but still needs build/browser validation.
- Booklet reader pass is source-backed: `/print/` now has a title/opening beat, one active page at a time, and panel reveal controls.
- Local service-kit pass is source-backed: launcher/print surfaces now mount NexusRealtime local kits for route mapping, paper, booklet navigation, and panel sequence state.
- Feedback intake rule: feedback-only turns update feedback docs on `main` and do not change app/source files unless implementation is explicit.

## Still Active After Source Pass

- Validate `/print/` in build, browser preview, and deployed route review.
- Regenerate `package-lock.json` for the pinned NexusRealtime commit.
- Confirm the WebGL paper viewport falls back cleanly on older or constrained browsers.
- Decide final `/book/` treatment: keep as legacy, redirect to `/print/`, or remove from public navigation/static paths.
- Polish the physical opening transition after visual review.
- Run route QA and print readiness after print-view direction is stable.

## Handling Rule

Before each run, read this file and decide whether any active feedback should change the current prompt or pointer.
