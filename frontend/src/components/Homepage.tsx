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
      {/* Promotional Banner */}
      <div className="promo-banner" style={{background: 'linear-gradient(90deg, #ffd600 60%, #0058a3 100%)', color: '#003e6b', padding: '18px 0', textAlign: 'center', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.02em', marginBottom: 0}}>
        <span role="img" aria-label="offer">🎉</span> {t('promo_banner', {defaultValue: 'Mega Monsoon Sale! Up to 50% OFF on Sofas, Chairs & More. Free Delivery Above ₹5000.'})}
      </div>

      <section className="hero-section">
        <h1>{t('hero_title')}</h1>
        <p>{t('hero_subtitle')}</p>
        <Link to="/products" className="button button-primary">{t('shop_collection')}</Link>
      </section>

      {/* Service Features Section */}
      <section className="service-features" style={{display: 'flex', justifyContent: 'center', gap: '48px', background: '#fff', padding: '32px 0', margin: '0 0 32px 0', borderRadius: '0 0 18px 18px', boxShadow: '0 2px 12px rgba(0,88,163,0.06)'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <span style={{fontSize: '2rem', color: '#0058a3'}}>🚚</span>
          <span style={{fontWeight: 600, marginTop: 8}}>Free Delivery</span>
          <span style={{fontSize: '0.95rem', color: '#666'}}>On orders above ₹5000</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <span style={{fontSize: '2rem', color: '#0058a3'}}>🛡️</span>
          <span style={{fontWeight: 600, marginTop: 8}}>2 Year Warranty</span>
          <span style={{fontSize: '0.95rem', color: '#666'}}>On select products</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <span style={{fontSize: '2rem', color: '#0058a3'}}>💳</span>
          <span style={{fontWeight: 600, marginTop: 8}}>Easy EMI</span>
          <span style={{fontSize: '0.95rem', color: '#666'}}>No cost EMI available</span>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <span style={{fontSize: '2rem', color: '#0058a3'}}>🏬</span>
          <span style={{fontWeight: 600, marginTop: 8}}>Store Locator</span>
          <span style={{fontSize: '0.95rem', color: '#666'}}>Find a Nilkamal store near you</span>
        </div>
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
