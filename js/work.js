/* ============================================================
   Portfolio shelf — the five books on the left of the desk
   ------------------------------------------------------------
   Two shapes of category:

   · Structured — has `projects`. Lists them down the left;
     picking one shows that project's shots. This is the other
     four books.
       assets/work/<category key>/<project slug>/01.webp
                                                02.webp …

   · Flat — has `shots` (a number) instead of `projects`. No
     project list, no subfolder: every photo is just part of the
     one pile, laid out as a loose scrapbook wall rather than a
     catalog grid. This is the Freelancer book lying under the
     shelf — "just show images, don't divide it up" was the brief.
       assets/work/<category key>/01.webp
                                 02.webp …

   Every category shares this one gallery — the four books, the
   Freelancer pile, and the camera's Photography category are all
   just entries in the same table below, opened the same way.

   >>> EDIT ME: WORK below is the whole content model.

   `folder` overrides where a flat category's shots live — only
   Photography sets it (assets/photos/ instead of the default
   assets/work/<key>/). Leave it off unless you need that.

   `shots` is just how many files to look for, so you never have
   to list them one by one — add a 7th image, change 6 to 7.
   Any file that is not there yet draws as a labelled placeholder
   telling you the exact path it wants, so the layout is
   reviewable before a single photo exists. Leave `shots` off a
   project and it shows no images at all, just its name and
   description.

   `meta` is the facts about a project — year, industry, the kind
   of deliverable — shown as a small list beside its name, to the
   left of `desc`. An array of `{ label, value }` rows, in display
   order:
     meta: [
       { label: 'Year',     value: '2023' },
       { label: 'Industry', value: 'Education' },
       { label: 'Type',     value: 'Brand identity' }
     ]
   Leave it off (or empty) and that project says its details are not
   filled in yet, the same way an unwritten `desc` does. There is no
   fixed set of labels — use whatever facts fit that project; a
   POSM project might want `Format` instead of `Industry`.

   `tools` names the software behind a project, drawn as small icons
   under `meta` — the one addition here that is not part of your
   original brief, added because a project's toolkit is exactly the
   kind of fact this rail was built to hold. An array of keys into
   the TOOL_ICONS table below:
     tools: ['figma', 'illustrator']
   Purely optional — leave it off and no tools row appears at all,
   same as `spec` in js/flow.js. Only meant for a project with two or
   three `meta` facts; see the placement comment on `.work__tools` in
   css/work.css if a project ever needs four.

   `desc` is that project's own words, shown to the right of `meta`.
   It is the one field here nobody can write for you, so an empty
   one says so on screen until you fill it in. The category-level
   `blurb` above it describes the shelf; `desc` describes the
   single project you clicked.

   `bare` on a CATEGORY holds that whole shelf empty: picking a
   project shows nothing at all — no name, no description, no
   placeholder — for work that is listed but has nothing to show
   yet. Visual Design is the one using it today. Everything on a
   bare category stays where it is (names, slugs, any `desc` you
   have written); dropping the flag brings it all back.

   Keep images WebP and roughly 1600px on the long edge: the whole
   site is under 1MB today and it would be a shame to undo that.
   ============================================================ */

/* Titles here are the words printed on the spines in the artwork, so the
   gallery header always matches the book the visitor just picked up.
   The `key` is only a folder name under assets/work/ — safe to leave alone. */
// DEMO ONLY: every Visual Design project points at this one image so the
// landing layout can be judged on all of them without shipping a dozen
// copies. Remove `file: DEMO_LANDING[n]` from a project once its real
// assets/work/visual/<slug>/01.webp exists, and delete this constant once
// none use it. The dates/roles/descriptions beside it are invented too.
const DEMO_LANDING = [1, 2, 3, 4].map(n => `assets/work/visual/_demo/landing-${n}.jpg`);

// The Percept board, reused as the starting layout for every Branding
// project (designer, 06/11: most brand projects will be built like Percept).
// `board` places each shot at its exact spot on the artwork's own
// board (image/brand/percept/*_ver03_Grid.png): [shot, x, y, w, h] in
// the artwork's points, measured inside its outer padding. The board
// is justified rows, not cells, so every product photo keeps its real
// ratio and nothing is cropped. Gaps between tiles are the artwork's
// own 24pt gutter, scaled with the board.
// A project with fewer pieces simply leaves the later tiles as labelled
// placeholders; give it its own `board` once its grid artwork exists.
const BRAND_BOARD = {
  w: 1944, h: 4662,
  tiles: [
    [1,  0,       0,       824.46,  824.46], [2,  848.46,  0,       453.45, 824.46], [3,  1325.91, 0,       618.09, 824.46],
    [4,  0,       848.46,  1043.31, 613.71], [5,  1067.31, 848.46,  876.69, 613.71],
    [6,  0,       1486.17, 631.38,  315.69], [7,  0,       1825.86, 631.38, 315.69],
    [8,  655.38,  1486.17, 543.7,   655.38], [9,  1223.08, 1486.17, 720.92, 655.38],
    [10, 0,       2165.55, 1490.28, 573.19], [11, 1514.28, 2165.55, 429.72, 573.19],
    [12, 0,       2762.73, 948,     474],    [13, 972,     2762.73, 474,    474],    [14, 1470,    2762.73, 474,    474],
    [15, 0,       3260.73, 930.09,  422.77], [16, 954.09,  3260.73, 989.91, 422.77],
    [17, 0,       3707.5,  933.66,  444.6],  [18, 957.66,  3707.5,  986.34, 444.6],
    [19, 0,       4176.1,  1944,    486]
  ]
};

const WORK = [
  {
    key: 'branding',
    title: 'Branding',
    blurb: 'Identity systems — the part that has to survive a thousand hands.',
    // Same split as Visual Design: the right pane is only the showcase, and
    // each project's dates and `desc` open under its name in the list.
    infoInList: true,
    // `frame` picks this project's grid rhythm — see the "branding frames"
    // block in css/work.css for what each one looks like and why. Every
    // other category just gets the one shared campaign rhythm; branding is
    // the one place different projects are allowed to feel different,
    // because an identity system is not a repeatable ad unit.
    projects: [
      { name: 'Percept', slug: 'percept', shots: 19, ext: 'jpg', frame: 'bento', desc: '',
        board: BRAND_BOARD },

      { name: 'FSEL', slug: 'fsel', shots: 19, ext: 'jpg', frame: 'bento', board: BRAND_BOARD,
        meta: [
          { label: 'Year',     value: '2022 – 2024' },
          { label: 'Industry', value: 'Education' },
          { label: 'Type',     value: 'Brand identity' }
        ],
        tools: ['figma', 'illustrator'],
        desc: 'An English centre that fits in a pocket — course, tutor and mock test, all inside the app. The mark had to hold at icon size first and stretch to a launch backdrop second, which is the opposite of the order these usually get drawn in.' },

      { name: 'Khoi', slug: 'khoi', shots: 19, ext: 'jpg', frame: 'bento', board: BRAND_BOARD,
        meta: [
          { label: 'Year',     value: '2023' },
          { label: 'Industry', value: 'Personal brand' },
          { label: 'Type',     value: 'Wordmark' }
        ],
        tools: ['illustrator'],
        desc: 'A personal mark for a founder who did not want to look like a company. One glyph, drawn once, used at three sizes and never redrawn — the restraint is the identity.' },

      { name: 'FSEL Japan', slug: 'fsel-japan', shots: 19, ext: 'jpg', frame: 'bento', board: BRAND_BOARD,
        meta: [
          { label: 'Year',     value: '2024' },
          { label: 'Industry', value: 'Education' },
          { label: 'Type',     value: 'Brand adaptation' }
        ],
        tools: ['figma', 'illustrator'],
        desc: 'The same school, aimed at Japan. Most of the system carried over intact; what changed was density — Japanese layouts hold more per centimetre before they read as crowded, so the grid tightened and the mark got more air.' },

      { name: 'Gốm và mình', slug: 'gom-va-minh', shots: 19, ext: 'jpg', frame: 'bento', board: BRAND_BOARD,
        meta: [
          { label: 'Year',     value: '2022' },
          { label: 'Industry', value: 'Ceramics / craft' },
          { label: 'Type',     value: 'Brand identity' }
        ],
        tools: ['illustrator', 'photoshop'],
        desc: 'A ceramics studio where nothing leaves the kiln twice the same. The system leaves room for that: type stays fixed, everything around it stays loose, so an uneven rim reads as the point and not as a defect.' },

      { name: 'Dingli',        slug: 'dingli',         shots: 19, ext: 'jpg', frame: 'bento', board: BRAND_BOARD,    desc: '' },
      { name: 'Material Band', slug: 'matterial-band', shots: 19, ext: 'jpg', frame: 'bento', board: BRAND_BOARD, desc: '' },
      { name: 'Asterox',       slug: 'asterox',        shots: 19, ext: 'jpg', frame: 'bento', board: BRAND_BOARD,  desc: '' },
      { name: 'PL shopet',     slug: 'pl-shopet',      shots: 19, ext: 'jpg', frame: 'bento', board: BRAND_BOARD,    desc: '' },
      { name: 'Broker by Trade (BBT)', slug: 'broker-by-trade', shots: 19, ext: 'jpg', frame: 'bento', board: BRAND_BOARD, desc: '' }
    ]
  },
  {
    key: 'visual',
    title: 'Visual Design',
    blurb: 'Campaign and product visuals, from key art down to the last banner.',
    // `layout: 'landing'` — each project is ONE tall composite image (the
    // whole campaign laid out as a single landing-page-style piece), shown
    // full width at its own proportions and scrolled, instead of the
    // six-slot campaign rhythm. One file per project instead of a dozen is
    // also what keeps this shelf light.
    //
    // `bare` holds every project that has no `shots` yet completely empty —
    // no name, no description, no placeholder. A project wakes up on its own
    // the moment it gets `shots: 1` and a file at
    // assets/work/visual/<slug>/01.webp; the flag itself can stay.
    layout: 'landing',
    bare: true,
    projects: [
      // DEMO: a low-res reference (272px wide, from ref gird/) standing in
      // for the real landing image, so the layout can be judged now. Drop
      // `ext` and replace with 01.webp at ~1600px wide when the real one exists.
      { name: 'FSEL (Five-Star E-Learning)', slug: 'fsel', shots: 1, file: 'assets/work/visual/fsel/1.jpg',
        // DEMO values (invented) — replace with the real dates and words.
        time:  { from: '2024-03', to: '2024-06' },
        meta:  [ { label: 'Role', value: 'Brand & visual designer' },
                 { label: 'Type', value: 'Brand identity' } ],
        tools: ['photoshop', 'illustrator'],
        desc:  'A rice-cracker brand built around a cat mascot shaped like the cracker itself — playful enough for Gen Z, Japanese enough to feel authentic.' },
      { name: 'Koolkutela', slug: 'kkla', shots: 1, file: 'assets/work/visual/kkla/1.jpg',
        time:  { from: '2023-01', to: '2023-04' },
        meta:  [ { label: 'Role', value: 'Visual designer' }, { label: 'Type', value: 'Campaign visuals' } ],
        tools: ['photoshop', 'illustrator'],
        desc:  'Demo description — two short sentences about what the brief was and what you made. Replace with the real story of this project.' },
      { name: 'QCC Mastery Agency', slug: 'qcc-mastery-agency', shots: 1, file: DEMO_LANDING[2],
        time:  { from: '2023-05', to: '2023-07' },
        meta:  [ { label: 'Role', value: 'Visual designer' }, { label: 'Type', value: 'Social campaign' } ],
        tools: ['photoshop', 'figma'],
        desc:  'Demo description — two short sentences about what the brief was and what you made. Replace with the real story of this project.' },
      { name: 'Menso - Funwise', slug: 'menso-funwise', shots: 1, file: DEMO_LANDING[3],
        time:  { from: '2023-08', to: '2023-11' },
        meta:  [ { label: 'Role', value: 'Visual designer' }, { label: 'Type', value: 'Key visual' } ],
        tools: ['photoshop'],
        desc:  'Demo description — two short sentences about what the brief was and what you made. Replace with the real story of this project.' },
      { name: 'First Support', slug: 'first-support', shots: 1, file: DEMO_LANDING[0],
        time:  { from: '2024-01', to: '2024-02' },
        meta:  [ { label: 'Role', value: 'Visual designer' }, { label: 'Type', value: 'Social campaign' } ],
        tools: ['figma', 'photoshop'],
        desc:  'Demo description — two short sentences about what the brief was and what you made. Replace with the real story of this project.' },
      { name: 'Fre is 3+', slug: 'fre-is-3', shots: 1, file: DEMO_LANDING[1],
        time:  { from: '2024-02', to: '2024-05' },
        meta:  [ { label: 'Role', value: 'Visual designer' }, { label: 'Type', value: 'Product visuals' } ],
        tools: ['photoshop', 'illustrator'],
        desc:  'Demo description — two short sentences about what the brief was and what you made. Replace with the real story of this project.' },
      { name: 'Vnexpress', slug: 'vnexpress', shots: 1, file: DEMO_LANDING[2],
        time:  { from: '2024-04', to: '2024-04' },
        meta:  [ { label: 'Role', value: 'Visual designer' }, { label: 'Type', value: 'Editorial visuals' } ],
        tools: ['photoshop'],
        desc:  'Demo description — two short sentences about what the brief was and what you made. Replace with the real story of this project.' },
      { name: 'Gốm và mình', slug: 'gom-va-minh', shots: 1, file: 'assets/work/visual/gom-va-minh/1.jpg',
        time:  { from: '2024-06', to: '2024-08' },
        meta:  [ { label: 'Role', value: 'Visual designer' }, { label: 'Type', value: 'Brand visuals' } ],
        tools: ['illustrator', 'photoshop'],
        desc:  'Demo description — two short sentences about what the brief was and what you made. Replace with the real story of this project.' },
      { name: 'Cystack', slug: 'cystack', shots: 1, file: 'assets/work/visual/cystack/1.jpg',
        time:  { from: '2024-07', to: '2024-10' },
        meta:  [ { label: 'Role', value: 'Visual designer' }, { label: 'Type', value: 'Campaign visuals' } ],
        tools: ['figma', 'illustrator'],
        desc:  'Demo description — two short sentences about what the brief was and what you made. Replace with the real story of this project.' },
      { name: 'Koichi Studio', slug: 'koichi', shots: 1, file: DEMO_LANDING[1],
        time:  { from: '2024-09', to: '2024-11' },
        meta:  [ { label: 'Role', value: 'Visual designer' }, { label: 'Type', value: 'Key visual' } ],
        tools: ['photoshop'],
        desc:  'Demo description — two short sentences about what the brief was and what you made. Replace with the real story of this project.' },
      { name: 'Parro.mood', slug: 'parro-mood', shots: 1, file: DEMO_LANDING[2],
        time:  { from: '2025-01', to: '2025-03' },
        meta:  [ { label: 'Role', value: 'Visual designer' }, { label: 'Type', value: 'Social campaign' } ],
        tools: ['photoshop', 'aftereffects'],
        desc:  'Demo description — two short sentences about what the brief was and what you made. Replace with the real story of this project.' },
      { name: 'Koji Ezy', slug: 'koji-ezy', shots: 1, file: DEMO_LANDING[3],
        time:  { from: '2025-03', to: '2025-06' },
        meta:  [ { label: 'Role', value: 'Visual designer' }, { label: 'Type', value: 'Product visuals' } ],
        tools: ['figma', 'photoshop'],
        desc:  'Demo description — two short sentences about what the brief was and what you made. Replace with the real story of this project.' },
      { name: 'Lumi Sport', slug: 'lumi', shots: 1, file: DEMO_LANDING[0],
        time:  { from: '2025-06', to: '2025-09' },
        meta:  [ { label: 'Role', value: 'Visual designer' }, { label: 'Type', value: 'Campaign visuals' } ],
        tools: ['photoshop', 'illustrator'],
        desc:  'Demo description — two short sentences about what the brief was and what you made. Replace with the real story of this project.' }
    ]
  },
  {
    key: 'motion',
    title: 'Motion Graphic & 3D',
    blurb: 'Where the static layouts learn to move.',
    projects: [
      { name: 'FSA Light finding light', slug: 'fsa-series-hoat-hinh', shots: 12, desc: '' },
      { name: 'Parro.mood19',            slug: 'parro-mood',           shots: 12, desc: '' },
      { name: '2D Motion',               slug: '2d-freelance-motion',  shots: 12, desc: '' },
      { name: '3D animation',            slug: '3d-animation',         shots: 12, desc: '' },
      { name: '3D Modeling',             slug: '3d-modeling',          shots: 12,
        meta: [
          { label: 'Year',   value: '2023 – 2024' },
          { label: 'Type',   value: '3D modeling' },
          { label: 'Output', value: 'Product & prop assets' }
        ],
        tools: ['blender'],
        desc: 'Product and prop modelling, mostly for angles no photographer was going to get. Built to be lit rather than to be rendered pretty, so the same asset still holds up when it comes back six months later.' }
    ]
  },
  {
    key: 'posm',
    title: 'POSM & Event',
    blurb: 'Things that get printed, built, and stood next to.',
    projects: [
      { name: 'FSEL Launching event', slug: 'fsel-launching',    shots: 12, desc: '' },
      { name: 'LITE Megazine',        slug: 'lite-megazine',     shots: 12, desc: '' },
      { name: 'FSA Booklet',          slug: 'fsa-booklet',       shots: 12, desc: '' },
      { name: 'Apogee profile',       slug: 'apogee-profile',    shots: 12, desc: '' },
      { name: 'Chuyện cũ Hà Nội',     slug: 'chuyen-cu-ha-noi',  shots: 12,
        meta: [
          { label: 'Year',   value: '2023' },
          { label: 'Format', value: 'Printed book' },
          { label: 'Type',   value: 'Editorial design' }
        ],
        // No InDesign icon in assets/desktop/ (the mini desktop's icon set
        // doesn't have one) — Illustrator + Photoshop stand in as the
        // closest match rather than adding a new icon file for one project.
        tools: ['illustrator', 'photoshop'],
        desc: 'A book of old Hanoi stories, printed. Everything on the page had to feel handled — the paper stock, the slightly-off registration, type set the way a state press in the sixties would have had to set it.' }
    ]
  },
  {
    // The book lying flat under the shelf. No project list — just the pile,
    // as a scrapbook wall instead of a catalog grid (see the note up top).
    key: 'freelancer',
    title: 'Freelancer 2020 — 2026',
    blurb: 'Six years of work taken on outside the studio — no folders, just the pile.',
    shots: 24
  },
  {
    key: 'ai',
    title: 'AI flow',
    blurb: 'Websites and tools I designed and built together with AI — Claude Code for the build, my eye for everything it gets wrong.',
    // `swarm`: the right pane builds each project live — named cursors
    // draw a wireframe of the page, then the real screenshot scans in.
    // See js/swarm.js. Screenshot: assets/work/ai/<slug>/01.webp (raise
    // `shots: 0` to `shots: 1` once it is there). Words sit in the list,
    // as on Visual Design; `link` adds a "Visit" line under them.
    // DRAFT copy: dates come from the repos' commit history.
    layout: 'swarm',
    infoInList: true,
    projects: [
      // Screenshots: full-page captures of the live sites (1440px wide).
      { name: 'Kien Phan — personal brand site', slug: 'kien-phan', shots: 1, ext: 'jpg',
        time: { from: '2026-07', to: '2026-10' }, link: 'https://www.kienphan.com.au/',
        desc: 'The personal-brand site for Kien Phan, finance broker and founder of Fundwise Capital Australia. Designed and built end to end with Claude Code, from awards and reviews down to the strategy-session booking form, shipped through a staging → production flow.' },
      { name: '8DIGIT — studio website', slug: '8digit-web', shots: 1, ext: 'jpg',
        time: { from: '2026-07', to: '2026-07' }, link: 'https://www.8digit.com.au/',
        desc: 'The website for 8DIGIT, a growth partner for professional services: strategy, brand, performance marketing and martech as one system. Design, motion and build done together with AI.' }
    ]
  },
  {
    // Not a book — the camera opens this one, using the exact same shelf.
    // Flat, same as Freelancer above: one pile of shots, no project list.
    // `folder` overrides the default assets/work/<key>/ path, since these
    // shots live under assets/photos/ instead — every other field works
    // exactly the way it does for any other flat category.
    key: 'photography',
    title: 'Photography',
    blurb: 'Shot on film, mostly at the wrong time of day. Where I go when the screen gets too loud.',
    folder: 'assets/photos',
    shots: 24
  }
];

// The same icon files the mini desktop's own app icons use (see ICONS in
// js/mini.js) — reused rather than duplicated, so a project's toolkit reads
// as "the actual apps on this machine" instead of a second icon set.
const TOOL_ICONS = {
  figma:        { file: 'assets/desktop/icon-figma.png',        label: 'Figma'        },
  illustrator:  { file: 'assets/desktop/icon-illustrator.png',  label: 'Illustrator'  },
  photoshop:    { file: 'assets/desktop/icon-photoshop.png',    label: 'Photoshop'    },
  aftereffects: { file: 'assets/desktop/icon-aftereffects.png', label: 'After Effects'},
  premiere:     { file: 'assets/desktop/icon-premiere.png',     label: 'Premiere'     },
  blender:      { file: 'assets/desktop/icon-blender.png',      label: 'Blender'      },
  capcut:       { file: 'assets/desktop/icon-capcut.png',       label: 'Capcut'       }
};

(function () {
  'use strict';

  const BY_KEY = {};
  WORK.forEach(c => { BY_KEY[c.key] = c; });

  const el = (s) => document.querySelector(s);

  let sheet, listEl, gridEl, nameEl, metaEl, toolsEl, descEl, titleEl, countEl, blurbEl, root;
  let lightbox, lbImg, lbCount;
  let itemInfo;            // landing layout: the expanding block under the active project
  let current = null;      // the open category
  let project = 0;         // index into current.projects
  let lbIndex = 0;         // index into the open project's shots
  let missing = new Set(); // shots with no file yet, so the lightbox skips them

  function boot(){
    root     = el('#work');
    sheet    = el('.work__sheet');
    listEl   = el('#workList');
    gridEl   = el('#workGrid');
    nameEl   = el('#workName');
    metaEl   = el('#workMeta');
    toolsEl  = el('#workTools');
    descEl   = el('#workDesc');
    titleEl  = el('#workTitle');
    countEl  = el('#workCount');
    blurbEl  = el('#workBlurb');
    lightbox = el('#workLightbox');
    lbImg    = el('#workLbImg');
    lbCount  = el('#workLbCount');

    root.querySelectorAll('[data-work-close]').forEach(b =>
      b.addEventListener('click', closeWork));
    el('#workLbClose').addEventListener('click', closeLightbox);
    el('#workLbPrev').addEventListener('click', () => stepShot(-1));
    el('#workLbNext').addEventListener('click', () => stepShot(1));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();      // click the void to dismiss
    });
  }

  /* ---- open / close ------------------------------------------ */

  window.openWork = function (key){
    if (!sheet) boot();
    const cat = BY_KEY[key];
    if (!cat) return;

    current = cat;
    const flat = isFlat(cat);
    root.classList.toggle('work--flat', flat);
    // Lets a category opt into its own frame rhythm in css/work.css without
    // any more JS — branding uses it today. A data attribute rather than a
    // class so nothing has to be removed when switching categories.
    root.dataset.cat = key;
    root.dataset.layout = cat.layout || '';
    root.dataset.info = infoInList(cat) ? 'list' : '';

    titleEl.textContent = cat.title;
    blurbEl.textContent = cat.blurb || '';

    if (flat){
      countEl.textContent = cat.shots + (cat.shots === 1 ? ' photo' : ' photos');
      listEl.textContent = '';
      showFlat();
    } else {
      countEl.textContent = cat.projects.length + (cat.projects.length === 1 ? ' project' : ' projects');
      buildList();
      if (cat.projects.length) showProject(0);
      else showEmpty();
    }

    root.hidden = false;
    requestAnimationFrame(() => root.classList.add('is-open'));
  };

  function isFlat(cat){ return !Array.isArray(cat.projects); }
  // Where a project's words go: a landing shelf always moves them into the
  // list under the project name, and any other shelf can ask for the same
  // with `infoInList: true` (Branding does), leaving the right pane as
  // nothing but the showcase.
  function infoInList(cat){ return cat.layout === 'landing' || !!cat.infoInList; }

  // onWorkClose calls back into deselect(), which calls closeWork() again —
  // a flag breaks the loop without cutting the fade short.
  let closing = false;

  window.closeWork = function (){
    if (!root || root.hidden || closing) return;
    closing = true;
    closeLightbox();
    if (window.swarmStop) window.swarmStop();
    root.classList.remove('is-open');
    setTimeout(() => {
      if (!root.classList.contains('is-open')) root.hidden = true;
      closing = false;
    }, 380);
    if (typeof window.onWorkClose === 'function') window.onWorkClose();
  };

  window.isWorkOpen = () => !!root && !root.hidden && !closing;

  /* ---- project list ------------------------------------------ */

  function buildList(){
    listEl.textContent = '';
    itemInfo = null;
    current.projects.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'work__item';
      b.textContent = p.name;
      b.addEventListener('click', () => showProject(i));
      listEl.appendChild(b);
    });
  }

  // A category with no projects listed yet. Says so plainly instead of
  // rendering an empty grid that reads as a bug.
  function showEmpty(){
    missing = new Set();
    nameEl.textContent = '';
    setMeta(null);
    setTools(null);
    setDesc(null);
    gridEl.textContent = '';
    const p = document.createElement('p');
    p.className = 'work__empty';
    p.textContent = 'No projects listed for this shelf yet — add them to WORK in js/work.js.';
    gridEl.appendChild(p);
  }

  // A shelf marked `bare` in WORK has nothing to show for any of its
  // projects yet, so picking one opens an empty panel rather than a
  // scaffold of placeholders. Everything else — the project list, the
  // names, any `meta` or `desc` already written — stays in the data
  // untouched and comes straight back when the flag goes.
  // Per project, not per shelf: a bare shelf only stays blank for the projects
  // that have no `shots` yet, so artwork can land one project at a time.
  function isBare(){
    if (!current || !current.bare) return false;
    const p = current.projects && current.projects[project];
    return !(p && p.shots);
  }

  // The project's facts — year, industry, the kind of deliverable — to the
  // left of its `desc`. An unfilled `meta` says so rather than leaving a
  // blank rail beside a paragraph, same reasoning as setDesc below. Pass
  // null where facts make no sense at all (a flat pile, an empty shelf, a
  // bare one) and the whole list disappears.
  function setMeta(p){
    metaEl.textContent = '';
    if (!p){
      metaEl.hidden = true;
      return;
    }
    metaEl.hidden = false;
    const rows = p.meta || [];
    if (!rows.length){
      metaEl.classList.add('is-placeholder');
      const note = document.createElement('p');
      note.className = 'work__metaNote';
      note.textContent = `No details for ${p.name} yet — add \`meta\` in js/work.js.`;
      metaEl.appendChild(note);
      return;
    }
    metaEl.classList.remove('is-placeholder');
    // Each label/value pair gets its own wrapper so css/work.css can lay
    // rows out two to a line — a plain flat dt,dd,dt,dd… list has no way to
    // keep a label directly above its own value once more than one pair
    // shares a line, since grid auto-placement would pair off adjacent
    // elements (dt next to dd) rather than row next to row.
    rows.forEach(row => {
      const wrap = document.createElement('div');
      wrap.className = 'work__metaRow';
      const dt = document.createElement('dt');
      dt.textContent = row.label;
      const dd = document.createElement('dd');
      dd.textContent = row.value;
      wrap.append(dt, dd);
      metaEl.appendChild(wrap);
    });
  }

  // The project's toolkit, as small icons under `meta` — purely optional
  // (see `tools` in the WORK comment up top), so unlike setMeta/setDesc
  // there is no placeholder line for an unfilled one: this row simply
  // does not exist for a project that has not named any tools, same as
  // `spec` in js/flow.js.
  function setTools(p){
    toolsEl.textContent = '';
    const keys = (p && p.tools) || [];
    toolsEl.hidden = !keys.length;
    if (!keys.length) return;
    keys.forEach(key => {
      const t = TOOL_ICONS[key];
      if (!t) return;                  // an unknown key just draws nothing
      const img = document.createElement('img');
      img.src = t.file;
      img.alt = t.label;
      img.title = t.label;
      img.loading = 'lazy';
      toolsEl.appendChild(img);
    });
  }

  // A project's own words. `desc` is the one field in WORK nobody but you
  // can write, so an unwritten one says which project is waiting rather
  // than collapsing to nothing — the same "say what you want, don't leave
  // a silent gap" rule the image placeholders follow. Pass null where a
  // description makes no sense at all (a flat pile, an empty shelf, a bare
  // one) and the line disappears entirely.
  function setDesc(p){
    if (!p){
      descEl.textContent = '';
      descEl.hidden = true;
      return;
    }
    descEl.hidden = false;
    const written = (p.desc || '').trim();
    descEl.textContent = written ||
      `No description for ${p.name} yet — write one into its \`desc\` in js/work.js.`;
    descEl.classList.toggle('is-placeholder', !written);
  }

  /* ---- landing layout: info in the project list --------------
     For a `layout: 'landing'` shelf the right pane is nothing but the
     image, edge to edge, so the facts move into the list instead: ONE
     block, moved to sit directly under whichever project is open. Moving
     it (rather than keeping one per project) restarts its CSS entrance
     every time, which is the whole motion — see .work__itemInfo in
     css/work.css. Other layouts never call past the first line. */
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function fmtMonth(ym){
    const [y, m] = String(ym).split('-').map(Number);
    return m ? `${MONTHS[m - 1]} ${y}` : String(y);
  }

  function setItemInfo(p, i){
    if (!infoInList(current) || !p){
      if (itemInfo) itemInfo.remove();
      return;
    }
    if (!itemInfo){
      itemInfo = document.createElement('div');
      itemInfo.className = 'work__itemInfo';
    }
    itemInfo.textContent = '';
    const inner = document.createElement('div');
    inner.className = 'work__itemInfoIn';

    if (p.time && p.time.from){
      const to = p.time.to || p.time.from;
      const t  = document.createElement('div');
      t.className = 'work__time';
      t.innerHTML = '<span class="work__timeDates"></span><span class="work__timeBar"><i></i></span>';
      t.querySelector('.work__timeDates').textContent = to === p.time.from
        ? fmtMonth(to)                                   // a one-month job is a date, not a range
        : `${fmtMonth(p.time.from)} → ${fmtMonth(to)}`;
      inner.appendChild(t);
    }
    // Only the dates and the words: role, type, tools and the month count
    // were cut as clutter — the landing image already carries that detail.
    if ((p.desc || '').trim()){
      const d = document.createElement('p');
      d.className = 'work__infoDesc';
      d.textContent = p.desc.trim();
      inner.appendChild(d);
    }

    if (p.link){
      const a = document.createElement('a');
      a.className = 'work__infoLink';
      a.href = p.link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Visit ' + p.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') + ' ↗';
      inner.appendChild(a);
    }

    // Nothing written yet (no dates, no desc): no empty box under the name.
    if (!inner.children.length){
      itemInfo.remove();
      return;
    }
    itemInfo.appendChild(inner);
    listEl.querySelectorAll('.work__item')[i].after(itemInfo);
    itemInfo.classList.remove('is-in');
    void itemInfo.offsetWidth;                // restart the entrance
    itemInfo.classList.add('is-in');
  }

  function showProject(i){
    project = i;
    const p = current.projects[i];
    const bare = isBare();   // reads `project`, so it must come after the line above

    // Only the project buttons — the landing layout slips its info block in
    // between them, so plain listEl.children would be off by one.
    [...listEl.querySelectorAll('.work__item')].forEach((b, n) => b.classList.toggle('is-on', n === i));
    setItemInfo(bare ? null : p, i);
    const side = bare || infoInList(current);   // landing / infoInList: facts sit in the list
    nameEl.textContent = side ? '' : p.name;
    setMeta(side ? null : p);
    setTools(side ? null : p);
    setDesc(side ? null : p);
    // Falls back to 'identity' for any project that doesn't name a frame —
    // every non-branding category, and any future branding project you
    // add without picking one on purpose.
    root.dataset.frame = p.frame || 'identity';

    fillGrid();
    gridEl.scrollTop = 0;
  }

  // The flat gallery has no per-project step — it opens straight onto its
  // one and only pile of shots, and has no project to describe.
  function showFlat(){
    nameEl.textContent = '';
    setMeta(null);
    setTools(null);
    setDesc(null);
    fillGrid();
    gridEl.scrollTop = 0;
  }

  // What "the current set of shots" means right now: a picked project in a
  // structured category, or the category itself when it is flat. Every
  // other function reads through this instead of branching on its own.
  function activeSet(){
    if (isFlat(current)) return { label: current.title, count: current.shots || 0 };
    const p = current.projects[project];
    // `shots` is optional: a project written up before its artwork exists
    // simply has none. Normalising to 0 here keeps every caller — the grid,
    // the lightbox, the arrow-key walk — from having to know that.
    return { label: p.name, count: p.shots || 0 };
  }

  function shotPath(n){
    // Every category's shots live under assets/work/<key>/ unless it names
    // its own `folder` — photography does, since those live under
    // assets/photos/ instead. See the note on `folder` in WORK above.
    // `file` points a one-shot project straight at a given image (the
    // Visual Design demo uses it); everything else follows the folder rule.
    const proj = !isFlat(current) && current.projects[project];
    if (proj && proj.file && n === 1) return proj.file;
    const base = current.folder || `assets/work/${current.key}`;
    return isFlat(current)
      ? `${base}/${String(n).padStart(2, '0')}.webp`
      // `ext` lets one project point at a non-WebP file (the Visual Design
      // demo uses a .jpg) without changing the convention for everyone else.
      : `${base}/${current.projects[project].slug}/${String(n).padStart(2, '0')}.${current.projects[project].ext || 'webp'}`;
  }

  // Branding's frames (identity/mosaic/spotlight) already unfold across
  // the grid's full width on their own — see css/work.css — so only the
  // shared six-shot campaign rhythm gets chunked here. A lone cycle can't
  // both stay small and fill the row (the fractions are relative to
  // whatever width the grid has), so most projects run two cycles' worth
  // of shots and this splits them into fixed-width `.work__cycle` blocks
  // that css/work.css lets wrap side by side instead of one narrow column
  // with dead space either side.
  const CYCLE_LEN = 6;

  function fillGrid(){
    missing = new Set();
    gridEl.textContent = '';
    const { label, count } = activeSet();

    // AI flow builds its showcase live instead of laying out tiles — see
    // js/swarm.js. The screenshot (if any) lands at the end of the build.
    if (current.layout === 'swarm' && window.swarmBuild){
      const p = current.projects[project];
      window.swarmBuild(gridEl, p, p.shots ? shotPath(1) : null);
      return;
    }

    // Nothing to lay out. On a bare shelf that is the whole intent, so the
    // panel stays clean; anywhere else an empty grid under a project name
    // would read as something that failed to load, and says so instead.
    if (!count){
      if (!isBare()){
        const p = document.createElement('p');
        p.className = 'work__empty';
        p.textContent = 'Artwork for this one is still to come.';
        gridEl.appendChild(p);
      }
      return;
    }

    const chunked = !isFlat(current) && current.key !== 'branding' && current.layout !== 'landing';

    // A board is drawn as one picture with tiles at fixed spots, so the grid
    // turns into a plain box at the board's ratio and every tile is placed
    // by percentage. Any other project gets the stylesheet's grid back.
    const board = !isFlat(current) && current.projects[project].board;
    gridEl.classList.toggle('work__grid--board', !!board);
    gridEl.style.aspectRatio = board ? `${board.w} / ${board.h}` : '';
    if (board){
      board.tiles.forEach(([n, x, y, w, h]) => {
        const t = tile(label, n);
        t.style.left   = `${x / board.w * 100}%`;
        t.style.top    = `${y / board.h * 100}%`;
        t.style.width  = `${w / board.w * 100}%`;
        t.style.height = `${h / board.h * 100}%`;
        gridEl.appendChild(t);
      });
      return;
    }

    const bento = !isFlat(current) && current.projects[project].bento;
    if (bento){
      bento.forEach(([n, x, y, w, h]) => {
        const t = tile(label, n);
        t.style.gridArea = `${y} / ${x} / span ${h} / span ${w}`;
        gridEl.appendChild(t);
      });
      return;
    }

    let cycle = gridEl;
    for (let n = 1; n <= count; n++){
      if (chunked && (n - 1) % CYCLE_LEN === 0){
        cycle = document.createElement('div');
        cycle.className = 'work__cycle';
        gridEl.appendChild(cycle);
      }
      cycle.appendChild(tile(label, n));
    }
  }

  function tile(label, n){
    const path = shotPath(n);
    const fig = document.createElement('button');
    fig.type = 'button';
    fig.className = 'work__tile';
    // Zoom in place: click magnifies the picture right where you clicked,
    // moving the pointer pans across it, click again (or leave) zooms out.
    // An empty slot has nothing to enlarge, so it stays inert.
    fig.addEventListener('click', (e) => {
      if (fig.classList.contains('is-empty') || fig.classList.contains('is-loading')) return;
      if (fig.classList.contains('is-zoomed')) { zoomOut(fig); return; }
      zoomIn(fig, e);
    });
    fig.addEventListener('mousemove', (e) => { if (fig.classList.contains('is-zoomed')) aimZoom(fig, e); });
    fig.addEventListener('mouseleave', () => zoomOut(fig));

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = `${label} — ${n}`;
    // Visual Design's landing images are several MB each: load them with a
    // real progress bar instead of an empty pane that suddenly pops.
    if (!isFlat(current) && current.layout === 'landing'){
      img.loading = 'eager';
      loadWithProgress(fig, img, path);
    } else {
      img.src = path;
    }

    // Nothing there yet: say exactly which file this slot wants.
    img.addEventListener('error', () => {
      fig.classList.add('is-empty');
      // A few different heights so the placeholder wall reads as intentional
      // rather than a broken uniform grid — only matters for the flat book,
      // whose tiles have no fixed aspect ratio once real photos land.
      if (isFlat(current)) fig.style.aspectRatio = ['4/3', '3/4', '1/1', '4/5'][n % 4];
      missing.add(n - 1);
      const tag = document.createElement('span');
      tag.className = 'work__slot';
      tag.textContent = path.replace('assets/work/', '');
      fig.appendChild(tag);
      img.remove();
    });

    fig.appendChild(img);
    return fig;
  }

  /* ---- loading with progress -----------------------------------
     Streams the file with fetch so the bar follows the real bytes
     (Content-Length), then decodes the picture before showing it, so
     the long landing images arrive in one smooth step instead of a
     blank wait and a stall. Each file is kept as a blob URL for the
     visit, so opening the same project again is instant. Anything that
     goes wrong falls back to a plain <img src>, which also keeps the
     "file still to come" placeholder working. */

  const blobCache = new Map();   // path → object URL

  async function loadWithProgress(fig, img, path){
    if (blobCache.has(path)){ img.src = blobCache.get(path); return; }
    fig.classList.add('is-loading');
    const bar = document.createElement('div');
    bar.className = 'work__load';
    bar.innerHTML = '<div class="work__loadTrack"><i></i></div><span>Loading…</span>';
    fig.appendChild(bar);
    const fill = bar.querySelector('i');
    const text = bar.querySelector('span');
    const mb = (b) => (b / 1048576).toFixed(1);
    try {
      const res = await fetch(path);
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const total = Number(res.headers.get('content-length')) || 0;
      if (!total) bar.classList.add('is-indeterminate');
      const reader = res.body.getReader();
      const chunks = [];
      let got = 0;
      for (;;){
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        got += value.length;
        if (total){
          const p = Math.min(1, got / total);
          fill.style.transform = `scaleX(${p})`;
          text.textContent = `${Math.round(p * 100)}%  ·  ${mb(got)} / ${mb(total)} MB`;
        } else {
          text.textContent = `${mb(got)} MB`;
        }
      }
      const url = URL.createObjectURL(new Blob(chunks, { type: res.headers.get('content-type') || 'image/jpeg' }));
      blobCache.set(path, url);
      fill.style.transform = 'scaleX(1)';
      text.textContent = 'Preparing…';
      img.src = url;
      // decode before revealing; decode() can hang in a background tab, so it races a timeout
      await Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 3000))]);
    } catch {
      img.src = path;
    }
    fig.classList.remove('is-loading');
    bar.remove();
  }

  /* ---- zoom in place ------------------------------------------
     A gentle magnify (ZOOM×) inside the picture's own tile, centred on the
     pointer. Driven by one requestAnimationFrame loop per tile that eases
     both the scale and the focus point towards their targets every frame,
     so the picture glides after the pointer instead of jumping with each
     mousemove, and zooming in/out is one continuous motion.
     Cursor: zoom-in / zoom-out (css/work.css). */

  const ZOOM = 1.6;        // how far a click magnifies
  const EASE = 0.14;       // share of the remaining distance covered per frame (lower = softer)
  const zs = new WeakMap(); // tile → { z, tz, fx, fy, tx, ty, raf }

  function zoomState(fig){
    let s = zs.get(fig);
    if (!s){ s = { z: 1, tz: 1, fx: .5, fy: .5, tx: .5, ty: .5, raf: 0 }; zs.set(fig, s); }
    return s;
  }
  function zoomIn(fig, e){
    if (!fig.querySelector('img')) return;
    const s = zoomState(fig);
    aimZoom(fig, e);
    if (s.z === 1){ s.fx = s.tx; s.fy = s.ty; }   // start from the clicked spot, no slide-in
    s.tz = ZOOM;
    fig.classList.add('is-zoomed');
    runZoom(fig);
  }
  function aimZoom(fig, e){
    const s = zoomState(fig);
    const r = fig.getBoundingClientRect();
    s.tx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    s.ty = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    if (s.tz > 1) runZoom(fig);
  }
  function zoomOut(fig){
    const s = zs.get(fig);
    if (!s || s.tz === 1) return;
    s.tz = 1;
    fig.classList.remove('is-zoomed');
    runZoom(fig);
  }
  function runZoom(fig){
    const s = zoomState(fig);
    if (s.raf) return;
    const img = fig.querySelector('img');
    const step = () => {
      s.z  += (s.tz - s.z)  * EASE;
      s.fx += (s.tx - s.fx) * EASE;
      s.fy += (s.ty - s.fy) * EASE;
      const done = Math.abs(s.tz - s.z) < 0.001 && Math.abs(s.tx - s.fx) < 0.0005 && Math.abs(s.ty - s.fy) < 0.0005;
      if (done) s.z = s.tz;
      if (s.z === 1 && s.tz === 1){
        img.style.removeProperty('transform');
        img.style.removeProperty('will-change');
        s.raf = 0;
        return;
      }
      // scale about the eased focus point: that point of the picture stays put
      const w = img.offsetWidth, h = img.offsetHeight;
      const dx = s.fx * w * (1 - s.z), dy = s.fy * h * (1 - s.z);
      // will-change only while moving: a layer kept on would stay rasterised at
      // 1× and look soft once magnified; dropping it lets the browser redraw
      // the picture sharp at the zoomed size as soon as it settles.
      if (done) img.style.removeProperty('will-change');
      else img.style.setProperty('will-change', 'transform');
      img.style.setProperty('transform', `translate(${dx}px, ${dy}px) scale(${s.z})`, 'important');
      s.raf = done ? 0 : requestAnimationFrame(step);
    };
    s.raf = requestAnimationFrame(step);
  }

  function unzoom(){
    if (!lightbox) return false;
    const was = lightbox.classList.contains('is-zoomed');
    lightbox.classList.remove('is-zoomed');
    lightbox.scrollTop = lightbox.scrollLeft = 0;
    return was;
  }

  /* ---- lightbox ---------------------------------------------- */

  function openLightbox(n){
    unzoom();
    const { label, count } = activeSet();
    lbIndex = n;
    lbImg.src = shotPath(n + 1);
    lbImg.alt = `${label} — ${n + 1}`;
    lbCount.textContent = `${n + 1} / ${count}`;
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add('is-on'));
  }

  function closeLightbox(){
    if (!lightbox || lightbox.hidden) return;
    lightbox.classList.remove('is-on');
    setTimeout(() => { if (!lightbox.classList.contains('is-on')) lightbox.hidden = true; }, 260);
  }

  // Walk past any slot whose file is not in place yet, so the lightbox never
  // lands on a broken image while the folders are still being filled.
  function stepShot(dir){
    const { count } = activeSet();
    let n = lbIndex;
    for (let hop = 0; hop < count; hop++){
      n = (n + dir + count) % count;
      if (!missing.has(n)) { openLightbox(n); return; }
    }
  }

  /* ---- keyboard ---------------------------------------------- */

  window.workKey = function (e){
    if (!window.isWorkOpen()) return false;

    if (!lightbox.hidden){
      if (e.key === 'Escape')     { if (!unzoom()) closeLightbox(); return true; }
      if (e.key === 'ArrowRight') { stepShot(1);      return true; }
      if (e.key === 'ArrowLeft')  { stepShot(-1);     return true; }
      return true;
    }
    if (e.key === 'Escape')     { closeWork(); return true; }
    if (isFlat(current)) return true;               // one pile, nothing to step between

    const n = current.projects.length;
    if (!n) return true;                           // empty shelf: nothing to walk
    if (e.key === 'ArrowDown')  { showProject((project + 1) % n); return true; }
    if (e.key === 'ArrowUp')    { showProject((project - 1 + n) % n); return true; }
    return true;                                   // swallow the rest while open
  };
})();
