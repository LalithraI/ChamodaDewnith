import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import './Hero.css';

const Hero = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectImages();
  }, []);

  const fetchProjectImages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/projects`);
      const projects = await response.json();
      
      // Collect all images from all projects
      const allImages = [];
      projects.forEach(project => {
        if (project.images && project.images.length > 0) {
          allImages.push(...project.images);
        }
      });
      
      // Use first 10 images or fallback to placeholders
      const imagesToShow = allImages.length > 0 
        ? allImages.slice(0, 10) 
        : [
          "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1200&q=80",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
        ];
      
      setHeroImages(imagesToShow);
    } catch (error) {
      console.error('Error fetching project images:', error);
      // Fallback to placeholder images
      setHeroImages([
        "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1200&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [heroImages.length]);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Designing Spaces, Creating Experiences</h1>
        <p className="hero-description">
          Innovative architectural solutions that blend functionality with aesthetic excellence. 
          Each project tells a unique story of vision, precision, and timeless design.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <Link to="/contact" className="btn btn-secondary">Get In Touch</Link>
        </div>
      </div>
      <div className="hero-image">
        {heroImages.map((image, index) => (
          <img 
            key={index}
            src={image} 
            alt={`Architectural Design ${index + 1}`}
            className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
        <div className="hero-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
