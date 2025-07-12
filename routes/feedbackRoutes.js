const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// Submit feedback
router.post("/", async (req, res) => {
  try {
    const { swapId, fromUser, toUser, rating, comment } = req.body;

    const feedback = new Feedback({
      swapId,
      fromUser,
      toUser,
      rating,
      comment,
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get feedback for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const feedbacks = await Feedback.find({ toUser: userId })
      .populate("fromUser", "name")
      .populate("swapId", "_id status");

    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
