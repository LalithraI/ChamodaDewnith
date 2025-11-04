import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';
import './ProjectGallery.css';

const ProjectGallery = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Residential', 'Commercial', 'Public'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="project-gallery">
      <div className="gallery-header">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-description">
          Explore a curated selection of architectural projects that showcase innovation, 
          functionality, and timeless design principles.
        </p>
      </div>

      <div className="filter-buttons">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectGallery;
