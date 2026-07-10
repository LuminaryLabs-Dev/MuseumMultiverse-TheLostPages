# NexusSimulator Card Rail Validation

Date: 2026-07-10
Status: passed with performance caveat

## Validated Build

- Target: production `dist/` static artifact
- NexusSimulator environment: `lost-pages-rail`
- Geometry scenario: `scroll-geometry`
- Passing run: `1783672189643-lost-pages-rail-scroll-geometry-playwright-3b2a999f`

## Geometry and Overlap Result

- Four cards are visible at rest.
- At most three cards remain render-visible during motion.
- Exactly one outgoing card is active during the sampled transition.
- Outgoing card X position was `1.3503`, proving rightward travel.
- Outgoing card Z position was `0.4097`, placing it in front of the stack.
- `rail.outgoingClear` passed, including a minimum depth separation from the incoming stack.
- Before and right-flight screenshots were captured.
- Browser console errors: `0`.

## Performance Changes

- Removed the per-page 1024px CPU sharpening loop.
- Lazy-upgrade only the active and next texture at 768px during idle time.
- Reduced maximum device pixel ratio from `2` to `1.25`.
- Disabled MSAA for the texture-dominant comic scene.
- Stopped invalidating page materials every frame.
- Hide unnecessary shine and shadow layers on rear cards.
- Limit motion-time rendering to the outgoing card and two stack cards.
- Update Lost Page focus only when the active index changes.
- Reuse the camera target vector instead of allocating one per frame.

## Performance Evidence

- Screenshot-free Chromium sustained-scroll sample: 120 frames, 51 FPS, 19.47ms average, 17.3ms p95, two frames above 25ms.
- NexusSimulator software-WebGL screenshot runs emit `ReadPixels` stall warnings; screenshot capture and FPS measurement must remain separate scenarios.
- NexusSimulator timing telemetry now fails closed when no valid active-frame timing window exists.

## Remaining Risk

- Software WebGL performance varies significantly during screenshot capture.
- A physical lower-end phone/browser performance pass remains useful before calling the rail fully optimized.
