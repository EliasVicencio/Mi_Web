import EmailLink from '../components/EmailLink.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { openCookieSettings } from '../utils/consent.js';

export default function Privacy() {
  usePageTitle('Privacidad y cookies · Elías Vicencio');

  return (
    <section id="privacidad">
      <div className="wrap legal">
        <header className="sec-head">
          <p className="eyebrow">Legal</p>
          <h1>Privacidad y <span className="grad">cookies</span></h1>
          <p className="updated">Última actualización: 17 de noviembre de 2026</p>
        </header>

        <h2>1. Quién es el responsable</h2>
        <p>
          Elías Vicencio, persona natural con domicilio en Chile, es el responsable del tratamiento de los datos
          que se recogen en este sitio (eliasvicencio.cl). Puedes escribirme a <EmailLink />.
        </p>

        <h2>2. Qué datos trato y para qué</h2>
        <ul>
          <li>
            <strong>Formulario de contacto.</strong> Tu correo y el mensaje que escribes, para responder tu consulta.
            Se envían a través de Formspree, que los procesa por mi cuenta. No se usan para otros fines ni se comparten.
          </li>
          <li>
            <strong>Analítica (solo si la aceptas).</strong> Google Analytics, cargado mediante Google Tag Manager,
            registra datos como las páginas que visitas, el tiempo en el sitio, el tipo de dispositivo y navegador,
            tu ubicación aproximada y un identificador guardado en una cookie. La finalidad es entender cómo se usa
            el sitio para mejorarlo. La base es tu consentimiento y los datos se conservan 2 meses en Google Analytics.
          </li>
          <li>
            <strong>Datos técnicos de Cloudflare.</strong> El sitio está alojado en Cloudflare, que procesa datos
            técnicos (por ejemplo, la dirección IP y el navegador) para entregar la página y protegerla. También se
            usa Cloudflare Web Analytics, una medición de visitas que no utiliza cookies.
          </li>
        </ul>

        <h2>3. Cookies y almacenamiento local</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Nombre</th><th>Origen</th><th>Para qué sirve</th><th>Duración</th></tr>
            </thead>
            <tbody>
              <tr><td>_ga, _ga_*</td><td>Google Analytics</td><td>Distinguir visitas y medir el uso del sitio. Solo con tu consentimiento.</td><td>Hasta 2 años</td></tr>
              <tr><td>cookie-consent</td><td>Este sitio (almacenamiento local)</td><td>Recordar si aceptaste o rechazaste las cookies de analítica.</td><td>Hasta que lo borres</td></tr>
              <tr><td>theme</td><td>Este sitio (almacenamiento local)</td><td>Recordar si prefieres el tema claro u oscuro.</td><td>Hasta que lo borres</td></tr>
            </tbody>
          </table>
        </div>

        <h2>4. Cambiar tu elección</h2>
        <p>
          Puedes aceptar o rechazar la analítica en cualquier momento. Rechazarla después de haberla aceptado borra
          las cookies de Google Analytics.
        </p>
        <p>
          <button type="button" className="btn btn-ghost" onClick={openCookieSettings}>Cambiar mis preferencias</button>
        </p>

        <h2>5. Transferencias a otros países</h2>
        <p>
          Google, Formspree y Cloudflare son proveedores que pueden procesar datos fuera de Chile, por ejemplo en
          Estados Unidos. Los uso solo para las finalidades descritas arriba.
        </p>

        <h2>6. Tus derechos</h2>
        <p>
          Puedes pedir acceso a tus datos, rectificarlos, suprimirlos, oponerte a su tratamiento, solicitar su
          portabilidad o bloquearlos, según la Ley N° 19.628 y la Ley N° 21.719 cuando corresponda. Para ejercerlos,
          escríbeme al correo indicado arriba. Si crees que tus derechos no fueron respetados, puedes reclamar ante
          la Agencia de Protección de Datos Personales.
        </p>

        <h2>7. Cambios en esta política</h2>
        <p>
          Si cambio la forma en que trato los datos, actualizaré esta página y la fecha de arriba.
        </p>
      </div>
    </section>
  );
}
