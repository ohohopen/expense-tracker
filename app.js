const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/mongoose");
const port = process.env.PORT;
const exphbs = require("express-handlebars");
const router = require("./routes");
app.use(express.static("public"));
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");
app.use(router);

app.listen(port, () => console.log("listening"));
