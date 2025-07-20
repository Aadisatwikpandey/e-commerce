import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import './ProductDetail.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { dispatch } = useContext(CartContext);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  if (!product) {
    return <div className="product-detail-container">{t('product_not_found')}</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.imageUrl} alt={product.name} className="main-image" />
        {/* Add thumbnails here if available */}
      </div>
      <div className="product-detail-info">
        <h1 className="product-detail-name">{product.name}</h1>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        <p className="product-detail-description">{product.description}</p>
        <button onClick={handleAddToCart} className="button button-primary add-to-cart-button">{t('add_to_cart')}</button>
        <button className="button button-secondary">{t('add_to_wishlist')}</button>
      </div>
    </div>
  );
};

export default ProductDetail;
