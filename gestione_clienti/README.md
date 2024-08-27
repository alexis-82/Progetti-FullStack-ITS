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

```javascript
// server.js
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
});

// Verifica la connessione al database
pool.getConnection()
    .then((connection) => {
        console.log("Successfully connected to the database.");
        connection.release();
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });

// GET tutti gli utenti
app.get("/users", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: error.message });
    }
});

// POST nuovo utente
app.post("/users", async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required." });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            [name, email]
        );
        res.status(201).json({ id: result.insertId, name, email });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: error.message });
    }
});

// PUT aggiorna utente
app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required." });
    }

    try {
        await pool.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [
            name,
            email,
            id,
        ]);
        res.json({ id, name, email });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: error.message });
    }
});

// DELETE elimina utente
app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM users WHERE id = ?", [id]);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
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

### 1. **File di Configurazione di React (`UserManagement.js`)**

```javascript
// src/components/UserManagement.js
import React, { useState, useEffect } from "react";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3001/users");
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await updateUser(editingId, name, email);
        } else {
            await createUser(name, email);
        }
        setName('');
        setEmail('');
        setEditingId(null);
        fetchUsers();
    };

    const createUser = async (name, email) => {
        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('User created:', data);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const updateUser = async (id, name, email) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });
            if (!response.ok) throw new Error("Network response was not ok");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/users/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Network response was not ok");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const editUser = (user) => {
        setName(user.name);
        setEmail(user.email);
        setEditingId(user.id);
    };

    return (
        <div>
            <h1>User Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">
                    {editingId ? "Update" : "Add"} User
                </button>
            </form>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <button onClick={() => editUser(user)}>Edit</button>
                        <button onClick={() => deleteUser(user.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserManagement;
```

### 2. **Installazione delle Dipendenze**

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