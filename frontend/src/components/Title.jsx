import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../assets/css/Title.css';

const TypingText = ({ text, onComplete }) => {
  const letters = text.split('');

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onComplete}
      style={{ display: 'inline-block', marginBottom: '20px' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  );
};

const NameTyping = ({ names = [], typingSpeed = 150, pauseTime = 1000 }) => {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentName = names[idx];
    let timeout;

    if (!isDeleting) {
      if (display.length < currentName.length) {
        timeout = setTimeout(() => {
          setDisplay(currentName.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(currentName.slice(0, display.length - 1));
        }, typingSpeed / 2);
      } else {
        setIsDeleting(false);
        setIdx((prev) => (prev + 1) % names.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, idx, names, typingSpeed, pauseTime]);

  return (
    <h3 className="typing-name">
      {display}
      <span className="cursor">|</span>
    </h3>
  );
};

export default function Title() {
  const [showTitle, setShowTitle] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showNameTyping, setShowNameTyping] = useState(false);

  useEffect(() => {
    const introTimer = setTimeout(() => setShowTitle(true), 300);
    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (showTitle) {
      const typingDelayTimer = setTimeout(() => setShowTyping(true), 1700);
      return () => clearTimeout(typingDelayTimer);
    }
  }, [showTitle]);

  return (
    <div id="title">
      {showTitle && (
        <div className="wrap">
          <div className="title-info">
            <div className="title-line-wrapper">
              <motion.h2
                className="hinge-left"
                initial={{ rotateY: -180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                FRONT-END
              </motion.h2>

              <motion.h2
                className="hinge-right"
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
              >
                DEVELOPER
              </motion.h2>
            </div>

            {showTyping && (
              <>
                <TypingText
                  text="섬세한 UI와 AI로 경험을 빚는 개발자"
                  onComplete={() => setShowNameTyping(true)}
                />
                {showNameTyping && (
                  <NameTyping
                    names={['김선우', 'KIM SEONWOO']}
                    typingSpeed={150}
                    pauseTime={1000}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
