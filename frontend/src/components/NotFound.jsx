import React from 'react';
import { Link } from 'react-router-dom';
import image404 from '../assets/404.png'
const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f8f8f8',
    }}>
      <img 
        src={image404}
        alt="404 - Not Found" 
        style={{
          maxWidth: '80%',
          height: 'auto',
          marginBottom: '10px'
        }} 
      />
      <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>Page Not Found</h1>
      <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '20px' }}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link 
        to="/" 
        style={{
          fontSize: '1.25rem',
          color: '#007BFF',
          textDecoration: 'none',
          border: '2px solid #007BFF',
          padding: '10px 20px',
          borderRadius: '5px'
        }}
      >
        Go Back To Home
      </Link>
    </div>
  );
};

export default NotFound;
