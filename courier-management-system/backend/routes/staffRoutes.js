const express = require("express");
const router = express.Router();

const { auth, authorize } = require("../middleware/authMiddleware");

const {
  login,
  getAssigned,
  updateStatus,
  getDailySchedule,
} = require("../controllers/staffController");

// Public Login
router.post("/login", login);

// Protected Routes
router.get("/assigned", auth, authorize("staff"), getAssigned);
router.get("/schedule", auth, authorize("staff"), getDailySchedule);
router.put("/status/:id", auth, authorize("staff"), updateStatus);

module.exports = router;