import { defineRuntimeKit } from 'nexusrealtime';

export function createLocalServiceKit({ id, provides = [], requires = [], serviceName, createService }) {
  return defineRuntimeKit({
    id,
    provides: [id, ...provides],
    requires,
    metadata: {
      kind: 'lost-pages-local-service-kit',
      serviceName,
      stability: 'local',
      version: '0.1.0'
    },
    install({ engine, options }) {
      if (!engine.n || typeof engine.n !== 'object') {
        engine.n = {};
      }
      if (Object.prototype.hasOwnProperty.call(engine.n, serviceName)) {
        throw new Error(`Lost Pages service already installed: ${serviceName}`);
      }
      engine.n[serviceName] = createService({ engine, options });
    }
  });
}
