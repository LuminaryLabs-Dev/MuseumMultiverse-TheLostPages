import { defineDomainServiceKit } from 'nexusengine';
import { createCanvasMazeMapService } from '../domains/canvas-maze-map/service.js';

export function createCanvasMazeMapKit(config = {}) {
  return defineDomainServiceKit({
    domain: 'canvas-maze-map',
    apiName: 'canvasMazeMap',
    stability: 'local',
    version: '0.1.0',
    services: ['collision', 'snapshot', 'reset'],
    createApi() {
      return createCanvasMazeMapService(config);
    }
  });
}
