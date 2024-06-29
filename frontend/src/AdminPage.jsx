import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();

  const handleViewStudents = () => {
    navigate('/students');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token if stored in localStorage
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Page</h2>
      <p className="admin-welcome">Welcome, Admin!</p>
      <button className="admin-button" onClick={handleViewStudents}>View Students</button>
      <button className="admin-button" onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default AdminPage;
