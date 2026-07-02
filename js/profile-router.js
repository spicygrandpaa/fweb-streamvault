/* ═══════════════════════════════════════════════════════════
   js/profile-router.js — Profile Homepage Renderer
   ─────────────────────────────────────────────────────────
   Reads STREAMVAULT_CONFIG.homepages[profileId] and builds
   the full homepage DOM. Also manages:
   - Hero slide rotation (6 second interval)
   - Content row card rendering
   - Our Story button (Us profile only)
   - Back button → profile selection
   - 5-click F easter egg → secret page
═══════════════════════════════════════════════════════════ */

const ProfileRouter = (() => {

  /* ─── State ─────────────────────────────────────────── */
  let activeProfileId = null;
  let heroSlideIndex  = 0;
  let heroInterval    = null;
  let fClickCount     = 0;
  let fClickTimer     = null;

  const F_CLICK_THRESHOLD = 5;
  const F_CLICK_WINDOW    = 3000; /* ms to complete 5 clicks */

  /* ─── Public: load a profile homepage ───────────────── */
  function load(profileId) {
    activeProfileId = profileId;
    fClickCount     = 0;

    const data = STREAMVAULT_CONFIG.homepages[profileId];
    if (!data) {
      console.warn('ProfileRouter: no homepage config for "' + profileId + '"');
      return;
    }

    _stopHeroRotation();
    _buildHero(data.hero);
    _buildRow(data.row);
    _buildNav(data);
    _startHeroRotation(data.hero.slides);
    _startMusic(data.music);
  }

  /* ─── Build hero ─────────────────────────────────────── */
  function _buildHero(hero) {
    const slidesEl  = document.getElementById('hp-hero-slides');
    const contentEl = document.getElementById('hp-hero-content');
    const dotsEl    = document.getElementById('hp-hero-dots');

    /* Slides */
    slidesEl.innerHTML = '';
    (hero.slides || []).forEach((slide, i) => {
      const div = document.createElement('div');
      div.className   = 'hp-hero__slide' + (i === 0 ? ' is-active' : '');
      div.dataset.index = i;

      if (slide.type === 'video') {
        const vid = document.createElement('video');
        vid.src         = slide.src;
        vid.autoplay    = true;
        vid.muted       = true;
        vid.loop        = true;
        vid.playsInline = true;
        vid.className   = 'hp-hero__slide-media';
        div.appendChild(vid);
      } else {
        const img = document.createElement('img');
        img.src       = slide.src;
        img.alt       = slide.title || '';
        img.className = 'hp-hero__slide-media';
        img.draggable = false;
        img.addEventListener('contextmenu', e => e.preventDefault());
        div.appendChild(img);
      }

      slidesEl.appendChild(div);
    });

    /* Slide dots */
    dotsEl.innerHTML = '';
    if (hero.slides && hero.slides.length > 1) {
      hero.slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'hp-hero__dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', () =>
          _goToSlide(i, hero.slides)
        );
        dotsEl.appendChild(dot);
      });
    }
    heroSlideIndex = 0;

/* Hero text
       All meta rows go into a single .hp-hero__metas grid container so
       labels and values align in two clean columns — no wrapping under labels. */
    const metaRows = [];
    if (hero.birthday) metaRows.push({ label: 'Birthday',          value: hero.birthday });
    if (hero.artist)   metaRows.push({ label: 'Favourite Artist',  value: hero.artist });
    if (hero.flowers)  metaRows.push({ label: 'Favourite Flowers', value: hero.flowers });
    if (hero.details && hero.details.length) {
      hero.details
        .filter(d => d.label && d.value)
        .forEach(d => metaRows.push(d));
    }

    const metasHTML = metaRows.length
      ? '<div class="hp-hero__metas">' +
        metaRows.map(row =>
          '<p class="hp-hero__meta">' +
            '<span class="hp-hero__meta-label">' + row.label + '</span>' +
            '<span class="hp-hero__meta-value">'  + row.value + '</span>' +
          '</p>'
        ).join('') +
        '</div>'
      : '';

    const factsHTML = (hero.facts && hero.facts.length)
      ? '<ul class="hp-hero__facts">' +
        hero.facts.map(f => '<li>' + f + '</li>').join('') +
        '</ul>'
      : '';

    contentEl.innerHTML =
      '<h1 class="hp-hero__name">' + (hero.name || '') + '</h1>' +
      metasHTML + factsHTML;
  }

  /* ─── Hero slide rotation ────────────────────────────── */
  function _startHeroRotation(slides) {
    if (!slides || slides.length <= 1) return;
    heroInterval = setInterval(() => {
      const next = (heroSlideIndex + 1) % slides.length;
      _goToSlide(next, slides);
    }, 6000);
  }

  function _stopHeroRotation() {
    if (heroInterval) clearInterval(heroInterval);
    heroInterval   = null;
    heroSlideIndex = 0;
  }

  function _goToSlide(index, slides) {
    heroSlideIndex = index;
    document.querySelectorAll('.hp-hero__slide')
      .forEach((s, i) => s.classList.toggle('is-active', i === index));
    document.querySelectorAll('.hp-hero__dot')
      .forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  /* ─── Build content row ──────────────────────────────── */
  function _buildRow(row) {
    if (!row) return;
    const titleEl = document.getElementById('hp-row-title');
    const rowEl   = document.getElementById('hp-row');

    titleEl.textContent = row.title || '';
    rowEl.innerHTML     = '';

    const cards = row.cards || [];

    if (cards.length === 0) {
      /* No cards yet — show a placeholder message */
      rowEl.innerHTML = '<p class="hp-row__empty">content coming soon ♥</p>';
      return;
    }

    cards.forEach((card, i) => {
      const item = document.createElement('div');
      item.className = 'hp-card';
      item.setAttribute('role', 'listitem');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', card.caption || ('Card ' + (i + 1)));

      const thumb = document.createElement('div');
      thumb.className = 'hp-card__thumb';

      if (card.type === 'video' && !card.thumb) {
        /* No separate thumbnail image — use the video's first frame.
           preload="metadata" fetches just enough to show frame 0
           without downloading the whole file. */
        const vid = document.createElement('video');
        vid.src      = card.src;
        vid.preload  = 'metadata';
        vid.muted    = true;
        vid.className = 'hp-card__thumb-media';
        vid.addEventListener('contextmenu', e => e.preventDefault());
        /* Some browsers need a tiny time offset to render the first frame */
        vid.addEventListener('loadedmetadata', () => {
          vid.currentTime = 0.001;
        });
        thumb.appendChild(vid);
      } else {
        /* Use the provided thumbnail image (or fall back to the image src) */
        const img = document.createElement('img');
        img.src       = card.thumb || card.src;
        img.alt       = card.caption || '';
        img.loading   = 'lazy';
        img.draggable = false;
        img.className = 'hp-card__thumb-media';
        img.addEventListener('contextmenu', e => e.preventDefault());
        thumb.appendChild(img);
      }

      if (card.type === 'video') {
        const badge = document.createElement('div');
        badge.className   = 'hp-card__badge';
        badge.textContent = '▶';
        badge.setAttribute('aria-hidden', 'true');
        thumb.appendChild(badge);
      }

      const cap = document.createElement('p');
      cap.className   = 'hp-card__caption';
      cap.textContent = card.caption || '';

      item.appendChild(thumb);
      item.appendChild(cap);
      rowEl.appendChild(item);

      item.addEventListener('click', () => MediaPlayer.open(cards, i));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          MediaPlayer.open(cards, i);
        }
      });
    });
  }

  /* ─── Build nav bar ──────────────────────────────────── */
  function _buildNav(data) {
    /* F logo easter egg — replace to strip old listeners */
    const fOld = document.getElementById('hp-nav-f');
    const fNew = fOld.cloneNode(true);
    fOld.parentNode.replaceChild(fNew, fOld);
    fNew.addEventListener('click', _handleFClick);

    /* Back button */
    const backOld = document.getElementById('hp-nav-back');
    const backNew = backOld.cloneNode(true);
    backOld.parentNode.replaceChild(backNew, backOld);
    backNew.addEventListener('click', _goBackToProfiles);

    /* Our Story button — Us profile only */
    const storyOld = document.getElementById('hp-nav-story');
    const storyNew = storyOld.cloneNode(true);
    storyOld.parentNode.replaceChild(storyNew, storyOld);

    if (data.hasStory) {
      storyNew.style.display = 'inline-flex';
      storyNew.addEventListener('click', _openStory);
    } else {
      storyNew.style.display = 'none';
    }
  }

  /* ─── Start profile music ────────────────────────────── */
  function _startMusic(tracks) {
    AudioEngine.loadPlaylist(tracks || []);
  }

  /* ─── Back to profiles ───────────────────────────────── */
  function _goBackToProfiles() {
    _stopHeroRotation();
    AudioEngine.stop();

    /* Reset profile cards so they're ready for next selection */
    document.querySelectorAll('.profile-card').forEach(c => {
      c.style.transition = '';
      c.style.opacity    = '';
      c.style.transform  = '';
    });

    ScreenManager.transitionTo('screen-profiles', {
      onComplete: () => ProfilesScreen.init(),
    });
  }

  /* ─── Open Our Story (Us profile only) ──────────────── */
  function _openStory() {
    _stopHeroRotation();
    AudioEngine.stop();
    ScreenManager.transitionTo('screen-story', {
      onComplete: () => StoryTimeline.init(),
    });
  }

  /* ─── Easter egg: 5 rapid clicks on F ───────────────── */
  function _handleFClick() {
    fClickCount++;

    if (fClickTimer) clearTimeout(fClickTimer);
    fClickTimer = setTimeout(() => {
      fClickCount = 0;
    }, F_CLICK_WINDOW);

    /* Brief visual flash on the F */
    const fBtn = document.getElementById('hp-nav-f');
    if (fBtn) {
      fBtn.classList.add('is-clicked');
      setTimeout(() => fBtn.classList.remove('is-clicked'), 120);
    }

    if (fClickCount >= F_CLICK_THRESHOLD) {
      fClickCount = 0;
      clearTimeout(fClickTimer);
      _openSecretPage();
    }
  }

  function _openSecretPage() {
    _stopHeroRotation();
    AudioEngine.stop();
    ScreenManager.transitionTo('screen-secret-page', {
      onComplete: () => SecretPageModule.init(),
    });
  }

  /* ─── Public API ─────────────────────────────────────── */
  return { load };

})();
