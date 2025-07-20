import React from 'react';
import './FindAStore.css';

const FindAStore: React.FC = () => {
  return (
    <div className="find-a-store-container">
      <h1>Find a Store</h1>
      <p>Locate our stores near you for an in-person shopping experience.</p>

      <div className="store-search-section">
        <input type="text" placeholder="Enter city or ZIP code" className="store-search-input" />
        <button className="store-search-button">Search</button>
      </div>

      <div className="store-map-placeholder">
        {/* This would typically be an embedded map (e.g., Google Maps, OpenStreetMap) */}
        <p>Map Placeholder</p>
        <img src="https://via.placeholder.com/800x400?text=Interactive+Map+Goes+Here" alt="Map Placeholder" />
      </div>

      <div className="store-list-section">
        <h2>Our Locations</h2>
        <div className="store-card">
          <h3>Flagship Store - New York</h3>
          <p>123 Main Street, New York, NY 10001</p>
          <p>Phone: (212) 555-1234</p>
          <p>Hours: Mon-Sat: 10 AM - 8 PM, Sun: 11 AM - 6 PM</p>
          <button className="get-directions-button">Get Directions</button>
        </div>

        <div className="store-card">
          <h3>Downtown Store - Los Angeles</h3>
          <p>456 Oak Avenue, Los Angeles, CA 90012</p>
          <p>Phone: (213) 555-5678</p>
          <p>Hours: Mon-Sat: 10 AM - 9 PM, Sun: 12 PM - 5 PM</p>
          <button className="get-directions-button">Get Directions</button>
        </div>

        <div className="store-card">
          <h3>Mall Store - Chicago</h3>
          <p>789 Pine Lane, Chicago, IL 60601</p>
          <p>Phone: (312) 555-9012</p>
          <p>Hours: Mon-Fri: 9 AM - 7 PM, Sat-Sun: 10 AM - 6 PM</p>
          <button className="get-directions-button">Get Directions</button>
        </div>
      </div>
    </div>
  );
};

export default FindAStore;