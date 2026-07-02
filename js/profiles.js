/* ═══════════════════════════════════════════════════════════
   js/profiles.js — Who's Watching Screen Controller
   Activates the profiles grid and handles profile selection.
   Profile data comes from STREAMVAULT_CONFIG.profiles.
   ─────────────────────────────────────────────────────────
   Mission 1: populateProfiles() and init() — UNCHANGED
   Mission 2: _handleSelect() now routes to screen-homepage
              via ProfileRouter.load() instead of resetting.
═══════════════════════════════════════════════════════════ */

const ProfilesScreen = (() => {

  /* ─── State ───────────────────────────────────────────── */
  let selectedProfile = null;

  /* ─── Populate Profile Cards ──────────────────────────── */
  function populateProfiles() {

  // Find every profile card on the page
  const cards = document.querySelectorAll('.profile-card');

  cards.forEach(card => {

    // Get the profile ID from the HTML
    const profileId = card.dataset.profile;

    // Find the matching profile in config.js
    const profile = STREAMVAULT_CONFIG.profiles.find(
      p => p.id === profileId
    );

    // If no matching profile exists, skip this card
    if (!profile) return;

    // Find the elements inside this profile card
    const image = card.querySelector('.profile-card__img');
    const name = card.querySelector('.profile-card__name');
    const initials = card.querySelector('.profile-card__initials');

    // Make sure the image is visible
image.style.display = '';

// Hide the fallback initials
initials.style.display = 'none';

// Update the image
image.src = profile.image;
image.alt = profile.name;

    // Update the image alt text
    image.alt = profile.name;

    // Update the displayed profile name
    name.textContent = profile.name;

    // Update the fallback initial (if image fails to load)
    initials.textContent = profile.name.charAt(0).toUpperCase();

  });

  }
  
  /* ─── Init ────────────────────────────────────────────── */
  function init() {

      // Fill profile cards from config.js
     populateProfiles();

    const cards = document.querySelectorAll('.profile-card');

    cards.forEach(card => {
      // Click to select
      card.addEventListener('click', () => _handleSelect(card));

      // Keyboard: Enter or Space to select
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          _handleSelect(card);
        }
      });
    });
  }

  /* ─── Handle Selection ────────────────────────────────── */
  /* MISSION 2 CHANGE: now routes to homepage instead of resetting */
  async function _handleSelect(card) {
    const profileId = card.dataset.profile;

    // Prevent double-selection
    if (selectedProfile === profileId) return;
    selectedProfile = profileId;

    // Visual feedback — scale the card slightly
    card.style.transition =
    'transform 700ms cubic-bezier(.22,.61,.36,1)';

    card.style.transform =
    'scale(1.35)';
    
    await Utils.sleep(120);
    card.style.transform = '';

    // Find the profile data from config
    const profile = STREAMVAULT_CONFIG.profiles.find(p => p.id === profileId);

    // Store the active profile in sessionStorage for future screens
    if (profile) {
      sessionStorage.setItem('sv_active_profile', JSON.stringify(profile));
    }

    // Fade out all other cards
    const allCards = document.querySelectorAll('.profile-card');
    allCards.forEach(c => {
      if (c !== card) {
        c.style.transition = 'opacity 400ms ease, transform 400ms ease';
        c.style.opacity    = '0.15';
        c.style.transform  = 'scale(0.92)';
      }
    });

    // Brief pause before transitioning
    await Utils.sleep(600);

    // ── Route to profile homepage (Mission 2) ──────────────
    ScreenManager.transitionTo('screen-homepage', {
      onComplete: () => {
        selectedProfile = null;
        ProfileRouter.load(profileId);
      },
    });
  }

  /* ─── Public API ──────────────────────────────────────── */
  return { init };

})();
