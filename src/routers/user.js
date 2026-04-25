const userRouter = require("express").Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth.js");
const connectionRequest = require("../models/connectionRequested");
const UserController = require("../controllers/user.controller");

userRouter.get(
  "/user/getAllReceivedInterestedRequest",
  userAuth,
  UserController.getAllReceivedInterestedRequest,
);

userRouter.get(
  "/user/getAllConnections",
  userAuth,
  UserController.getAllConnections,
);

userRouter.get("/user/feedUsers", userAuth, UserController.feedUsers);

module.exports = userRouter;
