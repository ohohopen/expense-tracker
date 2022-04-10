const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
module.exports = (app) => {
	//初始化
	app.use(passport.initialize());
	app.use(passport.session());
	//策略
	passport.use(
		new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
			User.findOne({ email })
				.then((user) => {
					if (!user) {
						console.log("無此帳號");
						return done(null, false, { mesage: "無此帳號" });
					}
					if (user.password !== password) {
						console.log("密碼錯誤");
						return done(null, false, { message: "密碼錯誤" });
					}
					console.log("登入成功");
					return done(null, user, { message: "登入成功" });
				})
				.catch((err) => done(err, null));
		})
	);
	//序列化
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		User.findById(id)
			.lean()
			.then((user) => done(null, user))
			.catch((err) => done(err, false));
	});
};
