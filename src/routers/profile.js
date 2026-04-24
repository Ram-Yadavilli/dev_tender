const profileRouter = require("express").Router();
const { userAuth } = require("../middlewares/auth.js");
const User = require("../models/user");
const ProfileController = require("../controllers/profile.controller");

const { signupValidation } = require("../utils/signupValidation.js");

profileRouter.get("/profile/getUser", userAuth, ProfileController.getUser);

profileRouter.patch(
  "/profile/updateUser",
  userAuth,
  ProfileController.updateUser,
);

module.exports = profileRouter;
