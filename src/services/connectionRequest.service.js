const connectionRequest = require("../models/connectionRequested.js");
const User = require("../models/user.js");

class ConnectionRequestService {
  static async sendRequest(userData, ParamsData) {
    const receiverData = await User.findOne({ _id: ParamsData.toUserId });
    if (!receiverData) {
      throw new Error("Receiver User Not Found");
    }

    const existingRequest = await connectionRequest.findOne({
      $or: [
        { senderId: userData._id, receiverId: receiverData._id },
        { senderId: receiverData._id, receiverId: userData._id },
      ],
    });
    if (existingRequest) {
      throw new Error("Connection request already sent");
    }

    const statusAllowedList = ["liked", "disliked"];
    if (!statusAllowedList.includes(ParamsData.status)) {
      throw new Error("Status should be either liked or disliked");
    }

    const requestData = new connectionRequest({
      senderId: userData._id,
      receiverId: receiverData._id,
      status: ParamsData.status,
    });
    await requestData.save();

    return receiverData;
  }

  static async recievedRequest(userData, ParamsData) {
    const request = await connectionRequest.findOne({
      senderId: ParamsData.requestId,
      receiverId: userData._id,
      status: "liked",
    });

    return request;
  }
}

module.exports = ConnectionRequestService;
