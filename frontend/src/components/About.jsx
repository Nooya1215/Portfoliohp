import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profileImg from '../assets/img/profile.png';
import AboutTagPop from './AboutTagPop';
import useIsMobile from '../hooks/useIsMobile';
import '../assets/css/About.css';

export default function About() {
  const [skillDescriptions, setSkillDescriptions] = useState({});
  const [toolDescriptions, setToolDescriptions] = useState({});
  const [selectedTag, setSelectedTag] = useState(null);
  const [showInitialHint, setShowInitialHint] = useState(true); // 처음 안내문 표시 여부
  const isMobile = useIsMobile();

  useEffect(() => {
    fetch('/data/SkillsTools.json')
      .then((res) => res.json())
      .then((data) => {
        setSkillDescriptions(data.skills || {});
        setToolDescriptions(data.tools || {});
      })
      .catch((err) => console.error('JSON fetch error:', err));
  }, []);

  const skills = Object.keys(skillDescriptions);
  const tools = Object.keys(toolDescriptions);

  const handleTagClick = (tag) => {
    if (showInitialHint) setShowInitialHint(false); // 첫 클릭 시 안내문 제거
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <section id="about">
      <div className="wrap">
        {/* 제목 */}
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
          {/* 프로필 이미지 */}
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
            <a
              href="https://www.notion.so/239f2e02dbf98027ac38c1b6e1b76326?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              더보기
            </a>

            {/* 소개글 */}
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

            {/* Skills */}
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

            {/* Tools */}
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
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + (skills.length + index) * 0.1
                  }}
                  viewport={{ once: true }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* 안내문 & 태그 설명 */}
            <AnimatePresence mode="wait">
              {/* 안내문 - 모바일에서는 아예 비활성화 */}
              {!isMobile && !selectedTag && showInitialHint && (
                <motion.div
                  key="hint"
                  className="tag-description hint"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }} // ← 변경
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <p>스킬 또는 툴 태그를 클릭하면 설명이 표시됩니다.</p>
                </motion.div>
              )}

              {/* 태그 설명 - 아래에서 올라오는 모션 */}
              {!isMobile && selectedTag && (
                <motion.div
                  key={selectedTag}
                  className="tag-description"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }} // ← 변경
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <p>
                    {skillDescriptions[selectedTag]?.description ||
                      toolDescriptions[selectedTag]?.description}
                  </p>
                  <p>
                    Level:
                    <span>
                      {skillDescriptions[selectedTag]?.level ||
                        toolDescriptions[selectedTag]?.level}
                      %
                    </span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 모바일 팝업 */}
            {isMobile && selectedTag && (
              <AboutTagPop tag={selectedTag} onClose={() => setSelectedTag(null)} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
