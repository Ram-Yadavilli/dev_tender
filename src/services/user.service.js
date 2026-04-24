const connectionRequest = require("../models/connectionRequested.js");
class UserService {
  static async getAllReceivedInterestedRequest(userData) {
    const requests = await connectionRequest
      .find({
        receiverId: userData._id,
        status: "liked",
      })
      .populate("senderId", "firstName lastName age bio skills photoUrl");
    return requests;
  }

  static async getAllConnections(userData) {
    const requests = await connectionRequest
      .find({
        $or: [
          { receiverId: userData._id, status: "accepted" },
          { senderId: userData._id, status: "accepted" },
        ],
      })
      .populate("senderId", "firstName lastName age bio skills photoUrl")
      .populate("receiverId", "firstName lastName age bio skills photoUrl");

    return requests;
  }
}

module.exports = UserService;
