import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const { cartItems } = useContext(CartContext) || { cartItems: [] }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          E-Shop
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/catalogo" className="nav-link">Catalogo</Link>
          <Link to="/ordini" className="nav-link">I miei ordini</Link>
        </div>

        <div className="navbar-actions">
          <button 
            className="cart-button"
            onClick={() => navigate('/carrello')}
          >
            <i className="fas fa-shopping-cart"></i>
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 