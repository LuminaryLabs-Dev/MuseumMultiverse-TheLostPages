# Page 01 Simulator and Player Baseline

Date: 2026-08-08  
Overall result: simulator pass, player-view partial

## Target

- Direct URL: `http://127.0.0.1:4176/sim/ar/sleeping-gallery/`
- Player goal: understand the next action, place the Character Map, solve it,
  and understand completion without QR scanning or debug knowledge.
- Browser viewport: 390 by 844.

## Installed Simulator Surface

Lost Pages composes the shipped Page 01 domain kits through the pinned
NexusEngine `createEngine()` surface. Replay proof used the package-root
`createReplayRunner()` and `assertReplayDeterministic()` exports.

Installed kit ids:

- `realtime-core-kit`
- `sequence-core-kit`
- `n-ar-simulator-kit`
- `n-wall-surface-kit`
- `n-map-unfold-kit`
- `n-canvas-maze-map-kit`
- `n-map-character-kit`
- `n-maze-goal-kit`
- `n-character-map-experience-kit`

Seed: `101`  
Clock: discrete semantic actions; no timed ticks were required by these
scenarios.

## Deterministic Scenarios

| Scenario | Semantic path | Result | Deterministic digest |
|---|---|---|---|
| `page01-complete` | blocked early placement, detect wall, place map, complete unfold, solve | Pass; early placement stayed blocked, recovery completed, goal became true. | `2c3f472b5de9d0b5d88aabe165a31074933bdca6f1e08b00e439125285e9b2ee` |
| `page01-reset` | detect wall, place map, complete unfold, solve, reset | Pass; simulator returned to `ready` and goal returned to false. | `6cfe88242de5a3e9f32dd7ad4244b8becb8667e66c087e5fc7fabe3a390009d8` |

Each scenario ran twice from a fresh runtime. NexusEngine deterministic replay
comparison passed for identical semantic inputs.

## Playwright Player Proof

Visible path:

1. Initial view said `Find a wall` and exposed `Find wall`.
2. The click changed visible state to `Wall found` and exposed `Place map`.
3. Placement and unfold exposed a readable maze, four movement arrows, and a
   `Solve maze` testing control.
4. Solve completed the domain state, but the visible view removed the solve
   control and showed only `Reset`.
5. Browser console errors: zero.

Result: **partial**.

Visible completion-state evidence:
`evidence/2026-08-08-page01-simulator-complete.png`.

The entry and placement sequence is understandable. The completion state is
not: there is no visible completion message, reward identity, or next action.
Reset also remains a first-screen peer to the hero action instead of an
advanced/debug control.

## Technical-versus-visible Gap

The deterministic state reports `goal.completed: true`, while the player view
does not communicate completion. This is the exact mismatch the two-layer
proof strategy is intended to catch.

## Smallest Additive Fix

When the active implementation pass reaches the shared simulator foundation:

- add an explicit completion panel with the Gallery Key Fragment and replay or
  continue action;
- move Reset into an advanced/debug disclosure while keeping it accessible;
- preserve the existing simulator route and domain behavior;
- rerun both deterministic scenarios and the same Playwright player goal.

## Coverage Limits

- Only Page 01 currently has this simulator composition.
- No physical QR, phone camera, WebXR, tracking, audio, or environment-quality
  claim was made.
- The scenario proves completion and reset, not snapshot restoration from a
  serialized envelope or long-duration timed behavior.
