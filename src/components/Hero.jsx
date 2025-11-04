import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
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
        <img 
          src="https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1200&q=80" 
          alt="Architectural Design" 
        />
      </div>
    </section>
  );
};

export default Hero;
