import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './certificate.css';
import axios from 'axios';

const Certificate = ({ courseName }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    // Fetch username from the database
    const fetchUsername = async () => {
      try {
        const response = await axios.get('/api/name'); // Adjust the endpoint based on your backend route
        setName(response.data.name);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  const generatePDF = () => {
    const input = document.getElementById('certificate');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save(`${name}_certificate.pdf`); // Save with a dynamic filename
      });
  };

  return (
    <div>
      <div id="certificate" className="certificate">
        <h1>Certificate of Completion</h1>
        <p>This is to certify that</p>
        <h2>{name}</h2>
        <p>has successfully completed the course</p>
        <h3>{courseName}</h3>
        <p>Date: {new Date().toLocaleDateString()}</p> {/* Add current date */}
      </div>
      <button onClick={generatePDF} className="generate-btn">Download Certificate</button>
    </div>
  );
};

export default Certificate;
