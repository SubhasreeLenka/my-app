// routes/students.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../models/student'); // Ensure the student model is correctly defined

// Middleware to check for a valid JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

// GET all students for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const students = await Student.find({ userId: req.user._id });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
