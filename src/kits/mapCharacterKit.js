import { defineDomainServiceKit } from 'nexusengine';
import { createMapCharacterService } from '../domains/map-character/service.js';

export function createMapCharacterKit() {
  return defineDomainServiceKit({
    domain: 'map-character',
    apiName: 'mapCharacter',
    stability: 'local',
    version: '0.1.0',
    requires: ['n:canvas-maze-map'],
    services: ['swipe', 'tick', 'snapshot', 'reset'],
    createApi({ engine }) {
      return createMapCharacterService({ map: engine.n.canvasMazeMap });
    }
  });
}
