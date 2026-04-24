const dbConnect = () => {
  const { MongoClient } = require("mongodb");
  const url =
    "mongodb+srv://ramyadavilli21_db_user:zPnZB0QgOYDru8Ot@cluster0.a1pano4.mongodb.net/TinderDev?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  let db;
  const connectDB = async () => {
    try {
      await client.connect();
      db = client.db("TinderDev");
      console.log("DB Connected Successfully");
      return db; // ✅ IMPORTANT
    } catch (err) {
      console.error("DB Connection Error:", err);
      process.exit(1);
    }
  };

  return connectDB();
};

module.exports = { dbConnect };
