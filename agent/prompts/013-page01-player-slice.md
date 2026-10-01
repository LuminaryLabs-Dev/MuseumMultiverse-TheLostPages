# 013 Page 01 Player Slice

Status: completed 2026-08-08

## Outcome

At the existing direct Page 01 simulator URL, a player can:

```text
confirm placement -> trace and lock the highlighted Direct route ->
watch JR auto-run -> press Jump -> miss/recover locally ->
claim and visibly save the Gallery Key Fragment
```

## Read Only

1. `goal.md` Product-Outcome Gate
2. `docs/SIMPLE-GAMEPLAY-CONTRACT.md`
3. `docs/ARCHITECTURE-SKILL-MAP.md` Pass 7 Product Slice
4. Page 01 rows in `docs/GOAL-MATRIX.md`
5. current Page 01 map, simulator, runtime, and progress source

Do not reload provisional `.agent/` discovery or unrelated supporting docs.

## Allowed Product Scope

- the three cleared renderer-neutral owners only as Page 01 consumes them;
- Page 01 authored route definition;
- existing Page 01 simulator session and player view;
- semantic input/player shell and injected storage adapter required by the path;
- deterministic and Playwright proof artifacts.

## Deferred

- Pages 02-08;
- A-Frame or any new dependency;
- physical AR and QR scanning;
- reader redesign, final assets, environment dressing, generalized editor;
- skill creation/mutation and external repository changes.

## Rules Gate

- one hero action at a time;
- Jump and context never compete;
- rejected commands do not mutate;
- miss recovery <=2 seconds and preserves the accepted route;
- completion persists before reward display;
- replay/reset never duplicates or removes the receipt;
- fixed seed/input replay is deterministic.

## Player Gate

Run the actual direct simulator at 390x844 and desktop. Pass only when the
objective, route change, Jump, recovery, completion, save, named reward, and
next action are visible; Reset begins under `More`; no blocking console error.

## Stop

Stop when Page 01 passes both rules and player gates, or at one concrete blocker
after three bounded add/review cycles. Do not start Page 02 in this prompt.
