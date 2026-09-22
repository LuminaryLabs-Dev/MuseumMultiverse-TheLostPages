import assert from 'node:assert/strict';
import { createGameClock } from '../src/game/clock.js';

function run(parts) {
  let distance = 0;
  const clock = createGameClock(dt => { distance += 3.1 * dt; });
  parts.forEach(ms => clock.advance(ms));
  return { ...clock.snapshot(), distance };
}
const whole = run([1000]);
for (const parts of [Array(30).fill(1000 / 30), Array(60).fill(1000 / 60), Array(144).fill(1000 / 144), [7, 243, 250, 500]]) {
  assert.deepEqual(run(parts), whole, 'Frame partition changed the simulation');
}
assert.equal(run([250]).ticks, 15);
assert.ok(Math.abs(whole.distance - 3.1) < 1e-8);
const clock = createGameClock(() => {});
clock.frame(5000);
assert.equal(clock.snapshot().ticks, 15, 'Real frame catch-up must stay bounded');
assert.throws(() => clock.advance(NaN), RangeError);
assert.throws(() => clock.advance(-1), RangeError);
clock.reset();
assert.equal(clock.snapshot().ticks, 0);
console.log('PASS: 30/60/144 fps and irregular deltas agree; 250 ms = 15 ticks; bounded frame catch-up.');
