#!/usr/bin/env bash
#
# Instala y configura nginx + SSL (Let's Encrypt) para tu web en la VM de Oracle.
#
# Uso (dentro de la VM, sobre Ubuntu):
#   sudo bash setup-server.sh tudominio.cl tu@correo.com
#
# Requisitos ANTES de ejecutarlo:
#   1) Tu dominio (y www) debe apuntar a la IP publica de la VM (registro A en Cloudflare).
#   2) Puertos 80 y 443 abiertos en Oracle (Security List de la VCN).
#
set -euo pipefail

DOMAIN="${1:?Falta el dominio. Ejemplo: sudo bash setup-server.sh tudominio.cl tu@correo.com}"
EMAIL="${2:?Falta el correo para Let's Encrypt. Ejemplo: sudo bash setup-server.sh tudominio.cl tu@correo.com}"

WEBROOT="/var/www/${DOMAIN}"
DEPLOY_USER="${SUDO_USER:-ubuntu}"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Error: ejecuta con sudo: sudo bash setup-server.sh ${DOMAIN} ${EMAIL}"
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive

echo "==> [1/5] Actualizando el sistema..."
apt-get update -y
apt-get upgrade -y

echo "==> [2/5] Instalando nginx, certbot y rsync..."
apt-get install -y nginx certbot python3-certbot-nginx rsync

echo "==> [3/5] Creando carpeta web y config de nginx..."
mkdir -p "${WEBROOT}"
chown -R "${DEPLOY_USER}:${DEPLOY_USER}" "${WEBROOT}"

cat > "/etc/nginx/sites-available/${DOMAIN}" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    root ${WEBROOT};
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location ~* \\.(css|js|png|jpg|jpeg|svg|ico|webp|gif|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }
}
EOF

ln -sf "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable --now nginx

echo "==> [4/5] Pidiendo certificado SSL gratuito (Let's Encrypt)..."
certbot --nginx -d "${DOMAIN}" -d "www.${DOMAIN}" \
  --non-interactive --agree-tos -m "${EMAIL}" --redirect

echo "==> [5/5] Listo"
echo "Tu web deberia estar disponible en https://${DOMAIN}"
echo "Siguiente paso: desplegar el contenido con GitHub Actions (ver DESPLIEGUE-ORACLE.md)."
