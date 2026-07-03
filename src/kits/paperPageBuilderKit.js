import { createPaperPageBuilderService } from '../domains/paper-page-builder/service.js';
import { createLocalServiceKit } from './installService.js';

export function createPaperPageBuilderKit(config = {}) {
  return createLocalServiceKit({
    id: 'lost-pages-paper-page-builder-kit',
    provides: ['n:paper-page-builder', 'n:paper-page-builder:load-once', 'n:paper-renderer'],
    serviceName: 'paperPageBuilder',
    createService({ engine } = {}) {
      return createPaperPageBuilderService({
        ...config,
        planeMeshCreator: config.planeMeshCreator ?? engine?.n?.planeMeshCreator
      });
    }
  });
}
