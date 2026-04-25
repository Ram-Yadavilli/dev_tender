const connectionRequest = require("../models/connectionRequested.js");
const User = require("../models/user.js");
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

  static async feedUsers(userData, page, limit) {
    const skip = (page - 1) * limit;
    const HideUserId = new Set();
    const connectionRequests = await connectionRequest.find({
      $or: [{ senderId: userData._id }, { receiverId: userData._id }],
    });

    connectionRequests.forEach((request) => {
      HideUserId.add(request.senderId.toString());
      HideUserId.add(request.receiverId.toString());
    });

    const uresList = await User.find({
      _id: { $nin: [...HideUserId, userData._id] },
    })
      .select("firstName lastName age photoUrl bio gender skills")
      .skip(skip)
      .limit(limit);

    return uresList;
  }
}

module.exports = UserService;
