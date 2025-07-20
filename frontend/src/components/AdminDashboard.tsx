import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './AdminDashboard.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: {
    name: string;
  };
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { t } = useTranslation();
  const adminApiKey = process.env.REACT_APP_ADMIN_API_KEY || ''; // Get API key from .env

  const fetchProducts = async () => {
    try {
      const response = await fetch('/products', {
        headers: {
          'x-api-key': adminApiKey,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm(t('confirm_delete_product'))) {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`, {
          method: 'DELETE',
          headers: {
            'x-api-key': adminApiKey,
          },
        });
        if (response.ok) {
          fetchProducts(); // Refresh the list
        } else {
          console.error('Failed to delete product:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>{t('admin_dashboard')}</h2>
      <div className="admin-actions">
        <Link to="/admin/products/new">
          <button className="button button-primary">{t('add_new_product')}</button>
        </Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>{t('name')}</th>
            <th>{t('price')}</th>
            <th>{t('stock')}</th>
            <th>{t('category')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>{product.category?.name || 'N/A'}</td>
              <td className="admin-table-actions">
                <Link to={`/admin/products/edit/${product.id}`}>
                  <button className="button button-secondary">{t('edit')}</button>
                </Link>
                <button onClick={() => handleDelete(product.id)} className="button button-secondary">{t('delete')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
