/* ═══════════════════════════════════════════════════════════
   js/app.js — Application Entry Point
   Bootstraps the entire app after the DOM is ready.
   ─────────────────────────────────────────────────────────
   Mission 1: ScreenManager + LoadingScreen — UNCHANGED
   Mission 2: AudioEngine + MediaPlayer added
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Initialize the screen management system ─────── */
  ScreenManager.init();

  /* ── 2. Start the loading screen F sequence ──────────── */
  LoadingScreen.init();

  /* ── 3. Mission 2: init audio and media player ───────── */
  AudioEngine.init();
  MediaPlayer.init();

  /* ── 4. Version marker in console ───────────────────── */
  console.log(
    '%c v1.0 ',
    'background: #C8102E; color: #fff; font-weight: 700; font-size: 11px; padding: 2px 6px; border-radius: 3px;'
  );

});
