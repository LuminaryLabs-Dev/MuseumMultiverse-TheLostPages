import { createViewportFitService } from '../domains/viewport-fit/service.js';
import { createLocalServiceKit } from './installService.js';

export function createViewportFitKit(config = {}) {
  return createLocalServiceKit({
    id: 'lost-pages-viewport-fit-kit',
    provides: ['n:viewport-fit', 'n:viewport-fit:camera', 'n:viewport-fit:responsive-framing'],
    serviceName: 'viewportFit',
    createService() {
      return createViewportFitService(config);
    }
  });
}
