(function () {
  'use strict';
  var root = document.documentElement;

  // ---- Tema claro/oscuro ----
  var toggle = document.getElementById('theme-toggle');
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  toggle.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // ---- Menú móvil ----
  var menuBtn = document.getElementById('menu-btn');
  var links = document.getElementById('links');
  function setMenu(open) {
    links.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  }
  menuBtn.addEventListener('click', function () {
    setMenu(!links.classList.contains('open'));
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });

  // ---- Barra de navegación al hacer scroll ----
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 10); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Enlace activo según la sección visible ----
  var navLinks = Array.prototype.slice.call(links.querySelectorAll('a'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });

    // ---- Animación de aparición ----
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); reveal.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { reveal.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Correo: se arma con JS para que los robots no lo lean del HTML ----
  var slot = document.getElementById('mail-slot');
  if (slot) {
    var addr = slot.dataset.u + '@' + slot.dataset.d;
    slot.textContent = '';
    var a = document.createElement('a');
    a.href = 'mailto:' + addr;
    a.textContent = addr;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'copy';
    b.textContent = 'Copiar';
    b.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(addr).then(function () {
        b.textContent = '¡Copiado!';
        setTimeout(function () { b.textContent = 'Copiar'; }, 1800);
      });
    });
    slot.appendChild(a);
    slot.appendChild(b);
  }

  // ---- Aviso de mensaje enviado (Formspree redirige con ?enviado=1) ----
  if (/[?&]enviado=1/.test(location.search)) {
    var sent = document.getElementById('sent');
    if (sent) sent.hidden = false;
  }

  // ---- Año del footer ----
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
