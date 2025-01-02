// models/adoptingRequestModel.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Define the schema for adoption requests
const adoptingRequestSchema = new mongoose.Schema({ 
  email: { type: String, required: true },
  phone: { type: String, required: true },
  livingSituation: { type: String, required: true },
  previousExperience: { type: String, required: true },
  otherPets: { type: String }, // Optional
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'adoptionrequests', required: true }, // Reference to Pet model
  petName: { type: String, required: true },
}, {
  timestamps: true, // Add timestamps for creation and update times
});

// Create the model for the adoption request
const AdoptingRequest = mongoose.model('AdoptingRequest', adoptingRequestSchema);

export default AdoptingRequest; 
