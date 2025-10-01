import '../assets/css/ProjectInfo.css';

export default function ProjectInfo({ project, onClose }) {
  const OverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={OverlayClick}>
      <div className="modal-content">
        <button onClick={onClose}>닫기</button>
        <img src={project.image} alt={project.title} />
        <h2>{project.title}</h2>
        {project.info.split('\n').map((line, index) => (
          <p key={index}>{line || '\u00A0'}</p>
        ))}
        <div className="project-btn">
          <a href={project.git} target="_blank" rel="noreferrer">GITHUB</a>
          <a href={project.link} target="_blank" rel="noreferrer">Link</a>
          {/* <a href={project.notion} target="_blank" rel="noreferrer">Notion</a> */}
        </div>
      </div>
    </div>
  )
}
