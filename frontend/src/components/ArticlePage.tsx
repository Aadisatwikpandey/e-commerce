import React from 'react';
import { useParams } from 'react-router-dom';
import articles from '../data/articles.json';
import './ArticlePage.css';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === parseInt(id || ''));

  if (!article) {
    return <div>Article not found.</div>;
  }

  return (
    <div className="article-page-container">
      <img src={article.heroImage} alt={article.title} className="article-page-hero" />
      <h1 className="article-page-title">{article.title}</h1>
      <p className="article-page-author">By {article.author}</p>
      <div className="article-page-content" dangerouslySetInnerHTML={{ __html: article.content }}></div>
    </div>
  );
};

export default ArticlePage;
