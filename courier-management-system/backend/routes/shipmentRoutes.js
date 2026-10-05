const express = require("express");
const router = express.Router();

const { auth, authorize } = require("../middleware/authMiddleware");

const {
  bookCourier,
  getHistory,
  downloadPDF,
  trackShipment,
} = require("../controllers/shipmentController");

// Book Courier
router.post("/book", auth, authorize("customer"), bookCourier);

// Track Shipment
router.get("/track/:id", trackShipment);

// Customer History
router.get("/history/:id", auth, authorize("customer"), getHistory);

// Download Receipt PDF
router.get("/download/:id", auth, downloadPDF);

module.exports = router;