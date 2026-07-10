# NexusEngine DSK and Eight Experience Audit

Status: inspected, built, desktop tested, phone and AR unverified
Date: 2026-07-09

## Outcome

The repository has eight routeable experience manifests and a working desktop fallback loop, but it does not yet have eight full strategy experiences or full Domain Service Kit ownership.

Current authored scene object counts are 4-9 per experience, 42 total:

| Experience | Objects | Active strategy step after placement |
|---|---:|---|
| Sleeping Gallery | 6 | Wake five frames |
| Frame That Breathes | 4 | Align glyphs |
| Lost Child's Sketchbook | 4 | Catch sketches |
| Curator's Warning | 5 | Restore words |
| Tiny Platformer Diorama | 5 | Clear hazards |
| In-Between Exhibit | 5 | Sort artifacts |
| Monster Behind Canvas | 4 | Reveal symbols |
| Secret Portal Room | 9 | Light sockets |

## Current Architecture Gap

- `package.json`, `src/main.js`, and `src/ar/runtime/session.js` still use NexusRealtime.
- The installed NexusRealtime checkout does not match the commit pinned in `package.json`.
- Current local kits use `defineRuntimeKit()` through `createLocalServiceKit()`, not NexusEngine `defineDomainServiceKit()`.
- Current NexusEngine `main` defines stable DSK identity, `n:` domain paths, `engine.n.*` APIs, explicit inputs/outputs, reset/snapshot expectations, version, stability, and dependency tokens.
- The gameplay factories needed by Lost Pages exist on NexusEngine `main`, but most are still lower-level RuntimeKits; Lost Pages needs deliberate DSK composition/wrapping rather than a package-name-only swap.

## Boundary Audit

| Current module group | Current status | Target disposition |
|---|---|---|
| launch, booklet reader, comic panel, route QR | reusable compute candidates | convert to explicit DSK contracts if they remain reusable |
| progress | domain meaning mixed with direct `localStorage` | DSK state plus persistence adapter |
| page rail movement | useful deterministic state, but input/presentation concerns are coupled | split control-domain state from input and visual adapters |
| paper page builder, paper renderer, paper skinned mesh | imports Three.js and creates textures/meshes | renderer adapter, not reusable gameplay DSK |
| page pivot, plane mesh creator | Three.js object ownership | graphics/scene host adapter |
| paper surface | direct mounted surface ownership | UI/renderer adapter |
| lost-page composite | composes presentation services into a domain service | split authored page meaning from renderer adapters |
| experience manifests | good product-owned configuration seed | expand into deterministic object descriptors and DSK composition manifests |

## Target DSK Stack

```text
NexusEngine core DSKs
  -> data, persistence, input, spatial, scene, simulation,
     interaction, graphics descriptors, camera, animation,
     audio, UI descriptors, diagnostics, composition

Lost Pages reusable gameplay DSKs
  -> AR placement/session
  -> objective flow
  -> interaction targets
  -> collectible/progression
  -> strategy rules per mechanic family

Experience composition
  -> story/copy
  -> deterministic seed
  -> object population descriptors
  -> objective/reward tuning
  -> required DSK graph

Host adapters
  -> Three.js rendering
  -> DOM landing/debug UI
  -> WebXR/camera/device lifecycle
  -> storage provider
  -> audio playback
```

## Scaling Rule

Do not hand-write hundreds of object literals. Each experience should provide a seed and composition recipe that generates 100-300+ inspectable objects from reusable archetypes. Only the relevant nearby or objective-linked slice should receive expensive simulation, animation, collision, and interaction work.

Every generated object still needs stable identity, archetype, transform, interaction affordance, visual descriptor, activation policy, reset behavior, and snapshot representation.

## UX Contract

Primary human task: scan, launch, understand the objective, make a strategic choice, act, read feedback, and finish.

Hero controls on the normal first screen:

- Start AR
- Place experience when placement is required
- One contextual action or clearly tappable world targets
- Current objective and progress

Advanced/debug controls:

- reset and replay controls
- runtime mode and diagnostics
- object counts, DSK graph, snapshots, and validation state
- tuning and developer controls

## Human View Evidence

- `npm run build` passed and exported 21 static routes.
- All eight `/debug/ar/<slug>/` routes loaded, accepted Find Surface and Place, and advanced to the intended second objective.
- Sleeping Gallery completed through all three steps in the desktop fallback.
- The visible experience is still a compact debug card with simple target buttons; it lacks the depth, motion, audio, pressure, reactions, and scene density needed for release quality.
- Desktop tested only. Phone, camera permission, WebXR placement, real AR interaction, performance on device, and deployed public QR origins remain unverified.

## Recommended Build Order

1. Pin and cut over to current NexusEngine; regenerate the lockfile and prove parity.
2. Define the DSK contract table and separate domain logic from host/render adapters.
3. Build one reference vertical slice, Sleeping Gallery, to 100-300+ deterministic objects with active-slice budgets.
4. Prove reset, snapshot, replay, failure, reward, and headless validation.
5. Prove the first-screen mobile UX and real AR loop through screenshots/video and device interaction.
6. Reuse the proven architecture across the other seven experiences, one bounded vertical slice at a time.

## Promotion Gate

An experience is not ready because the route loads or the build passes. It is ready only when its DSK graph validates, object population meets the target, reset/snapshot/replay pass, strategy has meaningful choices, the phone and real AR paths complete, and human-view evidence shows readable objectives and satisfying feedback.
