import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import '../assets/css/Title.css';

const TypingText = ({ text, onComplete }) => {
  const letters = text.split('');

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
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
          key={`${letter}-${index}`}
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
  const [isBlink, setIsBlink] = useState(false);

  useEffect(() => {
    const currentName = names[idx];
    let timeout;

    if (!isDeleting) {
      if (display.length < currentName.length) {
        setIsBlink(false);
        timeout = setTimeout(() => {
          setDisplay(currentName.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        setIsBlink(true);
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      setIsBlink(false);
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
      <span className={`cursor ${isBlink ? 'blink' : ''}`}>|</span>
    </h3>
  );
};

export default function Title({ onIntroComplete }) {
  const [step, setStep] = useState(0);
  const [showNameTyping, setShowNameTyping] = useState(false);
  const [showDownline, setShowDownline] = useState(false);
  const isMounted = useRef(true);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    isMounted.current = true;

    const runIntro = async () => {
      await wait(300);
      if (!isMounted.current) return;
      setStep(1);

      await wait(1700);
      if (!isMounted.current) return;
      setStep(2);
    };

    runIntro();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleTypingComplete = () => {
    setShowNameTyping(true);
    setShowDownline(false);
    setTimeout(() => setShowDownline(true), 1000);
  };

  useEffect(() => {
    if (showDownline && onIntroComplete) {
      onIntroComplete();
    }
  }, [showDownline, onIntroComplete]);

  return (
    <div id="title">
      {step > 0 && (
        <div className="wrap">
          <div className="title-info">
            <div className="title-line-wrapper">
              {isMobile ? (
                <>
                  <motion.h2
                    className="hinge-left"
                    initial={{ rotateX: -180, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ transformOrigin: 'top center' }}
                  >
                    FRONT-END
                  </motion.h2>
                  <motion.h2
                    className="hinge-left"
                    initial={{ rotateX: -180, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.7 }}
                    style={{ transformOrigin: 'top center' }}
                  >
                    DEVELOPER
                  </motion.h2>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>

            {step > 1 && (
              <div className="intro-body">
                <TypingText
                  text="섬세한 UI와 AI로 경험을 빚는 개발자"
                  onComplete={handleTypingComplete}
                />

                {showNameTyping && (
                  <>
                    <NameTyping
                      names={['김선우', 'KIM SEONWOO']}
                      typingSpeed={150}
                      pauseTime={1000}
                    />
                    <AnimatePresence>
                      {showDownline && (
                        <motion.div
                          className="downline"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 1 }}
                        >
                          ↓
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
