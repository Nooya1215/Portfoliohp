import React, { useState, useEffect } from 'react';
import '../assets/css/Loader.css';

export default function Loader() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 2 ? '' : prev + '.'));
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="loader">
      <div className="wrap">
        <div className="spinner" />
        <p>로딩중.{dots}</p>
      </div>
    </section>
  );
}
