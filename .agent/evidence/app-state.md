# Current Application Evidence

Verified: 2026-07-28

## Repository

- Branch: `main`
- Upstream: `origin/main`
- Worktree was clean before `.agent/` documentation was added.

## Current Immersive Opening

Sources: `src/ar/runtime/immersive-shell.js`, `src/ar/runtime/session.js`,
`src/main.js`, and `src/experiences/sleeping-gallery/{copy,level}.js`.

- The normal phone route first renders a full `ar-landing` card with Museum
  Multiverse label, page number, QR title, experience title, story prompt,
  collectible preview, `Launch full 3D AR`, camera-permission note, and a
  selected-mode label.
- The normal immersive card does not render the authored `description` or
  `pitch`; those appear in the debug shell. After launch, the generic immersive
  view repeats the collectible name, current objective label and instruction,
  and completion copy, but source inspection found no staged in-world title or
  premise beat and no safe-context foldout for the full synopsis.
- The generic immersive view then renders the camera, veil, reticle, centered
  artifact, a placement button or hotspots, and a persistent HUD containing the
  objective label, instruction, progress fraction, and runtime mode.
- Page 01 has a special character-map branch. While searching it displays
  `Find a wall`; once the launcher reports a surface, startup may detect the
  wall, call placement, attach the map, and complete its unfold automatically
  rather than requiring a separate inspected-proposal confirmation.
- Page 01's authored objective sequence is `Find a wall`, `Find the maze
  heart`, and `Claim the fragment`; its prompt is `Find a wall. Unfold the map.
  Swipe the character to the maze heart.`
- Page 01 installs `surface-placement`, `objective-flow`, `collectible`, and
  `character-map-experience`, not `micro-platformer`. Its map accepts cardinal
  swipes and reports maze completion, but no inspected source binds selected
  map nodes or branches to platform segments, shared `Lock Route`, countdown,
  auto-run, `Jump`, or an accessible ordered route-choice equivalent.
- `sleeping-gallery/tuning.js` fixes the current maze at 11 rows, 11 columns,
  and seed `104729`. `canvas-maze-map/service.js` generates one deterministic
  perfect maze from `(0,0)` and places one goal at its farthest cell. No
  inspected Page 01 data defines two authored branch ids, route previews,
  direct/explore labels, branch-specific platform segments, equal-reward
  constraints, optional branch discovery, or first-clear replay unlock.
- `character-map-view.js` paints maze walls, the heart, and JR into a fixed
  660×660 HTML canvas from row, column, cell-opening, goal, and character
  position data. The character-map domain changes only the cardinal cell
  position and goal state. No inspected source maps a cell or opening to a
  platform-module id, frame-local transform, fold descriptor, collision span,
  checkpoint, discovery, accessible route step, semantic graph hash, snapshot,
  or platformer replay.
- The immersive view converts pointer travel of at least 24 pixels into the
  dominant cardinal swipe; the component also exposes four directional HTML
  buttons. `map-character/service.js` accepts a direction string, moves only
  through a current-cell opening, and otherwise marks the token `blocked`, but
  increments `moves` for both accepted and blocked inputs. No inspected source
  defines stable from/to node command ids, route revisions, adjacent-node tap,
  semantic undo, switch scanning, ordered-list input, stale-step rejection, or
  input-equivalent feedback and proof.
- The inspected immersive shell renders screen-space HTML for its Page 01
  `Find a wall` message, generic reticle, `Tap to place` control, hotspots, and
  HUD. No inspected current source defines stable semantic cue ids, target-local
  cue sockets, world-locked cue transforms, offscreen target projection,
  critical-mask avoidance, or a visibility/tracking-driven handoff between
  world, screen-edge, and recovery forms.
- These sources prove the present render and scripted transitions. They do not
  prove that the player understands the required physical surface, that a
  detected pose passes the proposed safety and fit gates, or that persistent
  UI is the intended final experience.

## Page 02: The Frame That Breathes

Source: `src/experiences/frame-that-breathes/level.js`

- Preferred anchor: `north-wall`
- Desktop camera: `wall-focus`
- Authored placement scale: `0.9`
- Existing objects: one breathing portal frame and three glyphs
- Existing loop: place frame, align glyphs, open portal
- The three glyph descriptors currently differ only by stable object id and
  authored position. They share the same `glyph` shape, teal color and glow,
  `interactive-target` archetype, `interaction-target` kit, `align` action,
  and count. No inspected source assigns an individual glyph a named role,
  distinct semantic effect, non-color identity, socket compatibility, teaching
  order, or finale-reuse meaning.
- The current NexusEngine `symbol-alignment` kit initializes tolerance,
  aligned-count, and target-count fields, but its `align` method only forwards
  a generic action to interaction targets; inspected source does not update the
  alignment fields or evaluate glyph poses, sockets, or the authored
  12-degree tolerance.
- Page 02's interaction data declares only a pointer-source `align` action and
  a group-wide 12-degree snap tolerance. Its glyph transforms contain positions
  but no authored rotation, manipulation axis, detents, guide, socket target,
  compatibility rule, preview, invalid-return behavior, keyboard/gamepad/switch
  mapping, or ordered semantic alternative.
- Its only declared feedback binding responds to generic `step.complete` with
  the 1200-millisecond `portal-open` ring expansion. No inspected per-glyph
  accepted, invalid, route-edge-added, preview-ready, traversable, or
  lock-available feedback binds semantic state to a visual, text,
  reduced-motion, audio-intent, or haptic-intent result.
- The authored objective sequence is `place-frame`, count three generic
  `align` actions, then count one pointer `open` action on the frame. It declares
  `experience.complete` and `breathing-frame-mark`, but no intervening route
  lock, countdown, platform traversal, checkpoint, failure recovery, grounded
  portal dwell, post-traversal eligibility, explicit semantic entry command,
  or persist-before-presentation ordering.
- No inspected Page 02 source binds a glyph or alignment state to a route edge,
  platform transform, bridge, path preview, collision graph, semantic
  `glyph.align` command, invalid/stale rejection, accessible equivalent,
  `Lock Route`, deterministic Run, snapshot, replay, or portal eligibility
  derived from accepted route state.
- The frame is currently a generic `shape: 'frame'` descriptor with one teal
  emissive material and a continuous 1.8-second `scale-loop`; it is not the
  proposed assembled hero frame or traversal-stable milestone animation.
- The shared session runtime installs `surface-placement` from the authored
  placement descriptor, but source inspection alone does not prove a complete
  guided wall-placement UX.
- The inspected Page 02 placement data defines an anchor and scale but no
  explicit frame-center policy, minimum wall size, clear-wall margin,
  viewing-distance range, off-axis viewing limit, wall-tilt tolerance, or
  safety-clearance threshold.
- A bounded search across `src/ar/`, `src/domains/`, and `src/experiences/`
  found no environment-depth, scene-mesh, WebXR plane, or hit-test placement
  implementation. Existing floor references in this scope are authored room or
  simulator data, not physical floor-safety proof.
- No inspected source defines a canvas-projected floor-zone origin, standard or
  seated footprint coordinates, warning band, seated center-position reach
  requirement, stable floor-confidence window, bounded floor-scan timeout,
  wall-mode capability matrix, vertical obstruction prism, visible zone
  confirmation record, or honest continuous-monitoring label.

## Page 03: The Lost Child's Sketchbook

Sources: `src/experiences/lost-childs-sketchbook/{level,tuning}.js` and the
installed NexusEngine `moving-target-kit.js`.

- Preferred anchor: `center-floor`; fallback camera: `tabletop`; placement
  scale: `0.78`.
- That floor anchor conflicts with the current provisional story-native surface
  map, which assigns Page 03 to the tabletop book/diorama family. No inspected
  Page 03 source declares a tabletop support/contact plane, horizontal-surface
  fit, page orientation toward a confirmed viewing zone, physical size or
  uniform-scale range, shallow above-page volume, seated/standing readability,
  no-reach play zone, or semantic-equivalent floor/low-pedestal fallback.
- The current loop places one paper page, counts pointer `catch` actions on
  three identically described scribble targets, then counts one pointer
  `reveal` action and awards `memory-sketch-fragment`.
- No inspected Page 03 source declares catches optional, assigns unique
  discovery ids, persists partial impressions, separates lore/cosmetic payoff
  from the required fragment, defines a safe catch window or accessible
  contextual command, preserves moving-platform geometry after capture, or
  states that a miss leaves failure and assistance unchanged.
- Its final `reveal` input is a pointer action on the entire page. No inspected
  source ties it to a completed platform route, final static landing, paused
  motion phase, semantic eligibility, accessible command, atomic checkpoint,
  completion-and-fragment persistence before presentation, optional-margin
  variation, or return/replay hierarchy.
- Authored interaction data supplies only a group-wide `1.8 x 1.2`
  movement-bounds constraint and a 520-millisecond `ink-pop` response to
  `target.complete`; it declares no paths, cycles, velocities, phase offsets,
  platforms, collision, Jump relationship, optional catch zone, checkpoint,
  or accessible timing description.
- The installed moving-target kit initializes bounds, speed, and target fields,
  but its `catch` method only forwards a generic action to interaction targets.
  Inspected source does not advance target transforms, evaluate a catch, or
  provide deterministic moving-platform semantics.

## Page 04: The Curator's Warning

Sources: `src/experiences/curators-warning/{copy,level,tuning}.js` and the
installed NexusEngine `sorting-kit.js`.

- Preferred anchor: `north-wall`; fallback camera: `wall-focus`; placement
  scale: `0.86`.
- The current loop places one warning placard, counts four pointer `restore`
  actions on visually identical generic word targets under one group-wide
  ordered-sequence constraint, then counts one pointer `read` action and awards
  `red-seal-warning`.
- Copy says missing words drift around the margin and asks the player to restore
  the warning text, but inspected source declares no actual sentence, word
  strings, blank slots, word-to-slot compatibility, semantic word identities,
  invalid or stale result, accessible ordered control, or persistent restored
  text.
- The prompt says to rebuild the line before the seal finishes pulsing, and the
  objective dataset has a generic 300-second duration, but no inspected source
  defines a seal-pulse deadline, timeout transition, reset scope, pause
  behavior, accessible untimed equivalent, or relationship between the
  700-millisecond visual shake-flash and semantic time.
- No inspected Page 04 source maps a restored word or slot to a platform edge,
  route graph, collision change, checkpoint, preview, Jump section, snapshot,
  replay, final-read eligibility, or completion ordering.
- The installed sorting kit initializes zones, items, and a sorted count, but
  its `sort` method only forwards a generic action to interaction targets.
  Inspected source does not validate ordering, mutate sorted state, or provide
  word-restoration or route semantics.

## Page 06: The In-Between Exhibit

Sources: `src/experiences/in-between-exhibit/{copy,level,tuning}.js` and the
installed NexusEngine `sorting-kit.js`.

- Preferred anchor: `center-floor`; fallback camera: `tabletop`; placement
  scale: `0.82`.
- The current loop places one quadrant board, counts four pointer `sort`
  actions for water, forest, stone, and star artifacts under one group-wide
  drag-to-zone constraint, then counts one board `stabilize` action and awards
  `portal-stabilizer-fragment`.
- No inspected scene object belongs to the declared `zones` target group, and
  no source authors four stable zone identities, artifact-to-zone
  compatibility, accepted placement state, invalid or stale behavior,
  equivalent non-pointer controls, or persistent sorted positions.
- Copy says four worlds overlap and their portals may collapse, but no inspected
  source maps an artifact, zone, or accepted sort to a platform lane, route
  edge, collision state, checkpoint, preview, Jump section, snapshot, replay,
  stabilization gate, or completion ordering.
- The generic 300-second objective duration has no authored collapse deadline,
  timeout transition, reset scope, pause rule, or accessible untimed
  equivalent.
- The installed sorting kit initializes zones, items, and a sorted count, but
  its `sort` method only forwards an action and returns the unchanged resource.
  Inspected source does not validate a match, mutate sorted state, or stabilize
  route geometry.

## Page 07: The Monster Behind the Canvas

Sources: `src/experiences/monster-behind-canvas/{copy,level,tuning}.js` and the
installed NexusEngine `reveal-light-kit.js`.

- Preferred anchor: `north-wall`; fallback camera: `wall-focus`; placement
  scale: `0.78`.
- The current loop places one dark canvas, counts three pointer `pulse` actions
  on generic eye, rune, and mark targets, then counts one pointer `lock` action
  on the canvas and awards `shadow-exhibit-fragment`.
- Source declares an overexposure limit of three and copy asks the player to
  break sight before the canvas changes, but no inspected code defines beam
  position, pulse dose, exposure accumulation or decay, gaze sensing, warning
  thresholds, invalid result, overexposure transition, reset scope, pause
  behavior, or an accessible non-gaze equivalent.
- No inspected Page 07 source maps a symbol or accepted light reveal to a
  platform edge, hidden hazard, route graph, collision state, checkpoint,
  preview, Jump section, snapshot, replay, lock eligibility, or
  persist-before-presentation completion.
- The generic 300-second objective duration has no authored semantic deadline,
  timeout transition, or accessible untimed equivalent.
- The installed reveal-light kit initializes pulse and overexposure fields, but
  its `pulse` method only forwards a generic action and returns the unchanged
  resource. Inspected source does not reveal a symbol, change exposure, or
  create route semantics.
