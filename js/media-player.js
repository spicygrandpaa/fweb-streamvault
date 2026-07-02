/* ═══════════════════════════════════════════════════════════
   js/media-player.js — Fullscreen Media Player Overlay
   ─────────────────────────────────────────────────────────
   Opens above any screen as a fixed overlay.
   Supports:
   - Images: display only, no controls
   - Videos: play/pause, volume, mute
   - Next / Previous navigation through a card set
   - Keyboard: Escape = close, ← = prev, → = next
   - Music pauses on video open, resumes on close
   - Right-click and drag disabled on all media
═══════════════════════════════════════════════════════════ */

const MediaPlayer = (() => {

  /* ─── State ─────────────────────────────────────────── */
  let cards        = [];
  let currentIndex = 0;
  let isOpen       = false;
  let activeVideo  = null;

  /* ─── DOM refs ───────────────────────────────────────── */
  let overlay, stage, closeBtn, prevBtn, nextBtn,
      controls, playBtn, volumeSlider, muteBtn, captionEl;

  /* ─── Init — called once on DOMContentLoaded ─────────── */
  function init() {
    overlay      = document.getElementById('media-player');
    stage        = document.getElementById('mp-stage');
    closeBtn     = document.getElementById('mp-close');
    prevBtn      = document.getElementById('mp-prev');
    nextBtn      = document.getElementById('mp-next');
    controls     = document.getElementById('mp-controls');
    playBtn      = document.getElementById('mp-play');
    volumeSlider = document.getElementById('mp-volume');
    muteBtn      = document.getElementById('mp-mute');
    captionEl    = document.getElementById('mp-caption');

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    playBtn.addEventListener('click', _toggleVideoPlay);
    muteBtn.addEventListener('click', _toggleVideoMute);
    volumeSlider.addEventListener('input', () => {
      if (activeVideo) activeVideo.volume = parseFloat(volumeSlider.value);
    });

    // Click the dark backdrop to close
    overlay.addEventListener('click', e => {
      if (e.target === overlay) close();
    });

    // Keyboard navigation
    document.addEventListener('keydown', _onKeydown);
  }

  /* ─── Open with a set of cards, starting at index ───── */
  function open(cardSet, startIndex) {
    cards        = cardSet;
    currentIndex = startIndex || 0;
    isOpen       = true;

    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('is-open'));

    _render();
    document.body.style.overflow = 'hidden';
  }

  /* ─── Close the overlay ──────────────────────────────── */
  function close() {
    if (!isOpen) return;
    _teardownVideo();

    overlay.classList.remove('is-open');
    setTimeout(() => {
      overlay.hidden   = true;
      stage.innerHTML  = '';
    }, 400);

    isOpen = false;
    document.body.style.overflow = '';

    // Resume background music after video closes
    AudioEngine.resumeAfterVideo();
  }

  /* ─── Navigate to next card ──────────────────────────── */
  function next() {
    if (cards.length <= 1) return;
    _teardownVideo();
    currentIndex = (currentIndex + 1) % cards.length;
    _render();
  }

  /* ─── Navigate to previous card ─────────────────────── */
  function prev() {
    if (cards.length <= 1) return;
    _teardownVideo();
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    _render();
  }

  /* ─── Render the current card ────────────────────────── */
  function _render() {
    const card = cards[currentIndex];
    if (!card) return;

    stage.innerHTML = '';
    activeVideo     = null;

    // Show/hide nav arrows
    prevBtn.style.display = cards.length > 1 ? 'flex' : 'none';
    nextBtn.style.display = cards.length > 1 ? 'flex' : 'none';

    if (card.type === 'video') {
      _renderVideo(card);
    } else {
      _renderImage(card);
    }

    captionEl.textContent = card.caption || '';
  }

  function _renderImage(card) {
    const img = document.createElement('img');
    img.src       = card.src;
    img.alt       = card.caption || '';
    img.className = 'media-player__image';
    img.draggable = false;

    // Discourage right-click saving
    img.addEventListener('contextmenu', e => e.preventDefault());

    stage.appendChild(img);
    controls.style.display = 'none';
  }

  function _renderVideo(card) {
    const video = document.createElement('video');
    video.src         = card.src;
    video.className   = 'media-player__video';
    video.controls    = false;
    video.playsInline = true;
    video.volume      = parseFloat(volumeSlider.value);

    // Discourage right-click saving
    video.addEventListener('contextmenu', e => e.preventDefault());

    stage.appendChild(video);
    activeVideo = video;

    controls.style.display = 'flex';
    playBtn.textContent    = '▶';

    // Pause background music while video plays
    AudioEngine.pauseForVideo();

    video.play()
      .then(() => { playBtn.textContent = '⏸'; })
      .catch(() => {});

    muteBtn.textContent = video.muted ? '🔇' : '🔊';
  }

  function _teardownVideo() {
    if (activeVideo) {
      activeVideo.pause();
      activeVideo.src = '';
      activeVideo     = null;
    }
  }

  /* ─── Video controls ─────────────────────────────────── */
  function _toggleVideoPlay() {
    if (!activeVideo) return;
    if (activeVideo.paused) {
      activeVideo.play()
        .then(() => { playBtn.textContent = '⏸'; })
        .catch(() => {});
    } else {
      activeVideo.pause();
      playBtn.textContent = '▶';
    }
  }

  function _toggleVideoMute() {
    if (!activeVideo) return;
    activeVideo.muted  = !activeVideo.muted;
    muteBtn.textContent = activeVideo.muted ? '🔇' : '🔊';
  }

  /* ─── Keyboard handler ───────────────────────────────── */
  function _onKeydown(e) {
    if (!isOpen) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
  }

  /* ─── Public API ─────────────────────────────────────── */
  return { init, open, close, next, prev };

})();
