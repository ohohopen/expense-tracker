const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const passport = require("passport");
// 註冊
router.get("/register", (req, res) => {
	res.render("register");
});
router.post("/register", (req, res) => {
	const { name, email, password, confirmPassword } = req.body;
	User.findOne({ email })
		.then((user) => {
			if (!user) {
				User.create({ name, email, password });
			} else {
				res.render("register", { name, email, password, confirmPassword });
			}
		})
		.then(() => res.render("login"));
});
// 登入
router.get("/login", (req, res) => {
	res.render("login");
});
router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/users/login",
	})
);
// 登出
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/users/login");
});
module.exports = router;
