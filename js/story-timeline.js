/* ═══════════════════════════════════════════════════════════
   js/story-timeline.js — Our Story Scroll Timeline
   ─────────────────────────────────────────────────────────
   Builds a vertical scroll-driven cinematic timeline from
   STREAMVAULT_CONFIG.story.
   - Entries fade in as they scroll into view
   - Background music plays throughout
   - No click interactions on entries — read only
   - Closing message at the bottom
═══════════════════════════════════════════════════════════ */

const StoryTimeline = (() => {

  let observer = null;

  /* ─── Init ───────────────────────────────────────────── */
  function init() {
    const storyData = STREAMVAULT_CONFIG.story;
    const scrollEl  = document.getElementById('story-scroll');

    /* Back button — cloneNode to strip old listeners */
    const backOld = document.getElementById('story-back');
    const backNew = backOld.cloneNode(true);
    backOld.parentNode.replaceChild(backNew, backOld);
    backNew.addEventListener('click', _close);

    _buildTimeline(storyData, scrollEl);

    /* Start story music */
    AudioEngine.loadPlaylist(storyData.music || []);

    /* Scroll to top */
    scrollEl.scrollTop = 0;

    /* Observe entries for scroll-triggered fade-in */
    _setupScrollObserver();
  }

  /* ─── Build timeline DOM ─────────────────────────────── */
  function _buildTimeline(storyData, container) {
    container.innerHTML = '';

    /* Intro F mark */
    const intro = document.createElement('div');
    intro.className = 'story-intro';
    intro.innerHTML =
      '<span class="story-intro__f">F</span>' +
      '<p class="story-intro__sub">Our Story</p>';
    container.appendChild(intro);

    const entries = storyData.entries || [];

    if (entries.length === 0) {
      /* No entries yet — placeholder */
      const empty = document.createElement('div');
      empty.className = 'story-empty';
      empty.innerHTML = '<p>your story entries will appear here ♥</p>';
      container.appendChild(empty);
    } else {
      entries.forEach((entry, i) => {
        const item = document.createElement('div');
        item.className      = 'story-entry story-entry--hidden';
        item.dataset.index  = i;
        const side          = i % 2 === 0 ? 'left' : 'right';

        item.innerHTML =
          '<div class="story-entry__inner story-entry__inner--' + side + '">' +
            '<div class="story-entry__media">' + _buildMediaHTML(entry.media) + '</div>' +
            '<div class="story-entry__text">' +
              '<span class="story-entry__year">' + (entry.year || '') + '</span>' +
              '<p class="story-entry__date">' + (entry.date || '') + '</p>' +
              '<p class="story-entry__desc">' + (entry.description || '') + '</p>' +
            '</div>' +
          '</div>';

        container.appendChild(item);
      });
    }

    /* Closing message */
    if (storyData.closing) {
      const closing = document.createElement('div');
      closing.className = 'story-closing story-entry--hidden';
      closing.innerHTML =
        '<p class="story-closing__text">' + storyData.closing + '</p>';
      container.appendChild(closing);
    }
  }

  function _buildMediaHTML(media) {
    if (!media) return '';
    if (media.type === 'video') {
      return '<video src="' + media.src + '" autoplay muted loop playsinline class="story-entry__img"></video>';
    }
    return '<img src="' + media.src + '" alt="" class="story-entry__img" loading="lazy" draggable="false" />';
  }

  /* ─── IntersectionObserver: scroll fade-in ───────────── */
  function _setupScrollObserver() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('story-entry--hidden');
          entry.target.classList.add('story-entry--visible');
        }
      });
    }, {
      root:       document.getElementById('story-scroll'),
      threshold:  0.15,
      rootMargin: '0px 0px -60px 0px',
    });

    document.querySelectorAll(
      '.story-entry--hidden, .story-closing'
    ).forEach(el => observer.observe(el));
  }

  /* ─── Close — back to Us homepage ───────────────────── */
  function _close() {
    if (observer) { observer.disconnect(); observer = null; }
    AudioEngine.stop();

    ScreenManager.transitionTo('screen-homepage', {
      onComplete: () => ProfileRouter.load('us'),
    });
  }

  return { init };

})();
