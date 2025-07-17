import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profileImg from '../assets/img/profile.png';
import '../assets/css/About.css';

export default function About() {
  const skillDescriptions = {
    HTML: {
      description: '웹 페이지의 구조를 설계하는 마크업 언어입니다.',
      level: 93,
    },
    CSS: {
      description: '웹 페이지의 시각적 스타일을 지정합니다.',
      level: 75,
    },
    JAVASCRIPT: {
      description: '웹에 동적인 기능을 추가하는 프로그래밍 언어입니다.',
      level: 60,
    },
    JQUERY: {
      description: 'DOM 조작과 이벤트 처리를 쉽게 해주는 JavaScript 라이브러리입니다.',
      level: 60,
    },
    NODE: {
      description: 'JavaScript로 서버를 구축할 수 있게 해주는 런타임입니다.',
      level: 70,
    },
    REACT: {
      description: '컴포넌트 기반의 UI 구축을 위한 JavaScript 라이브러리입니다.',
      level: 80,
    },
    VUE: {
      description: '진행형 UI 구축을 위한 반응형 JavaScript 프레임워크입니다.',
      level: 40,
    },
    GIT: {
      description: '버전 관리를 위한 분산형 소스 코드 관리 도구입니다.',
      level: 70,
    },
    SASS: {
      description: 'Sass 문법(중첩 등)을 활용하여 HTML 구조 기반 스타일링을 수행한 경험이 있습니다.',
      level: 50,
    },
    W3C: {
      description: '웹 표준을 정의하고 권장하는 국제 웹 표준화 기구입니다.',
      level: 60,
    },
    WAI: {
      description: '웹 접근성을 위한 가이드라인과 표준을 제시하는 이니셔티브입니다.',
      level: 70,
    },
    RWD: {
      description: '다양한 화면 크기에 유연하게 대응하는 반응형 웹 디자인 기법입니다.',
      level: 75,
    },
  };

  const toolDescriptions = {
    DISCORD: {
      description: '커뮤니티 소통과 관리에 사용하는 음성 및 채팅 플랫폼입니다.',
      level: 80,
    },
    FIGMA: {
      description: 'UI/UX 디자인 및 프로토타이핑을 위한 협업 도구입니다.',
      level: 90,
    },
    PHOTOSHOP: {
      description: '이미지 편집과 그래픽 디자인에 널리 쓰이는 소프트웨어입니다.',
      level: 50,
    },
    MYSQL: {
      description: '관계형 데이터베이스 관리 시스템(RDBMS)입니다.',
      level: 90,
    },
    MONGODB: {
      description: '비관계형(NoSQL) 문서 지향 데이터베이스 관리 시스템입니다.',
      level: 60,
    },
    CHATGPT: {
      description: '자연어 이해와 생성이 가능한 인공지능 언어 모델 서비스입니다.',
      level: 85,
    },
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
                  <p>{skillDescriptions[selectedTag]?.description || toolDescriptions[selectedTag]?.description}</p>
                  <p>Level:<span>{skillDescriptions[selectedTag]?.level || toolDescriptions[selectedTag]?.level}%</span></p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
