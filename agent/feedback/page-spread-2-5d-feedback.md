# Page Spread 2.5D Feedback

Status: active feedback
Scope: feedback only

## Core direction

Pages should feel physically connected at the center spine.

The left and right pages should not read as two separate flat cards. They should read as one connected spread with a shared hinge in the middle.

## Default pose

- Pages should angle slightly inward toward the center fold.
- The center spine should visibly connect both pages.
- The spread should feel like it has depth, but still be mostly 2D.
- The look should be closer to 2.5D paper than a full 3D book simulation.

## Hover or focus behavior

- On hover, focus, or active view, the pages should look like they are opening up more fully.
- The page pair should subtly flatten outward from the center fold.
- The motion should feel like paper opening, not UI cards scaling.

## Scroll behavior

- Pages should tilt from the inside center fold outward.
- The direction of tilt should respond to scroll direction and perspective.
- Scrolling forward should make the page motion feel like a right-way page movement.
- Scrolling backward should reverse the page motion naturally.

## Page distortion

- Add a swoop or bend distortion so each page feels like paper.
- The distortion should be strongest near the free outer edge and softer near the spine.
- The page should not stay perfectly rectangular during motion.
- It should still remain readable and mostly 2D.

## Design intent

The goal is a connected magazine spread with paper-like movement.

It should feel like:

1. A connected center spine.
2. Two pages angled inward.
3. Hover opens the spread.
4. Scroll drives page tilt.
5. Light paper bending sells the motion.
6. The result stays readable as a 2.5D interface.

## Agent rule

Do not implement this from feedback intake alone.

Future implementation should update the style/design rules first, then make code changes only when explicitly requested.
