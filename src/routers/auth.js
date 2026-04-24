const authRouter = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { signupValidation } = require("../utils/signupValidation.js");
const { userAuth } = require("../middlewares/auth.js");

authRouter.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    signupValidation(data);
    const passwordHash = await bcrypt.hash(data.password, 10);
    /*if (data?.skills.length > 11) {
      throw new Error("Skills should not more than 10");
    }*/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(data.emailId)) {
      throw new Error(`:${data.emailId} is not a valid email`);
    }
    const user = new User({ ...data, password: passwordHash });
    await user.save();
    res.send("User saved successfully");
    console.log("User saved successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

authRouter.post("/login", AuthController.login);

authRouter.post("/logout", AuthController.logout);

authRouter.post("/forgetPassword", AuthController.forgetPassword);

module.exports = authRouter;
