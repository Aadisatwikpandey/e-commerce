import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useTranslation } from 'react-i18next';
import './Wishlist.css';

const Wishlist = () => {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { t } = useTranslation();

  const removeFromWishlist = (productId: number) => {
    wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  if (wishlistState.items.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>{t('wishlist_empty', { defaultValue: 'Your Wishlist is Empty' })}</h2>
        <p>{t('wishlist_empty_message', { defaultValue: 'Add items to your wishlist to save them for later!' })}</p>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2>{t('my_wishlist', { defaultValue: 'My Wishlist' })}</h2>
      <div className="wishlist-grid">
        {wishlistState.items.map(product => (
          <div key={product.id} className="wishlist-item">
            <img src={product.imageUrl} alt={product.name} className="wishlist-item-image" />
            <div className="wishlist-item-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="wishlist-item-price">₹{product.price.toLocaleString()}</p>
              <button 
                onClick={() => removeFromWishlist(product.id)}
                className="button button-secondary"
              >
                {t('remove_from_wishlist', { defaultValue: 'Remove from Wishlist' })}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
