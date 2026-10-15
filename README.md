# Mi_Web · eliasvicencio.cl

Portafolio personal de Elías Vicencio. Sitio estático (HTML + CSS + JS) sin dependencias externas:
fuente (Inter) e íconos (SVG) están alojados en el propio sitio.

## Estructura
- `index.html` · página única
- `css/styles.css`, `js/theme.js`, `js/scripts.js`, `js/effects.js` (red de partículas, terminal animada, tarjetas 3D, contadores)
- `img/` · logo e íconos (`icons.svg`)
- `fonts/` · Inter (variable, latin y latin-ext)
- `.well-known/security.txt` · contacto para reportar vulnerabilidades (RFC 9116)

## Probar en local
    python -m http.server 8000   # y abrir http://localhost:8000

## Al editar CSS o JS
Sube el número de versión en `index.html` (`?v=4` → `?v=5`) para evitar caché.
