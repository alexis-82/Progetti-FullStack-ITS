-- Creazione del database
CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;

-- Tabella Catalogo
CREATE TABLE IF NOT EXISTS catalog (
    sku VARCHAR(50) PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Popolamento della tabella Catalogo
INSERT INTO catalog (sku, description, price) VALUES
('SKU001', 'Prodotto 1', 10.50),
('SKU002', 'Prodotto 2', 15.99),
('SKU003', 'Prodotto 3', 25.00);

-- Tabella Ordini
CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_name VARCHAR(255) NOT NULL,
    shipping_address VARCHAR(255) NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_zip VARCHAR(10) NOT NULL,
    sku VARCHAR(50),
    quantity INT NOT NULL,
    order_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (sku) REFERENCES catalog(sku)
);

-- Popolamento della tabella Ordini
INSERT INTO orders (customer_name, shipping_address, shipping_city, shipping_zip, sku, quantity, order_total) VALUES
('Mario Rossi', 'Via Roma, 10', 'Roma', '00100', 'SKU001', 2, 21.00),
('Luca Bianchi', 'Via Milano, 20', 'Milano', '20100', 'SKU002', 1, 15.99),
('Anna Verdi', 'Via Napoli, 5', 'Napoli', '80100', 'SKU003', 3, 75.00);

-- Tabella Inventario
CREATE TABLE IF NOT EXISTS inventory (
    sku VARCHAR(50) PRIMARY KEY,
    stock INT NOT NULL,
    FOREIGN KEY (sku) REFERENCES catalog(sku)
);

-- Popolamento della tabella Inventario
INSERT INTO inventory (sku, stock) VALUES
('SKU001', 100),
('SKU002', 50),
('SKU003', 30);
