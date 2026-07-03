import { createPaperRendererService } from '../domains/paper-renderer/service.js';
import { createLocalServiceKit } from './installService.js';

export function createPaperRendererKit(config = {}) {
  return createLocalServiceKit({
    id: 'lost-pages-paper-renderer-kit',
    provides: ['n:paper-renderer', 'n:paper-renderer:card-texture', 'n:paper-renderer:single-page'],
    serviceName: 'paperRenderer',
    createService() {
      return createPaperRendererService(config);
    }
  });
}
