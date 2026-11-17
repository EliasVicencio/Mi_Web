// Consentimiento de cookies de analítica (Google Tag Manager / Google Analytics).
// Google solo se carga DESPUÉS de que la persona acepta.
const KEY = 'cookie-consent'; // 'granted' | 'denied'
const GTM_ID = 'GTM-P53XXZ8Q';

export function getConsent() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

function save(value) {
  try { localStorage.setItem(KEY, value); } catch { /* storage bloqueado */ }
}

export function loadAnalytics() {
  if (import.meta.env.DEV) return;                 // no contar visitas de localhost
  if (document.getElementById('gtm-script')) return; // ya cargado
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.id = 'gtm-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

// Borra las cookies de Google Analytics (_ga y _ga_XXXX)
function clearAnalyticsCookies() {
  const host = window.location.hostname.replace(/^www\./, '');
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (name === '_ga' || name.startsWith('_ga_')) {
      const expire = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      document.cookie = expire;
      document.cookie = `${expire}; domain=${host}`;
      document.cookie = `${expire}; domain=.${host}`;
    }
  });
}

export function acceptAnalytics() {
  save('granted');
  loadAnalytics();
}

export function rejectAnalytics() {
  const wasGranted = getConsent() === 'granted';
  save('denied');
  if (wasGranted) {
    clearAnalyticsCookies();
    window.location.reload(); // detiene el script de Google que ya estaba cargado
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event('open-cookie-banner'));
}
