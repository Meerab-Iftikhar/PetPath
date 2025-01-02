import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import AdminNav from '../Components/AdminNav';
import '../Styling/AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const handleLogout = () => {
    // Redirect to the AdminLogin page
    navigate('/adminlogin'); // Adjust the path to where your login page is located
  };

  return (
    <div className="container">
      {/* Main Content */}
      <div className="main-content">
        <header>
          <h3>Welcome to the Admin Panel</h3>
          <span className="date">6/23/2024, 12:39 AM</span>
          <button className="logout" onClick={handleLogout}>Logout</button> {/* Attach the handleLogout function */}
        </header>
        <div className="dashboard-overview">
          <h4>Select a section from the sidebar to manage adoption requests and pet statuses.</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
