const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const swapRoutes = require("./routes/swapRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/swaps", swapRoutes);
app.use("/api/feedback", feedbackRoutes);

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("✅ Skill Swap API is running");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

