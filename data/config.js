/* ═══════════════════════════════════════════════════════════
   data/config.js — SINGLE SOURCE OF TRUTH
   ─────────────────────────────────────────────────────────
   This is the ONLY file you edit for personal content.
   ─────────────────────────────────────────────────────────
   SECTIONS:
   1. App identity
   2. Loading (Mission 1 — unchanged)
   3. Secret question (Mission 1 — YOUR REAL VALUES PRESERVED)
   4. Profiles / Who's Watching (Mission 1 — unchanged)
   5. Profile homepages — hero + content rows + music (Mission 2)
   6. Our Story timeline (Mission 2)
   7. Secret Easter Egg page (Mission 2)
═══════════════════════════════════════════════════════════ */

const STREAMVAULT_CONFIG = {

  /* ─── App Identity ────────────────────────────────────── */
  appName: 'F',   /* The identity mark. No brand name. */

  /* ════════════════════════════════════════════════════════
     MISSION 1 — DO NOT CHANGE THESE
  ════════════════════════════════════════════════════════ */

  /* ─── Loading Screen ──────────────────────────────────── */
  loading: {
    displayDuration: 3200,
    exitDelay: 400,
  },

  /* ─── Secret Question ─────────────────────────────────── */
  secret: {
    question: 'what is the name of the song that was playing on our first date ever all those years back?',
    answer:   'sunflower',
    hint:     'think back to that day at vox cinema',
    maxAttempts: 4,
    errorMessages: [
      'hmm, thats not it. try again princess.',
      'you know this one pumpkin',
      'one more try sweetie…',
    ],
    lockoutMessage: 'take a moment, breathe in 3s (see what i did there hahaha) and think. The answer is close to your heart.',
  },

  /* ─── Profiles — Who's Watching ──────────────────────── */
  profiles: [
    {
      id:    'neil',
      name:  'peanut',
      image: 'images/profiles/peanut.png',
      color: '#C8102E',
    },
    {
      id:    'fleur',
      name:  'pumpkin',
      image: 'images/profiles/pumpkin.png',
      color: '#D4AF37',
    },
    {
      id:    'us',
      name:  'us',
      image: 'images/profiles/us.png',
      color: '#9999AA',
    },
  ],

  /* ════════════════════════════════════════════════════════
     MISSION 2 — ADD YOUR PERSONAL CONTENT IN THESE SECTIONS
  ════════════════════════════════════════════════════════ */

  /* ─── Profile Homepages ───────────────────────────────── */
  /*
   * One entry per profile id (neil / fleur / us).
   * hero.slides: array of images or videos for the rotating banner.
   * row.cards:   array of media cards in the scrollable row.
   * music:       array of songs that loop continuously.
   *
   * HOW TO ADD REAL CONTENT:
   *   - Drop images into images/backgrounds/ and update src below
   *   - Drop mp3s into audio/neil/ (or /fleur/ /us/) and update src below
   *   - Drop card images into images/content/neil/ etc.
   */
  homepages: {

    /* ── Neil / Peanut ────────────────────────────────── */
    neil: {
      hero: {
        slides: [
          {
            type:  'image',
            src:   'images/backgrounds/neil-hero-1.jpg',
            title: 'peanut',
          },
          {
            type:  'image',
            src:   'images/backgrounds/neil-hero-2.JPG',
            title: 'peanut',
          },
          {
            type:  'image',
            src:   'images/backgrounds/neil-hero-3.jpg',
            title: 'peanut',
          },
          {
            type:  'image',
            src:   'images/backgrounds/neil-hero-4.jpg',
            title: 'peanut',
          },
          
        ],
        name:        'peanut',
        birthday:    'February 17th, 2004',
        details: [
          { label: 'coffee order', value: 'a cold pint of Guinness' },
        ],
        facts:       ['The most handsome, the most loving, the most caring, the most understanding, the most supportive, the most amazing boyfriend in the world. The man that started it all. After seeing the most beautiful girl he had ever laid his eyes on, he knew he had to ask her out or he would loose this opportunity for ever. What did he do? His impulsive self took over, and with absolutely no planning ahead, he tapped his shoe on her waist and sparked a conversation. From that day onwards, he became her dumbass.'],
      },
      row: {
        title: 'moments',
        cards: [
          {
            id:      'neil-1',
            type:    'image',
            src:     'images/content/neil/photo1.jpg',
            thumb:   'images/content/neil/photo1.jpg',
            caption: '',
          },
          {
            id:      'neil-1',
            type:    'image',
            src:     'images/content/neil/photo2.jpg',
            thumb:   'images/content/neil/photo2.jpg',
            caption: '',
          },
          {
            id:      'neil-1',
            type:    'image',
            src:     'images/content/neil/photo3.jpg',
            thumb:   'images/content/neil/photo3.jpg',
            caption: '',
          },
          {
            id:      'neil-1',
            type:    'image',
            src:     'images/content/neil/photo4.jpg',
            thumb:   'images/content/neil/photo4.jpg',
            caption: '',
          },
          {
            id:      'neil-1',
            type:    'image',
            src:     'images/content/neil/photo5.jpg',
            thumb:   'images/content/neil/photo5.jpg',
            caption: '',
          },
          {
            id:      'neil-1',
            type:    'image',
            src:     'images/content/neil/photo6.jpg',
            thumb:   'images/content/neil/photo6.jpg',
            caption: '',
          },
          {
            id:      'neil-1',
            type:    'image',
            src:     'images/content/neil/photo7.jpg',
            thumb:   'images/content/neil/photo7.jpg',
            caption: '',
          },
          {
            id:      'neil-1',
            type:    'image',
            src:     'images/content/neil/photo8.jpg',
            thumb:   'images/content/neil/photo8.jpg',
            caption: '',
          },
          {
            id:      'neil-1',
            type:    'image',
            src:     'images/content/neil/photo9.jpg',
            thumb:   'images/content/neil/photo9.jpg',
            caption: '',
          },
          {
            id:      'neil-1',
            type:    'image',
            src:     'images/content/neil/photo10.jpg',
            thumb:   'images/content/neil/photo10.jpg',
            caption: '',
          },
        ],
      },
      music: [
        { title: 'Raindance (feat. Tems) - Dave', src: 'audio/neil/00 - Dave - Raindance.mp3' },
        { title: 'STAY HERE 4 LIFE (feat. Brent Faiyaz) - A$AP Rocky', src: 'audio/neil/00 - A$AP Rocky - STAY HERE 4 LIFE (feat. Brent Faiyaz).mp3' },
      ],
    },

    /* ── Fleur / Pumpkin ──────────────────────────────── */
    fleur: {
      hero: {
        slides: [
          {
            type:  'image',
            src:   'images/backgrounds/fleur-hero-1.jpg',
            title: 'pumpkin',
          },
          {
            type:  'image',
            src:   'images/backgrounds/fleur-hero-2.jpg',
            title: 'pumpkin',
          },
          {
            type:  'image',
            src:   'images/backgrounds/fleur-hero-3.jpg',
            title: 'pumpkin',
          },
          {
            type:  'image',
            src:   'images/backgrounds/fleur-hero-4.jpg',
            title: 'pumpkin',
          },
          {
            type:  'image',
            src:   'images/backgrounds/fleur-hero-5.jpg',
            title: 'pumpkin',
          },
        ],
        name:        'pumpkin',
        birthday:    'June 28th, 2004',
        details: [
          { label: 'coffee order', value: 'During summers: large vanilla iced coffee. During winters: large coffee with 2 creams and 3 sugars. ps. loves Tim Hortons, goes there every single morning.' },
          { label: 'favourite flowers', value: 'Tulips [currently]' },
          { label: 'favourite movie genre', value: 'Musicals, my girl loves her musicals. Any one you can think of, she probably knows every song on it.' },
          { label: 'special ability', value: 'Once told me she knew Ariana Grande\'s entire discography, I challenged her on it. THIS GIRL KNEW EVERY SINGLE SONG TITLE FROM PLAYING THE SONG FOR LIKE 2 SECONDS. THE ENTIRE DISCOGRAPHY! ' },
        ],
        facts:       ['The most stunning girl in the world. She has the most beautiful smile. She makes my heart jump everytime I see her. The person that showed me what butterflies felt like. The most curvaceous body with the softest skin. She makes me feel better every single day. She makes me want to life and explore life. Someone that will always listen to me and lend a shoulder to lay my head on. It is a blessing to have her in my life. I love you princess.'],
      },
      row: {
        title: 'my princess',
        cards: [
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo1.jpg',
            thumb:   'images/content/fleur/photo1.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo2.jpg',
            thumb:   'images/content/fleur/photo2.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo3.jpg',
            thumb:   'images/content/fleur/photo3.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo4.jpg',
            thumb:   'images/content/fleur/photo4.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo5.jpg',
            thumb:   'images/content/fleur/photo5.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo6.jpg',
            thumb:   'images/content/fleur/photo6.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo7.jpg',
            thumb:   'images/content/fleur/photo7.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo8.jpg',
            thumb:   'images/content/fleur/photo8.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo9.jpg',
            thumb:   'images/content/fleur/photo9.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo10.jpg',
            thumb:   'images/content/fleur/photo10.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo11.jpg',
            thumb:   'images/content/fleur/photo11.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo12.jpg',
            thumb:   'images/content/fleur/photo12.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo13.jpg',
            thumb:   'images/content/fleur/photo13.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo14.jpg',
            thumb:   'images/content/fleur/photo14.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo15.jpg',
            thumb:   'images/content/fleur/photo15.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo16.jpg',
            thumb:   'images/content/fleur/photo16.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo17.jpg',
            thumb:   'images/content/fleur/photo17.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo18.jpg',
            thumb:   'images/content/fleur/photo18.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo19.jpg',
            thumb:   'images/content/fleur/photo19.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo20.jpg',
            thumb:   'images/content/fleur/photo20.jpg',
            caption: '',
          },
          {
            id:      'fleur-1',
            type:    'image',
            src:     'images/content/fleur/photo21.jpg',
            thumb:   'images/content/fleur/photo21.jpg',
            caption: '',
          },
          {
           id:      'fleur-video-1',
           type:    'video',
           src:     'videos/fleur/video1.mp4',
           thumb:   '',           // ← empty string = use first frame
           caption: '',
          },
          {
           id:      'fleur-video-1',
           type:    'video',
           src:     'videos/fleur/video2.mp4',
           thumb:   '',           // ← empty string = use first frame
           caption: '',
          },
        ],
      },
      music: [
          { title: 'You Rock My World - Michael Jackson', src: 'audio/fleur/00 - Michael Jackson - You Rock My World.mp3' },
          { title: 'Candy - Mk.gee', src: 'audio/fleur/00 - Mk.gee - Candy.mp3' },
          { title: 'Essence (feat. Tems) - Wizkid', src: 'audio/fleur/00 - Wizkid - Essence (feat. Tems).mp3' },
          { title: 'Daughters - John Mayer', src: 'audio/fleur/00 - John Mayer - Daughters.mp3' },
          { title: 'Cowboy Nudes - Geese', src: 'audio/fleur/00 - Geese - Cowboy Nudes.mp3' },
          { title: 'But It\'s Better If You Do - Panic! At The Disco', src: 'audio/fleur/00 - Panic! At The Disco - But It\'s Better If You Do.mp3' },
          { title: 'You Make Loving Fun - Fleetwood Mac', src: 'audio/fleur/00 - Fleetwood Mac - You Make Loving Fun.mp3' },
          { title: 'Lying Is the Most Fun a Girl Can Have Without Taking Her Clothes Off - Panic! At The Disco', src: 'audio/fleur/00 - Panic! At The Disco - Lying Is the Most Fun a Girl Can Have Without Taking Her Clothes Off.mp3' },
          { title: 'My Hero - Foo Fighters', src: 'audio/fleur/00 - Foo Fighters - My Hero.mp3' },
          { title: 'While My Guitar Gently Weeps - The Jeff Healey Band', src: 'audio/fleur/00 - The Jeff Healey Band - While My Guitar Gently Weeps.mp3' },
          { title: 'Sex - The 1975', src: 'audio/fleur/00 - The 1975 - Sex.mp3' },
          { title: 'alley-oop - Dijon', src: 'audio/fleur/00 - Dijon - alley-oop.mp3' },
          { title: 'Tears Dry On Their Own', src: 'audio/fleur/00 - Amy Winehouse - Tears Dry On Their Own.mp3' },
          { title: 'You Got Me - The Roots', src: 'audio/fleur/00 - The Roots - You Got Me.mp3' },
      ],
    },

    /* ── Us ───────────────────────────────────────────── */
    us: {
      hero: {
        slides: [
          {
            type:  'image',
            src:   'images/backgrounds/us-hero-1.jpg',
            title: 'us',
          },
          {
            type:  'image',
            src:   'images/backgrounds/us-hero-2.jpg',
            title: 'us',
          },
          {
            type:  'image',
            src:   'images/backgrounds/us-hero-3.jpg',
            title: 'us',
          },
          {
            type:  'image',
            src:   'images/backgrounds/us-hero-4.jpg',
            title: 'us',
          },
          {
            type:  'image',
            src:   'images/backgrounds/us-hero-5.jpg',
            title: 'us',
          },
          {
            type:  'image',
            src:   'images/backgrounds/us-hero-6.jpg',
            title: 'us',
          },
        ],
        name:        'us',
        birthday:    'July 28th, 2025',
        flowers:     'Sunflowers',
        details: [],
        facts:       [],
      },
      row: {
        title: 'our moments',
        cards: [
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo1.jpg',
            thumb:   'images/content/us/photo1.jpg',
            caption: '',
          },
          {
           id:      'us-video-1',
           type:    'video',
           src:     'videos/us/video1.mp4',
           thumb:   '',           // ← empty string = use first frame
           caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo2.jpg',
            thumb:   'images/content/us/photo2.jpg',
            caption: '',
          },
          {
           id:      'us-video-1',
           type:    'video',
           src:     'videos/us/video2.mp4',
           thumb:   '',           // ← empty string = use first frame
           caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo3.jpg',
            thumb:   'images/content/us/photo3.jpg',
            caption: '',
          },
          {
           id:      'us-video-1',
           type:    'video',
           src:     'videos/us/video3.mp4',
           thumb:   '',           // ← empty string = use first frame
           caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo4.jpg',
            thumb:   'images/content/us/photo4.jpg',
            caption: '',
          },
          {
           id:      'us-video-1',
           type:    'video',
           src:     'videos/us/video4.mp4',
           thumb:   '',           // ← empty string = use first frame
           caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo5.jpg',
            thumb:   'images/content/us/photo5.jpg',
            caption: '',
          },
          {
           id:      'us-video-1',
           type:    'video',
           src:     'videos/us/video5.mp4',
           thumb:   '',           // ← empty string = use first frame
           caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo6.jpg',
            thumb:   'images/content/us/photo6.jpg',
            caption: '',
          },
          {
           id:      'us-video-1',
           type:    'video',
           src:     'videos/us/video6.mp4',
           thumb:   '',           // ← empty string = use first frame
           caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo7.jpg',
            thumb:   'images/content/us/photo7.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo8.jpg',
            thumb:   'images/content/us/photo8.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo9.jpg',
            thumb:   'images/content/us/photo9.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo10.jpg',
            thumb:   'images/content/us/photo10.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo11.jpg',
            thumb:   'images/content/us/photo11.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo12.jpg',
            thumb:   'images/content/us/photo12.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo13.jpg',
            thumb:   'images/content/us/photo13.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo14.jpg',
            thumb:   'images/content/us/photo14.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo15.jpg',
            thumb:   'images/content/us/photo15.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo16.jpg',
            thumb:   'images/content/us/photo16.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo17.jpg',
            thumb:   'images/content/us/photo17.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo18.jpg',
            thumb:   'images/content/us/photo18.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo19.jpg',
            thumb:   'images/content/us/photo19.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo20.jpg',
            thumb:   'images/content/us/photo20.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo21.jpg',
            thumb:   'images/content/us/photo21.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo22.jpg',
            thumb:   'images/content/us/photo22.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo23.jpg',
            thumb:   'images/content/us/photo23.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo24.jpg',
            thumb:   'images/content/us/photo24.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo25.jpg',
            thumb:   'images/content/us/photo25.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo26.jpg',
            thumb:   'images/content/us/photo26.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo27.jpg',
            thumb:   'images/content/us/photo27.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo28.jpg',
            thumb:   'images/content/us/photo28.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo29.jpg',
            thumb:   'images/content/us/photo29.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo30.jpg',
            thumb:   'images/content/us/photo30.jpg',
            caption: '',
          },
          {
           id:      'us-video-1',
           type:    'video',
           src:     'videos/us/video7.mp4',
           thumb:   '',           // ← empty string = use first frame
           caption: '',
          },
          {
           id:      'us-video-1',
           type:    'video',
           src:     'videos/us/video8.mp4',
           thumb:   '',           // ← empty string = use first frame
           caption: '',
          },
          {
           id:      'us-video-1',
           type:    'video',
           src:     'videos/us/video9.mp4',
           thumb:   '',           // ← empty string = use first frame
           caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo31.jpg',
            thumb:   'images/content/us/photo31.jpg',
            caption: '',
          },
          {
            id:      'us-1',
            type:    'image',
            src:     'images/content/us/photo32.jpg',
            thumb:   'images/content/us/photo32.jpg',
            caption: '',
          },
        ],
      },
      music: [
          { title: 'Sunflower (Spider-Man: Into the Spider-Verse) - Post Malone', src: 'audio/us/00 - Post Malone - Sunflower (Spider-Man_ Into the Spider-Verse).mp3' },
          { title: 'Somethin\' Stupid - Frank Sinatra', src: 'audio/us/00 - Frank Sinatra - Somethin\' Stupid.mp3' },
          { title: 'When a Man Loves a Woman - Percy Sledge', src: 'audio/us/00 - Percy Sledge - When a Man Loves a Woman.mp3' },
          { title: 'I Got You Babe - Sonny & Cher', src: 'audio/us/00 - Sonny- I Got You Babe.mp3' },
          { title: 'I Can\'t Help Myself - Four Tops', src: 'audio/us/00 - Four Tops - I Can\'t Help Myself (Sugar Pie, Honey Bunch).mp3' },
          { title: 'Wonderful Tonight - Eric Clapton', src: 'audio/us/00 - Eric Clapton - Wonderful Tonight.mp3' },
          { title: 'Nothing Can Change This Love - Sam Cooke', src: 'audio/us/00 - Sam Cooke - Nothing Can Change This Love.mp3' },
          { title: 'At Last - Etta James', src: 'audio/us/00 - Etta James - At Last.mp3' },
      ],
      hasStory: true,   /* Shows the "Our Story" nav button */
    },

  }, /* end homepages */

  /* ─── Our Story Timeline (Us profile only) ────────────── */
  story: {
    music: [
          { title: 'I\'m In Love With You - The 1975', src: 'audio/story/00 - The 1975 - I\'m In Love With You.mp3' },
          { title: 'other side - Brent Faiyaz', src: 'audio/story/00 - Brent Faiyaz - other side.mp3' },
          { title: 'About You - The 1975', src: 'audio/story/00 - The 1975 - About You.mp3' },
          { title: 'I Like Me Better - Lauv', src: 'audio/story/00 - Lauv - I Like Me Better.mp3' },
          { title: 'Baby I\'m Yours - Arctic Monkeys', src: 'audio/story/00 - Arctic Monkeys - Baby I\'m Yours.mp3' },
          { title: 'Call It What You Want - Taylor Swift', src: 'audio/story/00 - Taylor Swift - Call It What You Want.mp3' },
          { title: 'Easy - Commodores', src: 'audio/story/00 - Commodores - Easy.mp3' },
    ],
    entries: [
      {
        year:        '2018',
        date:        'The day we met',
        description: 'The day when you said yes to meeting me and then proceeded to invite me to church for St. Xaviers feast. I was so excited that in order to impress you, I wore a suit. Then I proceeded to get so nervous on the bus ride that I never noticed that I took an entirely wrong bus, reached so late that the mass was ending, stood smack middle of the entire alter like an absolute idiot, looking around for you, and then just walked away to the side and sat there. And after making an absolute fool of myself, you still came and met me. Mind you, it was for 20 minutes, but it was the best 20 minutes of my life. It\'s the day it all started.',
        media: { type: 'image', src: 'images/story/first-meet.jpg' },
      },
      {
        year:        '2018',
        date:        '\"BALCONY."',
        description: 'well... self explanatory. The hours of calls we would have. Talking about anything and everything, singing, laughing, and just getting to know each other. Out of all those moments, this one mispronunciation stood out and proceeded to become the most memorable joke. BAALCONY. Thank you for looking out and correcting my grammer and pronounciation ever since.',
        media: { type: 'image', src: 'images/story/balcony.jpg' },
      },
      {
        year:        '2018',
        date:        'Our first date',
        description: 'The day finally came by. I remember being so nervous the entire day. I left from school, hopped on the metro and came straight to Deira City Centre. We had a screening of Spider-man: Into the Spider-Verse. It might seem so trivial now but back then, I got to finally hold your hand. That was the first time I felt what butterflies felt like. It was the most overwhelming feeling ever, and I was there tryna act all nonchalant and cool. That day led to the song \"Sunflower\" being our song. That was the day we shared our first kiss.',
        media: { type: 'image', src: 'images/story/first-date.png' },
      },
      {
        year:        '2019',
        date:        'We were dating!',
        description: 'I couldn\'t beleive it. I was dating the most gorgeous girl I had ever laid my eyes on. I remember being so nervous to tell my mom about you. This was going to be the first time I ever told my mom I was seeing someone and well, she was so happy for us. Soon, I introduced you to everyone and they all loved you. Those days we would either text all day or talk on the landline for hours, and we would only get the opportunity to meet in person every week during catechism class.',
        media: { type: 'image', src: 'images/story/14dating.jpg' },
      },
      {
        year:        '2022',
        date:        'We always kept in touch',
        description: 'Well, as circumstances would have it, we had to part ways for a while. I was leaving for India to study there, and you were preparing to go to Canada for your studies. We always kept in touch, and we always checked in every few months to see how the other was doing. Sometimes text, sometimes video calls, but anything to make sure we never lost that touch. We made a pact to get married together if neither one of us were married by 30. Whenever I was back in the Dubai, we\' make an effort to meet. This was one of those days. After a long, LONG hibernation because of covid, we finally got to meet again. I came over, we watched the minions, played on the swings for a bit, went to the gym for some reason, went the park and stared at the sky, skateboarded and ran around.',
        media: { type: 'image', src: 'images/story/kept-touch.jpg' },
      },
      {
        year:        '2022',
        date:        'First ever Valentine\'s date',
        description: 'Our first ever Valentine\'s date. My first ever Valentines. I wanted to plan something special for you. I got you a rose and your mom slyly took it so your dad wouldn\'t notice.We went to the beach, watched the sunset. Then we headed to Mercato Mall. Why? because it looked like Italy and we could imagine we were walking around in Italy. We went to Mcdonalds for dinner at the food court, and we cooked up some abomination of a coke float. It was such a simple date, but this day held a lot of meaning for me. After your parents picked us up, took us on a drive. I remember not being able to find the seatbelt while sitting behind and searching everywhere. After, your mom gave me an envelope that had a card. You drew a picture of us on it. I\'ve carried that card with me ever since.',
        media: { type: 'image', src: 'images/story/first-valentines.jpg' },
      },
      {
        year:        '2025',
        date:        'The day I finally visited Canada',
        description: 'You went on to study in Canada and absolutely fell in love with the country. You invited me over and over to come visit and I always promised I\'d try my best to come one day. That day had finally come by. I graduated and was planning to move back to Dubai and by sheer coincidence, my parents mentioned that they were planning a vacation to Canada. I was so excited, FINALLY!. I texted you saying I was finally going to visit Canada. You could\'nt believe it. After all I don\'t blame you, I told you I\'d visit a hundred times and never followed through. I landed in Canada and I was so excited to meet you that I completely forgot to ask you where you stayed in the first place. OUT OF ALL THE PROVINCES YOU COULD\'VE STAYED IN AND I COULD\'VE COME TO VISIT, OUT OF ALL THE HOTELS MY DAD COULD\'VE BOOKED, by a stroke of luck, I ended up staying a literal 10 minute walk from you. I reached my hotel and within 30 minutes, I was at your place.',
        media: { type: 'image', src: 'images/story/first-canada.jpg' },
      },
      {
        year:        '2025',
        date:        'Came to Canada as friends, flew back as a couple',
        description: '1 week I planned to stay in Canada. In that one week we spent so much time together, that we fell for each other. I had fallen in love with the city. I knew it, I had to stay for a bit longer. After begging my parents to allow me to stay back, I convinced them to move my flight for a week. A week sounds so less, but that week meant everything for us. We went on a date everyday, went to resturants, tried new cusines, I met your friends and we fell so deeply for each other that we were motivated to try long distance. These 2 weeks showed us how compatible and comfortable we were with each other that we decided to say fuck it, let\'s try. We stepped out of our comfort and decided to give long distance a shot. The rest is history. This picture was taken on the GO train while heading to the airport. We were determined to try, to put in effort, to be a couple. Tears rolling down, hugs and kisses, we held each other. I walked to the check-in line and the airport saff saw you weeping so much that they let you though till check in. We hugged each other one last time, shared a kiss, unsure when we would see each other again. I was no nervous that I walked the wrong way thrice which led to a bunch of smiles and laughter but inside we knew, we loved each other and we would do anything to remain together.',
        media: { type: 'image', src: 'images/story/left-couple.jpg' },
      },
      {
        year:        '2025',
        date:        'YOU CAME TO DUBAI!!!',
        description: 'We did long distance, we spoke for hours and hours every single day. We got to know each other so much better. We shared a deeper love with each other. After 2 long years of not visiting Dubai, you finally came!!!. I was so excited that I went to apply and planned to get my drivers license just before you came since I wanted to be the one that picked you from the airport. You landed, and saw me across the parking lot. I\'ll never forget you running towards me and jumping into my arms. WE WERE REUNITED. FINALLY!!!. We were inseperable. I EVEN STAYED AT YOUR HOUSE FOR A WEEK STRAIGHT. I got to know your parents better and I got to meet all your friends. We spent christmas together, new years together, made kuswar together, watched movies, and drank so much hahahah. We spent as much time as we possibly could.',
        media: { type: 'image', src: 'images/story/21dating.jpg' },
      },
      {
        year:        '2026',
        date:        'I visited Canada and stayed for 2 WHOLE MONTHS',
        description: 'I couldn\'t stay away from you for long. This is something I realised when I left Canada back in July 2025. From that day onwards, I got to work. I worked part-time in events so scrape and save as much money as I could to fund a solo trip to Canada to visit you. I didn\'t know when, but I knew I had to, I needed to. In between you came to Dubai for a few weeks. Thats when it dawned on me, I could spend my birthday, valentines day and our 7th monthie together. So I planned it, I saved as much money as I could and got the go ahead from my parents. I was so excited that I couldn\'t sleep. I was counting down the days till I finally got to see you. February 6th I landed in Toronto. WE SPENT 2 WHOLE MONTHS TOGEHTER. I initially planned to stay for 3 weeks. I could\'nt leave. I kept extending and extending my dates until we had spent 2 months together. These 2 months were the best, and when I say this, I mean the best times of my life. We went on so many dates, tried so many cusines, movie nights, went out to your local bars, went for TeleTech together, got tattoos together and I met your friends. As much as I loved those memories, I adored just being with you. Doing the simple things, dropping you off and picking you up from university, doing chores together, cooking breakfast, lunch and dinner, doing laundry together and grocerry shopping. We did all those with a smile on our faces because we were doing it with each other. Stopping by Tims and the Grange, walking around Queen St and going to Metro and No Frills to shop for grocerries. All those moments I hold very dearly to me.',
        media: { type: 'image', src: 'images/story/2M-canada.jpg' },
      },
    ],
    closing: 'to infinity, and many more years of memories.',
  },

  /* ─── Secret Easter Egg Page ──────────────────────────── */
  secretPage: {
    /* Loops continuously. Add more songs and they play in order. */
    music: [
            { title: 'Careless Whisper - George Michael', src: 'audio/secret/00 - George Michael - Careless Whisper.mp3' },
          ],
    cards: [
      {
            id:      'secret-1',
            type:    'image',
            src:     'images/secret/photo1.jpg',
            thumb:   'images/secret/photo1.jpg',
            caption: '',
          },
          {
            id:      'secret-1',
            type:    'image',
            src:     'images/secret/photo2.jpg',
            thumb:   'images/secret/photo2.jpg',
            caption: '',
          },
          {
            id:      'secret-1',
            type:    'image',
            src:     'images/secret/photo3.jpg',
            thumb:   'images/secret/photo3.jpg',
            caption: '',
          },
          {
            id:      'secret-1',
            type:    'image',
            src:     'images/secret/photo4.jpg',
            thumb:   'images/secret/photo4.jpg',
            caption: '',
          },
          {
           id:      'secret-1',
           type:    'video',
           src:     'videos/secret/video1.mp4',
           thumb:   '',           // ← empty string = use first frame
           caption: '',
          },

    ],
  },

}; /* end STREAMVAULT_CONFIG */
