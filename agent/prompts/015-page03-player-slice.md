# 015 Page 03 Player Slice

Status: ready Pass 8 context capsule

## Outcome

At a direct Page 03 simulator URL, a player can:

```text
confirm tabletop placement -> read Glide, Lift, and Loop movement ghosts ->
Start Run -> JR auto-runs -> Jump across all three predictable platforms ->
recover at the last safe saddle with exact platform phase ->
land grounded -> Reveal Memory -> see a saved Memory Sketch
```

Landing records each platform impression automatically. Catching or tapping a
moving sketch is not a required control.

## Read Only

1. root `goal.md` Product-Outcome Gate and Pass 8 progress
2. Page 03 row in `docs/SIMPLE-GAMEPLAY-CONTRACT.md`
3. Page 03 section in `docs/FINAL-PRODUCT-GOAL.md`
4. the three owner contracts and adapters in `docs/ARCHITECTURE-SKILL-MAP.md`
5. P03-G/R/P rows in `docs/GOAL-MATRIX.md`
6. `agent/reports/2026-08-08-page02-player-slice-proof.md`
7. current Page 03 source and the exact Page 01-02 owner/simulator interfaces
   it reuses

Do not reload `.agent/`, unrelated docs, final assets, or other page source.

## Allowed Product Scope

- one pure Page 03 authored route/platform descriptor;
- the smallest consumed extension to Auto Runner for the ordered Glide/Lift/Loop
  timing catalog, checkpoints, and exact phase restore;
- reuse of Lost Pages Gameplay and Journey Progress without a new shared owner;
- the smallest Page 03 simulator and player-view extension;
- Page 03 semantic rules proof and direct mobile/desktop player evidence.

## Deferred

- Pages 04-08;
- all-page selector/editor/framework work;
- A-Frame, physical AR, camera, WebXR, or QR scanning;
- final sketch models, textures, room dressing, reader changes, and audio;
- skill creation/mutation, external repositories, deployment, and publication.

## Rules Gate

- Glide, Lift, and Loop are a closed ordered platform catalog with visible path
  and dwell ghosts before `Start Run`;
- each platform phase is fixed-clock, serializable, and deterministic;
- `Jump` is the only action while JR moves; no Catch action is exposed;
- safe landings automatically record distinct Glide/Lift/Loop impressions;
- a miss recovers to the last safe saddle in <=2 seconds, preserves earlier
  impressions, and restores the active platform to its declared phase;
- `Reveal Memory` is available only grounded after all three impressions;
- slot-3 persistence succeeds before Memory Sketch is shown and preserves
  slots 1 and 2;
- reset/replay cannot duplicate or remove slots 1, 2, or 3;
- identical semantic inputs produce identical replay output.

## Player Gate

Run the actual direct Page 03 simulator at 390x844 and desktop. Pass only when
the objective, all three named movement previews, Start Run, Jump-only run,
three automatic impressions, one local recovery, grounded Reveal Memory, save,
named reward, and next action are visible; Reset begins under `More`; no
blocking console error or warning.

## Stop

Stop when Page 03 passes both rules and player gates, or at one concrete blocker
after three bounded add/review cycles. Do not start Page 04 in this prompt.
