/* ═══════════════════════════════════════════════════════════
   js/secret-page.js — Secret Easter Egg Page
   ─────────────────────────────────────────────────────────
   Unlocked by clicking the F logo 5× on any homepage.
   Minimal UI — just F, a media grid, and secret music.
   Future-proof: add more songs to config.secretPage.music
   and they auto-play in order, looping.
═══════════════════════════════════════════════════════════ */

const SecretPageModule = (() => {

  /* ─── Init ───────────────────────────────────────────── */
  function init() {
    _buildGrid();
    _bindBack();
    AudioEngine.loadPlaylist(STREAMVAULT_CONFIG.secretPage.music || []);
  }

  /* ─── Build media grid ───────────────────────────────── */
  function _buildGrid() {
    const grid  = document.getElementById('secret-page-grid');
    const cards = STREAMVAULT_CONFIG.secretPage.cards || [];
    grid.innerHTML = '';

    if (cards.length === 0) {
      grid.innerHTML = '<p class="secret-page__empty">your secrets will appear here ♥</p>';
      return;
    }

    cards.forEach((card, i) => {
      const item = document.createElement('div');
      item.className = 'secret-page__card';
      item.setAttribute('role', 'listitem');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', card.caption || ('Secret ' + (i + 1)));

      const thumb = document.createElement('div');
      thumb.className = 'secret-page__card-thumb';

      if (card.type === 'video' && !card.thumb) {
        /* No separate thumbnail — use the video's first frame */
        const vid = document.createElement('video');
        vid.src      = card.src;
        vid.preload  = 'metadata';
        vid.muted    = true;
        vid.className = 'secret-page__card-thumb-media';
        vid.addEventListener('contextmenu', e => e.preventDefault());
        vid.addEventListener('loadedmetadata', () => {
          vid.currentTime = 0.001;
        });
        thumb.appendChild(vid);
      } else {
        const img = document.createElement('img');
        img.src       = card.thumb || card.src;
        img.alt       = card.caption || '';
        img.loading   = 'lazy';
        img.draggable = false;
        img.className = 'secret-page__card-thumb-media';
        img.addEventListener('contextmenu', e => e.preventDefault());
        thumb.appendChild(img);
      }

      if (card.type === 'video') {
        const badge = document.createElement('div');
        badge.className   = 'secret-page__card-badge';
        badge.textContent = '▶';
        badge.setAttribute('aria-hidden', 'true');
        thumb.appendChild(badge);
      }

      item.appendChild(thumb);
      grid.appendChild(item);

      item.addEventListener('click', () => MediaPlayer.open(cards, i));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          MediaPlayer.open(cards, i);
        }
      });
    });
  }

  /* ─── Back button ────────────────────────────────────── */
  function _bindBack() {
    const btnOld = document.getElementById('secret-page-back');
    const btnNew = btnOld.cloneNode(true);
    btnOld.parentNode.replaceChild(btnNew, btnOld);
    btnNew.addEventListener('click', _close);
  }

  /* ─── Close — return to whichever profile was active ─── */
  function _close() {
    AudioEngine.stop();

    const saved     = sessionStorage.getItem('sv_active_profile');
    const profile   = saved ? JSON.parse(saved) : null;
    const profileId = profile ? profile.id : 'neil';

    ScreenManager.transitionTo('screen-homepage', {
      onComplete: () => ProfileRouter.load(profileId),
    });
  }

  return { init };

})();
