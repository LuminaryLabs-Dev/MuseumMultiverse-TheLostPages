import { createPaperSkinnedMeshService } from '../domains/paper-skinned-mesh/service.js';
import { createLocalServiceKit } from './installService.js';

export function createPaperSkinnedMeshKit(config = {}) {
  return createLocalServiceKit({
    id: 'lost-pages-paper-skinned-mesh-kit',
    provides: ['n:paper-skinned-mesh', 'n:paper-skinned-mesh:focus-rail', 'n:paper-skinned-mesh:motion'],
    serviceName: 'paperSkinnedMesh',
    createService() {
      return createPaperSkinnedMeshService(config);
    }
  });
}
