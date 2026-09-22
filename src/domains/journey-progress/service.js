const SCHEMA_VERSION = 1;

export const LOST_PAGES_REWARD_REGISTRY = Object.freeze([
  { pageId: 'sleeping-gallery', rewardId: 'gallery-key-fragment', slot: 1 },
  { pageId: 'frame-that-breathes', rewardId: 'breathing-frame-mark', slot: 2 },
  { pageId: 'lost-childs-sketchbook', rewardId: 'memory-sketch-fragment', slot: 3 },
  { pageId: 'curators-warning', rewardId: 'red-seal-warning', slot: 4 },
  { pageId: 'tiny-platformer-diorama', rewardId: 'tiny-portal-badge', slot: 5 },
  { pageId: 'in-between-exhibit', rewardId: 'portal-stabilizer-fragment', slot: 6 },
  { pageId: 'monster-behind-canvas', rewardId: 'shadow-exhibit-fragment', slot: 7 },
  { pageId: 'secret-portal-room', rewardId: 'final-portal-key', slot: 8 }
]);

function copy(value) {
  return value == null ? value : structuredClone(value);
}

function emptyJourney() {
  return {
    schemaVersion: SCHEMA_VERSION,
    revision: 0,
    rewardSlots: Array.from({ length: 9 }, () => null)
  };
}

function parseJson(value) {
  if (value == null) return { ok: true, value: null };
  try {
    return { ok: true, value: JSON.parse(value) };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

function isWholeNumber(value) {
  return Number.isInteger(value) && value >= 0;
}

function receiptMatches(receipt, entry) {
  return Boolean(
    receipt
      && receipt.pageId === entry.pageId
      && receipt.rewardId === entry.rewardId
      && receipt.slot === entry.slot
      && isWholeNumber(receipt.completionRevision)
  );
}

function validPageRecord(record, entry) {
  if (!record || record.schemaVersion !== SCHEMA_VERSION || record.pageId !== entry.pageId) return false;
  if (!isWholeNumber(record.revision) || !Array.isArray(record.acceptedPlan)) return false;
  if (!record.checkpoint || typeof record.checkpoint !== 'object' || typeof record.completed !== 'boolean') return false;
  if (!record.assistance || typeof record.assistance !== 'object' || !Array.isArray(record.mastery)) return false;
  if (record.completed) return receiptMatches(record.rewardReceipt, entry);
  return record.rewardReceipt == null;
}

function validJourney(record, registry) {
  if (!record || record.schemaVersion !== SCHEMA_VERSION || !isWholeNumber(record.revision)) return false;
  if (!Array.isArray(record.rewardSlots) || record.rewardSlots.length !== 9) return false;
  return registry.every((entry) => {
    const receipt = record.rewardSlots[entry.slot];
    return receipt == null || receiptMatches(receipt, entry);
  });
}

function normalizeAssistance(value = {}) {
  return {
    missesByBeat: copy(value.missesByBeat ?? {}),
    enabledHelp: Array.isArray(value.enabledHelp) ? [...value.enabledHelp] : []
  };
}

function normalizeMastery(value = []) {
  return Array.isArray(value) ? copy(value.slice(-50)) : [];
}

export function createJourneyProgressService({
  storage,
  namespace = 'lost-pages-journey-v1',
  legacyKey = 'lost-pages-progress',
  registry = LOST_PAGES_REWARD_REGISTRY
} = {}) {
  if (!storage?.read || !storage?.write || !storage?.remove) {
    throw new TypeError('Journey Progress requires a storage port.');
  }

  const rewards = registry.map((entry) => Object.freeze({ ...entry }));
  const byPage = new Map(rewards.map((entry) => [entry.pageId, entry]));
  const journeyKey = `${namespace}:journey`;
  const pageKey = (pageId) => `${namespace}:page:${pageId}`;
  let journey = emptyJourney();
  let pages = {};
  let corruptRecords = [];
  let storageError = null;
  let migration = { status: 'not-needed', pageIds: [] };

  function readRaw(key) {
    const result = storage.read(key);
    if (!result?.ok) {
      storageError = result?.error ?? 'storage_unavailable';
      return { ok: false, error: storageError };
    }
    return { ok: true, value: result.value ?? null };
  }

  function writeRaw(key, value) {
    const result = storage.write(key, value);
    if (!result?.ok) {
      storageError = result?.error ?? 'storage_unavailable';
      return { ok: false, error: storageError };
    }
    storageError = null;
    return { ok: true };
  }

  function restoreRaw(key, priorValue) {
    return priorValue == null ? storage.remove(key) : storage.write(key, priorValue);
  }

  function load() {
    const storedJourney = readRaw(journeyKey);
    if (storedJourney.ok && storedJourney.value != null) {
      const parsed = parseJson(storedJourney.value);
      if (parsed.ok && validJourney(parsed.value, rewards)) {
        journey = parsed.value;
      } else {
        corruptRecords.push({ id: 'journey', reason: parsed.error ?? 'invalid_record' });
      }
    }

    for (const entry of rewards) {
      const storedPage = readRaw(pageKey(entry.pageId));
      if (!storedPage.ok || storedPage.value == null) continue;
      const parsed = parseJson(storedPage.value);
      if (parsed.ok && validPageRecord(parsed.value, entry)) {
        pages[entry.pageId] = parsed.value;
      } else {
        corruptRecords.push({ id: entry.pageId, reason: parsed.error ?? 'invalid_record' });
      }
    }
  }

  function page08Eligibility() {
    const missingPageIds = [];
    for (const entry of rewards.filter((candidate) => candidate.slot <= 7)) {
      const receipt = journey.rewardSlots[entry.slot];
      const record = pages[entry.pageId];
      if (!receiptMatches(receipt, entry) || !validPageRecord(record, entry) || !record.completed) {
        missingPageIds.push(entry.pageId);
      }
    }
    return { eligible: missingPageIds.length === 0, missingPageIds };
  }

  function saveCheckpoint(input = {}) {
    const entry = byPage.get(input.pageId);
    if (!entry) return { ok: false, reason: 'invalid_target' };
    const existing = pages[entry.pageId];
    if (existing?.completed) {
      return { ok: true, reason: 'already_applied', record: copy(existing), existing: true };
    }
    const record = {
      schemaVersion: SCHEMA_VERSION,
      pageId: entry.pageId,
      revision: (existing?.revision ?? 0) + 1,
      acceptedPlan: copy(input.acceptedPlan ?? existing?.acceptedPlan ?? []),
      checkpoint: copy(input.checkpoint ?? existing?.checkpoint ?? { id: 'start', tick: 0 }),
      completed: false,
      rewardReceipt: null,
      assistance: normalizeAssistance(input.assistance ?? existing?.assistance),
      mastery: normalizeMastery(input.mastery ?? existing?.mastery)
    };
    if (!validPageRecord(record, entry)) return { ok: false, reason: 'invalid_record' };
    const stored = writeRaw(pageKey(entry.pageId), JSON.stringify(record));
    if (!stored.ok) return { ok: false, reason: 'save_unavailable', error: stored.error };
    pages = { ...pages, [entry.pageId]: record };
    corruptRecords = corruptRecords.filter((candidate) => candidate.id !== entry.pageId);
    return { ok: true, reason: 'saved', record: copy(record), existing: false };
  }

  function commitCompletion(input = {}) {
    const entry = byPage.get(input.pageId);
    if (!entry) return { ok: false, reason: 'invalid_target' };
    const existing = pages[entry.pageId];
    if (existing?.completed && receiptMatches(existing.rewardReceipt, entry)) {
      const journeyReceipt = journey.rewardSlots[entry.slot];
      if (!journeyReceipt) {
        const nextJourney = copy(journey);
        nextJourney.revision += 1;
        nextJourney.rewardSlots[entry.slot] = copy(existing.rewardReceipt);
        const repaired = writeRaw(journeyKey, JSON.stringify(nextJourney));
        if (!repaired.ok) return { ok: false, reason: 'save_unavailable', error: repaired.error };
        journey = nextJourney;
        corruptRecords = corruptRecords.filter((candidate) => candidate.id !== 'journey');
        return {
          ok: true,
          reason: 'repaired',
          existing: true,
          receipt: copy(existing.rewardReceipt),
          record: copy(existing)
        };
      }
      if (!receiptMatches(journeyReceipt, entry)) return { ok: false, reason: 'receipt_conflict' };
      return {
        ok: true,
        reason: 'already_applied',
        existing: true,
        receipt: copy(existing.rewardReceipt),
        record: copy(existing)
      };
    }
    if (entry.slot === 8) {
      const eligibility = page08Eligibility();
      if (!eligibility.eligible) return { ok: false, reason: 'not_eligible', ...eligibility };
    }
    const occupied = journey.rewardSlots[entry.slot];
    if (occupied && !receiptMatches(occupied, entry)) {
      return { ok: false, reason: 'receipt_conflict' };
    }

    const completionRevision = isWholeNumber(input.completionRevision)
      ? input.completionRevision
      : (existing?.revision ?? 0) + 1;
    const receipt = {
      pageId: entry.pageId,
      rewardId: entry.rewardId,
      slot: entry.slot,
      completionRevision
    };
    const record = {
      schemaVersion: SCHEMA_VERSION,
      pageId: entry.pageId,
      revision: (existing?.revision ?? 0) + 1,
      acceptedPlan: copy(input.acceptedPlan ?? existing?.acceptedPlan ?? []),
      checkpoint: copy(input.checkpoint ?? existing?.checkpoint ?? { id: 'final', tick: 0 }),
      completed: true,
      rewardReceipt: receipt,
      assistance: normalizeAssistance(input.assistance ?? existing?.assistance),
      mastery: normalizeMastery(input.mastery ?? existing?.mastery)
    };
    const nextJourney = copy(journey);
    nextJourney.revision += 1;
    nextJourney.rewardSlots[entry.slot] = receipt;
    if (!validPageRecord(record, entry) || !validJourney(nextJourney, rewards)) {
      return { ok: false, reason: 'invalid_record' };
    }

    const priorPage = readRaw(pageKey(entry.pageId));
    const priorJourney = readRaw(journeyKey);
    if (!priorPage.ok || !priorJourney.ok) return { ok: false, reason: 'save_unavailable' };
    const pageWrite = writeRaw(pageKey(entry.pageId), JSON.stringify(record));
    if (!pageWrite.ok) return { ok: false, reason: 'save_unavailable', error: pageWrite.error };
    const journeyWrite = writeRaw(journeyKey, JSON.stringify(nextJourney));
    if (!journeyWrite.ok) {
      const rollback = restoreRaw(pageKey(entry.pageId), priorPage.value);
      return {
        ok: false,
        reason: 'save_unavailable',
        error: journeyWrite.error,
        rollback: Boolean(rollback?.ok)
      };
    }

    pages = { ...pages, [entry.pageId]: record };
    journey = nextJourney;
    corruptRecords = corruptRecords.filter((candidate) => !['journey', entry.pageId].includes(candidate.id));
    return {
      ok: true,
      reason: 'saved',
      existing: false,
      receipt: copy(receipt),
      record: copy(record)
    };
  }

  function migrateLegacy() {
    const legacy = readRaw(legacyKey);
    if (!legacy.ok || legacy.value == null) return;
    const parsed = parseJson(legacy.value);
    if (!parsed.ok || !Array.isArray(parsed.value?.claimedFragments)) {
      migration = { status: 'invalid-legacy', pageIds: [] };
      return;
    }
    const migrated = [];
    for (const claimed of parsed.value.claimedFragments) {
      const entry = rewards.find((candidate) => candidate.pageId === claimed || candidate.rewardId === claimed);
      if (!entry || pages[entry.pageId]?.completed) continue;
      const saved = commitCompletion({
        pageId: entry.pageId,
        acceptedPlan: ['legacy-import'],
        checkpoint: { id: 'legacy-complete', beatId: 'legacy', primaryPhase: 'reward', tick: 0, extensionState: {} },
        assistance: {},
        mastery: [{ type: 'legacy.migrated' }],
        completionRevision: 0
      });
      if (saved.ok) migrated.push(entry.pageId);
    }
    migration = migrated.length
      ? { status: 'applied', pageIds: migrated }
      : { status: 'not-needed', pageIds: [] };
  }

  function getReceipt(pageId) {
    const entry = byPage.get(pageId);
    if (!entry) return null;
    const receipt = journey.rewardSlots[entry.slot];
    return receiptMatches(receipt, entry) ? copy(receipt) : null;
  }

  function resetAll(confirmation) {
    if (confirmation !== 'RESET ALL LOST PAGES') return { ok: false, reason: 'confirmation_required' };
    const keys = [journeyKey, legacyKey, ...rewards.map((entry) => pageKey(entry.pageId))];
    for (const key of keys) {
      const removed = storage.remove(key);
      if (!removed?.ok) return { ok: false, reason: 'save_unavailable', error: removed?.error };
    }
    journey = emptyJourney();
    pages = {};
    corruptRecords = [];
    migration = { status: 'not-needed', pageIds: [] };
    storageError = null;
    return { ok: true, reason: 'cleared' };
  }

  function snapshot() {
    return copy({
      schemaVersion: SCHEMA_VERSION,
      namespace,
      journey,
      pageRecords: pages,
      corruptRecords,
      migration,
      storageError,
      page08: page08Eligibility()
    });
  }

  load();
  migrateLegacy();

  return Object.freeze({
    saveCheckpoint,
    commitCompletion,
    getReceipt,
    page08Eligibility,
    resetAll,
    snapshot
  });
}
