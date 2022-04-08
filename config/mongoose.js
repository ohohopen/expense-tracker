const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/expense-tracker");
const db = mongoose.connection;
db.on("error", () => console.log("db error"));
db.once("open", () => console.log("db is connecting."));
module.exports = db;
