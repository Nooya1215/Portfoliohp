import React, { useState, useEffect } from 'react';
import '../assets/css/AboutTagPop.css';

export default function AboutTagPop({ tag, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tag) return;

    setLoading(true);
    setData(null); // 이전 내용 초기화

    fetch('/data/SkillsTools.json')
      .then((res) => res.json())
      .then((json) => {
        const foundData = json.skills[tag] || json.tools[tag] || null;
        setData(foundData);
        setLoading(false);
      })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, [tag]);

  if (!tag) return null;

  return (
    <div className="about-tag-backdrop" onClick={onClose}>
      <div className="about-tag-popup" onClick={(e) => e.stopPropagation()}>
        <h2>{tag}</h2>
        {loading ? (
          <p className="loading">로딩 중...</p>
        ) : data ? (
          <>
            <p>{data.description}</p>
            <p>Level: <span>{data.level}%</span></p>
          </>
        ) : (
          <p>정보를 찾을 수 없습니다.</p>
        )}
        <button className="close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
