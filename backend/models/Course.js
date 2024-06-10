// models/Course.js

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: String, required: true },
  price: { type: Number, required: true },
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Course', CourseSchema);
