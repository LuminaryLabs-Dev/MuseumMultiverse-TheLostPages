import { createPagePivotService } from '../domains/page-pivot/service.js';
import { createLocalServiceKit } from './installService.js';

export function createPagePivotKit(config = {}) {
  return createLocalServiceKit({
    id: 'lost-pages-page-pivot-kit',
    provides: ['n:page-pivot', 'n:page-pivot:bottom-left-anchor', 'n:page-pivot:center-rotation'],
    serviceName: 'pagePivot',
    createService() {
      return createPagePivotService(config);
    }
  });
}
