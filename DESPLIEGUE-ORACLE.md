# Despliegue en Oracle Cloud + Dominio .cl

Guía completa para mover tu web desde Azure a una **VM gratis (Always Free)** de Oracle Cloud
y publicarla con tu **dominio personalizado** con SSL (https).

Tu web es 100% estática, así que el plan es:

```
GitHub (código) → GitHub Actions (despliegue automático) → VM Oracle (nginx) → tu-dominio.cl
```

---

## Parte A — El dominio (NIC Chile + Cloudflare)

NIC Chile te pide los **servidores de nombres (DNS)** del dominio. Usaremos **Cloudflare gratis**
(te da DNS + SSL + CDN de regalo).

1. Créate una cuenta gratis en **https://dash.cloudflare.com**
2. Pulsa **"Add a site"** y escribe tu dominio (ej: `tudominio.cl`)
3. Cloudflare te mostrará **2 nameservers** (ej: `mia.ns.cloudflare.com`, `nila.ns.cloudflare.com`)
4. En **NIC Chile** (`clientes.nic.cl` → tu dominio → sección 4 *"Servidores de nombre (DNS)"*)
   escribe esos 2 nameservers y pulsa **"Actualizar datos de dominio"**.

> Si Cloudflare no te deja añadir el dominio porque aún no está activo, usa provisionalmente
> `ns1.desec.io` y `ns2.desec.io`, y cuando el dominio esté activo cámbialos por los de Cloudflare
> (el cambio tarda ~2 horas en propagar).

Cuando tu VM ya exista (Parte B), en Cloudflare añadirás 2 **registros A**:

| Tipo | Nombre | Contenido (valor) | Proxy |
|------|--------|-------------------|-------|
| A    | `@`    | `IP pública de tu VM` | DNS only (nube gris) |
| A    | `www`  | `IP pública de tu VM` | DNS only (nube gris) |

> Importante: empieza con **nube gris** (DNS only) para que Let's Encrypt pueda emitir el certificado.
> Cuando tu web funcione con https, puedes activar el proxy de Cloudflare (nube naranja) si quieres.

---

## Parte B — Crear la VM en Oracle Cloud (Always Free)

1. Entra a tu consola de Oracle Cloud y ve a **Compute → Instances → Create instance**.
2. Nombre: el que quieras (ej: `mi-web`).
3. **Image**: elige **Ubuntu** (22.04 o 24.04) — el script de este repo está hecho para Ubuntu.
4. **Shape**: *Ampere A1 Flex* (si hay capacidad) o *VM.Standard.E2.1.Micro* — ambos **Always Free**.
5. **SSH keys**: pulsa "Paste public keys" y pega el contenido del archivo
   **`_deploy_keys\vm_deploy_key.pub`** (está en esta misma carpeta).
6. Red: déjalo en "Create new virtual cloud network" (o tu VCN existente).
7. Crea la instancia y anota su **IP pública** (la ves en la lista de instancias).

### Abrir los puertos 80 y 443 en Oracle

1. Ve a **Networking → Virtual Cloud Networks → tu VCN → Security Lists → Default Security List**.
2. **Add Ingress Rules** y añade estas dos reglas:

| Source Type | Source CIDR | IP Protocol | Source Port Range | Destination Port Range |
|-------------|-------------|-------------|-------------------|------------------------|
| CIDR        | 0.0.0.0/0   | TCP         | All               | **80**                 |
| CIDR        | 0.0.0.0/0   | TCP         | All               | **443**                |

---

## Parte C — Configurar el servidor (una sola vez)

Desde una terminal en esta carpeta (Windows PowerShell), copia el script a la VM y ejecútalo:

```powershell
# Conectarte por primera vez (opcional, para probar acceso):
ssh -i "_deploy_keys\vm_deploy_key" ubuntu@IP_DE_TU_VM

# Copiar el script de instalación a la VM:
scp -i "_deploy_keys\vm_deploy_key" deploy\setup-server.sh ubuntu@IP_DE_TU_VM:~/

# Ejecutar el script (te pedirá contraseña? no, usa la llave):
ssh -i "_deploy_keys\vm_deploy_key" ubuntu@IP_DE_TU_VM "sudo bash setup-server.sh tudominio.cl tu@correo.com"
```

**Requiere que el dominio ya apunte a la IP** (registros A de la Parte A), porque el script
pide el certificado SSL automáticamente. Si aún no has puesto los registros, ejecuta el script
cuando ya estén activos (propagación ~minutos, puedes verificar con `ping tudominio.cl`).

El script instala nginx, crea la carpeta `/var/www/tudominio.cl`, configura el sitio
y pide el certificado SSL gratuito de Let's Encrypt.

---

## Parte D — Despliegue automático (GitHub Actions)

El workflow ya está preparado en `.github/workflows/deployment.yml`. Cada vez que hagas
`push` a `main`, sube automáticamente tu web a la VM.

Solo falta crear 4 **secretos** en GitHub:

1. Ve a tu repo en GitHub → **Settings → Secrets and variables → Actions → New repository secret**.
2. Crea estos secretos:

| Secreto | Valor |
|---------|-------|
| `VM_HOST` | La IP pública de tu VM |
| `VM_USER` | `ubuntu` |
| `VM_DEPLOY_DIR` | `/var/www/tudominio.cl` |
| `VM_SSH_KEY` | El contenido COMPLETO del archivo `_deploy_keys\vm_deploy_key` (la llave privada, empieza por `-----BEGIN OPENSSH PRIVATE KEY-----`) |

3. Sube el código con estos archivos nuevos:

```powershell
git add -A
git commit -m "Despliegue a Oracle Cloud"
git push
```

4. Verifica en **Actions** que el workflow corre y termina en verde.
5. Entra a `https://tudominio.cl` — ¡tu web está publicada con SSL!

> El workflow ignora las carpetas `deploy/` y `_deploy_keys/`, así que ni el script
> ni tu llave privada se suben a la web.

---

## Parte E — Retirar Azure (cuando todo funcione)

- Elimina el secreto `AZURE_CONNECTION_STRING` de los secretos de GitHub.
- Borra el storage account / recursos de Azure que ya no uses para no pagar de más.
- (Opcional) Habilita el proxy de Cloudflare (nube naranja) para activar la CDN.

---

## Troubleshooting rápido

- **No carga / ERR_NAME_NOT_RESOLVED** → los registros A no están bien o no han propagado. Verifica en Cloudflare y con `nslookup tudominio.cl`.
- **Timeout de conexión** → los puertos 80/443 no están abiertos en la Security List de Oracle.
- **El workflow falla al conectar por SSH** → revisa que la llave pública esté en la VM y que `VM_SSH_KEY` sea la llave privada completa (sin saltos de línea extraños).
- **ERR_CERT / certificado** → el dominio no apuntaba a la IP cuando se pidió el certificado. Una vez que apunte, vuelve a ejecutar: `sudo certbot --nginx -d tudominio.cl -d www.tudominio.cl`.
