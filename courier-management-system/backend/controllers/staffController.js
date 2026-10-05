// const Staff = require("../models/Staff");
// const Shipment = require("../models/Shipment");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const validFlow = {
//   Booked: ["Picked"],
//   Picked: ["In Transit"],
//   "In Transit": ["Delivered"],
//   Delivered: []
// };

// // LOGIN
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const staff = await Staff.findOne({ email });
//     if (!staff) return res.status(400).json("Staff not found");

//     const isMatch = await bcrypt.compare(password, staff.password);
//     if (!isMatch) return res.status(400).json("Wrong password");

//     const token = jwt.sign(
//       { id: staff._id, role: staff.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       user: staff
//     });

//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };

// // GET ALL ASSIGNED DELIVERIES (FULL)
// exports.getAssigned = async (req, res) => {
//   try {
//     const staffId = req.user.id;

//     // All shipments assigned to staff
//     const shipments = await Shipment.find({ assignedStaff: staffId }).sort({ createdAt: -1 });

//     res.json(shipments);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };

// // GET DAILY DELIVERY SCHEDULE
// exports.getDailySchedule = async (req, res) => {
//   try {
//     const staffId = req.user.id;
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     const shipments = await Shipment.find({
//       assignedStaff: staffId,
//       createdAt: { $gte: today, $lt: tomorrow }
//     }).sort({ createdAt: 1 });

//     res.json(shipments);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };

// // UPDATE STATUS + RECORD DELIVERY DATE
// exports.updateStatus = async (req, res) => {
//   try {
//     const shipment = await Shipment.findById(req.params.id);
//     if (!shipment) return res.status(404).json({ message: "Shipment not found" });

//     const current = shipment.status;
//     const next = req.body.status;

//     if (!validFlow[current].includes(next))
//       return res.status(400).json({ message: "Invalid status flow" });

//     shipment.status = next;

//     // Record delivery date if Delivered
//     if (next === "Delivered") shipment.deliveryDate = new Date();

//     await shipment.save();
//     res.json(shipment);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
























// const Staff = require("../models/Staff");
// const Shipment = require("../models/Shipment");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const validFlow = {
//   Booked: ["Picked"],
//   Picked: ["In Transit"],
//   "In Transit": ["Delivered"],
//   Delivered: []
// };

// // LOGIN
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const staff = await Staff.findOne({ email });
//     if (!staff) return res.status(400).json("Staff not found");

//     const isMatch = await bcrypt.compare(password, staff.password);
//     if (!isMatch) return res.status(400).json("Wrong password");

//     const token = jwt.sign(
//       { id: staff._id, role: staff.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       user: staff
//     });

//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };

// // GET ALL ASSIGNED DELIVERIES (FULL)
// exports.getAssigned = async (req, res) => {
//   try {
//     const staffId = req.user.id;

//     // All shipments assigned to staff + populate customer name & address
//     const shipments = await Shipment.find({ assignedStaff: staffId })
//       .sort({ createdAt: -1 })
//       .populate("customerId", "name address");  // ✅ Populate customer info

//     res.json(shipments);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };

// // GET DAILY DELIVERY SCHEDULE
// exports.getDailySchedule = async (req, res) => {
//   try {
//     const staffId = req.user.id;
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);

//     const shipments = await Shipment.find({
//       assignedStaff: staffId,
//       createdAt: { $gte: today, $lt: tomorrow }
//     })
//     .sort({ createdAt: 1 })
//     .populate("customerId", "name address");  // ✅ Populate customer info

//     res.json(shipments);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };
// // UPDATE STATUS + RECORD DELIVERY DATE + CONFIRMATION
// exports.updateStatus = async (req, res) => {
//   try {
//     const shipment = await Shipment.findById(req.params.id);
//     if (!shipment) return res.status(404).json({ message: "Shipment not found" });

//     const current = shipment.status;
//     const next = req.body.status;

//     if (!validFlow[current].includes(next))
//       return res.status(400).json({ message: "Invalid status flow" });

//     shipment.status = next;

//     // Record delivery date if Delivered
//     if (next === "Delivered") {
//       shipment.deliveryDate = new Date();
//       shipment.confirmation = req.body.confirmation || ""; // save confirmation note
//     }

//     await shipment.save();
//     res.json(shipment);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
































const Staff = require("../models/Staff");
const Shipment = require("../models/Shipment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validFlow = {
  Booked: ["Picked"],
  Picked: ["In Transit"],
  "In Transit": ["Delivered"],
  Delivered: []
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await Staff.findOne({ email });
    if (!staff) return res.status(400).json("Staff not found");

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) return res.status(400).json("Wrong password");

    const token = jwt.sign({ id: staff._id, role: staff.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: staff });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET ALL ASSIGNED DELIVERIES
exports.getAssigned = async (req, res) => {
  try {
    const staffId = req.user.id;
    const shipments = await Shipment.find({ assignedStaff: staffId }).sort({ createdAt: -1 });
    res.json(shipments);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// GET DAILY DELIVERY SCHEDULE
exports.getDailySchedule = async (req, res) => {
  try {
    const staffId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const shipments = await Shipment.find({
      assignedStaff: staffId,
      createdAt: { $gte: today, $lt: tomorrow }
    }).sort({ createdAt: 1 });

    res.json(shipments);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// UPDATE STATUS + CONFIRMATION
exports.updateStatus = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });

    const current = shipment.status;
    const next = req.body.status;
    if (!validFlow[current].includes(next)) return res.status(400).json({ message: "Invalid status flow" });

    shipment.status = next;

    if (next === "Delivered") {
      shipment.deliveryDate = new Date();
      shipment.confirmation = req.body.confirmation || "";
    }

    await shipment.save();
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};