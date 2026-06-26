const DEFAULT_STATE = Object.freeze({
  readPages: [],
  claimedFragments: []
});

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function loadState(storageKey) {
  if (!canUseStorage()) return { ...DEFAULT_STATE };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) || 'null');
    return {
      readPages: Array.isArray(parsed?.readPages) ? parsed.readPages : [],
      claimedFragments: Array.isArray(parsed?.claimedFragments) ? parsed.claimedFragments : []
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function createProgressService({ storageKey = 'lost-pages-progress', pages = [] } = {}) {
  const state = loadState(storageKey);

  function persist() {
    if (!canUseStorage()) return;
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function addUnique(listName, slug) {
    if (!slug || state[listName].includes(slug)) return;
    state[listName].push(slug);
    persist();
  }

  function markPageRead(slug) {
    addUnique('readPages', slug);
    return snapshot();
  }

  function claimFragment(slug) {
    addUnique('claimedFragments', slug);
    return snapshot();
  }

  function canOpenPortal() {
    return pages.length > 0 && state.claimedFragments.length >= pages.length;
  }

  function reset() {
    state.readPages = [];
    state.claimedFragments = [];
    persist();
    return snapshot();
  }

  function snapshot() {
    return {
      storageKey,
      readPages: [...state.readPages],
      claimedFragments: [...state.claimedFragments],
      totalPages: pages.length,
      canOpenPortal: canOpenPortal()
    };
  }

  return Object.freeze({
    markPageRead,
    claimFragment,
    canOpenPortal,
    reset,
    snapshot
  });
}
