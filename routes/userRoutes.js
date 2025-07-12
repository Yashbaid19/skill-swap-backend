const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "User creation failed", error: err.message });
  }
});

// Get all public users or filter by skill
router.get("/", async (req, res) => {
  try {
    const { skill } = req.query;

    const query = {
      isPublic: true,
      ...(skill && {
        $or: [
          { skillsOffered: { $regex: skill, $options: "i" } },
          { skillsWanted: { $regex: skill, $options: "i" } },
        ],
      }),
    };

    const users = await User.find(query);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

module.exports = router;
