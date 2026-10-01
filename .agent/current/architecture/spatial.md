## Canonical Spatial Placement Contract

This is a provisional O2-owned descriptor contract. It is not implemented by
the current Lost Pages shell.

### Frame-Local Coordinates

- Units are meters in a right-handed coordinate system.
- The semantic origin is the center of the inner canvas plane.
- `+X` points toward frame-right, `+Y` points up, and `+Z` points outward toward
  the player.
- Playable lanes and archive depth occupy negative `Z`. Only allowed
  non-collidable front effects and brief props may use positive `Z`.
- Course recipes, semantic collision, anchors, sockets, and placement-fit
  records use this frame space; host-world and native-asset coordinates do not
  enter domain state.

### Native Asset Adapter

- Every approved renderer binding supplies one explicit native-to-canonical
  transform covering unit conversion, handedness, axis permutation, rotation,
  and pivot offset.
- The semantic canvas-center pivot remains authoritative across asset swaps.
- The adapter applies once below the semantic node. A second pivot, centering,
  or correction offset for the same conversion is invalid.
- Geometric bounding-box center and an imported GLB origin are evidence inputs,
  never automatic semantic pivots.

### Transform Hierarchy

The required order is:

1. host-owned physical wall-anchor pose;
2. O2's locked wall-contact frame;
3. one uniformly scaled canonical frame root;
4. canonical semantic anchors, sockets, modules, colliders, and effects;
5. O4's native asset adapter;
6. renderer-owned mesh nodes.

Tracking or anchor recovery may update the first host-owned transform while
simulation is frozen. It may not rewrite canonical semantic transforms. Domain
snapshots retain canonical semantic state plus the accepted spatial-descriptor
reference; wall pose, contact frame, physical root scale, asset adapter, and
mesh hierarchy remain outside the platformer snapshot.

### Uniform Scale

- O2 derives one root scale from the authored inner-opening width, accepted
  physical target, detected wall fit, and player adjustment.
- The same scalar maps the frame, route, collision primitives, anchors, sockets,
  required cues, and visual bindings.
- Non-uniform root scale and independent gameplay-object scale are invalid.
- Every scale change reruns outer-frame fit, wall margin, rear/front envelope,
  viewing-distance readability, collision, socket, and support-contact gates.

### Backing Contact

- The spatial descriptor separates the canonical canvas plane from a semantic
  backing contact plane.
- The accepted frame binding supplies support anchors that form a validated
  support hull on that backing plane.
- O2 aligns the backing plane to the accepted wall plane and validates gap,
  penetration, tilt, clearance, and bounds across the full scaled support hull,
  not only at the origin.
- Mesh bounds may support validation but cannot infer or replace the declared
  contact plane.

### Orientation Basis and Normal Sign

- O2 selects the detected normal sign whose dot product points from the wall
  toward the center of the player-confirmed viewing zone and persists that sign
  with the anchor identity.
- The selected normal becomes canonical `+Z`.
- Measured gravity-up is projected onto the wall plane and normalized as
  canonical `+Y`; `+X = +Y × +Z`, followed by re-orthonormalization.
- The locked orientation is serialized as a finite normalized quaternion.
  Euler angles may be derived for diagnostics only.
- Missing, low-confidence, parallel, or otherwise degenerate basis inputs block
  placement. The sign never follows the live camera or flips without explicit
  re-confirmation.

### Planarity and Player Adjustment

- One rigid planar patch must cover the complete scaled support hull.
- O2 evaluates all required support samples against calibrated residual limits;
  a center point or average plane cannot hide local protrusion or recess.
- A failed planar patch offers bounded rescan or another wall, then the labeled
  tabletop fallback. The frame, canvas, route, and collision world never warp
  to a wall mesh.
- Before lock, the player may translate the proposal along canonical `X/Y` and
  adjust its one uniform root scale within the accepted envelope.
- Wall-normal depth, backing contact, pitch, yaw, and roll remain derived and
  locked. Every adjustment reruns the complete candidate validator.
- `Reset proposal` restores the last system-generated valid proposal.

### Atomic Placement Lock

`Confirm Frame` is unavailable until one candidate version atomically proves:

- finite position, orthonormal axes, and normalized quaternion;
- persisted player-facing normal sign and nondegenerate gravity basis;
- full-hull planarity, backing contact, and calibrated gap/penetration limits;
- uniform scale, outer bounds, clear-wall margin, and rear/front envelope;
- provisional height, viewing distance, side-angle, and floor-zone rules;
- capability-aware obstruction evidence and visible zone state;
- explicit player confirmation of the wall pose and viewing zone.

Every failed criterion has a stable diagnostic id, visible explanation,
corrective owner, and bounded rescan, adjust, another-wall, or tabletop route.
No advanced control can waive a required safety, contact, or proof criterion.
The accepted locked descriptor pins the wall anchor identity, basis, normal
sign, contact and canvas planes, support evidence, root scale, adjustment
values, capability claims, confirmation, and validator version.

