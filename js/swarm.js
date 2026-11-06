/* ============================================================
   Swarm build — the AI flow shelf's showcase
   ------------------------------------------------------------
   Instead of simply showing a screenshot, the right pane BUILDS
   the project in front of you: a handful of named cursors (the
   AIs I work with, plus me) fly into an empty browser window and
   draw the page's first screen — its real layout and colours —
   while a log ticks along underneath. When the build lands, the
   real full-page screenshot scans in exactly over the drawing and
   then scrolls itself slowly down, like a slideshow of the site.

   Original code, written for this site. The idea of cursors
   rebuilding a page comes from Joel Califa's "Swarm" and the
   swarm-cursors extension; nothing of theirs is copied here.

   Called by fillGrid() in js/work.js for any category with
   `layout: 'swarm'`. Everything is cancelled the moment the grid
   is refilled (another project, or the shelf closes): each step
   checks that its build is still the live one.

   Coordinates are the SITE's own pixels on a 1440 x 1000 canvas —
   the same width the screenshots are captured at — so the drawing
   and the screenshot line up when one replaces the other.

   >>> EDIT ME: CREW (cursor names/colours) and WIRES (one drawing
       per project slug; anything without one gets a generic page).
   ============================================================ */

(function () {
  'use strict';

  const CREW = [
    { name: 'Linh',   color: '#ffc24b' },
    { name: 'Claude', color: '#e07a55' },
    { name: 'Codex',  color: '#5dffa0' },
    { name: 'Gemini', color: '#7aa8ff' }
  ];

  const W = 1440, H = 1000;          // canvas, in site pixels

  // Draw as a pure wireframe — outlines and type only, no real colours —
  // so the real site sliding in afterwards is the reveal. Set false to
  // paint each WIRES job in its `fill` / `ink` colours instead.
  const WIREFRAME = true;

  /* ---- drawings ------------------------------------------------
     Jobs, in build order. Shared by all:
       x, y, w, h   site pixels       log   what the log line says
     rect: fill (any CSS background), radius, stroke, label, ink, size
     text: text, size, weight, ink, font ('serif' | 'sans' | 'display'),
           align ('left' | 'center'), lh (line height)
     img:  a photo placeholder (hatched)
     dup:  a rect that copies the previous card, with a slide-in      */
  const WIRES = {
    'kien-phan': [
      { t: 'rect', x: 0, y: 0, w: 1440, h: 1000, fill: '#f8f4ec', log: 'lay page canvas' },
      { t: 'rect', x: 0, y: 0, w: 1440, h: 58, fill: '#1d1f24', log: 'scaffold nav bar' },
      { t: 'text', x: 130, y: 18, text: '◢ Kien Phan', size: 19, weight: 700, ink: '#fff', log: 'set logotype' },
      { t: 'text', x: 893, y: 22, text: 'Awards      About      How it works', size: 13, weight: 500, ink: '#fff', log: 'wire nav links' },
      { t: 'rect', x: 1174, y: 13, w: 136, h: 33, radius: 17, fill: '#b0773f', label: 'Book a session', ink: '#fff', size: 12, log: 'nav call to action' },
      { t: 'img',  x: 830, y: 158, w: 420, h: 524, radius: 14, fill: '#dfe1e8', log: 'place portrait' },
      { t: 'rect', x: 130, y: 236, w: 420, h: 46, radius: 23, fill: '#fbf8f2', stroke: '#e2d6c2',
        label: 'FINANCE BROKER  |  Fundwise Capital Australia', ink: '#1d1f24', size: 13, log: 'eyebrow pill' },
      { t: 'text', x: 130, y: 300, w: 600, text: 'The broker who reads the full picture, then acts.',
        size: 46, font: 'serif', ink: '#1d1f24', lh: 1.1, log: 'type headline' },
      { t: 'text', x: 130, y: 428, w: 590, text: 'I work with investors, professionals and business owners whose finances have more moving parts than a standard loan application allows for.',
        size: 16, ink: '#3b3b3b', lh: 1.6, log: 'write intro' },
      { t: 'rect', x: 130, y: 594, w: 284, h: 48, radius: 24, fill: '#b0773f', label: 'Book your Strategy Session →', ink: '#fff', size: 14, log: 'primary button' },
      { t: 'rect', x: 1165, y: 198, w: 106, h: 84, radius: 10, fill: '#fff', label: '$1.1b', ink: '#1d1f24', size: 26, font: 'serif', shadow: true, log: 'stat badge' },
      { t: 'dup',  x: 798, y: 588, w: 132, h: 86, radius: 10, fill: '#fff', label: '3,000+', ink: '#1d1f24', size: 26, font: 'serif', shadow: true, log: 'duplicate badge' },
      { t: 'rect', x: 0, y: 816, w: 1440, h: 184, fill: '#1d1f24', log: 'awards band' },
      { t: 'text', x: 0, y: 886, w: 1440, text: 'AWARDED & RECOGNISED', size: 11, weight: 700, ink: '#c08a4f', align: 'center', log: 'section eyebrow' },
      { t: 'text', x: 0, y: 916, w: 1440, text: 'Judged Australia’s best. Independently.', size: 40, weight: 700, ink: '#fff', align: 'center', log: 'section headline' }
    ],

    '8digit-web': [
      { t: 'rect', x: 0, y: 0, w: 1440, h: 900, log: 'lay dark canvas',
        fill: 'radial-gradient(ellipse at 22% 18%, rgba(140,14,18,.55), transparent 55%), radial-gradient(ellipse at 85% 70%, rgba(120,10,14,.4), transparent 50%), #151515' },
      { t: 'rect', x: 136, y: 16, w: 56, h: 56, radius: 28, fill: '#e3141b', label: '8', ink: '#fff', size: 24, log: 'drop logo mark' },
      { t: 'rect', x: 428, y: 18, w: 572, h: 58, radius: 29, fill: '#fff',
        label: 'Home     About     Services     Industries     Why us     Contact', ink: '#111', size: 13, log: 'pill navigation' },
      { t: 'rect', x: 1068, y: 18, w: 222, h: 56, radius: 28, fill: '#e3141b', label: 'Book a strategy call ↗', ink: '#fff', size: 14, log: 'nav call to action' },
      { t: 'text', x: 0, y: 286, w: 1440, text: '—  DIGITAL GROWTH & TRANSFORMATION', size: 12, weight: 700, ink: '#e3141b', align: 'center', log: 'hero eyebrow' },
      { t: 'text', x: 0, y: 322, w: 1440, text: 'ENGINEERING', size: 100, weight: 800, font: 'display', ink: '#ececec', align: 'center', log: 'type headline' },
      { t: 'text', x: 0, y: 426, w: 668, text: 'YOUR', size: 100, weight: 800, font: 'display', ink: '#ececec', align: 'right', log: 'headline, line two' },
      { t: 'text', x: 700, y: 426, text: 'GROWTH', size: 100, weight: 800, font: 'display', ink: '#e3141b', log: 'paint it red' },
      { t: 'text', x: 0, y: 556, w: 1440, text: 'We engineer strategy, brand and systems around your ambition.', size: 19, ink: '#bdbdbd', align: 'center', log: 'write subline' },
      { t: 'rect', x: 510, y: 618, w: 226, h: 56, radius: 28, fill: '#e3141b', label: 'Book a strategy call ↗', ink: '#fff', size: 14, log: 'primary button' },
      { t: 'dup',  x: 742, y: 618, w: 172, h: 56, radius: 28, fill: 'transparent', stroke: '#6a6a6a', label: 'See our work ↗', ink: '#fff', size: 14, log: 'secondary button' },
      { t: 'rect', x: 699, y: 804, w: 24, h: 38, radius: 12, fill: 'transparent', stroke: '#777', log: 'scroll hint' },
      { t: 'rect', x: 0, y: 900, w: 1440, h: 100, fill: '#fff', log: 'about section' },
      { t: 'text', x: 136, y: 962, text: '—  ABOUT 8DIGIT', size: 12, weight: 700, ink: '#e3141b', log: 'section eyebrow' }
    ]
  };

  // Anything without a drawing of its own still gets a believable page.
  function generic(p){
    const title = p.name.split(' — ')[0];
    return [
      { t: 'rect', x: 0, y: 0, w: 1440, h: 1000, fill: '#0f1311', log: 'lay page canvas' },
      { t: 'rect', x: 0, y: 0, w: 1440, h: 64, fill: '#161b18', log: 'scaffold nav' },
      { t: 'text', x: 90, y: 22, text: title.toLowerCase().replace(/\s+/g, ''), size: 18, weight: 700, ink: '#5dffa0', log: 'set logotype' },
      { t: 'img',  x: 780, y: 150, w: 560, h: 520, radius: 14, fill: '#1a211d', log: 'place hero visual' },
      { t: 'text', x: 90, y: 200, w: 620, text: title, size: 58, weight: 600, ink: '#eef2ee', lh: 1.08, log: 'type headline' },
      { t: 'text', x: 90, y: 360, w: 560, text: (p.desc || '').split(/(?<=\.)\s/)[0], size: 18, ink: '#9aa59e', lh: 1.6, log: 'write subcopy' },
      { t: 'rect', x: 90, y: 560, w: 200, h: 54, radius: 27, fill: '#5dffa0', label: 'launch', ink: '#07120c', size: 14, log: 'call to action' },
      { t: 'rect', x: 90, y: 760, w: 400, h: 200, radius: 14, fill: '#161b18', log: 'card component' },
      { t: 'dup',  x: 520, y: 760, w: 400, h: 200, radius: 14, fill: '#161b18', log: 'duplicate card' },
      { t: 'dup',  x: 950, y: 760, w: 400, h: 200, radius: 14, fill: '#161b18', log: 'duplicate card' }
    ];
  }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let live = 0;                      // id of the build allowed to keep running

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const px = (v, of) => (v / of * 100) + '%';

  // Run a Web Animation and wait for it — but never longer than it should
  // take: a background tab pauses the animation timeline, and a build that
  // waits forever on a frozen animation would never finish. cancel() drops
  // a stalled animation so the element shows its end state.
  function play(node, frames, ms, easing){
    const a = node.animate(frames, { duration: ms, easing, fill: 'none' });
    return Promise.race([a.finished.catch(() => {}), sleep(ms + 60)]).then(() => a.cancel());
  }

  function el(tag, cls, parent){
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (parent) parent.appendChild(e);
    return e;
  }

  function cursorEl(m, layer){
    const c = el('div', 'swarm__cursor', layer);
    c.style.setProperty('--c', m.color);
    c.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 1l5.2 13.5 2-5.6 5.6-2z"/></svg>';
    el('span', 'swarm__tag', c).textContent = m.name;
    c.style.left = (20 + Math.random() * 60) + '%';
    c.style.top = '110%';
    return c;
  }

  // Cursors live in canvas percentages, so they track the drawing at any size.
  function moveTo(c, x, y, ms){
    const from = { left: c.style.left, top: c.style.top };
    const to = { left: px(x, W), top: px(y, H) };
    c.style.left = to.left; c.style.top = to.top;
    if (reduced) return Promise.resolve();
    return play(c, [from, to], ms, 'cubic-bezier(.45,.05,.2,1)');
  }

  // Site pixels → container width units, so type scales with the canvas.
  const cq = (v) => (v / W * 100).toFixed(3) + 'cqw';

  function place(node, j){
    node.style.left = px(j.x, W);
    node.style.top = px(j.y, H);
    if (j.w) node.style.width = px(j.w, W);
    if (j.h) node.style.height = px(j.h, H);
  }

  function rectNode(j, m, canvas){
    const r = el('div', 'swarm__box' + (j.t === 'img' ? ' swarm__box--img' : ''), canvas);
    place(r, j);
    r.style.setProperty('--c', m.color);
    if (!WIREFRAME){
      r.style.setProperty('--fill', j.fill || 'rgba(255,255,255,.04)');
      if (j.stroke) r.style.setProperty('--stroke', j.stroke);
    }
    if (j.radius) r.style.borderRadius = cq(j.radius);
    if (j.shadow && !WIREFRAME) r.classList.add('has-shadow');
    if (j.label){
      const s = el('span', 'swarm__label', r);
      s.textContent = j.label;
      if (!WIREFRAME) s.style.color = j.ink || '#fff';
      s.style.fontSize = cq(j.size || 14);
      if (j.font) s.dataset.font = j.font;
    }
    return r;
  }

  /* ---- the build ---------------------------------------------- */

  window.swarmBuild = async function (host, p, shot){
    const id = ++live;
    const alive = () => id === live && host.isConnected;

    host.textContent = '';
    const wrap = el('div', 'swarm', host);
    const win = el('div', 'swarm__win', wrap);
    const chrome = el('div', 'swarm__chrome', win);
    chrome.innerHTML = '<i></i><i></i><i></i>';
    const url = el('span', 'swarm__url', chrome);
    url.textContent = p.link ? p.link.replace(/^https?:\/\//, '') : (p.slug || 'local') + '.localhost';
    const status = el('span', 'swarm__status', chrome);
    // A way out to the real site, for every landing that has a `link`.
    if (p.link){
      const go = el('a', 'swarm__go', chrome);
      go.href = p.link;
      go.target = '_blank';
      go.rel = 'noopener';
      go.textContent = 'Visit site ↗';
      go.title = p.link;
    }
    const page = el('div', 'swarm__page', win);
    const canvas = el('div', 'swarm__canvas', page);
    // The running log under the window ("gemini duplicate badge" …) was removed
    // (06/11) so the site preview gets the full height; say() stays as a no-op
    // so the build steps keep their `log` labels for reading the code.
    const say = () => {};

    status.textContent = 'building';
    wrap.classList.add('is-building');

    // Start loading the screenshot now, while the crew draws, so it is
    // ready the instant the last stroke lands — no gap before the slide.
    let ready = Promise.resolve(null);
    if (shot){
      const pre = new Image();
      pre.className = 'swarm__shot';
      pre.alt = p.name;
      // Decode it too while the crew draws: a tall screenshot decoded only
      // when it is inserted froze the page for about a second right after
      // the last stroke. decode() can sit unresolved in a background tab,
      // so it races a short timeout and never holds the slide back.
      ready = new Promise(res => {
        pre.onload = () => {
          const decoded = pre.decode ? pre.decode().catch(() => {}) : Promise.resolve();
          Promise.race([decoded, sleep(2500)]).then(() => res(pre));
        };
        pre.onerror = () => res(null);
      });
      pre.src = shot;
    }

    const jobs = WIRES[p.slug] || generic(p);
    const crew = CREW.map(m => ({ ...m, node: cursorEl(m, canvas) }));
    let next = 0;

    async function work(m){
      while (alive() && next < jobs.length){
        const j = jobs[next++];
        say(m, j.log);
        await moveTo(m.node, j.x, j.y, reduced ? 0 : 340 + Math.random() * 240);
        if (!alive()) return;

        if (j.t === 'text'){
          const t = el('div', 'swarm__txt', canvas);
          place(t, j);
          Object.assign(t.style, {
            fontSize: cq(j.size || 16),
            fontWeight: j.weight || 400,
            color: WIREFRAME ? '' : (j.ink || '#fff'),
            lineHeight: j.lh || 1.15,
            textAlign: j.align || 'left'
          });
          if (j.font) t.dataset.font = j.font;
          t.style.setProperty('--c', m.color);
          if (reduced){ t.textContent = j.text; continue; }
          t.classList.add('is-typing');
          const step = Math.max(10, Math.min(38, 700 / j.text.length));
          for (let k = 1; k <= j.text.length && alive(); k++){
            t.textContent = j.text.slice(0, k);
            await sleep(step);
          }
          t.classList.remove('is-typing');
        } else {
          const r = rectNode(j, m, canvas);
          if (j.t === 'dup') r.classList.add('is-dup');
          if (!reduced){
            moveTo(m.node, j.x + j.w, j.y + j.h, 460);
            await play(r, [{ clipPath: 'inset(0 100% 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }],
                       460, 'cubic-bezier(.3,.7,.2,1)');
          }
          r.classList.add('is-set');
        }
        await sleep(reduced ? 0 : 40);
      }
    }

    // Staggered entrance, then everyone pulls from the same queue.
    await Promise.all(crew.map((m, i) => sleep(reduced ? 0 : i * 120).then(() => work(m))));
    if (!alive()) return;

    // Done: the crew drifts off while the real site slides straight in —
    // one continuous motion from the last stroke to the slideshow.
    crew.forEach((m, i) => moveTo(m.node, 1300 - i * 90, 1120, 600));
    wrap.classList.remove('is-building');
    wrap.classList.add('is-done');
    const img = await ready;
    if (!alive()) return;
    if (!img){
      status.textContent = 'built';
      say(crew[1], 'build complete — screenshot pending');
      return;
    }

    // The site goes in UNDER the drawing; the drawing is cut away from the
    // top down behind a bright edge, so the real page slides into view
    // exactly where its wireframe was, and keeps scrolling from there.
    page.insertBefore(img, canvas);
    status.textContent = 'live';
    say(crew[1], 'ship it — live site');
    if (!reduced){
      const h = page.clientHeight;
      const wipe = el('div', 'swarm__wipe', page);
      // Ease-out, not ease-in-out: the old curve barely moved for its first
      // ~300 ms, which read as a stall right after the drawing finished.
      const SLIDE = 820, EASE = 'cubic-bezier(.25,.75,.3,1)';
      await Promise.all([
        play(canvas, [{ clipPath: 'inset(0 0 0 0)' }, { clipPath: `inset(${h}px 0 0 0)` }], SLIDE, EASE),
        play(wipe, [{ transform: 'translateY(0)' }, { transform: `translateY(${h}px)` }], SLIDE, EASE)
      ]);
      wipe.remove();
    }
    if (!alive()) return;
    canvas.remove();
    page.classList.add('has-shot');
    if (!reduced) tour(page, alive);
  };

  /* A slow auto-scroll down the screenshot — the slideshow. Any wheel,
     touch or drag from the visitor hands control back for good. */
  function tour(page, alive){
    let stop = false;
    const quit = () => { stop = true; };
    ['wheel', 'pointerdown', 'touchstart', 'keydown'].forEach(e =>
      page.addEventListener(e, quit, { once: true, passive: true }));
    const start = performance.now();
    let last = start, pos = page.scrollTop;
    const SPEED = 70;                // px per second, once up to speed
    const step = (now) => {
      if (stop || !alive()) return;
      // Ease up to speed over the first second, so the hand-off from the
      // slide into the scroll has no visible joint.
      const ramp = Math.min(1, (now - start) / 1000);
      pos += SPEED * ramp * ramp * Math.min(.05, (now - last) / 1000);
      last = now;
      page.scrollTop = pos;
      if (pos < page.scrollHeight - page.clientHeight - 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Lets work.js stop a build that is mid-flight when the shelf closes.
  window.swarmStop = () => { live++; };
})();
