const User = require("../models/user.js");
class ProfileService {
  static async updateUser(userData, data) {
    await User.updateOne(
      { emailId: userData.emailId },
      { $set: data },
      { runValidators: true },
    );
  }
}

module.exports = ProfileService;
