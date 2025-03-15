const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Import routers
const authRouter = require("./routes/auth");
const employeeRouter = require("./routes/employees");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/prodigy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Use the routers
app.use("/api/auth", authRouter); // Authentication routes
app.use("/api/employees", employeeRouter); // Employee routes

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
