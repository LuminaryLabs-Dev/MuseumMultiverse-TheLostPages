import { createRouteQrService } from '../domains/route-qr/service.js';
import { createLocalServiceKit } from './installService.js';

export function createRouteQrKit(config = {}) {
  return createLocalServiceKit({
    id: 'lost-pages-route-qr-kit',
    provides: ['n:route-qr', 'n:route-qr:targets', 'n:route-qr:validation'],
    serviceName: 'routeQr',
    createService() {
      return createRouteQrService(config);
    }
  });
}
