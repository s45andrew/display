import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>frantic stats 404 -frantic stats Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
