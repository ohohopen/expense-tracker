const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/mongoose");
const port = process.env.PORT;
const exphbs = require("express-handlebars");
app.use(express.static("public"));
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");
app.get("/", (req, res) => {
  console.log("ok");
  res.render("index");
});
app.listen(port, () => console.log("listening"));
