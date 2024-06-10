const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the User model is correct

// Registration endpoint
router.post('/register', async (req, res) => {
  const { name, email, password, dob, gender, mobileNumber } = req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      dob,
      gender,
      mobileNumber
    });

    await user.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed', error });
  }
});

// Login endpoint
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

//     res.json({ token, userId: user._id, name: user.name });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });

    // Send token and user data in response
    res.json({ token, userId: user._id, name: user.name });
  } catch (error) {
    // Handle server error
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
