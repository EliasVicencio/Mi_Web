(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---- 1. Barra de progreso de scroll ----
  var bar = document.getElementById('progress');
  if (bar) {
    var tick = false;
    var upd = function () {
      var h = root.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(window.scrollY / h, 1) : 0) + ')';
      tick = false;
    };
    window.addEventListener('scroll', function () {
      if (!tick) { tick = true; requestAnimationFrame(upd); }
    }, { passive: true });
    upd();
  }

  // ---- 2. Contadores animados ----
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var end = parseInt(el.dataset.count, 10), start = performance.now(), dur = 1200;
    if (reduce) { el.textContent = end; return; }
    (function step(now) {
      var p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  }

  if (reduce) return; // lo de abajo es movimiento: se omite si el usuario lo pidió

  // ---- 3. Terminal que "escribe" ----
  var pre = document.querySelector('.term pre');
  if (pre) {
    var walker = document.createTreeWalker(pre, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) {
      if (n.parentNode.classList && n.parentNode.classList.contains('cursor')) continue;
      nodes.push({ node: n, text: n.nodeValue });
    }
    pre.style.minHeight = pre.offsetHeight + 'px'; // evita que el cuadro "salte"
    nodes.forEach(function (o) { o.node.nodeValue = ''; });
    var ni = 0, ci = 0;
    (function type() {
      if (ni >= nodes.length) return;
      var o = nodes[ni], ch = o.text.charAt(ci);
      o.node.nodeValue += ch; ci++;
      var delay = ch === '\n' ? 260 : 16 + Math.random() * 22;
      if (ci >= o.text.length) { ni++; ci = 0; }
      setTimeout(type, delay);
    })();
  }

  // ---- 4. Red de partículas en el hero ----
  var cv = document.getElementById('net');
  if (cv && cv.getContext) {
    var ctx = cv.getContext('2d'), hero = cv.parentNode;
    var W, H, dpr, pts = [], mouse = { x: -999, y: -999 }, color = '79,140,255', running = true;
    var readColor = function () {
      var c = getComputedStyle(root).getPropertyValue('--accent').trim();
      var m = /^#([0-9a-f]{6})$/i.exec(c);
      if (m) color = [1, 3, 5].map(function (i) { return parseInt(m[1].substr(i - 1, 2), 16); }).join(',');
    };
    var resize = function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(80, Math.round(W * H / 15000));
      pts = [];
      for (var i = 0; i < count; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 });
    };
    var frame = function () {
      if (running) {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < pts.length; i++) {
          var p = pts[i];
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          ctx.fillStyle = 'rgba(' + color + ',.7)';
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 6.283); ctx.fill();
          for (var j = i + 1; j < pts.length; j++) {
            var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
            if (d < 16900) {
              ctx.strokeStyle = 'rgba(' + color + ',' + (0.28 * (1 - d / 16900)) + ')';
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
            }
          }
          var mx = p.x - mouse.x, my = p.y - mouse.y, md = mx * mx + my * my;
          if (md < 25000) {
            ctx.strokeStyle = 'rgba(' + color + ',' + (0.55 * (1 - md / 25000)) + ')';
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
      requestAnimationFrame(frame);
    };
    readColor(); resize();
    window.addEventListener('resize', resize);
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('pointerleave', function () { mouse.x = mouse.y = -999; });
    new MutationObserver(readColor).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { running = es[0].isIntersecting; }).observe(hero); // pausa fuera de pantalla
    }
    frame();
  }

  // ---- 5. Tarjetas: foco de luz + inclinación 3D (solo con mouse) ----
  if (fine) {
    document.querySelectorAll('.card:not(.form)').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
        var rx = ((y / r.height) - .5) * -6, ry = ((x / r.width) - .5) * 6;
        card.style.transform = 'perspective(800px) translateY(-4px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });

    // ---- 6. Botones "magnéticos" ----
    document.querySelectorAll('.hero .btn').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * .15).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * .25).toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }
})();
