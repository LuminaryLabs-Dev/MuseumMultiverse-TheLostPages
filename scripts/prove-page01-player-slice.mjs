import { performance } from 'node:perf_hooks';
import { assertReplayDeterministic, createReplayRunner } from 'nexusengine';
import { createMemoryStoragePort } from '../src/app/adapters/storagePort.js';
import { createPage01SimulatorRuntime } from '../src/ar/simulator/session.js';
import { createAutoRunnerService } from '../src/domains/auto-runner/service.js';
import { createJourneyProgressService, LOST_PAGES_REWARD_REGISTRY } from '../src/domains/journey-progress/service.js';
import { sleepingGallery } from '../src/experiences/sleeping-gallery/index.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function same(left, right, message) {
  assert(JSON.stringify(left) === JSON.stringify(right), message);
}

function createRuntime(storage = createMemoryStoragePort()) {
  return createPage01SimulatorRuntime(sleepingGallery, { storagePort: storage });
}

function traceRoute(runtime) {
  while (runtime.snapshot().gameplay.hero.command === 'map.step') {
    const hero = runtime.snapshot().gameplay.hero;
    runtime.dispatch(hero.command, { targetId: hero.targetId });
  }
  assert(runtime.snapshot().gameplay.hero.command === 'route.lock', 'Direct route did not become lockable.');
}

function prepareRoute(runtime) {
  if (runtime.snapshot().gameplay.phase === 'placement') runtime.dispatch('placement.confirm');
  traceRoute(runtime);
  runtime.dispatch('route.lock');
  assert(runtime.snapshot().gameplay.phase === 'run', 'Route lock did not start Auto Runner.');
}

function clearRun(runtime) {
  runtime.tick(70);
  runtime.dispatch('jump.press');
  runtime.tick(170);
  assert(runtime.snapshot().gameplay.runner.status === 'final-stop', 'Generous Jump did not reach the final stop.');
}

const directRouteSteps = ['direct-1', 'direct-2', 'direct-3', 'direct-4', 'direct-heart']
  .map((targetId) => ({ call: 'dispatch', args: ['map.step', { targetId }] }));
const fixture = {
  id: 'page01-plan-run-recover-reward',
  steps: [
    { call: 'dispatch', args: ['placement.confirm'] },
    ...directRouteSteps,
    { call: 'dispatch', args: ['route.lock'] },
    { tick: { count: 105, dt: 1 / 60 } },
    { tick: { count: 60, dt: 1 / 60 } },
    { call: 'dispatch', args: ['run.resume'] },
    { tick: { count: 38, dt: 1 / 60 } },
    { call: 'dispatch', args: ['jump.press'] },
    { tick: { count: 200, dt: 1 / 60 } },
    { call: 'dispatch', args: ['reward.claim'] }
  ]
};
const replay = createReplayRunner({
  snapshot: (runtime) => runtime.snapshot(),
  tick: (runtime) => runtime.tick(1)
});
const firstReplay = replay.run(createRuntime(), fixture);
const secondReplay = replay.run(createRuntime(), fixture);
assertReplayDeterministic(firstReplay, secondReplay);
assert(firstReplay.snapshot.gameplay.phase === 'reward', 'Deterministic fixture did not present the reward.');
assert(firstReplay.snapshot.gameplay.missesByBeat['crease-lesson'] === 1, 'First-clear fixture did not prove one local miss.');

const invalidRuntime = createRuntime();
invalidRuntime.dispatch('placement.confirm');
const beforeInvalid = invalidRuntime.snapshot().gameplay;
const invalid = invalidRuntime.dispatch('map.step', { targetId: 'direct-heart' });
same(invalidRuntime.snapshot().gameplay, beforeInvalid, 'Invalid route input mutated gameplay state.');
assert(invalid.lastResult.reason === 'invalid_order', 'Invalid route input returned the wrong reason.');

const directGameplay = invalidRuntime.engine.n.lostPagesGameplay;
const staleBefore = directGameplay.snapshot();
const stale = directGameplay.dispatch({
  commandId: 'stale-command',
  sessionId: staleBefore.sessionId,
  pageId: staleBefore.pageId,
  name: 'map.step',
  targetId: 'direct-1',
  expectedRevision: staleBefore.revision - 1,
  issuedAtTick: staleBefore.runner.tick,
  source: 'replay'
});
assert(!stale.accepted && stale.reason === 'stale_revision', 'Stale input was not rejected.');
same(directGameplay.snapshot(), staleBefore, 'Stale input mutated gameplay state.');

const recoveryStorage = createMemoryStoragePort();
const recoveryRuntime = createRuntime(recoveryStorage);
prepareRoute(recoveryRuntime);
const acceptedPlan = recoveryRuntime.snapshot().gameplay.acceptedPlan;
for (let miss = 1; miss <= 3; miss += 1) {
  recoveryRuntime.tick(miss === 1 ? 105 : 63);
  assert(recoveryRuntime.snapshot().gameplay.mode === 'recovering', `Miss ${miss} did not enter recovery.`);
  recoveryRuntime.tick(59);
  assert(recoveryRuntime.snapshot().gameplay.mode === 'recovering', `Miss ${miss} recovered before its declared tick.`);
  recoveryRuntime.tick(1);
  assert(recoveryRuntime.snapshot().gameplay.phase === 'safeStop', `Miss ${miss} did not recover in 60 ticks.`);
  same(recoveryRuntime.snapshot().gameplay.acceptedPlan, acceptedPlan, `Miss ${miss} erased the accepted route.`);
  if (miss < 3) recoveryRuntime.dispatch('run.resume');
}
assert(recoveryRuntime.snapshot().gameplay.helpAvailable, 'Third miss did not expose optional Help.');
recoveryRuntime.dispatch('assistance.enable');
assert(recoveryRuntime.snapshot().gameplay.assistanceEnabled, 'Optional Help did not widen the retry.');

const pauseStorage = createMemoryStoragePort();
const pauseRuntime = createRuntime(pauseStorage);
prepareRoute(pauseRuntime);
pauseRuntime.tick(70);
pauseRuntime.dispatch('session.pause');
const paused = pauseRuntime.snapshot().gameplay;
pauseRuntime.tick(180);
same(pauseRuntime.snapshot().gameplay.runner, paused.runner, 'Paused runner advanced with wall-clock-independent ticks.');
const restoredRuntime = createRuntime(pauseStorage);
restoredRuntime.loadSnapshot(paused);
same(restoredRuntime.snapshot().gameplay, paused, 'Snapshot restore did not reproduce the exact paused gameplay state.');
restoredRuntime.dispatch('session.resume');
assert(restoredRuntime.snapshot().gameplay.mode == null, 'Restored session did not resume.');

const receiptStorage = createMemoryStoragePort();
const receiptRuntime = createRuntime(receiptStorage);
prepareRoute(receiptRuntime);
clearRun(receiptRuntime);
receiptRuntime.dispatch('reward.claim');
const firstReceipt = receiptRuntime.snapshot().gameplay.completion.receipt;
const firstJourneyRevision = receiptRuntime.snapshot().gameplay.journey.journey.revision;
receiptRuntime.dispatch('route.reset');
assert(receiptRuntime.snapshot().gameplay.completion.receipt.rewardId === firstReceipt.rewardId, 'Route reset removed the receipt.');
traceRoute(receiptRuntime);
receiptRuntime.dispatch('route.lock');
clearRun(receiptRuntime);
receiptRuntime.dispatch('reward.claim');
same(receiptRuntime.snapshot().gameplay.completion.receipt, firstReceipt, 'Replay created a different receipt.');
assert(receiptRuntime.snapshot().gameplay.journey.journey.revision === firstJourneyRevision, 'Replay duplicated the journey receipt.');

const failingStorage = {
  read() { return { ok: true, value: null }; },
  write() { return { ok: false, error: 'simulated_write_failure' }; },
  remove() { return { ok: true }; }
};
const failingRuntime = createRuntime(failingStorage);
prepareRoute(failingRuntime);
clearRun(failingRuntime);
failingRuntime.dispatch('reward.claim');
assert(failingRuntime.snapshot().gameplay.phase === 'complete', 'Save failure incorrectly exposed the reward phase.');
assert(failingRuntime.snapshot().gameplay.hero.command === 'save.retry', 'Save failure did not expose Retry Save.');
assert(failingRuntime.snapshot().gameplay.completion.receipt == null, 'Save failure created a visible receipt.');

const legacyStorage = createMemoryStoragePort({
  'lost-pages-progress': JSON.stringify({ claimedFragments: ['sleeping-gallery'] })
});
const migrated = createJourneyProgressService({ storage: legacyStorage });
assert(migrated.snapshot().migration.status === 'applied', 'Legacy fragment did not migrate.');
assert(migrated.getReceipt('sleeping-gallery')?.rewardId === 'gallery-key-fragment', 'Legacy migration changed reward identity.');
assert(migrated.resetAll('RESET ALL LOST PAGES').ok, 'All reset failed after migration.');
const afterLegacyReset = createJourneyProgressService({ storage: legacyStorage });
assert(afterLegacyReset.getReceipt('sleeping-gallery') == null, 'Cleared legacy data migrated again after restart.');

const repairStorage = createMemoryStoragePort();
const repairOriginal = createJourneyProgressService({ storage: repairStorage });
repairOriginal.commitCompletion({ pageId: 'sleeping-gallery', checkpoint: { id: 'proof', tick: 0 }, completionRevision: 1 });
repairStorage.remove('lost-pages-journey-v1:journey');
const repairReloaded = createJourneyProgressService({ storage: repairStorage });
assert(repairReloaded.getReceipt('sleeping-gallery') == null, 'Missing journey record did not fail closed.');
const repaired = repairReloaded.commitCompletion({ pageId: 'sleeping-gallery' });
assert(repaired.ok && repaired.reason === 'repaired', 'Valid page record did not repair its missing journey slot.');
assert(repairReloaded.getReceipt('sleeping-gallery')?.rewardId === 'gallery-key-fragment', 'Journey repair changed receipt identity.');
assert(!repairReloaded.resetAll('wrong confirmation').ok, 'All reset accepted the wrong confirmation.');
assert(repairReloaded.getReceipt('sleeping-gallery') != null, 'Rejected all reset removed the receipt.');
assert(repairReloaded.resetAll('RESET ALL LOST PAGES').ok, 'Confirmed all reset failed.');
assert(repairReloaded.getReceipt('sleeping-gallery') == null, 'Confirmed all reset retained the receipt.');

const gate = createJourneyProgressService({ storage: createMemoryStoragePort() });
for (const entry of LOST_PAGES_REWARD_REGISTRY.slice(0, 7)) {
  gate.commitCompletion({ pageId: entry.pageId, checkpoint: { id: 'proof', tick: 0 }, completionRevision: 1 });
}
assert(gate.page08Eligibility().eligible, 'Seven valid receipts did not open Page 08 eligibility.');
assert(gate.getReceipt('secret-portal-room') == null, 'Page 08 eligibility wrote slot 8 early.');

const bufferRunner = createAutoRunnerService();
bufferRunner.start();
bufferRunner.jump();
bufferRunner.tick(50);
assert(bufferRunner.jump().accepted, 'Pre-landing Jump buffer was not accepted.');
const bufferedState = bufferRunner.snapshot();
const repeatedBuffer = bufferRunner.jump();
assert(!repeatedBuffer.accepted && repeatedBuffer.reason === 'already_buffered', 'Repeated buffer did not reject.');
same(bufferRunner.snapshot(), bufferedState, 'Repeated buffered Jump mutated runner state.');
const bufferEvents = bufferRunner.tick(4).events;
assert(bufferEvents.some((event) => event.type === 'jump.started' && event.buffered), 'Buffered Jump did not fire on landing.');

const coyoteRunner = createAutoRunnerService();
coyoteRunner.start();
const falling = coyoteRunner.snapshot();
falling.tick = 10;
falling.position.x = falling.route.lengthUnits * (falling.tick / falling.route.lengthTicks);
falling.grounded = false;
falling.jumpStartTick = null;
falling.lastGroundedTick = 5;
coyoteRunner.loadSnapshot(falling);
const coyote = coyoteRunner.jump();
assert(coyote.accepted && coyote.events[0].coyote, 'Coyote-grace Jump was not accepted.');

const performanceRunner = createAutoRunnerService();
performanceRunner.start();
const samples = [];
for (let index = 0; index < 900; index += 1) {
  if (['safe-stop', 'final-stop'].includes(performanceRunner.snapshot().status)) {
    if (performanceRunner.snapshot().status === 'safe-stop') performanceRunner.resume();
    else {
      performanceRunner.reset();
      performanceRunner.start();
    }
  }
  const startedAt = performance.now();
  performanceRunner.tick(1);
  samples.push(performance.now() - startedAt);
}
samples.sort((left, right) => left - right);
const p95Ms = samples[Math.floor(samples.length * 0.95)];
assert(p95Ms <= 4, `Auto Runner p95 ${p95Ms.toFixed(3)} ms exceeded the 4 ms budget.`);

console.log(JSON.stringify({
  status: 'PASS',
  fixture: fixture.id,
  deterministic: true,
  cases: [
    'normal path with one miss',
    'invalid and stale no-mutation',
    'third-miss help',
    'pause and exact restore',
    'save-before-reward failure',
    'idempotent replay and route reset',
    'legacy migration, record repair, confirmed reset, and Page 08 gate',
    'Jump buffer and coyote grace'
  ],
  recoveryTicks: 60,
  runnerP95Ms: Number(p95Ms.toFixed(4)),
  rewardId: firstReceipt.rewardId
}, null, 2));
