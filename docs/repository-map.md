# Repository Map

## Main Areas

- `src/` contains the browser app, routes, AR runtime integration, page data, and UI.
- `print/` contains print-facing magazine source content.
- `scripts/` contains deployment and static export utilities.
- `agent/` contains repo-local agent state, prompts, workflows, feedback, reports, and memory.
- `docs/` contains human-facing project documentation.
- `output.md` contains the current short deploy chat message.
- `output-rules.md` contains deploy chat style rules.

## Important App Routes

- `/launcher/`
- `/book/`
- `/print/`
- `/ar/<slug>/`
- `/debug/ar/<slug>/`

## Important Files

- `src/main.js` renders the current route.
- `src/app/routes/router.js` resolves app routes.
- `src/ar/registry/experiences.js` lists AR experiences.
- `scripts/export-static-routes.mjs` creates static route files for Pages.
- `.github/workflows/deploy-lost-pages.yml` builds, deploys, and posts the deploy chat message.
