import { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import usePageEffects from '../hooks/usePageEffects.js';
import CookieBanner from './ConsentBanner.jsx';

// Todo lo que se repite en todas las páginas (navbar, footer, barra de progreso)
export default function Layout() {
  const { pathname } = useLocation();
  const progress = useRef(null);
  usePageEffects(pathname, progress);

  return (
    <>
      <a className="skip" href="#main">Saltar al contenido</a>
      <div className="progress" ref={progress} aria-hidden="true" />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
