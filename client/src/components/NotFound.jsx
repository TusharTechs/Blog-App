import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        padding: '4rem',
        backgroundColor: '#1f2937',
        color: '#f3f4f6',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem',
          maxWidth: '20rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '20rem', textAlign: 'center' }}>
          <h2
            style={{
              marginBottom: '2rem',
              fontWeight: '800',
              fontSize: '8rem',
              color: '#9ca3af',
            }}
          >
            404
          </h2>
          <p style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem' }}>
            Sorry, we couldn't find this page.
          </p>
          <p style={{ marginTop: '1rem', marginBottom: '2rem', color: '#9ca3af' }}>
            But don't worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            to={'/login'}
            style={{
              padding: '0.75rem 2rem',
              fontWeight: '600',
              borderRadius: '0.5rem',
              backgroundColor: '#8b5cf6',
              color: '#1f2937',
              textDecoration: 'none',
            }}
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
