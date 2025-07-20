import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import articles from '../data/articles.json';
import './InspirationHub.css';

const InspirationHub = () => {
  const { t } = useTranslation();

  return (
    <div className="inspiration-hub-container">
      <h1>{t('inspiration_hub')}</h1>
      <div className="article-grid">
        {articles.map((article) => (
          <Link to={`/inspiration/${article.id}`} key={article.id} className="article-card">
            <img src={article.heroImage} alt={article.title} className="article-card-image" />
            <div className="article-card-content">
              <h3 className="article-card-title">{article.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InspirationHub;
