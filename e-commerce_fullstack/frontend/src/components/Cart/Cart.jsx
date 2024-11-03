import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_ENDPOINTS } from '../../config/api'
import { CartContext } from '../../context/CartContext'
import './Cart.css'

function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext)

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cartItems,
        totalAmount: calculateTotal()
      };
      
      await axios.post(`${API_ENDPOINTS.order}/create`, orderData);
      clearCart();
      navigate('/ordini');
    } catch (error) {
      console.error('Errore durante il checkout:', error);
      // Gestisci l'errore (mostra un messaggio all'utente)
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <i className="fas fa-shopping-cart"></i>
        <h2>Il tuo carrello è vuoto</h2>
        <p>Aggiungi qualche prodotto per iniziare lo shopping!</p>
        <button onClick={() => navigate('/catalogo')}>
          Vai al Catalogo
        </button>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1>Il tuo Carrello</h1>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">€{item.price}</p>
            </div>

            <div className="quantity-controls">
              <button 
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="quantity-btn"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>

            <button 
              onClick={() => removeFromCart(item.id)}
              className="remove-btn"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotale:</span>
          <span>€{calculateTotal().toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Spedizione:</span>
          <span>{calculateTotal() > 50 ? 'Gratuita' : '€4.99'}</span>
        </div>
        <div className="summary-row total">
          <span>Totale:</span>
          <span>€{(calculateTotal() + (calculateTotal() > 50 ? 0 : 4.99)).toFixed(2)}</span>
        </div>

        <button 
          className="checkout-btn"
          onClick={handleCheckout}
        >
          Procedi al Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart 