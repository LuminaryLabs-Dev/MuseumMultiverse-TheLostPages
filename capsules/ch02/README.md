# Chapter 02: The Frame That Breathes

The Lost Pages Chapter 02 painting platformer lives under `public/ch02/` and is available from `/ch02/` after a static build. Numbered Page 02 links and `/ar/frame-that-breathes/` redirect to the new platformer. The older `/sim/ar/frame-that-breathes/` and `/debug/ar/frame-that-breathes/` routes remain available.

## Controls and completion

Run using left/right or A/D, jump using Space/W/up, use E near a glyph or portal, and restart using R. Touch buttons are provided. JR collects five ink stars, activates Bridge/Stairs/Gate glyphs, and enters the portal to earn Canvas Whisper.

## AR behavior

The gallery is fully playable on desktop and mobile. Camera preview is screen-aligned, not surface-tracked. Optional WebXR wall anchoring uses vertical hit testing and requires compatible HTTPS hardware; physical-device verification is still outstanding.

## Save boundary

The capsule currently stores `breathing-frame-mark` in `localStorage['lostpages.capsule.chapter02.v1']` and emits `lostpages:chapter-complete`. This receipt is **not yet integrated** with the main Lost Pages journey store. Do not claim eight-page continuity until receipt reconciliation is implemented and tested.

## Sandbox validation

The source-only local capsule passed three headless Chromium scripts: desktop UI/reward checks, full movement-based level traversal, and touch/help/sound controls. No GitHub Actions or cloud builds were used. Serve `public/` with a local static server to verify the `/ch02/` route. The source requires no additional runtime dependencies.
