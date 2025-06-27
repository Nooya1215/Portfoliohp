import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import "../assets/css/Board.css";

export default function Board() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // ✅ 고정값: 페이지당 10개
  const postsPerPage = 10;

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/board`);
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
      // 최신순 정렬
      const sorted = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setEntries(sorted);
    } catch (err) {
      console.error('게시물 불러오기 실패:', err);
      setEntries([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/board`, form);
      setForm({ name: '', message: '' });
      setShowPopup(false);
      await fetchEntries();
      setCurrentPage(1); // ✅ 새 글 등록 후 1페이지로 이동
    } catch (err) {
      console.error('게시물 등록 실패:', err);
    }
  };

  // ✅ 페이지 계산
  const totalPages = Math.max(1, Math.ceil(entries.length / postsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const currentPosts = entries.slice(
    (safeCurrentPage - 1) * postsPerPage,
    safeCurrentPage * postsPerPage
  );

  return (
    <>
      <section id="board">
        <div className="wrap">
          <div className="board-header">
            <h2 className="h2">BOARD</h2>
            <button className="open-btn" onClick={() => setShowPopup(true)}>등록</button>
          </div>

          <ul className="entry-list">
            {currentPosts.map((entry, index) => (
              <motion.li
                key={entry.id}
                className="entry-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <p className="p">{entry.message} <strong>{entry.name}</strong></p>
              </motion.li>
            ))}
          </ul>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={safeCurrentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="nav-btn"
              >
                이전
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={safeCurrentPage === i + 1 ? 'active' : ''}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={safeCurrentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="nav-btn"
              >
                다음
              </button>
            </div>
          )}

          {showPopup && (
            <div className="popup-overlay">
              <div className="popup-form">
                <button className="close-btn" onClick={() => setShowPopup(false)}>X</button>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="이름 & 닉네임"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="내용"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                  <button type="submit">등록</button>
                </form>
              </div>
            </div>
          )}

          <Link to="/" className="back-btn">돌아가기</Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
