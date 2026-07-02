/* ═══════════════════════════════════════════════════════════
   js/audio-engine.js — Music Playback System
   ─────────────────────────────────────────────────────────
   Rules:
   - Loads a playlist from config and loops continuously
   - Autoplay on profile load (browser-policy fallback handled)
   - Pauses immediately when a VIDEO opens in media player
   - Resumes when that video closes
   - Images do NOT affect music
   - Volume and mute controlled via the audio bar in homepage
═══════════════════════════════════════════════════════════ */

const AudioEngine = (() => {

  /* ─── State ─────────────────────────────────────────── */
  let audio        = null;
  let playlist     = [];
  let currentIndex = 0;
  let isMuted      = false;
  let volume       = 0.5;

  /* ─── UI element references ─────────────────────────── */
  let titleEl   = null;
  let playIcon  = null;
  let muteIcon  = null;
  let volumeEl  = null;

  /* ─── Init — called once on DOMContentLoaded ─────────── */
  function init() {
    titleEl  = document.getElementById('audio-bar-title');
    playIcon = document.getElementById('audio-play-icon');
    muteIcon = document.getElementById('audio-mute-icon');
    volumeEl = document.getElementById('audio-volume');

    document.getElementById('audio-play-btn')
      .addEventListener('click', togglePlay);
    document.getElementById('audio-mute-btn')
      .addEventListener('click', toggleMute);
    volumeEl.addEventListener('input', () =>
      setVolume(parseFloat(volumeEl.value))
    );
  }

  /* ─── Load a playlist and begin playback ─────────────── */
  function loadPlaylist(tracks) {
    stop();
    playlist     = tracks || [];
    currentIndex = 0;
    if (playlist.length === 0) return;
    _playTrack(currentIndex);
  }

  /* ─── Internal: play one track by index ─────────────── */
  function _playTrack(index) {
    if (audio) {
      audio.pause();
      audio.src = '';
    }

    const track = playlist[index];
    if (!track) return;

    audio        = new Audio(track.src);
    audio.volume = isMuted ? 0 : volume;
    audio.preload = 'auto';

    // When this track ends, advance to next (wraps around)
    audio.addEventListener('ended', _onTrackEnd);

    // Update the track title in the audio bar
    if (titleEl) titleEl.textContent = track.title || '—';

    // Attempt autoplay — browsers may require a user gesture first
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => _setPlayIcon(true))
        .catch(() => _setPlayIcon(false)); // silently wait for user tap
    }
  }

  function _onTrackEnd() {
    currentIndex = (currentIndex + 1) % playlist.length;
    _playTrack(currentIndex);
  }

  /* ─── Called by media-player.js when a VIDEO opens ────── */
  function pauseForVideo() {
    if (audio && !audio.paused) {
      audio.pause();
      _setPlayIcon(false);
    }
  }

  /* ─── Called by media-player.js when the VIDEO closes ─── */
  function resumeAfterVideo() {
    if (audio && audio.paused && playlist.length > 0) {
      audio.play()
        .then(() => _setPlayIcon(true))
        .catch(() => {});
    }
  }

  /* ─── Toggle play / pause ────────────────────────────── */
  function togglePlay() {
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => _setPlayIcon(true)).catch(() => {});
    } else {
      audio.pause();
      _setPlayIcon(false);
    }
  }

  /* ─── Toggle mute ────────────────────────────────────── */
  function toggleMute() {
    isMuted = !isMuted;
    if (audio) audio.volume = isMuted ? 0 : volume;
    if (muteIcon) muteIcon.textContent = isMuted ? '🔇' : '🔊';
  }

  /* ─── Set volume (0–1) ───────────────────────────────── */
  function setVolume(val) {
    volume = Utils.clamp(val, 0, 1);
    if (!isMuted && audio) audio.volume = volume;
    if (volumeEl) volumeEl.value = volume;
  }

  /* ─── Stop and tear down current audio ──────────────── */
  function stop() {
    if (audio) {
      audio.pause();
      audio.removeEventListener('ended', _onTrackEnd);
      audio.src = '';
      audio     = null;
    }
    playlist     = [];
    currentIndex = 0;
    if (titleEl)  titleEl.textContent = '—';
    _setPlayIcon(false);
  }

  /* ─── Sync the play/pause icon ───────────────────────── */
  function _setPlayIcon(playing) {
    if (playIcon) playIcon.textContent = playing ? '⏸' : '▶';
  }

  /* ─── Public API ─────────────────────────────────────── */
  return {
    init,
    loadPlaylist,
    pauseForVideo,
    resumeAfterVideo,
    togglePlay,
    toggleMute,
    setVolume,
    stop,
  };

})();
