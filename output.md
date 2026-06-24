# Lost Pages deploy output

✅ Lost Pages deployment messaging was upgraded.

## What changed

- Added `output.md` as the Discord message dump file.
- Updated `.github/workflows/deploy-lost-pages.yml` so the Discord notifier reads `output.md` after each deploy.
- Added checkout to the notify job so it can read repository files.
- Preserved the live Pages link, run link, repo, actor, and commit in the Discord header.
- Added Discord-safe message splitting for longer `output.md` content.
- Kept deploy success independent from Discord notification failure.

## How to use this from now on

Whenever a Lost Pages change is made, update this file with the exact message you want Discord to receive.

On every push to `main`, the workflow will:

1. Build Lost Pages.
2. Deploy to GitHub Pages.
3. Read `output.md`.
4. Post the contents of `output.md` to Discord with the live link.

## Current expected behavior

The next successful workflow run should post this file's contents into the configured Discord webhook channel.
