const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/rv9";

const connection = mongoose.connect(MONGODB_URL);

module.exports = {
  connection,
};
