# Shared Game Runtime — Video and Smoke Proof

## Correction — 2026-09-22

The coverage claims below are historical and overstated. The final clip was made with `-t 30` from an 86.166-second capture. Its 30-second duration does not prove that later scenes or pause/resume appear in the final clip. Retain it as historical footage, not full walkthrough acceptance.

The original `advance(250)` clamped the input to 50 ms. Its smoke check asserted only the unpaused flag, not movement or elapsed simulation time. It did not prove a 250 ms simulation or completion of eight games. The current reconciliation replaces this with a shared fixed-step clock and assertions for 15 ticks, movement distance, and frozen pause state. Fresh results belong in the reconciliation report.

## Outcome

The browser game runtime now has a repeatable smoke command and a 30-second, 1280x720 walkthrough recording. The recording shows the museum hub, Page 01, Page 05, Page 08, movement, and the pause/recovery path.

## Smoke command

```text
npm run smoke:game
```

The command opens each route from `page01` through `page08`, checks that one game canvas and the pause control are present, advances the runtime with `advance(250)` (a 250 ms delta-time step), confirms the game is still active, opens the pause menu, and confirms the paused state.

Result: `game smoke: PASS` for all eight routes.

## Walkthrough artifact

```text
output/playwright/lost-pages-30s-walkthrough.webm
```

Verified with ffprobe:

- Duration: 30.000 seconds
- Frame size: 1280x720
- Frame rate: 30 fps
- Format: WebM

The source recording was trimmed to exactly 30 seconds after capture. The source capture remains beside it as `lost-pages-30s-walkthrough-v2.webm` for provenance.

## Coverage

- Museum hub scene
- Page 01 museum entry
- Page 05 platform diorama
- Page 08 final portal
- Keyboard movement using delta-time-driven update flow
- Pause menu opened and resumed
- All eight page routes smoke-checked

## Boundary

This is browser runtime evidence. It does not claim physical-device WebXR tracking, camera permission, or world-locking validation.
