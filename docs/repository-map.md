# Repository Map

## Main Areas

- `src/` contains the browser app, routes, AR runtime integration, page data, and UI.
- `print/` contains print-facing magazine source content.
- `scripts/` contains deployment and static export utilities.
- `goal.md` owns the active twelve-pass mission and status.
- `memory.md` owns durable repository conventions.
- `CHANGELOG.md` reconstructs product and architecture history from Git.
- `agent/` contains active repo-local execution state, prompts, workflows,
  feedback, reports, and operational memory.
- `.agent/` preserves provisional picture-frame design discovery and does not
  control implementation.
- `docs/` contains human-facing project documentation.
- `output.md` contains the current short deploy chat message.
- `output-rules.md` contains deploy chat style rules.

## Important App Routes

- `/launcher/`
- `/book/`
- `/print/`
- `/ar/<slug>/`
- `/debug/ar/<slug>/`
- `/sim/ar/sleeping-gallery/`

## Important Files

- `docs/CURRENT-STATE.md` is the canonical dated implementation snapshot.
- `docs/DOCUMENTATION-MAP.md` assigns documentation authority.
- `src/main.js` renders the current route.
- `src/app/routes/router.js` resolves app routes.
- `src/ar/registry/experiences.js` lists AR experiences.
- `src/ar/simulator/` contains the Page 01 direct player adapter and view.
- `src/domains/auto-runner/`, `journey-progress/`, and
  `lost-pages-gameplay/` own the renderer-free shared gameplay spine.
- `scripts/prove-page01-player-slice.mjs` is the Page 01 Nexus rules gate.
- `scripts/export-static-routes.mjs` creates static route files for Pages.
- `.github/workflows/deploy-lost-pages.yml` builds, deploys, and posts the deploy chat message.
