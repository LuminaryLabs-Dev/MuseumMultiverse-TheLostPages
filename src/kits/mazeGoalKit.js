import { defineDomainServiceKit } from 'nexusengine';
import { createMazeGoalService } from '../domains/maze-goal/service.js';

export function createMazeGoalKit() {
  return defineDomainServiceKit({
    domain: 'maze-goal',
    apiName: 'mazeGoal',
    stability: 'local',
    version: '0.1.0',
    requires: ['n:canvas-maze-map', 'n:map-character'],
    services: ['check', 'complete', 'snapshot', 'reset'],
    createApi({ engine }) {
      return createMazeGoalService({ goal: engine.n.canvasMazeMap.getGoal() });
    }
  });
}
