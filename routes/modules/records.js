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
// 查-以類別篩選資料
router.post("/filter", (req, res) => {
	//首頁下拉類別傳入的select option value
	const optionValue = req.body.select;
	// 找出符合傳入類別的所有資料, 再以和讀取全部資料的相同作法再作一次
	Record.find({ category: optionValue })
		.lean()
		.then((records) => {
			let totalAmount = 0;
			let iconObj = {};
			for (let i = 0; i < records.length; i++) {
				totalAmount += records[i].amount;
			}
			records.forEach((item, i) => {
				if (item.category == 1) {
					iconObj.icon = CATEGORY.家居物業;
				} else if (item.category == 2) {
					iconObj.icon = CATEGORY.交通出行;
				} else if (item.category == 3) {
					iconObj.icon = CATEGORY.休閒娛樂;
				} else if (item.category == 4) {
					iconObj.icon = CATEGORY.餐飲食品;
				} else {
					iconObj.icon = CATEGORY.其他;
				}
				Object.assign(item, iconObj);
			});
			res.render("index", { records, totalAmount });
		});
});

module.exports = router;
