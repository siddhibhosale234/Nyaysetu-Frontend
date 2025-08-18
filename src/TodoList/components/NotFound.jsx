import React from 'react';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-bg">
      <div className="glow-circle"></div>
      <div className="notfound-card animated-pop">
        <h1 className="neon-text">404</h1>
        <p>Oops! Page not found.</p>
        <a href="/">Back to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
