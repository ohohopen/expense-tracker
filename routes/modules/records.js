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
	const userId = req.user._id;
	Category.findOne({ id: category }).then((categories) => {
		// console.log("categories=", categories);
		Record.create({
			name,
			date: newDate,
			amount,
			category,
			userId,
			categoryId: categories._id,
		})
			.then(() => res.redirect("/"))
			.catch((err) => console.log(err));
	});
});
// 查-以類別篩選資料
router.post("/filter", (req, res) => {
	//首頁下拉類別傳入的select option value
	const optionValue = req.body.select;
	// 找出符合傳入類別的所有資料, 再以和讀取全部資料的相同作法再作一次
	const userId = req.user._id;
	Record.find({ userId, category: optionValue })
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
// 改
router.get("/:id/edit", (req, res) => {
	const id = req.params.id;
	Record.findById(id)
		.lean()
		.then((records) => {
			// 系統日期預設是yyyy-mm-dd, 所以先把/改為-
			const newDate = records.date.replace(/\//g, "-");
			res.render("edit", { records, newDate });
		});
});
router.put("/:id", (req, res) => {
	const id = req.params.id;
	const userId = req.user._id;
	const { name, date, amount, category } = req.body;
	// 先找出Category裡屬於表單傳入category編號的資料(只是需要它的ObjectId)(這裡的id是Category另外設的, 非系統生成的_id)
	// 找出該筆Record, 將Category的ObjectId寫入Record的categoryId欄位
	Category.findOne({ id: category, userId }).then((categories) => {
		Record.findById(id)
			.then((records) => {
				records.name = name;
				records.date = date;
				records.amount = amount;
				records.category = category;
				records.categoryId = categories._id;
				records.save();
			})
			.then(() => res.redirect("/"));
	});
});
// 刪
router.delete("/:id", (req, res) => {
	const _id = req.params.id;
	const userId = req.user._id;
	// console.log("_id=", _id);
	// console.log("userId=", userId);
	// Record.findOne({ _id, userId }).then((records) => console.log(records));
	Record.findOne({ _id, userId })
		.then((records) => records.remove())
		.then(() => res.redirect("/"));
});
module.exports = router;
