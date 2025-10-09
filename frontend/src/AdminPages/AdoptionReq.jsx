import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../AdminStyling/AdoptionReq.css';

const AdoptionReq = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);

  // Fetch adoption requests from the backend
  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/adopting/adoption-requests');
        console.log('Fetched Requests:', response.data); // Log response data
        setAdoptionRequests(response.data);
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
      }
    };

    fetchAdoptionRequests();
  }, []);


  // Handle reject request
  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/adopting/adoption-requests/${id}`);
      setAdoptionRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id)
      );
      console.log('Rejected: Request deleted successfully');
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleApprove = async (id) => {
    console.log('Approving request with ID:', id); // Add this for debugging
    try {
      const response = await axios.put(`http://localhost:4000/api/adopting/adoption-requests/${id}`, {
        status: 'Adopted',
      });
      console.log('Approved:', response.data);
      setAdoptionRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: 'Adopted' } : request
        )
    );
      await axios.delete(`http://localhost:4000/api/adopting/adoption-requests/${id}`);
      console.log('Approved: Request deleted successfully from the database');
      setAdoptionRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id)
      );

    } catch (error) {
      console.error('Error approving request:', error);
    }
  };


  
  return (
    <div className="adoption-req-container">
      <h1>Adoption Requests</h1>
      {adoptionRequests.length === 0 ? (
        <p>No adoption requests found.</p>
      ) : (
        adoptionRequests.map((request) => (
          <div className="adoption-req-card" key={request._id}>
            <h3>{request.petName || 'No Pet Name'}</h3>
            <div className="details">
              <p><strong>Email:</strong> {request.email}</p>
              <p><strong>Phone:</strong> {request.phone}</p>
              <p><strong>Living Situation:</strong> {request.livingSituation}</p>
              <p><strong>Previous Experience:</strong> {request.previousExperience}</p>
              <p><strong>Other Pets:</strong> {request.otherPets || 'None'}</p>
            </div>
            <div className="actions" key={request._id}>
            <button className="reject" onClick={() => handleReject(request._id)}>Reject</button>
            <button className="approve" onClick={() => handleApprove(request._id)}>Approve</button>

            </div>
          </div>
        )))}
    </div>
  );
};

export default AdoptionReq;
