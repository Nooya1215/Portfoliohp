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
  const [isLocked, setIsLocked] = useState(true); // 스크롤 잠금
  const swiperRef = useRef(null);
  const projectRef = useRef(null);
  const sections = ['Title', 'About', 'Project', 'Contact', 'Footer'];
  const [selectedProject, setSelectedProject] = useState(null);

  const isMobile = useIsMobile(390);

  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, []);

  // 모달 열림 시 모바일에서 body 스크롤 잠금
  useEffect(() => {
    if (isMobile && selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // 컴포넌트 언마운트 시에도 복구
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, selectedProject]);

  // Project 내부 wheel 이벤트 차단 (데스크탑 전용)
  useEffect(() => {
    if (isMobile) return;

    const el = projectRef.current;
    const handleWheel = (e) => {
      const isScrollable = el.scrollHeight > el.clientHeight;
      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      if (isScrollable) {
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
          e.stopPropagation();
        }
      }
    };

    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (el) {
        el.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isMobile]);

  // Swiper 스크롤 잠금/해제 (데스크탑 전용)
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

  return (
    <>
      {isMobile ? (
        // 모바일 레이아웃
        <div className="mobile-layout">
          <Title />
          <About />
          <Project onSelect={setSelectedProject} />
          <Contact />
          <Footer />
        </div>
      ) : (
        // 데스크탑: Swiper 슬라이드
        <Swiper
          direction="vertical"
          slidesPerView="auto"
          speed={800}
          simulateTouch={!isLocked}
          modules={[Navigation, Mousewheel]}
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

      {/* 모달은 모바일/데스크탑 공통 */}
      {selectedProject && (
        <ProjectInfoModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* 데스크탑 전용 Aside & Indicator */}
      {!isMobile && <Aside />}
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
              <span className="indicator-dot"/>
            </div>
          ))}
        </nav>
      )}
    </>
  );
}
