import { defineDomainServiceKit } from 'nexusengine';
import { createLostPagesGameplayService } from '../domains/lost-pages-gameplay/service.js';

export function createLostPagesGameplayKit({ pageFactory, sessionId, requires = [] } = {}) {
  return defineDomainServiceKit({
    domain: 'lost-pages-gameplay',
    apiName: 'lostPagesGameplay',
    stability: 'local',
    version: '0.1.0',
    requires: ['n:auto-runner', 'n:journey-progress', ...requires],
    services: ['dispatch', 'tick', 'loadSnapshot', 'snapshot'],
    inputs: ['semantic.command', 'fixed.tick', 'snapshot.load'],
    outputs: ['command.result', 'player.descriptor', 'gameplay.snapshot'],
    createApi({ engine }) {
      const page = pageFactory({ engine });
      return createLostPagesGameplayService({
        autoRunner: engine.n.autoRunner,
        journeyProgress: engine.n.journeyProgress,
        page,
        sessionId
      });
    }
  });
}
