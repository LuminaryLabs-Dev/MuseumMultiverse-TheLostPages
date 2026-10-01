# 012 Architecture and Skill Map

Status: completed 2026-08-08

## Goal

Complete Pass 6 by assigning one owner and one dependency direction to every
shared gameplay, page-extension, simulator, renderer, save, input, and host
capability needed for the eight greybox experiences.

This is a product handoff, not a tooling deliverable. The map exists only to
clear the shortest path to the Page 01 route/auto-run/Jump/recovery/reward
player proof.

## Inputs

- `goal.md`
- `docs/FINAL-PRODUCT-GOAL.md`
- `docs/SIMPLE-GAMEPLAY-CONTRACT.md`
- `docs/GOAL-MATRIX.md`
- `docs/SIMULATOR-PLAYER-PROOF.md`
- `agent/dependencies.md`
- current source, installed NexusEngine exports, and local Page 01 kits
- preserved `.agent/` architecture/skill discovery as non-authoritative input

## Required Outputs

- app/domain/kit/renderer/input/storage/simulator/AR-host ownership map;
- public contracts and allowed dependency direction;
- existing/reuse/add/propose disposition for every needed capability;
- 4-5 bounded orchestrators;
- a compact set of middle skills and atomic skills with entry/exit evidence;
- deterministic clock, snapshot, replay, save, accessibility, and performance
  budgets;
- one cleared implementation graph for Pass 7.
- one explicit list of deferred workspace, framework, and skill work that does
  not directly advance that player proof.

## Rules

- Preserve the Pass 5 semantic contract.
- Reuse installed public NexusEngine APIs and current Page 01 boundaries before
  adding abstractions.
- Keep story, authored page data, renderer, DOM, camera, WebXR, storage provider,
  and lifecycle in explicit Lost Pages adapters.
- Keep reusable deterministic rules free of browser and renderer globals.
- Route skill creation or expansion through `skill-it` and `bop-it`; proposals
  are not installed or merged skills.
- Do not add A-Frame or another host framework without a bounded capability
  need and explicit architecture decision.
- No application/source implementation in this pass.
- Produce one minimal document and stop; do not build a tool, framework, skill,
  harness platform, or generalized all-page implementation here.

## Completion

Every capability and skill has one owner, input, output, dependency, validation
gate, and disposition; no two layers can independently define gameplay truth;
the first Pass 7 player slice and its exact proof commands are unambiguous.
