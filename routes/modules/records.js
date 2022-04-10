const express = require("express");
const router = express.Router();
const Record = require("../../models/records");
const Category = require("../../models/category");
const { CATEGORY } = require("../../public/data/seederData.js");
// 增
router.get("/new", (req, res) => {
	res.render("new");
});
router.post("/new", (req, res) => {
	const { name, date, amount, category } = req.body;
	// 把表單的date資料的-替換成/, 以符合作業需求
	const newDate = date.replace(/-/g, "/");
	// 在Category資料裡找出符合表單傳入的category value的該筆
	// 將該筆的categories._id存入Record的categoryId
	Category.findOne({ id: category }).then((categories) => {
		// console.log("categories=", categories);
		Record.create({
			name,
			date: newDate,
			amount,
			category,
			categoryId: categories._id,
		}).then(() => res.redirect("/"));
	});
});

module.exports = router;
