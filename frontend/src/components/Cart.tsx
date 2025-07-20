import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Cart.css';

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const { t } = useTranslation();

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>{t('shopping_cart')}</h2>
      {state.items.length === 0 ? (
        <p className="cart-empty-message">{t('your_cart_is_empty')}</p>
      ) : (
        <>
          <div className="cart-items">
            {state.items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{t('price')}: ${item.price.toFixed(2)}</p>
                  <p>{t('quantity')}: {item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleRemoveFromCart(item.id)} className="button button-secondary">{t('remove')}</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>{t('total')}: ${total.toFixed(2)}</h3>
            <Link to="/checkout">
              <button className="button button-primary checkout-button">{t('proceed_to_checkout')}</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
