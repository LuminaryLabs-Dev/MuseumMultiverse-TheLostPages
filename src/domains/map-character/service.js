const MOVES = {
  up: { dx: 0, dy: -1 },
  right: { dx: 1, dy: 0 },
  down: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 }
};

export function createMapCharacterService({ map }) {
  let state;

  function reset(start = map.getStart()) {
    state = { position: { ...start }, direction: 'down', motion: 'idle', lastInput: null, moves: 0 };
    return snapshot();
  }

  function snapshot() {
    return structuredClone(state);
  }

  reset();

  return {
    swipe(direction) {
      const move = MOVES[direction];
      if (!move) return snapshot();
      const collision = map.getCollisionAt(state.position.x, state.position.y);
      const canMove = collision.openings.includes(direction);
      state = {
        ...state,
        direction,
        motion: canMove ? 'moving' : 'blocked',
        lastInput: direction,
        moves: state.moves + 1,
        position: canMove
          ? { x: state.position.x + move.dx, y: state.position.y + move.dy }
          : state.position
      };
      return snapshot();
    },
    tick() {
      if (state.motion === 'moving') state = { ...state, motion: 'idle' };
      return snapshot();
    },
    loadSnapshot(next) {
      state = structuredClone(next);
      return snapshot();
    },
    reset,
    snapshot
  };
}
