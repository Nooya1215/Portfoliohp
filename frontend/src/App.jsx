import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import Loader from './components/Loader';

export default function App() {
  const [loading, setLoading] = useState(true);
  const alreadyLoaded = sessionStorage.getItem('loaded');

  useEffect(() => {
    // ✅ Render 서버 깨우기용 fetch
    fetch('https://portfoliohp.onrender.com/api/board')
      .then(() => console.log('✅ Render 깨우기 요청 완료'))
      .catch(() => console.log('❌ Render 깨우기 요청 실패'));

    // ✅ 기존 로딩 화면 처리
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
