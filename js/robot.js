/* ============================================================
   Robot face — lives on the little Mac's screen (assets/AI/AI.png)
   ------------------------------------------------------------
   Two glowing green eyes drawn in CSS (css/styles.css, "Robot
   face"), laid over the Mac's black glass in the same 4096 x 2287
   grid as every desk layer. It is pure decoration: pointer-events
   are off, so hovering and clicking still go through the hit map
   to the Mac itself.

   What it does:
     · blinks on its own, now and then twice in a row
     · every few seconds pulls a face from MOODS, then relaxes
     · its pupils follow the pointer around the page
     · hovering the Mac makes it happy; opening it, surprised

   >>> EDIT ME: SCREEN if the Mac artwork moves; MOODS to add or
       drop expressions (each name is a `.robot--<name>` CSS rule).
   ============================================================ */

(function () {
  'use strict';

  // The Mac's black glass, in canvas pixels (AI.png sits at 893, 1841).
  const SCREEN = { x: 926, y: 1884, w: 166, h: 118 };
  const CANVAS = { w: 4096, h: 2287 };

  // 'text' swaps the eyes for the section's name, "AI flow" — listed twice
  // so it turns up a little more often than any single face.
  const MOODS = ['happy', 'surprised', 'sleepy', 'angry', 'sad', 'wink', 'suspicious', 'love', 'text', 'text'];

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);

  let face, mac;
  let mood = '';          // the random face currently shown ('' = neutral)
  let held = '';          // a face forced by hover / open, wins over `mood`

  function boot(){
    mac = [...document.querySelectorAll('img.layer')].find(i => /assets\/AI\/AI\.png$/.test(i.src));
    if (!mac) return;

    face = document.createElement('div');
    face.className = 'robot';
    face.setAttribute('aria-hidden', 'true');
    face.style.left   = (SCREEN.x / CANVAS.w * 100) + '%';
    face.style.top    = (SCREEN.y / CANVAS.h * 100) + '%';
    face.style.width  = (SCREEN.w / CANVAS.w * 100) + '%';
    face.style.height = (SCREEN.h / CANVAS.h * 100) + '%';
    face.innerHTML = '<div class="robot__eyes">' +
      '<i class="robot__eye robot__eye--l"></i><i class="robot__eye robot__eye--r"></i></div>' +
      '<span class="robot__z">z</span>' +
      '<span class="robot__text">AI flow<b>_</b></span>';
    // A sibling of .scene, like the tower's LED: the lamp dims .scene as a
    // block, and a screen that is on should stay lit in the dark.
    const led = document.getElementById('led');
    (led || mac).after(face);

    // Follow the Mac's own state: lit when hovered, lifted above the
    // dimmer when picked — otherwise the face would sink behind it.
    new MutationObserver(sync).observe(mac, { attributes: true, attributeFilter: ['class'] });
    sync();

    if (!reduced){
      addEventListener('pointermove', look);
      blinkLater();
      moodLater();
    }
  }

  function sync(){
    const hot = mac.classList.contains('is-hot');
    const picked = mac.classList.contains('is-picked');
    face.classList.toggle('is-hot', hot);
    face.classList.toggle('is-picked', picked);
    held = picked ? 'surprised' : hot ? 'happy' : '';
    paint();
  }

  function paint(){
    const want = held || mood;
    face.className = face.className.replace(/\s?robot--[a-z]+/g, '');
    if (want) face.classList.add('robot--' + want);
  }

  /* ---- blinking ------------------------------------------------ */

  function blink(){
    face.classList.add('is-blink');
    setTimeout(() => face.classList.remove('is-blink'), 130);
  }

  function blinkLater(){
    setTimeout(() => {
      blink();
      if (Math.random() < .25) setTimeout(blink, 260);   // the odd double blink
      blinkLater();
    }, rand(2200, 5200));
  }

  /* ---- moods --------------------------------------------------- */

  function moodLater(){
    setTimeout(() => {
      const pool = MOODS.filter(m => m !== mood);
      mood = pool[Math.floor(Math.random() * pool.length)];
      paint();
      setTimeout(() => { mood = ''; paint(); moodLater(); }, rand(1600, 2800));
    }, rand(3500, 7500));
  }

  /* ---- looking ------------------------------------------------- */

  function look(e){
    const r = face.getBoundingClientRect();
    if (!r.width) return;
    const dx = (e.clientX - (r.left + r.width / 2)) / innerWidth;
    const dy = (e.clientY - (r.top + r.height / 2)) / innerHeight;
    // Clamped so the eyes never leave the glass.
    face.style.setProperty('--lx', Math.max(-1, Math.min(1, dx * 2.4)).toFixed(3));
    face.style.setProperty('--ly', Math.max(-1, Math.min(1, dy * 2.4)).toFixed(3));
  }

  // app.js builds the desk layers after its images load; wait for the Mac.
  (function wait(n){
    if (document.querySelector('img.layer[src*="assets/AI/AI.png"]')) boot();
    else if (n < 100) setTimeout(() => wait(n + 1), 100);
  })(0);
})();
