import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import '../assets/css/Project.css';

export default function Project({ onSelect }) {
  const initialCountDesktop = 8;
  const initialCountMobile = 4;
  const isMobile = useIsMobile(768);

  // 모바일 여부에 따라 기본 보여주는 개수 결정
  const initialCount = isMobile ? initialCountMobile : initialCountDesktop;

  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/data/Projects.json')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Failed to load projects:', err));
  }, []);

  const filtered = projects.filter((p) => filter === 'all' || p.type === filter);
  const displayedProjects = filtered.slice(0, visibleCount);

  const handleToggle = () => {
    if (expanded) {
      setVisibleCount(initialCount);
    } else {
      setVisibleCount(filtered.length);
    }
    setExpanded(!expanded);
  };

  useEffect(() => {
    setVisibleCount(expanded ? filtered.length : initialCount);
    // expanded가 바뀌거나 filter 바뀌면 기본 visibleCount 설정
  }, [filter, expanded, isMobile]);

  useEffect(() => {
    setIsFiltering(filter !== 'all');
  }, [filter]);

  return (
    <section id="projects">
      <div className="wrap">
        <motion.h2 className="h2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          PROJECTS
        </motion.h2>

        <ul className="filter-tags">
          {['all', 'solo', 'team'].map((type) => (
            <li key={type}>
              <button
                className={filter === type ? 'active' : ''}
                onClick={() => setFilter(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <ul className="project-grid">
          {displayedProjects.map((project, index) => {
            const isAnimated = !isFiltering && index < initialCount && !isMobile;

            return (
              <motion.li
                key={index}
                className="project-card"
                initial={isAnimated ? { opacity: 0, y: 30 } : false}
                animate={isAnimated ? { opacity: 1, y: 0 } : false}
                transition={isAnimated ? { duration: 0.6, delay: 0.1 * index } : {}}
                onClick={() => onSelect(project)}
              >
                <article className="card-info">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <div className="tech-list">
                      {project.tech.map((tech, i) => (
                        <span key={i}>{tech}</span>
                      ))}
                      <span className="project-type">{project.type.toUpperCase()}</span>
                    </div>
                    <div className="project-btn">
                      <a href={project.git} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>GITHUB</a>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Link</a>
                      <a href={project.notion} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Notion</a>
                    </div>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </ul>

        {filtered.length > initialCount && (
          <div className="more-wrap">
            <button onClick={handleToggle}>
              {expanded ? '접기' : '더보기'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
