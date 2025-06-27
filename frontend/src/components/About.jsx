import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profileImg from '../assets/img/profile.png';
import '../assets/css/About.css';

export default function About() {
  const skillDescriptions = {
    HTML: '웹 페이지의 구조를 설계하는 마크업 언어입니다.',
    CSS: '웹 페이지의 시각적 스타일을 지정합니다.',
    JAVASCRIPT: '웹에 동적인 기능을 추가하는 프로그래밍 언어입니다.',
    JQUERY: 'DOM 조작과 이벤트 처리를 쉽게 해주는 JavaScript 라이브러리입니다.',
    NODE: 'JavaScript로 서버를 구축할 수 있게 해주는 런타임입니다.',
    REACT: '컴포넌트 기반의 UI 구축을 위한 JavaScript 라이브러리입니다.',
  };

  const toolDescriptions = {
    DISCORD: '커뮤니티 소통과 관리에 사용하는 음성 및 채팅 플랫폼입니다.',
    FIGMA: 'UI/UX 디자인 및 프로토타이핑을 위한 협업 도구입니다.',
    PHOTOSHOP: '이미지 편집과 그래픽 디자인에 널리 쓰이는 소프트웨어입니다.',
    MYSQL: '관계형 데이터베이스 관리 시스템(RDBMS)입니다.',
  };

  const skills = Object.keys(skillDescriptions);
  const tools = Object.keys(toolDescriptions);

  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagClick = (tag) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <section id="about">
      <div className="wrap">
        <motion.h2
          className="h2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          ABOUT ME
        </motion.h2>

        <div className="about-box">
          <motion.img
            src={profileImg}
            alt="프로필 이미지"
            className="about-image"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          <div className="about-info">
            <motion.p
              className="p"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span>안녕하세요. 프론트엔드 개발자 김선우입니다.</span>
              <br />
              저는 모던하고 심플한 UI를 추구하며,
              <br />
              사용자 중심의 경험을 설계하고 구현하는 INFJ 성향입니다.
              <br />
              성실하게 끝까지 완성도 높은 결과물을 만들어내는 것에 큰 가치를 둡니다.
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Skills
            </motion.h3>
            <div className="tag-list">
              {skills.map((tag, index) => (
                <motion.span
                  key={tag}
                  className={`tag span ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Tools
            </motion.h3>
            <div className="tag-list">
              {tools.map((tag, index) => (
                <motion.span
                  key={tag}
                  className={`tag span ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => handleTagClick(tag)}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + (skills.length + index) * 0.1 }}
                  viewport={{ once: true }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedTag && (
                <motion.div
                  key={selectedTag}
                  className="tag-description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {skillDescriptions[selectedTag] || toolDescriptions[selectedTag]}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
