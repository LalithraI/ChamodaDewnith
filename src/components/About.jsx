import './About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" 
            alt="Chamoda Dewnith" 
          />
        </div>
        <div className="about-content">
          <h2 className="about-title">About Chamoda Dewnith</h2>
          <div className="about-text">
            <p>
              With over a decade of experience in architectural design, Chamoda Dewnith 
              has established a reputation for creating innovative spaces that seamlessly 
              blend functionality with aesthetic excellence. His design philosophy centers 
              on the belief that architecture should enhance human experience while 
              respecting the natural environment.
            </p>
            <p>
              Educated at the prestigious School of Architecture, University of Moratuwa, 
              Chamoda has led numerous award-winning projects across Sri Lanka. His portfolio 
              spans residential villas, commercial complexes, and public spaces, each 
              characterized by clean lines, sustainable practices, and thoughtful integration 
              with the surrounding landscape.
            </p>
            <p>
              Chamoda's work has been featured in leading architectural publications and 
              exhibitions. He believes in collaborative design processes, working closely 
              with clients to translate their vision into timeless architectural statements 
              that stand the test of time.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-item">
              <h3>10+</h3>
              <p>Years of Experience</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Completed Projects</p>
            </div>
            <div className="stat-item">
              <h3>15+</h3>
              <p>Awards & Recognition</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
