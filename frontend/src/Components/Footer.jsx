import React from 'react';
import { assets } from '../assets/assets';
import '../Styling/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={assets.logo} alt="Logo" className="footer-logo" />
        <h2>PawFinds</h2>
        <p>You can reach me at PetPath5@gmail.com</p>
        <div className="social-links">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
          <span>|</span>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> GitHub
          </a>
          <span>|</span>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <span>|</span>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>
        <p>© 2024 PetPath---Areeha Meerab</p>
      </div>
    </footer>
  );
};

export default Footer;
