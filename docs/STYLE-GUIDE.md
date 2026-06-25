# Lost Pages Style Guide

Status: supporting content scaffold

## Direction

Lost Pages should feel like a haunted comic-book museum magazine, not a flat PDF and not a generic AR demo.

The active product direction now uses the main print view as the primary non-AR review/presentation surface. The dedicated 3D book view is retained only as a legacy/debug/composition reference unless a later product decision removes or redirects it.

## Visual rules

- Favor bold, readable page hierarchy.
- Use comic-panel rhythm where it helps scanning and comprehension.
- Use museum labels, accession marks, seals, frames, map symbols, and sketch annotations as visual language.
- Keep QR areas clean and scannable.
- Avoid heavy sepia as the default tone.
- Avoid dense texture behind body copy.
- Preserve readability before atmosphere.
- Page surfaces should read as paper: squared corners, subtle fiber texture, and edge shading.
- Book/print WebGL page surfaces should use GLSL shading for paper grain, lighting, and rectangular paper edges while that implementation exists.
- Do not round page cards or paper sheets unless a later design intentionally changes the magazine page metaphor.

## Print View Surface Direction

- Main print view is the primary presentation/review surface.
- Background should read as tabletop or physical surface, not a dense digital grid.
- Use grounded shadows under the page layout.
- Avoid pointer-following glow effects.
- Keep reactivity subtle and physical: orientation, parallax, paper lift, or a similar physical response.
- A first-pass physical book-opening transition now exists as a CSS/DOM opening-and-settling transition into the page layout.
- Future polish should judge the transition in browser/device preview before deciding whether it needs WebGL or more complex motion.

## Motion rules

- Motion should be reactive and subtle.
- Use motion to signal discovery, progress, completion, or danger.
- Avoid spectacle that distracts from route launch or QR scanning.
- Desktop debug motion should not hide controls.
- Physical print-view motion should feel grounded and tactile, not glow-based.
- Pointer movement may drive paper tilt/parallax, but it should not move a visible glow or spotlight.

## UI rules

- Every AR route needs a clear start gate.
- Every page needs a visible objective.
- Progress feedback should be countable or otherwise obvious.
- Reward feedback should be distinct from ordinary interaction feedback.
- Non-AR review navigation should prioritize the main print view unless `/book/` is deliberately retained for debug or legacy review.
- If `/book/` remains available, label or style it as legacy/debug/secondary rather than as an equal primary surface.

## Voice

Use museum language with playful unease:

- curator note
- gallery wing
- red seal
- exhibit fragment
- accession mark
- portal room
- canvas whisper
- memory sketch

Avoid generic fantasy exposition when a museum-specific phrase can do the work.

## Accessibility baseline

- Maintain contrast for print and screen.
- Avoid tiny body copy on print pages.
- Give non-color-only progress feedback where possible.
- Keep interactions simple enough for one-handed phone use.
