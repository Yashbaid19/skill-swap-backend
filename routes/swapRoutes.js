const express = require("express");
const router = express.Router();
const SwapRequest = require("../models/SwapRequest");

// Create a swap request
router.post("/", async (req, res) => {
  try {
    const { fromUser, toUser, message } = req.body;

    const swap = new SwapRequest({ fromUser, toUser, message });
    await swap.save();

    res.status(201).json({ message: "Swap request sent!", swap });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept or Reject a swap request
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await SwapRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a pending request
router.delete("/:id", async (req, res) => {
  try {
    const request = await SwapRequest.findById(req.params.id);

    if (request.status !== "pending") {
      return res.status(400).json({ message: "Only pending requests can be deleted" });
    }

    await SwapRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Swap request deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View all swap requests (sent or received)
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const swaps = await SwapRequest.find({
      $or: [{ fromUser: userId }, { toUser: userId }],
    })
      .populate("fromUser", "name skillsOffered")
      .populate("toUser", "name skillsOffered");

    res.status(200).json(swaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
