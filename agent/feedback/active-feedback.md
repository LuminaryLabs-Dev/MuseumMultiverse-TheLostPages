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
- Make the Pages workflow export static routes so AR routes can open directly on a phone.
- The launcher felt too overdone and PDF-like; clean it up into a simpler comic-book look.
- Add light reactive animations with JavaScript while keeping motion subtle.
- New feedback: the overall book/launcher direction should avoid the heavy sepia tone. Treat this as ongoing visual guidance.
- New feedback: future agent runs must follow the workflow more reliably and avoid creating multiple deploy chat messages for one batch.
- New feedback: output should become a smart message source with fields that can be rendered into a dynamic deploy chat message.
- New feedback: page surfaces should look like squared paper, not rounded cards; use paper texture, shading, and GLSL shading for the WebGL book/print pages.
- Print-first source pass applied: `/print/` is now routed separately and rendered as the primary tabletop print surface; `/book/` remains available as a de-emphasized legacy route pending final route decision.
- Tabletop source pass applied: the print view now has tabletop styling, grounded paper shadows, no-glow motion, and subtle tilt/parallax in source. Build and visual validation are still pending.
- Feedback intake rule: when the user gives Lost Pages feedback, append it to feedback docs on `main` only; do not make app/source changes unless the user explicitly asks for implementation.
- Physical opening source pass applied: a first-pass opening-and-settling transition is now in the print view. Visual polish remains active pending preview.

## Still Active After Source Pass

- Validate `/print/` in build, browser preview, and deployed route review.
- Decide final `/book/` treatment: keep as legacy, redirect to `/print/`, or remove from public navigation/static paths.
- Polish the physical opening transition after visual review.
- Run AR route QA and QR/print readiness after print-view direction is stable.

## Handling Rule

Before each run, read this file and decide whether any active feedback should change the current prompt or pointer.
