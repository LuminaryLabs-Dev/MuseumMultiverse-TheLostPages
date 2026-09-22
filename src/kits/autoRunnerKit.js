import { defineDomainServiceKit } from 'nexusengine';
import { createAutoRunnerService } from '../domains/auto-runner/service.js';

export function createAutoRunnerKit(config = {}) {
  return defineDomainServiceKit({
    domain: 'auto-runner',
    apiName: 'autoRunner',
    stability: 'local',
    version: '0.1.0',
    services: [
      'start',
      'jump',
      'tick',
      'pause',
      'resume',
      'resumePaused',
      'enableAssistance',
      'loadSnapshot',
      'snapshot',
      'reset'
    ],
    inputs: ['route.start', 'jump.press', 'run.resume', 'session.pause', 'session.resume', 'tick'],
    outputs: ['jump.buffered', 'landed', 'checkpoint.reached', 'run.missed', 'recovery.complete', 'run.final-stop'],
    createApi() {
      return createAutoRunnerService(config);
    }
  });
}
