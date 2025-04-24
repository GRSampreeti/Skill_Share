const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  credits: {
    type: Number,
    default: 3
  },
  skill_tag: {
    type: String
  },
  course_title: {
    type: String
  },
  course_description: {
    type: String
  },
  credits_required: {
    type: Number,
    default: 1
  },
  is_teaching: {
    type: Boolean,
    default: false
  },
  is_booked: {
    type: Boolean,
    default: false
  },
  booked_by_email: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Export the model using CommonJS
module.exports = mongoose.model("Users", userSchema);
