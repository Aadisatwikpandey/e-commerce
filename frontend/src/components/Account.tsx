import React from 'react';
import './Account.css';

const Account: React.FC = () => {
  return (
    <div className="account-container">
      <h1>My Account</h1>
      <div className="account-details">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
        <p><strong>Phone:</strong> +1 234 567 890</p>
      </div>
      <div className="account-actions">
        <button className="button">Edit Profile</button>
        <button className="button">Logout</button>
      </div>
    </div>
  );
};

export default Account;
