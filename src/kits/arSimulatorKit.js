import { defineDomainServiceKit } from 'nexusengine';
import { createArSimulatorService } from '../domains/ar-simulator/service.js';

export function createArSimulatorKit(config = {}) {
  return defineDomainServiceKit({
    domain: 'ar-simulator',
    apiName: 'arSimulator',
    stability: 'local',
    version: '0.1.0',
    services: ['detect', 'place', 'snapshot', 'reset'],
    createApi() {
      return createArSimulatorService(config);
    }
  });
}
