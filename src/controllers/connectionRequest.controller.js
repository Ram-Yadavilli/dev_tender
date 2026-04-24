const User = require("../models/user.js");
const connectionRequest = require("../models/connectionRequested.js");
const ConnectionRequestService = require("../services/connectionRequest.service.js");
class ConnectionRequestController {
  static async sendRequest(req, res) {
    try {
      const ParamsData = req.params;
      const userData = req.user;
      const receiverData = await ConnectionRequestService.sendRequest(
        userData,
        ParamsData,
      );

      res
        .status(201)
        .send(
          `${userData.firstName} ${ParamsData.status} ${receiverData.firstName}`,
        );
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async recievedRequest(req, res) {
    try {
      const ParamsData = req.params;
      const userData = req.user;
      const request = await ConnectionRequestService.recievedRequest(
        userData,
        ParamsData,
      );
      const statusAllowedList = ["accepted", "rejected"];
      if (!statusAllowedList.includes(ParamsData.status)) {
        throw new Error("Status should be either accepted or rejected");
      }

      if (!request) {
        return res.status(404).send("Connection request not found");
      }

      request.status = req.params.status;
      await request.save();
      res.status(200).send(`Connection request ${req.params.status} `);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = ConnectionRequestController;
