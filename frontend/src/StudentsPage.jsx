import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentsPage.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/users');
        setStudents(response.data);
      } catch (error) {
        setError('Failed to fetch students. Please try again.');
      }
    };

    fetchStudents();
  }, []);

  const handleBackToAdmin = () => {
    navigate('/admin');
  };

  return (
    <div className="students-page">
      <h2>Students</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{new Date(student.dob).toLocaleDateString()}</td>
              <td>{student.gender}</td>
              <td>{student.mobileNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="back-button" onClick={handleBackToAdmin}>Back to Admin</button>
    </div>
  );
};

export default StudentsPage;
