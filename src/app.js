const express = require("express");
const app = express();
const User = require("./models/user");
const Admin = require("./models/admin");
const { signupValidation } = require("./utils/signupValidation.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth.js");
const profileRouter = require("./routers/profile.js");
const connectionRequestRouter = require("./routers/connectionRequest.js");
const userRouter = require("./routers/user.js");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cookieParser());

app.use(express.json());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);
app.use("/", userRouter);

const { userAuth } = require("./middlewares/auth.js");
const connectDB = require("./configure/database.js");
connectDB()
  .then(async () => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });

    console.log("DB Connected Successfully");
  })
  .catch((err) => {
    console.error("DB Connection Error", err);
  });

app.patch("/signup/updateUser", async (req, res) => {
  const data = req.body;
  try {
    if (data?.skills.length > 11) {
      throw new Error("Skills should not more than 10");
    }
    const allowedList = ["firstName", "lastName", "skills", "photoUrl"];
    Object.keys(data).forEach((key) => {
      if (!allowedList.includes(key)) {
        throw new Error(`:${key} is not allowed to update`);
      }
    });
    await User.updateMany(
      { emailId: data.emailId },
      { $set: data },
      //{ runValidators: true },
    );
    res.send("User updated successfully");
    console.log("User updated successfully");
  } catch (err) {
    res.status(500).send("Issue Occured contact Admin Team" + err.message);
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Internal 2104 Server Error");
  }
});
