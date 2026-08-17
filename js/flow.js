/* ============================================================
   Workflow — what the PC case on the desk opens
   ------------------------------------------------------------
   Six components wired as one signal path, because that is what
   a computer actually is and what the work actually is: power
   comes in at one end, something finished leaves at the other,
   and every stage only ever gets what the stage before it
   handed over.

   The mapping is meant to be structural, not decorative — each
   part earns its step by doing the same JOB in the machine that
   the step does in the work. RAM is research because RAM holds
   a great deal at once and then clears; fans are feedback
   because a system under load needs somewhere to put the heat.
   If a step ever stops matching its part, swap the part rather
   than stretching the metaphor.

   It is a diagram and nothing else — no frame, no card chrome,
   just the parts and their wiring floating on the blurred desk.
   At rest it says only what each part is. Point at one and it
   grows, its writing arrives, and the trace lights up to it, so
   the path fills in as far as you have reached.

   Reading order is a serpentine: 01→02→03 across the top, then
   down and 04→05→06 back across the bottom. css/flow.css owns
   that geometry — it places 04/05/06 in reverse column order,
   so the DOM stays in plain 1..6 order and nothing here has to
   know about it.

   >>> EDIT ME: STEPS below is the whole content model.

   `part` / `full` — the component, short and spelled out.
   `step` / `role` — the stage of work, and its one-line job.
   `desc`          — the paragraph shown when the card is open.
   `spec`          — a line in PC-spec grammar that is really
                     about the work. Optional; drop it and the
                     line simply does not render.
   `icon`          — which drawing in PARTS below to use.

   >>> The `desc` texts are DRAFTS. They describe a plausible
       design process, not a verified account of yours — read
       each one and rewrite it in your own terms before this
       goes anywhere public.
   ============================================================ */

const STEPS = [
  {
    icon: 'psu',
    part: 'PSU',   full: 'Power supply',
    step: 'Brief', role: 'Where the work gets its energy',
    desc: 'Everything downstream inherits whatever comes out of here, so the first job is asking until the brief is clean. Dirty power, unstable machine.',
    spec: 'Input · one conversation, plus the questions nobody wrote down'
  },
  {
    icon: 'ram',
    part: 'RAM',      full: 'Memory',
    step: 'Research', role: 'Holding a great deal at once, briefly',
    desc: 'References, constraints, whatever already exists — all loaded at once so it can be compared rather than remembered. Most of it gets cleared.',
    spec: 'Capacity · 200 tabs, 3 survive'
  },
  {
    icon: 'cpu',
    part: 'CPU',     full: 'Processor',
    step: 'Concept', role: 'Fewer cores, harder problems',
    desc: 'The part that cannot be parallelised. One direction gets chosen and the rest thrown away, and no craft downstream rescues a wrong call here.',
    spec: 'Clock · runs fastest away from the screen'
  },
  {
    icon: 'gpu',
    part: 'GPU',    full: 'Graphics',
    step: 'Design', role: 'Where it becomes something you can look at',
    desc: 'Layout, type, colour, motion. Fast and cheap to redo, which is exactly why it belongs after the decision rather than instead of it.',
    spec: 'Output · the version you see, and six you do not'
  },
  {
    icon: 'fan',
    part: 'Cooling',  full: 'Fans',
    step: 'Feedback', role: 'What stops it burning out',
    desc: 'Any system under load needs somewhere to put the heat. Critique is not an interruption to the work — it is what stops it failing quietly.',
    spec: 'Curve · rises with load, never off'
  },
  {
    icon: 'ssd',
    part: 'SSD',     full: 'Storage',
    step: 'Handoff', role: 'What outlives the project',
    desc: 'Named so someone else can find it, documented well enough to extend without me. The project ends; the files stay in service.',
    spec: 'Retention · longer than the campaign'
  }
];

/* Line drawings of the parts, 64x48, stroked not filled — same weight as the
   rest of the page's chrome. Inserted as markup from this constant table
   only; nothing here is ever built from anything a visitor typed. */
const PARTS = {
  // A box with a fan grille and the kettle socket beside it.
  psu: '<rect x="4" y="11" width="56" height="27" rx="2"/>' +
       '<circle cx="21" cy="24.5" r="9"/><circle cx="21" cy="24.5" r="2"/>' +
       '<rect x="40" y="16" width="12" height="9" rx="1.5"/>' +
       '<path d="M40 31h12"/>',

  // A stick: board, four chips, an off-centre notch and contact teeth.
  ram: '<path d="M3 14h58v17H3z"/>' +
       '<rect x="8" y="18" width="10" height="8"/><rect x="21" y="18" width="10" height="8"/>' +
       '<rect x="34" y="18" width="10" height="8"/><rect x="47" y="18" width="8" height="8"/>' +
       '<path d="M25 31v3M28 31v3"/>' +
       '<path d="M7 31v4M12 31v4M17 31v4M34 31v4M39 31v4M44 31v4M49 31v4M54 31v4"/>',

  // Square die under a heat spreader, pins out all four sides, corner mark.
  cpu: '<rect x="18" y="8" width="28" height="28" rx="2"/>' +
       '<rect x="24.5" y="14.5" width="15" height="15" rx="1"/>' +
       '<path d="M21 11.5h2.5"/>' +
       '<path d="M18 15h-6M18 22h-6M18 29h-6M46 15h6M46 22h6M46 29h6"/>' +
       '<path d="M25 8V2M32 8V2M39 8V2M25 36v6M32 36v6M39 36v6"/>',

  // A card seen face-on: bracket at the left, long board, two fans.
  gpu: '<path d="M14 11h47v25H14z"/>' +
       '<circle cx="28" cy="23.5" r="6.5"/><circle cx="47" cy="23.5" r="6.5"/>' +
       '<path d="M14 6v35"/><path d="M6 13h8M6 19h8"/>',

  // Square frame, hub, four swept blades.
  fan: '<rect x="12" y="4" width="40" height="40" rx="4"/>' +
       '<circle cx="32" cy="24" r="5.5"/>' +
       '<path d="M32 18.5c0-7 3-11 9-11.5 1 6-2 10.5-9 11.5z"/>' +
       '<path d="M37.5 24c7 0 11 3 11.5 9-6 1-10.5-2-11.5-9z"/>' +
       '<path d="M32 29.5c0 7-3 11-9 11.5-1-6 2-10.5 9-11.5z"/>' +
       '<path d="M26.5 24c-7 0-11-3-11.5-9 6-1 10.5 2 11.5 9z"/>',

  // A 2.5" drive: body, label panel, connector block, screw points.
  ssd: '<rect x="5" y="10" width="54" height="28" rx="2.5"/>' +
       '<rect x="11" y="15" width="30" height="18" rx="1"/>' +
       '<path d="M50 17v14"/><path d="M46 19h4M46 23h4M46 27h4"/>' +
       '<circle cx="8.5" cy="13.5" r="1"/><circle cx="8.5" cy="34.5" r="1"/>'
};

(function () {
  'use strict';

  const el = (s) => document.querySelector(s);

  let root, boardEl;
  let cards = [];
  let at = -1;             // which step is lit; -1 is the resting diagram

  function svg(mark){
    return `<svg viewBox="0 0 64 48" fill="none" stroke="currentColor"
                 stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                 aria-hidden="true">${PARTS[mark] || ''}</svg>`;
  }

  function boot(){
    root    = el('#flow');
    boardEl = el('#flowBoard');

    root.querySelectorAll('[data-flow-close]').forEach(b =>
      b.addEventListener('click', closeFlow));

    buildBoard();
  }

  // Every part carries its own text, hidden until it is the live one. Held
  // inside the card rather than in one shared panel so the writing arrives
  // where the eye already is, and so nothing on the board moves when it
  // appears — css/flow.css takes it out of flow and floats it clear of the
  // diagram entirely.
  function buildBoard(){
    boardEl.textContent = '';
    cards = STEPS.map((s, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'flow__step';
      b.setAttribute('aria-label', `Step ${i + 1}: ${s.step} — ${s.full}`);

      // The part itself lives in its own wrapper because THAT is what grows
      // on hover. Scaling the button instead would take the traces with it —
      // they are its pseudo-elements — and a trace stretched past the gap
      // pokes into the part it is pointing at. The writing stays outside the
      // wrapper too, so it arrives at a steady size instead of swelling.
      const body = document.createElement('span');
      body.className = 'flow__body';

      const tag = document.createElement('span');
      tag.className = 'flow__tag';
      tag.textContent = `${String(i + 1).padStart(2, '0')} · ${s.part}`;

      const art = document.createElement('span');
      art.className = 'flow__art';
      art.innerHTML = svg(s.icon);

      const step = document.createElement('span');
      step.className = 'flow__stepName';
      step.textContent = s.step;

      body.append(tag, art, step);

      const info = document.createElement('span');
      info.className = 'flow__info';

      const role = document.createElement('span');
      role.className = 'flow__role';
      role.textContent = s.role;

      const desc = document.createElement('span');
      desc.className = 'flow__desc';
      desc.textContent = s.desc;

      // `full` (the part's spelled-out name) is deliberately NOT shown: the
      // drawing plus "01 · PSU" under it already says which part this is,
      // and every line here costs the diagram vertical room the hover text
      // has to float into. It stays in STEPS for the aria label.
      info.append(role, desc);

      if (s.spec){
        const spec = document.createElement('span');
        spec.className = 'flow__spec';
        spec.textContent = s.spec;
        info.appendChild(spec);
      }

      b.append(body, info);

      // Pointer drives it; focus mirrors it for the keyboard, and click is
      // what a touch screen has instead of a hover.
      b.addEventListener('pointerenter', () => light(i));
      b.addEventListener('focus',        () => light(i));
      b.addEventListener('click',        () => light(i));
      b.addEventListener('pointerleave', () => { if (at === i) light(-1); });
      b.addEventListener('blur',         () => { if (at === i) light(-1); });

      boardEl.appendChild(b);
      return b;
    });
  }

  // `is-done` marks every card BEFORE the live one. The trace drawn off each
  // card's right/left/bottom edge belongs to the hop LEAVING that card, so
  // lighting the done ones fills the path in exactly as far along as the part
  // under the cursor. At rest (-1) nothing is lit and it reads as a diagram.
  function light(i){
    at = i;
    cards.forEach((c, n) => {
      c.classList.toggle('is-on', n === i);
      c.classList.toggle('is-done', i >= 0 && n < i);
    });
  }

  // Lights the next part itself rather than leaving it to the focus handler:
  // calling focus() on the element that ALREADY has focus fires no event at
  // all, so a board reopened with a part still focused would never light
  // anything again. Setting it here first also means the blur that follows
  // sees `at` already moved on and so does not clear it.
  function walk(dir){
    const next = at < 0
      ? (dir > 0 ? 0 : STEPS.length - 1)          // from rest, enter at either end
      : (at + dir + STEPS.length) % STEPS.length;
    light(next);
    cards[next].focus();
  }

  /* ---- open / close ------------------------------------------- */

  // Same close dance as the shelf and the contact card: onFlowClose calls back
  // into deselect(), which calls closeFlow() again, so a flag breaks the loop.
  let closing = false;
  let closeTimer = 0;

  window.openFlow = function (){
    if (!root) boot();

    // Cancel a fade-out still in progress. Without this, reopening inside
    // the 320ms leaves `closing` true — so isFlowOpen() reads false, app.js
    // hands the arrow keys back to the desk, and the board sits there
    // ignoring the keyboard until the old timer happens to fire.
    clearTimeout(closeTimer);
    closing = false;

    // Drop focus a part may still be holding from last time, or the board
    // reopens looking unlit while the browser still thinks that part is
    // focused — and the first arrow press would then be swallowed as a
    // no-op focus() on the element that already has it.
    if (root.contains(document.activeElement)) document.activeElement.blur();

    light(-1);               // always opens as the plain diagram, nothing lit
    root.hidden = false;
    requestAnimationFrame(() => root.classList.add('is-open'));
  };

  window.closeFlow = function (){
    if (!root || root.hidden || closing) return;
    closing = true;
    root.classList.remove('is-open');
    closeTimer = setTimeout(() => {
      if (!root.classList.contains('is-open')) root.hidden = true;
      closing = false;
    }, 320);
    if (typeof window.onFlowClose === 'function') window.onFlowClose();
  };

  window.isFlowOpen = () => !!root && !root.hidden && !closing;

  window.flowKey = function (e){
    if (!window.isFlowOpen()) return false;
    if (e.key === 'Escape')                              { closeFlow(); return true; }
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { walk(1);     return true; }
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { walk(-1);    return true; }
    return true;                                   // swallow the rest while open
  };
})();
