
# Utilizzo di Vite con React

[Vite](https://vitejs.dev/) è uno strumento di build moderno e leggero per applicazioni web che offre un'esperienza di sviluppo estremamente veloce. Ecco come utilizzare Vite con React.

## Installazione

1. Crea un nuovo progetto React con Vite:

```bash
npm create vite@latest my-react-app --template react
```

2. Accedi alla directory del progetto:

```bash
cd my-react-app
```

3. Installa le dipendenze:

```bash
npm install
```

## Avvio dello sviluppo

Per avviare lo sviluppo, esegui il seguente comando:

```bash
npm run dev
```

Questo comando avvierà il server di sviluppo di Vite e aprirà automaticamente il tuo browser all'indirizzo `http://localhost:5173/`. Ogni volta che modifichi i file, Vite ricompilerà il codice e aggiornerà automaticamente la pagina nel browser.

## Struttura del progetto

Ecco la struttura di base di un progetto React creato con Vite:

```
my-react-app/
├── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── package.json
├── vite.config.js
└── ...
```

- `index.html`: Il file HTML di base che contiene l'elemento `<div id="root"></div>` dove React renderizzerà l'applicazione.
- `src/main.jsx`: Il file di ingresso principale che importa React e ReactDOM e renderizza l'applicazione React nell'elemento `<div id="root"></div>`.
- `src/App.jsx`: Il componente principale della tua applicazione React.
- `package.json`: Il file di configurazione di npm con le dipendenze e gli script.
- `vite.config.js`: Il file di configurazione di Vite (opzionale).

## Componenti React

I componenti React possono essere definiti come file `.jsx` all'interno della directory `src/`. Ad esempio, ecco come potrebbe essere il file `src/App.jsx`:

```jsx
import React from 'react'

function App() {
  return (
    <div>
      <h1>Ciao, Vite + React!</h1>
    </div>
  )
}

export default App
```

## Build per la produzione

Per creare una build di produzione ottimizzata, esegui il seguente comando:

```bash
npm run build
```

Questo comando creerà una directory `dist/` con tutti i file necessari per distribuire l'applicazione in produzione.

## Configurazione Vite

Vite può essere configurato ulteriormente tramite il file `vite.config.js` nella directory principale del progetto. Questo file esporta un oggetto di configurazione che può essere utilizzato per personalizzare il comportamento di Vite.

Per ulteriori informazioni sulla configurazione di Vite, consulta la [documentazione ufficiale](https://vitejs.dev/config/).

Questa guida ti fornisce una panoramica di base sull'utilizzo di Vite con React. Per approfondire ulteriormente l'argomento, ti consiglio di consultare la documentazione ufficiale di [Vite](https://vitejs.dev/guide/) e [React](https://reactjs.org/docs/getting-started.html).
