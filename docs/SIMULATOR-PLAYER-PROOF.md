# Simulator and Player Proof Strategy

Status: canonical validation strategy

## Purpose

Lost Pages gameplay is developed and reviewed through a repeatable NexusEngine
simulation space plus a direct-route browser player view. Routine gameplay
validation must not depend on printing or scanning a QR code, camera access, or
recreating a polished museum environment.

The target is the player outcome: the objective is understandable, the input
works, feedback explains the result, failure is recoverable, completion is
clear, and replay is safe.

## Current Installed Surface

The pinned `nexusengine@0.0.3` package publicly exports `createEngine`,
`createReplayRunner`, `assertReplayDeterministic`, snapshot helpers, and Domain
Service Kit composition. Lost Pages has app-owned Page 01 and Page 02
simulators at `/sim/ar/sleeping-gallery/` and
`/sim/ar/frame-that-breathes/`. Both compose the same three renderer-neutral
owners and expose semantic commands, snapshots, reset, and fixed-tick replay;
Page 01 additionally consumes the Character Map family.

At the pinned revision, the package contains scenario driver and duration
modules but does not export them from the package root. New proof code must use
the actual public package API or an explicit local adapter; it must not invent
an unavailable `NexusSimulator` interface.

## Additive Testing-Space Target

Extend the current simulator seam into one direct testing space for all eight
experiences. Preserve AR routes and public behavior while adding:

- one simulator route or workspace selector for each page;
- the same domain kits and authored configuration used by the shipped runtime;
- fixed seed, fixed clock, semantic input, snapshot, reset, and replay controls;
- startup, normal play, failure, recovery, completion, reward, and replay
  scenarios;
- a compact player view with only the current objective and hero action;
- an advanced/debug foldout for seed, state, digest, metrics, and reset;
- visible scenario status and failure reasons.

The testing space is an additive adapter. It must not replace or narrow the
existing AR, debug, reader, or Page 01 simulator surfaces.

## Two-Layer Proof Loop

### Layer 1: deterministic simulator proof

For each page:

1. Compose the same domain kits used by the runtime.
2. Start from a declared seed and clock.
3. Drive semantic inputs, not DOM selectors.
4. Exercise startup, normal play, failure, recovery, reset, snapshot, replay,
   reward, and completion.
5. Run identical inputs twice and compare deterministic results or digests.
6. Record the kit ids, seed, clock, scenarios, snapshots, result, and coverage
   limit.

This layer proves rules and composition. It does not prove that the experience
is understandable or feels good.

### Layer 2: Playwright player proof

Open the actual running direct simulator or debug URL and test one declared
player goal through real visible controls. Capture the initial state and every
meaningful state change. A pass requires:

- the player can see what to do without debug knowledge;
- the hero control is usable;
- each action produces visible, timely feedback;
- failure explains the next useful action;
- recovery and reset do not trap or confuse the player;
- completion and reward are unmistakable;
- the browser shows the intended app with no blocking errors.

This layer proves player-visible UX. It does not prove physical AR tracking.

## Bounded Add-and-Review Loop

Within one matrix row or one shared capability:

```text
simulate rules
  -> Playwright player path
  -> classify pass / partial / fail
  -> add the smallest missing feedback or interaction capability
  -> rerun both layers
```

Run at most three review cycles in one bounded batch. Stop on a stable pass or
record one concrete blocker. Preserve existing behavior by using adapters,
wrappers, new modules, or configuration extension before changing stable
internals.

## Evaluation Priority

Score these first:

1. objective comprehension;
2. input-to-result clarity;
3. feedback timing and meaning;
4. failure and recovery;
5. completion and reward readability;
6. replay and reset safety;
7. consistency across eight pages;
8. accessibility and performance.

Do not use object count, environment detail, light count, mounted canvases,
nonblank pixels, or simulator completion as substitutes for player-visible
quality.

## QR and Physical-AR Boundary

- Use direct local or built routes for routine gameplay proof.
- Validate QR destination strings and static route export structurally; do not
  make a physical QR scan part of the gameplay iteration loop.
- Keep camera, WebXR, tracking, and physical-surface proof separate and label
  it unverified until an explicitly scheduled device pass.
- Environment realism is not a blocker for greybox acceptance. Spatial scale,
  placement guidance, safe framing, and recovery still require later host
  validation because they affect player outcome.

## Simulation Prediction and Review

Expected outcome: simulator-first work should shorten iteration and expose
rule, reset, replay, and feedback gaps before AR-host complexity is introduced.
The review pass predicts the same result only if Playwright remains a separate
human-view gate; simulator success alone would drift toward technically correct
but confusing experiences.

Assumptions:

- each final experience can expose semantic actions through a renderer-neutral
  domain contract;
- direct simulator routes remain available in development and static preview;
- physical AR is still a final host concern, not the core gameplay harness.

Current uncertainty: Pages 03-08 do not yet expose complete domain contracts,
so their simulator scenarios cannot be considered implemented until the shared
greybox and eight-page greybox passes produce those contracts.

## Current Baseline

The original 2026-08-08 Page 01 baseline exposed a silent completion gap. Pass
7 closed it with a product-facing player simulator and a durable
`npm run proof:page01` rules gate. The 390-by-844 path now visibly covers
placement, route trace, auto-run, Jump, one miss/recovery, claim, save, named
reward, and next action; the desktop reward state also passes with zero console
errors. Page 02 now repeats the same two-layer gate for a different authored
plan reducer: three visible glyph sockets build the route, one miss rewinds in
60 ticks, keyboard Jump clears it, grounded `Enter Portal` persists slot 2, and
the named reward is readable at mobile and desktop with zero console messages.
See `../agent/reports/2026-08-08-page01-player-slice-proof.md` and
`../agent/reports/2026-08-08-page02-player-slice-proof.md`. Pages 03-08 remain
the Pass 8 gap.
