import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Homepage.css';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const Homepage = () => {
  const { t } = useTranslation();
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch bestsellers (first 4 products for now)
    fetch('http://localhost:3001/products?_limit=4')
      .then((res) => res.json())
      .then((data) => setBestsellers(data));

    // Fetch categories
    fetch('http://localhost:3001/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="homepage-container">
      <section className="hero-section">
        <h1>{t('hero_title')}</h1>
        <p>{t('hero_subtitle')}</p>
        <Link to="/products" className="button button-primary">{t('shop_collection')}</Link>
      </section>

      <section className="featured-categories">
        <h2>{t('featured_categories')}</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <Link to={`/products?category=${category.slug}`} key={category.id} className="category-card">
              <img src={`https://via.placeholder.com/350x350?text=${category.name}`} alt={category.name} />
              <div className="category-card-overlay">
                <h3>{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bestsellers-section">
        <h2>{t('bestsellers')}</h2>
        <div className="product-grid">
          {bestsellers.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-card-image" />
              <div className="product-card-content">
                <h3 className="product-card-title">{product.name}</h3>
                <p className="product-card-price">${product.price.toFixed(2)}</p>
                <Link to={`/products/${product.id}`} className="button button-secondary">{t('view_details')}</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
