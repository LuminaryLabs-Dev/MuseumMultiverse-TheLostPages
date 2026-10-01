# Lost Pages Simple Gameplay Contract

Status: canonical Pass 5 interaction contract  
Evidence date: 2026-08-08

## Purpose

All eight experiences use one small rule set. The player plans or changes one
thing while JR is safe, then JR auto-runs and the player only presses `Jump`.
The page ends with one explicit action and a durable reward.

This contract owns player-facing state, commands, feedback, recovery, save,
and replay semantics. It does not choose renderer, camera, WebXR, DOM,
Three.js, storage-provider, kit, or host ownership; Pass 6 assigns those.

## The Whole Game in One Line

```text
Place -> Plan one thing -> Run with Jump -> Recover locally -> Finish -> Reward
```

Pages may repeat the `safe stop -> change one thing -> run` pair, but they do
not add free movement, a joystick, camera control, combat, or simultaneous
hero actions.

## First-Screen Player Contract

The normal player surface has four required regions:

| Region | Purpose | Rule |
|---|---|---|
| Objective | Say what happens next. | One short sentence; no implementation language. |
| World | Show JR, the route, the next landmark, and selectable scene targets. | Safe, hazard, interactable, checkpoint, and goal roles never rely on color alone. |
| Hero action | Perform the one action needed now. | Exactly one primary semantic verb is active. |
| Feedback | Explain the last result and useful next step. | Visible text or symbol plus optional sound/haptic response. |

Optional actions live under `More` or a debug-only surface: Replay, route
reset, all-progress reset, Help before it is earned, seed, scenario, metrics,
state, digest, timing, tuning, accessibility settings, collection detail, and
mastery records. Reset is never beside or styled like the hero action.

`Continue Journey` is the reward-screen hero action. `Replay` remains in
`More`, so even the final screen has one primary choice.

### One action does not mean one selectable object

A plan may show several map nodes, glyphs, artifacts, or sockets. They are
choices within one active verb, not separate control modes. Touch may combine
select and confirm. Pointer, keyboard, switch, and simulator paths emit the
same semantic command and receive the same result.

## Canonical Primary Phases

| Phase | Player meaning | Active hero verb |
|---|---|---|
| `start` | The experience is ready but has not begun. | `Start` |
| `placement` | Choose the simulated or physical support. | `Confirm Placement` |
| `plan` | Create or confirm the route before movement. | Current plan verb or `Start Run` |
| `run` | JR moves automatically. | `Jump` |
| `safeStop` | JR is grounded and the route is frozen for one contextual beat. | Current context, recovery, final, or `Resume Run` verb |
| `complete` | Completion and reward are being persisted. | None, unless save needs `Retry Save` |
| `reward` | The saved receipt and reward are visible. | `Continue Journey` |
| `replay` | A mastery attempt is being prepared. | `Start Replay` |

`paused` and `recovering` are transient modes, not new progress phases. Each
stores `resumePhase`; leaving the mode restores the exact legal phase and
canonical simulation tick.

## Legal Transitions

| From | Accepted cause | To | Required result |
|---|---|---|---|
| `start` | `session.start` | `placement` | Explain the target support. |
| `placement` | `placement.confirm` | `plan` | Freeze canonical gameplay coordinates and show the premise. |
| `plan` | Valid page command | `plan` | Update accepted plan and preview only the affected route part. |
| `plan` | Route-ready command or `run.start` | `run` | Commit checkpoint zero and start fixed-tick auto-run. |
| `run` | JR reaches a planned stop | `safeStop` | Commit checkpoint before exposing context. |
| `safeStop` | Valid context command | `safeStop` | Commit the accepted change; select the next safe verb. |
| `safeStop` | `run.resume` | `run` | Start only when the next route segment is valid. |
| `run` | Final landing reached | `safeStop` | Ground JR and expose only the page's final action. |
| `safeStop` | Valid final action | `complete` | Create completion and reward receipt in one idempotent operation. |
| `complete` | Persistence succeeds | `reward` | Present the already-saved reward. |
| `complete` | Persistence fails | `complete` | Preserve a pending receipt and expose only `Retry Save`. |
| `reward` | `journey.continue` | route exit | Return to the shared reader or next eligible journey destination. |
| `reward` | replay selected under `More` | `replay` | Preserve reward; clear attempt-local movement and misses. |
| `replay` | `replay.start` | `plan` or `run` | Use the page's declared mastery start with existing reward read-only. |

Any transition not listed is rejected without mutation. Host tracking loss
pauses the primary phase; it never advances gameplay.

## Semantic Command Envelope

Every touch, pointer, keyboard, switch, simulator, or replay input becomes:

```text
Command {
  commandId
  sessionId
  pageId
  name
  targetId?          // semantic object id, never a DOM selector or 3D object
  value?             // closed command-specific value
  expectedRevision   // rejects stale repeated UI input
  issuedAtTick       // canonical simulation tick, not wall-clock time
  source             // touch | pointer | keyboard | switch | simulator | replay
}
```

The domain returns:

```text
CommandResult {
  accepted
  reason             // closed reason code
  revision
  phase
  events[]
}
```

Accepted commands increment the page revision once. Rejected commands do not
change revision, plan, checkpoint, runner, reward, or save state.

Closed rejection reasons are `wrong_phase`, `not_eligible`, `unsafe`,
`invalid_target`, `invalid_order`, `stale_revision`, `already_applied`,
`already_buffered`, `cooldown`, `route_incomplete`, `receipt_missing`, and
`save_unavailable`. The player receives plain-language guidance; debug views
may also display the code.

## Hero-Control Selector

The selector is deterministic and chooses the first eligible item:

1. `Retry Save` when a completed receipt is pending persistence.
2. `Start` or `Confirm Placement` before gameplay.
3. The final page action when JR is grounded at the final stop.
4. The current safe-stop context action.
5. `Resume Run` after a valid safe-stop change or recovery.
6. The current plan action, route lock, or `Start Run`.
7. `Jump` while the runner is active.
8. `Continue Journey` after the reward is persisted.

The selector must return exactly one active hero descriptor or a named
contract error. It never silently returns two actions. A renderer may show
disabled explanatory scene targets, but only the selected hero verb can
mutate state.

## Runner and Jump Rules

- JR moves only from authored route edges at a fixed simulation tick.
- The player has no left/right, free-roam, joystick, drag-to-move, or camera
  command.
- `Jump` is eligible only in `run` while `runnerActive` is true and
  `contextEligible` is false.
- A press produces one fixed jump request; holding does not increase height.
- One 150 ms pre-landing input buffer and one 100 ms coyote-grace window make
  first clears generous. There is no double jump.
- Repeated presses while one jump is buffered reject as `already_buffered`
  without incrementing the beat miss count.
- Collision, landing, hazard, and moving-platform phase are evaluated from the
  fixed clock. Pause freezes them together.
- Reduced-motion presentation does not change route geometry or acceptance
  timing; assistance may explicitly widen a timing window.

## Safe-Stop and Context Rules

A safe stop is valid only when all are true:

```text
phase == safeStop
grounded == true
runnerActive == false
velocity == zero
checkpointCommitted == true
hazardActive == false
```

At a safe stop, `Jump` is hidden and rejects as `wrong_phase`. During a run,
page context is hidden and rejects as `unsafe`. This mutual exclusion is the
central simplicity invariant.

An accepted context action may change only its declared plan fragment and
route edges. Wrong, repeated, stale, or out-of-order context commands leave the
accepted route unchanged and explain the useful next action.

## Feedback Contract

| Event | Visible response | Timing target |
|---|---|---:|
| Input received | Press/select state begins. | within 100 ms |
| Accepted action | Named object/route part changes and objective advances. | within 250 ms |
| Rejected action | Nothing mutates; reason and next useful action appear. | within 250 ms |
| Route ready | New traversable segment is outlined with a non-color cue. | same accepted event batch |
| Jump buffered | JR and the Jump target acknowledge the queue. | within 100 ms |
| Checkpoint | Stable marker plus short label; save begins. | at checkpoint tick |
| Miss | Hazard freezes; `Rewinding to <checkpoint>` appears. | next rendered frame |
| Recovery | JR is safely restored; `Resume Run` is active. | within two seconds |
| Help earned | `Show Help` appears under assistance, not beside Jump. | after third miss at one beat |
| Completion | Final landmark resolves and save status is explicit. | after final command |
| Reward | Reward name, page completion, and journey progress are visible. | only after persistence succeeds |

Sound and haptics are enhancements. Every outcome has an equivalent visible
and screen-reader-readable description. Decorative animation never delays the
next semantic action.

## Failure, Recovery, Pause, and Help

### Missed jump

1. Freeze the runner and hazard on the miss tick.
2. Increment `missesByBeat[beatId]` once.
3. Enter `recovering` with the latest committed checkpoint.
4. Preserve every accepted plan fragment and every existing reward receipt.
5. Restore JR, route phase, moving-platform phase, and local clock.
6. Return within two seconds to `safeStop` with `Resume Run` as hero.

No first-clear checkpoint may erase more than 60 seconds of progress.

### Assistance

After the third miss at one beat, `Show Help` becomes available under the
assistance disclosure. Choosing it may reveal the safe path, slow only the
local hazard, widen the jump window, or enable the catch landing. It does not
remove the reward, alter earlier receipts, or become required for completion.

### Pause and restore

Pause stores the primary phase, fixed tick, checkpoint, runner state, accepted
plan, and page extension state. Resume restores them exactly. Wall-clock time
does not advance hazards, heat, platforms, timers, or the replay digest.

## Route Reset, Replay, and All Reset

- Route reset is advanced. It clears the current attempt's plan, runner,
  checkpoints, assistance counters, and temporary page state, then returns to
  `plan` if placement remains valid or `placement` otherwise.
- Route reset never removes a completion receipt or journey reward.
- Replay starts a fresh attempt using the existing reward as read-only; an
  additional completion returns `already_applied` and cannot duplicate it.
- All-progress reset requires a separate confirmation that names all eight
  pages. It is the only operation allowed to remove journey receipts.

## Save and Reward Contract

The local-first semantic store has one independently recoverable journey
record and one record per page. It stores no camera frames, room mesh, WebXR
state, renderer objects, cache, DOM state, or diagnostics.

```text
JourneyRecord {
  schemaVersion
  revision
  rewardSlots[1..8]  // validated receipt references or empty
}

PageRecord {
  schemaVersion
  pageId
  revision
  acceptedPlan
  checkpoint         // id, beat, primary phase, canonical tick, extension state
  completed
  rewardReceipt?     // pageId, rewardId, slot, completionRevision
  assistance         // misses and enabled help by beat
  mastery            // bounded semantic results only
}
```

Writes are copy-on-write and validate before replacing the prior record. A
page write and its reward-slot update commit as one logical operation. If
either validation or persistence fails, the prior record remains current and
the pending completion can retry. A corrupt page record is isolated, named,
and recoverable without deleting valid pages.

Reward identity is fixed:

| Slot | Page | Reward id |
|---:|---:|---|
| 1 | 01 | `gallery-key-fragment` |
| 2 | 02 | `breathing-frame-mark` |
| 3 | 03 | `memory-sketch-fragment` |
| 4 | 04 | `red-seal-warning` |
| 5 | 05 | `tiny-portal-badge` |
| 6 | 06 | `portal-stabilizer-fragment` |
| 7 | 07 | `shadow-exhibit-fragment` |
| 8 | 08 | `final-portal-key` |

Receipt creation is idempotent by page, slot, and reward id. A replay returns
the existing receipt. It never updates another page or consumes an earlier
receipt.

### Page 08 gate

Page 08 readiness derives from seven valid, correctly identified receipts in
slots 1-7—not a raw count. Zero through six receipts, a wrong reward id, or a
corrupt record fails closed and lists the exact pages to recover. Checking
eligibility never mutates progress. Slot 8 remains empty until the final portal
command completes and Page 08's page record plus receipt persist.

## Eight-Page Extension Table

| Page | Plan or safe-stop verb | Route-ready rule | Run | Final verb |
|---:|---|---|---|---|
| 01 | Select adjacent Direct-route node; optional Undo | Heart path valid, then `Lock Route` | Auto-run; one generous crease Jump | `Claim Fragment` |
| 02 | Place Bridge, Step, Gate in matching sockets; optional Remove | Three valid glyph edges, then `Lock Route` | Auto-run built frame route; Jump | `Enter Portal` while grounded |
| 03 | No route manipulation; movement ghosts preview timing | `Start Run` | Glide, Lift, Loop platforms; Jump | `Reveal Memory` on static landing |
| 04 | At four stops restore FOLLOW, VOICES, SEALED, WING | One accepted word creates next edge; `Resume Run` | Auto-run between word stops; Jump | `Read Warning` without timer |
| 05 | At three bays shift the one labeled layer; optional Undo | Valid layer, then `Lock Section` / `Resume Run` | Three living-frame sections; Jump | `Enter Tiny Portal` |
| 06 | Match water, forest, stone, star; optional Remove | Four valid lanes, then `Stabilize Route` | Auto-run four lanes; Jump | `Seal Exhibit` |
| 07 | At three stops `Hold Reveal`; release/cool; accept EYE, RUNE, MARK | Accepted reveal creates next edge; `Resume Run` | Auto-run revealed route; Jump | `Seal Canvas` |
| 08 | With slots 1-7 valid, use familiar glyph, layer, and reveal contexts | Each of three phases commits one familiar edge | Auto-run synthesis; Jump | `Enter Restored Portal` |

Page extensions may add closed target ids and extension state required by this
table. They may not add movement axes, camera input, combat, a new finale verb,
or context eligibility during motion.

## Deterministic Contract Fixtures

Every page adapter must support these semantic scenarios before final art:

1. start and placement confirmation;
2. valid first-clear plan and route lock;
3. wrong, stale, repeated, and out-of-order context with no mutation;
4. Jump eligibility, buffer, landing, and early/late miss;
5. checkpoint recovery within the declared tick budget;
6. third-miss Help availability and assisted retry;
7. pause and exact fixed-tick restore;
8. completion persisted before reward presentation;
9. replay with no duplicate reward;
10. route reset preserving journey receipts;
11. corrupt page isolation and save retry;
12. identical seed and semantic inputs producing identical snapshots/digests.

Page 08 adds 0-6-missing, 7-ready, wrong-id, corrupt-record, and 8-complete
fixtures.

## Player-View Acceptance

At 390-by-844 and one desktop viewport, Playwright must verify:

- the objective and current hero verb are visible without debug knowledge;
- advanced controls are closed initially and Reset is not a hero peer;
- every phase exposes one primary verb and no Jump/context overlap;
- accepted and rejected actions visibly explain their result;
- one miss visibly recovers and three misses expose optional Help;
- completion, save, named reward, and journey progress are unmistakable;
- keyboard focus remains on or moves predictably to the next hero action;
- touch, pointer, keyboard, switch-order, simulator, and replay inputs resolve
  to the same semantic command result;
- silent, reduced-motion, high-contrast, and text alternatives retain meaning;
- the browser has no blocking errors.

Physical QR scanning, camera permission, tracking, room detail, and final art
are not Pass 5 gameplay-contract acceptance. Later host and art passes must not
change these semantic rules.

## Pass 5 Exit Invariants

- Every page maps to the same eight primary phases.
- Exactly one hero descriptor is active in every stable player state.
- Jump and page context are mutually exclusive.
- Rejected actions never mutate state.
- Misses rewind locally and preserve accepted plan.
- Pause/restore is fixed-tick exact.
- Completion persists before reward presentation.
- Replay and route reset preserve journey rewards.
- Page 08 reads seven prior receipts and writes the eighth only after success.
- Simulator and player proof can observe every required result without a QR
  scan or polished environment.
