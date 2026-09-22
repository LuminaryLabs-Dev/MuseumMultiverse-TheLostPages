import { defineDomainServiceKit } from 'nexusengine';
import { createJourneyProgressService } from '../domains/journey-progress/service.js';

export function createJourneyProgressKit(config = {}) {
  return defineDomainServiceKit({
    domain: 'journey-progress',
    apiName: 'journeyProgress',
    stability: 'local',
    version: '0.1.0',
    services: ['saveCheckpoint', 'commitCompletion', 'getReceipt', 'page08Eligibility', 'resetAll', 'snapshot'],
    inputs: ['page.checkpoint', 'page.complete', 'journey.reset-confirmed'],
    outputs: ['checkpoint.saved', 'completion.saved', 'completion.existing', 'save.failed', 'journey.eligibility'],
    createApi() {
      return createJourneyProgressService(config);
    }
  });
}
