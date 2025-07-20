import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminDashboard from './components/AdminDashboard';
import ProductForm from './components/ProductForm';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import './App.css';


import Homepage from './components/Homepage';
import InspirationHub from './components/InspirationHub';
import ArticlePage from './components/ArticlePage';
import ProductDetail from './components/ProductDetail';
import Wishlist from './components/Wishlist';
import FindAStore from './components/FindAStore';
import Account from './components/Account';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="App">
            <Header />
          <main>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products/new" element={<ProductForm />} />
              <Route path="/admin/products/edit/:id" element={<ProductForm />} />
              <Route path="/inspiration" element={<InspirationHub />} />
              <Route path="/inspiration/:id" element={<ArticlePage />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/find-a-store" element={<FindAStore />} />
              <Route path="/account" element={<Account />} />
              <Route path="/about-us" element={<AboutUs />} />
            </Routes>
          </main>
        </div>
      </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
