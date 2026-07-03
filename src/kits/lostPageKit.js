import { defineRuntimeKit } from 'nexusrealtime';
import { createLostPageService } from '../domains/lost-page/service.js';

export function createLostPageKit(config = {}) {
  return defineRuntimeKit({
    id: 'lost-pages-lost-page-kit',
    provides: [
      'lost-pages-lost-page-kit',
      'n:lost-page',
      'n:lost-page:single-page',
      'n:lost-page:card-rail',
      'n:paper-renderer',
      'n:paper-skinned-mesh'
    ],
    metadata: {
      kind: 'lost-pages-local-composition-kit',
      serviceName: 'lostPages',
      stability: 'local',
      version: '0.1.0',
      composes: ['lost-pages-paper-renderer-kit', 'lost-pages-paper-skinned-mesh-kit']
    },
    install({ engine }) {
      if (!engine.n || typeof engine.n !== 'object') {
        engine.n = {};
      }
      if (Object.prototype.hasOwnProperty.call(engine.n, 'lostPages')) {
        throw new Error('Lost Pages service already installed: lostPages');
      }

      const service = createLostPageService(config);
      engine.n.lostPages = service;

      if (!Object.prototype.hasOwnProperty.call(engine.n, 'paperRenderer')) {
        engine.n.paperRenderer = service.paperRenderer;
      }
      if (!Object.prototype.hasOwnProperty.call(engine.n, 'paperSkinnedMesh')) {
        engine.n.paperSkinnedMesh = service.paperSkinnedMesh;
      }
    }
  });
}
