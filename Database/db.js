const { MongoClient } = require("mongodb");
//const url ="mongodb+srv://ramyadavilli21_db_user:zPnZB0QgOYDru8Ot@cluster0.a1pano4.mongodb.net/TinderDev";
const url =
  "mongodb://ramyadavilli21_db_user:zPnZB0QgOYDru8Ot@ac-oq44nnk-shard-00-00.a1pano4.mongodb.net:27017,ac-oq44nnk-shard-00-01.a1pano4.mongodb.net:27017,ac-oq44nnk-shard-00-02.a1pano4.mongodb.net:27017/TinderDev?ssl=true&replicaSet=atlas-i62qrr-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(url, {
  tls: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true,
});
const dbName = "TinderDev";

async function dbConnect() {
  try {
    await client.connect();
    console.log("DB Connected Successfully");
    const db = client.db(dbName);
    const collection = db.collection("users");
    return "done.";
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
}

dbConnect()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
