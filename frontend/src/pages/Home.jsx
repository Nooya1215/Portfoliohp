import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import '../assets/css/Home.css';

import 'swiper/css';
import 'swiper/css/navigation';

import Title from '../components/Title';
import About from '../components/About';
import Project from '../components/Project';
import Contact from '../components/Contact';
import Aside from '../components/Aside';
import Footer from '../components/Footer';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const projectRef = useRef(null);
  const sections = ['Title', 'About', 'Project', 'Contact', 'Footer'];

  // wheel 이벤트 차단
  useEffect(() => {
    const el = projectRef.current;

    const handleWheel = (e) => {
      const isScrollable =
        el.scrollHeight > el.clientHeight;
      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      if (isScrollable) {
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
          e.stopPropagation(); // swiper로 전달되지 않게 막음
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
  }, []);

  return (
    <>
      <Swiper
        direction="vertical"
        slidesPerView="auto"
        speed={800}
        simulateTouch={false}
        mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
        modules={[Navigation, Mousewheel]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="main-swiper"
      >
        <SwiperSlide><Title /></SwiperSlide>
        <SwiperSlide><About /></SwiperSlide>
        <SwiperSlide className="project-slide" ref={projectRef}><Project /></SwiperSlide>
        <SwiperSlide className='contact-slide'><Contact /></SwiperSlide>
        <SwiperSlide className="last-slide"><Footer /></SwiperSlide>
      </Swiper>
      <Aside />
      <nav className="section-indicator">
        {sections.map((sec, idx) => (
          <div
            key={sec}
            className={`indicator-item ${activeIndex === idx ? 'active' : ''}`}
            onClick={() => swiperRef.current?.slideTo(idx)}
          >
            <span className="indicator-label">{sec}</span>
            <span className='indicator-labelbar'>-</span>
            <span className="indicator-dot" />
          </div>
        ))}
      </nav>
    </>
  );
}
