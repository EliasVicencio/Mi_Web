#!/usr/bin/env bash
#
# Instala y configura nginx + SSL (Let's Encrypt) para tu web en la VM de Oracle.
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

cat > "/etc/nginx/sites-available/${DOMAIN}" << 'NGINXCONF'
server {
    listen 80;
    listen [::]:80;
    server_name __DOMAIN__ www.__DOMAIN__;

    root __WEBROOT__;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(css|js|png|jpg|jpeg|svg|ico|webp|gif|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
}
NGINXCONF

sed -i "s|__DOMAIN__|${DOMAIN}|g; s|__WEBROOT__|${WEBROOT}|g" "/etc/nginx/sites-available/${DOMAIN}"

ln -sf "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable --now nginx

echo "==> [4/5] Pidiendo certificado SSL gratuito (Let's Encrypt)..."
CERT_DOMAINS=("${DOMAIN}")
if getent hosts "www.${DOMAIN}" >/dev/null 2>&1; then
  CERT_DOMAINS+=("www.${DOMAIN}")
fi
CERT_ARGS=()
for d in "${CERT_DOMAINS[@]}"; do
  CERT_ARGS+=(-d "$d")
done
certbot --nginx "${CERT_ARGS[@]}" --non-interactive --agree-tos -m "${EMAIL}" --redirect

echo "==> [5/5] Listo"
echo "Tu web deberia estar disponible en https://${DOMAIN}"
