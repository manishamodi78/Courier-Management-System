require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Staff = require("./models/Staff");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

async function createStaff() {
  try {
    const name = process.env.STAFF_NAME || "Test Staff";
    const email = process.env.STAFF_EMAIL || "staff@gmail.com";
    const password = process.env.STAFF_PASSWORD || "123456";

    const hashedPassword = await bcrypt.hash(password, 10);

    let staff = await Staff.findOne({ email });

    if (staff) {
      staff.password = hashedPassword;
      await staff.save();
      console.log("Staff password updated");
    } else {
      staff = new Staff({
        name,
        email,
        password: hashedPassword,
      });

      await staff.save();
      console.log("Staff created");
    }

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

createStaff();