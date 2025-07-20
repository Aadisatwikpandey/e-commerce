import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ProductForm.css';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

const ProductForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const adminApiKey = process.env.REACT_APP_ADMIN_API_KEY || '';

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    stock: 0,
    categoryId: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch categories
    fetch('/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));

    // If editing, fetch product data
    if (id) {
      fetch(`/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price,
            imageUrl: data.imageUrl,
            stock: data.stock,
            categoryId: data.categoryId,
          });
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' || name === 'categoryId' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3001/products/${id}` : 'http://localhost:3001/products';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': adminApiKey,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/admin');
      } else {
        console.error('Failed to save product:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{id ? t('edit_product') : t('add_new_product')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="product-form-group">
          <label htmlFor="name">{t('name')}:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="product-form-group">
          <label htmlFor="description">{t('description')}:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="product-form-group">
          <label htmlFor="price">{t('price')}:</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required step="0.01" />
        </div>
        <div className="product-form-group">
          <label htmlFor="imageUrl">{t('image_url')}:</label>
          <input type="url" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
        </div>
        <div className="product-form-group">
          <label htmlFor="stock">{t('stock')}:</label>
          <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required />
        </div>
        <div className="product-form-group">
          <label htmlFor="categoryId">{t('category')}:</label>
          <select id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} required>
            <option value="">{t('select_a_category')}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="product-form-submit-button">{id ? t('update_product') : t('add_product')}</button>
      </form>
    </div>
  );
};

export default ProductForm;
