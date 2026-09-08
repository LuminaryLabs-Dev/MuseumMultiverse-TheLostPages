# Lost Pages source and static release

## Authority and current status

The accepted product target is an eight-page comic PDF launching eight
joystick-and-jump AR experiences. The phone controls the view, not JR's
movement. The earlier Plan/auto-run-only interaction documents describe the
existing prototype and must not override this new target.

This document owns the publishing boundary. It does not claim the new product
has been built. Existing Page 01–02 rules proofs cover auto-run prototypes;
new joystick gameplay, finished comic/PDF, all-eight player proof and device
AR acceptance remain open. No placeholder build should be published as final.

The app remains Vite + Three.js with the existing pinned NexusEngine package.
Next.js migration is not part of the approved release plan.

## Ownership

```text
MuseumMultiverse-TheLostPages / default branch main
  source, editable artwork, page definitions, PDF generation, docs, checks
  -> npm run build:luminary
  -> dist/ (browser files plus release manifest)
  -> reviewed staging only
Website / default branch main
  lostpages/ (generated files only)
  -> https://luminarylabs.dev/lostpages/
```

Website never installs Lost Pages dependencies or builds its source. Never
copy src, node_modules, .env, tests, authoring archives or agent state into
Website. Do not hand-edit its copied application. Rebuild in the source repo.
Leave the existing Website/apps/lost-pages build intact until a separately
verified compatibility redirect replaces it; the first new release does not
own or delete that legacy folder.

## Stable public addresses

The publication entry is `https://luminarylabs.dev/lostpages/`.
The finished PDF destination is `/lostpages/Lost-Pages.pdf` (not yet produced).
Eight aliases `?page=page01` through `?page=page08` resolve by the registry's
fixed page numbers, not display titles. Old `?page=<slug>` and `/ar/<slug>/`
addresses remain supported. Unknown page query values show an error and the
existing page chooser. A URL alias proves routing, not finished gameplay.

`getPageUrl` in `src/data/pages.js` produces the numbered link used by QR and
publication consumers. `VITE_PUBLIC_ORIGIN` denotes the full app root (including
`/lostpages`), and `VITE_BASE_PATH` is `/lostpages/`. Hosting the same build under
a different path requires rebuilding; printed canonical addresses stay stable.

## Separate build, stage, and push

1. Review source and run existing rules/composition checks. Selectively commit
   the intended source. A release candidate may be previewed while dirty, but
   applied staging refuses a manifest marked sourceDirty.
2. In a clean checkout of that source commit, run `npm ci`, then
   `npm run build:luminary`. Build output is ignored; never stage dist in source.
3. Serve the candidate on an ordinary static server beneath `/lostpages/`.
   Exercise routes, PDF links, game completion/recovery/save and device AR.
4. `npm run stage:luminary` only prints added/changed/removed files. It verifies
   hashes, Website identity/domain, target ownership and base URL. The old
   `deploy:luminary` command is now a dry-run alias; it never builds or pushes.
5. Only after all product checks pass, provide an evidence JSON file outside
   the source worktree using `LOST_PAGES_ACCEPTANCE=/absolute/path/evidence.json`
   and run `npm run stage:luminary -- --apply`. This is local staging, not push.
6. Review Website's exact diff, commit only `lostpages/`, push its verified
   default branch, and verify the public page, assets, PDF and manifest.

The evidence JSON contains `sourceCommit` matching the build manifest and
`checks.gameplay`, `checks.pdf`, `checks.browser`, `checks.deviceAR`, each with
`status: "passed"` and a nonempty `evidence` reference. These fields are human
review attestations, not automatic test proof. Never manufacture a passing
attestation or reuse evidence for a different source commit. Device support
must be agreed and tested before deviceAR can pass.

The build manifest records owner, source commit, dirty flag, Node/Vite versions,
engine pin, base URL, timestamp, and each file's bytes/SHA-256. It verifies exact
candidate contents. It is not an approval signature or runtime proof.

## Staging safeguards and rollback

The target must be the root of a Git checkout whose origin is
LuminaryLabs-Dev/Website and whose CNAME is luminarylabs.dev. Applied staging
requires a clean Website checkout, a real (not symlinked) target, a clean-source
candidate, the PDF, and source-matched acceptance evidence. Existing targets
must contain a valid matching ownership manifest; unknown/modified files stop
staging instead of being deleted. File inventories reject traversal, symlinks,
source directories, Markdown, source maps and common secret file extensions.
This filter supplements (does not replace) a secret and asset-license review.

The candidate is copied and checked in Website's Git-private storage. An
existing release is renamed there as `previous`; only then is the candidate
moved into `lostpages/`. A failed move/readback restores the previous directory.
The printed backup location is outside the served website and remains available.
After publication use a reviewed reverse commit for the release change, not
force-push or reset. Rebuild the original revision if no local backup remains.
Rehearse rollback in a disposable checkout before marking that gate passed.

## CI and validation limits

The source workflow now builds a static candidate artifact on main/PRs. It
does not auto-deploy source Pages or send Discord messages. Existing published
source Pages remain untouched. Only an approved Website push releases the
company-domain application.

Committed commands include `npm run check:composition` and
`npm run build:luminary`. The first is a metadata check. The pending local
Page 01–02 work also has `proof:page01` and `proof:page02`; these are older
auto-run rules proofs, not all-eight player validation, and are not included
in this packaging-only source commit.
Use Playwright plus actual screenshot review for the human-visible route and
gameplay gates. Physical AR remains unverified until checked on supported
hardware. No deployment gate may be marked passed by build success alone.

Shared task authority: [Lost Pages Project Tracker](https://docs.google.com/spreadsheets/d/1QvY6HRsCpMdwFA0AN8PhRIdk2Z-Dq-EdW1wQyzZk7iM/edit).
