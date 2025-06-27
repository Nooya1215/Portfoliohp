import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import "../assets/css/Board.css";

export default function Board() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(null); // 자동 계산용
  const containerRef = useRef(null);
  const sampleItemRef = useRef(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    const calculatePostsPerPage = () => {
      if (containerRef.current && sampleItemRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const itemHeight = sampleItemRef.current.offsetHeight;

        if (itemHeight > 0) {
          const possible = Math.floor(containerHeight / itemHeight);
          setPostsPerPage(possible || 1); // 최소 1개
        }
      }
    };

    calculatePostsPerPage();
    window.addEventListener('resize', calculatePostsPerPage);
    return () => window.removeEventListener('resize', calculatePostsPerPage);
  }, [entries]);

  const fetchEntries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/board');
      const data = Array.isArray(res.data) ? res.data : res.data.data || [];
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
      await axios.post('http://localhost:5000/api/board', form);
      setForm({ name: '', message: '' });
      setShowPopup(false);
      fetchEntries();
      setCurrentPage(1);
    } catch (err) {
      console.error('게시물 등록 실패:', err);
    }
  };

  const totalPages = postsPerPage ? Math.ceil(entries.length / postsPerPage) : 1;
  const currentPosts = postsPerPage
    ? entries.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
    : entries;

  return (
    <section id="board">
      <div className="wrap">
        <div className="board-header">
          <h2 className="h2">BOARD</h2>
          <button className="open-btn" onClick={() => setShowPopup(true)}>등록</button>
        </div>

        <ul className="entry-list" ref={containerRef}>
          {currentPosts.map((entry, index) => (
            <motion.li
              key={entry.id}
              className="entry-item"
              ref={index === 0 ? sampleItemRef : null} // 첫 아이템 높이 측정용
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
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="nav-btn"
            >
              이전
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
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
  );
}
