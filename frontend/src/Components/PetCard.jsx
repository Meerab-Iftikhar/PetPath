import React, { useState } from 'react';
import '../Styling/PetCard.css'; // Optional: Create a CSS file to style PetCard

const PetCard = ({ pet, onInterestClick }) => {
  return (
    <div className="pet-card">
      <img src={pet.petImage} alt={pet.petName} className="pet-image" />
      <div className="pet-details">
        <h4>{pet.petName}</h4>
        <p><strong>Type:</strong> {pet.petType}</p>
        <p><strong>Age:</strong> {pet.age} years</p>
        <p><strong>Contact:</strong> {pet.contactNumber}</p>
        <button className="show-interest-button" onClick={() => onInterestClick(pet)}> Show Interest 🐾 </button>
      </div>
    </div>
  );
};

export default PetCard;
