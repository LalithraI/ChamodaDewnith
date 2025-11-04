import { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // EmailJS configuration
    // Replace these with your EmailJS credentials
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const userID = 'YOUR_USER_ID';

    emailjs.sendForm(serviceID, templateID, formRef.current, userID)
      .then((result) => {
        console.log(result.text);
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
      }, (error) => {
        console.log(error.text);
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h1>Let's Work Together</h1>
          <p className="contact-intro">
            Have a project in mind? I'd love to hear about it. 
            Fill out the form and I'll get back to you as soon as possible.
          </p>

          <div className="info-section">
            <h3>Contact Information</h3>
            <div className="info-item">
              <strong>Email</strong>
              <p>chamodadewnith@architect.com</p>
            </div>
            <div className="info-item">
              <strong>Phone</strong>
              <p>+94 77 123 4567</p>
            </div>
            <div className="info-item">
              <strong>Location</strong>
              <p>Colombo, Sri Lanka</p>
            </div>
          </div>

          <div className="info-section">
            <h3>Office Hours</h3>
            <div className="info-item">
              <strong>Monday - Friday</strong>
              <p>9:00 AM - 6:00 PM</p>
            </div>
            <div className="info-item">
              <strong>Saturday</strong>
              <p>10:00 AM - 2:00 PM</p>
            </div>
            <div className="info-item">
              <strong>Sunday</strong>
              <p>Closed</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <h2>Send a Message</h2>
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className="status-message success">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {status === 'error' && (
              <div className="status-message error">
                Oops! Something went wrong. Please try again or email directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
