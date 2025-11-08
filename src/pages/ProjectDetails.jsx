import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="not-found">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="not-found">
        <h2>Project Not Found</h2>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="project-details">
      <div className="project-header">
        <Link to="/" className="back-link">← Back to Projects</Link>
        <div className="project-meta">
          <span className="meta-category">{project.category}</span>
          <h1 className="project-main-title">{project.title}</h1>
          <div className="meta-info">
            <span>{project.location}</span>
            <span>•</span>
            <span>{project.year}</span>
            <span>•</span>
            <span>{project.area}</span>
          </div>
        </div>
      </div>

      <div className="main-image-container">
        <img 
          src={project.images[selectedImage]} 
          alt={`${project.title} - Image ${selectedImage + 1}`}
          className="main-image"
        />
      </div>

      <div className="image-thumbnails">
        {project.images.map((image, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="project-content">
        <div className="content-section">
          <h2>Project Overview</h2>
          <p className="overview-text">{project.description}</p>
        </div>

        <div className="content-section">
          <h2>Key Features</h2>
          <ul className="features-list">
            {project.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="project-specs">
          <div className="spec-item">
            <h3>Category</h3>
            <p>{project.category}</p>
          </div>
          <div className="spec-item">
            <h3>Location</h3>
            <p>{project.location}</p>
          </div>
          <div className="spec-item">
            <h3>Year</h3>
            <p>{project.year}</p>
          </div>
          <div className="spec-item">
            <h3>Area</h3>
            <p>{project.area}</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Interested in Working Together?</h2>
        <p>Let's discuss your next architectural project</p>
        <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
      </div>
    </div>
  );
};

export default ProjectDetails;
