const mongoose = require("mongoose");

const missonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: false,
  }]
});

module.exports = mongoose.model('Mission', missonSchema);

