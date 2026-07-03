import { createPageRailMovementService } from '../domains/page-rail-movement/service.js';
import { createLocalServiceKit } from './installService.js';

export function createPageRailMovementKit(config = {}) {
  return createLocalServiceKit({
    id: 'lost-pages-page-rail-movement-kit',
    provides: ['n:page-rail', 'n:page-rail:movement', 'n:page-rail:card-descriptors'],
    serviceName: 'pageRail',
    createService() {
      return createPageRailMovementService(config);
    }
  });
}
