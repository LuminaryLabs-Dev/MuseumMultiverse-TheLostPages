import { createPlaneMeshCreatorService } from '../domains/plane-mesh-creator/service.js';
import { createLocalServiceKit } from './installService.js';

export function createPlaneMeshCreatorKit(config = {}) {
  return createLocalServiceKit({
    id: 'lost-pages-plane-mesh-creator-kit',
    provides: ['n:plane-mesh-creator', 'n:mesh:plane-grid', 'n:mesh:cached-geometry'],
    serviceName: 'planeMeshCreator',
    createService() {
      return createPlaneMeshCreatorService(config);
    }
  });
}
