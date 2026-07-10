import { createEngine } from 'nexusengine';
import { createArSimulatorKit } from '../../kits/arSimulatorKit.js';
import { createCharacterMapExperienceKits } from '../../kits/characterMapExperienceKit.js';
import { solveCharacterMap } from '../runtime/session.js';

export function createPage01SimulatorRuntime(experience) {
  const engine = createEngine({
    kits: [
      createArSimulatorKit({ seed: 101, width: 6, depth: 7, height: 3.4 }),
      ...createCharacterMapExperienceKits(experience.level.characterMap)
    ]
  });

  function snapshot() {
    return {
      simulator: engine.n.arSimulator.snapshot(),
      characterMap: engine.n.characterMap.snapshot()
    };
  }

  return {
    engine,
    snapshot,
    detectWall() {
      const simulator = engine.n.arSimulator.detectWall();
      engine.n.characterMap.detectWall(simulator.room.wall);
      return snapshot();
    },
    placeMap() {
      const simulator = engine.n.arSimulator.placeMap();
      if (simulator.mapPlaced) engine.n.characterMap.placeMap(simulator.room.anchor);
      return snapshot();
    },
    completeUnfold() {
      engine.n.characterMap.completeUnfold();
      return snapshot();
    },
    swipe(direction) {
      engine.n.characterMap.handleSwipe(direction);
      return snapshot();
    },
    solve() {
      solveCharacterMap(engine);
      return snapshot();
    },
    reset() {
      engine.n.arSimulator.reset();
      engine.n.characterMap.reset();
      return snapshot();
    }
  };
}
