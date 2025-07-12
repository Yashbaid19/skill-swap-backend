const express = require("express");
const router = express.Router();

const User = require("../models/User");
const SwapRequest = require("../models/SwapRequest");
const Feedback = require("../models/Feedback");

// Get all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Ban user (set isPublic to false)
router.patch("/ban/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isPublic: false },
      { new: true }
    );
    res.json({ message: "User banned", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user (optional)
router.delete("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all swap requests
router.get("/swaps", async (req, res) => {
  const swaps = await SwapRequest.find().populate("fromUser toUser");
  res.json(swaps);
});

// Delete a swap request
router.delete("/swaps/:id", async (req, res) => {
  try {
    await SwapRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Swap deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get stats
router.get("/stats", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const swapCount = await SwapRequest.countDocuments();
    const feedbackCount = await Feedback.countDocuments();

    res.json({
      users: userCount,
      swaps: swapCount,
      feedbacks: feedbackCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
