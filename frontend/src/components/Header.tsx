import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const { state } = useContext(CartContext);

  const cartItemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <Link to="/">
        <img src="/logo.svg" alt="Logo" className="header-logo" />
      </Link>
      <nav className="header-nav">
        <Link to="/">{t('home')}</Link>
        <Link to="/products">{t('shop')}</Link>
        <Link to="/inspiration">{t('inspiration')}</Link>
        <Link to="/about">{t('about_us')}</Link>
      </nav>
      <div className="header-search">
        <input type="text" placeholder={t('search')} className="form-input" />
      </div>
      <div className="header-utility">
        <Link to="/stores">{t('find_a_store')}</Link>
        <Link to="/account">{t('account')}</Link>
        <Link to="/wishlist">{t('wishlist')}</Link>
        <Link to="/cart" className="cart-icon">
          {t('cart')}
          {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
