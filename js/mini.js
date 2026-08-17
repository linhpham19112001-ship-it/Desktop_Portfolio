/* ============================================================
   Mini desktop — a small computer living inside the CRT
   ------------------------------------------------------------
   Everything is authored on a fixed 906 x 702 grid (the native
   size of the screen mask), then scaled to fit by --k, which
   app.js sets on every layout.

   House rules, so it behaves like a real machine:
     · single click selects an icon, click the wallpaper to clear
     · double click opens it (single tap on touch)
     · windows drag by the title bar, resize by the corner grip
     · clicking a window raises it; only the top one looks active
     · minimise rolls the window up to its title bar (there is no
       taskbar in the artwork, so it has to stay reversible)
     · maximise fills the screen, restore puts it back
     · right click gives a desktop menu

   >>> EDIT ME: ICONS lays out the desktop, WINDOWS holds content.
   ============================================================ */

(function () {
  'use strict';

  const MINI_W = 906;
  const MINI_H = 702;

  /* Desktop layout. x/y are the icon's top-left on the 906 x 702 grid,
     matching the reference screenshot: system icons up top, tools down
     on the hill. Move these freely — nothing else depends on them. */
  const ICONS = [
    { key: 'about',        label: 'About me',     icon: 'assets/desktop/icon-about.png',        x:  73, y:  70 },
    { key: 'folder',       label: 'Folder',       icon: 'assets/desktop/icon-folder.png',       x: 179, y:  70 },

    { key: 'photoshop',    label: 'Photoshop',    icon: 'assets/desktop/icon-photoshop.png',    x:  73, y: 392 },
    { key: 'illustrator',  label: 'Illustrator',  icon: 'assets/desktop/icon-illustrator.png',  x: 179, y: 392 },
    { key: 'capcut',       label: 'Capcut',       icon: 'assets/desktop/icon-capcut.png',       x: 285, y: 392 },

    { key: 'claude',       label: 'Claude',       icon: 'assets/desktop/icon-claude.png',       x:  73, y: 519 },
    { key: 'aftereffects', label: 'After Effect', icon: 'assets/desktop/icon-aftereffects.png', x: 179, y: 519 },
    { key: 'premiere',     label: 'Premiere',     icon: 'assets/desktop/icon-premiere.png',     x: 285, y: 519 },
    { key: 'blender',      label: 'Blender',      icon: 'assets/desktop/icon-blender.png',      x: 391, y: 519 },
    { key: 'figma',        label: 'Figma',        icon: 'assets/desktop/icon-figma.png',        x: 497, y: 519 }
  ];

  const tool = (name, role, since, html) => ({
    title: name,
    w: 380, h: 250,
    html: `<h4>${name}</h4>${html}
           <ul>
             <li><b>Used for</b><i>${role}</i></li>
             <li><b>Since</b><i>${since}</i></li>
           </ul>`
  });

  const WINDOWS = {
    about: {
      title: 'About me',
      w: 460, h: 300,
      html: `<h4>Hello</h4>
             <p>Designer working across identity and interface. I like systems
                that stay useful long after the launch post.</p>
             <p>This desk is the real one, more or less. Open the folder for
                the work, or pull the sticky note off the monitor if you would
                rather just send me a message.</p>`
    },
    folder: {
      title: 'Folder',
      w: 470, h: 320,
      html: `<h4>Selected work</h4>
             <ul>
               <li><b>Ridgeline Identity</b><i>2026</i></li>
               <li><b>Field Notes App</b><i>2025</i></li>
               <li><b>Paper &amp; Pixel</b><i>2024</i></li>
               <li><b>Studio Halo Rebrand</b><i>2023</i></li>
             </ul>
             <p>Case studies are on the way — this list is a placeholder.</p>`
    },

    photoshop:    tool('Photoshop',    'Retouching, texture, mockups',   '2016',
                       `<p>Where the pixels get pushed. Most of the surface work on this desk started here.</p>`),
    illustrator:  tool('Illustrator',  'Logos, icons, vector systems',   '2016',
                       `<p>Anything that has to survive being printed the size of a building.</p>`),
    capcut:       tool('Capcut',       'Quick social cuts',              '2022',
                       `<p>Fast edits when the timeline does not deserve a real NLE.</p>`),
    claude:       tool('Claude',       'Writing, research, prototyping', '2024',
                       `<p>The pair programmer that built most of this desktop, honestly.</p>`),
    aftereffects: tool('After Effect', 'Motion, UI animation',           '2018',
                       `<p>Where static layouts learn to move.</p>`),
    premiere:     tool('Premiere',     'Long-form edit, colour',         '2018',
                       `<p>For the cuts that need a proper timeline.</p>`),
    blender:      tool('Blender',      '3D scenes, product renders',     '2021',
                       `<p>The scene you are looking at was staged in here.</p>`),
    figma:        tool('Figma',        'Product UI, design systems',     '2019',
                       `<p>Where the interface work actually lives.</p>`)
  };

  const COARSE = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  let topZ = 10;
  let opened = 0;
  let deskRoot = null;

  window.initMiniDesktop = function (root) {
    deskRoot = root;
    const iconLayer = root.querySelector('.mini__icons');
    const winLayer  = root.querySelector('.mini__windows');
    const menu      = root.querySelector('.mini__menu');

    buildIcons(iconLayer, winLayer);

    // Clicking bare wallpaper clears the selection and closes the menu.
    root.addEventListener('pointerdown', (e) => {
      if (!e.target.closest('.mini__menu')) hideMenu(menu);
      if (!e.target.closest('.mini__icon, .mini__win')) clearSelection(iconLayer);
    });

    root.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const onIcon = e.target.closest('.mini__icon');
      showMenu(menu, root, e, onIcon, winLayer);
    });
  };

  /* ---- icons -------------------------------------------------- */

  function buildIcons(layer, winLayer){
    ICONS.forEach((def) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'mini__icon';
      el.dataset.key = def.key;
      el.style.left = def.x + 'px';
      el.style.top  = def.y + 'px';

      const img = document.createElement('img');
      img.src = def.icon;
      img.alt = '';
      img.draggable = false;

      const label = document.createElement('span');
      label.textContent = def.label;

      el.append(img, label);

      el.addEventListener('click', () => {
        clearSelection(layer);
        el.classList.add('is-sel');
        if (COARSE) openWindow(winLayer, def.key);   // no double-tap on touch
      });
      el.addEventListener('dblclick', () => openWindow(winLayer, def.key));

      makeIconDraggable(el);
      layer.appendChild(el);
    });
  }

  function clearSelection(layer){
    layer.querySelectorAll('.mini__icon.is-sel').forEach(b => b.classList.remove('is-sel'));
  }

  /* Icons can be rearranged, like any desktop. A drag under a few pixels is
     treated as a click so selecting still works. */
  function makeIconDraggable(el){
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;

      let lastX = e.clientX, lastY = e.clientY;
      let x = parseFloat(el.style.left) || 0;
      let y = parseFloat(el.style.top)  || 0;
      let moved = 0;

      const move = (ev) => {
        const ratio = ratioOf();
        const dx = (ev.clientX - lastX) / ratio.x;
        const dy = (ev.clientY - lastY) / ratio.y;
        moved += Math.abs(ev.clientX - lastX) + Math.abs(ev.clientY - lastY);
        lastX = ev.clientX; lastY = ev.clientY;
        if (moved < 4) return;                       // still a click, not a drag
        x = clamp(x + dx, 0, MINI_W - el.offsetWidth);
        y = clamp(y + dy, 0, MINI_H - el.offsetHeight);
        el.style.left = Math.round(x) + 'px';
        el.style.top  = Math.round(y) + 'px';
      };
      const up = () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
      };

      el.setPointerCapture(e.pointerId);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    });
  }

  /* ---- windows ------------------------------------------------ */

  function openWindow(layer, key){
    const def = WINDOWS[key];
    if (!def) return;

    const existing = layer.querySelector(`[data-win="${key}"]`);
    if (existing){                       // already open: un-roll and raise it
      existing.classList.remove('is-min');
      focusWindow(layer, existing);
      return;
    }

    const w = def.w || 380;
    const h = def.h || 250;
    const step = opened++ % 6;

    const win = document.createElement('div');
    win.className = 'win mini__win';
    win.dataset.win = key;
    win.style.width  = w + 'px';
    win.style.height = h + 'px';
    win.style.left = clamp(110 + step * 26, 0, MINI_W - w) + 'px';
    win.style.top  = clamp(90  + step * 24, 0, MINI_H - h) + 'px';

    win.innerHTML =
      `<div class="win__bar">
         <span class="win__title"></span>
         <span class="win__buttons">
           <button class="win__btn" type="button" data-act="min" aria-label="Minimise">_</button>
           <button class="win__btn" type="button" data-act="max" aria-label="Maximise">&#9633;</button>
           <button class="win__btn" type="button" data-act="close" aria-label="Close">&#10005;</button>
         </span>
       </div>
       <div class="win__menu"><u>F</u>ile &nbsp; <u>E</u>dit &nbsp; <u>V</u>iew &nbsp; <u>H</u>elp</div>
       <div class="win__body"></div>
       <div class="win__grip"></div>`;

    win.querySelector('.win__title').textContent = def.title;
    win.querySelector('.win__body').innerHTML = def.html;

    const bar = win.querySelector('.win__bar');
    win.querySelector('[data-act="close"]').addEventListener('click', () => win.remove());
    win.querySelector('[data-act="min"]').addEventListener('click', () => {
      win.classList.remove('is-max');
      win.classList.toggle('is-min');
    });
    win.querySelector('[data-act="max"]').addEventListener('click', () => {
      win.classList.remove('is-min');
      win.classList.toggle('is-max');
    });
    // Double-clicking the bar unrolls a rolled-up window, else toggles maximise.
    bar.addEventListener('dblclick', () => {
      if (win.classList.contains('is-min')) win.classList.remove('is-min');
      else win.classList.toggle('is-max');
    });

    win.addEventListener('pointerdown', () => focusWindow(layer, win));

    makeWindowDraggable(win, bar);
    makeWindowResizable(win, win.querySelector('.win__grip'));

    layer.appendChild(win);
    focusWindow(layer, win);
  }

  function focusWindow(layer, win){
    win.style.zIndex = ++topZ;
    layer.querySelectorAll('.mini__win').forEach(w => w.classList.toggle('is-blur', w !== win));
  }

  /* Drag in mini-desktop units. The CRT is scaled — and scaled again when
     the view zooms — so screen pixels must be divided by the live ratio.
     Deltas are accumulated step by step, which stays correct even if the
     zoom is still easing while the drag is under way. */
  function makeWindowDraggable(win, bar){
    bar.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.win__btn')) return;
      if (win.classList.contains('is-max')) return;

      let lastX = e.clientX, lastY = e.clientY;
      let x = parseFloat(win.style.left) || 0;
      let y = parseFloat(win.style.top)  || 0;

      bar.setPointerCapture(e.pointerId);
      bar.classList.add('is-drag');

      const move = (ev) => {
        const ratio = ratioOf();
        x += (ev.clientX - lastX) / ratio.x;
        y += (ev.clientY - lastY) / ratio.y;
        lastX = ev.clientX; lastY = ev.clientY;
        win.style.left = Math.round(clamp(x, -win.offsetWidth + 80, MINI_W - 80)) + 'px';
        win.style.top  = Math.round(clamp(y, 0, MINI_H - 24)) + 'px';
      };
      const up = () => {
        bar.classList.remove('is-drag');
        bar.removeEventListener('pointermove', move);
        bar.removeEventListener('pointerup', up);
        bar.removeEventListener('pointercancel', up);
      };

      bar.addEventListener('pointermove', move);
      bar.addEventListener('pointerup', up);
      bar.addEventListener('pointercancel', up);
    });
  }

  function makeWindowResizable(win, grip){
    grip.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      if (win.classList.contains('is-max')) return;

      let lastX = e.clientX, lastY = e.clientY;
      let w = win.offsetWidth;
      let h = win.offsetHeight;

      grip.setPointerCapture(e.pointerId);

      const move = (ev) => {
        const ratio = ratioOf();
        w += (ev.clientX - lastX) / ratio.x;
        h += (ev.clientY - lastY) / ratio.y;
        lastX = ev.clientX; lastY = ev.clientY;
        win.style.width  = Math.round(clamp(w, 220, MINI_W)) + 'px';
        win.style.height = Math.round(clamp(h, 140, MINI_H)) + 'px';
      };
      const up = () => {
        grip.removeEventListener('pointermove', move);
        grip.removeEventListener('pointerup', up);
        grip.removeEventListener('pointercancel', up);
      };

      grip.addEventListener('pointermove', move);
      grip.addEventListener('pointerup', up);
      grip.addEventListener('pointercancel', up);
    });
  }

  /* ---- right-click menu --------------------------------------- */

  function showMenu(menu, root, e, iconEl, winLayer){
    const rect = root.getBoundingClientRect();
    const ratio = ratioOf();
    const x = (e.clientX - rect.left) / ratio.x;
    const y = (e.clientY - rect.top)  / ratio.y;

    menu.innerHTML = iconEl
      ? `<button data-cmd="open">Open</button>
         <hr>
         <button disabled>Rename</button>
         <button disabled>Delete</button>`
      : `<button data-cmd="arrange">Arrange icons</button>
         <button data-cmd="closeall">Close all windows</button>
         <hr>
         <button disabled>New folder</button>
         <button disabled>Properties</button>`;

    menu.hidden = false;
    menu.style.left = Math.round(clamp(x, 0, MINI_W - menu.offsetWidth)) + 'px';
    menu.style.top  = Math.round(clamp(y, 0, MINI_H - menu.offsetHeight)) + 'px';

    menu.querySelectorAll('button[data-cmd]').forEach(b => {
      b.addEventListener('click', () => {
        const cmd = b.dataset.cmd;
        if (cmd === 'open' && iconEl)  openWindow(winLayer, iconEl.dataset.key);
        if (cmd === 'arrange')         arrangeIcons(root);
        if (cmd === 'closeall')        winLayer.querySelectorAll('.mini__win').forEach(w => w.remove());
        hideMenu(menu);
      });
    });
  }

  function hideMenu(menu){ menu.hidden = true; }

  function arrangeIcons(root){
    root.querySelectorAll('.mini__icon').forEach((el) => {
      const def = ICONS.find(d => d.key === el.dataset.key);
      if (!def) return;
      el.style.left = def.x + 'px';
      el.style.top  = def.y + 'px';
    });
  }

  /* ---- helpers ------------------------------------------------ */

  // How many screen pixels one mini-desktop pixel currently occupies.
  // X and Y differ slightly: the lit glass is not quite the same shape as the
  // 906 x 702 grid, so app.js scales the two axes independently.
  function ratioOf(){
    if (!deskRoot) return { x: 1, y: 1 };
    const r = deskRoot.getBoundingClientRect();
    return { x: (r.width / MINI_W) || 1, y: (r.height / MINI_H) || 1 };
  }

  function clamp(v, lo, hi){ return Math.min(hi, Math.max(lo, v)); }
})();
