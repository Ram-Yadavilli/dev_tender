const express = require("express");
const app = express();

app.use("/test", (req, res) => {
  res.send("Server is Working...");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
