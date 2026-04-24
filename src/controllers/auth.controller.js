const User = require("../models/user.js");
const AuthService = require("../services/auth.service.js");
class AuthController {
  static async signup(req, res) {
    const data = req.body;
    try {
      signupValidation(data);
      const passwordHash = await bcrypt.hash(data.password, 10);
      /*if (data?.skills.length > 11) {
            throw new Error("Skills should not more than 10");
            }*/
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(data.emailId)) {
        throw new Error(`:${data.emailId} is not a valid email`);
      }
      await AuthService.signup(data, passwordHash);
      res.send("User saved successfully");
      console.log("User saved successfully");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  static async login(req, res) {
    const { emailId, password } = req.body;
    try {
      const { userData, token } = await AuthService.login(emailId, password);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 3600000 * 24),
        httpOnly: true,
      });
      res.send("Login Successful");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie("token");
      res.send("Logout Successful");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async forgetPassword(req, res) {
    const { password, emailId } = req.body;
    try {
      const result = await AuthService.forgetPassword(password, emailId);
      res.send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

module.exports = AuthController;
