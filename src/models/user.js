const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    lastName: { type: String, trim: true, minlength: 2, maxlength: 30 },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!validator.isEmail(value) && !emailRegex.test(value)) {
          throw new Error(`${value} is not a valid email`);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(`${value} is not a strongpassword`);
        }
      },
    },
    age: { type: Number, required: true, min: 18 },
    skills: { type: [String], arrayLimit: 5, required: true },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not a valid gender",
      },
      validate(v) {
        if (!["male", "female", "other"].includes(v)) {
          throw new Error(`${v} is not a valid gender`);
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      validate(value) {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new Error(`${value} is not a valid URL`);
        }
      },
    },
    bio: { type: String, trim: true, maxlength: 250, default: "Bio Sample" },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const jwtToken = await jwt.sign({ _id: user._id }, "Dev-Tender@2123", {
    expiresIn: "1d",
  });
  return jwtToken;
};

userSchema.methods.checkPassword = async function (passwordByUser) {
  const user = this;
  const isPasswordCorrect = await bcrypt.compare(passwordByUser, user.password);
  return isPasswordCorrect;
};

const User = mongoose.model("User", userSchema, "User");

module.exports = User;
