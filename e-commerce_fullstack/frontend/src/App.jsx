import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Homepage from './components/Homepage/Homepage'
import Catalog from './components/Catalog/Catalog'
import Cart from './components/Cart/Cart'
import Orders from './components/Orders/Orders'
import { CartProvider } from './context/CartContext'
import ProductDetail from './components/Product/ProductDetail'
import './styles/App.css'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/catalogo/:id" element={<ProductDetail />} />
              <Route path="/carrello" element={<Cart />} />
              <Route path="/ordini" element={<Orders />} />
              {/* Rimuovi o commenta questa riga finché non hai il componente Inventory */}
              {/* <Route path="/inventario" element={<Inventory />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
