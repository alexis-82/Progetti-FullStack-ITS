import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { catalogService } from '../../services/api';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log('Fetching product with ID:', id);
        const response = await catalogService.getProduct(id);
        console.log('Product response:', response);
        setProduct(response.data);
      } catch (error) {
        console.error('Errore dettagliato:', error);
        setError('Errore nel caricamento del prodotto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Caricamento...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div>Prodotto non trovato</div>;

  return (
    <div className="product-detail">
      <button className="back-button" onClick={() => navigate('/catalogo')}>
        ← Torna al catalogo
      </button>
      
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="product-id">ID: {product.id}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-price">€{product.price}</p>
      </div>
    </div>
  );
}

export default ProductDetail; 