/* ==========================================================================
   inlightenup atlas
   The dotted globe behind the logo on the home page, and the portfolio atlas
   (a globe you can turn, with places and ventures that open in a side panel).

   Nothing here needs editing to add a place or a venture: the atlas reads the
   <section class="place"> and <article class="project"> blocks in the page.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document, root = doc.documentElement, RAD = Math.PI / 180;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Land, as a grid of 1.5 degree cells (240 across, 120 down, one bit each).
     Made from Natural Earth's public-domain 1:110m land outline. */
  var LAND = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//8////44AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPx/n/////AAAA/AAYAAAAfAAAAAAAAAAAAAAAAEO3v4f////+AAAPgAAAAAAAAcAAAAAAAAAAAAAADAAAfgP////+AAAHAAAAAAAAAMAAAAAAAAAAAAAAA9jjCAAP///+AAAAAAAAHgAAP/8AAPAAAAAAAAAAcAAAAAAD///8AAAAAAAAYAAD//gAAAAAAAAAAAAAe6zs/AAB///4AAAAAAABgDA/////wGAAAAwAEAAAI/wM//AAf//////////xwHf/////z/+AAAAB//wPI/+sEP4A///wAAAAf8AACHf////////8B8P////////////////////8AAOcgEQAAAAAAAAAAAE////////////////////4AAHAAAgAAAAAAAAAAA5////////////////////wOB4AAAAAAAAAAAAAAAAAf///////Ng+AP4ADAAA/n////////////////+AD///////8COMAHwAAAAD/P///////////////v8AD/7/////4APwABgAAAAH/P//////////////wfAAA+AH////4APzAAAAAAAD/D/////////////JhgAAAFAAf///8AH/gAAAAAIAOD////////////4AHAAAAQAAP////wH/gAAAAAMBuP////////////wAPgAACAAAH////+f/8AAAAAWAhf////////////AAPAAAAAAAT////+f/+AAAAA3H//////////////+AOAAAAAAAB/////f/8AAAAAHn//////////////+AIAAAAAAAB//////8wAAAAAMf//////////////9AAAAAAAAAA//////2HAAAAAF///////////////4AAAAAAAAAAf/////+AgAAAAD///////////////4AAAAAAAAAAf//////wAAAAAB///yfx/////////wAAAAAAAAAAf/////yAAAAAAB/z/gPj/////////jAAAAAAAAAAf/////gAAAAAA/wY/gDx////////8HAAAAAAAAAAf/////AAAAAAA/gGfnn4////////wAAAAAAAAAAAf////+AAAAAAA/ACY//4///////1gGAAAAAAAAAAP////8AAAAAAA/ACM//4///////hwEAAAAAAAAAAH////4AAAAAAAOLgA//////////4wcAAAAAAAAAAH////4AAAAAAAN/gDC/////////wz8AAAAAAAAAAB////wAAAAAAAf/gAA/////////wDgAAAAAAAAAAA////AAAAAAAA//8YB/////////4EAAAAAAAAAAAAX///AAAAAAAA///f//////////4AAAAAAAAAAAAAX/5BAAAAAAAB//////z///////4AAAAAAAAAAAAAb/gBAAAAAAAH////8/5///////4AAAAAAAAAAAAAF/gBoAAAAAAP////+/4f//////wAAAAAAAAAAAAAE/gAAAAAAAAP////+f8wH/////gAAAAAAAAAAAAAAfgAAAAAAAAf/////P/4D/////IAAAAAAAAAAAAAAPgAQAAAAAAf/////v/8D/+f/4AAAAAAAAAAAAAAAPgwOAAAAAAf/////n/4Af8P+AAAAAAAAAAAAAAAAHxwAwAAAAAf/////n/wAfwH+wAAAAAAAAAAAAAAAB/gAAAAAAAf/////z/gAfgH+AMAAAAAAAAAAAAAAAT8AAAAAAAf/////z+AAfAF/AIAAAAAAAAAAAAAAAB+AAAAAAAf/////94AAOAB/gIAAAAAAAAAAAAAAAAMAAAAAAAf//////AAAOAA/gCAAAAAAAAAAAAAAAAEBQAAAAAP/////+MAAGAAHAFAAAAAAAAAAAAAAAACDfgAAAAH//////8AAGAACAAAAAAAAAAAAAAAAAABP/wAAAAH//////4AABABgADAAAAAAAAAAAAAAAAAP/4AAAAD//////4AABAAQABAAAAAAAAAAAAAAAAAP//gAAAA/H////wAAAACYBgAAAAAAAAAAAAAAAAAH//wAAAAAA////wAAAADYDAAAAAAAAAAAAAAAAAAP//wAAAAAA////gAAAABoPgAAAAAAAAAAAAAAAAAf//4AAAAAA///+AAAAAA4fuQAAAAAAAAAAAAAAAA///+AAAAAA///8AAAAAAYfASAAAAAAAAAAAAAAAA////AAAAAA///4AAAAAAcfYBYAAAAAAAAAAAAAAA////8AAAAAf//4AAAAAAOCEh/AAAAAAAAAAAAAAA/////AAAAAP//wAAAAAAGAAAPgAAAAAAAAAAAAAA/////gAAAAP//wAAAAAADIABPwIAAAAAAAAAAAAAf////gAAAAH//wAAAAAAAOAAPYCAAAAAAAAAAAAAP////AAAAAH//4AAAAAAAACAAMAAAAAAAAAAAAAAP///+AAAAAH//4AAAAAAAAAAAAAAAAAAAAAAAAAAH///+AAAAAH//4AAAAAAAAAHhAAAAAAAAAAAAAAAH///8AAAAAP//4IAAAAAAAAvjAAAAAAAAAAAAAAAD///8AAAAAP//4cAAAAAAAB/jgAAAAAAAAAAAAAAA///8AAAAAP//h4AAAAAAAD/7gAAAAAAAAAAAAAAAf//8AAAAAP//B4AAAAAAAH//wAAAAAAAAAAAAAAAf//4AAAAAH/+AwAAAAAAAf//4AQAAAAAAAAAAAAAf//4AAAAAH//BwAAAAAAB///8AIAAAAAAAAAAAAAf//gAAAAAD//BwAAAAAAD///+AAAAAAAAAAAAAAAf/8AAAAAAD/+BgAAAAAAD////AAAAAAAAAAAAAAAf/8AAAAAAD/8AAAAAAAAD////AAAAAAAAAAAAAAAf/8AAAAAAD/8AAAAAAAAD////AAAAAAAAAAAAAAA//4AAAAAAB/4AAAAAAAAB////AAAAAAAAAAAAAAA//wAAAAAAA/wAAAAAAAAB////AAAAAAAAAAAAAAA//gAAAAAAA/gAAAAAAAAB/h//AAAAAAAAAAAAAAA//AAAAAAAA+AAAAAAAAAB+Av+AAAAAAAAAAAAAAA/8AAAAAAAAAAAAAAAAAAAAAP8AAQAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAH8AAIAAAAAAAAAAAB/4AAAAAAAAAAAAAAAAAAAAADQAAOAAAAAAAAAAAB/gAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAB+AAAAAAAAAAAAAAAAAAAAAAAYAAIAAAAAAAAAAAB+AAAAAAAAAAAAAAAAAAAAAAAYAAwAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAADwAACAefH/gAAAAAAAAAAAAAAAAEAAAAAAAAAAAB//8B///////4AAAAAAAAAAAAAAA/AAAAAAAAAAH///8P////////8AAAAAAAAAAAAAB3gAAAAATf//////8//////////+AAAAAAAAAAAgAHgAAAAH////////////////////AAAAAAAB4B////gAAAAP///////////////////4AAAAD////////4AAAAD////////////////////gAAALP///////8AAAAD/////////////////////gAABj////////wAAHg//////////////////////4AAAAD///////8AQ/AB////////////////////+AAAAB//////////AGP//////////////////////AAAAA///////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', COLS = 240, ROWS = 120;

  function unit(lat, lon) {
    var p = lat * RAD, l = lon * RAD;
    return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
  }
  function landPoints() {
    var bin = window.atob(LAND), out = [], r, c, i, lat, stride, v;
    for (r = 0; r < ROWS; r++) {
      lat = 90 - (r + .5) * 180 / ROWS;
      stride = Math.max(1, Math.round(1 / Math.max(Math.cos(lat * RAD), .05)));  // fewer dots toward the poles
      for (c = 0; c < COLS; c += stride) {
        i = r * COLS + c;
        if (bin.charCodeAt(i >> 3) & (128 >> (i & 7))) { v = unit(lat, -180 + (c + .5) * 360 / COLS); out.push(v[0], v[1], v[2]); }
      }
    }
    return new Float32Array(out);
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function easeInOut(k) { return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; }
  function wrapLon(l) { return ((l + 180) % 360 + 360) % 360 - 180; }
  function coords(lat, lon) {
    return Math.abs(lat).toFixed(1) + '° ' + (lat >= 0 ? 'N' : 'S') + '  ' + Math.abs(lon).toFixed(1) + '° ' + (lon >= 0 ? 'E' : 'W');
  }
  function el(tag, cls, text) {
    var n = doc.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ------------------------------------------------------------------------
     Globe: draws on a <canvas>. Options:
       view    { lat, lon, zoom }   where it rests
       sway    degrees it drifts either side of the resting view (0 = still)
       places  [{ id, name, lat, lon }]
       links   [[0, 1], ...]        pairs of places joined by an arc
       points  [{ id, place, name, lat, lon }]   ventures, shown when their place is active
       layout  function (W, H, shift) -> { cx, cy, R }
       onPick  function ({ type: 'place' | 'point', id | ids })
       onMove  function (lat, lon, zoom)
     ------------------------------------------------------------------------ */
  function Globe(canvas, o) {
    var ctx = canvas.getContext('2d'), self = this;
    var W = 0, H = 0, col = {}, land = landPoints();
    var anchor = { lat: o.view.lat, lon: o.view.lon, zoom: o.view.zoom || 1 }, view = { lat: 0, lon: 0, zoom: 1 };
    var fly = null, drag = null, vel = 0, swayAmp = 1, shift = 0, shiftTo = 0;
    var started = null, raf = 0, onScreen = true, hits = [], active = null, focus = null, hoverHit = null, aim = null;
    var places = o.places || [], links = o.links || [], groups = [];

    // ventures that share a spot become one marker
    (o.points || []).forEach(function (p) {
      var key = p.lat + ',' + p.lon + ',' + p.place, g = null, i;
      for (i = 0; i < groups.length; i++) if (groups[i].key === key) g = groups[i];
      if (!g) { g = { key: key, place: p.place, lat: p.lat, lon: p.lon, ids: [], names: [], v: unit(p.lat, p.lon) }; groups.push(g); }
      g.ids.push(p.id); g.names.push(p.name);
    });
    places.forEach(function (p) { p.v = unit(p.lat, p.lon); });

    /* Scatter: with o.scatter the land dots start loose, drifting across the whole canvas, and
       assemble() gathers them into the globe. gather runs 0 (loose) to 1 (the globe). */
    var gather = o.scatter ? 0 : 1, gT0 = null, gMs = 0, loose = null, floaters = [], par = { x: 0, y: 0, tx: 0, ty: 0 };
    var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    if (o.scatter) {
      loose = new Float32Array(land.length / 3 * 4);
      for (var li = 0; li < loose.length; li += 4) { loose[li] = -.04 + rnd() * 1.08; loose[li + 1] = -.04 + rnd() * 1.08; loose[li + 2] = rnd() * .5; loose[li + 3] = rnd() * 6.283; }
    }
    // a few larger shapes that drift down either side, clear of the words in the middle, and lean with the pointer
    for (var fi = 0; fi < (o.floaters || 0); fi++) floaters.push({ x: (fi % 2 ? .04 : .72) + rnd() * .24, y: .1 + rnd() * .62, d: .3 + rnd() * .7, s: 5 + rnd() * 11, kind: fi % 4, ph: rnd() * 6.283, sp: .12 + rnd() * .2, accent: fi % 5 === 0 });
    if (floaters.length && !reduce) window.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      par.tx = e.clientX / window.innerWidth * 2 - 1; par.ty = e.clientY / window.innerHeight * 2 - 1;
    }, { passive: true });

    function measure() {
      var r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2), cs = getComputedStyle(canvas);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      col.dot = cs.getPropertyValue('--g-dot').trim() || '51,49,50';
      col.accent = cs.getPropertyValue('--g-accent').trim() || '0,50,161';
      col.text = cs.getPropertyValue('--g-text').trim() || '51,49,50';
      col.base = cs.getPropertyValue('--g-base').trim() || '250,250,250';
    }
    function rgba(c, a) { return 'rgba(' + c + ',' + clamp(a, 0, 1).toFixed(3) + ')'; }

    function draw(now) {
      if (started === null) started = now;
      var t = Math.max(0, now - started) / 1000, k, e, i, j, n;
      var intro = reduce ? 1 : Math.min(1, t / 2.6); intro = 1 - Math.pow(1 - intro, 3);
      if (gT0 !== null) { gather = gMs > 0 ? clamp((now - gT0) / gMs, 0, 1) : 1; if (gather >= 1) gT0 = null; }
      // while the dots are loose, the sphere's own lines stay out of sight; they draw in as the dots arrive
      var sc = gather < 1, introRaw = intro; intro *= clamp((gather - .5) / .5, 0, 1);
      par.x += (par.tx - par.x) * .05; par.y += (par.ty - par.y) * .05;

      // where we are looking
      if (fly) {
        k = (now - fly.t0) / fly.ms;
        if (k >= 1 || reduce) { anchor.lat = fly.lat; anchor.lon = fly.lon; anchor.zoom = fly.zoom; fly = null; }
        else {
          e = easeInOut(k);
          anchor.lat = fly.from.lat + (fly.lat - fly.from.lat) * e;
          anchor.lon = fly.from.lon + fly.dlon * e;
          anchor.zoom = fly.from.zoom + (fly.zoom - fly.from.zoom) * e - fly.hop * Math.sin(Math.PI * e);
        }
      } else if (aim && !drag) {   // being steered from outside (the scroll journey): ease toward the target
        e = reduce ? 1 : .075;
        anchor.lat += (aim.lat - anchor.lat) * e; anchor.lon += wrapLon(aim.lon - anchor.lon) * e; anchor.zoom += (aim.zoom - anchor.zoom) * e;
      } else if (!drag && Math.abs(vel) > .002) { anchor.lon -= vel; vel *= .93; }
      var still = reduce || drag || fly || active || hoverHit;
      swayAmp += ((still ? 0 : 1) - swayAmp) * .03;
      shift += (shiftTo - shift) * (reduce ? 1 : .07);
      view.lat = anchor.lat; view.zoom = anchor.zoom;
      view.lon = anchor.lon + (o.sway || 0) * swayAmp * Math.sin(t * 2 * Math.PI / (o.period || 40));
      if (o.onMove) o.onMove(view.lat, wrapLon(view.lon), view.zoom);

      var L = o.layout(W, H, shift), cx = L.cx + par.x * 8, cy = L.cy + par.y * 6, R = L.R * view.zoom * (.92 + .08 * intro);
      var cl = Math.cos(view.lon * RAD), sl = Math.sin(view.lon * RAD), cp = Math.cos(view.lat * RAD), sp = Math.sin(view.lat * RAD);
      function proj(v, lift) {
        var x = v[0] * cl - v[2] * sl, z1 = v[0] * sl + v[2] * cl, y = v[1] * cp - z1 * sp, z = v[1] * sp + z1 * cp, s = R * (lift || 1);
        return [cx + x * s, cy - y * s, z];
      }

      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';

      // glow behind the sphere, then the rim
      var g = ctx.createRadialGradient(cx, cy, R * .2, cx, cy, R * 1.5);
      g.addColorStop(0, rgba(col.accent, .10 * intro)); g.addColorStop(.6, rgba(col.accent, .04 * intro)); g.addColorStop(1, rgba(col.accent, 0));
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      g = ctx.createRadialGradient(cx - R * .4, cy - R * .5, 0, cx, cy, R);
      g.addColorStop(0, rgba(col.base, .9)); g.addColorStop(1, rgba(col.base, .35));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
      ctx.lineWidth = 1; ctx.strokeStyle = rgba(col.dot, .32 * intro); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();

      // orbit: a dotted ring that turns slowly, with four ticks
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(reduce ? 0 : t * .03);
      ctx.setLineDash([1, 9]); ctx.strokeStyle = rgba(col.dot, .5 * intro); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(0, 0, R * 1.09, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = rgba(col.accent, .9 * intro); ctx.lineWidth = 1.4;
      for (i = 0; i < 4; i++) { ctx.rotate(Math.PI / 2); ctx.beginPath(); ctx.moveTo(R * 1.07, 0); ctx.lineTo(R * 1.11, 0); ctx.stroke(); }
      ctx.restore();

      // graticule, near side only
      ctx.lineWidth = .7; ctx.strokeStyle = rgba(col.dot, .09 * intro); ctx.beginPath();
      var p, q, pen;
      for (i = -180; i < 180; i += 30) { pen = false; for (j = -84; j <= 84; j += 6) { p = proj(unit(j, i)); if (p[2] > 0) { if (pen) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); pen = true; } else pen = false; } }
      for (j = -60; j <= 60; j += 30) { pen = false; for (i = -180; i <= 180; i += 6) { p = proj(unit(j, i)); if (p[2] > 0) { if (pen) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); pen = true; } else pen = false; } }
      ctx.stroke();

      // land: dots, revealed from the centre outward as the page opens; the far side shows faintly through
      var size = clamp(R * .0058, 1, 3.2), half = size / 2, x, y, z, z1, b, a;
      var bucket = [[], [], [], [], [], []], m, gx, gy, fx, fy, dx, dy, len, bend, moving;
      for (i = 0, m = 0, n = land.length; i < n; i += 3, m++) {
        x = land[i] * cl - land[i + 2] * sl; z1 = land[i] * sl + land[i + 2] * cl;
        y = land[i + 1] * cp - z1 * sp; z = land[i + 1] * sp + z1 * cp;
        gx = cx + x * R; gy = cy - y * R; moving = false;
        if (sc) {   // on its way in from where it was drifting, along a slight curve
          j = m * 4; e = easeInOut(clamp(gather * 1.5 - loose[j + 2], 0, 1)); moving = e < 1;
          if (moving) {
            fx = loose[j] * W + Math.sin(t * .35 + loose[j + 3]) * 16 + par.x * 14; fy = loose[j + 1] * H + Math.cos(t * .28 + loose[j + 3] * 1.7) * 16 + par.y * 10;
            dx = gx - fx; dy = gy - fy; len = Math.hypot(dx, dy) || 1; bend = Math.sin(Math.PI * e) * Math.min(90, len * .3) * (m % 2 ? 1 : -1);
            gx = fx + dx * e - dy / len * bend; gy = fy + dy * e + dx / len * bend;
          }
        }
        if (z < 0) { if (z > -.96 && m % 2 === 0) bucket[0].push(gx, gy); else if (moving) bucket[5].push(gx, gy); continue; }
        if (!sc && intro < 1 && 1 - z > intro * 1.25) continue;
        b = z > .75 ? 4 : z > .5 ? 3 : z > .25 ? 2 : 1;
        bucket[b].push(gx, gy);
      }
      var alpha = sc ? [(.07 + .17 * (1 - gather)) * introRaw, .2 * introRaw, .34 * introRaw, .46 * introRaw, .56 * introRaw, .24 * (1 - gather) * introRaw] : [.07 * intro, .2, .34, .46, .56, 0];
      for (b = 0; b < 6; b++) {
        a = bucket[b]; if (!a.length) continue;
        ctx.fillStyle = rgba(col.dot, alpha[b]); ctx.beginPath();
        for (i = 0; i < a.length; i += 2) { if (a[i] < -4 || a[i] > W + 4 || a[i + 1] < -4 || a[i + 1] > H + 4) continue; ctx.rect(a[i] - half, a[i + 1] - half, size, size); }
        ctx.fill();
      }

      // drifting shapes: loud while the dots are loose, quiet once the globe has formed, and never over the globe itself
      floaters.forEach(function (f, idx) {
        if (W < 720 && (idx % 2 || f.y > .3)) return;
        var px = f.x * W + (reduce ? 0 : Math.sin(t * f.sp + f.ph) * 26 * f.d) + par.x * 40 * f.d, py = f.y * H + (reduce ? 0 : Math.cos(t * f.sp * .8 + f.ph) * 20 * f.d) + par.y * 28 * f.d;
        var away = clamp((Math.hypot(px - cx, py - cy) - R * 1.15) / (R * .3), 0, 1), al = (.2 + .4 * f.d) * introRaw * (1 - gather * (1 - away * .55)), s = f.s;
        if (al < .01) return;
        ctx.save(); ctx.translate(px, py); ctx.rotate(reduce ? f.ph : f.ph + t * f.sp * .5);
        ctx.strokeStyle = rgba(f.accent ? col.accent : col.dot, al); ctx.fillStyle = ctx.strokeStyle; ctx.lineWidth = 1.1; ctx.beginPath();
        if (f.kind === 0) { ctx.moveTo(0, -s); ctx.lineTo(s * .7, 0); ctx.lineTo(0, s); ctx.lineTo(-s * .7, 0); ctx.closePath(); ctx.stroke(); }
        else if (f.kind === 1) { ctx.arc(0, 0, s * .6, 0, 7); ctx.stroke(); }
        else if (f.kind === 2) { ctx.moveTo(-s * .6, 0); ctx.lineTo(s * .6, 0); ctx.moveTo(0, -s * .6); ctx.lineTo(0, s * .6); ctx.stroke(); }
        else { ctx.rect(-s * .22, -s * .22, s * .44, s * .44); ctx.fill(); }
        ctx.restore();
      });

      // arcs between places, each with a pulse of light travelling along it
      links.forEach(function (pair, idx) {
        var A = places[pair[0]].v, B = places[pair[1]].v, dot = A[0] * B[0] + A[1] * B[1] + A[2] * B[2];
        var om = Math.acos(clamp(dot, -1, 1)), so = Math.sin(om), pts = [], s, w1, w2, v, pr, lift, al, head;
        for (s = 0; s <= 48; s++) {
          k = s / 48; w1 = Math.sin((1 - k) * om) / so; w2 = Math.sin(k * om) / so;
          v = [A[0] * w1 + B[0] * w2, A[1] * w1 + B[1] * w2, A[2] * w1 + B[2] * w2];
          lift = 1 + .16 * Math.sin(Math.PI * k); pr = proj(v, lift);
          pts.push([pr[0], pr[1], pr[2] > 0 || Math.pow((pr[0] - cx) / R, 2) + Math.pow((pr[1] - cy) / R, 2) > 1]);
        }
        var dim = active ? .25 : 1, reach = Math.min(1, intro * 1.4);
        ctx.lineWidth = 1; ctx.strokeStyle = rgba(col.accent, .5 * dim * intro); ctx.beginPath(); pen = false;
        for (s = 0; s <= 48 * reach; s++) { if (pts[s][2]) { if (pen) ctx.lineTo(pts[s][0], pts[s][1]); else ctx.moveTo(pts[s][0], pts[s][1]); pen = true; } else pen = false; }
        ctx.stroke();
        if (reduce || active) return;
        head = ((t * .2 + idx * .41) % 1.35);
        ctx.save(); ctx.shadowColor = rgba(col.accent, .9 * intro); ctx.shadowBlur = 12; ctx.lineWidth = 2.2;
        for (s = 1; s <= 48; s++) {
          k = s / 48; al = 1 - (head - k) / .22;
          if (k > head || al <= 0 || !pts[s][2] || !pts[s - 1][2]) continue;
          ctx.strokeStyle = rgba(col.accent, al * intro); ctx.beginPath(); ctx.moveTo(pts[s - 1][0], pts[s - 1][1]); ctx.lineTo(pts[s][0], pts[s][1]); ctx.stroke();
        }
        ctx.restore();
      });

      // markers
      hits = [];
      var wide = W >= 720, beat = reduce ? .5 : (t % 2.6) / 2.6;
      function label(px, py, title, sub, strong) {
        if (!wide && !strong) return;
        var right = px >= cx, dx = right ? 1 : -1, lx = px + dx * 30;
        ctx.strokeStyle = rgba(col.text, .45); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(px + dx * 10, py); ctx.lineTo(lx - dx * 6, py); ctx.stroke();
        ctx.textAlign = right ? 'left' : 'right'; ctx.textBaseline = 'middle';
        ctx.font = '600 11px Inter, Arial, sans-serif'; ctx.fillStyle = rgba(col.text, .95);
        if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '1.6px';
        ctx.fillText(title.toUpperCase(), lx, sub ? py - 7 : py);
        if (sub) { ctx.font = '400 10px Inter, Arial, sans-serif'; ctx.fillStyle = rgba(col.text, .6); if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '.6px'; ctx.fillText(sub, lx, py + 8); }
        if (ctx.letterSpacing !== undefined) ctx.letterSpacing = '0px';
      }
      places.forEach(function (pl) {
        if (active === pl.id && groups.some(function (gr) { return gr.place === pl.id; })) return;   // its ventures are drawn instead
        p = proj(pl.v); if (p[2] < .08 || intro < .05) return;
        var fade = clamp((p[2] - .08) * 5, 0, 1) * intro * (active && active !== pl.id ? .45 : 1), hot = hoverHit && hoverHit.id === pl.id;
        ctx.strokeStyle = rgba(col.accent, (1 - beat) * .7 * fade); ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(p[0], p[1], 5 + beat * 20, 0, 7); ctx.stroke();
        ctx.fillStyle = rgba(col.base, fade); ctx.beginPath(); ctx.arc(p[0], p[1], hot ? 8 : 6.5, 0, 7); ctx.fill();
        ctx.fillStyle = rgba(col.accent, fade); ctx.beginPath(); ctx.arc(p[0], p[1], hot ? 5 : 3.6, 0, 7); ctx.fill();
        if (fade > .5 && o.labels !== false) label(p[0], p[1], pl.name, o.coords === false ? '' : coords(pl.lat, pl.lon));
        hits.push({ x: p[0], y: p[1], type: 'place', id: pl.id });
      });
      if (active) groups.forEach(function (gr) {
        if (gr.place !== active) return;
        p = proj(gr.v); if (p[2] < .05) return;
        var on = focus && gr.ids.indexOf(focus) > -1, hot = hoverHit && hoverHit.ids === gr.ids, s = on ? 8 : hot ? 7 : 5.5;
        if (on) { ctx.strokeStyle = rgba(col.accent, (1 - beat) * .8); ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p[0], p[1], 8 + beat * 22, 0, 7); ctx.stroke(); }
        ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(Math.PI / 4);
        ctx.shadowColor = rgba(col.accent, .9); ctx.shadowBlur = on ? 18 : 10;
        ctx.fillStyle = on ? rgba(col.accent, 1) : rgba(col.base, 1); ctx.strokeStyle = rgba(col.accent, 1); ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.rect(-s, -s, s * 2, s * 2); ctx.fill(); ctx.stroke(); ctx.restore();
        label(p[0], p[1], gr.ids.length > 1 ? gr.ids.length + ' ventures' : gr.names[0], '', true);
        hits.push({ x: p[0], y: p[1], type: 'point', ids: gr.ids, id: gr.ids[0] });
      });
    }

    function loop(now) { raf = 0; draw(now); if (onScreen && !doc.hidden) raf = requestAnimationFrame(loop); }
    function wake() { if (!raf && onScreen && !doc.hidden) raf = requestAnimationFrame(loop); }

    // turning the globe by hand, and picking markers
    function hitAt(e) {
      var r = canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, best = null, d, bd = 26, i;
      for (i = 0; i < hits.length; i++) { d = Math.hypot(hits[i].x - x, hits[i].y - y); if (d < bd) { bd = d; best = hits[i]; } }
      return best;
    }
    canvas.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      drag = { x: e.clientX, y: e.clientY, moved: false, hit: hitAt(e) }; vel = 0;
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!drag) { hoverHit = hitAt(e); canvas.style.cursor = hoverHit ? 'pointer' : 'grab'; return; }
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y, L = o.layout(W, H, shift), k = 57.3 / (L.R * anchor.zoom);
      if (!drag.moved && Math.hypot(dx, dy) < 5) return;
      drag.moved = true; fly = null; canvas.style.cursor = 'grabbing';
      anchor.lon -= dx * k; anchor.lat = clamp(anchor.lat + dy * k, -70, 70); vel = dx * k;
      drag.x = e.clientX; drag.y = e.clientY;
    });
    function release(e) {
      if (!drag) return;
      var d = drag; drag = null; canvas.style.cursor = 'grab';
      if (!d.moved && d.hit && e.type === 'pointerup' && o.onPick) o.onPick(d.hit);
    }
    canvas.addEventListener('pointerup', release);
    canvas.addEventListener('pointercancel', release);
    canvas.addEventListener('pointerleave', function () { hoverHit = null; });

    this.flyTo = function (lat, lon, zoom, ms) {
      var dlon = wrapLon(lon - anchor.lon), z = zoom || anchor.zoom, far = Math.min(1, (Math.abs(dlon) + Math.abs(lat - anchor.lat)) / 90);
      fly = { t0: performance.now(), ms: ms || 1600, from: { lat: anchor.lat, lon: anchor.lon, zoom: anchor.zoom }, lat: lat, lon: anchor.lon + dlon, dlon: dlon, zoom: z, hop: .3 * far * Math.min(anchor.zoom, z) };
      vel = 0; wake();
    };
    this.zoomBy = function (f) { self.flyTo(anchor.lat, anchor.lon, clamp(anchor.zoom * f, .8, 3.4), 600); };
    this.setActive = function (id) { active = id; focus = null; };
    this.setFocus = function (id) { focus = id; };
    this.setShift = function (v) { shiftTo = v; };
    this.aim = function (a) { aim = a; wake(); };
    this.setHover = function (id) { hoverHit = id ? { id: id } : null; };
    this.assemble = function (ms) { gT0 = performance.now(); gMs = reduce ? 0 : (ms || 2600); wake(); };
    this.render = function (now) { measure(); draw(now); };   // one frame on demand

    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { onScreen = en[0].isIntersecting; wake(); }).observe(canvas);
    doc.addEventListener('visibilitychange', wake);
    window.addEventListener('resize', function () { measure(); if (!raf) draw(performance.now()); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(function () { if (!raf) draw(performance.now()); });
    canvas.style.cursor = 'grab';
    measure(); wake();
    if (!raf) draw(performance.now());
  }

  /* ------------------------------------------------------------------------
     Home: the globe behind the logo. Places come from the links in the hero
     that carry data-lat and data-lon.
     ------------------------------------------------------------------------ */
  var homeCanvas = doc.querySelector('canvas[data-globe="home"]');
  if (homeCanvas) (function () {
    var chips = [].slice.call(doc.querySelectorAll('[data-place][data-lat]')), rest = { lat: 14, lon: -34, zoom: 1 };
    var places = chips.map(function (a) { return { id: a.getAttribute('data-place'), name: a.getAttribute('data-name') || a.textContent, lat: +a.getAttribute('data-lat'), lon: +a.getAttribute('data-lon'), href: a.getAttribute('href') }; });
    var links = []; places.forEach(function (p, i) { if (places.length > 1) links.push([i, (i + 1) % places.length]); });
    var gate = doc.querySelector('[data-gate]'), gated = !!gate && root.classList.contains('gate-open');
    var globe = new Globe(homeCanvas, {
      view: rest, sway: 14, period: 44, places: places, links: links, scatter: gated, floaters: 16,
      // shift 0: centred behind the logo. shift 1 (during the journey): moved aside to leave room for the words
      layout: function (W, H, shift) {
        var wide = W >= 860;
        return wide ? { cx: W * (.5 + .2 * shift), cy: H * (.45 + .05 * shift), R: Math.min(H * .36, W * .32) }
                    : { cx: W / 2, cy: H * (.4 - .12 * shift), R: Math.min(H * .3, W * .44) };
      },
      onPick: function (hit) { places.forEach(function (p) { if (p.id === hit.id && p.href) window.location.href = p.href; }); }
    });
    // pointing at a place name turns the globe so that place sits clear of the logo
    var pointing = false;
    chips.forEach(function (a, i) {
      function near() { pointing = true; globe.aim(null); globe.setHover(places[i].id); globe.flyTo(clamp(places[i].lat - 16, -40, 40), places[i].lon - 34, 1.06, 1500); }
      function away() { pointing = false; globe.setHover(null); globe.flyTo(rest.lat, rest.lon, rest.zoom, 1700); update(); }
      a.addEventListener('mouseenter', near); a.addEventListener('focus', near);
      a.addEventListener('mouseleave', away); a.addEventListener('blur', away);
    });

    /* The journey: the globe stays on screen while the page scrolls, and scrolling is the camera.
       Each <article class="journey__step"> is one stop. A step with data-place travels to that place. */
    var journey = doc.querySelector('.journey'), steps = journey ? [].slice.call(journey.querySelectorAll('.journey__step')) : [];
    var pin = journey && journey.querySelector('.journey__pin'), logo = journey && journey.querySelector('.stage__logo'), foot = journey && journey.querySelector('.stage__foot');
    var keys = [{ lat: rest.lat, lon: rest.lon, zoom: rest.zoom, place: null }], ticks = [], lastNear = -1;
    steps.forEach(function (st) {
      var id = st.getAttribute('data-place'), p = null;
      places.forEach(function (x) { if (x.id === id) p = x; });
      keys.push(p ? { lat: p.lat, lon: p.lon, zoom: +st.getAttribute('data-zoom') || 1.5, place: id } : { lat: rest.lat, lon: rest.lon, zoom: .92, place: null });
    });
    if (steps.length && pin) {
      var rail = el('nav', 'journey__rail'); rail.setAttribute('aria-label', 'Stops on this journey');
      steps.forEach(function (st, i) {
        var b = el('button', 'journey__tick'); b.type = 'button';
        b.innerHTML = '<span></span><i></i>'; b.querySelector('span').textContent = st.getAttribute('data-label') || '';
        b.addEventListener('click', function () {
          var top = journey.getBoundingClientRect().top + window.scrollY, total = journey.offsetHeight - window.innerHeight;
          window.scrollTo({ top: top + total * (i + 1) / steps.length, behavior: reduce ? 'auto' : 'smooth' });
        });
        rail.appendChild(b); ticks.push(b);
      });
      pin.appendChild(rail);
      root.classList.add('journey-on');
    }
    function update() {
      if (!steps.length) return;
      var r = journey.getBoundingClientRect(), total = r.height - window.innerHeight, s = total > 0 ? clamp(-r.top, 0, total) / total * steps.length : 0;
      var i = Math.min(Math.floor(s), steps.length - 1), f = easeInOut(clamp((s - i - .3) / .5, 0, 1)), A = keys[i], B = keys[i + 1];
      var near = f > .5 ? i + 1 : i, out = clamp(s * 2.4, 0, 1);
      if (!pointing) globe.aim({ lat: A.lat + (B.lat - A.lat) * f, lon: A.lon + wrapLon(B.lon - A.lon) * f, zoom: A.zoom + (B.zoom - A.zoom) * f - .22 * Math.sin(Math.PI * f) });
      globe.setShift(clamp(s * 2, 0, 1));
      pin.style.setProperty('--veil', clamp(s * 2, 0, 1).toFixed(3));
      if (logo) { logo.style.opacity = (1 - out).toFixed(3); logo.style.transform = 'translate(-50%, -50%) scale(' + (1 - .22 * out).toFixed(3) + ')'; }
      if (foot) { foot.style.opacity = (1 - out).toFixed(3); foot.style.visibility = out >= 1 ? 'hidden' : ''; }
      if (near !== lastNear) {
        lastNear = near; globe.setActive(keys[near].place);
        steps.forEach(function (st, k) { st.classList.toggle('is-current', k === near - 1); });
        ticks.forEach(function (b, k) { b.classList.toggle('is-on', k === near - 1); b.classList.toggle('is-done', k < near - 1); });
        root.classList.toggle('journey-under-way', near > 0);
      }
    }
    var queued = false;
    function onScroll() { if (queued) return; queued = true; requestAnimationFrame(function () { queued = false; update(); }); }
    if (steps.length) { window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll); update(); }
    window.__homeGlobe = globe; window.__journey = update;

    /* The threshold: shown once per visit (the <div data-gate> in the page holds its words). While the page
       loads, the line fills; then the welcome and its button appear. The button gathers the dots into the globe. */
    if (gated) (function () {
      window.__gate = true;
      var bar = gate.querySelector('.gate__bar i'), count = gate.querySelector('.gate__count'), btn = gate.querySelector('[data-gate-enter]');
      var done = 0, shown = 0, t0 = performance.now(), img = doc.querySelector('.stage__logo img');
      function part() { done++; }
      if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(part, part); else part();
      if (doc.readyState === 'complete') part(); else window.addEventListener('load', part);
      if (img && !img.complete) { img.addEventListener('load', part); img.addEventListener('error', part); } else part();
      window.scrollTo(0, 0);
      function step() {
        var now = performance.now(), want = Math.min(done / 3, (now - t0) / 1800);
        if (reduce || now - t0 > 7000) want = 1;   // never hold anyone at the door
        shown = want >= 1 && shown > .97 || reduce ? 1 : shown + (want - shown) * .14;
        if (bar) bar.style.transform = 'scaleX(' + shown.toFixed(3) + ')';
        if (count) count.textContent = Math.round(shown * 100);
        if (shown < 1) return setTimeout(step, 32);
        root.classList.add('gate-ready');
        setTimeout(function () { try { btn.focus({ preventScroll: true }); } catch (err) {} }, 500);
      }
      step();
      function enter() {
        if (!root.classList.contains('gate-ready')) return;
        try { window.sessionStorage.setItem('inl-entered', '1'); } catch (err) {}
        root.classList.remove('gate-open', 'gate-ready'); root.classList.add('gate-leaving');
        globe.assemble(2800);
        setTimeout(function () { root.classList.remove('gate-leaving'); gate.hidden = true; }, reduce ? 0 : 1500);
      }
      if (btn) btn.addEventListener('click', enter);
    })();
  })();

  /* ------------------------------------------------------------------------
     Home: scroll scenes further down the page. Each one is built from the
     ordinary content already in the page, so the wording is edited as before.
     ------------------------------------------------------------------------ */
  if (doc.body.classList.contains('has-stage')) (function () {
    var jobs = [], queued = false;
    function run() { queued = false; for (var i = 0; i < jobs.length; i++) jobs[i](); }
    function onScroll() { if (!queued) { queued = true; requestAnimationFrame(run); } }

    // 1. Mission and vision: the words light up as they are read
    var mission = doc.querySelector('.mission'), words = [];
    if (mission && !reduce) {
      [].forEach.call(mission.querySelectorAll('.statement'), function (p) {
        var parts = p.textContent.split(/\s+/); p.textContent = '';
        parts.forEach(function (w, i) { var s = el('span', 'lit', w); p.appendChild(s); if (i < parts.length - 1) p.appendChild(doc.createTextNode(' ')); words.push(s); });
      });
      jobs.push(function () {
        var r = mission.getBoundingClientRect(), vh = window.innerHeight, p = clamp((vh * .82 - r.top) / (vh * .5 + r.height * .5), 0, 1) * (words.length + 4), i;
        for (i = 0; i < words.length; i++) words[i].style.opacity = (.2 + .8 * clamp(p - i, 0, 1)).toFixed(2);
      });
    }

    // 2. Methodology: the five stages become a path that the page walks along, each ending at its gate
    var list = doc.querySelector('ol.stages'), table = doc.querySelector('table.gates'), wide = window.matchMedia('(min-width: 1px)');   // the path runs at every width; phones get a stacked layout from atlas.css
    if (list && table && table.tBodies[0]) (function () {
      var stages = [].map.call(list.children, function (li) {
        function t(sel) { var n = li.querySelector(sel); return n ? n.textContent : ''; }
        return { n: t('.stage__num'), name: t('h3'), text: t('.small'), time: t('.stage__time') };
      });
      var gates = [].map.call(table.tBodies[0].rows, function (tr) { return { code: tr.cells[0].textContent.replace(/\s+/g, ' ').trim(), tech: tr.cells[1].textContent, emo: tr.cells[2].textContent }; });
      var N = Math.min(stages.length, gates.length), cur = -1, note = doc.querySelector('.gates-head .side');
      var path = el('div', 'path'); path.style.setProperty('--n', N);
      path.innerHTML = '<div class="path__pin"><div class="path__track"><span class="path__fill"></span></div>' +
        '<div class="path__body"><div class="path__stage"><div class="path__num"></div><div><p class="eyebrow path__time"></p><h3 class="path__name"></h3><p class="path__text"></p></div></div>' +
        '<div class="path__gate"><p class="eyebrow path__code"></p><div class="path__check"><b>Technical check</b><p></p></div><div class="path__check"><b>Emotional check</b><p></p></div><p class="path__clear">Gate cleared</p></div></div>' +
        '<p class="path__note"></p></div>';
      var pinEl = path.querySelector('.path__pin'), track = path.querySelector('.path__track'), body = path.querySelector('.path__body'), checks = path.querySelectorAll('.path__check'), clear = path.querySelector('.path__clear'), nodes = [];
      if (note) path.querySelector('.path__note').textContent = note.textContent;
      stages.slice(0, N).forEach(function (st, i) {
        var b = el('button', 'path__node'); b.type = 'button'; b.innerHTML = '<i></i><span></span><small></small>';
        b.querySelector('span').textContent = st.n + '  ' + st.name; b.querySelector('small').textContent = st.time;
        b.addEventListener('click', function () {
          var top = path.getBoundingClientRect().top + window.scrollY, total = path.offsetHeight - window.innerHeight;
          window.scrollTo({ top: top + total * (i + .5) / N, behavior: reduce ? 'auto' : 'smooth' });
        });
        track.appendChild(b); nodes.push(b);
      });
      list.parentNode.insertBefore(path, list);
      function set(sel, text) { path.querySelector(sel).textContent = text; }
      jobs.push(function () {
        if (!wide.matches) return;
        var r = path.getBoundingClientRect(), total = r.height - window.innerHeight, s = total > 0 ? clamp(-r.top, 0, total) / total * N : 0;
        var i = Math.min(Math.floor(s), N - 1), frac = s - i;
        if (i !== cur) {
          cur = i;
          set('.path__num', stages[i].n); set('.path__time', stages[i].time); set('.path__name', stages[i].name); set('.path__text', stages[i].text);
          set('.path__code', 'Gate ' + gates[i].code); checks[0].querySelector('p').textContent = gates[i].tech; checks[1].querySelector('p').textContent = gates[i].emo;
          body.classList.remove('is-swapping'); void body.offsetWidth; body.classList.add('is-swapping');
        }
        pinEl.style.setProperty('--p', ((i + Math.min(1, frac / .8)) / N).toFixed(4));
        checks[0].classList.toggle('is-on', frac > .3); checks[1].classList.toggle('is-on', frac > .55); clear.classList.toggle('is-on', frac > .8);
        nodes.forEach(function (b, k) { b.classList.toggle('is-on', k === i); b.classList.toggle('is-done', k < i || (k === i && frac > .8)); });
      });
      function mode() { root.classList.toggle('path-on', wide.matches); onScroll(); }
      if (wide.addEventListener) wide.addEventListener('change', mode);
      mode();
    })();

    // 3. Transformation sequence: above and below the waterline, drawn as an iceberg
    var seq = doc.querySelector('.sequence'), duo = seq && seq.querySelector('.duo');
    if (duo && duo.children.length === 2) {
      var TIP = '<svg class="dive__ice dive__ice--tip" viewBox="0 0 400 160" fill="none" aria-hidden="true"><path pathLength="1" d="M118 160 L150 92 L186 62 L206 18 L240 72 L262 60 L302 160"/><path pathLength="1" d="M206 18 L196 96 L150 92 M196 96 L214 160 M240 72 L232 160"/></svg>';
      var MASS = '<svg class="dive__ice dive__ice--mass" viewBox="0 0 400 520" fill="none" aria-hidden="true"><path pathLength="1" d="M118 0 L78 100 L50 220 L95 330 L150 440 L215 516 L290 430 L330 330 L372 210 L345 90 L302 0"/><path pathLength="1" d="M214 0 L196 150 L78 100 M196 150 L232 300 L95 330 M232 300 L372 210 M232 300 L215 516 M232 0 L262 120 L345 90 M262 120 L232 300"/></svg>';
      duo.children[0].insertAdjacentHTML('beforeend', TIP);
      duo.children[1].insertAdjacentHTML('beforeend', MASS + '<span class="dive__line" aria-hidden="true">Waterline</span>');
      seq.classList.add('dive');
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('is-in'); io.unobserve(x.target); } }); }, { threshold: .25 });
        [].forEach.call(duo.querySelectorAll('.dive__ice'), function (n) { io.observe(n); });
      } else [].forEach.call(duo.querySelectorAll('.dive__ice'), function (n) { n.classList.add('is-in'); });
      // the deeper you scroll below the line, the darker the water
      jobs.push(function () {
        var r = duo.children[1].getBoundingClientRect(), vh = window.innerHeight;
        seq.style.setProperty('--depth', clamp((vh - r.top) / (vh * .9), 0, 1).toFixed(3));
      });
    }

    if (jobs.length) { window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll); run(); }
  })();

  /* ------------------------------------------------------------------------
     Portfolio atlas
     ------------------------------------------------------------------------ */
  var stage = doc.querySelector('.atlas'), source = doc.querySelector('.atlas-source');
  if (!stage || !source) return;

  var ARROW = '<svg width="40" height="12" viewBox="0 0 40 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M0 6h38M32 1l6 5-6 5"/></svg>';
  var CLOSE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>';
  var WORLD = { lat: 14, lon: -34, zoom: 1 };

  // read the places and ventures out of the page
  var places = [], projects = [];
  [].forEach.call(source.querySelectorAll('.place'), function (sec, i) {
    var pl = { id: sec.id, n: i + 1, name: sec.getAttribute('data-name'), country: sec.getAttribute('data-country') || '', lat: +sec.getAttribute('data-lat'), lon: +sec.getAttribute('data-lon'), zoom: +sec.getAttribute('data-zoom') || 2, intro: sec.querySelector('.place__intro'), projects: [] };
    [].forEach.call(sec.querySelectorAll('.project'), function (art) {
      var eyebrow = art.querySelector('.eyebrow'), parts = eyebrow ? eyebrow.textContent.split('·') : [];
      var pr = { id: art.id, place: pl, node: art, n: projects.length + 1, name: art.querySelector('h2').textContent, sector: (parts[1] || '').trim(), tagline: (art.querySelector('.project__tagline') || {}).textContent || '',
        lat: art.hasAttribute('data-lat') ? +art.getAttribute('data-lat') : pl.lat, lon: art.hasAttribute('data-lon') ? +art.getAttribute('data-lon') : pl.lon };
      pl.projects.push(pr); projects.push(pr);
    });
    places.push(pl);
  });
  function two(n) { return (n < 10 ? '0' : '') + n; }
  function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }

  // build the controls around the globe
  var canvas = stage.querySelector('canvas');
  var nav = el('nav', 'atlas__places'); nav.setAttribute('aria-label', 'Places');
  var worldBtn = el('button', 'atlas__place'); worldBtn.type = 'button';
  worldBtn.innerHTML = '<span class="atlas__place-n">00</span><span class="atlas__place-name">All places</span><span class="atlas__place-count">' + projects.length + '</span>';
  nav.appendChild(worldBtn);
  places.forEach(function (pl) {
    var b = el('button', 'atlas__place'); b.type = 'button'; b.setAttribute('data-id', pl.id);
    b.innerHTML = '<span class="atlas__place-n">' + two(pl.n) + '</span><span class="atlas__place-name"></span><span class="atlas__place-count">' + pl.projects.length + '</span>';
    b.querySelector('.atlas__place-name').textContent = pl.name;
    b.addEventListener('click', function () { showPlace(pl.id); });
    pl.button = b; nav.appendChild(b);
  });
  worldBtn.addEventListener('click', function () { showWorld(); });

  var bar = el('div', 'atlas__bar');
  var readout = el('p', 'atlas__readout'); readout.setAttribute('aria-hidden', 'true');
  var listBtn = el('button', 'atlas__list-btn'); listBtn.type = 'button'; listBtn.innerHTML = '<span></span>Open project list';
  var tools = el('div', 'atlas__tools');
  var zoomOut = el('button', 'atlas__tool', '−'); zoomOut.type = 'button'; zoomOut.setAttribute('aria-label', 'Zoom out');
  var zoomIn = el('button', 'atlas__tool', '+'); zoomIn.type = 'button'; zoomIn.setAttribute('aria-label', 'Zoom in');
  tools.appendChild(zoomOut); tools.appendChild(zoomIn);
  bar.appendChild(readout); bar.appendChild(listBtn); bar.appendChild(tools);

  var panel = el('aside', 'atlas__panel'); panel.setAttribute('aria-label', 'Details'); panel.inert = true;
  panel.innerHTML = '<div class="atlas__panel-bar"><button type="button" class="atlas__back"></button><button type="button" class="icon-btn atlas__close" aria-label="Close details">' + CLOSE + '</button></div><div class="atlas__panel-body" tabindex="-1"></div><div class="atlas__panel-foot"></div>';
  var panelBody = panel.querySelector('.atlas__panel-body'), panelFoot = panel.querySelector('.atlas__panel-foot'), backBtn = panel.querySelector('.atlas__back');

  var drawer = el('aside', 'atlas__drawer'); drawer.setAttribute('aria-label', 'Project list'); drawer.inert = true;
  drawer.innerHTML = '<div class="atlas__panel-bar"><p class="eyebrow">' + projects.length + ' ventures · ' + places.length + ' places</p><button type="button" class="icon-btn atlas__close" aria-label="Close project list">' + CLOSE + '</button></div><h2 class="atlas__drawer-title">Project<br><em>listing</em></h2><ul class="atlas__rows"></ul><div class="atlas__filters"><span>Filter by place</span></div>';
  var rows = drawer.querySelector('.atlas__rows'), filters = drawer.querySelector('.atlas__filters'), filter = null;
  projects.forEach(function (pr) {
    var li = el('li'), b = el('button', 'atlas__row'); b.type = 'button';
    b.innerHTML = '<span class="atlas__row-main"><strong></strong><small></small></span><span class="atlas__row-place"></span>';
    b.querySelector('strong').textContent = pr.name; b.querySelector('small').textContent = pr.sector; b.querySelector('.atlas__row-place').textContent = pr.place.name;
    b.addEventListener('click', function () { closeDrawer(); showProject(pr.id); });
    li.appendChild(b); rows.appendChild(li); pr.row = li;
  });
  places.forEach(function (pl) {
    if (!pl.projects.length) return;
    var b = el('button', 'atlas__filter', pl.name); b.type = 'button'; b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function () {
      filter = filter === pl.id ? null : pl.id;
      [].forEach.call(filters.querySelectorAll('button'), function (x) { x.setAttribute('aria-pressed', String(x === b && !!filter)); });
      projects.forEach(function (pr) { pr.row.hidden = !!filter && pr.place.id !== filter; });
    });
    filters.appendChild(b);
  });

  var frame = el('div', 'atlas__frame'); frame.setAttribute('aria-hidden', 'true');
  [frame, nav, bar, panel, drawer].forEach(function (n) { stage.appendChild(n); });
  root.classList.add('atlas-on');

  var points = projects.map(function (pr) { return { id: pr.id, place: pr.place.id, name: pr.name, lat: pr.lat, lon: pr.lon }; });
  var links = []; places.forEach(function (p, i) { if (places.length > 1) links.push([i, (i + 1) % places.length]); });
  var lastRead = '';
  var globe = new Globe(canvas, {
    view: WORLD, sway: 12, period: 48, places: places, links: links, points: points,
    layout: function (W, H, shift) {
      var wide = W >= 900;
      return wide ? { cx: W * (.5 - .15 * shift), cy: H * .52, R: Math.min(H * .34, W * .26) }
                  : { cx: W / 2, cy: H * (.4 - .16 * shift), R: Math.min(W * .42, H * .27) };
    },
    onPick: function (hit) { if (hit.type === 'place') showPlace(hit.id); else if (hit.ids.length === 1) showProject(hit.id); else showPlace(current.place); },
    onMove: function (lat, lon, zoom) {
      var s = coords(lat, lon) + '   ×' + zoom.toFixed(1);
      if (s !== lastRead) { lastRead = s; readout.textContent = s; }
    }
  });
  zoomIn.addEventListener('click', function () { globe.zoomBy(1.35); });
  zoomOut.addEventListener('click', function () { globe.zoomBy(1 / 1.35); });

  // what is showing
  var current = { place: null, project: null };
  function setHash(id) { try { history.replaceState(null, '', id ? '#' + id : location.pathname + location.search); } catch (err) {} }
  function mark() {
    worldBtn.classList.toggle('is-active', !current.place);
    places.forEach(function (pl) { pl.button.classList.toggle('is-active', current.place === pl.id); });
    stage.classList.toggle('has-panel', !!current.place);
  }
  function fill(nodes, foot) {
    panelBody.textContent = ''; panelFoot.textContent = '';
    nodes.forEach(function (n, i) { n.classList.add('rise'); n.style.setProperty('--i', i); panelBody.appendChild(n); });
    (foot || []).forEach(function (n) { panelFoot.appendChild(n); });
    panelBody.scrollTop = 0;
    panel.classList.add('is-open'); panel.inert = false; globe.setShift(1);
  }
  function showWorld(keepFocus) {
    current.place = current.project = null; mark();
    panel.classList.remove('is-open'); panel.inert = true;
    globe.setActive(null); globe.setShift(0); globe.flyTo(WORLD.lat, WORLD.lon, WORLD.zoom, 1700);
    setHash(''); if (!keepFocus) worldBtn.focus({ preventScroll: true });
  }
  function showPlace(id, quiet) {
    var pl = byId(places, id); if (!pl) return;
    current.place = id; current.project = null; mark();
    globe.setActive(id); globe.flyTo(pl.lat, pl.lon, pl.zoom, 1800);
    var nodes = [el('p', 'eyebrow', 'Place ' + two(pl.n) + ' · ' + coords(pl.lat, pl.lon).replace('  ', ', '))];
    var h = el('h2', 'atlas__title', pl.name); nodes.push(h);
    if (pl.country) nodes.push(el('p', 'atlas__country', pl.country));
    if (pl.intro) { var intro = pl.intro.cloneNode(true); intro.className = 'atlas__intro'; nodes.push(intro); }
    if (pl.projects.length) {
      nodes.push(el('p', 'atlas__label', pl.projects.length + (pl.projects.length === 1 ? ' venture' : ' ventures')));
      pl.projects.forEach(function (pr) {
        var b = el('button', 'atlas__venture'); b.type = 'button';
        b.innerHTML = '<span class="atlas__venture-n">' + two(pr.n) + '</span><span class="atlas__venture-main"><strong></strong><small></small><em></em></span>' + ARROW;
        b.querySelector('strong').textContent = pr.name; b.querySelector('small').textContent = pr.sector; b.querySelector('em').textContent = pr.tagline;
        b.addEventListener('click', function () { showProject(pr.id); });
        b.addEventListener('mouseenter', function () { globe.setFocus(pr.id); });
        b.addEventListener('mouseleave', function () { if (!current.project) globe.setFocus(null); });
        nodes.push(b);
      });
    }
    backBtn.textContent = '← All places'; backBtn.onclick = function () { showWorld(); };
    fill(nodes);
    setHash(id); if (!quiet) panelBody.focus({ preventScroll: true });
  }
  function showProject(id, quiet) {
    var pr = byId(projects, id); if (!pr) return;
    var pl = pr.place; current.place = pl.id; current.project = id; mark();
    globe.setActive(pl.id); globe.setFocus(id); globe.flyTo(pr.lat, pr.lon, pl.zoom * 1.18, 1500);
    var nodes = [], main = pr.node.querySelector('.project__main'), spec = pr.node.querySelector('.spec');
    [].forEach.call(main ? main.children : [], function (n) { var c = n.cloneNode(true); c.classList.remove('reveal'); if (c.tagName === 'H2') c.className = 'atlas__title'; nodes.push(c); });
    if (spec) { var s = spec.cloneNode(true); s.className = 'spec atlas__spec'; nodes.push(s); }
    var i = projects.indexOf(pr), prev = projects[(i - 1 + projects.length) % projects.length], next = projects[(i + 1) % projects.length];
    var pb = el('button', 'atlas__step'); pb.type = 'button'; pb.innerHTML = '<small>Previous</small><span></span>'; pb.querySelector('span').textContent = prev.name;
    var nb = el('button', 'atlas__step atlas__step--next'); nb.type = 'button'; nb.innerHTML = '<small>Next</small><span></span>'; nb.querySelector('span').textContent = next.name;
    pb.addEventListener('click', function () { showProject(prev.id); }); nb.addEventListener('click', function () { showProject(next.id); });
    backBtn.textContent = '← ' + pl.name; backBtn.onclick = function () { showPlace(pl.id); };
    fill(nodes, [pb, nb]);
    setHash(id); if (!quiet) panelBody.focus({ preventScroll: true });
  }
  function openDrawer() { drawer.classList.add('is-open'); drawer.inert = false; stage.classList.add('has-drawer'); drawer.querySelector('.atlas__close').focus({ preventScroll: true }); }
  function closeDrawer() { drawer.classList.remove('is-open'); drawer.inert = true; stage.classList.remove('has-drawer'); }
  listBtn.addEventListener('click', openDrawer);
  drawer.querySelector('.atlas__close').addEventListener('click', function () { closeDrawer(); listBtn.focus({ preventScroll: true }); });
  panel.querySelector('.atlas__close').addEventListener('click', function () { showWorld(); });
  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (drawer.classList.contains('is-open')) { closeDrawer(); listBtn.focus({ preventScroll: true }); }
    else if (current.project) showPlace(current.place);
    else if (current.place) showWorld();
  });

  // open on a place or a venture when the address names one (portfolio.html#brazil)
  function route(quiet) {
    var id = decodeURIComponent(location.hash.slice(1));
    if (byId(places, id)) showPlace(id, quiet); else if (byId(projects, id)) showProject(id, quiet); else if (current.place) showWorld(true);
  }
  window.addEventListener('hashchange', function () { route(false); });
  mark(); route(true);
  window.__atlas = { globe: globe, showPlace: showPlace, showProject: showProject, showWorld: showWorld, openDrawer: openDrawer };
})();
