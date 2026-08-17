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
const WORK = [
  {
    key: 'branding',
    title: 'Branding',
    blurb: 'Identity systems — the part that has to survive a thousand hands.',
    // `frame` picks this project's grid rhythm — see the "branding frames"
    // block in css/work.css for what each one looks like and why. Every
    // other category just gets the one shared campaign rhythm; branding is
    // the one place different projects are allowed to feel different,
    // because an identity system is not a repeatable ad unit.
    projects: [
      { name: 'FSEL', slug: 'fsel', shots: 6, frame: 'identity',
        meta: [
          { label: 'Year',     value: '2022 – 2024' },
          { label: 'Industry', value: 'Education' },
          { label: 'Type',     value: 'Brand identity' }
        ],
        tools: ['figma', 'illustrator'],
        desc: 'An English centre that fits in a pocket — course, tutor and mock test, all inside the app. The mark had to hold at icon size first and stretch to a launch backdrop second, which is the opposite of the order these usually get drawn in.' },

      { name: 'Khoi', slug: 'khoi', shots: 6, frame: 'mosaic',
        meta: [
          { label: 'Year',     value: '2023' },
          { label: 'Industry', value: 'Personal brand' },
          { label: 'Type',     value: 'Wordmark' }
        ],
        tools: ['illustrator'],
        desc: 'A personal mark for a founder who did not want to look like a company. One glyph, drawn once, used at three sizes and never redrawn — the restraint is the identity.' },

      { name: 'FSEL Japan', slug: 'fsel-japan', shots: 6, frame: 'spotlight',
        meta: [
          { label: 'Year',     value: '2024' },
          { label: 'Industry', value: 'Education' },
          { label: 'Type',     value: 'Brand adaptation' }
        ],
        tools: ['figma', 'illustrator'],
        desc: 'The same school, aimed at Japan. Most of the system carried over intact; what changed was density — Japanese layouts hold more per centimetre before they read as crowded, so the grid tightened and the mark got more air.' },

      { name: 'Gốm và mình', slug: 'gom-va-minh', shots: 6, frame: 'identity',
        meta: [
          { label: 'Year',     value: '2022' },
          { label: 'Industry', value: 'Ceramics / craft' },
          { label: 'Type',     value: 'Brand identity' }
        ],
        tools: ['illustrator', 'photoshop'],
        desc: 'A ceramics studio where nothing leaves the kiln twice the same. The system leaves room for that: type stays fixed, everything around it stays loose, so an uneven rim reads as the point and not as a defect.' },

      { name: 'Dingli',        slug: 'dingli',         shots: 6, frame: 'mosaic',    desc: '' },
      { name: 'Material Band', slug: 'matterial-band', shots: 6, frame: 'spotlight', desc: '' },
      { name: 'Asterox',       slug: 'asterox',        shots: 6, frame: 'identity',  desc: '' },
      { name: 'PL shopet',     slug: 'pl-shopet',      shots: 6, frame: 'mosaic',    desc: '' }
    ]
  },
  {
    key: 'visual',
    title: 'Visual Design',
    blurb: 'Campaign and product visuals, from key art down to the last banner.',
    // `bare` holds this whole shelf empty on purpose. The artwork is going
    // to be ONE large composite image per project — the whole campaign laid
    // out in a single tall piece — and until that exists there is nothing
    // worth putting in its place, so picking a project here shows nothing
    // at all: no name, no description, no placeholder. The list on the left
    // still works, it just opens onto a clean panel.
    //
    // To wake a project up: drop `bare` from this category, give that
    // project `shots: 1`, and put the file at
    // assets/work/visual/<slug>/01.webp. Nothing else changes.
    bare: true,
    projects: [
      { name: 'FSEL (Five-Star E-Learning)', slug: 'fsel'               },
      { name: 'Koolkutela',                  slug: 'kkla'               },
      { name: 'QCC Mastery Agency',          slug: 'qcc-mastery-agency' },
      { name: 'Menso - Funwise',             slug: 'menso-funwise'      },
      { name: 'First Support',               slug: 'first-support'      },
      { name: 'Fre is 3+',                   slug: 'fre-is-3'           },
      { name: 'Vnexpress',                   slug: 'vnexpress'          },
      { name: 'Gốm và mình',                 slug: 'gom-va-minh'        },
      { name: 'Cystack',                     slug: 'cystack'            },
      { name: 'Koichi Studio',               slug: 'koichi'             },
      { name: 'Parro.mood',                  slug: 'parro-mood'         },
      { name: 'Koji Ezy',                    slug: 'koji-ezy'           },
      { name: 'Lumi Sport',                  slug: 'lumi'               }
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

  // onWorkClose calls back into deselect(), which calls closeWork() again —
  // a flag breaks the loop without cutting the fade short.
  let closing = false;

  window.closeWork = function (){
    if (!root || root.hidden || closing) return;
    closing = true;
    closeLightbox();
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
  function isBare(){ return !!(current && current.bare); }

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

  function showProject(i){
    project = i;
    const p = current.projects[i];
    const bare = isBare();

    [...listEl.children].forEach((b, n) => b.classList.toggle('is-on', n === i));
    nameEl.textContent = bare ? '' : p.name;
    setMeta(bare ? null : p);
    setTools(bare ? null : p);
    setDesc(bare ? null : p);
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
    const base = current.folder || `assets/work/${current.key}`;
    return isFlat(current)
      ? `${base}/${String(n).padStart(2, '0')}.webp`
      : `${base}/${current.projects[project].slug}/${String(n).padStart(2, '0')}.webp`;
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

    const chunked = !isFlat(current) && current.key !== 'branding';

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
    // An empty slot has nothing to enlarge, so it stays inert.
    fig.addEventListener('click', () => {
      if (!fig.classList.contains('is-empty')) openLightbox(n - 1);
    });

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = `${label} — ${n}`;
    img.src = path;

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

  /* ---- lightbox ---------------------------------------------- */

  function openLightbox(n){
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
      if (e.key === 'Escape')     { closeLightbox();  return true; }
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
