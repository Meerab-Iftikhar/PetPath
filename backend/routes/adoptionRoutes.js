import express from 'express';
import cloudinary from '../config/cloudinary.js'; // Cloudinary config file
import AdoptionRequestModel from '../models/adoptionRequestModel.js'; // Adoption Request Model
import { v2 as cloudinaryV2 } from 'cloudinary';

const router = express.Router();

// Route to handle form submission for adoption requests (including direct image upload to Cloudinary)
router.post('/submit-adoption', async (req, res) => {
  try {
    // Cloudinary URL variable
    let petImageUrl = null;

    // If the frontend sends a Cloudinary image URL (already uploaded to Cloudinary)
    if (req.body.petImage) {
      petImageUrl = req.body.petImage;  // Frontend directly provides the URL from Cloudinary
      
    }

    

    // Create a new adoption request with the form data and image URL
    const newAdoptionRequest = new AdoptionRequestModel({
      petName: req.body.petName,
      age: req.body.age,
      petType: req.body.petType,
      contactNumber: req.body.contactNumber,
      email: req.body.email,
      additionalMessage: req.body.additionalMessage,
      petImage: petImageUrl, // Save the Cloudinary URL of the pet image
      extra: req.body.extra,
    });

    // Save the new adoption request to the database
    await newAdoptionRequest.save();

    return res.status(201).json({
      success: true,
      message: 'Pets for adoption request submitted successfully!',
      adoptionRequest: newAdoptionRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error submitting pets for adoption request.',
      error: error.message,
    });
  }
});

// Route to get all adoption requests (for the admin panel)
router.get('/get-adoption-requests', async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequestModel.find({
      status: { $in: ['Pending', 'Approved','Adopted'] } // Fetch requests with status "Pending" or "Approved"
    });
    return res.status(200).json({
      success: true,
      adoptionRequests: adoptionRequests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching adoption requests.',
      error: error.message,
    });
  }
});

// Route to reject an adoption request (by the admin)
router.delete('/reject-adoption/:id', async (req, res) => {
  try {
    const adoptionRequest = await AdoptionRequestModel.findById(req.params.id);
    if (!adoptionRequest) {
      return res.status(404).json({
        success: false,
        message: 'Adoption request not found!',
      });
    }

    // Remove the adoption request from the database
    await AdoptionRequestModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Adoption request rejected and deleted from the database!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error rejecting adoption request.',
      error: error.message,
    });
  }
});



// Route to get all approved pets
router.get('/get-approved-pets', async (req, res) => {
  try {
    const approvedPets = await AdoptionRequestModel.find({ status: 'Approved' });
    return res.status(200).json({
      success: true,
      approvedPets: approvedPets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching approved pets.',
      error: error.message,
    });
  }
});


// Route to approve an adoption request (by the admin)
router.put('/approve-adoption/:id', async (req, res) => {
  try {
    const adoptionRequest = await AdoptionRequestModel.findById(req.params.id);
    if (!adoptionRequest) {
      return res.status(404).json({
        success: false,
        message: 'Adoption request not found!',
      });
    }

    adoptionRequest.status = 'Approved';
    await adoptionRequest.save();

    return res.status(200).json({
      success: true,
      message: 'Adoption request approved!',
      adoptionRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error approving adoption request.',
      error: error.message,
    });
  }
});

export default router;
