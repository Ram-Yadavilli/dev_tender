const ProfileService = require("../services/profile.service.js");
class ProfileController {
  static async getUser(req, res) {
    try {
      const userData = req.user;

      res.send(userData);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  static async updateUser(req, res) {
    const data = req.body;
    const userData = req.user;
    try {
      //signupValidation(req.body);
      const allowedList = [
        "firstName",
        "lastName",
        "skills",
        "photoUrl",
        "gender",
        "age",
        "bio",
      ];
      Object.keys(data).forEach((key) => {
        if (!allowedList.includes(key)) {
          throw new Error(`:${key} is not allowed to update`);
        }
      });

      await ProfileService.updateUser(userData, data);

      res.send(`User updated successfully21:${data.firstName}`);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
}

module.exports = ProfileController;
