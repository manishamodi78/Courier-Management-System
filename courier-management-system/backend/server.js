require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const customerRoutes = require("./routes/customerRoutes");
const staffRoutes = require("./routes/staffRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// API Routes
app.use("/api/customer", customerRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/shipment", shipmentRoutes);
app.use("/api/admin", adminRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Courier Management API Running...");
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});