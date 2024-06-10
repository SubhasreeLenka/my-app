// routes/enroll.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');

// Enrollment endpoint
router.post('/enroll', async (req, res) => {
  const { courseId, userId } = req.body;

  try {
    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Find the user by ID (assuming user authentication is in place)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Enroll the user in the course
    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

    res.json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Enrollment failed', error });
  }
});

module.exports = router;
