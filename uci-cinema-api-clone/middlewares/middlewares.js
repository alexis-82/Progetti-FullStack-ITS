const express = require('express');
const app = express();

// Middleware per il parsing del corpo delle richieste
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware per loggare le richieste HTTP
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Serve per far continuare la richiesta
});

// Middleware per gestire eventuali errori
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Errore interno del server');
});

module.exports = app;
