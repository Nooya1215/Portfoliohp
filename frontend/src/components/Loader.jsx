import React, { useState, useEffect } from 'react';
import '../assets/css/Loader.css';

export default function Loader({ isFadingOut }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="loader" className={isFadingOut ? 'fade-out' : 'fade-in'}>
      <div className="wrap">
        <div className="spinner" />
        <p>로딩중{dots}</p>
      </div>
    </section>
  );
}
