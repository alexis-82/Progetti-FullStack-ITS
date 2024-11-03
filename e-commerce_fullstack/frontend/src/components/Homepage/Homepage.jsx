import { useNavigate } from 'react-router-dom'
import './Homepage.css'

function Homepage() {
  const navigate = useNavigate()

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>il Mercatino di Foschi</h1>
          <p>Compra quel che vuoi, ma compra qui da noi!</p>
          <button 
            className="cta-button"
            onClick={() => navigate('/catalogo')}
          >
            Esplora il Catalogo
          </button>
        </div>
      </section>

      {/* Sezione vantaggi */}
      <section className="benefits">
        <h2>I nostri vantaggi</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <i className="fas fa-truck"></i>
            <h3>Spedizione Gratuita</h3>
            <p>Per ordini superiori a 50€</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-undo"></i>
            <h3>Resi Gratuiti</h3>
            <p>Entro 30 giorni</p>
          </div>
          <div className="benefit-card">
            <i className="fas fa-headset"></i>
            <h3>Supporto 24/7</h3>
            <p>Sempre al tuo servizio</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage 