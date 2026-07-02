/* ═══════════════════════════════════════════════════════════
   js/screen-manager.js — Screen Transition Controller
   Controls which screen is visible and manages fade transitions.
   All screen switching goes through this single module.
═══════════════════════════════════════════════════════════ */

const ScreenManager = (() => {

  /* ─── Private State ───────────────────────────────────── */
  let currentScreenId = null;

  /* Map of screen IDs to their DOM elements */
  const screens = {};

  /* ─── Init ────────────────────────────────────────────── */
  function init() {
    // Collect all .screen elements
    document.querySelectorAll('.screen').forEach(el => {
      screens[el.id] = el;

      // Track which is currently active
      if (el.classList.contains('screen--active')) {
        currentScreenId = el.id;
      }
    });
  }

  /* ─── Transition To ───────────────────────────────────── */
  /**
   * Transitions from the current screen to a new one.
   * The outgoing screen fades out; the incoming screen fades in.
   *
   * @param {string} targetId — ID of the screen to show (e.g. 'screen-secret')
   * @param {Object} options
   * @param {number} options.delay — ms to wait before starting (default: 0)
   * @param {Function} options.onComplete — callback after transition ends
   * @returns {Promise<void>}
   */
  async function transitionTo(targetId, options = {}) {
    const { delay = 0, onComplete } = options;
    const targetScreen = screens[targetId];

    if (!targetScreen) {
      console.warn(`ScreenManager: screen "${targetId}" not found.`);
      return;
    }

    if (targetId === currentScreenId) return;

    // Wait for any specified delay
    if (delay > 0) await Utils.sleep(delay);

    const outgoing = screens[currentScreenId];
    const cinematicDuration = Utils.getDuration('--duration-cinematic');

    // ── Step 1: Fade out the current screen ──────────────
    if (outgoing) {
      outgoing.classList.remove('screen--active');
      outgoing.classList.add('screen--exit');
    }

    // ── Step 2: Show the target screen (slightly delayed for overlap) ──
    await Utils.sleep(cinematicDuration * 0.4);

    targetScreen.classList.add('screen--active');

    // ── Step 3: Clean up exit class after animation ───────
    await Utils.sleep(cinematicDuration);

    if (outgoing) {
      outgoing.classList.remove('screen--exit');
      // Fully hide the outgoing screen from the stacking context
      outgoing.style.zIndex = '';
    }

    currentScreenId = targetId;

    if (typeof onComplete === 'function') {
      onComplete();
    }
  }

  /* ─── Get Current ─────────────────────────────────────── */
  function getCurrent() {
    return currentScreenId;
  }

  /* ─── Public API ──────────────────────────────────────── */
  return { init, transitionTo, getCurrent };

})();
