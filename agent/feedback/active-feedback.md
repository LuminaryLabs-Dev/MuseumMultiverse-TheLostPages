# Active Feedback

Status: active

## Current Feedback

- Keep deploy chat messages short.
- Track important changes in the agent folder.
- Use pointer and workflow files before editing.
- Add long term goal tracking for the eight page QR structure.
- Keep dependency notes aligned to NexusEngine.
- Add prototype and overall workflows.
- Add a feedback folder for durable user direction.
- Make the Pages workflow export static routes so direct routes can open from a phone.
- Keep the launcher cleaner, simpler, and comic-book-like.
- Keep motion subtle and physical.
- Avoid heavy sepia as the default visual tone.
- Page surfaces should look like squared paper, not rounded cards.
- `/print/` is the primary non-AR review/presentation surface.
- `/book/` currently remains available as a compatibility/static entry that falls through to the shared booklet/print reader; final treatment is still undecided.
- The print/booklet surface should keep tabletop/paper styling, grounded shadows, no cursor glow, and no stripe background.
- Background paper shader pass is source-backed but still needs build/browser/device fallback validation.
- Booklet reader pass is source-backed: root, launcher, print, book, and phone entries now share the booklet/print reader with a title/opening beat, one active page at a time, and panel reveal controls.
- Local service-kit pass is source-backed: launcher/print surfaces mount NexusEngine local kits for route mapping, paper, booklet navigation, and panel sequence state.
- AR experience clarification: the AR experiences themselves are full 3D and should not include a book/booklet metaphor. The phone-facing AR route should be a consistent flat, glossy, sharp-edged landing page whose only job is to launch the full 3D AR experience.
- Feedback intake rule: feedback-only turns update feedback docs on `main` and do not change app/source files unless implementation is explicit.
- NexusEngine cutover is implemented at the package and source-import boundary; remaining work is promotion and broader DSK conversion across Pages 02-08.
- Expand all eight AR routes from small demos into full, replayable simple strategy experiences with 100-300+ deterministic world objects each and strong interaction feedback.
- Keep the normal first screen focused on launch/place/current objective; advanced controls and debug information belong behind disclosure or debug routes.

## Still Active After Source Pass

- Keep the NexusEngine package pin and regenerated lockfile aligned to the validated core commit.
- Validate `/print/` and the shared booklet/print reader in build, browser preview, and deployed route review.
- Confirm root, launcher, print, book, and phone paths all show the expected shared booklet/print reader surface.
- Validate `/ar/<slug>/` landing pages on phone-sized screens and confirm they launch the full 3D AR experience.
- Confirm the WebGL paper viewport falls back cleanly on older or constrained browsers.
- Decide final `/book/` treatment: keep as compatibility/legacy, redirect to `/print/`, hide from public navigation/static paths, or remove.
- Polish the physical opening transition only after browser/device visual review.
- Run route QA and QR/print readiness after dependency hygiene and route validation are complete.
- Do not restore NexusRealtime-specific runtime structure.
- Define DSK contracts and active-simulation budgets before scaling any experience to hundreds of objects.

## Handling Rule

Before each run, read this file and decide whether any active feedback should change the current prompt or pointer.
