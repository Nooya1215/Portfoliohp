import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profileImg from '../assets/img/profile.png';
import skillsTools from '../data/SkillsTools.json';
import '../assets/css/About.css';

export default function About() {
  const skillDescriptions = skillsTools.skills;
  const toolDescriptions = skillsTools.tools;

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
