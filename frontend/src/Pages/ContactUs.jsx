import React from 'react';
import '../Styling/ContactUs.css'; // Link to the new CSS file
import backgroundImage from '../assets/ContactPage.png'; // Import the image

const ContactUs = () => {
  return (
    <div className="contact-us-container" style={{ backgroundImage: 'url(${backgroundImage})' }}>
      <div className="contact-us-content">
        <h1 className="contact-us-heading">ContacttttJJJJJHGHYGHJJJ Uslls</h1>
        <div className="contact-us-info">
          <h2>Our Office</h2>
          <p>123 Pet Haven Lane</p>
          <p>Suite 101, Animal City, PA 19000</p>
          <p><strong>Tel:</strong> (555) 123-4567</p>
          <p><strong>Email:</strong> contact@petadoptioncenter.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
