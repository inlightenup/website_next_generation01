# inlightenup website

Static site for [inlightenup.org](https://www.inlightenup.org): impact venture capital.

## Files

- `index.html` — home
- `portfolio.html` — the six portfolio ventures
- `advisory.html` — advisory work (currently a "coming soon" page)
- `team.html` — team
- `site.css` — every style on the site, shared by all pages
- `site.js` — the menu, the footer and the scroll motion, shared by all pages
- `assets/` — logos, portraits, favicon and the methodology PDF

No build step: plain HTML, CSS and a small script, with Google Fonts. To preview, serve the folder (for example `python -m http.server`) and open the address it prints.

## Making changes

**Change wording.** Open the page's `.html` file and edit the text. Each section starts with a comment such as `<!-- ===== SERVICES ===== -->`.

**Change a colour, font or spacing everywhere.** Edit the tokens at the top of `site.css` (`--accent`, `--ink`, `--serif`, `--section`, …).

**Change the menu or footer links.** Edit the `MENU` and `FOOTER` lists at the top of `site.js`. Every page picks up the change.

**Add a page.** Copy `advisory.html`, rename it, replace what is inside `<main>`, then add one line to `MENU` in `site.js`.

**Add a portfolio venture or team member.** Copy an existing `<article class="project">` or `<article class="member">` block and edit it. Comments in those files mark the spot.

**Publish the advisory page.** Replace the three "In preparation" blocks in `advisory.html` with the real content, and remove `tag: 'Coming soon'` from the Advisory line in `site.js`.

## Motion

Motion is added with class names, so new content can opt in without writing any script:

- `class="reveal"` — the element fades up as it scrolls into view
- `class="line"` — a rule draws across the top first, then the contents follow (`line--soft` for a grey rule, `line--accent` for blue)
- `data-count` — a number counts up when it appears

Visitors who have "reduce motion" switched on in their device settings see the site without animation.

## Publishing with GitHub Pages

1. Push this folder to a repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**, pick the `main` branch and the `/ (root)` folder, then save.
4. The site goes live at `https://<username>.github.io/<repository>/` within a minute or two.
5. To use inlightenup.org, add the domain under **Custom domain** on the same page and point the domain's DNS at GitHub Pages (GitHub shows the exact records).

## Notes

Contact links point to `mailto:tahasiddiqui@inlightenup.org`. The Privacy Policy and Terms of Use links are placeholders until those pages exist.

## The dark hero, the globe and the navy panels

- **Dark hero.** `<body class="has-dark-hero">` turns a page's opening panel dark and its header white. `advisory.html` uses it. The home page is white; add the class to the `<body>` tag in `index.html` for the dark cinematic version.
- **Globe locations.** The home-page globe is drawn by `site.js`. Edit the `PLACES` list near the top of that file to add, move or rename a location (latitude and longitude), and `LINKS` to choose which pairs are joined by an arc.
- **Navy panels.** Any `<section class="bleed">` gets the deep navy background with the drifting line pattern. Colours are the `--accent-deep`, `--cream` and `--rose` tokens in `site.css`.

## Contact prompt

Every email link on the site opens one prompt with two tabs: **Send a message** and **Book an intro call**. It is built by `site.js`, so it is the same on every page.

- To send people to your calendar, paste your booking link into `BOOKING_URL` near the top of `site.js`. Until then, the booking tab asks for preferred times and emails them to you.
- By default, sending opens the visitor's own email app with the message filled in. To have messages delivered straight to your inbox instead, create a form with a service such as Formspree and paste its address into `FORM_ENDPOINT`.
- A link with `data-contact="call"` opens the booking tab. A link with `data-contact="direct"` stays a plain email link.

## The globe, the journey and the portfolio atlas

`atlas.js` and `atlas.css` draw the dotted globe and run the scroll scenes. They read ordinary content in the pages, so most changes need no script editing.

- **Home, places on the globe.** The three place links in the hero of `index.html` carry `data-lat` and `data-lon`. Edit those to move a place, or copy a link to add one.
- **Home, the journey.** Each `<article class="journey__step">` in `index.html` is one stop. `data-place` names the place the globe travels to. Add, remove or reorder steps freely.
- **Home, the stages path and the waterline.** Built from the stage list, the gates table and the two "waterline" blocks already in `index.html`. Edit the wording there. On phones the stages show as the plain list and table.
- **Portfolio atlas.** `portfolio.html` lists each place as a `<section class="place">` (name, `data-lat`, `data-lon`, `data-zoom`) holding its ventures as `<article class="project">` blocks. Copy a block to add one. A venture with its own `data-lat` and `data-lon` gets its own marker; without them it sits on its place. `portfolio.html#brazil` or `portfolio.html#goviq` opens straight to that place or venture.
- **Colours.** The charcoal, off-white and the two accents are the tokens at the top of `atlas.css`.
