FROM node:18-alpine AS basket
WORKDIR /app/basket

# Copia package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice
COPY . .

EXPOSE 3000
CMD ["npm", "start"]