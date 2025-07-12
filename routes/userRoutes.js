const express = require("express");
const router = express.Router();
const User = require("../models/User");
const SwapRequest = require("../models/SwapRequest");
const Feedback = require("../models/Feedback");

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
router.put("/profile", async (req, res) => {
  try {
    const { userId, name, location, skillsOffered, skillsWanted, availability, isPublic } = req.body;

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(location && { location }),
        ...(skillsOffered && { skillsOffered }),
        ...(skillsWanted && { skillsWanted }),
        ...(availability && { availability }),
        ...(typeof isPublic === "boolean" && { isPublic }),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated", user: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET user dashboard stats
router.get("/dashboard/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const sentSwaps = await SwapRequest.find({ fromUser: userId });
    const receivedSwaps = await SwapRequest.find({ toUser: userId });

    const totalSent = sentSwaps.length;
    const totalReceived = receivedSwaps.length;

    const allSwaps = [...sentSwaps, ...receivedSwaps];

    const statusCount = {
      pending: 0,
      accepted: 0,
      rejected: 0,
    };

    allSwaps.forEach((swap) => {
      statusCount[swap.status]++;
    });

    const feedbacks = await Feedback.find({ toUser: userId });

    const totalFeedbacks = feedbacks.length;
    const averageRating =
      feedbacks.reduce((sum, f) => sum + f.rating, 0) / (feedbacks.length || 1);

    res.status(200).json({
      totalSent,
      totalReceived,
      statusCount,
      totalFeedbacks,
      averageRating: averageRating.toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading dashboard", error: err.message });
  }
});

module.exports = router;
