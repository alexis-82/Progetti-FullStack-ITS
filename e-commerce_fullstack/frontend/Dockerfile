# Build stage
FROM node:latest AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --force

# Production stage
FROM nginx:alpine

# Copia i file di build nella directory corretta di Nginx
COPY --from=build /app/dist /usr/share/nginx/html/
# Assicuriamoci che la directory esista e abbia i permessi corretti
RUN chmod -R 755 /usr/share/nginx/html/

# Non serve copiare una configurazione nginx qui perché useremo quella del gateway
EXPOSE 80
