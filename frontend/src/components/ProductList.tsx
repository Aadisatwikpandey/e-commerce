import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { CartContext } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: {
    name: string;
  };
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useContext(CartContext);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="product-list-container">
      <div className="product-grid">
        {products.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-card-image" />
            <div className="product-card-content">
              <h3 className="product-card-title">{product.name}</h3>
              <p className="product-card-description">{product.description}</p>
              <p className="product-card-price">${product.price.toFixed(2)}</p>
              <p className="product-card-category">Category: {product.category.name}</p>
              <div className="product-card-actions">
                <button onClick={(e) => { e.preventDefault(); handleAddToCart(product); }} className="button button-primary">{t('add_to_cart')}</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
