
# Utilizzare Vite con React

## Introduzione

Vite è un build tool moderno che offre un'esperienza di sviluppo veloce e ottimizzata per applicazioni front-end. Utilizzarlo con React permette di sfruttare le sue capacità di hot module replacement (HMR), build rapide e configurazione semplice.

## Prerequisiti

- Node.js (versione 12.0.0 o superiore)
- npm (versione 6.0.0 o superiore) o yarn

## Creazione di un Progetto React con Vite

### 1. Creare un nuovo progetto

Puoi creare un nuovo progetto React con Vite utilizzando il comando `npm init vite@latest` o `yarn create vite`.

Esempio con npm:

```bash
npm init vite@latest my-react-app -- --template react
```
oppure con il comando seguente non crea una nuova cartella ma rimane quella clonata
```bash
npm init vite@latest . -- --template react
```

Esempio con yarn:

```bash
yarn create vite my-react-app --template react
```

### 2. Installare le dipendenze

Dopo aver creato il progetto, spostati nella directory del progetto e installa le dipendenze:

```bash
cd my-react-app
npm install
# oppure
yarn install
```

### 3. Struttura del progetto

Il progetto creato avrà una struttura simile a questa:

```
my-react-app/
├── node_modules/
├── public/
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Script di Avvio

### 1. Avviare il server di sviluppo

Per avviare il server di sviluppo con hot module replacement (HMR), usa il seguente comando:

```bash
npm run dev
# oppure
yarn dev
```

### 2. Creare una build di produzione

Per creare una build ottimizzata per la produzione:

```bash
npm run build
# oppure
yarn build
```

### 3. Servire la build di produzione

Per servire localmente la build di produzione, puoi utilizzare il seguente comando:

```bash
npm run serve
# oppure
yarn serve
```

## Configurazione di Vite

Il file `vite.config.js` contiene la configurazione di Vite. Puoi personalizzare le impostazioni come necessario. Esempio di una configurazione di base:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
});
```

## Uso di Componenti React

Puoi creare e utilizzare componenti React come al solito. Esempio di un componente di base (`src/App.jsx`):

```javascript
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Hello, Vite + React!</h1>
    </div>
  );
}

export default App;
```

### Stili

Puoi aggiungere stili utilizzando file CSS o librerie di stile preferite. Esempio di utilizzo di un file CSS (`src/App.css`):

```css
.App {
  font-family: sans-serif;
  text-align: center;
}
```

E importare il file CSS nel componente (`src/App.jsx`):

```javascript
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello, Vite + React!</h1>
    </div>
  );
}

export default App;
```

## Conclusione

Con Vite, puoi creare applicazioni React in modo rapido e efficiente, beneficiando di tempi di build più veloci e di una configurazione minimale. Questo documento fornisce una guida di base per iniziare, ma Vite offre molte altre funzionalità avanzate che puoi esplorare nella [documentazione ufficiale di Vite](https://vitejs.dev/).