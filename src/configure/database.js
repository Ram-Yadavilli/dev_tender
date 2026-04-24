const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://ramyadavilli21_db_user:zPnZB0QgOYDru8Ot@ac-oq44nnk-shard-00-00.a1pano4.mongodb.net:27017,ac-oq44nnk-shard-00-01.a1pano4.mongodb.net:27017,ac-oq44nnk-shard-00-02.a1pano4.mongodb.net:27017/TinderDev?replicaSet=atlas-i62qrr-shard-0&authSource=admin",
    {
      tls: true,
      serverSelectionTimeoutMS: 5000,
      family: 4, // 👈 force IPv4
    },
  );

  console.log("✅ DB Connected");
};

module.exports = connectDB;
