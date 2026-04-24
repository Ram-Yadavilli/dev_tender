const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userName: String,
  password: String,
  emailId: String,
});

const admin = mongoose.model("admin", adminSchema, "Admin");

module.exports = admin;
