const connectionRequestRouter = require("express").Router();
const { userAuth } = require("../middlewares/auth.js");
const User = require("../models/user");
const connectionRequest = require("../models/connectionRequested");
const ConnectionRequestController = require("../controllers/connectionRequest.controller");

connectionRequestRouter.post(
  "/connectionRequest/sendRequest/:status/:toUserId",
  userAuth,
  ConnectionRequestController.sendRequest,
);

connectionRequestRouter.get(
  "/connectionRequest/recieved/:status/:requestId",
  userAuth,
  ConnectionRequestController.recievedRequest,
);

module.exports = connectionRequestRouter;
