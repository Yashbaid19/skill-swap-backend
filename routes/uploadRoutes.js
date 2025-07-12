const express = require("express");
const multer = require("multer");
const User = require("../models/User");
const router = express.Router();

// Use disk storage (or you can use memory storage and upload to Cloudinary later)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST /api/user/profile-picture
router.post("/profile-picture", upload.single("photo"), async (req, res) => {
  try {
    const userId = req.body.userId;
    const photoPath = req.file.path;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePhoto: photoPath },
      { new: true }
    );

    res.status(200).json({
      message: "Profile picture updated",
      profilePhoto: photoPath,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
