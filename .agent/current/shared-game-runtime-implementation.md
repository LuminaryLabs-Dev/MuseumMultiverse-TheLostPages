# Shared game runtime implementation

Date: 2026-09-19
Status: implemented locally; validation in progress

## Added

- Shared scene registry for the museum hub and eight pages.
- Three.js browser game runtime.
- Real floor, walls, exhibits, lights, camera, and visitor body.
- Keyboard and pointer movement adapters.
- Shared pause, resume, restart, and return-to-page menu.
- Runtime cleanup for renderer, listeners, animation frame, and loaded model.
- Page landing `Play` links that use the shared runtime.
- Museum hub route through the same runtime.

## Route contract

```text
?hub=1                 museum hub
?page=page01&play=1   Page 01 game scene
?page=page02&play=1   Page 02 game scene
...
?page=page08&play=1   Page 08 game scene
```

## Scope boundary

- Existing QR destinations remain unchanged.
- AR remains an adapter boundary; this pass does not claim true world-locked
  WebXR scene placement.
- Existing legacy files were not deleted.
- Existing Page 01 simulator proof remains intact.
- Generated page art is being added as versioned assets; originals are preserved.

## Generated image set

```text
page01-museum-entry-v1.png
page02-museum-art-v1.png
page03-museum-art-v1.png
page04-museum-art-v1.png
page05-museum-art-v1.png
page06-museum-art-v1.png
page07-museum-art-v1.png
page08-museum-art-v1.png
```

All eight are 1024x1536 PNGs and are referenced by the shared scene registry
and page landing artwork map.

## Validation so far

- `npm run build` passed after runtime integration.
- Static export completed.
- Existing print composition check passed.
- Full human browser walkthrough remains required.
