import React, { useState, useEffect } from 'react'
import { catalogService, inventoryService } from '../../services/api'
import './Catalog.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

function Catalog() {
  const [products, setProducts] = useState([])
  const [inventory, setInventory] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        console.log('Inizio recupero dati...')

        const catalogResponse = await catalogService.getProducts()
        console.log('Risposta catalogo:', catalogResponse)

        // Mappiamo solo i campi necessari da FakeStoreAPI
        const mappedProducts = catalogResponse.data.map(product => ({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price
        }))

        setProducts(mappedProducts)
      } catch (error) {
        console.error('Errore dettagliato:', error)
        setError('Errore nel caricamento dei prodotti')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
})

  return (
    <div className="catalog-container">
      <div className="catalog-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Cerca prodotti..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Caricamento prodotti in corso...</p>
        </div>
      ) : error ? (
        <div className="error">
          <i className="fas fa-exclamation-triangle"></i>
          <p>{error}</p>
          <button onClick={() => fetchData()}>Riprova</button>
        </div>
      ) : products.length === 0 ? (
        <div className="no-products">
          <p>Nessun prodotto disponibile</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <h3 className="product-title">
                <Link to={`/catalogo/${product.id}`}>{product.title}</Link>
              </h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">€{product.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Aggiungi al carrello
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalog 