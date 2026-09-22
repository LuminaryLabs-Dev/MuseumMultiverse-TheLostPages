import { assertReplayDeterministic, createReplayRunner } from 'nexusengine';
import { createMemoryStoragePort } from '../src/app/adapters/storagePort.js';
import { createPage02SimulatorRuntime } from '../src/ar/simulator/session.js';
import { createJourneyProgressService } from '../src/domains/journey-progress/service.js';
import { frameThatBreathes } from '../src/experiences/frame-that-breathes/index.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function same(left, right, message) {
  assert(JSON.stringify(left) === JSON.stringify(right), message);
}

function createRuntime(storage = createMemoryStoragePort()) {
  return createPage02SimulatorRuntime(frameThatBreathes, { storagePort: storage });
}

function placeGlyphs(runtime) {
  while (runtime.snapshot().gameplay.hero.command === 'glyph.place') {
    const hero = runtime.snapshot().gameplay.hero;
    runtime.dispatch(hero.command, { targetId: hero.targetId });
  }
  assert(runtime.snapshot().gameplay.hero.command === 'route.lock', 'Living-frame route did not become lockable.');
}

function prepareRoute(runtime) {
  if (runtime.snapshot().gameplay.phase === 'placement') runtime.dispatch('placement.confirm');
  placeGlyphs(runtime);
  runtime.dispatch('route.lock');
  assert(runtime.snapshot().gameplay.phase === 'run', 'Route lock did not start Auto Runner.');
}

function clearRun(runtime) {
  runtime.tick(82);
  runtime.dispatch('jump.press');
  runtime.tick(188);
  const gameplay = runtime.snapshot().gameplay;
  assert(gameplay.runner.status === 'final-stop', 'Frame-gap Jump did not reach the final stop.');
  assert(gameplay.runner.grounded, 'Final portal stop was not grounded.');
}

const fixture = {
  id: 'page02-build-run-recover-portal-reward',
  steps: [
    { call: 'dispatch', args: ['placement.confirm'] },
    { call: 'dispatch', args: ['glyph.place', { targetId: 'bridge' }] },
    { call: 'dispatch', args: ['glyph.place', { targetId: 'step' }] },
    { call: 'dispatch', args: ['glyph.place', { targetId: 'gate' }] },
    { call: 'dispatch', args: ['route.lock'] },
    { tick: { count: 120, dt: 1 / 60 } },
    { tick: { count: 60, dt: 1 / 60 } },
    { call: 'dispatch', args: ['run.resume'] },
    { tick: { count: 38, dt: 1 / 60 } },
    { call: 'dispatch', args: ['jump.press'] },
    { tick: { count: 200, dt: 1 / 60 } },
    { call: 'dispatch', args: ['portal.enter'] }
  ]
};
const replay = createReplayRunner({
  snapshot: (runtime) => runtime.snapshot(),
  tick: (runtime) => runtime.tick(1)
});
const firstReplay = replay.run(createRuntime(), fixture);
const secondReplay = replay.run(createRuntime(), fixture);
assertReplayDeterministic(firstReplay, secondReplay);
assert(firstReplay.snapshot.gameplay.phase === 'reward', 'Deterministic fixture did not present the Page 02 reward.');
assert(firstReplay.snapshot.gameplay.missesByBeat['frame-gap'] === 1, 'Fixture did not prove one local frame-gap miss.');

const invalidRuntime = createRuntime();
invalidRuntime.dispatch('placement.confirm');
const beforeWrongOrder = invalidRuntime.snapshot().gameplay;
const wrongOrder = invalidRuntime.dispatch('glyph.place', { targetId: 'gate' });
same(invalidRuntime.snapshot().gameplay, beforeWrongOrder, 'Out-of-order glyph mutated the route.');
assert(wrongOrder.lastResult.reason === 'invalid_order', 'Out-of-order glyph returned the wrong reason.');
const beforeWrongTarget = invalidRuntime.snapshot().gameplay;
const wrongTarget = invalidRuntime.dispatch('glyph.place', { targetId: 'not-a-socket' });
same(invalidRuntime.snapshot().gameplay, beforeWrongTarget, 'Unknown glyph mutated the route.');
assert(wrongTarget.lastResult.reason === 'invalid_target', 'Unknown glyph returned the wrong reason.');
const beforeEarlyLock = invalidRuntime.snapshot().gameplay;
const earlyLock = invalidRuntime.dispatch('route.lock');
same(invalidRuntime.snapshot().gameplay, beforeEarlyLock, 'Incomplete route lock mutated gameplay.');
assert(earlyLock.lastResult.reason === 'route_incomplete', 'Incomplete route lock returned the wrong reason.');
invalidRuntime.dispatch('glyph.place', { targetId: 'bridge' });
const beforeRepeated = invalidRuntime.snapshot().gameplay;
const repeated = invalidRuntime.dispatch('glyph.place', { targetId: 'bridge' });
same(invalidRuntime.snapshot().gameplay, beforeRepeated, 'Repeated glyph mutated the route.');
assert(repeated.lastResult.reason === 'already_applied', 'Repeated glyph returned the wrong reason.');

const directGameplay = invalidRuntime.engine.n.lostPagesGameplay;
const beforeStale = directGameplay.snapshot();
const stale = directGameplay.dispatch({
  commandId: 'page02-stale-command',
  sessionId: beforeStale.sessionId,
  pageId: beforeStale.pageId,
  name: 'glyph.place',
  targetId: 'step',
  expectedRevision: beforeStale.revision - 1,
  issuedAtTick: beforeStale.runner.tick,
  source: 'replay'
});
assert(!stale.accepted && stale.reason === 'stale_revision', 'Stale glyph input was not rejected.');
same(directGameplay.snapshot(), beforeStale, 'Stale glyph input mutated gameplay.');

const unsafeRuntime = createRuntime();
prepareRoute(unsafeRuntime);
const beforeUnsafe = unsafeRuntime.snapshot().gameplay;
const unsafe = unsafeRuntime.dispatch('glyph.place', { targetId: 'bridge' });
same(unsafeRuntime.snapshot().gameplay, beforeUnsafe, 'Socket input during the run mutated gameplay.');
assert(unsafe.lastResult.reason === 'unsafe', 'Socket input during the run was not rejected as unsafe.');
const beforeEarlyPortal = unsafeRuntime.snapshot().gameplay;
const earlyPortal = unsafeRuntime.dispatch('portal.enter');
same(unsafeRuntime.snapshot().gameplay, beforeEarlyPortal, 'Early portal entry mutated gameplay.');
assert(earlyPortal.lastResult.reason === 'not_eligible', 'Early portal entry returned the wrong reason.');

const airborneFinal = structuredClone(unsafeRuntime.snapshot().gameplay);
airborneFinal.phase = 'safeStop';
airborneFinal.runner.status = 'final-stop';
airborneFinal.runner.tick = airborneFinal.runner.route.lengthTicks;
airborneFinal.runner.position = { x: airborneFinal.runner.route.lengthUnits, y: 0.2, z: 0 };
airborneFinal.runner.grounded = false;
unsafeRuntime.loadSnapshot(airborneFinal);
const beforeAirborneEntry = unsafeRuntime.snapshot().gameplay;
const airborneEntry = unsafeRuntime.dispatch('portal.enter');
same(unsafeRuntime.snapshot().gameplay, beforeAirborneEntry, 'Airborne portal entry mutated gameplay.');
assert(airborneEntry.lastResult.reason === 'not_eligible', 'Airborne portal entry was not rejected.');

const recoveryStorage = createMemoryStoragePort();
const recoveryRuntime = createRuntime(recoveryStorage);
prepareRoute(recoveryRuntime);
const acceptedPlan = recoveryRuntime.snapshot().gameplay.acceptedPlan;
recoveryRuntime.tick(120);
assert(recoveryRuntime.snapshot().gameplay.mode === 'recovering', 'Miss did not enter local recovery.');
recoveryRuntime.tick(59);
assert(recoveryRuntime.snapshot().gameplay.mode === 'recovering', 'Recovery completed before its declared tick.');
recoveryRuntime.tick(1);
assert(recoveryRuntime.snapshot().gameplay.phase === 'safeStop', 'Recovery did not complete in 60 ticks.');
same(recoveryRuntime.snapshot().gameplay.acceptedPlan, acceptedPlan, 'Recovery erased accepted glyphs.');
assert(recoveryRuntime.snapshot().gameplay.runner.tick === 48, 'Recovery did not return to the frame checkpoint.');

const pauseStorage = createMemoryStoragePort();
const pauseRuntime = createRuntime(pauseStorage);
prepareRoute(pauseRuntime);
pauseRuntime.tick(72);
pauseRuntime.dispatch('session.pause');
const paused = pauseRuntime.snapshot().gameplay;
pauseRuntime.tick(180);
same(pauseRuntime.snapshot().gameplay.runner, paused.runner, 'Paused Page 02 runner advanced.');
const restoredRuntime = createRuntime(pauseStorage);
restoredRuntime.loadSnapshot(paused);
same(restoredRuntime.snapshot().gameplay, paused, 'Page 02 snapshot restore was not exact.');
restoredRuntime.dispatch('session.resume');
assert(restoredRuntime.snapshot().gameplay.mode == null, 'Restored Page 02 session did not resume.');

const receiptStorage = createMemoryStoragePort();
const seededJourney = createJourneyProgressService({ storage: receiptStorage });
const seededPage01 = seededJourney.commitCompletion({
  pageId: 'sleeping-gallery',
  acceptedPlan: ['proof'],
  checkpoint: { id: 'proof', tick: 0 },
  completionRevision: 1
});
assert(seededPage01.ok, 'Could not seed the Page 01 receipt for cross-page proof.');
const receiptRuntime = createRuntime(receiptStorage);
prepareRoute(receiptRuntime);
clearRun(receiptRuntime);
receiptRuntime.dispatch('portal.enter');
const completed = receiptRuntime.snapshot().gameplay;
assert(completed.phase === 'reward', 'Grounded portal entry did not reach reward.');
assert(completed.completion.receipt?.rewardId === 'breathing-frame-mark', 'Page 02 reward identity changed.');
assert(completed.completion.receipt?.slot === 2, 'Page 02 reward did not occupy slot 2.');
assert(completed.journey.journey.rewardSlots[1]?.rewardId === 'gallery-key-fragment', 'Page 02 completion removed slot 1.');
assert(completed.journey.journey.rewardSlots[2]?.rewardId === 'breathing-frame-mark', 'Reward was shown before slot 2 existed.');

const firstReceipt = completed.completion.receipt;
const firstJourneyRevision = completed.journey.journey.revision;
receiptRuntime.dispatch('route.reset');
assert(receiptRuntime.snapshot().gameplay.completion.receipt?.rewardId === firstReceipt.rewardId, 'Route reset removed slot 2 receipt.');
placeGlyphs(receiptRuntime);
receiptRuntime.dispatch('route.lock');
clearRun(receiptRuntime);
receiptRuntime.dispatch('portal.enter');
same(receiptRuntime.snapshot().gameplay.completion.receipt, firstReceipt, 'Replay created a different slot 2 receipt.');
assert(receiptRuntime.snapshot().gameplay.journey.journey.revision === firstJourneyRevision, 'Replay duplicated the journey receipt.');
assert(receiptRuntime.snapshot().gameplay.journey.journey.rewardSlots[1]?.rewardId === 'gallery-key-fragment', 'Replay removed slot 1.');
receiptRuntime.dispatch('replay.prepare');
receiptRuntime.dispatch('replay.start');
assert(receiptRuntime.snapshot().gameplay.phase === 'plan', 'Replay did not return to the Page 02 plan.');
assert(receiptRuntime.snapshot().gameplay.completion.receipt?.rewardId === 'breathing-frame-mark', 'Replay start removed slot 2 receipt.');

const failingStorage = {
  read() { return { ok: true, value: null }; },
  write() { return { ok: false, error: 'simulated_write_failure' }; },
  remove() { return { ok: true }; }
};
const failingRuntime = createRuntime(failingStorage);
prepareRoute(failingRuntime);
clearRun(failingRuntime);
failingRuntime.dispatch('portal.enter');
assert(failingRuntime.snapshot().gameplay.phase === 'complete', 'Save failure incorrectly exposed Page 02 reward.');
assert(failingRuntime.snapshot().gameplay.hero.command === 'save.retry', 'Save failure did not expose Retry Save.');
assert(failingRuntime.snapshot().gameplay.completion.receipt == null, 'Save failure created a visible Page 02 receipt.');

console.log(JSON.stringify({
  status: 'PASS',
  fixture: fixture.id,
  deterministic: true,
  composedKitIds: Object.keys(createRuntime().engine.n).sort(),
  fixedClockHz: 60,
  cases: [
    'closed Bridge-Step-Gate order and visible route descriptor',
    'wrong, repeated, stale, early-lock, unsafe, and airborne no-mutation',
    'one miss and 60-tick local recovery preserving glyphs',
    'pause and exact restore',
    'grounded portal entry and save-before-reward failure',
    'slot 1 preservation plus idempotent slot 2 reset and replay'
  ],
  recoveryTicks: 60,
  rewardId: firstReceipt.rewardId,
  receiptSlots: [1, 2]
}, null, 2));
