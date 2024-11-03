FROM nginx:alpine

# Copia la configurazione di Nginx personalizzata dalla nuova posizione
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]