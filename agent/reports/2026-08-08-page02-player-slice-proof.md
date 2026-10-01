# Page 02 Player Slice Proof

Status: Pass 8 Page 02 slice complete  
Evidence date: 2026-08-08  
Public deployment: unchanged at committed baseline `9e3d534`

## Player Outcome

The direct camera-free Page 02 route now supports the intended product flow:

```text
Confirm Placement -> match Bridge -> Step -> Gate -> Lock Route ->
JR auto-runs -> miss/recover at the frame approach -> Jump ->
grounded final stop -> Enter Portal -> saved Breathing Frame Mark ->
Continue Journey
```

The three accepted glyphs visibly change the living-frame route before it can
be locked. `Jump` is the only hero action while JR moves, and `Enter Portal`
does not appear until the final stop is grounded.

## Rules Proof

Command:

```bash
npm run proof:page02
```

Result: PASS.

- NexusEngine `createReplayRunner` produced identical outputs for the fixed
  placement/build/miss/recover/Jump/portal/reward fixture at 60 Hz.
- Wrong, unknown, repeated, stale, early-lock, unsafe run-time glyph, early
  portal, and airborne final-entry inputs left gameplay state unchanged.
- Recovery completed in 60 fixed ticks, returned to tick 48, and preserved all
  three accepted glyphs.
- Pause froze the runner and snapshot/load restored exact Page 02 state.
- Simulated storage failure kept the reward hidden and exposed Retry Save.
- Page 02 completion preserved an existing slot-1 receipt, wrote slot 2 before
  reward presentation, and reset/replay did not remove or duplicate either.
- Composed runtime APIs: `arSimulator`, `autoRunner`, `journeyProgress`,
  `lostPagesGameplay`, plus Nexus `realtime` and `sequence` services.

`npm run proof:page01` also remains PASS after the shared-owner extension.

## Player Proof

Direct URL:

```text
http://127.0.0.1:4176/sim/ar/frame-that-breathes/
```

| View | Result |
|---|---|
| 390x844 | Placement, all three visible socket changes, built route, one captured recovery, keyboard Jump, grounded portal entry, named saved reward, and next action are readable. |
| 1440x900 | Reward panel and one-hero action layout fit without clipping. |
| Input/focus | Pointer controls build and enter; keyboard Space dispatches the same `jump.press`; the next hero receives focus after rerender. |
| Advanced UX | `More` begins closed; Help when eligible, replay, and Reset Route remain below the hero path. |
| Persistence | Browser storage contains completed Page 02 plus `breathing-frame-mark` in slot 2 before reward presentation; the rules proof covers simultaneous slots 1 and 2. |
| Console | 0 errors, 0 warnings. |

Evidence:

- `evidence/2026-08-08-page02-mobile-placement.png`
- `evidence/2026-08-08-page02-mobile-frame-empty.png`
- `evidence/2026-08-08-page02-mobile-frame-built.png`
- `evidence/2026-08-08-page02-mobile-recovered.png`
- `evidence/2026-08-08-page02-mobile-reward.png`
- `evidence/2026-08-08-page02-desktop-reward.png`

## Build and Budget

- `npm run build`: PASS; 23 static routes.
- JavaScript: 825.15 kB raw / 223.60 kB gzip, below the 225 kB gzip ceiling.
- CSS: 58.54 kB raw / 12.99 kB gzip, below the 13 kB gzip ceiling.
- Existing Vite large-chunk and NexusEngine Node-module externalization warnings
  remain; no new dependency or CSS rule was added.

## Bounded Review Cycles

1. Product add/review: full rules, build, mobile/desktop path, persistence, and
   Page 01 regression passed.
2. Human-view repair/review: replaced repeated placement feedback and premature
   `Portal Open` copy with stable-anchor feedback and `Route Built`; all proof,
   build, and visible checks passed again.

## Boundary

This closes the Page 02 greybox interaction, reward, and proof slice. It does
not claim final 3-4 minute pacing, Pages 03-08, physical wall AR, tracking
recovery, final art, audio, deployment, or publication. Pass 8 remains active
and advances to a separate Page 03 context capsule.
