const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MongoDb_url, {
    tls: true,
    serverSelectionTimeoutMS: 5000,
    family: 4, // 👈 force IPv4
  });

  console.log("✅ DB Connected");
};

module.exports = connectDB;
