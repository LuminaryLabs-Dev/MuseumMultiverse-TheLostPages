# Page 01 Player Slice Proof

Status: Pass 7 complete  
Evidence date: 2026-08-08  
Public deployment: unchanged at committed baseline `9e3d534`

## Player Outcome

The direct camera-free Page 01 route now supports the intended product flow:

```text
Confirm Placement -> trace five Direct-route points -> Lock Route ->
JR auto-runs -> miss/recover at the crease -> Jump -> final stop ->
Claim Fragment -> saved Gallery Key Fragment -> Continue Journey
```

The old player-facing `Find wall -> Place map -> Solve maze` shortcut is no
longer the Page 01 simulator UX. The deterministic 11x11 Character Map remains
the authored route source.

## Rules Proof

Command:

```bash
npm run proof:page01
```

Result: PASS.

- NexusEngine `createReplayRunner` produced identical outputs for the fixed
  placement/plan/miss/recover/Jump/reward fixture.
- Invalid and stale route inputs left gameplay snapshots unchanged.
- Recovery completed in 60 fixed ticks and preserved the accepted plan.
- A third miss exposed optional Help; pause froze the runner and snapshot/load
  restored the exact state.
- Simulated storage failure kept the reward hidden and exposed Retry Save.
- Route reset and a second completion preserved one identical slot-1 receipt.
- Legacy-array migration, missing-journey repair, confirmation-gated all reset,
  seven-receipt Page 08 eligibility, Jump buffer, and coyote grace passed.
- Auto Runner p95 across 900 fixed steps: 0.0089 ms against the 4 ms ceiling.

## Player Proof

Direct URL:

```text
http://127.0.0.1:4176/sim/ar/sleeping-gallery/
```

| View | Result |
|---|---|
| 390x844 | Complete visible placement, route trace, auto-run, Jump, one miss/recovery, final claim, saved named reward, and next action. |
| 1440x900 | Reward panel and one-hero action layout fit without clipping. |
| Focus/input | Pointer hero controls and keyboard Space reached the same semantic path; the next hero retained predictable focus. |
| Advanced UX | `More` began closed; Pause, replay, Help when eligible, and Reset Route were not hero peers. |
| Persistence | Browser storage contained completed Page 01 plus `gallery-key-fragment` in slot 1 before reward presentation. |
| Console | 0 errors, 0 warnings. |

Evidence:

- `evidence/2026-08-08-page01-mobile-placement.png`
- `evidence/2026-08-08-page01-mobile-plan.png`
- `evidence/2026-08-08-page01-mobile-recovery.png`
- `evidence/2026-08-08-page01-final-mobile-reward.png`
- `evidence/2026-08-08-page01-final-desktop-reward.png`

## Build and Budget

- `npm run build`: PASS; 22 static routes.
- JavaScript: 814.55 kB raw / 220.74 kB gzip, below 225 kB gzip ceiling.
- CSS: 58.54 kB raw / 12.99 kB gzip, below the 13 kB gzip ceiling with minimal
  remaining headroom.
- Existing Vite large-chunk and NexusEngine Node-module externalization warnings
  remain; no new dependency was added.

## Bounded Review Cycles

1. Core add/review: the complete path passed rules and player proof; the safe
   checkpoint HUD label was corrected.
2. Edge audit/review: focused keyboard Space was guarded against duplicate
   dispatch; missing journey-index repair and legacy-safe confirmed reset were
   added and the full proof/build/player path passed again.

## Boundary

Pass 7 proves the shared primitive foundation through one actual player path.
It does not claim final 3-4 minute Page 01 pacing, Pages 02-08, physical wall AR,
tracking recovery, final art, audio, accessibility-mode parity, deployment, or
publication. Pass 8 begins with the separate Page 02 context capsule.
