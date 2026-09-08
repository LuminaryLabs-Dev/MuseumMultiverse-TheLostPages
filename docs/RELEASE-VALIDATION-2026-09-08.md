# 2026-09-08 release implementation checkpoint

Status: partial implementation, not a finished product release.

## Implemented

- Numbered page01–page08 aliases and legacy slug compatibility.
- Canonical /lostpages/ production paths and full-app-root URLs.
- Invalid-page recovery with eight explicit page links.
- Exact static-file inventory with SHA-256, source revision and dirty flag.
- Dry-run-first Website staging with identity, ownership and checksum checks.
- Recoverable replacement restricted to Website/lostpages/.
- Source CI builds candidates without auto-publishing or Discord notifications.
- Existing Drive tracker updated; eight existing page entries retained.

## Checks and limits

- Local npm run build:luminary passed; composition recognizes eight entries.
- Plain static-server route sweep: eight HTTP 200 responses, matching titles,
  no captured page exceptions or failed requests. This reaches existing phone
  handoff screens; it does not prove new joystick gameplay or desktop fallback.
- Native assertions checked numbered aliases, legacy slugs, canonical URLs,
  invalid IDs, forbidden release paths and candidate manifest hashes.
- Disposable staging fixtures checked dry-run no-op, first/replacement staging,
  backup retention, untouched company index, rejection of unknown target files,
  corrupt candidate hashes and symlinks. No real Website staging was applied.
- Existing local Page 01–02 auto-run rules proofs passed, but are pending
  user-owned work outside this source commit and not new-product acceptance.
- Build warns about a large JS chunk and NexusEngine browser-externalized Node
  imports. Mobile performance and lazy runtime paths remain unverified.
- Drive values were read back. Native formatting and dropdowns were preserved;
  no browser-based sheet visual review was performed.

## Still required before Website publication

- Shared joystick movement, jumping and usable non-AR fallback.
- All eight agreed levels, checkpoints, replay, rewards and save compatibility.
- Finished comic artwork, provenance and a verified eight-page Lost-Pages.pdf.
- Player-view, PDF link/QR, performance and supported-device AR evidence.
- Reconciliation of older active gameplay documents and pending local changes.
- Full rollback rehearsal, Website commit, deployment and public verification.

The Website checkout is intentionally unchanged while these gates are open.
The old Website/apps/lost-pages/ build is not deleted or replaced.

Next implementation slice: shared direct controls in one camera-free level.
The supported-phone matrix must be resolved before final AR acceptance.
