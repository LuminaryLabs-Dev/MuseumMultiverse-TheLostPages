# Lost Pages Supporting Content System

Status: draft scaffold
Audience: auto agents, project operators, designers, writers, builders

This folder is the non-agent product and creative documentation scaffold for Museum Multiverse: Lost Pages.

`agent/` remains the operating system for tasks, memory, pointers, and run logs. `docs/` explains what the project is, what each page should become, what assets are needed, what game loops exist, and how a future agent should build without inventing structure.

## Required read order for content-building agents

1. `docs/supporting-content/README.md`
2. `docs/DNA.md`
3. `docs/FULL-OUTLINE.md`
4. `docs/PITCH-DECK.md`
5. `docs/EXPERIENCE-MODEL.md`
6. `docs/GAME-MODEL.md`
7. `docs/ASSET-PIPELINE.md`
8. `docs/AGENT-BUILD-MANUAL.md`
9. The target `docs/pages/PageXX-*/` folder
10. `agent/start-here.md`
11. `agent/pointer.md`

## Top-level documentation tree

```text
_docs product layer_
docs/
├── DNA.md
├── FULL-OUTLINE.md
├── PITCH-DECK.md
├── EXPERIENCE-MODEL.md
├── GAME-MODEL.md
├── ASSET-PIPELINE.md
├── STYLE-GUIDE.md
├── TECHNICAL-BUILD-MAP.md
├── QA-ACCEPTANCE.md
├── AGENT-BUILD-MANUAL.md
├── supporting-content/
│   └── README.md
└── pages/
    ├── README.md
    ├── Page01-SleepingGallery/
    ├── Page02-FrameThatBreathes/
    ├── Page03-LostChildsSketchbook/
    ├── Page04-CuratorsWarning/
    ├── Page05-TinyPlatformerDiorama/
    ├── Page06-InBetweenExhibit/
    ├── Page07-MonsterBehindCanvas/
    └── Page08-SecretPortalRoom/
```

## Per-page documentation tree

Each page folder should contain the same design spine:

```text
PageXX-PageName/
├── README.md
├── DNA.md
├── DESIGN.md
├── EXPERIENCE.md
├── STRUCTURE.md
├── GAME.md
├── PROJECTED-ASSETS.md
└── FULL-OUTLINE.md
```

## Build rule

Before an auto agent edits a page, it should confirm the page's docs, implementation files, print page, route slug, QR target, reward key, and game loop still agree.
