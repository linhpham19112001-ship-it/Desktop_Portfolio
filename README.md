# Nhat Linh Portfolio — interactive desk

A static site. No build step, no dependencies, no backend.
Everything needed to deploy is inside this folder.

---

## Preview locally

Double-click **`PREVIEW.bat`**. It starts a small local server and opens
the page. Close the black window to stop it.

If Node is not installed it just opens `index.html` directly — that works
too.

## Deploy

> **Trước khi deploy:** làm hết các việc trong `TODO-truoc-khi-deploy.md` (cắt ảnh Visual Design dài thành lát, đổi WebP, hai cỡ theo màn hình), nếu không trang sẽ nặng và giật trên điện thoại.

Upload the **contents of this folder** to any static host. There is
nothing to build or install.

`PREVIEW.bat` and `tools/` are only for local previewing. Uploading them
is harmless, but you can leave them out.

- Netlify / Vercel — drag this folder onto the dashboard
- GitHub Pages — commit it and point Pages at the folder
- Any web host — upload by FTP

The only server requirement: `.avif` must be served as `image/avif`.
Every host does this; the CRT texture just loses its grille if not.

---

## Where things live

```
Webdesk to deploy/
├── index.html          page shell + the mini-desktop template + contact form
├── PREVIEW.bat         local preview (not needed once deployed)
├── README.md           this file
├── css/
│   ├── mini.css        the machine inside the CRT (classic Windows chrome)
│   ├── styles.css      the page around it (HUD, panel, contact form, card, LED)
│   ├── work.css        the shelf every gallery on the desk opens into
│   └── flow.css        the workflow board, and the traces wiring it together
├── js/
│   ├── hitmap.js       generated — per-pixel hit map, do not hand-edit
│   ├── mini.js         the mini desktop: icons, windows, right-click menu
│   ├── work.js         the shelf: every category, project, and image count —
│   │                   the four books, Freelancer, and the camera's Photography
│   ├── flow.js         the workflow: six components, one per stage of the work
│   ├── contacts.js     every way to reach you, and the address app.js mails to
│   └── app.js          the desk: hotspots, zoom, lamp, cursors, contact form
├── tools/serve.js      the preview server (not needed once deployed)
└── assets/
    ├── scene/          the desk layers, straight from Photoshop
    ├── desktop/        wallpaper, app icons, CRT texture
    ├── work/           project shots, per category and project
    ├── photos/         the camera's shots — flat, no subfolders
    └── cursors/        the five pointer shapes
```

Source material that is **not** part of the running site — the PSD, the
PNG originals, the icon packs — lives one level up in
`_source (not deployed)/`.

---

## Editing

| Want to change | Edit |
| --- | --- |
| Shelf categories, projects, photos, image counts | `WORK` at the top of `js/work.js` |
| What a single project says about itself | that project's `desc` in `WORK` |
| A project's facts — year, industry, deliverable type | that project's `meta` in `WORK` |
| The software behind a project | that project's `tools` in `WORK` |
| The workflow stages, and which part stands for each | `STEPS` at the top of `js/flow.js` |
| Your name and job title | `ME` at the top of `js/contacts.js` |
| Any contact address or social handle | `CHANNELS` in `js/contacts.js` |
| Your email address | `CHANNELS` in `js/contacts.js` — **not** `app.js` |
| Text on a desk object (calendar, case…) | `ITEMS` at the top of `js/app.js` |
| A section's name on the labels layer | that object's `title` in `ITEMS` |
| Where a label sits | `tagAt: {x, y}` on that object in `ITEMS` |
| Which objects share one label | `tagAs: 'Name'` on each of them |
| Pointer shapes / order | `CURSORS` in `js/app.js` |
| Mini-desktop icon layout | `ICONS` at the top of `js/mini.js` |
| Mini-desktop window contents | `WINDOWS` in `js/mini.js` |
| CRT texture strength | `.mini__crt::before` in `css/mini.css` |
| How far the monitor zooms | `ZOOM_FILL` in `js/app.js` |
| Power-LED brightness / rhythm | `.led` in `css/styles.css` |

### Images

Desk layers and the XP wallpaper ship as **WebP q90** — the whole site is
about **0.9 MB**. The PNG originals are kept outside this folder in
`../_source (not deployed)/_png-originals/`.

Two things deliberately stay PNG:

- `assets/scene/desktop_0000_monitor-2.png` — the screen cutout mask. Its
  alpha decides the exact edge of the CRT glass, so it never gets touched.
- `assets/desktop/icon-*.png` and `assets/cursors/*.png` — pixel art. Lossy
  compression puts artefacts on hard pixel edges, and they are a few KB each.

When you re-export a layer from Photoshop, convert it to WebP before
dropping it in, or the payload jumps straight back up — the background
alone is 9.2 MB as PNG and 0.24 MB as WebP.

### The shelf

Every gallery on the desk — the four books, the Freelancer pile, and the
camera's Photography — is one entry in `WORK` at the top of `js/work.js`,
opened into the exact same sheet. Two shapes of entry:

- **Structured** (has `projects`) — a project list down the left, and on
  the right that project's name, its facts and words, and its shots. The
  name spans the full width on its own line; below it, `meta` (year,
  industry, deliverable type) and `tools` (the software behind it) sit in
  a fixed-width left column, with `desc` — the project's own words —
  starting level with them, not with the name, in the space that's left.
  See "Each project also carries" below for all three. Most categories run
  the campaign rhythm: slot 1 a full-bleed key visual, slots 2–4 a square
  trio, slots 5–6 a landscape pair, repeating every six shots.

  A lone six-shot cycle can't both stay a sensible size and fill the
  row on its own — its slots are fractions of whatever width the grid
  has, so shrinking the grid just means a narrower single column with
  dead space either side, never a smaller cycle that fills the row.
  So `fillGrid()` in `js/work.js` chunks a project's shots into
  fixed-width `.work__cycle` blocks, one per six shots, and
  `css/work.css` lets them wrap with plain flexbox — Motion and POSM
  run twelve shots today (two cycles), so two sit side by side and use
  the row's full width between them, wrapping to their own row if a
  third doesn't fit. Change a project's `shots` count in `WORK` and the
  number of cycles (and whether they wrap) follows automatically,
  nothing else to touch.

  **Branding is different at two levels.** The category itself does not
  run the campaign rhythm — an identity unfolds rather than repeating
  equal beats — and inside it, *each project* can run its own frame via
  a `frame` field on that project in `WORK`: `identity` (mark, then an
  asymmetric pair that swaps sides each cycle, then a portrait triptych),
  `mosaic` (an anchor-and-detail pair, then a quartet of squares),
  or `spotlight` (a lean cycle of a hero, an even pair, and a statement).
  All three live in `css/work.css`, matched on `[data-cat="branding"]
  [data-frame="..."]`, which `showProject()` sets per project — add a
  fourth frame there the same way, and any project can opt in by naming
  it. Branding does not chunk into side-by-side cycles the way the
  shared rhythm above does — an unfolding identity is one lane, and each
  frame is built to carry the panel's full width by itself.

  **Visual Design is `bare` right now.** Its artwork is going to be one
  large composite image per project — the whole campaign in a single tall
  piece — and that hasn't been designed yet, so the whole shelf is held
  empty: the project list on the left still works, but picking one opens
  a clean panel with no name, no facts, no description and no placeholder.
  `bare` is a category-level flag for exactly this — listed, but nothing
  to show yet. To wake it up, drop the flag, give a project `shots: 1`,
  and put the file at `assets/work/visual/<slug>/01.webp`.
- **Flat** (has `shots`, a number, instead) — no project list, every
  photo just part of one pile, laid out as a loose scrapbook wall
  instead of a catalogue grid. Freelancer and Photography are both this
  shape — "just show the pictures, don't divide it up" is the point of
  a flat entry, camera included. Runs the grid's full width — a masonry
  column flow has no fixed-size unit that needs a repeating partner to
  fill the row with, more columns already does that.

Each project also carries **`meta`**, **`tools`** and **`desc`** — facts
and toolkit on the left, words on the right:

- **`meta`** is an array of `{ label, value }` rows — `Year`, `Industry`,
  `Type`, or whatever facts actually fit that project (a POSM piece might
  want `Format` instead). No fixed label set; it renders whatever rows
  are there, in order, two to a line — see the `.work__metaRow` comment
  in `css/work.css` for how a lone third fact ends up under the second
  column instead of stranded under the first. Leave it off, or empty, and
  the project says its details aren't filled in yet rather than leaving
  a blank rail beside the paragraph.
- **`tools`** is an array of icon keys — `['figma', 'illustrator']` —
  drawn as small icons under `meta`, from the same icon files the mini
  desktop's own app icons use (`TOOL_ICONS` in `js/work.js`). Purely
  optional, the one field of the three with no placeholder: leave it off
  and no tools row appears, same as `spec` in `js/flow.js`. Only meant for
  a project with two or three `meta` facts today — see the `.work__tools`
  comment in `css/work.css` before adding it to one with four.
- **`desc`** is the project's own words. It is the one field in `WORK`
  that can't be generated, so an empty one says so on screen (dimmed and
  italic, like the hatched fill on an empty image slot) until you write
  it. Blank lines inside a `desc` become paragraph breaks, and it reads
  best at roughly 165–235 characters, which lands on three lines.

The category-level `blurb` describes the shelf; `meta`, `tools` and `desc`
together describe the one project you clicked. Flat piles have no project
to describe, and `bare` categories are holding empty on purpose, so none
of the three show at all.

> The `desc`, `meta` and `tools` values written so far are **drafts with
> invented specifics** — placeholders for voice, length and toolkit, not
> facts. Rewrite them against what actually happened on each project
> before this goes live.

Images live at:

```
assets/work/<category>/<project-slug>/01.webp     (structured)
                                      02.webp …

assets/work/<category>/01.webp                     (flat)
                      02.webp …
```

Photography is a flat entry that points somewhere else — see `folder` in
its `WORK` entry — so its shots live at `assets/photos/01.webp`,
`02.webp`, … instead of under `assets/work/`. Nothing else about it
differs from Freelancer.

The folders are already created for all 32 projects, plus `assets/photos/`
for the camera. Drop numbered WebP files in and they appear — no code
change needed unless the count differs from the `shots` number on that
entry, or the entry has no `shots` yet (every Visual Design project,
which is also `bare` — see above), in which case add one.

Any slot without a file yet draws as a striped placeholder printing the
exact path it is waiting for, so you can see the layout before shooting
anything, and the lightbox steps over the gaps.

### The workflow diagram

The PC case is the one object whose *inside* is the content: it opens six
components wired as a single signal path — `STEPS` at the top of
`js/flow.js`. Power comes in at one end and something finished leaves at
the other, and every stage only gets what the stage before it handed
over, which is both how the machine works and how the work works.

The mapping is meant to be structural rather than decorative. RAM is
research because RAM holds a great deal at once and then clears; fans are
feedback because a system under load needs somewhere to put the heat. If
a stage ever stops matching its part, swap the part rather than stretch
the metaphor.

**It is a diagram, not a panel** — no sheet, no frame, just the parts and
their wiring on the blurred desk, which is why the backdrop blurs harder
here than under the shelf or the contact card. At rest it says only what
each part is. Point at one and it grows, its writing arrives, and the
trace lights up to it so the path fills in as far as you have reached.

Three things in `css/flow.css` are load-bearing and easy to break:

- The serpentine (01→02→03 across, down, then 04→05→06 back) is done by
  placing the second row in *descending* columns, so the DOM stays in
  plain 1..6 order and `flow.js` never has to know the shape.
- Each part draws only the hop *leaving* it — the line as `::after`, the
  chevron as `::before` — which is why the last one draws nothing. The
  growth on hover is therefore on an inner `.flow__body`, **not** the
  button: scaling the button would stretch its traces past their gap and
  into the part they point at.
- The space above the board and below it is not padding, it is where the
  hover writing floats — top row up, bottom row down, so nothing is ever
  covered and no plate is needed behind the words. Its floor is in `rem`,
  not `vh`: the writing is a fixed number of lines and does not shrink
  with the window, so a vh-only reserve collapses exactly when it is
  needed. What gives on a short screen is `--art`, the drawing size.

> The step descriptions are **drafts**: a plausible design process, not a
> verified account of yours. Read each one and rewrite it in your own
> terms before this goes anywhere public.

### The labels layer

The **Labels** button in the bottom-left corner (or the <kbd>L</kbd> key)
names every section at once, for anyone who would rather read the desk
than poke at it. It is off by default — finding things is the point.

A label's text is that object's `title` in `ITEMS`, and it is centred on
the object automatically. Two optional fields tune that, and neither
changes what the object does:

- `tagAs: 'Portfolio'` — every item carrying the same string shares one
  label. This is what stops the five book spines, together about 100px
  wide, from stacking five pills on top of each other.
- `tagAt: {x, y}` — pin the label somewhere else, in the artwork's own
  4096 × 2287 grid. Use it when the middle of an object is a bad place
  for its name.

### The phone

The phone opens a contact card listing every channel: `ME` and
`CHANNELS` at the top of `js/contacts.js`. Each row can be opened or
copied; add and delete rows freely, and set `primary: true` on the ones
that should sit in the top block.

There is only one email address in this project, and it lives in
`CHANNELS`. The sticky note's mail form reads it from there, so the card
and the form can never drift apart. Any row still pointing at
`example.com` or a literal `username` is labelled **"not set yet"** on
the card itself, so a dead link cannot ship quietly.

### Adding lots of images later

Anything listed in `ITEMS` (`js/app.js`) is **downloaded before the desk
appears** — that is correct for the 15 desk layers, and wrong for
everything else.

So pictures never go in `ITEMS`. They go in one of the tables that build
their gallery on open, which means the files are fetched then and not a
moment sooner:

- project shots, and the camera's photos → `WORK` in `js/work.js`
- anything shown inside the CRT → `WINDOWS` in `js/mini.js`

### Adding or moving a desk object

`assets/scene/` holds the Photoshop layer exports under their original
names, so re-exporting overwrites them cleanly.

Two things must stay in step, or hover will hit the wrong object:

1. the order of `ITEMS` in `js/app.js` — index 0 is the topmost layer
2. `js/hitmap.js`, which is generated from that same list

If you add a layer, change a layer's `x`/`y`/`w`/`h`, or reorder the
list, `hitmap.js` has to be regenerated to match. Ask for it — it is a
one-off script, not something to edit by hand.

Positions are in the artwork's own pixel grid: **4096 × 2287**. The
mini desktop uses its own grid: **906 × 702**, the native size of the
screen mask.

---

## Known placeholders

- **Every row in `CHANNELS`** (`js/contacts.js`) — email, phone and all
  five socials still point at `example.com` / `username`. The card labels
  them "not set yet" until you replace them.
- Project names in the Folder window and the object panels are invented.
- `assets/work/` and `assets/photos/` are still empty — the folders exist,
  the pictures do not. Photography's `shots: 24` in `js/work.js` is a
  placeholder count — change it to however many you actually have.
