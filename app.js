const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/mongoose");
const port = process.env.PORT;
const exphbs = require("express-handlebars");
const router = require("./routes");
const methodOveride = require("method-override");
const session = require("express-session");
const usePassport = require("./config/passport");
const req = require("express/lib/request");
app.use(methodOveride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");
app.use(
	session({
		secret: "3-A3",
		resave: false,
		saveUninitialized: true,
	})
);
usePassport(app);
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated();
	res.locals.user = req.user;
	next();
});
app.use(router);

app.listen(port, () => console.log("listening"));
