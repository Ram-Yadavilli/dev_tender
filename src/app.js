const express = require("express");
const app = express();

app.get("/user/:id/:name", (req, res) => {
  res.send(req.params);
});

app.post("/user", (req, res) => {
  res.send(req.query);
});

app.delete("/user", (req, res) => {
  res.send("Successfully deleted from DB");
});
app.use("/test", (req, res) => {
  res.send("Server is Working on 3000...");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
