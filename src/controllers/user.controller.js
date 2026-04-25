const connectionRequest = require("../models/connectionRequested.js");
const UserService = require("../services/user.service.js");

class UserController {
  static async getAllReceivedInterestedRequest(req, res) {
    try {
      const userData = req.user;
      const requests =
        await UserService.getAllReceivedInterestedRequest(userData);
      if (requests.length === 0) {
        return res.status(200).send("No Received Interested Request Found");
      }
      res.status(200).json({
        message: "Received Interested Requests Found",
        data: requests,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error occurred while fetching received interested requests",
        error: err.message,
      });
    }
  }

  static async getAllConnections(req, res) {
    try {
      const requests = await UserService.getAllConnections(req.user);
      const data = requests.map((request) => {
        if (request.senderId._id.equals(req.user._id)) {
          return request.receiverId;
        } else {
          return request.senderId;
        }
      });

      if (requests.length === 0) {
        return res.status(200).send("No Connections Found");
      }
      res.status(200).json({
        message: "Received Interested Requests Found",
        data,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error occurred while fetching received interested requests",
        error: err.message,
      });
    }
  }

  static async feedUsers(req, res) {
    try {
      const userData = req.user;
      const page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      limit = limit > 50 ? 50 : limit; // Set a maximum limit of 50

      const uresList = await UserService.feedUsers(userData, page, limit);

      res.json({ users: uresList });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
