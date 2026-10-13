// Se carga en <head> para aplicar el tema antes de pintar (evita el "parpadeo").
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (e) { /* storage bloqueado: se usa el tema del sistema */ }
})();
