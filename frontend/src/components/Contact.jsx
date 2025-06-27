import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import "../assets/css/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 상태 메시지
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, form);
      setStatus(response.data.message);  // 서버 성공 메시지 표시
      setShowPopup(true);
      setForm({ name: '', email: '', message: '' });

      setTimeout(() => setShowPopup(false), 2500);
    } catch (error) {
      // 서버가 보낸 메시지 있을 경우 그걸 상태에 반영
      if (error.response && error.response.data && error.response.data.message) {
        setStatus(error.response.data.message);
      } else {
        setStatus('❌ 메일 전송에 실패했습니다. 다시 시도해주세요.');
      }
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <h2 className="h2">Contact</h2>
        <div className="contact-container">
          <div className="contact-card">
            <h3 className="h3">SEONWOO KIM</h3>
            <div className='card-info'>
              <p className='p'><strong>E-Mail</strong><span>:</span>sunwoo78341@gmail.com</p>
              <a href="https://github.com/Nooya1215"><strong>GitHub</strong><span>:</span>github.com/Nooya1215</a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <p className='p'>Name</p>
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={form.name}
              onChange={handleChange}
              required
              className="input"
            />
            <p className="p">Mail</p>
            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={form.email}
              onChange={handleChange}
              required
              className="input"
            />
            <p className="p">Message</p>
            <textarea
              name="message"
              placeholder="메시지"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="input"
            />
            <button type="submit" className="contact-btn">
              보내기
            </button>
          </form>

          <AnimatePresence>
            {showPopup && (
              <motion.div
                className="popup-message"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
              >
                {status}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
