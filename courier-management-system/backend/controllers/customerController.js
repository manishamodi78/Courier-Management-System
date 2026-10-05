const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("All fields required");
    }

    const exists = await Customer.findOne({ email });
    if (exists) {
      return res.status(400).json("Email already registered");
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new Customer({
      name,
      email,
      password: hash,
    });

    await user.save();

    res.json({
      message: "Registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json("Server error");
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Customer.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json("Wrong password");
    }

    const token = jwt.sign(
      { id: user._id, role: "customer" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: "customer",
      },
    });
  } catch (err) {
    res.status(500).json("Server error");
  }
};