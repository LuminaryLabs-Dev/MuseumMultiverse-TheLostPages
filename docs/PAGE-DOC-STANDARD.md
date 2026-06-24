# Lost Pages Page Documentation Standard

Status: supporting content scaffold

## Required page content packet

Each page folder under `docs/pages/` should explain enough for a future auto agent to build without guessing.

```text
PageXX-PageName/
└── README.md
    ├── DNA
    ├── design doc
    ├── projected assets
    ├── full outline
    ├── experience structure
    ├── game outline
    ├── implementation map
    └── acceptance checklist
```

A later split may move those sections into separate files such as `DNA.md`, `DESIGN.md`, `PROJECTED-ASSETS.md`, `FULL-OUTLINE.md`, `EXPERIENCE.md`, `STRUCTURE.md`, and `GAME.md`. Until then, the page README is the canonical page content packet.

## Required fields

- Page number.
- Page title.
- Slug.
- QR title.
- Public route.
- Debug route.
- Print source file.
- Runtime source folder.
- Reward/collectible.
- Primary interaction verb.
- Story beat.
- Projected asset list.
- Acceptance checklist.

## Page folder naming

Use:

```text
docs/pages/PageXX-ShortPageName/
```

Examples:

```text
docs/pages/Page01-SleepingGallery/
docs/pages/Page08-SecretPortalRoom/
```

## Agent rule

Do not implement a page change until the page content packet identifies the page's route, intended interaction, expected assets, reward, and acceptance criteria.
