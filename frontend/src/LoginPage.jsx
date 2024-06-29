import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // Optional: add some CSS for styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    //   const response = await axios.post('http://localhost:5000/api/auth/login', {
    //     email,
    //     password
    //   });

    //   if (response.data.success) {
    //     // Store token in localStorage or context if needed
    //     localStorage.setItem('token', response.data.token);

        // Check if the user is admin
        if (email === 'admin@12.com' && password === 'Password') {
          // Redirect to admin dashboard
          navigate('/admin');
        } else {
          setError('Invalid admin credentials.');
        }
    //   } else {
    //     setError(response.data.message);
    //   }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;
