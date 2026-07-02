/* ═══════════════════════════════════════════════════════════
   js/secret.js — Secret Question Screen Controller
   Populates the question from config, validates the answer,
   handles wrong-answer shake animation, and advances on success.
═══════════════════════════════════════════════════════════ */

const SecretScreen = (() => {

  /* ─── State ───────────────────────────────────────────── */
  let attemptCount = 0;
  let isLocked     = false;

  /* ─── Elements ────────────────────────────────────────── */
  const el = {};

  /* ─── Init ────────────────────────────────────────────── */
  function init() {
    // Cache DOM references
    el.question = document.getElementById('secret-question');
    el.input    = document.getElementById('secret-answer');
    el.submit   = document.getElementById('secret-submit');
    el.errorEl  = document.getElementById('secret-error');
    el.errorTxt = el.errorEl.querySelector('.secret__error-text');
    el.card     = document.querySelector('.secret__card');

    // Populate question from config
    el.question.textContent = STREAMVAULT_CONFIG.secret.question;

    // Bind events
    el.submit.addEventListener('click', _handleSubmit);
    el.input.addEventListener('keydown', _handleKeydown);

    // Focus the input after a short settle delay
    setTimeout(() => el.input.focus(), 300);
  }

  /* ─── Event: Keydown ──────────────────────────────────── */
  function _handleKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      _handleSubmit();
    }
    // Clear error state on typing
    if (el.input.classList.contains('is-error')) {
      _clearError();
    }
  }

  /* ─── Event: Submit ───────────────────────────────────── */
  function _handleSubmit() {
    if (isLocked) return;

    const input = el.input.value;

    // Empty check
    if (!input.trim()) {
      el.input.focus();
      return;
    }

    const config = STREAMVAULT_CONFIG.secret;

    if (Utils.isCorrectAnswer(input, config.answer)) {
      _handleSuccess();
    } else {
      _handleFailure();
    }
  }

  /* ─── Success ─────────────────────────────────────────── */
  async function _handleSuccess() {
    // Disable input to prevent double-submission
    isLocked = true;
    el.input.disabled = true;
    el.submit.disabled = true;

    // Brief visual confirmation
    el.submit.style.background = 'linear-gradient(135deg, #1a8a3a, #116628)';
    el.submit.querySelector('.secret__btn-text').textContent = 'Welcome ✓';
    el.submit.querySelector('.secret__btn-arrow').textContent = '';

    // Short pause before transitioning
    await Utils.sleep(800);

    // Move to the profiles screen
    ScreenManager.transitionTo('screen-profiles', {
      onComplete: () => ProfilesScreen.init(),
    });
  }

  /* ─── Failure ─────────────────────────────────────────── */
  function _handleFailure() {
    attemptCount++;

    const config  = STREAMVAULT_CONFIG.secret;
    const maxIdx  = config.errorMessages.length - 1;
    const msgIdx  = Utils.clamp(attemptCount - 1, 0, maxIdx);

    // Show lockout message after too many attempts
    const message = attemptCount >= config.maxAttempts
      ? config.lockoutMessage
      : config.errorMessages[msgIdx];

    _showError(message);
    _shakeCard();

    // Clear the input for a fresh try
    el.input.value = '';
    el.input.focus();
  }

  /* ─── Show Error ──────────────────────────────────────── */
  function _showError(message) {
    el.errorTxt.textContent = message;
    el.errorTxt.classList.add('is-visible');

    // Flash the input border
    el.input.classList.add('is-error');
    el.input.addEventListener('animationend', () => {
      el.input.classList.remove('is-error');
    }, { once: true });
  }

  /* ─── Clear Error ─────────────────────────────────────── */
  function _clearError() {
    el.errorTxt.classList.remove('is-visible');
    el.input.classList.remove('is-error');
  }

  /* ─── Shake Card ──────────────────────────────────────── */
  function _shakeCard() {
    if (Utils.prefersReducedMotion()) return;

    el.card.classList.remove('is-shaking');

    // Force reflow to re-trigger animation
    void el.card.offsetWidth;

    el.card.classList.add('is-shaking');
    el.card.addEventListener('animationend', () => {
      el.card.classList.remove('is-shaking');
    }, { once: true });
  }

  /* ─── Public API ──────────────────────────────────────── */
  return { init };

})();
