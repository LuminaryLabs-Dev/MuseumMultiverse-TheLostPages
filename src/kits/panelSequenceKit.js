import { createComicPanelService } from '../domains/comic-panel/service.js';
import { createLocalServiceKit } from './installService.js';

export function createComicPanelSequenceKit(config = {}) {
  return createLocalServiceKit({
    id: 'lost-pages-panel-sequence-kit',
    provides: ['n:comic-panel', 'n:panel-sequence', 'n:panel-sequence:snapshot'],
    serviceName: 'comicPanel',
    createService() {
      return createComicPanelService(config);
    }
  });
}
