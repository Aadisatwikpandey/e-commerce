import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="App-header">
      <h1>
        <Link to="/">{t('site_title')}</Link>
      </h1>
      <nav>
        <Link to="/cart">{t('cart')}</Link>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('hi')}>हिंदी</button>
      </nav>
    </header>
  );
};

export default Header;
