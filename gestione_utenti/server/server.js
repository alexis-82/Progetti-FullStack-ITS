// server.js
require("dotenv").config();
console.log(process.env);
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


const pool = mysql.createPool({
    host: '192.168.1.200',
    user: 'root',
    password: 'admin',
    database: 'gestione_utenti',
    port: '3306'
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
    console.log("Request body:", req.body); // Log del corpo della richiesta

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
    try {
        await pool.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [
            name,
            email,
            id,
        ]);
        res.json({ id, name, email });
    } catch (error) {
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
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
