import Icon from './Icon.jsx';
import { Link } from 'react-router-dom';
import { openCookieSettings } from '../utils/consent.js';

const SOCIAL = [
  ['linkedin', 'LinkedIn', 'https://www.linkedin.com/in/el%C3%ADas-vicencio-3524942b1'],
  ['github', 'GitHub', 'https://github.com/EliasVicencio'],
  ['instagram', 'Instagram', 'https://instagram.com/eliasvicencio.dev'],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-in">
        <p>&copy; {new Date().getFullYear()} Elías Vicencio. Todos los derechos reservados.</p>
        <div className="foot-links">
          <Link to="/privacidad">Privacidad</Link>
          <button type="button" className="link-btn" onClick={openCookieSettings}>Cookies</button>
        </div>
        <div className="social">
          {SOCIAL.map(([icon, label, href]) => (
            <a key={icon} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon name={icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
