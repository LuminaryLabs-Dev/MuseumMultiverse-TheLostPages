# Deployment

Lost Pages deploys from main with GitHub Actions.

The build runs Vite and then exports static route files.

Static export copies dist/index.html into route folders so phone-opened Pages URLs can load.

Expected public root:

https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/

Useful phone route:

https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/launcher/

Direct AR routes use this shape:

https://luminarylabs-dev.github.io/MuseumMultiverse-TheLostPages/ar/<slug>/

output.md contains the current short deploy message.

output-rules.md explains the message style.
