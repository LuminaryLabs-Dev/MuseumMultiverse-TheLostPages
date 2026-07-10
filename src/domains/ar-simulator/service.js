function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function buildRoom({ seed, width, depth, height }) {
  const random = seededRandom(seed);
  const exhibits = Array.from({ length: 12 }, (_, index) => ({
    id: `sim-exhibit-${String(index + 1).padStart(2, '0')}`,
    side: index % 2 ? 'right' : 'left',
    offset: Number((0.12 + (index % 6) * 0.14).toFixed(2)),
    tone: Math.floor(32 + random() * 28)
  }));
  return {
    id: `page-01-room-${seed}`,
    seed,
    dimensions: { width, depth, height },
    wall: { id: 'sim-back-wall', classification: 'wall', normal: [0, 0, 1], width, height },
    anchor: { id: 'sim-map-anchor', wallId: 'sim-back-wall', position: [0, height * 0.54, -depth / 2 + 0.02] },
    exhibits,
    objectCount: 1 + 1 + 4 + exhibits.length
  };
}

export function createArSimulatorService(config = {}) {
  const settings = {
    seed: Number(config.seed ?? 101),
    width: Number(config.width ?? 6),
    depth: Number(config.depth ?? 7),
    height: Number(config.height ?? 3.4)
  };
  const room = buildRoom(settings);
  let state;

  function reset() {
    state = { status: 'ready', wallDetected: false, mapPlaced: false, room };
    return snapshot();
  }

  function snapshot() {
    return structuredClone(state);
  }

  reset();
  return {
    detectWall() {
      state = { ...state, status: 'wall-detected', wallDetected: true };
      return snapshot();
    },
    placeMap() {
      if (!state.wallDetected) return snapshot();
      state = { ...state, status: 'map-placed', mapPlaced: true };
      return snapshot();
    },
    reset,
    snapshot
  };
}
