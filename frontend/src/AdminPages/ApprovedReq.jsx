import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../AdminStyling/ApprovedReq.css';

const ApprovedReq = () => {
    const [approvedRequests, setApprovedRequests] = useState([]);

    useEffect(() => {
        const fetchApprovedRequests = async () => {
            try {
                const response = await axios.get('${import.meta.env.VITE_API_URL}/api/adoption/get-adoption-requests');
                const approved = response.data.adoptionRequests.filter(request => request.status === 'Approved');
                setApprovedRequests(approved);
            } catch (error) {
                console.log("Error fetching approved adoption requests:", error);
            }
        };

        fetchApprovedRequests();
    }, []);

    const confirmDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this pet?")) {
            handleDelete(id);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete('${import.meta.env.VITE_API_URL}/api/adoption/reject-adoption/${id}');
            setApprovedRequests(approvedRequests.filter(request => request._id !== id));
        } catch (error) {
            console.log("Error deleting pet:", error);
        }
    };

    return (
        <div className="main-content">
            <header>
                <h3>Approved Pets</h3>
                <span className="date">6/23/2024, 12:39 AM</span>
            </header>

            <div className="pet-cards" id="approved-pets">
                {approvedRequests.length === 0 ? (
                    <p>No approved adoption requests.</p>
                ) : (
                    approvedRequests.map(request => (
                        <div key={request._id} className="pet-card">
                            <img src={request.petImage} alt="Pet Image" />
                            <div className="pet-details">
                                <h4>{request.petName}</h4>
                                <p><strong>Type:</strong> {request.petType}</p>
                                <p><strong>Age:</strong> {request.age} years</p>
                                <p><strong>Owner Email:</strong> {request.email}</p>
                                <p><strong>Owner Phone:</strong> {request.contactNumber}</p>
                                <p><strong>Additional Message:</strong> {request.additionalMessage || 'N/A'}</p>
                                <button className="delete" onClick={() => confirmDelete(request._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ApprovedReq;
