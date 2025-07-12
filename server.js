require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const swapRoutes = require("./routes/swapRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");
const multer = require("multer");
const { check, validationResult } = require("express-validator"); // For validation
const crypto = require("crypto"); // For generating tokens
const nodemailer = require("nodemailer"); // For sending emails         
const dashboardRoutes = require("./routes/dashboardRoutes");


const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(cors({ origin: "https://skill-swap-frontend-02.vercel.app/" }));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/swaps", swapRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/upload", uploadRoutes);
app.use("/api/user/dashboard", dashboardRoutes);



// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("✅ Skill Swap API is running");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

