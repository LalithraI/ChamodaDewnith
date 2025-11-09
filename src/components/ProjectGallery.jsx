import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import './ProjectGallery.css';

const ProjectGallery = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = ['All', 'Residential', 'Commercial', 'Public'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  if (loading) {
    return (
      <section id="projects" className="project-gallery">
        <div className="gallery-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">✨ Loading stunning architectural designs...</p>
        </div>
      </section>
    );
  }

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
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard key={project._id || project.id} project={project} />
          ))
        ) : (
          <p className="no-projects">
            {projects.length === 0 
              ? '🏗️ No projects available yet. Check back soon for amazing architectural designs!' 
              : `📂 No ${filter.toLowerCase()} projects found. Try another category.`
            }
          </p>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;
