#!/bin/sh

mkdir -p /etc/nginx/certs

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/certs/selfsigned.key -out /etc/nginx/certs/selfsigned.crt -subj /C=US/ST=IL/L=Chicago/O=Ropnop/OU=Testing/CN=nginxtty.ropnop.com


if [ -z ${GOTTY_CREDENTIALS} ]; then
    /usr/local/bin/gotty -a 127.0.0.1 -w --reconnect --ws-origin '.*' /bin/bash &
else
    /usr/local/bin/gotty -a 127.0.0.1 -w --reconnect -c "${GOTTY_CREDENTIALS}" --ws-origin '.*' /bin/bash &
fi

nginx -g 'daemon off;'
