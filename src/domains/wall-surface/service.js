function copy(value) {
  return value == null ? value : structuredClone(value);
}

export function createWallSurfaceService() {
  let state;

  function reset() {
    state = { status: 'searching', source: null, anchor: null };
    return snapshot();
  }

  function snapshot() {
    return copy(state);
  }

  reset();

  return {
    detectWall(source = {}) {
      if (state.status === 'searching') state = { ...state, status: 'detected', source: copy(source) };
      return snapshot();
    },
    placeMap(anchor = {}) {
      state = { ...state, status: 'placed', anchor: copy(anchor) };
      return snapshot();
    },
    loadSnapshot(next) {
      state = copy(next);
      return snapshot();
    },
    reset,
    snapshot
  };
}
