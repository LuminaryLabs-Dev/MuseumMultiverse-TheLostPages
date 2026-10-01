# Lost Pages Page Documentation Index

Status: supporting content scaffold

Each page folder is a content packet for one printed page and one QR-launched experience. The page packet should guide writers, designers, builders, and auto agents.

Page packets describe design intent and acceptance targets. They do not prove
implementation. Check `../CURRENT-STATE.md` first for current behavior and
fresh evidence; Pass 3 will reconcile these scaffolds into final page
specifications.

## Page folders

```text
docs/pages/
├── Page01-SleepingGallery/
│   └── README.md
├── Page02-FrameThatBreathes/
│   └── README.md
├── Page03-LostChildsSketchbook/
│   └── README.md
├── Page04-CuratorsWarning/
│   └── README.md
├── Page05-TinyPlatformerDiorama/
│   └── README.md
├── Page06-InBetweenExhibit/
│   └── README.md
├── Page07-MonsterBehindCanvas/
│   └── README.md
└── Page08-SecretPortalRoom/
    └── README.md
```

## How to use a page packet

Before editing a page, read the matching folder and confirm:

- page DNA
- design intent
- projected assets
- full outline
- route and source paths
- game objective
- acceptance checklist

Then compare against `docs/TRACEABILITY-MATRIX.md`, the runtime files in `src/experiences/<slug>/`, and the matching print file in `print/magazine-pages/`.

If runtime copy, print copy, and a page packet disagree, record the drift
instead of silently choosing one. Runtime manifests own current route behavior;
Pass 3 owns the final product decision.
