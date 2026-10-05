const Shipment = require("../models/Shipment");
const Staff = require("../models/Staff");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer");

// ADMIN LOGIN

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json("Admin not found");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json("Wrong password");

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    //  IMPORTANT CHANGE
    res.json({
  token,
  user: {
    _id: admin._id,
    email: admin.email,
    role: admin.role
  }
});

  } catch (err) {
    res.status(500).json(err.message);
  }
};


// GET ALL SHIPMENTS
exports.getAllShipments = async (req, res) => {
  try {
    const data = await Shipment.find()
      .populate("customerId", "name email")
      .populate("assignedStaff", "name email");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET STAFF
exports.getStaff = async (req, res) => {
  try {
    const data = await Staff.find({}, "name email");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ASSIGN STAFF
exports.assignStaff = async (req, res) => {
  try {
    const { shipmentId, staffId } = req.body;
    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });

    shipment.assignedStaff = staffId;
    shipment.status = "Picked";
    await shipment.save();

    res.json(shipment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get customer
exports.getCustomers = async (req, res) => {
  try {
    const data = await Customer.find({}, "name email");
    res.json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//delete staff
exports.deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json("Staff deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json("Customer deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};


//get Report
exports.getReports = async (req, res) => {
  try {
    const total = await Shipment.countDocuments();
    const delivered = await Shipment.countDocuments({ status: "Delivered" });
    const pending = await Shipment.countDocuments({ status: { $ne: "Delivered" } });

    res.json({ total, delivered, pending });
  } catch (err) {
    res.status(500).json(err.message);
  }
};


// ADD STAFF
exports.addStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json("All fields required");
    }

    // check existing
    const existing = await Staff.findOne({ email });
    if (existing) {
      return res.status(400).json("Staff already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const staff = new Staff({
      name,
      email,
      password: hashedPassword,
      role: "staff"
    });

    await staff.save();

    // res.json(staff);
    res.json({
  _id: staff._id,
  name: staff.name,
  email: staff.email,
  role: staff.role
});

  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};

// DELETE SHIPMENT
exports.deleteShipment = async (req, res) => {
  try {
    await Shipment.findByIdAndDelete(req.params.id);
    res.json("Shipment deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};


// UPDATE SHIPMENT
exports.updateShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      // { returnDocument: "after" }
       { new: true }
    );
    res.json(shipment);
  } catch (err) {
    res.status(500).json(err.message);
  }
};