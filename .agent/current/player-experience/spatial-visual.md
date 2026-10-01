## Spatial Presentation

- Frame, environment, platform, hazard, and collision geometry remain fixed in
  the locked frame-local coordinate system.
- Playable depth expands from one lane in Section 1, to two in Section 2, to
  three in Section 3. Every variant uses the same equally spaced front, middle,
  and back slots.
- JR moves between lanes through authored ramps, bridges, or portals
  automatically during Run; lane changes add no required control. Readable
  connection geometry and a brief light-and-paper cue signal each transition.
- Playable geometry remains within 20% of the inner frame width behind the
  canvas plane.
- Only non-collidable, non-interactive effects, flexible paper elements, and
  brief small milestone artifacts may extend in front of the canvas, and they
  remain within 10% of the inner frame width.
- When foreground paper scenery overlaps JR or the next required hazard or
  landing, the renderer temporarily folds or fades only that blocking scenery
  into a cutaway. Route, collision, timing, and fixed frame coordinates do not
  change.
- Authoring rejects any object or course state outside the rear or front
  envelope with a precise diagnostic; it never silently rescales or clamps it.
- Physical viewer movement produces real perspective and parallax but is not
  required to complete the route.
- The standard proof envelope covers 1.5-2.5 meters from the frame and up to 30
  degrees off-axis; optional closer inspection may be supported when critical
  content remains readable.
- JR, critical signs, and selected effects may subtly face the active viewer
  when a renderer descriptor explicitly permits it.
- Viewer-facing elements must still look embedded in the picture world rather
  than like flat webpage overlays.
- Side-angle readability, occlusion, depth ordering, and visual stability
  require camera-depth and human-view proof.

## Visual World and Asset Contract

- One all-eight visual bible and explicit semantic renderer-binding schema
  governs canonical JR, gameplay-critical silhouettes, edges, motion,
  interaction cues, materials, lighting, accessibility equivalents, and
  device-tier budgets. Filenames and mesh hierarchy carry no gameplay meaning.
- Critical avatars, platforms, hazards, contextual objects, goals, and hero
  landmarks use custom or explicitly approved art. Provenance-cleared staged
  and deterministic procedural assets may support dressing only after their
  gates pass. Placeholders are debug-only; missing production bindings block
  activation with recoverable retry and return.
- Route families evolve from sepia maps and sleeping cabinets, through teal
  gilt, charcoal sketchbook, crimson curator, olive living archive, cold-blue
  liminal exhibit, and violet canvas, into a gold portal that recombines
  approved motifs from the prior seven.
- JR keeps one recognizable hybrid 2.5D rig, silhouette, semantic action set,
  scale, collision meaning, and accessibility contract. Route renderers may
  change only bounded non-gameplay materials and removable accessories.
- Art production proves the visual bible, JR binding, semantic binding schema,
  and asset gates through Page 02 and Page 05 before completing remaining route
  families in narrative order and Page 08 last. Each route must pass critical
  binding and proof gates before promotion.
- Each route centers one custom mechanic-linked hero landmark: folding map,
  breathing glyph frame, living sketchbook, reconstructed curator warning,
  impossible layered frame, liminal sorting cabinet, monster canvas, or final
  socket portal. Support art cannot overpower its objective or state.
- Provisional subject: an impossible museum archive where layered shelves,
  nested frames, artifacts, and living paper merge into the platforming route.
- One modular archive kit supplies all three variants.
- The kit emphasizes folded paper, books, and bindings in Section 1; shelves,
  drawers, catalog rails, and labels in Section 2; and nested frames, canvases,
  easels, gilded ledges, and artifacts in Section 3.
- Gameplay-critical modules use a consistent silhouette, edge treatment, and
  restrained motion cue. Color reinforces but never solely communicates
  collision, hazard, transition, landing, or discovery meaning.
- Normalized lane anchors and stable typed sockets connect modules through one
  explicit rooted recipe graph. Every socket declares its canonical local pose,
  role, compatible types, capability tags, finite named symmetries, contact
  surface, clearance volume, and semantic collider-seam rules.
- Exactly one root module attaches to the canonical `frame-course-root`, and
  every gameplay module derives transitively from it. Disconnected roots remain
  dressing-only.
- A gameplay module receives its pose from one transform-owning parent edge.
  Additional visible braces or seams are validation-only constraints and never
  move either endpoint.
- A closed versioned matrix separates structural, traversal, hazard,
  interaction, discovery, and dressing-only connections. Dressing can never
  acquire gameplay meaning.
- Each socket declares finite occupancy by edge kind. Transform sockets default
  to one; only explicit finite junctions can accept multiple attachments.
- Each allowed socket pairing pins one canonical-unit tolerance profile shared
  by authoring, build, and activation. Modules may tighten it, but recipes
  cannot loosen it.
- The deterministic assembly solver derives child transforms from recipe edges.
  When several socket symmetries are valid, the edge must name one explicitly;
  meshes, GLB hierarchy, proximity, load order, and renderer choice cannot
  resolve it.
- Every connection must pass compatibility, occupancy, pose residual, surface
  contact, clearance, collider-seam, lane, depth, and transformed-subtree bounds
  checks. Failure blocks the complete course with a stable machine-readable
  diagnostic. During activation the player sees `Content unavailable` with
  `Retry Content` and `Return to Magazine`, never a partial or auto-repaired
  world.
- Declared device tiers preserve the complete course and every required cue
  while reducing only decorative props, particles, shadows, and secondary
  motion.
- The hero frame is one impossible assemblage of mismatched museum eras and
  artifacts shared across variants.
- `center-frame-set.glb` may supply its structural base only after the complete
  asset gate passes; otherwise a custom frame replaces it.
- The locked outer silhouette remains stable during traversal. Bounded frame
  reactions occur only at reveal, phase changes, checkpoints, portal readiness,
  and completion, with reduced-motion equivalents.
- Frame accents follow the scene from teal, to olive, to gold while shape,
  lighting, and labels also communicate state.
- Palette progression: charcoal and Page 02 teal in section one, Page 05
  paper-olive in section two, and Page 08 portal gold in section three.
- Hazard progression: folding paper, tears, and ink in section one; sliding
  shelves, swinging labels, and closing frames in section two; animated relics,
  bounded beams, and portal pulses in section three.
- Authored key and rim lighting stays fixed in frame-local space. Optional room
  ambience is clamped so it cannot change hazard, route, JR, or portal
  readability; unsupported devices use a neutral authored ambient fallback.
- Custom Lost Pages assets are required for JR, manipulable picture layers,
  signature hazards, and the portal.
- Background dressing and support geometry may use accepted staged assets or
  deterministic procedural forms only after their complete gates pass.
- At each checkpoint, gameplay pauses for a 1.5-second frame-local paper-fold
  transformation. Reduced motion uses a short crossfade and static checkpoint
  title instead.

Exact props, swatches, intensities, ambient clamps, shadow limits, transition
choreography, preload behavior, performance budgets, and the all-eight visual
bible and route-family mapping remain unresolved.

## Art and Source Boundary

- Only the remembered picture-frame platforming concept currently informs the
  homage.
- No original-finale footage, source scene, or exact course reference has been
  accepted as evidence.
- The provisional answer to the user's direct similarity question is yes:
  Page 02 teaches the frame language, Page 05 is the full wall-mounted spiritual
  successor, and Page 08 later remixes that mastery. This evidence-based
  selection remains open to direct user override.
- All Page 05 art, routes, story, pacing details, and animation remain original
  Lost Pages work unless stronger evidence is later supplied and approved.
- JR, manipulable layers, signature hazards, and portal art cannot ship as
  placeholders or unmodified staged assets.
- Finale-reference evidence provisionally uses one immutable hash-bound ledger
  with
  allowed-use classes, memory-only concept scope, footage-to-clean-room
  claim matrix, element-level source permission and attribution, unknown-rights
  fail-closed behavior, explicit user approval, and no
  visibility-equals-ownership inference.
- `center-frame-set.glb` is the first frame candidate because it is staged in
  the repo, not because it is proven suitable.
- It may receive custom Lost Pages materials and details only after provenance,
  mesh, pivot, bounds, fit, collision, optimization, performance, and human-view
  gates pass.
- Rejection must produce a reason and a custom or deterministic fallback.
- Each route provisionally publishes one approved versioned,
  gameplay-truthful key-art plate showing its mechanic-linked hero landmark and
  canonical JR. The clean card, 3D book, and restored overview share its
  authored crops, focal-safe bounds, stable alt text, provenance, loading
  fallback, and renderer binding.
- The recognizable base plate remains stable across progress. A revisioned,
  read-only completion-ledger projection adds named state labels, borders,
  emblems, checkmarks, earned cosmetic slots, and non-color text equivalents.
  Presentation never estimates, mutates, or independently persists progress.
- Each plate provisionally starts as a fixed master rendered from the approved
  route scene, recipe and semantic snapshot, landmark, canonical JR pose,
  physical-family camera, lighting, renderer, and exact asset set. A bounded
  paint-over is allowed only after critical silhouettes, cues, spatial
  relationships, and route identity prove unchanged, and the complete source
  and diff manifest remains reproducible.
- Wall, tabletop, and floor/pedestal plates use separate validated metric
  three-quarter hero-camera profiles inside their real viewing envelopes. Each
  pins pose, target, up axis, field of view, clipping, JR scale, focal-safe
  bounds, and portrait/landscape crops.
- The canonical story moment is one fixed inviting mid-action semantic
  snapshot: JR performs the signature, the landmark is active, and a readable
  challenge plus goal direction appear while reward, secret, and final
  transformation remain hidden.
- The approved plate stays unobstructed. Page number, title, named progress,
  QR, short URL, and adjacent digital `Open AR` occupy one external magazine
  folio with proven scan, navigation, focus, print, and accessibility behavior.
- Release promotion requires all eight approved plates and crops. A runtime art
  failure preserves otherwise-valid route access through a labeled accessible
  folio fallback with stable motif line art, quarantines only the failed
  binding, and permits bounded retry without generic, stale, or arbitrary art.
- O4's existing M4 asset gate provisionally owns the key-art subflow, preserving
  five orchestrators and twenty lower-layer skills. It consumes read-only O3
  semantics, uses A11-A12 for visual bindings, manifests, folios, and fallbacks,
  and relies on A13-A15 plus O5 for budgets, cameras, crops, truthfulness,
  accessibility, QR/print behavior, and human-view proof.
- O3 publishes an immutable `key-art-source-packet`; O4 publishes a
  `key-art-candidate-packet` bound to the source hash; and O5 publishes an
  applicability verdict bound to both. Source changes stale downstream work,
  and presentation never writes semantic changes back.
- Dependency-scoped invalidation separates semantic-source revisions from
  art-only candidate revisions, fans shared changes only to exact dependents,
  preserves unaffected accepted plates, and blocks the all-eight release join
  while any required input is stale.
- O5 promotion binds provenance and rights, semantic and paint-over
  truthfulness, composition, physical-family cameras, every crop,
  accessibility, QR/direct entry, forced fallback, budgets, and desktop,
  phone, print, and all-eight human view to the exact source and candidate
  hashes.
- Route candidates may preview independently, but production atomically swaps
  only one validated content-addressed all-eight catalog root and retains the
  prior accepted root for rollback. Runtime art failure remains route-local
  and uses the accessible fallback.

