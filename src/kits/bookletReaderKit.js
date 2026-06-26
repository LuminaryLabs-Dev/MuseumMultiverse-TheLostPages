import { createBookletReaderService } from '../domains/booklet-reader/service.js';
import { createLocalServiceKit } from './installService.js';

export function createBookletReaderKit(config = {}) {
  return createLocalServiceKit({
    id: 'lost-pages-booklet-reader-kit',
    provides: ['n:booklet-reader', 'n:booklet-reader:navigation', 'n:booklet-reader:snapshot'],
    serviceName: 'bookletReader',
    createService() {
      return createBookletReaderService(config);
    }
  });
}
