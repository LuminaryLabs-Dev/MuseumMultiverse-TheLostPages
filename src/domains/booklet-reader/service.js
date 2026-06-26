const INTRO_STAGES = Object.freeze({
  TITLE: 'title',
  OPENING: 'opening',
  READING: 'reading'
});

function clampIndex(value, max) {
  if (max <= 0) return 0;
  return Math.max(0, Math.min(max - 1, value));
}

export function createBookletReaderService({ pageCount = 0, firstPageIndex = 0 } = {}) {
  const state = {
    introStage: INTRO_STAGES.TITLE,
    isOpen: false,
    activePageIndex: clampIndex(firstPageIndex, pageCount),
    pageCount,
    hasSeenIntro: false
  };

  function open() {
    state.introStage = INTRO_STAGES.READING;
    state.isOpen = true;
    state.hasSeenIntro = true;
    return snapshot();
  }

  function startOpening() {
    state.introStage = INTRO_STAGES.OPENING;
    state.isOpen = true;
    return snapshot();
  }

  function skipIntro() {
    return open();
  }

  function goToPage(index) {
    state.activePageIndex = clampIndex(index, state.pageCount);
    state.introStage = INTRO_STAGES.READING;
    state.isOpen = true;
    return snapshot();
  }

  function nextPage() {
    return goToPage(state.activePageIndex + 1);
  }

  function previousPage() {
    return goToPage(state.activePageIndex - 1);
  }

  function reset() {
    state.introStage = INTRO_STAGES.TITLE;
    state.isOpen = false;
    state.activePageIndex = clampIndex(firstPageIndex, state.pageCount);
    state.hasSeenIntro = false;
    return snapshot();
  }

  function snapshot() {
    return {
      ...state,
      canGoNext: state.activePageIndex < state.pageCount - 1,
      canGoPrevious: state.activePageIndex > 0
    };
  }

  return Object.freeze({
    open,
    startOpening,
    skipIntro,
    goToPage,
    nextPage,
    previousPage,
    reset,
    snapshot
  });
}
