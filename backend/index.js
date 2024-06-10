// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const enrollRoutes = require('./routes/enroll'); // Import the enroll route

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', enrollRoutes); // Use the enroll route

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
