import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../assets/css/Project.css';

const projects = [
  {
    title: 'SimplyDesign',
    description: 'SimplyDesign UI Clone 프로젝트',
    tech: ['HTML', 'CSS', 'Javascript'],
    type: 'solo',
    image: 'https://via.placeholder.com/400x300?text=1-D-CLASS',
    git: 'https://github.com/Nooya1215/Portfolio1',
    link: 'https://nooya1215.github.io/Portfolio1/',
  },
  {
    title: 'LS그룹',
    description: 'LS그룹 UI Clone 프로젝트',
    tech: ['HTML', 'CSS', 'Javascript'],
    type: 'solo',
    image: 'https://via.placeholder.com/400x300?text=Portfolio',
    git: 'https://github.com/Nooya1215/Portfolio2',
    link: 'https://nooya1215.github.io/Portfolio2/',
  },
  {
    title: 'WOODIN',
    description: 'WOODIN UI Clone 프로젝트',
    tech: ['HTML', 'CSS', 'Javascript'],
    type: 'solo',
    image: 'https://via.placeholder.com/400x300?text=Portfolio',
    git: 'https://github.com/Nooya1215/WOODIN',
    link: '#',
  },
  {
    title: 'MOREVI',
    description: '투썬 팀원과 함께 만든 여행 예약 플랫폼',
    tech: ['React', 'Node.js', 'MySQL'],
    type: 'team',
    image: 'https://via.placeholder.com/400x300?text=1-D-CLASS',
    git: 'https://github.com/Nooya1215/Morevi',
    link: 'https://yourprojectlink.com',
  },
  {
    title: '1D CLASS',
    description: 'STUDIO 3 팀원과 함께 만든 클래스 예약 플랫폼',
    tech: ['React', 'Node.js', 'MySQL'],
    type: 'team',
    image: 'https://via.placeholder.com/400x300?text=Portfolio',
    git: 'https://yourportfolio.com',
    link: 'https://yourportfolio.com',
  },
  {
    title: 'SimplyDesign',
    description: 'SimplyDesign UI Clone 프로젝트',
    tech: ['HTML', 'CSS', 'Javascript'],
    type: 'solo',
    image: 'https://via.placeholder.com/400x300?text=1-D-CLASS',
    git: 'https://github.com/Nooya1215/Portfolio1',
    link: 'https://nooya1215.github.io/Portfolio1/',
  },
  {
    title: 'LS그룹',
    description: 'LS그룹 UI Clone 프로젝트',
    tech: ['HTML', 'CSS', 'Javascript'],
    type: 'solo',
    image: 'https://via.placeholder.com/400x300?text=Portfolio',
    git: 'https://github.com/Nooya1215/Portfolio2',
    link: 'https://nooya1215.github.io/Portfolio2/',
  },
  {
    title: 'WOODIN',
    description: 'WOODIN UI Clone 프로젝트',
    tech: ['HTML', 'CSS', 'Javascript'],
    type: 'solo',
    image: 'https://via.placeholder.com/400x300?text=Portfolio',
    git: 'https://github.com/Nooya1215/WOODIN',
    link: '#',
  },
  {
    title: 'MOREVI',
    description: '투썬 팀원과 함께 만든 여행 예약 플랫폼',
    tech: ['React', 'Node.js', 'MySQL'],
    type: 'team',
    image: 'https://via.placeholder.com/400x300?text=1-D-CLASS',
    git: 'https://github.com/Nooya1215/Morevi',
    link: 'https://yourprojectlink.com',
  },
  {
    title: '1D CLASS',
    description: 'STUDIO 3 팀원과 함께 만든 클래스 예약 플랫폼',
    tech: ['React', 'Node.js', 'MySQL'],
    type: 'team',
    image: 'https://via.placeholder.com/400x300?text=Portfolio',
    git: 'https://yourportfolio.com',
    link: 'https://yourportfolio.com',
  },
  {
    title: 'SimplyDesign',
    description: 'SimplyDesign UI Clone 프로젝트',
    tech: ['HTML', 'CSS', 'Javascript'],
    type: 'solo',
    image: 'https://via.placeholder.com/400x300?text=1-D-CLASS',
    git: 'https://github.com/Nooya1215/Portfolio1',
    link: 'https://nooya1215.github.io/Portfolio1/',
  },
  {
    title: 'LS그룹',
    description: 'LS그룹 UI Clone 프로젝트',
    tech: ['HTML', 'CSS', 'Javascript'],
    type: 'solo',
    image: 'https://via.placeholder.com/400x300?text=Portfolio',
    git: 'https://github.com/Nooya1215/Portfolio2',
    link: 'https://nooya1215.github.io/Portfolio2/',
  },
  {
    title: 'WOODIN',
    description: 'WOODIN UI Clone 프로젝트',
    tech: ['HTML', 'CSS', 'Javascript'],
    type: 'solo',
    image: 'https://via.placeholder.com/400x300?text=Portfolio',
    git: 'https://github.com/Nooya1215/WOODIN',
    link: '#',
  },
  {
    title: 'MOREVI',
    description: '투썬 팀원과 함께 만든 여행 예약 플랫폼',
    tech: ['React', 'Node.js', 'MySQL'],
    type: 'team',
    image: 'https://via.placeholder.com/400x300?text=1-D-CLASS',
    git: 'https://github.com/Nooya1215/Morevi',
    link: 'https://yourprojectlink.com',
  },
  {
    title: '1D CLASS',
    description: 'STUDIO 3 팀원과 함께 만든 클래스 예약 플랫폼',
    tech: ['React', 'Node.js', 'MySQL'],
    type: 'team',
    image: 'https://via.placeholder.com/400x300?text=Portfolio',
    git: 'https://yourportfolio.com',
    link: 'https://yourportfolio.com',
  },
];

export default function Project() {
  const initialCount = 8;
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

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
  }, [filter, expanded]);

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
            const isAnimated = !isFiltering && index < initialCount;

            return (
              <motion.li
                key={index}
                className="project-card"
                initial={isAnimated ? { opacity: 0, y: 30 } : false}
                animate={isAnimated ? { opacity: 1, y: 0 } : false}
                transition={isAnimated ? { duration: 0.6, delay: 0.1 * index } : {}}
              >
                <article className="card-info">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tech-list">
                      {project.tech.map((tech, i) => (
                        <span key={i}>{tech}</span>
                      ))}
                      <span className="project-type">{project.type.toUpperCase()}</span>
                    </div>
                    <div className="project-btn">
                      <a href={project.git} target="_blank" rel="noopener noreferrer">GITHUB</a>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">Link</a>
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