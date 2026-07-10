export function createMazeGoalService({ goal }) {
  let state;

  function reset() {
    state = { completed: false, completedAtMove: null };
    return snapshot();
  }

  function snapshot() {
    return { ...state, goal: { ...goal } };
  }

  reset();

  return {
    check(characterState) {
      if (characterState.position.x === goal.x && characterState.position.y === goal.y) {
        state = { completed: true, completedAtMove: characterState.moves };
      }
      return snapshot();
    },
    complete(move = 0) {
      state = { completed: true, completedAtMove: move };
      return snapshot();
    },
    loadSnapshot(next) {
      state = { completed: Boolean(next.completed), completedAtMove: next.completedAtMove ?? null };
      return snapshot();
    },
    reset,
    snapshot
  };
}
