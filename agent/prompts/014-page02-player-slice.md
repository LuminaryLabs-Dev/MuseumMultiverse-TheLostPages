# 014 Page 02 Player Slice

Status: complete 2026-08-08

## Outcome

At a direct Page 02 simulator URL, a player can:

```text
confirm wall placement -> match Bridge, Step, and Gate to their sockets ->
lock the visibly built living-frame route -> watch JR auto-run -> Jump ->
recover locally if missed -> Enter Portal while grounded ->
see a saved Breathing Frame Mark
```

## Read Only

1. root `goal.md` Product-Outcome Gate and Pass 8 row
2. Page 02 row in `docs/SIMPLE-GAMEPLAY-CONTRACT.md`
3. the three owner contracts and adapters in `docs/ARCHITECTURE-SKILL-MAP.md`
4. P02-G/R/P rows in `docs/GOAL-MATRIX.md`
5. `agent/reports/2026-08-08-page01-player-slice-proof.md`
6. current Page 02 source and the exact Page 01 owner/simulator interfaces it reuses

Do not reload `.agent/`, unrelated docs, final assets, or other page source.

## Allowed Product Scope

- one pure Page 02 authored reducer/route descriptor;
- reuse of Lost Pages Gameplay, Auto Runner, and Journey Progress without a new
  shared owner;
- the smallest Page 02 simulator adapter and player-view extension;
- Page 02 semantic rules proof and direct mobile/desktop player evidence.

## Deferred

- Pages 03-08;
- all-page selector/editor/framework work;
- A-Frame, physical AR, camera, WebXR, or QR scanning;
- final models, textures, environment dressing, reader changes, and audio;
- skill creation/mutation, external repositories, deployment, and publication.

## Rules Gate

- Bridge, Step, then Gate are closed semantic targets with visible sockets;
- wrong, repeated, stale, or out-of-order placement does not mutate the route;
- Lock Route is unavailable until all three edges are valid;
- Jump is the only action while JR moves; socket context is unavailable;
- miss recovery is local, <=2 seconds, and preserves all accepted glyphs;
- Enter Portal is available only grounded at the final stop;
- slot-2 persistence succeeds before the Breathing Frame Mark is shown;
- replay/reset cannot duplicate or remove slots 1 or 2;
- identical semantic inputs produce identical replay output.

## Player Gate

Run the actual direct Page 02 simulator at 390x844 and desktop. Pass only when
the objective, three socket changes, built route, Jump, one recovery, grounded
portal entry, save, named reward, and next action are visible; Reset begins
under `More`; no blocking console error.

## Stop

Stop when Page 02 passes both rules and player gates, or at one concrete blocker
after three bounded add/review cycles. Do not start Page 03 in this prompt.

## Result

Complete after two bounded cycles. `npm run proof:page02`, the Page 01
regression proof, the 23-route production build, and the direct 390x844 plus
1440x900 player gates pass. Durable evidence:
`../reports/2026-08-08-page02-player-slice-proof.md`.
