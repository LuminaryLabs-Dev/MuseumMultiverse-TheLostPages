## Deterministic Run Behavior

- A fixed-step monotonic simulation clock makes Jump, hazards, assistance,
  portal dwell, and checkpoints independent of render rate and device speed.
- Recipe-defined semantic primitives own every gameplay collision. Visual mesh
  detail, LOD, asset substitution, and dressing tiers cannot change contact
  truth.
- Player actions and host acknowledgments become ordered, stable-id commands
  applied exactly once at declared simulation ticks.
- Plan, checkpoint presentation, tracking loss, obstruction, and content
  recovery contribute typed pause reasons. Simulation resumes only after every
  blocking reason clears; while blocked, only the corresponding recovery
  controls remain available.
- Rewards, discoveries, feedback, assistance changes, and presentation
  handshakes use stable-id ordered domain events. Host retries cannot duplicate
  them, and gating events remain pending until acknowledged.

One authoritative 60 Hz clock processes at most four catch-up ticks per render,
never drops or merges semantic ticks, and enters a visible state-preserving
performance pause on excess backlog. All routes share one normalized forgiving
collision profile with inset JR bodies, expanded landings, inset hazards,
swept tests, fixed epsilon, and explicit visible assistance variants. One
closed run- and revision-bound command envelope returns deterministic accepted,
duplicate, or typed-rejection results without silent repair. A snapshot- and
replay-persisted set of stable typed, owner-scoped pause records composes every
blocker and resumes only when empty. A snapshot-persisted ordered event outbox
retries exact ids through idempotent consumers, retains gating pauses, exposes
bounded recovery, and replays unacknowledged events in order after restore.

## Avatar

- Provisional identity: JR.
- Provisional form: a hybrid 2.5D illustrated cutout rig positioned among true
  3D platforms, props, lighting, and effects.
- Provisional animation language: cutout-joint locomotion for idle, run, Jump,
  land, and recovery; comic-panel poses and page transitions for emotion and
  museum magic.
- Provisional scale: JR's displayed height is 12-15% of the locked frame's inner
  opening height; gameplay measurements do not change with viewer distance.
- Provisional collision: one simple grounded body and one smaller airborne body,
  both independent of animated cutout limbs.
- Provisional first animation set: idle, run, Jump, land, fail, celebrate,
  Manipulate, checkpoint recovery, and portal entry.
- Current evidence: Page 02 names JR and the paper-page builder depicts him.
- Missing evidence: no accepted Page 05 JR asset or rig, and none of the
  provisional scale, collision, animation, or in-game readability targets has
  been implemented or validated.

## Audience and Assistance

- Provisional primary audience: mixed-age museum and family players.
- Baseline interaction: readable, non-color-only, and usable one-handed on a
  phone.
- The first screen does not ask the player to choose a difficulty mode.
- Baseline Jump uses a small early-input buffer, short late-edge grace period,
  and modestly enlarged landing contact without magnetic trajectory correction.
- Assistance advances deterministically at the same obstacle: subtle timing
  help after two failures, a simpler valid route after four, and the strongest
  authored timing-and-route help after six.
- Assistance preserves discoveries and checkpoint progress, never skips the
  completion condition, and must be acknowledged without shaming the player.
- Each tier change is named in the recovery state before the next attempt.
- Assistance provisionally uses baseline `6/5`-tick input/edge grace,
  `0.04H/0.02H` landing/hazard forgiveness and `51`-tick timing window; tier 1
  at two failures with `9/8` ticks, `0.06H/0.03H`, and `60` ticks; tier 2 at
  four with a prevalidated obstacle-local simplified branch; and tier 3 at six
  with `12/10` ticks, `0.08H/0.04H`, a `69`-tick window, and the strongest
  bounded branch, plus namespaced persistence, explicit reset, neutral
  acknowledgment, stable hashes, and no progression penalty.

## Active-Play Controls

Hero controls:

- current objective;
- phase-relevant primary action;
- phase-relevant secondary action only when needed.

The controls resolve to `Manipulate`, `Lock Route`, `Back to Plan`, `Jump`,
`Retry Route`, `Adjust Route`, `Enter Portal`, `Re-place Frame`, and
`Return to Magazine` only in the states that need them; they do not all appear
together. Every required action remains available through player-facing
controls. Physical viewpoint movement is an optional source of parallax, depth
understanding, and discoverable clues rather than a progression requirement.

Phase behavior:

- `Plan`: traversal is paused; the player inspects the frame, optionally changes
  viewpoint, activates Manipulate, and drags each selected layer along its
  constrained authored track. Section 2 exposes one adjustable layer; Section 3
  exposes no more than two.
- `Run ready`: after the domain validates platform connectivity, hazard behavior,
  and optional-discovery reachability, Manipulate becomes `Lock Route`;
  confirmation starts a two-second numeric countdown with contextual
  `Back to Plan`. Reduced motion removes authored camera and frame movement.
- `Run`: picture layers are fixed; JR auto-runs and one tap triggers a fixed,
  forgiving Jump arc with the baseline buffer, edge grace, and landing contact.
- `Recovery`: a failed Jump briefly holds JR's pose and leaves an ink mark, then
  returns him to the checkpoint with `Retry Route` focused and `Adjust Route`
  secondary. Discoveries persist, and the recovery state announces any newly
  reached two/four/six-failure assistance tier before the next run.
- `Portal ready`: `Enter Portal` appears after JR's grounded collision center
  remains inside the valid portal zone for 300 milliseconds.
- `Complete`: portal entry grants Page 05's reward and opens the completion
  handoff.

Advanced or debug controls:

- reset;
- calibration;
- placement diagnostics;
- route seed and metrics;
- performance profile;
- simulator actions;
- forced completion;
- tuning.

