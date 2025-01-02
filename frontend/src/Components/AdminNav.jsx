import React from 'react';
import { Link } from "react-router-dom";
import '../AdminStyling/AdminNav.css';

const AdminNav = () => {
    return (
        <div className="sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li><Link to="/admin/AllReq">Pending Pets Requests</Link></li>
                <li><Link to="/admin/ApprovedReq">Approved Pets</Link></li>
                <li><Link to="/admin/AdoptionReq">Adoption Requests</Link></li>
                <li><Link to="/admin/AllAdopted">All Adopted Pets</Link></li>
            </ul>
        </div>
    );
};

export default AdminNav;
