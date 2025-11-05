import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>CHAMODA DEWNITH</h3>
          <p>Creating timeless architectural experiences</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: lalithraindupa2002@gmail.com</p>
          <p>Phone: +94 77 123 4567</p>
        </div>
        <div className="footer-section">
          <h4>Location</h4>
          <p>Colombo, Sri Lanka</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Chamoda Dewnith. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
