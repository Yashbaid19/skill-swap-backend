const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: String,
  profilePhoto: String, // store image URL or base64 (optional)
  skillsOffered: [String],
  skillsWanted: [String],
  availability: {
    type: String, // e.g., "Weekends", "Evenings"
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
