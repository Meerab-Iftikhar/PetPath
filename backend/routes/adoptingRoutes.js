// routes/adoptingRoutes.js
import express from 'express';
import AdoptingRequest from '../models/adoptingRequestModel.js'; // Import the AdoptionRequest model
import AdoptionRequest from '../models/adoptionRequestModel.js';
const router = express.Router();

// POST route for submitting an adoption request
router.post('/submit-adoption-request', async (req, res) => {
  try {
    const { email, phone, livingSituation, previousExperience, otherPets, petId } = req.body;

     // Fetch the pet's name from the adoptionrequests collection
     const pet = await AdoptionRequest.findById(petId);

     if (!pet) {
       return res.status(404).json({ message: 'Pet not found' });
     }

    // Create a new adoption request based on the form data
    const adoptingRequest = new AdoptingRequest({
      email,
      phone,
      livingSituation,
      previousExperience,
      otherPets,
      petId,
      petName: pet.petName,
    });

    // Save the adoption request to the database
    await adoptingRequest.save();

    res.status(201).json({ message: 'Adoption request submitted successfully', adoptingRequest });
  } catch (error) {
    console.error('Error submitting adoption request:', error);
    res.status(500).json({ message: 'Error submitting the adoption request', error: error.message });
  }
});
// GET route for fetching adoption requests
router.get('/adoption-requests', async (req, res) => {
    try {
      const requests = await AdoptingRequest.find()
      console.log('Fetched Requests:', requests);
      res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching adoption requests:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

// Update adoption request status to "Adopted"
router.put('/adoption-requests/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log('ID received in PUT request:', id); // Add this
      console.log('Request body:', req.body); // Add this
      const updatedRequest = await AdoptingRequest.findByIdAndUpdate(
        id,
        { status: 'Adopted' },
        { new: true }
      );
      if (!updatedRequest) {
        return res.status(404).json({ message: 'Adoption request not found' });
      }
      const petUpdate = await AdoptionRequest.findByIdAndUpdate(
        updatedRequest.petId,
        { status: 'Adopted' },
        { new: true }
    );

    if (!petUpdate) {
        return res.status(404).json({ message: 'Pet record not found' });
    }

      res.status(200).json({ message: 'Request approved', updatedRequest });
    } catch (error) {
      console.error('Error approving request:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  router.delete('/adoption-requests/:id', async (req, res) => {
    try {
      const requestId = req.params.id;
  
      // Delete the adoption request from the database
      await AdoptingRequest.findByIdAndDelete(requestId);
  
      res.status(200).json({ message: 'Adoption request rejected and deleted successfully' });
    } catch (error) {
      console.error('Error deleting adoption request:', error.message);
      res.status(500).json({ error: error.message });
    }
  });

// Controller function to get adoption requests
const getAdoptionRequests = async (req, res) => {
  try {
    const requests = await AdoptingRequest.find().populate(); // Fetches pet details
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Route for fetching adoption requests
router.get('/adoption-requests', getAdoptionRequests);

export default router;
