const authRouter = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const User = require("../models/user.js");
//const bcrypt = require("bcrypt");
const { signupValidation } = require("../utils/signupValidation.js");
const { userAuth } = require("../middlewares/auth.js");

authRouter.post("/signup", AuthController.signup);

authRouter.post("/login", AuthController.login);

authRouter.get("/logout", AuthController.logout);

authRouter.post("/forgetPassword", AuthController.forgetPassword);

module.exports = authRouter;
