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
	const errors = [];

	if (!name || !email || !password || !confirmPassword) {
		errors.push({ message: "欄位不得為空" });
	}
	if (password !== confirmPassword) {
		errors.push({ message: "兩組密碼需相同" });
	}
	// console.log(errors);
	if (errors.length) {
		return res.render("register", {
			errors,
			name,
			email,
			password,
			confirmPassword,
		});
	}
	User.findOne({ email })
		.lean()
		.then((user) => {
			if (user) {
				errors.push({ message: "已有此使用者" });
				return res.render("register", {
					errors,
					name,
					email,
					password,
					confirmPassword,
				});
			}
			return User.create({ name, email, password })
				.then(() => {
					console.log("註冊成功");
					const login_ok_msg = {
						message: "成功註冊，請先登入才可使用",
					};

					return res.render("login", { login_ok_msg });
				})
				.catch((err) => console.log(err));
		})
		.catch((error) => console.log(error));
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
		failureMessage: true,
	})
);
// 登出
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success_msg", "你已經成功登出");
	res.redirect("/users/login");
});
module.exports = router;
