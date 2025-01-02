import mongoose, { trusted } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();




const allowedPetTypes = ['Dog', 'Cat', 'Bird', 'Rabbit','Others'];
// Define the schema for adoption requests
const adoptionRequestSchema = new mongoose.Schema({
    petName: {
        type: String,
        required: true,

    },   
    age: {
        type: Number,
        required: true, 
    },
    petType: {
         
        type: String,
        enum:allowedPetTypes,
        required: true, // Could be Dog, Cat, etc.
    },
    contactNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    additionalMessage: {
        type: String,
        required: false,
    },
    petImage: {
        type: String,  // URL of the pet image
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved','Deleted','Adopted'],
        default: 'Pending', // Default status is "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create and export the model based on the schema
const AdoptionRequest = mongoose.model('AdoptionRequest', adoptionRequestSchema);

export default AdoptionRequest;
  