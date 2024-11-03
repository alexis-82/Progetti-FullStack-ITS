const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configurazione database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.BASKET_ORDER_DB
});

// Test connessione database
db.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connesso al database MySQL');
});

// Routes per il carrello
app.post('/api/basket/add', (req, res) => {
  const { productId, quantity } = req.body;
  // TODO: Implementare logica per aggiungere al carrello
  res.json({ message: 'Prodotto aggiunto al carrello', productId, quantity });
});

app.get('/api/basket', (req, res) => {
  // TODO: Implementare logica per ottenere il carrello
  res.json({ items: [] });
});

// Routes per gli ordini
app.post('/api/order/create', (req, res) => {
  // TODO: Implementare logica per creare un ordine
  res.json({ message: 'Ordine creato con successo' });
});

app.get('/api/order', (req, res) => {
  // TODO: Implementare logica per ottenere gli ordini
  res.json({ orders: [] });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Gestione errori
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Qualcosa è andato storto!' });
});

const PORT = process.env.BASKET_ORDER_PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
  console.log('Configurazione Database:');
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`Port: ${process.env.DB_PORT}`);
  console.log(`Database: ${process.env.BASKET_ORDER_DB}`);
}); 