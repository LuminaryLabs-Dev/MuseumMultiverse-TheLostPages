export function createMapUnfoldService({ durationMs = 900 } = {}) {
  let state;

  function reset() {
    state = { status: 'hidden', progress: 0, durationMs };
    return snapshot();
  }

  function snapshot() {
    return { ...state };
  }

  reset();

  return {
    start() {
      state = { ...state, status: 'unfolding', progress: 0 };
      return snapshot();
    },
    tick(deltaMs = 16) {
      if (state.status !== 'unfolding') return snapshot();
      const progress = Math.min(1, state.progress + Math.max(0, deltaMs) / durationMs);
      state = { ...state, progress, status: progress >= 1 ? 'unfolded' : 'unfolding' };
      return snapshot();
    },
    complete() {
      state = { ...state, status: 'unfolded', progress: 1 };
      return snapshot();
    },
    loadSnapshot(next) {
      state = { ...next };
      return snapshot();
    },
    reset,
    snapshot
  };
}
