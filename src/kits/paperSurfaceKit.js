import { createPaperSurfaceService } from '../domains/paper-surface/service.js';
import { createLocalServiceKit } from './installService.js';

export function createPaperSurfaceKit(config = {}) {
  return createLocalServiceKit({
    id: 'lost-pages-paper-surface-kit',
    provides: ['n:paper-surface', 'n:paper-surface:mount', 'n:paper-surface:snapshot'],
    serviceName: 'paperSurface',
    createService() {
      return createPaperSurfaceService(config);
    }
  });
}
