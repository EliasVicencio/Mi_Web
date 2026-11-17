import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import NetworkCanvas from '../components/NetworkCanvas.jsx';
import Terminal from '../components/Terminal.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { projects } from '../data/projects.js';
import { tools } from '../data/languages.js';

const highlights = [
  {
    icon: 'laptop',
    title: 'Software que se entiende',
    text: 'Aplicaciones web y APIs con una interfaz clara, datos ordenados y un flujo que se puede mantener.',
  },
  {
    icon: 'shield',
    title: 'Seguridad desde el diseño',
    text: 'Autenticación, registro de eventos y alineación con ISO 27001, no como un parche al final.',
  },
  {
    icon: 'sync',
    title: 'Automatizar lo repetible',
    text: 'Scripts y procesos en Python para ahorrar tiempo, reducir errores y dejar rastro de lo que ocurre.',
  },
];

const featured = projects.slice(0, 3);

export default function Home() {
  usePageTitle('Elías Vicencio · Analista Programador');

  return (
    <>
      <section className="hero" id="home">
        <NetworkCanvas />
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap hero-in">
          <div className="hero-text reveal">
            <p className="eyebrow">Analista Programador · Ciberseguridad</p>
            <h1>Hola, soy <span className="grad">Elías Vicencio</span></h1>
            <p className="lead">
              Diseño y construyo software con criterio de seguridad: desarrollo web, automatización con Python
              y sistemas de gestión alineados a ISO 27001. Me interesa dejar productos claros, mantenibles
              y difíciles de romper.
            </p>
            <div className="cta">
              <Link className="btn btn-primary" to="/projects"><Icon name="code" /> Ver proyectos</Link>
              <Link className="btn btn-ghost" to="/sobre-mi">Sobre mí</Link>
              <Link className="btn btn-ghost" to="/contact"><Icon name="mail" /> Contáctame</Link>
            </div>
          </div>
          <Terminal />
        </div>
      </section>

      <section className="home-extra" aria-labelledby="home-focus">
        <div className="wrap">
          <header className="sec-head reveal">
            <p className="eyebrow">Cómo trabajo</p>
            <h2 id="home-focus">Qué puedo <span className="grad">aportar</span></h2>
            <p className="sec-lead">
              Combino desarrollo full stack con prácticas de seguridad. El resultado son sistemas que se pueden
              usar, auditar y seguir evolucionando.
            </p>
          </header>
          <div className="highlights">
            {highlights.map((item) => (
              <article className="card reveal" key={item.title}>
                <span className="skill-ic"><Icon name={item.icon} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-extra" aria-labelledby="home-stack">
        <div className="wrap">
          <header className="sec-head reveal">
            <p className="eyebrow">Stack</p>
            <h2 id="home-stack">Herramientas que <span className="grad">uso</span></h2>
            <p className="sec-lead">
              Python, Java y Kotlin en el backend; React en el frontend; SQL y Mongo para los datos. Git y Docker para
              versionar y desplegar con orden.
            </p>
          </header>
          <ul className="stack-cloud">
            {tools.map((t) => (
              <li key={t.name}>
                <Icon name={t.icon} />
                {t.name}
              </li>
            ))}
          </ul>
          <p className="home-more">
            <Link className="btn btn-ghost" to="/skills">Ver lenguajes y habilidades</Link>
          </p>
        </div>
      </section>

      <section className="home-extra" aria-labelledby="home-work">
        <div className="wrap">
          <header className="sec-head reveal">
            <p className="eyebrow">Selección</p>
            <h2 id="home-work">Proyectos <span className="grad">destacados</span></h2>
            <p className="sec-lead">
              Tres piezas que resumen el portafolio: gestión de seguridad, plataforma de monitoreo y un sistema
              de ventas.
            </p>
          </header>
          <div className="projects">
            {featured.map((p) => (
              <article className="card project reveal" key={p.title}>
                <div className="p-top">
                  <span className="skill-ic"><Icon name={p.icon} /></span>
                  {p.badge && <span className="badge">{p.badge}</span>}
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <ul className="tags">
                  {p.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <div className="p-links">
                  <a className="btn btn-primary" href={p.code} target="_blank" rel="noopener noreferrer">
                    <Icon name="github" /> Código
                  </a>
                  {p.demo && (
                    <a className="btn btn-ghost" href={p.demo} target="_blank" rel="noopener noreferrer">
                      <Icon name="ext" /> Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="home-more">
            <Link className="btn btn-ghost" to="/projects">Ver todos los proyectos</Link>
          </p>
        </div>
      </section>
    </>
  );
}
