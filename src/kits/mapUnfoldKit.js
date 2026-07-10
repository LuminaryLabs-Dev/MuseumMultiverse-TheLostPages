import { defineDomainServiceKit } from 'nexusengine';
import { createMapUnfoldService } from '../domains/map-unfold/service.js';

export function createMapUnfoldKit(config = {}) {
  return defineDomainServiceKit({
    domain: 'map-unfold',
    apiName: 'mapUnfold',
    stability: 'local',
    version: '0.1.0',
    services: ['start', 'tick', 'snapshot', 'reset'],
    createApi() {
      return createMapUnfoldService(config);
    }
  });
}
