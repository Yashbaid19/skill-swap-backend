const express = require("express");
const router = express.Router();
const SwapRequest = require("../models/SwapRequest");
const Feedback = require("../models/Feedback");
const User = require("../models/User");

router.get("/", async (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ message: "userId is required" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const sentSwaps = await SwapRequest.countDocuments({ fromUser: userId });
    const receivedSwaps = await SwapRequest.countDocuments({ toUser: userId });

    const feedbacks = await Feedback.find({ toUser: userId });
    const feedbackCount = feedbacks.length;
    const avgRating =
      feedbackCount === 0
        ? 0
        : (
            feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbackCount
          ).toFixed(1);

    res.status(200).json({
      name: user.name,
      location: user.location,
      skillsOffered: user.skillsOffered,
      skillsWanted: user.skillsWanted,
      availability: user.availability,
      isPublic: user.isPublic,
      swapRequestsSent: sentSwaps,
      swapRequestsReceived: receivedSwaps,
      feedbackCount,
      avgRating,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
