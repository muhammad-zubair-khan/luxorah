const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://zk044099:2IRLdAHqYeB19WES@cluster0.eatlqim.mongodb.net/danyal_db");
    console.log("Database Connected Successfully!",conn.connection.host, conn.connection.port);
  } catch (error) {
    console.error("Database connection failed!", error);
  }
};

module.exports = dbConnect;