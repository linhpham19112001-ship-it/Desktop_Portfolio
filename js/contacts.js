/* ============================================================
   Contact hub — what the phone on the desk opens
   ------------------------------------------------------------
   The desk has two ways to reach a person and they do different
   jobs, so they are different objects:

     · the sticky note WRITES a message  — a form, hands off to
       the visitor's mail app (see bindContact in js/app.js)
     · the phone HANDS OVER the addresses — this file: every
       channel in one list, each one copyable and openable

   Nothing here is a form and nothing is submitted anywhere.

   >>> EDIT ME: ME and CHANNELS below are the whole content model.
       Every value is a placeholder until you replace it — the
       card marks unfilled rows so a fake handle cannot ship by
       accident. Delete rows you do not use; order is display
       order; `primary: true` promotes a row to the top block.
   ============================================================ */

const ME = {
  name:   'Nhat Linh',
  role:   'Graphic & Motion Designer',
  status: 'Open to freelance and collaboration'
};

const CHANNELS = [
  { key: 'email',     label: 'Email',     icon: 'mail',
    value: 'hello@example.com',            href: 'mailto:hello@example.com',
    primary: true,  copy: true },

  { key: 'phone',     label: 'Phone',     icon: 'phone',
    value: '+84 00 000 0000',              href: 'tel:+840000000000',
    primary: true,  copy: true },

  { key: 'linkedin',  label: 'LinkedIn',  icon: 'linkedin',
    value: 'linkedin.com/in/username',     href: 'https://linkedin.com/in/username' },

  { key: 'behance',   label: 'Behance',   icon: 'behance',
    value: 'behance.net/username',         href: 'https://behance.net/username' },

  { key: 'instagram', label: 'Instagram', icon: 'instagram',
    value: '@username',                    href: 'https://instagram.com/username' },

  { key: 'facebook',  label: 'Facebook',  icon: 'facebook',
    value: 'facebook.com/username',        href: 'https://facebook.com/username' },

  { key: 'youtube',   label: 'YouTube',   icon: 'youtube',
    value: 'youtube.com/@username',        href: 'https://youtube.com/@username' }
];

/* The address the sticky note's form sends to. Read from the table above so
   there is exactly one email in this project to keep current; app.js falls
   back to its own constant if this file ever fails to load. */
window.CONTACT_EMAIL = (CHANNELS.find(c => c.key === 'email') || {}).value || '';

/* Line marks, 24x24, stroked not filled — the same weight as the rest of the
   page's chrome. Inserted as markup from this constant table only; nothing
   here is ever built from user input. */
const MARKS = {
  mail:      '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  phone:     '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  linkedin:  '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v1.5A6 6 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  facebook:  '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
  youtube:   '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.42 8.59.42 8.59.42s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><path d="m9.75 15.02 5.75-3.27-5.75-3.27v6.54z"/>',
  // Behance has no line-icon convention worth copying at 17px; a stack of
  // sheets says "a body of work" and the row label says which site it is.
  behance:   '<rect x="3" y="3" width="13" height="13" rx="2"/><path d="M8 21h9a4 4 0 0 0 4-4V8"/>',
  copy:      '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  done:      '<path d="M20 6 9 17l-5-5"/>',
  open:      '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/>'
};

(function () {
  'use strict';

  const el = (s) => document.querySelector(s);

  let root, rowsEl, noteEl;
  let noteTimer = 0;

  function svg(mark){
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"
                 aria-hidden="true">${MARKS[mark] || ''}</svg>`;
  }

  // Anything still pointing at example.com or a literal "username" has not
  // been filled in yet. Flagged rather than hidden: a portfolio that ships a
  // dead Instagram link is worse than one that admits the row is unfinished.
  function isPlaceholder(c){
    return /example\.com|\busername\b|0{4,}/.test(c.value + ' ' + (c.href || ''));
  }

  function boot(){
    root   = el('#hub');
    rowsEl = el('#hubRows');
    noteEl = el('#hubNote');

    el('#hubName').textContent   = ME.name;
    el('#hubRole').textContent   = ME.role;
    el('#hubStatus').textContent = ME.status;

    root.querySelectorAll('[data-hub-close]').forEach(b =>
      b.addEventListener('click', closeHub));

    buildRows();
  }

  function buildRows(){
    rowsEl.textContent = '';
    // Primaries first regardless of where they sit in the table, so the two
    // ways to actually reach someone are never buried under the socials.
    const order = [...CHANNELS].sort((a, b) => (b.primary ? 1 : 0) - (a.primary ? 1 : 0));
    order.forEach(c => rowsEl.appendChild(row(c)));
  }

  function row(c){
    const wrap = document.createElement('div');
    wrap.className = 'hub__row' + (c.primary ? ' hub__row--primary' : '');

    const mark = document.createElement('span');
    mark.className = 'hub__mark';
    mark.innerHTML = svg(c.icon);

    // The whole middle block is the link. External destinations open in a new
    // tab; mailto:/tel: must not, or they leave a blank tab behind.
    const link = document.createElement('a');
    link.className = 'hub__text';
    link.href = c.href || '#';
    if (/^https?:/i.test(c.href || '')){
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    const label = document.createElement('span');
    label.className = 'hub__label';
    label.textContent = isPlaceholder(c) ? c.label + ' — not set yet' : c.label;

    const value = document.createElement('span');
    value.className = 'hub__value';
    value.textContent = c.value;

    link.append(label, value);

    const acts = document.createElement('div');
    acts.className = 'hub__acts';

    if (c.copy){
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hub__act';
      btn.title = 'Copy';
      btn.setAttribute('aria-label', 'Copy ' + c.label);
      btn.innerHTML = svg('copy');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        copy(c.value, btn, c.label);
      });
      acts.appendChild(btn);
    }

    const go = document.createElement('a');
    go.className = 'hub__act';
    go.href = c.href || '#';
    go.title = 'Open';
    go.setAttribute('aria-label', 'Open ' + c.label);
    go.innerHTML = svg('open');
    if (/^https?:/i.test(c.href || '')){
      go.target = '_blank';
      go.rel = 'noopener noreferrer';
    }
    acts.appendChild(go);

    wrap.append(mark, link, acts);
    return wrap;
  }

  /* Clipboard needs a secure context (https, or localhost while previewing),
     and even there the permission can be refused. So the textarea route is
     not just the http fallback — it is also what a rejected writeText falls
     back TO, because a refused promise still leaves the address uncopied and
     the visitor does not care whose fault that was. */
  function copy(text, btn, label){
    const done = () => {
      btn.classList.add('is-done');
      btn.innerHTML = svg('done');
      say(label + ' copied');
      setTimeout(() => {
        btn.classList.remove('is-done');
        btn.innerHTML = svg('copy');
      }, 1600);
    };

    const viaTextarea = () => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch { ok = false; }
      ta.remove();
      if (ok) done();
      else say('Could not copy — select it by hand');
    };

    if (navigator.clipboard && window.isSecureContext){
      navigator.clipboard.writeText(text).then(done, viaTextarea);
      return;
    }
    viaTextarea();
  }

  function say(msg){
    if (!noteEl) return;
    noteEl.textContent = msg;
    clearTimeout(noteTimer);
    noteTimer = setTimeout(() => { noteEl.textContent = ''; }, 2400);
  }

  /* ---- open / close ------------------------------------------- */

  window.openHub = function (){
    if (!root) boot();
    root.hidden = false;
    requestAnimationFrame(() => root.classList.add('is-open'));
  };

  // Same close dance as the shelf and the contact sheet: onHubClose calls back
  // into deselect(), which calls closeHub() again, so a flag breaks the loop.
  let closing = false;

  window.closeHub = function (){
    if (!root || root.hidden || closing) return;
    closing = true;
    root.classList.remove('is-open');
    say('');
    setTimeout(() => {
      if (!root.classList.contains('is-open')) root.hidden = true;
      closing = false;
    }, 320);
    if (typeof window.onHubClose === 'function') window.onHubClose();
  };

  window.isHubOpen = () => !!root && !root.hidden && !closing;
})();
