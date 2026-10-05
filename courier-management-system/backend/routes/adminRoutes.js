const express = require("express");
const router = express.Router();

const {
  adminLogin,
  getAllShipments,
  getStaff,
  assignStaff,
  getCustomers,
  deleteStaff,
  getReports,
  deleteCustomer,
  addStaff,
  deleteShipment,
  updateShipment,
} = require("../controllers/adminController");

const { auth, authorize } = require("../middleware/authMiddleware");

// Public Route
router.post("/login", adminLogin);

// Protected Routes
router.get("/shipments", auth, authorize("admin"), getAllShipments);
router.get("/staff", auth, authorize("admin"), getStaff);
router.post("/staff", auth, authorize("admin"), addStaff);
router.delete("/staff/:id", auth, authorize("admin"), deleteStaff);

router.get("/customers", auth, authorize("admin"), getCustomers);
router.delete("/customer/:id", auth, authorize("admin"), deleteCustomer);

router.post("/assign", auth, authorize("admin"), assignStaff);

router.get("/reports", auth, authorize("admin"), getReports);

router.put("/shipment/:id", auth, authorize("admin"), updateShipment);
router.delete("/shipment/:id", auth, authorize("admin"), deleteShipment);

module.exports = router;