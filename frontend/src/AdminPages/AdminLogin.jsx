import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation after successful login
import '../AdminStyling/AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate(); // React Router navigate hook

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded username and password
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'admin123';

    // Simple validation for empty fields
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    // Check if entered credentials match the hardcoded ones
    if (username === hardcodedUsername && password === hardcodedPassword) {
      // If login is successful, redirect to the Admin Panel
      navigate('/admin'); 
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="maindiv">
    <div className="login-container">
      <h2>Admin Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
    </div>
  );
};

export default AdminLogin;
