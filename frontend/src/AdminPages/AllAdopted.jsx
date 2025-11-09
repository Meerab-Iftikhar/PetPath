import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../AdminStyling/AllAdopted.css';

const AllAdopted = () => {
    const [adoptedRequests, setAdoptedRequests] = useState([]);

    // Fetch adopted requests
    useEffect(() => {
        const fetchAdoptedRequests = async () => {
            try {
                const response = await axios.get('http://43.204.231.18:6000/api/adoption/get-adoption-requests');
                console.log("API Response:", response.data.adoptionRequest); // Log the response to check the data structure
                // Filter for adopted requests
                const adopted = response.data.adoptionRequests.filter(request => request.status === 'Adopted');
                console.log("checking",response.data.adoptionRequests)
                console.log("Adopted Requests:", adopted);
                setAdoptedRequests(adopted);
                console.log("State after setting adopted requests:", adoptedRequests);
            } catch (error) {
                console.log("Error fetching adopted adoption requests:", error);
            }
        };

        fetchAdoptedRequests();
    }, []);
    useEffect(() => {
      console.log("Adopted Requests in State: ", adoptedRequests);
  }, [adoptedRequests]);
    return (
        <div className="main-content">
            <header>
                <h3>Adopted Pets</h3>
                <span className="date">6/23/2024, 12:39 AM</span>
            </header>

            <div className="pet-cards" id="adopted-pets">
                {adoptedRequests.length === 0 ? (
                    <p>No adopted adoption requests.</p>
                ) : (
                    adoptedRequests.map(request => (
                        <div key={request._id} className="pet-card">
                            <img src={request.petImage} alt="Pet Image" />
                            <div className="pet-details">
                                <h4>{request.petName}</h4>
                                <p><strong>Type:</strong> {request.petType}</p>
                                <p><strong>Age:</strong> {request.age} years</p>
                                <p><strong>Owner Email:</strong> {request.email}</p>
                                <p><strong>Owner Phone:</strong> {request.contactNumber}</p>
                                <p><strong>Additional Message:</strong> {request.additionalMessage || 'N/A'}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllAdopted;
