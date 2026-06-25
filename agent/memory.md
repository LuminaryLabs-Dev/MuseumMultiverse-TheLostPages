# Lost Pages Agent Memory

Status: active

## Durable Rules

- Start future runs from `agent/start-here.md` and `agent/pointer.md`.
- Use `agent/` as the repo-local agent folder.
- Use one active pointer at a time.
- Prompt files define what to do.
- Workflow files define how to do it.
- Read `agent/goal.md` before product-direction work.
- Read `agent/dependencies.md` before dependency-boundary work.
- Read `agent/feedback/active-feedback.md` before editing.
- Keep deploy chat messages short.
- Use `output-rules.md` for message style.
- Use `output.md` for the current message source.
- Do not include repo metadata unless requested.
- Update `output.md` with each completed batch.
- Update `output.md` last so the message describes the whole batch.
- Validate before claiming a site or AR issue is fixed.
- Phone routes require static route export from the build.
- Launcher visuals should stay clean, comic-book-like, readable, and less PDF-heavy.
- Motion should feel subtle and reactive; avoid spectacle that distracts from AR route selection.
- Page surfaces should read as square-corner paper, not rounded cards; use texture and shader-based shading where the WebGL book/print route owns the page surface.
- User feedback should be added to `main` as feedback only. Do not change app code unless implementation is explicitly requested.
- A State Intelligence Sync turn may update docs and agent knowledge files, but must not change app/source implementation.
- Active feedback should be mirrored across `active-feedback.md`, `feedback-inbox.md`, and `feedback-log.md`.
- Non-agent docs should reflect active direction as pending or current product direction when implementation is not complete.
- Implementation status must be explicit: captured, aligned-to-docs, ready-for-implementation, implemented, processed, superseded, or blocked.
- Do not mark feedback processed unless implementation, rejection, or supersession is evidenced.
- Main print view is the preferred future non-AR presentation surface; the dedicated 3D book route is pending demotion/removal/legacy treatment unless deliberately retained.
- Print-view visual direction should feel physical: tabletop surface, grounded shadows, subtle orientation/parallax, no pointer-following glow.
