const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/users");
const bcrypt = require("bcryptjs");
module.exports = (app) => {
	//初始化
	app.use(passport.initialize());
	app.use(passport.session());
	//策略
	passport.use(
		new LocalStrategy(
			{ usernameField: "email", passReqToCallback: true },
			(req, email, password, done) => {
				User.findOne({ email })
					.then((user) => {
						if (!user) {
							console.log("無此帳號");
							return done(null, false, req.flash("warning_msg", "無此使用者"));
						}
						return bcrypt.compare(password, user.password).then((isMatch) => {
							if (!isMatch) {
								console.log("密碼錯誤");
								return done(null, false, req.flash("warning_msg", "密碼錯誤"));
							}
							return done(null, user);
						});
					})
					.catch((err) => done(err, null));
			}
		)
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
