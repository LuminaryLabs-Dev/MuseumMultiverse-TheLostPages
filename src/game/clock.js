// Both real frames and deterministic proof advance this same clock.
export function createGameClock(step, { hz = 60, maxFrameMs = 250 } = {}) {
  const stepMs = 1000 / hz;
  let remainder = 0;
  let ticks = 0;
  function advance(ms) {
    if (!Number.isFinite(ms) || ms < 0) throw new RangeError('Invalid elapsed time');
    remainder += ms;
    while (remainder + 1e-8 >= stepMs) {
      step(stepMs / 1000);
      remainder -= stepMs;
      ticks++;
    }
    if (Math.abs(remainder) < 1e-8) remainder = 0;
    return ticks;
  }
  return {
    advance,
    frame(ms) { return advance(Math.min(maxFrameMs, Math.max(0, ms))); },
    reset() { remainder = 0; ticks = 0; },
    snapshot() { return { ticks, elapsedMs: ticks * stepMs, remainderMs: remainder }; }
  };
}
