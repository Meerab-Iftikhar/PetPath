import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../AdminStyling/AllReq.css';

const AllReq = () => {
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const response = await axios.get('http://localhost:4000/get-adoption-requests');
                const adoptionRequests = response.data.adoptionRequests || [];
                setPendingRequests(adoptionRequests.filter(request => request.status === 'Pending'));
            } catch (error) {
                console.log("Error fetching pending adoption requests:", error);
            }
        };

        fetchPendingRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:4000/approve-adoption/${id}`);
            setPendingRequests(pendingRequests.filter(request => request._id !== id));
        } catch (error) {
            console.log("Error approving adoption:", error);
        }
    };

    const handleReject = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to reject this request?")) return;
            await axios.delete(`http://localhost:4000/reject-adoption/${id}`);
            setPendingRequests(pendingRequests.filter(request => request._id !== id));
        } catch (error) {
            console.log("Error rejecting adoption:", error);
        }
    };

    return (
        <div className="all-req-container">
            <h3>Pending Adoption Requests</h3>
            {pendingRequests.length === 0 ? (
                <p>No pending adoption requests.</p>
            ) : (
                pendingRequests.map(request => (
                    <div key={request._id} className="pet-card">
                        <img src={request.petImage} alt="Pet" />
                        <div className="pet-details">
                            <h4>{request.petName}</h4>
                            <p><strong>Type:</strong> {request.petType}</p>
                            <p><strong>Age:</strong> {request.age} years</p>
                            <p><strong>Owner Email:</strong> {request.email}</p>
                            <p><strong>Owner Phone:</strong> {request.contactNumber}</p>
                            <p><strong>Additional Message:</strong> {request.additionalMessage || 'N/A'}</p>
                            <button className="approve" onClick={() => handleApprove(request._id)}>Approve</button>
                            <button className="reject" onClick={() => handleReject(request._id)}>Reject</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AllReq;
