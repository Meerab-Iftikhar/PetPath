import React, { useState } from 'react';
import '../Styling/Services.css'; // Link to the CSS file
import { assets } from '../assets/assets';

const Services = () => {
  const [imageUrl, setImageUrl] = useState(null);  // State to store image URL

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    console.log('Uploading image to Cloudinary...');
    const formData = new FormData();
    formData.append("file", file);  // Append the file
    formData.append("upload_preset", "pet_upload_preset");  // Your Cloudinary upload preset

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dtmbrqztk/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Cloudinary upload response:', data);
      
      if (data.secure_url) {
        return data.secure_url;  // Return the secure URL of the uploaded image
      } else {
        throw new Error('Cloudinary upload failed');
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
    }
  };

  // Form submission handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    // Get file from the input field
    const file = event.target.petImage.files[0];
    console.log('File to upload:', file);

    let uploadedImageUrl = null; // Declare this variable

    // If there's a file, upload it to Cloudinary
    if (file) {
      uploadedImageUrl = await uploadImageToCloudinary(file);
      console.log('Uploaded Image URL:', uploadedImageUrl);
    }

    // If no file is uploaded, keep the petImage as null
    const formData = {
      petName: event.target.petName.value,
      age: event.target.age.value,
      petType: event.target.petType.value,
      contactNumber: event.target.contactNumber.value,
      email: event.target.email.value,
      additionalMessage: event.target.additionalMessage.value,
      petImage: uploadedImageUrl,  // Ensure this is the correct URL
      extra: event.target.extra.value,
      
    };

    console.log('Form Data:', formData);

    // Send the form data to the backend
    try {
      const response = await fetch('http://13.201.98.216:4000/api/adoption/submit-adoption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Backend response:', data);

      if (data.success) {
        alert('Adoption request submitted successfully!');
      } else {
        alert('Error submitting adoption request.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
 

  return (
    <div className="services-page">
      <div className="services-content">
        <div className="left-div">
          <h2>ADOPT A PET</h2>
          <img src={assets.adopt1} alt="Adopt a Pet" />
          <div className="info-section">
            <h3>Benefits of Pet Adoption</h3>
            <p>Adopting a pet can provide unconditional love, companionship, and joy.</p>
          </div>
          <div className="info-section">
            <h3>Adoption Process</h3>
            <p>The adoption process involves filling out a form, meeting the pet, and finalizing the adoption.</p>
          </div>
          <div className="info-section">
            <h3>Responsibilities</h3>
            <p>As a pet owner, you will need to provide food, shelter, and love to your new pet.</p>
          </div>
          <div className="find-pet-button">
            <a href="/pets">
              <button>Find Your Perfect Pet</button>
            </a>
          </div>
        </div>

        <div className="right-div">
          <h2>POST A PET FOR ADOPTION</h2>
          <img src={assets.post} alt="Post a Pet" />
          <form className="pet-form" onSubmit={handleFormSubmit}>
            <label>Name:</label>
            <input type="text" name="petName" required />

            <label>Pet Age:</label>
            <input type="number" name="age" required />

            <label>Picture:</label>
            <input type="file" name="petImage" required />

            <label>Type:</label>
            <select name="petType" required>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Bird">Bird</option>
              <option value="Others">Others</option>
            </select>

            <label>Justification for Giving a Pet:</label>
            <textarea name="additionalMessage" required></textarea>

            <label>Email:</label>
            <input type="email" name="email" required />

            <label>Phone Number:</label>
            <input type="tel" name="contactNumber" required />

            <label>extra:</label>
            <input type="string" name="extra" required/>

            <div className="submit-button">
              <button type="submit">Submit Your Pet</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Services;
