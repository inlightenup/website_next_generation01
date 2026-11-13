/* ==========================================================================
   inlightenup — shared script
   Builds the menu and footer for every page and runs the scroll motion.

   TO ADD A PAGE: add one line to MENU below (and to FOOTER if you want it
   there). It then appears on every page automatically.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- Edit these lists to change navigation site-wide ------------------- */
  var EMAIL = 'tahasiddiqui@inlightenup.org';

  // Contact prompt ("Start a conversation" / "Book an intro call").
  // BOOKING_URL: paste your calendar booking link (Microsoft Bookings, Calendly, Google Calendar...).
  //   While it is empty, "Book an intro call" collects preferred times and emails them to you.
  // FORM_ENDPOINT: optional form-service address (for example Formspree). With it, messages are
  //   delivered to your inbox directly; without it, the visitor's own email app opens, ready to send.
  var BOOKING_URL = '';
  var FORM_ENDPOINT = '';

  var MENU = [
    { label: 'Services', href: 'index.html#services' },
    { label: 'Methodology', href: 'index.html#methodology' },
    { label: 'Portfolio', href: 'portfolio.html' },
    { label: 'Advisory', href: 'advisory.html', tag: 'Coming soon' },
    { label: 'Who We Serve', href: 'index.html#clients' },
    { label: 'Proof', href: 'index.html#proof' },
    { label: 'Perspectives', href: 'index.html#perspectives' },
    { label: 'Team', href: 'team.html' },
    { label: 'Company', href: 'index.html#start' }
  ];

  var FOOTER = [
    { title: 'Services', links: [
      { label: 'Advisory Services', href: 'index.html#services' },
      { label: 'Capital Raise', href: 'index.html#services' },
      { label: 'ImpactIQ', href: 'index.html#services' },
      { label: 'K2 Capital', href: 'index.html#services' }
    ] },
    { title: 'Approach', links: [
      { label: 'Methodology', href: 'index.html#methodology' },
      { label: 'Who We Serve', href: 'index.html#clients' },
      { label: 'Case Studies', href: 'index.html#proof' },
      { label: 'Perspectives', href: 'index.html#perspectives' },
      { label: 'How to Start', href: 'index.html#start' }
    ] },
    { title: 'Company', links: [
      { label: 'Portfolio', href: 'portfolio.html' },
      { label: 'Advisory', href: 'advisory.html' },
      { label: 'Team', href: 'team.html' },
      { label: 'About', href: 'index.html#start' },
      { label: 'Contact', href: 'mailto:' + EMAIL }
    ] }
  ];

  var SOCIAL = [
    { label: 'inlightenup on Instagram', href: 'https://www.instagram.com/inlightenup/',
      icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8"/>' },
    { label: 'inlightenup on LinkedIn', href: 'https://www.linkedin.com/company/inlightenup/',
      icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>' }
  ];

  var TAGLINE = 'We seed ventures by building the structure before telling the story.';

  // Locations on the home-page globe. Add a line to add a place; LINKS lists which pairs are joined by an arc.
  var PLACES = [
    { name: 'New York', lat: 40.7, lon: -74.0 },
    { name: 'Brazil', lat: -15.8, lon: -47.9 },
    { name: 'Italy', lat: 41.9, lon: 12.5 }
  ];
  var LINKS = [[0, 2], [0, 1], [1, 2]];
  /* ------------------------------------------------------------------------ */

  window.__site = true;
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var file = location.pathname.split('/').pop() || 'index.html';
  var isHome = file === 'index.html';

  // On the home page, "index.html#services" becomes "#services" so it scrolls instead of reloading.
  function link(href) { return isHome && href.indexOf('index.html#') === 0 ? href.slice(10) : href; }
  function socialHTML(cls) {
    return '<div class="social ' + cls + '">' + SOCIAL.map(function (s) {
      return '<a href="' + s.href + '" aria-label="' + s.label + '"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' + s.icon + '</svg></a>';
    }).join('') + '</div>';
  }

  /* ---- Footer ------------------------------------------------------------ */
  var footer = doc.getElementById('footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="wrap site-footer__in"><div class="site-footer__cols">' +
      '<div><img class="site-footer__logo" src="assets/logo-white.png" alt="inlightenup" width="2028" height="1828" loading="lazy">' +
      '<p class="site-footer__about">An impact venture capital firm. New York · Brazil · Italy.</p></div>' +
      FOOTER.map(function (col) {
        return '<div><h2>' + col.title + '</h2><ul>' + col.links.map(function (l) {
          return '<li><a href="' + link(l.href) + '">' + l.label + '</a></li>';
        }).join('') + '</ul></div>';
      }).join('') +
      '</div><div class="site-footer__base">' + socialHTML('social--dark') +
      '<p class="site-footer__tagline">' + TAGLINE + '</p>' +
      '<p>© ' + new Date().getFullYear() + ' inlightenup · <a href="' + link('index.html#top') + '">Privacy Policy</a> · <a href="' + link('index.html#top') + '">Terms of Use</a></p>' +
      '</div></div>';
  }

  /* ---- Menu drawer ------------------------------------------------------- */
  var menu = doc.createElement('div');
  menu.className = 'menu';
  menu.id = 'menu';
  menu.innerHTML =
    '<button type="button" class="menu__scrim" data-menu-close aria-label="Close menu" tabindex="-1"></button>' +
    '<nav class="menu__panel" aria-label="Site menu">' +
    '<button type="button" class="icon-btn menu__close" data-menu-close aria-label="Close menu"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button>' +
    '<ul class="menu__list">' + MENU.map(function (m, i) {
      var current = m.href === file ? ' aria-current="page"' : '';
      return '<li style="--i:' + i + '"><a href="' + link(m.href) + '"' + current + '><span>' + m.label + '</span>' +
        (m.tag ? '<span class="tag">' + m.tag + '</span>' : '') + '</a></li>';
    }).join('') + '</ul>' + socialHTML('social--outline') + '</nav>';
  menu.inert = true;
  doc.body.appendChild(menu);

  var opener = doc.querySelector('[data-menu-open]');
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    menu.inert = !open;
    doc.body.style.overflow = open ? 'hidden' : '';
    if (opener) opener.setAttribute('aria-expanded', String(open));
    if (open) menu.querySelector('.menu__close').focus({ preventScroll: true });
    else if (opener) opener.focus({ preventScroll: true });
  }
  if (opener) opener.addEventListener('click', function () { setMenu(true); });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('[data-menu-close]') || e.target.closest('a')) setMenu(false);
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
  });

  /* ---- Contact prompt: "Start a conversation" and "Book an intro call" ----
     One dialog, two tabs. Every email link on the site opens it; a link with
     data-contact="call" opens the booking tab, and data-contact="direct" is
     left alone as a plain email link. */
  var ARROW = '<svg width="40" height="12" viewBox="0 0 40 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M0 6h38M32 1l6 5-6 5"/></svg>';
  function field(label, name, type, required, extra) {
    var attrs = ' name="' + name + '"' + (required ? ' required' : '') + (extra || '');
    return '<label class="field"><span>' + label + (required ? '' : ' <i>optional</i>') + '</span>' +
      (type === 'textarea' ? '<textarea rows="4"' + attrs + '></textarea>' : '<input type="' + type + '"' + attrs + '>') + '</label>';
  }
  var contact = doc.createElement('dialog');
  if (contact.showModal) {
    contact.className = 'contact';
    contact.setAttribute('aria-labelledby', 'contact-title');
    contact.innerHTML =
      '<div class="contact__in">' +
      '<button type="button" class="icon-btn contact__close" data-contact-close aria-label="Close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button>' +
      '<p class="eyebrow eyebrow--accent">Get in touch</p>' +
      '<h2 class="h-lg" id="contact-title"></h2>' +
      '<div class="contact__tabs" role="tablist">' +
      '<button type="button" role="tab" data-tab="message">Send a message</button>' +
      '<button type="button" role="tab" data-tab="call">Book an intro call</button>' +
      '</div>' +

      '<form class="contact__panel" data-panel="message">' +
      '<div class="field-row">' + field('Name', 'name', 'text', true, ' autocomplete="name"') + field('Email', 'email', 'email', true, ' autocomplete="email"') + '</div>' +
      field('Organization', 'organization', 'text', false, ' autocomplete="organization"') +
      field('Message', 'message', 'textarea', true) +
      '<button type="submit" class="btn">Send message' + ARROW + '</button>' +
      '<p class="note contact__status" role="status"></p>' +
      '</form>' +

      (BOOKING_URL
        ? '<div class="contact__panel" data-panel="call">' +
          '<p class="body">The intro call is a conversation about the entity, its stage and its goals. Choose a time that suits you and it goes straight into our calendar.</p>' +
          '<a class="btn" href="' + BOOKING_URL + '" target="_blank" rel="noopener" data-contact="direct">Choose a time' + ARROW + '</a>' +
          '<p class="note contact__status">The calendar opens in a new tab.</p>' +
          '</div>'
        : '<form class="contact__panel" data-panel="call">' +
          '<p class="body">The intro call is a conversation about the entity, its stage and its goals. Tell us when suits you and we will confirm a time by email.</p>' +
          '<div class="field-row">' + field('Name', 'name', 'text', true, ' autocomplete="name"') + field('Email', 'email', 'email', true, ' autocomplete="email"') + '</div>' +
          field('Organization', 'organization', 'text', false, ' autocomplete="organization"') +
          field('Days and times that suit you', 'availability', 'textarea', true, ' placeholder="For example: Tuesday or Thursday afternoon, New York time"') +
          '<button type="submit" class="btn">Request a call' + ARROW + '</button>' +
          '<p class="note contact__status" role="status"></p>' +
          '</form>') +
      '</div>';
    doc.body.appendChild(contact);

    var TITLES = { message: 'Start a conversation', call: 'Book an intro call' };
    var showTab = function (which) {
      contact.querySelector('#contact-title').textContent = TITLES[which];
      [].forEach.call(contact.querySelectorAll('[data-tab]'), function (t) {
        t.setAttribute('aria-selected', String(t.getAttribute('data-tab') === which));
      });
      [].forEach.call(contact.querySelectorAll('[data-panel]'), function (p) {
        p.hidden = p.getAttribute('data-panel') !== which;
      });
    };
    var openContact = function (which) {
      if (menu.classList.contains('is-open')) setMenu(false);
      showTab(which);
      if (!contact.open) contact.showModal();
      var first = contact.querySelector('[data-panel="' + which + '"] input, [data-panel="' + which + '"] a.btn');
      if (first) first.focus({ preventScroll: true });
    };

    contact.addEventListener('click', function (e) {
      var tab = e.target.closest('[data-tab]');
      if (tab) showTab(tab.getAttribute('data-tab'));
      // close on the X, or on a click outside the panel
      if (e.target.closest('[data-contact-close]') || e.target === contact) contact.close();
    });

    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      var form = e.target, isCall = form.getAttribute('data-panel') === 'call';
      var status = form.querySelector('.contact__status'), data = {}, lines = [];
      [].forEach.call(form.elements, function (el) { if (el.name) data[el.name] = el.value.trim(); });
      var subject = (isCall ? 'Intro call request' : 'New conversation') + ' — ' + data.name + (data.organization ? ', ' + data.organization : '');
      if (isCall) {
        try { data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (err) { /* older browsers */ }
        lines.push('I would like to book an intro call.', '', 'Times that suit me: ' + data.availability);
        if (data.timezone) lines.push('My time zone: ' + data.timezone);
      } else {
        lines.push(data.message);
      }
      lines.push('', data.name, data.organization, data.email);
      var body = lines.filter(function (l) { return l !== undefined && l !== null; }).join('\n').replace(/\n{3,}/g, '\n\n');
      var byEmail = function () {
        location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        status.innerHTML = 'Your email app should now be open with this ready to send. If nothing opened, write to <a class="u-link" data-contact="direct" href="mailto:' + EMAIL + '">' + EMAIL + '</a>.';
      };
      if (!FORM_ENDPOINT) { byEmail(); return; }
      status.textContent = 'Sending…';
      data._subject = subject;
      fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); status.textContent = isCall ? 'Thank you. We will confirm a time by email.' : 'Thank you. Your message is on its way to us.'; })
        .catch(byEmail);
    });

    doc.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="mailto:"], [data-contact]');
      if (!a || a.getAttribute('data-contact') === 'direct' || a.hasAttribute('data-contact-close')) return;
      e.preventDefault();
      openContact(a.getAttribute('data-contact') === 'call' ? 'call' : 'message');
    });
  }

  /* ---- Header: condense on scroll, reading-progress hairline ------------- */
  var header = doc.querySelector('.site-header');
  var hero = doc.querySelector('.hero');
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY, max = root.scrollHeight - window.innerHeight;
    // the hero recedes as you scroll away from it
    if (hero && !reduce) hero.style.setProperty('--hero-p', Math.min(1, y / hero.offsetHeight).toFixed(3));
    if (header) {
      header.classList.toggle('is-stuck', y > 24);
      header.style.setProperty('--progress', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
    }
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---- Scroll motion: .reveal, .line, .draw, [data-count] ---------------- */
  function countUp(el) {
    var m = el.textContent.match(/^(\D*)([\d,]+)(.*)$/);
    if (!m) return;
    var target = parseInt(m[2].replace(/,/g, ''), 10), commas = m[2].indexOf(',') > -1;
    var start = null, dur = Math.min(1600, 700 + target * 0.4);
    function frame(t) {
      if (start === null) start = t;
      var p = Math.min(1, (t - start) / dur), eased = 1 - Math.pow(1 - p, 3);
      var n = Math.round(target * eased);
      el.textContent = m[1] + (commas ? n.toLocaleString('en-US') : n) + m[3];
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var targets = [].slice.call(doc.querySelectorAll('.reveal, .line, .draw, [data-count]'));
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; });
      // Things that arrive together are staggered in reading order.
      batch.sort(function (a, b) { return a.compareDocumentPosition(b) & 4 ? -1 : 1; });
      var i = 0;
      batch.forEach(function (el) {
        io.unobserve(el);
        if (el.hasAttribute('data-count')) { countUp(el); if (!el.matches('.reveal, .line, .draw')) return; }
        el.style.setProperty('--d', Math.min(i++ * 80, 480) + 'ms');
        el.classList.add('in');
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.06 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- Section nav highlight (portfolio page) ---------------------------- */
  var spyLinks = [].slice.call(doc.querySelectorAll('[data-spy] a[href^="#"]'));
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        spyLinks.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + e.target.id;
          a.classList.toggle('is-active', on);
          if (on && a.scrollIntoView && a.parentNode.parentNode.scrollWidth > a.parentNode.parentNode.clientWidth) {
            a.parentNode.parentNode.scrollTo({ left: a.offsetLeft - 20, behavior: reduce ? 'auto' : 'smooth' });
          }
        });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    spyLinks.forEach(function (a) {
      var el = doc.getElementById(a.getAttribute('href').slice(1));
      if (el) spy.observe(el);
    });
  }

  /* ---- Home-page globe: a wireframe sphere drawn on canvas ----------------
     Real 3D projection, so the places sit at their true coordinates. It sways
     slowly rather than spinning, so all three stay in view. */
  var canvas = doc.querySelector('canvas.globe');
  if (hero && canvas && canvas.getContext) (function () {
    var ctx = canvas.getContext('2d'), RAD = Math.PI / 180;
    var W, H, R, cx, cy, col = {}, labels = true;
    var pointer = { x: 0, y: 0 }, ease = { x: 0, y: 0 };
    var started = null, onScreen = true, raf = 0;

    // The air around the globe, shared with the wallpapers: clouds of colour that circle slowly,
    // bands of light that sweep across, and dust rising. Positions are fractions of the hero's size.
    var AIR = {
      light: { band: .9, dust: .26, clouds: [
        { c: '111,144,232', a: .28, x: .72, y: .44, r: .40, ox: .10, oy: .10, k: 1, ph: 0 },
        { c: '111,144,232', a: .20, x: .18, y: .74, r: .40, ox: .12, oy: .08, k: 1, ph: 3.1 },
        { c: '0,181,226', a: .09, x: .92, y: .88, r: .34, ox: .10, oy: .06, k: 2, ph: 1.2 }] },
      dark: { band: .06, dust: .5, clouds: [
        { c: '0,50,161', a: .70, x: .72, y: .44, r: .48, ox: .10, oy: .10, k: 1, ph: 0 },
        { c: '122,0,70', a: .45, x: .16, y: .80, r: .44, ox: .12, oy: .08, k: 1, ph: 3.1 },
        { c: '0,181,226', a: .13, x: .50, y: .40, r: .38, ox: .18, oy: .12, k: 2, ph: 1.2 }] }
    };
    var BANDS = [{ at: .10, w: .30, k: 1, a: 1 }, { at: .58, w: .20, k: 1, a: .75 }, { at: .30, w: .12, k: 2, a: .5 }];
    var air = AIR.light, seed = 7, DUST = [], d;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    for (d = 0; d < 60; d++) DUST.push({ x: rnd(), y: rnd(), s: .8 + rnd() * 1.6, k: 1 + Math.floor(rnd() * 2), m: 1 + Math.floor(rnd() * 3), ph: rnd() * 6.28, a: .3 + rnd() * .7 });

    function unit(lat, lon) {
      var p = lat * RAD, l = lon * RAD;
      return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
    }
    // graticule: parallels and meridians every 20 degrees
    var lines = [], a, b, pts;
    for (a = -80; a <= 80; a += 20) { pts = []; for (b = 0; b <= 360; b += 5) pts.push(unit(a, b)); lines.push(pts); }
    for (b = 0; b < 360; b += 20) { pts = []; for (a = -90; a <= 90; a += 5) pts.push(unit(a, b)); lines.push(pts); }
    var places = PLACES.map(function (p) {
      return { name: p.name.toUpperCase(), v: unit(p.lat, p.lon),
        coord: Math.abs(p.lat).toFixed(1) + '° ' + (p.lat >= 0 ? 'N' : 'S') + '   ' + Math.abs(p.lon).toFixed(1) + '° ' + (p.lon >= 0 ? 'E' : 'W') };
    });
    // arcs: great-circle paths lifted off the surface
    var arcs = LINKS.map(function (l) {
      var p = places[l[0]].v, q = places[l[1]].v;
      var w = Math.acos(Math.max(-1, Math.min(1, p[0] * q[0] + p[1] * q[1] + p[2] * q[2]))), out = [], i, t, s1, s2, lift;
      for (i = 0; i <= 60; i++) {
        t = i / 60; s1 = Math.sin((1 - t) * w) / Math.sin(w); s2 = Math.sin(t * w) / Math.sin(w);
        lift = 1 + Math.min(.3, w * .2) * Math.sin(Math.PI * t);
        out.push([(p[0] * s1 + q[0] * s2) * lift, (p[1] * s1 + q[1] * s2) * lift, (p[2] * s1 + q[2] * s2) * lift]);
      }
      return out;
    });

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2), cs = getComputedStyle(hero);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var wide = W >= 1000;
      R = wide ? Math.min(H * .41, W * .3) : Math.min(W * .62, H * .36);
      cx = wide ? W * .71 : W * .62; cy = wide ? H * .46 : H * .4;
      labels = wide;
      air = doc.body.classList.contains('has-dark-hero') ? AIR.dark : AIR.light;
      col.line = cs.getPropertyValue('--g-line').trim() || '51,49,50';
      col.accent = cs.getPropertyValue('--g-accent').trim() || '236,0,140';
      col.text = cs.getPropertyValue('--g-text').trim() || '51,49,50';
    }
    function rgba(c, alpha) { return 'rgba(' + c + ',' + Math.max(0, Math.min(1, alpha)).toFixed(3) + ')'; }

    function draw(now) {
      if (started === null) started = now;
      var t = (now - started) / 1000;
      var intro = reduce ? 1 : Math.min(1, t / 2.2); intro = 1 - Math.pow(1 - intro, 3);
      ease.x += (pointer.x - ease.x) * .04; ease.y += (pointer.y - ease.y) * .04;
      var rot = (-40 + 20 * Math.sin(t * 2 * Math.PI / 24) + ease.x * 12) * RAD;
      var tilt = (13 - ease.y * 7) * RAD;
      var cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt), r = R * (.94 + .06 * intro);
      function proj(v) {
        var x = v[0] * cr - v[2] * sr, z = v[0] * sr + v[2] * cr;
        return [cx + r * x, cy - r * (v[1] * ct - z * st), v[1] * st + z * ct];
      }

      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = intro;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';

      // the air: every part repeats on a 20-second beat
      var beat = (t % 20) / 20, an = beat * 2 * Math.PI, big = Math.max(W, H), half = Math.sqrt(W * W + H * H) / 2, g, i, o, x, y, w, al;
      for (i = 0; i < air.clouds.length; i++) {
        o = air.clouds[i]; x = (o.x + o.ox * Math.cos(o.k * an + o.ph)) * W; y = (o.y + o.oy * Math.sin(o.k * an + o.ph)) * H;
        g = ctx.createRadialGradient(x, y, 0, x, y, o.r * big);
        g.addColorStop(0, rgba(o.c, o.a)); g.addColorStop(.5, rgba(o.c, o.a * .38)); g.addColorStop(1, rgba(o.c, 0));
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }
      ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(28 * RAD);
      for (i = 0; i < BANDS.length; i++) {
        o = BANDS[i]; x = -1.5 * half + ((o.at + beat * o.k) % 1) * 3 * half; w = o.w * half; al = air.band * o.a;
        g = ctx.createLinearGradient(x - w, 0, x + w, 0);
        g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.3, rgba('255,255,255', al * .35)); g.addColorStop(.5, rgba('255,255,255', al));
        g.addColorStop(.7, rgba('255,255,255', al * .35)); g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g; ctx.fillRect(x - w, -half, 2 * w, 2 * half);
      }
      ctx.restore();
      for (i = 0; i < DUST.length; i++) {
        o = DUST[i]; y = (((o.y - o.k * beat) % 1) + 1) % 1; x = o.x + .012 * Math.sin(an * o.m + o.ph);
        ctx.beginPath(); ctx.arc(x * W, y * H, o.s, 0, 7);
        ctx.fillStyle = rgba(col.accent, air.dust * o.a * (.5 + .5 * Math.sin(an * o.m + o.ph * 2)) * Math.sin(Math.PI * y)); ctx.fill();
      }
      // fade the air out toward the top and bottom of the hero, so it never ends in a hard line
      ctx.save(); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'destination-in';
      g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.16, '#000'); g.addColorStop(.84, '#000'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();

      // body of the sphere: a soft light from the upper left
      g = ctx.createRadialGradient(cx - r * .35, cy - r * .4, 0, cx, cy, r * 1.05);
      g.addColorStop(0, rgba(col.accent, .09)); g.addColorStop(1, rgba(col.accent, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();

      // graticule: far side faint, near side stronger
      var projected = lines.map(function (line) { return line.map(proj); });
      [false, true].forEach(function (front) {
        ctx.beginPath();
        projected.forEach(function (line) {
          var pen = false, i, p;
          for (i = 0; i < line.length; i++) {
            p = line[i];
            if ((p[2] >= 0) === front) { if (pen) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); pen = true; }
            else pen = false;
          }
        });
        ctx.lineWidth = 1; ctx.strokeStyle = rgba(col.line, front ? .2 : .06); ctx.stroke();
      });
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.lineWidth = 1.2; ctx.strokeStyle = rgba(col.line, .34); ctx.stroke();

      // orbit
      ctx.save(); ctx.setLineDash([2, 10]); ctx.lineDashOffset = -t * 5;
      ctx.beginPath(); ctx.arc(cx, cy, r * 1.17, 0, 7); ctx.strokeStyle = rgba(col.line, .3); ctx.stroke(); ctx.restore();
      var sa = t * .12;
      ctx.beginPath(); ctx.arc(cx + Math.cos(sa) * r * 1.17, cy + Math.sin(sa) * r * 1.17, 3, 0, 7); ctx.fillStyle = rgba(col.line, .7); ctx.fill();

      // arcs, each with a pulse of light travelling along it
      arcs.forEach(function (arc, n) {
        var p = arc.map(proj), i, head = ((t / 5 + n * .37) % 1.5), k, al;
        ctx.beginPath();
        for (i = 0; i < p.length; i++) { if (i) ctx.lineTo(p[i][0], p[i][1]); else ctx.moveTo(p[i][0], p[i][1]); }
        ctx.lineWidth = 1.1; ctx.strokeStyle = rgba(col.accent, .55); ctx.stroke();
        if (reduce) return;
        ctx.save(); ctx.shadowColor = rgba(col.accent, .8); ctx.shadowBlur = 10;
        for (i = 1; i < p.length; i++) {
          k = i / (p.length - 1); al = 1 - (head - k) / .26;
          if (k > head || al <= 0) continue;
          ctx.beginPath(); ctx.moveTo(p[i - 1][0], p[i - 1][1]); ctx.lineTo(p[i][0], p[i][1]);
          ctx.lineWidth = 2.4; ctx.strokeStyle = rgba(col.accent, al); ctx.stroke();
        }
        ctx.restore();
      });

      // places
      places.forEach(function (pl, n) {
        var p = proj(pl.v); if (p[2] <= 0) return;
        var near = Math.min(1, p[2] * 3), x = p[0], y = p[1], ph = reduce ? .4 : (t / 3 + n * .33) % 1;
        var glow = ctx.createRadialGradient(x, y, 0, x, y, 22);
        glow.addColorStop(0, rgba(col.accent, .45 * near)); glow.addColorStop(1, rgba(col.accent, 0));
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, y, 22, 0, 7); ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 5 + ph * 20, 0, 7); ctx.lineWidth = 1; ctx.strokeStyle = rgba(col.accent, (1 - ph) * .7 * near); ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fillStyle = rgba(col.accent, near); ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 1.5, 0, 7); ctx.fillStyle = rgba(col.text, near); ctx.fill();
        if (!labels) return;
        // caption: a hairline leader, the name, then its coordinates
        var up = y < cy ? -1 : 1, lx = x + 26, ly = y + 26 * up;
        ctx.beginPath(); ctx.moveTo(x + 7, y + 7 * up); ctx.lineTo(lx, ly); ctx.lineTo(lx + 22, ly);
        ctx.lineWidth = 1; ctx.strokeStyle = rgba(col.text, .5 * near); ctx.stroke();
        ctx.textBaseline = 'middle';
        if ('letterSpacing' in ctx) ctx.letterSpacing = '2.5px';
        ctx.font = '600 11px Inter, system-ui, sans-serif'; ctx.fillStyle = rgba(col.text, .95 * near);
        ctx.fillText(pl.name, lx + 30, ly);
        if ('letterSpacing' in ctx) ctx.letterSpacing = '.5px';
        ctx.font = '400 10px Inter, system-ui, sans-serif'; ctx.fillStyle = rgba(col.text, .55 * near);
        ctx.fillText(pl.coord, lx + 30, ly + 15);
      });
      ctx.globalAlpha = 1;
    }

    function loop(now) { draw(now); raf = (onScreen && !doc.hidden) ? requestAnimationFrame(loop) : 0; }
    function wake() { if (!raf && !reduce && onScreen && !doc.hidden) raf = requestAnimationFrame(loop); }
    resize(); draw(performance.now());
    window.addEventListener('resize', function () { resize(); draw(performance.now()); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { draw(performance.now()); });
    if (!reduce) {
      if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { onScreen = e[0].isIntersecting; wake(); }).observe(hero);
      doc.addEventListener('visibilitychange', wake);
      wake();
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        hero.addEventListener('pointermove', function (e) {
          var b = hero.getBoundingClientRect();
          pointer.x = (e.clientX - b.left) / b.width - .5; pointer.y = (e.clientY - b.top) / b.height - .5;
        });
        hero.addEventListener('pointerleave', function () { pointer.x = pointer.y = 0; });
      }
    }
  })();
})();
