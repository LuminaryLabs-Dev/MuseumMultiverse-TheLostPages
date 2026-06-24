# Lost Pages Asset Pipeline

Status: supporting content scaffold

## Purpose

This document defines how planned assets should be described before production so an auto agent can build pages without inventing filenames, roles, or priorities.

## Asset classes

```text
assets
├── print
│   ├── page background
│   ├── title treatment
│   ├── QR frame
│   ├── exhibit art
│   └── annotation marks
├── runtime
│   ├── sprites
│   ├── textures
│   ├── 3D props
│   ├── particles
│   └── UI overlays
├── audio
│   ├── interaction sounds
│   ├── reward sting
│   └── ambient loop
└── documentation
    ├── references
    ├── prompt notes
    └── asset acceptance notes
```

## Naming convention

```text
assets/lost-pages/page-XX/<slug>/<asset-role>.<ext>
```

Examples:

```text
assets/lost-pages/page-01/sleeping-gallery/lit-frame-texture.png
assets/lost-pages/page-04/curators-warning/red-seal-ui.svg
assets/lost-pages/page-08/secret-portal-room/socket-glow-sprite.png
```

## Projected asset docs

Each page folder under `docs/pages/` should include projected asset requirements. A projected asset is not a claim that the file exists. It is a production target with status.

Use statuses:

- `planned`
- `needed`
- `optional`
- `blocked`
- `implemented`
- `verified`

## Asset acceptance rules

- Asset role must be tied to a page mechanic or print layout need.
- Asset filename should be predictable from page number, slug, and role.
- Do not add heavy assets without confirming Vite/GitHub Pages impact.
- Do not replace existing runtime architecture with page-specific asset hacks.
- Keep print readability and QR scannability higher priority than ornament.

## Agent rule

When an agent creates or requests assets, it must update the relevant page projected asset doc and then wire only the assets actually present in the repo.
