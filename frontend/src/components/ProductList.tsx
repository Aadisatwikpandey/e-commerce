import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { CartContext } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  t: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, t }) => {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const isInWishlist = wishlistState.items.some(item => item.id === product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-card-image" />
      <div className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-description">{product.description}</p>
        <p className="product-card-category">{product.category.name}</p>
        <p className="product-card-price">₹{product.price.toLocaleString()}</p>
        <div className="product-card-actions">
          <button onClick={(e) => { e.preventDefault(); onAddToCart(product); }} className="button button-primary">
            {t('add_to_cart')}
          </button>
          <button 
            onClick={handleWishlistToggle} 
            className={`button button-secondary ${isInWishlist ? 'active' : ''}`}
          >
            {isInWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
          </button>
        </div>
      </div>
  </Link>
  );
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { dispatch } = useContext(CartContext);
  const { t } = useTranslation();

  // Function to add cache busting parameter to URLs
  const addCacheBuster = (url: string) => {
    return `${url}?v=${new Date().getTime()}`;
  };

  useEffect(() => {
    // Simulate fetching 20 products with real furniture images
    const sampleImages = [
      addCacheBuster('https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/1866143/pexels-photo-1866143.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/1866143/pexels-photo-1866143.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/210604/pexels-photo-210604.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg'),
      addCacheBuster('https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg'),
    ];
    const productData = [
      { name: "Luxury Memory Foam Sofa", category: "Sofa", price: 29999, description: "3-seater premium sofa with memory foam cushions and premium fabric upholstery" },
      { name: "Ergonomic Office Chair", category: "Chair", price: 12999, description: "High-back ergonomic chair with lumbar support and breathable mesh" },
      { name: "Solid Wood Dining Table", category: "Table", price: 24999, description: "6-seater dining table made from premium solid wood with elegant finish" },
      { name: "King Size Platform Bed", category: "Bed", price: 34999, description: "Modern platform bed with storage and premium mattress support" },
      { name: "Contemporary Wardrobe", category: "Wardrobe", price: 39999, description: "3-door wardrobe with mirror and smart storage compartments" },
      { name: "Glass Top Coffee Table", category: "Table", price: 8999, description: "Modern coffee table with tempered glass top and metal frame" },
      { name: "Recliner Lounge Chair", category: "Chair", price: 19999, description: "Premium leather recliner with multiple reclining positions" },
      { name: "Bunk Bed with Desk", category: "Bed", price: 44999, description: "Space-saving bunk bed with integrated study desk and storage" },
      { name: "Executive Office Desk", category: "Office", price: 27999, description: "L-shaped executive desk with cable management and storage" },
      { name: "Outdoor Patio Set", category: "Outdoor", price: 35999, description: "4-piece weather-resistant patio furniture set with cushions" },
      { name: "Modular Kitchen Cabinet", category: "Kitchen", price: 49999, description: "Custom modular kitchen cabinet system with smart storage" },
      { name: "Kids Study Table", category: "Table", price: 7999, description: "Colorful study table with bookshelf and ergonomic design for children" },
      { name: "Sectional Corner Sofa", category: "Sofa", price: 54999, description: "L-shaped sectional sofa with reversible chaise and storage" },
      { name: "Vintage Dining Chairs", category: "Chair", price: 6999, description: "Set of 2 vintage-style dining chairs with premium upholstery" },
      { name: "Smart Storage Bed", category: "Bed", price: 41999, description: "Queen size bed with hydraulic storage and premium finish" },
      { name: "Designer Bookshelf", category: "Storage", price: 15999, description: "Contemporary bookshelf with adjustable shelves and modern design" },
      { name: "Gaming Chair", category: "Chair", price: 18999, description: "Ergonomic gaming chair with RGB lighting and adjustable features" },
      { name: "Outdoor Swing Chair", category: "Outdoor", price: 13999, description: "Hanging swing chair with weather-resistant cushions" },
      { name: "Shoe Cabinet", category: "Storage", price: 9999, description: "Modern shoe cabinet with multiple compartments and mirror" },
      { name: "TV Entertainment Unit", category: "Storage", price: 22999, description: "Wall-mounted TV unit with floating shelves and LED lighting" }
    ];

    const products = productData.map((item, i) => ({
      id: i + 1,
      name: item.name,
      description: item.description,
      price: item.price,
      category: { name: item.category },
      imageUrl: sampleImages[i % sampleImages.length]
    }));
    setProducts(products);
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  // Suggestions: first 4 products
  const suggestions = products.slice(0, 4);
  // Personalized: last 4 products (mocked)
  const personalized = products.slice(-4);

  return (
    <div className="product-list-container">
      {/* Suggestions Section */}
      <h2 style={{ color: 'var(--primary-blue)', margin: '32px 0 16px 0' }}>{t('suggestions_for_you', {defaultValue: 'Suggestions For You'})}</h2>
      <div className="product-grid">
        {suggestions.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} t={t} />
        ))}
      </div>

      {/* Personalized Section */}
      <h2 style={{ color: 'var(--primary-blue)', margin: '32px 0 16px 0' }}>{t('personalized_for_you', {defaultValue: 'Personalized For You'})}</h2>
      <div className="product-grid">
        {personalized.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} t={t} />
        ))}
      </div>

      {/* All Products Section */}
      <h2 style={{ color: 'var(--primary-blue)', margin: '32px 0 16px 0' }}>{t('all_products', {defaultValue: 'All Products'})}</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} t={t} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
