import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import Loader from './components/Loader';
import Cursor from './components/Cursor';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const alreadyLoaded = sessionStorage.getItem('loaded');

  useEffect(() => {
    fetch('https://portfoliohp.onrender.com/api/board')
      .then(() => console.log('✅ Render 깨우기 요청 완료'))
      .catch(() => console.log('❌ Render 깨우기 요청 실패'));

    if (alreadyLoaded) {
      setLoading(false); // 재방문은 로딩 없이
    } else {
      sessionStorage.setItem('loaded', 'true');

      const timer = setTimeout(() => {
        setIsFadingOut(true); // 1단계: fade-out 트리거

        // 2단계: fade-out 끝난 후 unmount
        const unmountDelay = setTimeout(() => setLoading(false), 700); // 반드시 fade-out CSS duration보다 약간 더 길게

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
          <Cursor />
        </BrowserRouter>
      )}
    </>
  );
}
