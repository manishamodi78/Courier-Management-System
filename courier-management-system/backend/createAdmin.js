require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

async function createAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL || "admin@gmail.com";
    const password = process.env.ADMIN_PASSWORD || "123456";

    const hash = await bcrypt.hash(password, 10);

    const existing = await Admin.findOne({ email });

    if (existing) {
      existing.password = hash;
      await existing.save();
      console.log("Admin password updated");
    } else {
      const admin = new Admin({
        email,
        password: hash,
        role: "admin",
      });

      await admin.save();
      console.log("Admin created");
    }

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

createAdmin();