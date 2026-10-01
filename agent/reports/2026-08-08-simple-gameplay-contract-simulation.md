# Simple Gameplay Contract Simulation Review

Date: 2026-08-08  
Scope: Pass 5 specification only; no claim of implemented player behavior

## Prediction

The shared contract should remain readable across all eight pages because
planning/context and Jump are mutually exclusive, JR owns horizontal movement,
and every failure returns to a named local checkpoint without deleting an
accepted route.

## Pass A — Normal Player Paths

| Page | Simulated path | Result |
|---:|---|---|
| 01 | Place, trace Direct route, lock, auto-run, Jump, claim | Stable intro; route choices are one semantic select verb. |
| 02 | Place three glyphs, lock, auto-run, Jump, enter | Stable; each glyph creates visible traversal evidence. |
| 03 | Read motion ghosts, start, three Jumps, reveal | Stable; no artificial planning step or catch control is needed. |
| 04 | Restore one word at each frozen stop, resume, Jump, read | Stable; reading is untimed and context never competes with Jump. |
| 05 | Shift one layer at three bays, run each section, enter | Stable mastery form of Page 02 with the same control grammar. |
| 06 | Match four artifacts, stabilize, run, seal | Stable; choices remain one match verb despite multiple targets. |
| 07 | Hold/release Reveal only while frozen, resume, Jump, seal | Stable if heat uses fixed ticks and accepted reveals cannot be lost. |
| 08 | Verify seven receipts, complete three familiar phases, enter | Stable synthesis; no new control or self-gating eighth receipt. |

## Pass B — Adversarial Paths

| Condition | Required outcome | Contract result |
|---|---|---|
| Jump during planning or safe stop | Reject without mutation; explain when Jump appears. | Defined by phase and safe-stop invariants. |
| Context during motion | Reject as unsafe; runner continues deterministically. | Defined and context control remains hidden. |
| Wrong/stale/repeated target | No graph, checkpoint, or revision mutation. | Defined by command result and reason codes. |
| Miss at a moving or heated beat | Freeze, count once, restore exact tick and plan within two seconds. | Defined by recovery contract. |
| Third miss | Keep `Resume Run` primary; expose optional Help separately. | Defined without adding a competing hero action. |
| Pause during hazard | Freeze route and hazard clock; restore exact phase/tick. | Defined by transient pause mode. |
| Storage failure at completion | Do not pretend reward is durable; expose only Retry Save. | Defined by complete-phase persistence gate. |
| Replay or route reset | Preserve existing reward and avoid duplicates. | Defined by idempotent receipt rules. |
| Page 08 has six, wrong, or corrupt receipts | Fail closed and list exact recoverable pages. | Defined by identity-based seven-slot gate. |

## Ambiguities Resolved

- One hero action means one active semantic verb, not one selectable scene
  object.
- Completion is an internal persisted boundary; reward celebration cannot run
  ahead of save success.
- Safe-stop page actions may be followed by `Resume Run`, but the two are
  sequential and never shown as competing hero controls.
- Assistance is optional and subordinate; it does not replace Jump during
  motion or reduce the reward.
- Physical placement can pause gameplay, but cannot mutate the canonical
  route, reward, or replay rules.

## Executable Table-Model Check

A disposable renderer-free transition model exercised all eight normal paths.
Pages 01, 02, 03, and 06 reached reward directly after their planned run;
Pages 04, 05, 07, and 08 reached reward after 4, 3, 3, and 3 sequential safe
stops. Every path ended in `reward` with one receipt.

Adversarial assertions passed for Jump during planning, context during motion,
stale revision, missed-run plan preservation, Page 08 with six receipts, and
Page 08 with seven receipts. This check proves internal specification
consistency only; it is not NexusEngine runtime or player-view proof.

## Remaining Uncertainty

Player-visible clarity, timing feel, focus behavior, storage-provider behavior,
and jump physics remain unimplemented. Pass 6 must assign ownership without
changing this contract; Pass 7 must prove the first primitive slice with the
actual pinned NexusEngine API and direct-route Playwright.

## Disposition

Specification simulation: pass. Runtime player experience: unverified.
