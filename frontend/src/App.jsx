import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import useIsMobile from './hooks/useIsMobile';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const isMobile = useIsMobile(768);
  const alreadyLoaded = sessionStorage.getItem('loaded');

  useEffect(() => {
    fetch('https://portfoliohp.onrender.com/api/board')
      .then(() => console.log('✅ Render 깨우기 요청 완료'))
      .catch(() => console.log('❌ Render 깨우기 요청 실패'));

    if (alreadyLoaded) {
      setLoading(false);
    } else {
      sessionStorage.setItem('loaded', 'true');

      const timer = setTimeout(() => {
        setIsFadingOut(true);

        const unmountDelay = setTimeout(() => setLoading(false), 700);

        return () => clearTimeout(unmountDelay);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader isFadingOut={isFadingOut} />
      ) : (
        <BrowserRouter>
          <AppRouter />
          {!isMobile && <Cursor />}
        </BrowserRouter>
      )}
    </>
  );
}
