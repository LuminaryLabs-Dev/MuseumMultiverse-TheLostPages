# Page 01 mock scene implementation

Date: 2026-09-19
Status: implemented locally; not pushed

## Goal

Keep the existing starter-book and QR flow, then add one bounded vertical slice:

```text
page01 → page landing → Open mock scene → walk through museum
```

## Changes

- Added `mock=1` route handling without changing the existing page URL.
- Added a shared browser mock museum scene with a small keyboard-controlled visitor.
- Added an `Open mock scene` link to every page landing.
- Added generated Page 01 museum-entry artwork as a versioned asset.
- Displayed the generated artwork on the Page 01 landing and central mock exhibit.

## Deliberately not changed

- Existing QR targets remain `?page=page01` through `?page=page08`.
- Existing AR launch behavior remains available.
- No JR asset replacement was attempted.
- No original image was overwritten.
- No chroma-key plugin was added: this slice contains no green-screen media or video input, so adding one would create unused surface area.
- No Website repository or Unity repository was modified.

## Validation

- `npm run build` passed.
- Existing `npm run proof:page01` passed.
- Production build contains the generated Page 01 image.
- Vite serves `/?page=page01&mock=1`.

## Remaining review

- Human browser review of the mock scene layout is still required.
- License/provenance review is required before publishing generated or downloaded art.
