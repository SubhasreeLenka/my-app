import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectionPage.css'; // Optional: add some CSS for styling

const SelectionPage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/loginp'); // Navigate to the admin page
  };

  const handleStudentClick = () => {
    navigate('/login'); // Navigate to the student page
  };

  return (
    <div className="selection-page">
      <h2>Are you an Admin or a Student?</h2>
      <button onClick={handleAdminClick}>Admin</button>
      <button onClick={handleStudentClick}>Student</button>
    </div>
  );
};

export default SelectionPage;
