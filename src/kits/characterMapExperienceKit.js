import { defineDomainServiceKit } from 'nexusengine';
import { createCharacterMapExperienceService } from '../domains/character-map-experience/service.js';
import { createCanvasMazeMapKit } from './canvasMazeMapKit.js';
import { createMapCharacterKit } from './mapCharacterKit.js';
import { createMapUnfoldKit } from './mapUnfoldKit.js';
import { createMazeGoalKit } from './mazeGoalKit.js';
import { createWallSurfaceKit } from './wallSurfaceKit.js';

export function createCharacterMapExperienceKits(config = {}) {
  return [
    createWallSurfaceKit(),
    createMapUnfoldKit(config.unfold),
    createCanvasMazeMapKit(config.maze),
    createMapCharacterKit(),
    createMazeGoalKit(),
    defineDomainServiceKit({
      domain: 'character-map-experience',
      apiName: 'characterMap',
      stability: 'local',
      version: '0.1.0',
      requires: ['n:wall-surface', 'n:map-unfold', 'n:canvas-maze-map', 'n:map-character', 'n:maze-goal'],
      services: ['wall', 'unfold', 'swipe', 'snapshot', 'reset'],
      createApi({ engine }) {
        return createCharacterMapExperienceService({
          wallSurface: engine.n.wallSurface,
          mapUnfold: engine.n.mapUnfold,
          canvasMazeMap: engine.n.canvasMazeMap,
          mapCharacter: engine.n.mapCharacter,
          mazeGoal: engine.n.mazeGoal
        });
      }
    })
  ];
}
