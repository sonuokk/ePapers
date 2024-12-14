const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  // cpassword: { type: "string", required: true },
  phoneNo: { type: "number", required: true },
});

module.exports = mongoose.model("userModel", user);
