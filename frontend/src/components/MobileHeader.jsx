import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/css/MobileHeader.css';

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <header id="header">
      <button
        className={`menu-button ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        메뉴
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <ul>
              <li><a href="#title" onClick={() => setIsMenuOpen(false)}>Title</a></li>
              <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
              <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>Project</a></li>
              <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
              <li><a href="#footer" onClick={() => setIsMenuOpen(false)}>Footer</a></li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
