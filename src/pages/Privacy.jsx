import { Link } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import EmailLink from '../components/EmailLink.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import { openCookieSettings } from '../utils/consent.js';

export default function Privacy() {
  usePageTitle('Política de privacidad · Elías Vicencio');

  return (
    <section id="privacidad">
      <div className="wrap legal">
        <header className="sec-head">
          <p className="eyebrow">Legal</p>
          <h1>Política de <span className="grad">tratamiento de datos personales</span></h1>
          <p className="back-home">
            <Link to="/">← Volver a la página principal</Link>
          </p>
          <p>
            Esta política explica qué datos personales se tratan en <strong>eliasvicencio.cl</strong>, con qué
            finalidad, con qué base de licitud y cómo puedes ejercer tus derechos. Se publica en cumplimiento del
            deber de información y transparencia del artículo 14 ter de la Ley N° 21.719, sobre protección de los
            datos personales.
          </p>
          <p className="legal-meta">
            <strong>Versión 2.0</strong> · Fecha de última actualización: 17 de noviembre de 2026 · Publicada de
            forma permanente, gratuita y accesible sin necesidad de registro.
          </p>
        </header>

        <h2>1. Responsable del tratamiento</h2>
        <p>
          <strong>Responsable:</strong> Elías Vicencio, persona natural, con domicilio en Chile, titular del sitio
          eliasvicencio.cl. No se ha designado encargado de prevención, ni se prevé designarlo, por no estar
          obligado a ello conforme al artículo 43 de la Ley N° 21.719.
        </p>
        <p>
          <strong>Canal de contacto para titulares y para la Agencia de Protección de Datos Personales:</strong>{' '}
          <EmailLink />. Este correo se mantiene actualizado y operativo para recibir solicitudes de los titulares
          y comunicaciones de la Agencia.
        </p>

        <h2>2. Marco legal aplicable</h2>
        <p>
          El tratamiento de datos personales en este sitio se rige por la Ley N° 19.628, sobre protección de la
          vida privada, que será reemplazada por la Ley N° 21.719 a contar del <strong>1 de diciembre de 2026</strong>.
          Esta política ha sido redactada para dar cumplimiento anticipado a los estándares de la Ley N° 21.719,
          en particular sus principios (artículo 3), sus reglas de licitud (artículos 12 y 13) y el deber de
          información y transparencia (artículo 14 ter). Hasta la entrada en vigencia de la nueva ley, el tratamiento
          también respeta las garantías de la Ley N° 19.628.
        </p>

        <h2>3. Categorías de datos, finalidades, base de licitud y destinatarios</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Categoría de datos</th><th>Finalidad</th><th>Base de licitud</th><th>Destinatarios</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Correo electrónico y contenido del mensaje que envías en el formulario de contacto.</td>
                <td>Responder tu consulta.</td>
                <td>Tu consentimiento (art. 12), otorgado al enviar el formulario.</td>
                <td>Formspree (proveedor de procesamiento de formularios, por cuenta del responsable).</td>
              </tr>
              <tr>
                <td>Datos de navegación: páginas visitadas, tiempo de permanencia, tipo de dispositivo y navegador, ubicación aproximada, identificador de cookie.</td>
                <td>Medir y analizar el uso del sitio para mejorarlo.</td>
                <td>Tu consentimiento (art. 12), gestionado mediante el banner de cookies.</td>
                <td>Google (Google Analytics vía Google Tag Manager), si aceptas la analítica.</td>
              </tr>
              <tr>
                <td>Datos técnicos de conexión (por ejemplo, dirección IP y cabeceras del navegador).</td>
                <td>Entregar el sitio, protegerlo frente a ataques y registrar métricas agregadas de visitas (Cloudflare Web Analytics, sin cookies).</td>
                <td>Interés legítimo (art. 13 letra d) en mantener el sitio disponible y seguro. Este interés legítimo no se opone a tus derechos, pues los datos se tratan de forma limitada y, en el caso de Web Analytics, agregada.</td>
                <td>Cloudflare (alojamiento, red de distribución de contenido y seguridad).</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Universo de personas.</strong> Las bases de datos comprenden únicamente visitantes del sitio y
          personas que contactan al responsable a través del formulario: personas naturales mayores de 14 años que
          actúan por sí mismas.
        </p>
        <p>
          <strong>Decisiones automatizadas.</strong> No se realizan tratamientos basados únicamente en decisiones
          automatizadas, incluida la elaboración de perfiles, que produzcan efectos jurídicos o te afecten
          significativamente.
        </p>
        <p>
          <strong>Datos que no se tratan.</strong> No se recogen datos personales sensibles (salud, origen étnico,
          ideología, vida sexual, entre otros), ni datos de menores de 14 años. Si eres menor de esa edad o detectas
          que se enviaron datos de este tipo, escríbeme a <EmailLink /> para suprimirlos.
        </p>
        <p>
          <strong>Fuente de los datos.</strong> Todos los datos personales tratados en este sitio provienen
          directamente del titular (formularios, interacción con el sitio) o de su equipo de conexión durante la
          visita. No se obtienen de fuentes de acceso público ni de terceros.
        </p>

        <h2>4. Comunicaciones y cesiones de datos</h2>
        <p>
          Tus datos no se venden, no se ceden a terceros con fines propios y no se usan para publicidad. Solo
          acceden a ellos los proveedores necesarios para operar el sitio, que actúan como encargados o como
          responsables independientes de su propio tratamiento de seguridad:
        </p>
        <ul>
          <li><strong>Formspree</strong>: transmisión del formulario de contacto.</li>
          <li><strong>Google</strong>: analítica web, únicamente si aceptas las cookies de analítica.</li>
          <li><strong>Cloudflare</strong>: alojamiento, distribución de contenido y protección del sitio.</li>
        </ul>

        <h2>5. Transferencias internacionales de datos</h2>
        <p>
          Parte del tratamiento se realiza fuera de Chile, principalmente en Estados Unidos, a través de los
          proveedores indicados. Según la Ley N° 21.719, la transferencia de datos a terceros países requiere que
          exista un nivel adecuado de protección o garantías suficientes:
        </p>
        <ul>
          <li>
            <strong>Estados Unidos:</strong> no ha sido declarado país con nivel adecuado de protección. Las
            transferencias se amparan en garantías contractuales: Formspree y Cloudflare celebran cláusulas
            contractuales tipo con sus clientes, y Google ofrece un contrato de tratamiento de datos con cláusulas
            estándar para sus servicios de analítica. Todos los proveedores contratados ofrecen cifrado de datos en
            tránsito y reposo.
          </li>
          <li>
            <strong>El correo electrónico del responsable</strong> se gestiona con un proveedor de correo
            internacional que aplica cifrado en tránsito (TLS).
          </li>
        </ul>
        <p>
          Puedes solicitar más detalle sobre las garantías de estas transferencias escribiendo a <EmailLink />.
        </p>

        <h2>6. Plazo de conservación</h2>
        <ul>
          <li><strong>Mensajes del formulario:</strong> se conservan hasta atender tu consulta y, a más tardar, 12 meses desde el último intercambio, luego se suprimen.</li>
          <li><strong>Datos de Google Analytics:</strong> 2 meses.</li>
          <li><strong>Cookies de analítica:</strong> hasta 2 años, o hasta que las borres o retires tu consentimiento.</li>
          <li><strong>Preferencias del sitio (tema y consentimiento):</strong> hasta que borres el almacenamiento local de tu navegador.</li>
        </ul>
        <p>
          Vencidos estos plazos, los datos se suprimen o anonimizan, salvo obligación legal de conservación.
        </p>

        <h2>7. Seguridad de los datos</h2>
        <p>
          Conforme a los artículos 3 letra f) y 14 quinquies de la Ley N° 21.719, se aplican medidas técnicas y
          organizativas adecuadas al riesgo, considerando el estado de la técnica:
        </p>
        <ul>
          <li>Cifrado de las comunicaciones mediante HTTPS (TLS) en todo el sitio.</li>
          <li>Política de seguridad de contenidos (CSP) y cabeceras de seguridad que limitan los recursos externos que pueden cargarse.</li>
          <li>Cargue de la analítica solo previo consentimiento, sin cookies previas (privacidad por defecto, art. 14 quáter).</li>
          <li>Recopilación limitada a los datos estrictamente necesarios para cada finalidad (principio de proporcionalidad).</li>
          <li>Acceso a los mensajes recibidos restringido únicamente al responsable, con cuentas protegidas mediante autenticación reforzada.</li>
          <li>Registro y notificación de vulneraciones de seguridad a la Agencia, cuando corresponda, conforme al artículo 14 sexies.</li>
        </ul>

        <h2>8. Cookies y almacenamiento local</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Nombre</th><th>Origen</th><th>Finalidad</th><th>Duración</th></tr>
            </thead>
            <tbody>
              <tr><td>_ga, _ga_*</td><td>Google Analytics</td><td>Distinguir visitas y medir el uso del sitio. Solo con tu consentimiento.</td><td>Hasta 2 años</td></tr>
              <tr><td>cookie-consent</td><td>Este sitio (almacenamiento local)</td><td>Recordar tu elección sobre las cookies de analítica.</td><td>Hasta que lo borres</td></tr>
              <tr><td>theme</td><td>Este sitio (almacenamiento local)</td><td>Recordar si prefieres el tema claro u oscuro.</td><td>Hasta que lo borres</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Puedes aceptar o rechazar la analítica en cualquier momento. Si la rechazas después de haberla aceptado, se
          eliminan las cookies de Google Analytics.
        </p>
        <p>
          <button type="button" className="btn btn-ghost" onClick={openCookieSettings}>Cambiar mis preferencias</button>
        </p>

        <h2>9. Derechos de los titulares (ARCO-POL)</h2>
        <p>
          La Ley N° 21.719 reconoce a toda persona los siguientes derechos sobre sus datos personales. Son
          personales, intransferibles e irrenunciables.
        </p>
        <ul>
          <li><strong>Acceso.</strong> Saber si se tratan tus datos, cuáles, su origen, su finalidad y por cuánto tiempo, y obtener una copia.</li>
          <li><strong>Rectificación.</strong> Corregir datos inexactos, desactualizados o incompletos.</li>
          <li><strong>Supresión.</strong> Pedir la eliminación de tus datos, por ejemplo cuando ya no son necesarios para la finalidad con que se recogieron o cuando retiras tu consentimiento.</li>
          <li><strong>Oposición.</strong> Oponerte a que se traten tus datos para una finalidad determinada.</li>
          <li><strong>Portabilidad.</strong> Recibir tus datos en un formato estructurado y de uso común, y transmitirlos a otro responsable, cuando corresponda.</li>
          <li><strong>Bloqueo temporal.</strong> Pedir que se suspenda el tratamiento mientras se resuelve una solicitud de rectificación, supresión u oposición.</li>
        </ul>

        <h2>10. Cómo ejercer tus derechos</h2>
        <p>
          Escríbeme a <EmailLink /> indicando el derecho que quieres ejercer y los datos necesarios para identificarte.
          Si solicitas una rectificación, señala qué dato debe corregirse y, si corresponde, adjunta el respaldo.
        </p>
        <ul>
          <li>
            <strong>Plazo de respuesta.</strong> 30 días corridos desde que recibo tu solicitud, prorrogables una sola
            vez por otros 30 días corridos cuando esté justificado (art. 11 de la Ley N° 21.719).
          </li>
          <li>
            <strong>Bloqueo temporal.</strong> Si lo pides junto con una rectificación, supresión u oposición, lo
            resuelvo en 2 días hábiles.
          </li>
          <li>
            <strong>Costo.</strong> El ejercicio de estos derechos es gratuito. Los medios para otorgar o retirar el
            consentimiento son expeditos, fidedignos, gratuitos y permanentemente disponibles.
          </li>
          <li>
            <strong>Retiro del consentimiento.</strong> Puedes retirarlo en cualquier momento, sin expresión de causa
            y sin efecto retroactivo; ello no afecta la licitud del tratamiento realizado antes del retiro. Para la
            analítica, usa el botón de la sección 8; para el formulario, escríbeme al correo indicado.
          </li>
        </ul>

        <h2>11. Reclamos ante la Agencia de Protección de Datos Personales</h2>
        <p>
          Si tu solicitud es rechazada, total o parcialmente, o no recibo respuesta dentro del plazo de 30 días
          corridos, puedes recurrir ante la <strong>Agencia de Protección de Datos Personales</strong> dentro de los
          30 días hábiles siguientes (art. 41 de la Ley N° 21.719). La Agencia es el organismo fiscalizador de la
          ley; su sitio oficial es <a href="https://www.datosprotegidos.gob.cl" target="_blank" rel="noopener noreferrer">datosprotegidos.gob.cl</a>.
        </p>

        <h2>12. Actualización de esta política</h2>
        <p>
          Esta política puede actualizarse cuando cambien los tratamientos de datos, los proveedores o la
          normativa aplicable. Toda versión nueva indicará su número de versión y fecha, y quedará publicada de
          forma permanente en esta página. Las versiones anteriores se conservan registradas y están disponibles
          para el titular o la Agencia cuando se soliciten.
        </p>
      </div>
    </section>
  );
}
