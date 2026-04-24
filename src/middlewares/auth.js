const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Invalid JWT Token, Please login again...");
    }
    const decodeObj = await jwt.verify(token, "Dev-Tender@2123");
    if (!decodeObj) {
      throw new Error("Invalid JWT Token, Please login again...");
    }

    console.log("decodeObj", decodeObj);

    const userData = await User.findOne({ _id: decodeObj._id });

    if (!userData) {
      throw new Error("User not found");
    }

    req.user = userData;

    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = { userAuth };
