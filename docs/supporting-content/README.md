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
8. `docs/TRACEABILITY-MATRIX.md`
9. `docs/PAGE-DOC-STANDARD.md`
10. `docs/AGENT-BUILD-MANUAL.md`
11. The target `docs/pages/PageXX-*/README.md`
12. `agent/start-here.md`
13. `agent/pointer.md`

## Required read order for state alignment and inference

1. `agent/start-here.md`
2. `agent/pointer.md`
3. `agent/workflow.md`
4. `agent/feedback/active-feedback.md`
5. `agent/feedback/feedback-inbox.md`
6. `agent/feedback/feedback-rules.md`
7. `agent/feedback/feedback-log.md`
8. `agent/memory.md`
9. `agent/state-intelligence-ledger.md`
10. `docs/STATE-ALIGNMENT-MAP.md`
11. relevant product/source-of-truth docs under `docs/`

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
├── TRACEABILITY-MATRIX.md
├── PAGE-DOC-STANDARD.md
├── STATE-ALIGNMENT-MAP.md
├── supporting-content/
│   └── README.md
└── pages/
    ├── README.md
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

## Page packet standard

Each page README is the canonical content packet for that page. It includes:

```text
PageXX-PageName/README.md
├── DNA
├── design doc
├── projected assets
├── full outline
├── experience structure
├── game outline
├── implementation map
└── acceptance checklist
```

A later content pass may split page packets into separate files such as `DNA.md`, `DESIGN.md`, `EXPERIENCE.md`, `STRUCTURE.md`, `GAME.md`, `PROJECTED-ASSETS.md`, and `FULL-OUTLINE.md` if that becomes easier for agent orchestration.

## State Intelligence Sync rule

Before implementing major feedback, run or consider a State Intelligence Sync when agent state and non-agent docs disagree.

A State Intelligence Sync can update docs and agent knowledge. It should not update `src/`, `print/`, `scripts/`, or `.github/` unless implementation is explicitly requested.

## Build rule

Before an auto agent edits a page, it should confirm the page's docs, implementation files, print page, route slug, QR target, reward key, and game loop still agree.
