import React, { useEffect, useState, useContext } from 'react';
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
    fetch('/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <p>Category: {product.category.name}</p>
          <button onClick={() => handleAddToCart(product)}>{t('add_to_cart')}</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
