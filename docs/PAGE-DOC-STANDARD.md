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

A later split may move those sections into separate files. Until then, the page
README is the page's design-intent packet. It does not override live source,
`docs/CURRENT-STATE.md`, or the final specification produced in Pass 3.

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
- Simulator semantic actions and direct-route player goal.
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

Do not implement a page change until its final specification and matrix row
identify the route, intended interaction, simulator actions, player goal,
expected assets, reward, and acceptance criteria.
