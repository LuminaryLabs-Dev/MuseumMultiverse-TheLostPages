export function createCharacterMapExperienceService({ wallSurface, mapUnfold, canvasMazeMap, mapCharacter, mazeGoal }) {
  function snapshot() {
    return {
      wall: wallSurface.snapshot(),
      unfold: mapUnfold.snapshot(),
      map: canvasMazeMap.snapshot(),
      character: mapCharacter.snapshot(),
      goal: mazeGoal.snapshot()
    };
  }

  return {
    detectWall(source) {
      wallSurface.detectWall(source);
      return snapshot();
    },
    placeMap(anchor) {
      wallSurface.placeMap(anchor);
      if (mapUnfold.snapshot().status === 'hidden') mapUnfold.start();
      return snapshot();
    },
    handleSwipe(direction) {
      if (mapUnfold.snapshot().status !== 'unfolded') return snapshot();
      const character = mapCharacter.swipe(direction);
      mazeGoal.check(character);
      mapCharacter.tick();
      return snapshot();
    },
    tick(deltaMs) {
      mapUnfold.tick(deltaMs);
      return snapshot();
    },
    completeUnfold() {
      mapUnfold.complete();
      return snapshot();
    },
    reset() {
      wallSurface.reset();
      mapUnfold.reset();
      canvasMazeMap.reset();
      mapCharacter.reset(canvasMazeMap.getStart());
      mazeGoal.reset();
      return snapshot();
    },
    snapshot
  };
}
