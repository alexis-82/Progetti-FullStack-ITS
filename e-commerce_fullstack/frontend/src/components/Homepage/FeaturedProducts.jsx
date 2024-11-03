import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import './FeaturedProducts.css'

function FeaturedProducts() {
  const { cartItems, addToCart } = useContext(CartContext)

  const featuredProducts = [
    {
      id: 1,
      name: 'Smartphone XYZ',
      price: 299.99,
      image: 'https://via.placeholder.com/200',
      description: 'Smartphone di ultima generazione'
    },
    {
      id: 2,
      name: 'T-Shirt Basic',
      price: 19.99,
      image: 'https://via.placeholder.com/200',
      description: 'T-Shirt in cotone 100% Made in Italy'
    },
    // Aggiungi altri prodotti in evidenza qui
  ]

  return (
    <section className="featured-products">
      <h2>Prodotti in Evidenza</h2>
      <div className="products-grid">
        {featuredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
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
    </section>
  )
}

export default FeaturedProducts
