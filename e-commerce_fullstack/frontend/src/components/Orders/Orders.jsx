import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import './Orders.css'

function Orders() {
  const { cartItems } = useContext(CartContext)

  return (
    <div className="orders-container">
      <h1>I tuoi Ordini</h1>
      {cartItems.length === 0 ? (
        <div className="empty-orders">
          <h2>Non hai ancora effettuato ordini.</h2>
          <p>Inizia a fare acquisti nel nostro catalogo!</p>
        </div>
      ) : (
        <div className="orders-list">
          {cartItems.map(item => (
            <div key={item.id} className="order-item">
              <img src={item.image} alt={item.name} />
              <div className="order-details">
                <h3>{item.name}</h3>
                <p>Prezzo: €{item.price}</p>
                <p>Quantità: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders 