# Eight-page runtime alignment audit

Date: 2026-09-19
Source: `origin/main` at `92785fc`
Status: audit only; no legacy files deleted

## Main branch state

The pushed branch contains:

- QR/book routing and eight experience manifests.
- Page 01 deterministic simulator proof for the Character Map loop.
- Page 02 through Page 08 design-intent manifests and generic interaction kits.
- AR support detection, camera-overlay mode, WebXR plane mode, and desktop fallback mode.
- DOM/CSS scene previews and a Three.js starter-book viewer.
- A new Page 01 mock museum route and generated Page 01 artwork.

The working tree also contains many unrelated uncommitted documentation, agent,
runtime, and gameplay changes. They are not part of this audit commit.

## Alignment finding

The proposed museum walking scene does not currently match the documented Page 01
contract:

```text
Documented Page 01: Character Map → plan → run → reward
New mock scene:     visitor walks through museum → artwork → exit
```

The museum walk should therefore be treated as one of these, pending product
decision:

1. a separate museum hub/entry scene before Page 01; or
2. a replacement for Page 01, which would retire the Character Map contract.

It must not silently replace Page 01.

## Eight-page alignment

| Page | Documented experience | Runtime readiness | Image/scene implication |
|---|---|---|---|
| 01 | Character Map plan/run/reward | strongest proof | map, wall, maze, fragment |
| 02 | Frame alignment and auto-run jump | design intent | breathing frame, glyphs, route |
| 03 | Sketch creatures and memory reveal | design intent | sketchbook, creatures, reveal |
| 04 | Curator warning word restoration | design intent | seal, placard, word fragments |
| 05 | Hero tiny platformer diorama | design intent | platforms, hazards, gate |
| 06 | Artifact sorting between realities | design intent | two-world exhibit, artifacts |
| 07 | Reveal beam and canvas threat | design intent | canvas, symbols, shadow |
| 08 | Final portal room and reward assembly | design intent | portal, sockets, final key |

## Confirmed AR issues

- The main AR renderer is DOM/CSS, not a world-space 3D renderer.
- Scene recipe transforms become screen percentages, not 3D coordinates.
- WebXR hit-test is requested but its pose is not continuously consumed.
- Camera-overlay mode starts a camera but does not perform real surface tracking.
- AR placement is often synthetic and immediately marked placed.
- No shared GLB/GLTF scene loader exists for the eight experiences.
- Replacing `root.innerHTML` during runtime can destroy active AR DOM nodes and
  listeners.

## Confirmed control issues

- Input differs between buttons, swipes, taps, automatic runner controls, and the
  new keyboard-only mock scene.
- There is no shared move/look/interact/jump/reset contract.
- The mock scene has no mobile control path.
- The mock scene has no physics collision; visual exhibits do not block movement.
- The mock controller has no route cleanup lifecycle.

## Confirmed architecture issue

The project is currently a web app with game-like simulations. The target should
be a game runtime delivered by a web app:

```text
Web shell → page/QR/loading/fallback
Game runtime → scene/input/physics/interaction/reward
AR adapter → optional placement of the same game scene
```

## Legacy handling rule

No legacy code was deleted. Candidates for later retirement must be classified as:

- `keep`: still used by the book or Page 01 proof;
- `migrate`: behavior needed in the new runtime;
- `retire`: duplicated after parity proof;
- `archive`: historical evidence only.

Deletion requires a separate reviewed change after replacement parity is proven.
