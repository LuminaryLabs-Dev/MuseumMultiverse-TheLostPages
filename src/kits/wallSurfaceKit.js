import { defineDomainServiceKit } from 'nexusengine';
import { createWallSurfaceService } from '../domains/wall-surface/service.js';

export function createWallSurfaceKit() {
  return defineDomainServiceKit({
    domain: 'wall-surface',
    apiName: 'wallSurface',
    stability: 'local',
    version: '0.1.0',
    services: ['detect', 'place', 'snapshot', 'reset'],
    createApi: createWallSurfaceService
  });
}
