const User = require("../models/user.js");
const bcrypt = require("bcrypt");
class AuthService {
  static async signup(data, passwordHash) {
    const user = new User({ ...data, password: passwordHash });
    await user.save();
  }

  static async login(emailId, password) {
    const userData = await User.findOne({ emailId });
    if (!userData) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await userData.checkPassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials100");
    }
    const token = await userData.getJWT();
    return { userData, token };
  }

  static async forgetPassword(password, emailId) {
    const data = await User.findOne({ emailId });
    if (!data) {
      throw new Error("User Not Found");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await User.updateOne({ emailId }, { $set: { password: passwordHash } });
    return "Password Updated Successfully";
  }
}

module.exports = AuthService;
