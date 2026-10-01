# Final Product Goal Simulation Review

Date: 2026-08-08  
Scenario: all eight final page contracts use the shared Plan-Run-Reward grammar.  
Expected outcome: a first-time player understands and completes each route with
one normal action at a time.  
Result: specification is stable; player-visible implementation is unverified.

## Prediction Summary

The proposed flow should feel substantially simpler than the discovery draft
because JR auto-runs, Jump is the only motion control, and every page-specific
action occurs at a safe stop instead of competing with movement.

## Likely Outcome Chain

- The player sees one immediate action rather than a persistent control set.
- Planning changes the same route the player will traverse, so feedback has a
  visible cause and result.
- Auto-run removes camera, steering, and movement-mode confusion.
- Checkpoint rewind keeps failure local and preserves accepted puzzle state.
- A distinct completion panel makes reward and next action explicit.
- Reusing the grammar across pages lowers onboarding cost while page-specific
  route transformations preserve identity.

## Per-Page Complexity Review

| Page | Required action types | Likely comprehension | Main drift risk | Control |
|---:|---:|---|---|---|
| 01 | map step, Jump, claim | Clear after highlighted Direct route | Free-form maze planning could become too long. | Highlight first-clear route; Explore only on replay. |
| 02 | glyph match, Jump, enter | Clear cause-and-effect lesson | Three glyph roles could look interchangeable. | Distinct shapes, labels, sockets, and route preview. |
| 03 | Jump, reveal | Simplest route | Moving timing could be visually ambiguous. | Full path, dwell cue, and exact checkpoint phase. |
| 04 | word restore, Jump, read | Clear at one word per safe stop | Reading could become a speed or language gate. | No decoys, typing, timer, or reading-speed test. |
| 05 | layer shift, Jump, enter | Understandable moderate hero route | Layer depth could add camera and navigation complexity. | Fixed head-on view, one actionable layer per bay, no joystick. |
| 06 | artifact match, Jump, seal | Clear four-match construction | Sorting and traversal could feel disconnected. | Every match visibly builds one named lane before Run. |
| 07 | Hold Reveal, Jump, seal | Clear if heat remains soft | Heat could feel punitive or obscure the path. | Heat cancels only unaccepted reveal and preserves progress. |
| 08 | familiar context, Jump, enter | Clear to returning players | Finale could introduce too many recalled rules. | Only three short phases and no new control. |

## Review Pass

- Pass 1 prediction: the shared hero-control rule makes the eight routes
  readable and preserves distinct page identity through what changes the path.
- Review pass prediction: the result remains stable only if contextual actions
  and Jump never compete, first clears stay within their duration bands, and
  completion feedback is explicit.
- Reconciled result: stable specification with three guardrails—one active hero
  control, checkpoint-safe failure, and visible completion/reward.

## Player-View Prediction

If implemented to the contract, a mobile screenshot at any moment should show
the framed route, one clear objective cue, and one large current action. It
should not show seed, reset, metrics, tuning, route state, or several competing
buttons. Completion should replace gameplay controls with the reward identity
and Continue Journey or Replay.

Player-visible status remains **unverified** because the final contracts have
not been implemented. The current Page 01 simulator baseline already shows the
primary mismatch risk: domain completion can pass while the visible reward
state remains silent.

## Technical-versus-Visible Mismatch Risks

- Deterministic replay may pass while the next action is not visually obvious.
- A graph may be traversable while its safe route is not readable at phone
  size.
- Object counts and scene detail may rise while interaction comprehension does
  not improve.
- A reward receipt may persist while the player never sees confirmation.

The required simulator-plus-Playwright loop directly tests these mismatches.

## Assumptions

- All final page mechanics can emit renderer-neutral semantic actions.
- Auto-run and fixed Jump can express the required route beats without free
  movement.
- The same canonical route state can drive simulator, fallback, and physical
  spatial hosts.
- Page 08 can read seven idempotent prior receipts and write its own eighth.

## Uncertainty

- Current Pages 02-08 do not yet implement the final route contracts.
- Page 05 layer-shift depth and Page 07 reveal timing require greybox player
  proof before their difficulty can be confirmed.
- Reference mobile hardware, load budget, and active simulation budgets still
  need exact Pass 4 matrix values.

## Terminal Condition

Pass 3 is valid when the specification contains no unresolved player-flow,
duration, control, reward, failure, fallback, accessibility, or release
decision. Runtime quality remains unverified until later simulator and
Playwright passes.
