const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  mail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  position: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Position"
  },
  diplomas: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Diploma"
  }],
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Account",
    default: "aaaaaaaaaaaaaaaaaaaaaaaa"
  },
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Assignment"
  }],
});

module.exports = mongoose.model('Teacher', teacherSchema);

