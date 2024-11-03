import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Chi Siamo</h3>
          <p>Il tuo negozio online di fiducia per prodotti di qualità</p>
        </div>

        <div className="footer-section">
          <h3>Link Utili</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalogo">Catalogo</Link></li>
            <li><Link to="/ordini">I miei ordini</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contatti</h3>
          <ul>
            <li><i className="fas fa-phone"></i> +39 123 456 7890</li>
            <li><i className="fas fa-envelope"></i> info@eshop.it</li>
            <li><i className="fas fa-map-marker-alt"></i> Via Roma 123, Milano</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Seguici</h3>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 E-Shop. Tutti i diritti riservati.</p>
      </div>
    </footer>
  )
}

export default Footer 