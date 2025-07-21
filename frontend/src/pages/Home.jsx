import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import ProjectInfoModal from '../components/ProjectInfo';
import '../assets/css/Home.css';

import 'swiper/css';
import 'swiper/css/navigation';

import Title from '../components/Title';
import About from '../components/About';
import Project from '../components/Project';
import Contact from '../components/Contact';
import Aside from '../components/Aside';
import Footer from '../components/Footer';

import useIsMobile from '../hooks/useIsMobile';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const swiperRef = useRef(null);
  const projectRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const isMobile = useIsMobile(390);
  const sections = ['Title', 'About', 'Project', 'Contact', 'Footer'];

  // 모바일 최초 진입 시 scrollTop 초기화
  useEffect(() => {
    if (isMobile) window.scrollTo(0, 0);
  }, [isMobile]);

  // 모바일에서 Title 인트로 동안 스크롤 잠금
  useEffect(() => {
    if (isMobile && isScrollLocked) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflowY = 'scroll';
      document.body.style.width = '100%';
      document.body.dataset.scrollY = scrollY;
    } else {
      const scrollY = document.body.dataset.scrollY;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflowY = '';
      document.body.style.width = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.scrollY;
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflowY = '';
      document.body.style.width = '';
      delete document.body.dataset.scrollY;
    };
  }, [isMobile, isScrollLocked]);

  // 모바일에서 모달 열릴 때 스크롤 잠금
  useEffect(() => {
    if (isMobile && selectedProject) {
      document.body.style.overflow = 'hidden';
    } else if (!isScrollLocked) {
      document.body.style.overflow = '';
    }
    return () => {
      if (!isScrollLocked) {
        document.body.style.overflow = '';
      }
    };
  }, [isMobile, selectedProject, isScrollLocked]);

  // 데스크탑에서 Project 영역 wheel 이벤트 차단
  useEffect(() => {
    if (isMobile) return;

    const el = projectRef.current;
    const handleWheel = (e) => {
      const isScrollable = el.scrollHeight > el.clientHeight;
      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      if (isScrollable && ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom))) {
        e.stopPropagation();
      }
    };

    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el && el.removeEventListener('wheel', handleWheel);
  }, [isMobile]);

  // 스크롤 잠금 상태에 따라 Swiper 슬라이드/휠 제어
  useEffect(() => {
    if (!swiperRef.current || isMobile) return;

    swiperRef.current.allowSlideNext = !isLocked;
    swiperRef.current.allowSlidePrev = !isLocked;

    if (swiperRef.current.mousewheel) {
      isLocked
        ? swiperRef.current.mousewheel.disable()
        : swiperRef.current.mousewheel.enable();
    }
  }, [isLocked, isMobile]);

  // 모바일/데스크탑 전환 시 Swiper 상태 재설정
  useEffect(() => {
    if (!swiperRef.current) return;

    swiperRef.current.allowTouchMove = !isLocked && isMobile;
    swiperRef.current.allowSlideNext = !isLocked && !isMobile;
    swiperRef.current.allowSlidePrev = !isLocked && !isMobile;

    if (swiperRef.current.mousewheel) {
      if (isMobile) {
        swiperRef.current.mousewheel.disable();
      } else {
        isLocked
          ? swiperRef.current.mousewheel.disable()
          : swiperRef.current.mousewheel.enable();
      }
    }
  }, [isMobile, isLocked]);

  return (
    <>
      {isMobile ? (
        <div className="mobile-layout">
          <Title onIntroComplete={() => setIsScrollLocked(false)} />
          <About />
          <Project onSelect={setSelectedProject} />
          <Contact />
          <Footer />
        </div>
      ) : (
        <Swiper
          direction="vertical"
          slidesPerView="auto"
          speed={800}
          simulateTouch={!isLocked}
          modules={[Navigation, Mousewheel]}
          mousewheel
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="main-swiper"
        >
          <SwiperSlide>
            <Title onIntroComplete={() => setIsLocked(false)} />
          </SwiperSlide>
          <SwiperSlide><About /></SwiperSlide>
          <SwiperSlide className="project-slide" ref={projectRef}><Project onSelect={setSelectedProject} /></SwiperSlide>
          <SwiperSlide className="contact-slide"><Contact /></SwiperSlide>
          <SwiperSlide className="last-slide"><Footer /></SwiperSlide>
        </Swiper>
      )}

      {selectedProject && (
        <ProjectInfoModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <Aside />
      {!isMobile && (
        <nav className="section-indicator">
          {sections.map((sec, idx) => (
            <div
              key={sec}
              className={`indicator-item ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => swiperRef.current?.slideTo(idx)}
            >
              <span className="indicator-label">{sec}</span>
              <span className="indicator-labelbar">-</span>
              <span className="indicator-dot" />
            </div>
          ))}
        </nav>
      )}
    </>
  );
}
