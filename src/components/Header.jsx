import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/images/Logo.png';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/');
      // Wait for navigation, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // If already on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="logo">
          <img src={Logo} alt="Chamoda Dewnith Logo" className="logo-image" />
          <div className="logo-text">
            <h1>CHAMODA DEWNITH</h1>
            <p className="subtitle">ARCHITECT</p>
          </div>
        </Link>
        <nav className="nav">
          <Link to="/" onClick={() => handleNavClick('/')} className="nav-link">Home</Link>
          <a href="/#about" onClick={(e) => handleSectionClick(e, 'about')} className="nav-link">About</a>
          <a href="/#projects" onClick={(e) => handleSectionClick(e, 'projects')} className="nav-link">Projects</a>
          <Link to="/contact" onClick={() => handleNavClick('/contact')} className="nav-link">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
