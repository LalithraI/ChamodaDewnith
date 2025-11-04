import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>CHAMODA DEWNITH</h1>
          <p className="subtitle">ARCHITECT</p>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <a href="/#about" className="nav-link">About</a>
          <a href="/#projects" className="nav-link">Projects</a>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
