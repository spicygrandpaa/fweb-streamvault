/* ═══════════════════════════════════════════════════════════
   js/loading.js — F Identity Cinematic Sequence
   ─────────────────────────────────────────────────────────
   Sequence:
     1. Black screen holds (breathe in)
     2. F fades in slowly, glow builds
     3. Hold — anticipation pause
     4. F splits into horizontal slices
     5. Slices push forward + outward (depth illusion)
     6. Screen fades to black
     7. Transition to Secret screen
═══════════════════════════════════════════════════════════ */

const LoadingScreen = (() => {

  /* ─── Config ──────────────────────────────────────────── */
  /* All timings in ms. Adjust here to tune the feel. */
  const TIMING = {
    initialBlack:   600,    // Hold on black before anything appears
    fFadeIn:        900,    // Duration of F fade-in
    holdBeforeSlice: 1400,  // Pause after F fully appears (anticipation)
    sliceCount:     12,     // Number of horizontal slices
    sliceStagger:   28,     // ms between each slice starting its push
    sliceDuration:  520,    // Duration of each slice's outward push
    blackFade:      500,    // Final fade to black before screen transition
    transitionDelay: 200,   // Brief gap before next screen appears
  };

  /* ─── Elements ────────────────────────────────────────── */
  let fLetter   = null;
  let fStage    = null;
  let slicesCon = null;
  let fSize     = 0; // pixel height of the F letter (measured after fonts load)

  /* ─── Init ────────────────────────────────────────────── */
  function init() {
    fLetter   = document.getElementById('loader-f');
    fStage    = fLetter.closest('.loader__f-stage');
    slicesCon = document.getElementById('loader-slices');

    _startSequence();
  }

  /* ─── Main Sequence ───────────────────────────────────── */
  async function _startSequence() {

    /* ── Phase 1: Black hold ──────────────────────────── */
    await Utils.sleep(TIMING.initialBlack);

    /* ── Phase 2: F reveals itself ───────────────────── */
    fLetter.classList.add('is-visible');
    await Utils.sleep(TIMING.fFadeIn);

    /* ── Phase 3: Anticipation pause ─────────────────── */
    await Utils.sleep(TIMING.holdBeforeSlice);

    /* ── Phase 4 + 5: Slice and push ─────────────────── */
    if (!Utils.prefersReducedMotion()) {
      await _runSliceSequence();
    }

    /* ── Phase 6: Fade screen to black ───────────────── */
    await _fadeToBlack();

    /* ── Phase 7: Hand off to Secret screen ──────────── */
    ScreenManager.transitionTo('screen-secret', {
      delay: TIMING.transitionDelay,
      onComplete: () => SecretScreen.init(),
    });
  }

  /* ─── Slice Sequence ──────────────────────────────────── */
  /*
   * Measures the F letter, clones it into N horizontal strips,
   * hides the original, then animates each strip outward
   * (alternating left/right push per slice for the "shatter" feel).
   */
  async function _runSliceSequence() {

    /* Measure the rendered F letter */
    const fRect = fLetter.getBoundingClientRect();
    fSize       = fRect.height;
    const fWidth = fRect.width;
    const fFontSize = parseFloat(getComputedStyle(fLetter).fontSize);

    /* Position the slice container to exactly overlay the F */
    slicesCon.style.width  = fWidth  + 'px';
    slicesCon.style.height = fSize   + 'px';
    slicesCon.style.top    = fRect.top  + 'px';
    slicesCon.style.left   = fRect.left + 'px';
    slicesCon.style.position = 'fixed';
    slicesCon.style.flexDirection = 'column';

    /* Build slices */
    const sliceHeight = fSize / TIMING.sliceCount;
    const slices = [];

    for (let i = 0; i < TIMING.sliceCount; i++) {
      const slice = document.createElement('div');
      slice.className = 'loader__slice';
      slice.style.height     = sliceHeight + 'px';
      slice.style.minHeight  = sliceHeight + 'px';
      slice.style.fontSize   = fFontSize + 'px';
      slice.style.position   = 'relative';

      /* Inner text mirrors the F exactly, offset vertically
         so each slice shows the correct portion of the letter */
      const inner = document.createElement('span');
      inner.textContent = 'F';
      inner.style.position       = 'absolute';
      inner.style.left           = '0';
      inner.style.right          = '0';
      inner.style.textAlign      = 'center';
      inner.style.lineHeight     = '1';
      inner.style.letterSpacing  = '-0.04em';
      inner.style.fontFamily     = 'inherit';
      inner.style.fontWeight     = 'inherit';
      inner.style.color          = 'inherit';
      inner.style.userSelect     = 'none';

      /* Position the inner text so only this slice's portion shows.
         The top of the text should be at -(i * sliceHeight) from
         the top of this slice's container. */
      inner.style.top = (-i * sliceHeight) + 'px';

      slice.appendChild(inner);
      slicesCon.appendChild(slice);
      slices.push(slice);
    }

    /* Show the slice container, hide the original F */
    slicesCon.classList.add('is-active');
    fLetter.classList.add('is-hidden');

    /* Animate each slice outward — alternate left/right push */
    /* Slices near the center push more; edges push less (cone shape) */
    const pushPromises = slices.map((slice, i) => {
      return new Promise(resolve => {
        setTimeout(() => {
          const center    = (TIMING.sliceCount - 1) / 2;
          const dist      = Math.abs(i - center);
          const maxPush   = 140;  /* px — maximum horizontal push */
          const minPush   = 18;   /* px — minimum push even at center */
          const push      = minPush + (dist / center) * (maxPush - minPush);
          const direction = i % 2 === 0 ? -1 : 1; /* alternate left/right */

          /* Slices also scale on Z (depth illusion via scaleX) and fade */
          slice.style.transition = [
            `transform ${TIMING.sliceDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            `opacity   ${TIMING.sliceDuration * 0.7}ms ease ${TIMING.sliceDuration * 0.15}ms`,
          ].join(', ');

          slice.style.transform = `translateX(${direction * push}px) scaleX(${1 + dist * 0.04})`;
          slice.style.opacity   = '0';

          setTimeout(resolve, TIMING.sliceDuration + 80);
        }, i * TIMING.sliceStagger);
      });
    });

    /* Wait for the last slice to finish */
    await Promise.all(pushPromises);
  }

  /* ─── Fade to Black ───────────────────────────────────── */
  async function _fadeToBlack() {
    const screen = document.getElementById('screen-loading');
    screen.style.transition = `background-color ${TIMING.blackFade}ms ease`;
    screen.style.backgroundColor = '#000000';
    await Utils.sleep(TIMING.blackFade);
  }

  /* ─── Public API ──────────────────────────────────────── */
  return { init };

})();
