/* ============================================================
   What is inside my design domain? — interactive desk
   ------------------------------------------------------------
   Every object below is a PNG that Photoshop exported already
   trimmed, so each one carries the x/y it needs to sit back in
   its exact spot on the 4096 x 2287 background.

   Every item has a `title` (the hover label) and exactly ONE of
   the behaviours below — they are mutually exclusive:

     (none)     open .panel, the dark glass box on the right.
                Needs cat / desc / tags / href as well.
     zoom       push the camera into this object (the monitor).
     work: key  open the portfolio shelf on that category —
                js/work.js owns the projects and image paths.
                The camera uses this too, on its own flat category.
     hub        open the phone's contact card — js/contacts.js.
     flow       open the case's workflow board — js/flow.js.
     action     run a one-shot (lamp, cursor, sticky note) and
                nothing else. Kept out of the discovery count.

   `group: N` folds this layer's hits into item N instead.

   Two optional fields control the labels layer (the corner Labels
   button), and neither changes what an object DOES:

     tagAs: 'Name'   share one label with every other item carrying
                     the same string — the five books are one shelf
     tagAt: {x, y}   pin the label somewhere other than the middle
                     of the object, in the same 4096 x 2287 grid

   >>> EDIT ME: the fields above, per object.
       Do NOT reorder this list, and do not change any x/y/w/h —
       hitmap.js is generated from both and would have to be
       regenerated to match. Adding or changing a *behaviour* is
       safe; moving a layer is not.
   ============================================================ */

const CANVAS_W = 4096;
const CANVAS_H = 2287;

/* The mini desktop's own pixel grid — the screen mask's native size.
   Must match MINI_W / MINI_H in mini.js. */
const MINI_W = 906;
const MINI_H = 702;

const ITEMS = [
  {
    // Sticky note taped to the monitor's lower bezel. An action, not a
    // content stop — it opens the contact form instead of the side panel.
    // keepLit holds it above the dimmer so it stays readable while you are
    // zoomed into the monitor, which is exactly when someone wants it.
    file: 'assets/scene/note.webp', x: 1680, y: 1655, w: 186, h: 188,
    action: 'contact',
    keepLit: true,
    title: 'Contact for a job'
  },
  {
    // The CRT glass. Holds the mini desktop (see index.html #miniTpl) and
    // clips it to this PNG's shape. Not a hotspot of its own — `group` hands
    // every hit on it over to the monitor, so the CRT behaves as one object.
    //
    // `inset` seats the lit surface inside the mask box; negative pushes a
    // side OUTWARD, past the mask PNG's own native edge (it just stretches
    // to fill whatever box it's given, per mask-size:100% 100% in styles.css).
    //
    // Two different problems, two different signs:
    //  - left/right/top: the artwork's own old screen image starts only
    //    13-32px inside the mask box, so insetting INWARD past that reveals
    //    it as a leak. Top drops 18px to clear a deep shadow lip; sides stay
    //    at 0 (13px isn't worth risking a halo).
    //  - bottom: the opposite problem. A recessed bezel lip sits BELOW the
    //    mask's native edge and never moves no matter the inset — it belongs
    //    to the monitor casing, not the screen. The only fix is pushing OUT
    //    past it, hence the negative number.
    file: 'assets/scene/desktop_0000_monitor-2.png', x: 1624, y: 910, w: 906, h: 702,
    screen: true,
    inset:  { top: 18, right: 0, bottom: -24, left: 0 },
    group:  4,
    title: 'Screen (part of the monitor)'
  },
  {
    // Opens the same shelf the books do, on its own flat category — see
    // the 'photography' entry in WORK (js/work.js). Not a book, but the
    // gallery behind it works identically, right down to the folder.
    file: 'assets/scene/desktop_0001_Camera.webp', x: 3246, y: 1608, w: 635, h: 400,
    work:  'photography',
    title: 'Photography'
  },
  {
    file: 'assets/scene/desktop_0002_Calendar.webp', x: 2673, y: 1593, w: 397, h: 401,
    title: 'Experience',
    cat:   'Track record',
    desc:  'Where I have worked, what I shipped while I was there, and what stuck.',
    tags:  ['Roles', 'Years'],
    href:  '#experience'
  },
  {
    file: 'assets/scene/desktop_0003_monitor.webp', x: 1486, y: 805, w: 1177, h: 1175,
    zoom:   true,                                 // click anywhere on the CRT to push in
    zoomTo: { x: 1624, y: 910, w: 906, h: 702 },  // ...and frame the glass, not the whole case
    title: 'Profile',
    cat:   'Hello',
    desc:  'Designer working across identity and interface. I like systems that stay useful long after the launch post.',
    tags:  ['Bio', 'CV'],
    href:  '#about'
  },
  {
    // The tower is the one object whose INSIDE is the content: it opens the
    // workflow board rather than a side panel — six components wired as one
    // signal path, each standing for a stage of the work. See js/flow.js.
    file: 'assets/scene/desktop_0004_case.webp', x: 686, y: 876, w: 872, h: 1180,
    flow:  true,
    title: 'Workflow'
  },
  {
    // A switch, not a content stop: click it and toggleLamp() dims the
    // whole scene instead of opening a panel. See SELECTABLE below.
    file: 'assets/scene/desktop_0005_light.webp', x: 1737, y: 35, w: 409, h: 516,
    action: 'lights',
    title: 'Lights'
  },
  // The books are the portfolio itself. `work` names a category in
  // js/work.js, which owns every project and image path; clicking one opens
  // the shelf gallery instead of the side panel.
  //
  // These titles are the CURRENT category names, not what is literally
  // painted on the spines below — the artwork itself still reads "Brand
  // Design" / "Animation - Motiongraphic" / "POSM - Event" (the original
  // render text) until those layers get re-rendered to match. Left to
  // right on the desk the spines run POSM, Animation, Brand, Visual,
  // which is NOT the order of the source spreadsheet.
  //
  // `tagAs` folds all five into ONE label when the labels layer is on:
  // five pills stacked over a 100px-wide shelf would be unreadable, and
  // "Portfolio" is what the shelf is anyway. They stay five separate
  // hotspots — this only affects the label.
  {
    file: 'assets/scene/desktop_0006_Book-4.webp', x: 584, y: 1252, w: 111, h: 667,
    work:  'visual',
    tagAs: 'Portfolio',
    title: 'Visual Design'
  },
  {
    file: 'assets/scene/desktop_0007_Book-3.webp', x: 518, y: 1297, w: 72, h: 631,
    work:  'branding',
    tagAs: 'Portfolio',
    title: 'Branding'
  },
  {
    file: 'assets/scene/desktop_0008_Book-2.webp', x: 443, y: 1298, w: 80, h: 641,
    work:  'motion',
    tagAs: 'Portfolio',
    title: 'Motion Graphic & 3D'
  },
  {
    file: 'assets/scene/desktop_0009_Book-1.webp', x: 292, y: 1323, w: 153, h: 637,
    work:  'posm',
    tagAs: 'Portfolio',
    title: 'POSM & Event'
  },
  {
    // The one lying flat under the shelf.
    file: 'assets/scene/desktop_0010_Book-hori.webp', x: 0, y: 1908, w: 941, h: 379,
    work:  'freelancer',
    tagAs: 'Portfolio',
    title: 'Freelancer 2020 — 2026'
  },
  {
    // The phone hands over every address at once; the sticky note above
    // writes a message. Two objects, two verbs — see js/contacts.js.
    file: 'assets/scene/desktop_0011_phone.webp', x: 3424, y: 2008, w: 579, h: 219,
    hub:   true,
    title: 'Contact'
  },
  {
    // A switch, not a content stop: click it and cycleCursor() swaps the
    // real mouse pointer to the next shape in CURSORS. See SELECTABLE below.
    file: 'assets/scene/mouse.webp', x: 2770, y: 2006, w: 377, h: 207,
    action: 'cursor',
    title: 'Mouse'
  },
  // Added after hitmap.js was first generated, so they sit at the END of the
  // list (appending keeps every earlier index valid). The shadow goes first
  // so it paints under the little Mac; `decor` keeps it out of the hit map,
  // the discovery count and the labels — it is part of the picture only.
  {
    file: 'assets/AI/Shadow.png', x: 843, y: 2100, w: 388, h: 182,
    z: 101,
    decor: true
  },
  {
    // The little Mac in front of the tower: websites and tools built with
    // AI. Opens the shelf on the 'ai' category in js/work.js.
    file: 'assets/AI/AI.png', x: 893, y: 1841, w: 309, h: 348,
    z: 102,
    work:  'ai',
    title: 'AI flow'
  }
];

/* Pointer shapes the desk mouse cycles through, in order — looping straight
   back to mouse 1 (index 0) after the last one; there is no "off" state.
   Each hx/hy is the click point inside the image, in source pixels. `lift`
   is extra clearance (px) pushed into --tip-lift for cursors chunky enough
   to poke into the hover tooltip above them — the duck and the croissant
   are solid enough near their hotspot to need it; the others are sparse/
   thin there and don't. */
const CURSORS = [
  { file: 'assets/cursors/cursor-1.png', hx: 4,  hy: 2  },              // pixel arrow
  { file: 'assets/cursors/cursor-2.png', hx: 30, hy: 40, lift: 16 },    // rubber duck
  { file: 'assets/cursors/cursor-3.png', hx: 29, hy: 27 },              // paw print
  { file: 'assets/cursors/cursor-4.png', hx: 38, hy: 24, lift: 10 },    // croissant
  { file: 'assets/cursors/cursor-5.png', hx: 16, hy: 34 }               // potted plant
];

const BG_FILE = 'assets/scene/desktop_0012_Backgroud.webp';

/* Items with a `group` are absorbed into their parent, and items with
   `action` fire a one-shot instead of opening the panel — neither appear
   in the counter, the keyboard-arrow order, or the panel. */
const SELECTABLE = ITEMS.map((_, i) => i)
  .filter(i => ITEMS[i].group === undefined && !ITEMS[i].action && !ITEMS[i].decor);
const PIP_OF = {};
SELECTABLE.forEach((itemIndex, pip) => { PIP_OF[itemIndex] = pip; });

/* parent index -> the layers it owns, so they light up together */
const CHILDREN = {};
ITEMS.forEach((item, i) => {
  if (item.group === undefined) return;
  (CHILDREN[item.group] = CHILDREN[item.group] || []).push(i);
});
const partsOf = (i) => [i].concat(CHILDREN[i] || []);

/* Look & feel of the highlight ------------------------------- */
const HOVER_COLOR   = '#fff3d6';
const SELECT_COLOR  = '#ffc24b';
const HOVER_WIDTH   = 2.6;   // CSS px at a 1600px-wide stage
const SELECT_WIDTH  = 4.2;
const GLOW          = 20;
const ZOOM_FILL     = 0.58;  // how much of the viewport a zoomed object takes
const ZOOM_MAX      = 6;

/* ============================================================
   Boot
   ============================================================ */

const $  = (s) => document.querySelector(s);
const stage    = $('#stage');
const viewport = $('#viewport');
const scene    = $('#scene');
const fx       = $('#fx');
const ctx      = fx.getContext('2d');
const tip      = $('#tip');
const tipLabel = tip.querySelector('.tip__label');
const tipCta   = tip.querySelector('.tip__cta');
const panel    = $('#panel');
const srnav    = $('#srnav');

const images = new Map();     // file -> HTMLImageElement
const nodes  = [];            // per item: the element we re-light
let   hitmap = null;          // Uint8Array, HITMAP.w * HITMAP.h
let   screenEl = null;        // the CRT surface holding the mini desktop

let hovered  = -1;
let selected = -1;
const found  = new Set();

let stageW = 0, stageH = 0, dpr = 1, scale = 1;
let baseLeft = 0, baseTop = 0;   // stage position with no zoom applied
let zoomIndex = -1;
let cursorState = 0;             // index into CURSORS; starts at mouse 1, no "off" state
const outlineCache = new Map();
let rafId = 0;

preload().then(start);

/* ---- preloading ------------------------------------------- */

function preload(){
  const files = [BG_FILE, ...ITEMS.map(i => i.file)];
  const fill = $('#loaderFill'), pct = $('#loaderPct');
  let done = 0;

  return Promise.all(files.map(src => new Promise(resolve => {
    const img = new Image();
    img.decoding = 'async';
    const finish = () => {
      images.set(src, img);
      done++;
      const p = Math.round(done / files.length * 100);
      fill.style.width = p + '%';
      pct.textContent = p + '%';
      resolve();
    };
    img.onload = finish;
    img.onerror = () => { console.warn('Missing image:', src); finish(); };
    img.src = src;
  })));
}

/* ---- setup ------------------------------------------------- */

function start(){
  hitmap = decodeRLE(window.HITMAP.rle, window.HITMAP.w * window.HITMAP.h);

  buildLayers();
  buildSrNav();
  buildPips();
  buildTags();
  $('#total').textContent = SELECTABLE.length;

  layout();
  new ResizeObserver(debounce(layout, 120)).observe(stage);
  window.addEventListener('resize', debounce(layout, 120));

  bindPointer();
  bindKeyboard();
  bindPanel();
  bindContact();
  bindLabels();
  bindClickFx();
  applyCursor();   // mouse 1 is the default pointer, not the browser's own

  document.body.classList.add('is-ready');
  centreOnNarrowScreens();
}

function buildLayers(){
  ITEMS.forEach((item, i) => {
    const el = (item.mask || item.screen) ? document.createElement('div')
                                          : document.createElement('img');

    el.className = item.screen ? 'screen' : item.mask ? 'cutout' : 'layer';
    if (item.keepLit) el.classList.add('is-lit');

    // Objects sit exactly on their twin in the background, except where an
    // `inset` pulls them inside it (see the screen item).
    const ins = item.inset || {};
    const box = {
      x: item.x + (ins.left || 0),
      y: item.y + (ins.top  || 0),
      w: item.w - (ins.left || 0) - (ins.right  || 0),
      h: item.h - (ins.top  || 0) - (ins.bottom || 0)
    };
    el.style.left   = pct(box.x, CANVAS_W);
    el.style.top    = pct(box.y, CANVAS_H);
    el.style.width  = pct(box.w, CANVAS_W);
    el.style.height = pct(box.h, CANVAS_H);
    // List order == paint order, unless an item names its own `z` — the
    // appended items below need to sit IN FRONT of earlier ones.
    el.style.setProperty('--z', String(item.z ?? 100 - i));

    if (item.screen){
      // A live surface clipped to the PNG's silhouette.
      el.style.webkitMaskImage = `url("${item.file}")`;
      el.style.maskImage       = `url("${item.file}")`;
      el.appendChild($('#miniTpl').content.cloneNode(true));
      screenEl = el;
    } else if (item.mask){
      // Show the background through the mask shape, so an invisible
      // hotspot can still be lit up and lifted above the dimmer.
      el.style.backgroundImage = `url("${BG_FILE}")`;
      el.style.webkitMaskImage = `url("${item.file}")`;
      el.style.maskImage       = `url("${item.file}")`;
    } else {
      el.src = item.file;
      el.alt = '';
      el.draggable = false;
    }

    scene.appendChild(el);
    nodes.push(el);
  });

  if (screenEl){
    // Once zoomed in the mini desktop takes its own clicks, so they must not
    // reach the stage and toggle the zoom back off.
    screenEl.addEventListener('click',       e => e.stopPropagation());
    screenEl.addEventListener('pointermove', e => e.stopPropagation());
    screenEl.inert = true;

    if (window.initMiniDesktop) initMiniDesktop(screenEl.querySelector('.mini'));
  }
}

function buildSrNav(){
  SELECTABLE.forEach((i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = ITEMS[i].title;
    b.addEventListener('focus', () => setHover(i));
    b.addEventListener('blur',  () => setHover(-1));
    b.addEventListener('click', () => select(i));
    srnav.appendChild(b);
  });

  // Actions (lamp, mouse, note) are one-shots, not content stops — reachable
  // by keyboard/screen reader, but kept out of the discovery count and the
  // arrow-key order.
  ITEMS.forEach((item, i) => {
    if (!item.action) return;
    const def = ACTIONS[item.action];
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = def.label;
    b.addEventListener('focus', () => setHover(i));
    b.addEventListener('blur',  () => setHover(-1));
    b.addEventListener('click', def.run);
    srnav.appendChild(b);
  });
}

/* Each `action` value names a one-shot below, shared by the click handler,
   the Enter key, and the screen-reader nav built above. `cta` is the word
   shown in the cursor tooltip while hovering that object. */
const ACTIONS = {
  lights:  { label: 'Desk lamp — toggle dark mode', cta: 'toggle',  run: toggleLamp   },
  cursor:  { label: 'Mouse — change the pointer',   cta: 'toggle',  run: cycleCursor  },
  contact: { label: 'Sticky note — contact me',     cta: 'contact', run: openContact  }
};

function toggleLamp(){
  document.body.classList.toggle('is-lights-off');
}

function cycleCursor(){
  cursorState = (cursorState + 1) % CURSORS.length;
  applyCursor();
}

function applyCursor(){
  const c = CURSORS[cursorState];
  // --cur is set here but consumed by a rule in css/styles.css, and a relative
  // url() inside a custom property resolves against the *stylesheet*, not the
  // document. Resolve it ourselves so the path stays honest wherever the CSS
  // happens to live.
  const url = new URL(c.file, document.baseURI).href;
  document.documentElement.style.setProperty('--cur', `url("${url}") ${c.hx} ${c.hy}, auto`);
  document.documentElement.style.setProperty('--tip-lift', (c.lift || 0) + 'px');
  document.documentElement.classList.add('has-custom-cursor');
}

/* A quick dark flash at every click. Purely decorative, so it listens on the
   document rather than threading through each item's own click handler. */
function bindClickFx(){
  document.addEventListener('click', (e) => {
    const fx = document.createElement('div');
    fx.className = 'click-fx';
    fx.style.left = e.clientX + 'px';
    fx.style.top  = e.clientY + 'px';
    document.body.appendChild(fx);
    fx.addEventListener('animationend', () => fx.remove());
  });
}

/* ---- contact form -------------------------------------------
   The sticky note on the monitor bezel opens a compose window.
   Sending hands off to the visitor's own mail client, so there is
   no backend to run and nothing to leak.

   The address itself lives in CHANNELS in js/contacts.js — the
   phone's card and this form must never disagree about it, so
   there is one table and this reads from it. The literal below is
   only the fallback for contacts.js failing to load at all.
   ------------------------------------------------------------ */

const CONTACT_TO = window.CONTACT_EMAIL || 'hello@example.com';

function openContact(){
  const mailer = $('#mailer');
  mailer.hidden = false;
  requestAnimationFrame(() => mailer.classList.add('is-open'));
  const first = mailer.querySelector('input');
  if (first) setTimeout(() => first.focus(), 120);
}

function closeContact(){
  const mailer = $('#mailer');
  mailer.classList.remove('is-open');
  setTimeout(() => { if (!mailer.classList.contains('is-open')) mailer.hidden = true; }, 400);
}

function bindContact(){
  const mailer = $('#mailer');
  const form   = $('#mailerForm');

  mailer.querySelectorAll('[data-close]').forEach(el =>
    el.addEventListener('click', closeContact));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data    = new FormData(form);
    const subject = String(data.get('subject') || 'Hello');
    const body    = String(data.get('body') || '') + '\n\n— ' + String(data.get('from') || '');

    window.location.href =
      `mailto:${CONTACT_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    $('#mailerNote').textContent = 'Handing this to your mail app…';
    setTimeout(closeContact, 1200);
  });
}

function buildPips(){
  const wrap = $('#pips');
  SELECTABLE.forEach(() => wrap.appendChild(document.createElement('span')));
}

/* ---- section labels -----------------------------------------
   One pill per section, shown all at once by the corner button.

   Not one per ITEM: items sharing a `tagAs` collapse into a single
   label covering all of them, which is what stops the five book
   spines — together about 100px wide — from stacking five pills on
   top of each other. Everything else gets its own.
   ------------------------------------------------------------ */

const tagOf = {};        // item index -> its label element (shared within a group)

function buildTags(){
  const layer = $('#tags');
  const groups = new Map();

  ITEMS.forEach((item, i) => {
    if (item.group !== undefined) return;      // absorbed into its parent
    if (!item.title) return;

    const key = item.tagAs || ('#' + i);       // '#i' keeps ungrouped items apart
    const g = groups.get(key) || { label: item.tagAs || item.title, items: [], at: null };
    g.items.push(i);
    if (item.tagAt) g.at = item.tagAt;         // an explicit pin wins over the centre
    groups.set(key, g);
  });

  [...groups.values()].forEach((g, n) => {
    // The middle of everything the label covers — for a lone object that is
    // just its own centre; for the shelf it is the centre of all five books.
    const at = g.at || {
      x: (Math.min(...g.items.map(i => ITEMS[i].x)) +
          Math.max(...g.items.map(i => ITEMS[i].x + ITEMS[i].w))) / 2,
      y: (Math.min(...g.items.map(i => ITEMS[i].y)) +
          Math.max(...g.items.map(i => ITEMS[i].y + ITEMS[i].h))) / 2
    };

    const el = document.createElement('span');
    el.className = 'tag';
    el.textContent = g.label;
    el.style.left = pct(at.x, CANVAS_W);
    el.style.top  = pct(at.y, CANVAS_H);
    el.style.setProperty('--n', String(n));    // staggers the entrance
    g.items.forEach(i => { tagOf[i] = el; });
    layer.appendChild(el);
  });
}

function bindLabels(){
  const btn = $('#labels');
  btn.addEventListener('click', toggleLabels);
  bindHomebar();
}

/* ---- home bar -----------------------------------------------
   The pill top-left. Opens a small menu holding the labels switch and
   one row per section; picking a row closes the menu and selects that
   object exactly as clicking it on the desk would. The labels switch
   leaves the menu open so its effect can be seen behind it. */
function bindHomebar(){
  const bar  = $('#homebar');
  const btn  = $('#homebarBtn');
  const menu = $('#homebarMenu');
  const list = $('#homebarList');

  SELECTABLE.forEach((i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'homebar__item';
    b.textContent = ITEMS[i].title;
    b.addEventListener('click', () => { close(); select(i); });
    list.appendChild(b);
  });

  function open(){
    menu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    void menu.offsetWidth;            // commit the hidden state so the fade runs
    bar.classList.add('is-open');
  }
  function close(){
    if (menu.hidden) return;
    bar.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    setTimeout(() => { if (!bar.classList.contains('is-open')) menu.hidden = true; }, 220);
  }

  btn.addEventListener('click', () => (menu.hidden ? open() : close()));
  document.addEventListener('pointerdown', (e) => { if (!bar.contains(e.target)) close(); });
  bar.addEventListener('keydown', (e) => {
    if (e.key === 'Escape'){ e.stopPropagation(); close(); btn.focus(); }
  });
}

function toggleLabels(){
  const on = document.body.classList.toggle('is-tagging');
  $('#labels').setAttribute('aria-checked', String(on));   // role="switch"
}

/* ---- layout ------------------------------------------------ */

function layout(){
  // Measure the stage as if it were never zoomed, so the zoom maths below
  // always start from the same origin.
  stage.classList.add('no-anim');
  stage.style.transform = 'none';
  const r = stage.getBoundingClientRect();

  if (!r.width){                       // pane not laid out yet — try again shortly
    stage.classList.remove('no-anim');
    setTimeout(layout, 100);
    return;
  }

  stageW   = r.width;
  stageH   = r.height;
  baseLeft = r.left;
  baseTop  = r.top;
  scale    = stageW / CANVAS_W;
  dpr      = Math.min(window.devicePixelRatio || 1, 2);

  applyZoom(zoomIndex);
  void stage.offsetWidth;              // commit before re-enabling the easing
  stage.classList.remove('no-anim');

  fx.width  = Math.round(stageW * dpr);
  fx.height = Math.round(stageH * dpr);

  // Re-anchor the background inside every mask cutout.
  ITEMS.forEach((item, i) => {
    if (!item.mask) return;
    const el = nodes[i];
    el.style.backgroundSize     = `${stageW}px ${stageH}px`;
    el.style.backgroundPosition = `${-item.x * scale}px ${-item.y * scale}px`;
  });

  // The mini desktop is authored on the screen PNG's native 906 x 702 grid,
  // but it is drawn into the *lit* rect, which the inset makes very slightly
  // squatter. Two ratios rather than one keeps it filling that rect exactly;
  // they differ by about 3%, which no one can see, and the alternative is a
  // gap of bare artwork down one edge.
  if (screenEl){
    const mini = screenEl.querySelector('.mini');
    if (mini){
      mini.style.setProperty('--kx', screenEl.offsetWidth  / MINI_W);
      mini.style.setProperty('--ky', screenEl.offsetHeight / MINI_H);
    }
  }

  outlineCache.clear();
  render();
}

function centreOnNarrowScreens(){
  if (viewport.scrollWidth > viewport.clientWidth){
    viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
  }
}

/* ---- zoom ---------------------------------------------------
   The stage has transform-origin 0 0, so a content point (px, py) in
   stage pixels lands at  base + translate + k * point.  Solve that for
   the translate that drops the object's centre on the free area's centre.
   ------------------------------------------------------------ */

function applyZoom(index){
  zoomIndex = index;

  if (index < 0 || !stageW){
    stage.style.transform = '';
    document.body.classList.remove('is-zoomed');
    if (screenEl) screenEl.inert = true;
    return;
  }

  const item = ITEMS[index];
  const box  = item.zoomTo || item;    // what to frame, which may be a detail of the object

  // Zooming hides the panel, so the object gets the whole viewport.
  const availW = window.innerWidth;
  const availH = window.innerHeight;

  const w = box.w * scale;
  const h = box.h * scale;
  const k = Math.max(1, Math.min(ZOOM_MAX, availW * ZOOM_FILL / w, availH * ZOOM_FILL / h));

  const cx = (box.x + box.w / 2) * scale;
  const cy = (box.y + box.h / 2) * scale;
  const tx = availW / 2 - baseLeft - k * cx;
  const ty = availH / 2 - baseTop  - k * cy;

  stage.style.transform = `translate(${tx}px, ${ty}px) scale(${k})`;
  document.body.classList.add('is-zoomed');

  // The mini desktop only comes alive once you are inside its monitor.
  if (screenEl) screenEl.inert = !partsOf(index).some(n => ITEMS[n].screen);
}

/* ---- hit testing ------------------------------------------- */

function decodeRLE(str, length){
  const out = new Uint8Array(length);
  let p = 0;
  for (const part of str.split(',')){
    const dot = part.indexOf('.');
    const v = +part.slice(0, dot);
    const c = +part.slice(dot + 1);
    if (v) out.fill(v, p, p + c);
    p += c;
  }
  return out;
}

function hitAt(u, v){
  const { w, h } = window.HITMAP;
  const x = Math.floor(u * w);
  const y = Math.floor(v * h);
  if (x < 0 || y < 0 || x >= w || y >= h) return -1;

  const i = hitmap[y * w + x] - 1;
  if (i < 0) return -1;
  const group = ITEMS[i].group;
  return group === undefined ? i : group;
}

/* ---- pointer ----------------------------------------------- */

function bindPointer(){
  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    const u = (e.clientX - r.left) / r.width;
    const v = (e.clientY - r.top)  / r.height;
    setHover(hitAt(u, v));
    moveTip(e.clientX - r.left, e.clientY - r.top);
  });

  stage.addEventListener('pointerleave', () => setHover(-1));

  stage.addEventListener('click', (e) => {
    const r = stage.getBoundingClientRect();
    const i = hitAt((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);

    if (i < 0) { deselect(); return; }
    // An action fires and does nothing else — it never becomes "selected".
    if (ITEMS[i].action) { ACTIONS[ITEMS[i].action].run(); return; }
    // A second click on a zoomable object pulls back out.
    if (i === selected && ITEMS[i].zoom) deselect();
    else select(i);
  });

  $('#zoomout').addEventListener('click', deselect);
}

function moveTip(x, y){
  tip.style.left = x + 'px';
  tip.style.top  = y + 'px';
}

function setHover(i){
  if (i === hovered) return;

  if (hovered >= 0 && hovered !== selected){
    partsOf(hovered).forEach(n => nodes[n].classList.remove('is-hot'));
  }
  // The label always drops its highlight, even for the selected item — it is
  // the cursor it follows, not the selection.
  if (hovered >= 0 && tagOf[hovered]) tagOf[hovered].classList.remove('is-hot');
  hovered = i;

  if (hovered >= 0){
    partsOf(hovered).forEach(n => nodes[n].classList.add('is-hot'));
    if (tagOf[hovered]) tagOf[hovered].classList.add('is-hot');
    tipLabel.textContent = ITEMS[hovered].title;
    tipCta.textContent   = ITEMS[hovered].zoom ? 'zoom'
                          : ITEMS[hovered].hub  ? 'contact'
                          : ITEMS[hovered].flow ? 'open it up'
                          : ITEMS[hovered].action ? ACTIONS[ITEMS[hovered].action].cta
                          : 'open';
    tip.classList.add('is-on');
    stage.classList.add('is-over');
    stage.classList.toggle('can-zoom', !!ITEMS[hovered].zoom);
  } else {
    tip.classList.remove('is-on');
    stage.classList.remove('is-over', 'can-zoom');
  }

  render();
}

/* ---- selection --------------------------------------------- */

function select(i){
  if (i < 0 || i >= ITEMS.length) return;
  if (ITEMS[i].action) { ACTIONS[ITEMS[i].action].run(); return; }   // defensive: an action never becomes "selected"

  if (selected >= 0 && selected !== i){
    partsOf(selected).forEach(n => nodes[n].classList.remove('is-picked'));
    if (selected !== hovered){
      partsOf(selected).forEach(n => nodes[n].classList.remove('is-hot'));
    }
  }
  selected = i;
  partsOf(selected).forEach(n => nodes[n].classList.add('is-picked'));
  document.body.classList.add('is-picking');

  if (!found.has(i)){
    found.add(i);
    $('#found').textContent = found.size;
    $('#pips').children[PIP_OF[i]].classList.add('on');
  }

  // Five kinds of destination: the shelf gallery (books and the camera
  // alike), the phone's contact card, the case's workflow board, a zoom, or
  // the side panel. Every overlay wants the panel shut and the camera
  // pulled back first.
  if (ITEMS[i].work){
    closePanel();
    applyZoom(-1);
    openWork(ITEMS[i].work);
  } else if (ITEMS[i].hub){
    closePanel();
    applyZoom(-1);
    openHub();
  } else if (ITEMS[i].flow){
    closePanel();
    applyZoom(-1);
    openFlow();
  } else if (ITEMS[i].zoom){
    // A zoomable object speaks for itself once you are inside it — no panel.
    closePanel();
    applyZoom(i);
  } else {
    fillPanel(ITEMS[i]);
    applyZoom(-1);
  }

  render();
}

function deselect(){
  if (selected < 0) return;
  partsOf(selected).forEach(n => nodes[n].classList.remove('is-picked'));
  if (selected === hovered){
    partsOf(selected).forEach(n => nodes[n].classList.add('is-hot'));
  }
  selected = -1;                       // cleared first: closeWork() calls back
  document.body.classList.remove('is-picking');
  applyZoom(-1);
  closePanel();
  if (window.closeWork) closeWork();
  if (window.closeHub)  closeHub();
  if (window.closeFlow) closeFlow();
  render();
}

/* Closing an overlay from its own X or backdrop should also let the object
   go, otherwise the desk stays dimmed behind something nothing is showing.
   Each of these calls back into deselect(), which calls the closer again —
   the `closing` flag inside each module is what stops the ping-pong. */
window.onWorkClose = function(){ deselect(); };
window.onHubClose  = function(){ deselect(); };
window.onFlowClose = function(){ deselect(); };

function step(dir){
  const pos  = SELECTABLE.indexOf(selected);
  const next = pos < 0 ? 0 : (pos + dir + SELECTABLE.length) % SELECTABLE.length;
  select(SELECTABLE[next]);
}

/* ---- panel -------------------------------------------------- */

function fillPanel(item){
  $('#panelTitle').textContent = item.title;
  $('#panelDesc').textContent  = item.desc;

  const tags = $('#panelTags');
  tags.textContent = '';
  (item.tags || []).forEach(t => {
    const li = document.createElement('li');
    li.textContent = t;
    tags.appendChild(li);
  });

  const cta = $('#panelCta');
  cta.href = item.href || '#';
  cta.hidden = !item.href;

  panel.hidden = false;
  requestAnimationFrame(() => panel.classList.add('is-open'));
}

function closePanel(){
  panel.classList.remove('is-open');
  setTimeout(() => { if (!panel.classList.contains('is-open')) panel.hidden = true; }, 600);
}

function bindPanel(){
  $('#panelClose').addEventListener('click', deselect);
  panel.querySelectorAll('.panel__nav button').forEach(b => {
    b.addEventListener('click', () => step(+b.dataset.step));
  });
}

/* ---- keyboard ----------------------------------------------- */

function bindKeyboard(){
  window.addEventListener('keydown', (e) => {
    // The contact form owns the keyboard while it is open, so typing an
    // arrow inside a message never walks the desk behind it.
    if (!$('#mailer').hidden){
      if (e.key === 'Escape') closeContact();
      return;
    }
    // Same for the shelf: it takes the arrows for its own list and
    // lightbox, and must not walk the desk behind it.
    if (window.isWorkOpen && window.isWorkOpen()){
      e.preventDefault();
      workKey(e);
      return;
    }
    // The contact card has nothing to step through — it only needs a way out.
    if (window.isHubOpen && window.isHubOpen()){
      if (e.key === 'Escape') closeHub();
      return;
    }
    // The workflow board walks its own six steps with the arrows, same
    // reason as the shelf: they must not reach the desk behind it.
    if (window.isFlowOpen && window.isFlowOpen()){
      e.preventDefault();
      flowKey(e);
      return;
    }
    // e.target is normally an Element (closest() exists), but a keydown can
    // legitimately target `document` itself when nothing on the page has
    // focus yet — Document has no closest(), so guard rather than assume.
    if (e.target.closest && e.target.closest('input, textarea')) return;

    if (e.key === 'Escape')       { deselect(); }
    else if (e.key === 'l' || e.key === 'L'){ toggleLabels(); }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); step(1);  }
    else if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); step(-1); }
    else if (e.key === 'Enter' && hovered >= 0){
      if (ITEMS[hovered].action) ACTIONS[ITEMS[hovered].action].run();
      else select(hovered);
    }
  });
}

/* ============================================================
   Outline rendering

   The stroke is built from the layer's own alpha channel: draw the
   PNG in a ring of offsets to fatten it, punch the original back
   out, then tint what is left. Works for any silhouette, including
   the solid black screen mask.
   ============================================================ */

function outlineFor(index, radius, color){
  const key = `${index}|${radius}|${color}`;
  let c = outlineCache.get(key);
  if (c) return c;

  const item = ITEMS[index];
  const img  = images.get(item.file);
  if (!img || !img.width) return null;

  const w = Math.max(1, Math.round(item.w * scale * dpr));
  const h = Math.max(1, Math.round(item.h * scale * dpr));
  const r = Math.max(1, radius * dpr);

  c = document.createElement('canvas');
  c.width  = w + r * 2;
  c.height = h + r * 2;
  const g = c.getContext('2d');

  const STEPS = 24;
  for (let i = 0; i < STEPS; i++){
    const a = (i / STEPS) * Math.PI * 2;
    g.drawImage(img, r + Math.cos(a) * r, r + Math.sin(a) * r, w, h);
  }

  g.globalCompositeOperation = 'destination-out';
  g.drawImage(img, r, r, w, h);

  g.globalCompositeOperation = 'source-in';
  g.fillStyle = color;
  g.fillRect(0, 0, c.width, c.height);

  outlineCache.set(key, c);
  return c;
}

function paintOutline(index, color, width, alpha, glow){
  const o = outlineFor(index, width, color);
  if (!o) return;

  const item = ITEMS[index];
  const r = Math.max(1, width * dpr);
  const x = item.x * scale * dpr - r;
  const y = item.y * scale * dpr - r;

  ctx.globalAlpha = alpha;

  if (glow > 0){
    ctx.shadowColor = color;
    ctx.shadowBlur  = glow * dpr;
    ctx.drawImage(o, x, y);
    ctx.drawImage(o, x, y);          // second pass deepens the halo
    ctx.shadowBlur = 0;
  }

  ctx.drawImage(o, x, y);
  ctx.globalAlpha = 1;
}

function render(){
  if (!stageW) return;
  cancelAnimationFrame(rafId);

  const draw = (t) => {
    ctx.clearRect(0, 0, fx.width, fx.height);

    // stroke width is authored for a 1600px stage, then scaled with it
    const k = Math.max(.55, Math.min(1.35, stageW / 1600));

    if (selected >= 0){
      const pulse = 0.78 + 0.22 * Math.sin(t / 480);
      paintOutline(selected, SELECT_COLOR, SELECT_WIDTH * k, pulse, GLOW);
    }
    if (hovered >= 0 && hovered !== selected){
      paintOutline(hovered, HOVER_COLOR, HOVER_WIDTH * k, 1, GLOW * 0.6);
    }

    if (selected >= 0) rafId = requestAnimationFrame(draw);
  };

  rafId = requestAnimationFrame(draw);
}

/* ---- helpers ------------------------------------------------ */

function pct(value, total){ return (value / total * 100) + '%'; }

function debounce(fn, ms){
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
