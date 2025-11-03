// src/pages/Pets.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PetCard from '../Components/PetCard';
import '../Styling/Pets.css';

const Pets = () => {
  const [approvedPets, setApprovedPets] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  // Form data state
  const [adoptionData, setAdoptionData] = useState({
    email: '',
    phone: '',
    livingSituation: '',
    previousExperience: '',
    otherPets: '',
  });
  const initialFormState = {
    email: '',
    phone: '',
    livingSituation: '',
    previousExperience: '',
    otherPets: '',
  };

  // Fetch approved pets from the backend
  useEffect(() => {
    const fetchApprovedPets = async () => {
      try {
        const response = await axios.get('http://3.111.51.68:4000/api/adoption/get-approved-pets');
        setApprovedPets(response.data.approvedPets);
      } catch (error) {
        console.log('Error fetching approved pets:', error);
      }
    };
    fetchApprovedPets();
  }, []);

  // Open popup when user shows interest in a pet
  const handleInterestClick = (pet) => {
    setSelectedPet(pet);
    setIsPopupOpen(true);
  };

  // Close the popup and reset the selected pet
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedPet(null);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdoptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submission of the adoption request
  const handleAdoptionRequest = async (event) => {
    event.preventDefault();
    const petId = selectedPet._id; // Pass selected pet ID
    const data = { ...adoptionData, petId };

    try {
      const response = await axios.post('http://3.111.51.68:4000/api/adopting/submit-adoption-request', data);
      console.log('Adoption Request Submitted:', response.data);
      alert('Adoption request submitted successfully!');
      closePopup();
      setAdoptionData(initialFormState);
       // Close the popup after submission
    } catch (error) {
      console.log('Error submitting adoption request:', error);
      alert('Error submitting the request. Please try again later.');
    }
  };

  return (
    <div className="pets-container">
      <h2>Available Pets for Adoption</h2>
      {approvedPets.length === 0 ? (
        <p>No pets available for adoption at the moment.</p>
      ) : (
        <div className="pets-grid">
          {approvedPets.map(pet => (
            <PetCard key={pet._id} pet={pet} onInterestClick={handleInterestClick} />
          ))}
        </div>
      )}
      
      {/* Popup Form */}
      {isPopupOpen && selectedPet && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h2>Adoption Application</h2>
            <img src={selectedPet.petImage} alt={selectedPet.petName} className="popup-image" />
            <h3>{selectedPet.petName}</h3>
            <form onSubmit={handleAdoptionRequest}>
              <label>Email:</label>
              <input
                type="email" name="email"
                value={adoptionData.email}
                onChange={handleChange}
                required
              />
              <label>Phone Number:</label>
              <input
                type="text" name="phone"
                value={adoptionData.phone}
                onChange={handleChange}
                required
              />
              <label>Living Situation:</label>
              <textarea name="livingSituation"
                value={adoptionData.livingSituation}
                onChange={handleChange}
                required
              />
              <label>Previous Pet Experience:</label>
              <textarea name="previousExperience"
                value={adoptionData.previousExperience}
                onChange={handleChange}
                required
              />
              <label>Other Pets:</label>
              <textarea name="otherPets"
                value={adoptionData.otherPets}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </form>
            <button className="close-popup" onClick={closePopup}>Close ✖️</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pets;
