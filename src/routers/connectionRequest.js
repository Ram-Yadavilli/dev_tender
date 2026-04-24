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
  async (req, res) => {
    try {
      const statusAllowedList = ["accepted", "rejected"];
      if (!statusAllowedList.includes(req.params.status)) {
        throw new Error("Status should be either accepted or rejected");
      }
      const request = await connectionRequest.findOne({
        senderId: req.params.requestId,
        receiverId: req.user._id,
        status: "liked",
      });

      if (!request) {
        return res.status(404).send("Connection request not found");
      }

      request.status = req.params.status;
      await request.save();
      res.status(200).send(`Connection request ${req.params.status} `);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
);

module.exports = connectionRequestRouter;
