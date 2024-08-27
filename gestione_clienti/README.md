# Mini Documentazione: Sistema di Gestione Utenti

## Descrizione

Questo progetto consiste in una semplice applicazione fullstack per la gestione degli utenti. Consente di creare, leggere, aggiornare e eliminare (CRUD) utenti attraverso un'interfaccia web e un server backend. Utilizza **Node.js** con **Express** per il backend e **React** per il frontend. Il database utilizzato è **MySQL**.

## Struttura del Progetto

```
gestione_utenti/
├── client/
└── server/
```

### Backend

- **Server:** Node.js con Express
- **Database:** MySQL (Docker)
- **Gestione delle Dipendenze:** `mysql2/promise`, `express`, `dotenv`, `cors`

### Frontend

- **Framework:** React
- **Gestione dello Stato:** `useState`, `useEffect`
- **Richieste HTTP:** `fetch`

## Configurazione del Backend

### 1. **File di Configurazione (`.env`)**

Crea un file `.env` nella radice del progetto con le seguenti variabili di ambiente:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=gestione_clienti
DB_PORT=3306
PORT=3001
```

### 2. **File del Server (`server.js`)**

```bash
cd gestione_utenti/server
```

Installazione di Node.js e dipendenze:

```bash
npm init -y
npm install express mysql2 cors dotenv
```

### 3. **Setup del Database**

Assicurati di avere una tabella `users` nel database `gestione_clienti`. Ecco un esempio di schema per la tabella:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
```

## Configurazione del Frontend

### 1. **Cartella del Client**

```bash
cd ..
npx create-react-app client
```

### 2. **File di Configurazione di React (`UserManagement.js`)**

```bash
cd gestione_utenti/client/src/components/
```

### 3. **Installazione delle Dipendenze**

Assicurati di avere le seguenti dipendenze nel tuo progetto React:

```bash
npm install react react-dom
```

## Avvio dell'Applicazione

### 1. **Avviare il Server Backend**

Nella cartella del progetto backend /server:

```bash
node server.js
```

### 2. **Avviare il Client React**

Nella cartella del progetto frontend /client:

```bash
npm start
```

L'applicazione sarà disponibile su `http://localhost:3000`, e il server backend su `http://localhost:3001`:



## Test dell'Applicazione

1. **Verifica che il server backend risponda correttamente:** Usa Postman o cURL per testare le API.

```bash
curl -X POST http://localhost:3001/users -H "Content-Type: application/json" -d '{"name": "Test User", "email": "testuser@example.com"}'

```

2. **Interagisci con il frontend:** Crea, aggiorna e elimina utenti attraverso l