import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsent, acceptAnalytics, rejectAnalytics, loadAnalytics } from '../utils/consent.js';

export default function CookieBanner() {
  const [open, setOpen] = useState(() => getConsent() === null);

  useEffect(() => {
    // Si ya había aceptado antes, se carga la analítica al entrar
    if (getConsent() === 'granted') loadAnalytics();
    // El enlace "Cookies" del footer vuelve a abrir el banner
    const reopen = () => setOpen(true);
    window.addEventListener('open-cookie-banner', reopen);
    return () => window.removeEventListener('open-cookie-banner', reopen);
  }, []);

  const choose = (accept) => {
    if (accept) acceptAnalytics(); else rejectAnalytics();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="cookie" role="dialog" aria-labelledby="cookie-title">
      <h2 id="cookie-title">Cookies de analítica</h2>
      <p>
        Uso Google Analytics para saber qué páginas se visitan y mejorar el sitio. Solo se activa si lo aceptas.{' '}
        <Link to="/privacidad">Más información</Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="btn btn-ghost" onClick={() => choose(false)}>Rechazar</button>
        <button type="button" className="btn btn-primary" onClick={() => choose(true)}>Aceptar</button>
      </div>
    </div>
  );
}
