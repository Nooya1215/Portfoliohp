import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import Loader from './components/Loader';

export default function App() {
  const [loading, setLoading] = useState(true);
  const alreadyLoaded = sessionStorage.getItem('loaded');

  useEffect(() => {
    if (alreadyLoaded) {
    setLoading(false);
  } else {
    sessionStorage.setItem('loaded', 'true');
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }
}, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      )}
    </>
  );
}
