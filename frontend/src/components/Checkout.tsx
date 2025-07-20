import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { state, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { t } = useTranslation();

  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const orderItems = state.items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const response = await fetch('/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderItems),
      });

      if (response.ok) {
        setOrderPlaced(true);
        dispatch({ type: 'CLEAR_CART' });
      } else {
        alert(t('failed_to_place_order'));
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert(t('error_placing_order'));
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <h2>{t('order_placed_successfully')}</h2>
        <p>{t('thank_you_for_purchase')}</p>
        <button onClick={() => navigate('/')}>{t('continue_shopping')}</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>{t('checkout')}</h2>
      {state.items.length === 0 ? (
        <p>{t('your_cart_is_empty')}</p>
      ) : (
        <div className="checkout-summary">
          <h3>{t('order_summary')}</h3>
          {state.items.map((item) => (
            <div key={item.id} className="checkout-item">
              <p>{item.name} x {item.quantity} - ${item.price.toFixed(2)}</p>
            </div>
          ))}
          <h3>{t('total')}: ${total.toFixed(2)}</h3>
          <button onClick={handlePlaceOrder}>{t('place_order')}</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
