import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/project/${project._id || project.id}`} className="project-card">
      <div className="project-image">
        <img src={project.thumbnail || project.images?.[0]} alt={project.title} />
        <div className="project-overlay">
          <span className="view-project">View Project →</span>
        </div>
      </div>
      <div className="project-info">
        <span className="project-category">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-location">{project.location} • {project.year}</p>
      </div>
    </Link>
  );
};

export default ProjectCard;
