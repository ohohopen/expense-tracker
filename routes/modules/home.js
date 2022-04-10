const express = require("express");
const router = express.Router();
const Record = require("../../models/records");
const { CATEGORY } = require("../../public/data/seederData.js");
router.get("/", (req, res) => {
	// console.log("cc", req.user._id);
	const userId = req.user._id;
	Record.find({ userId })
		.lean()
		.sort({ _id: "desc" })
		.then((records) => {
			// console.log(records);
			let totalAmount = 0;
			let iconObj = {};
			// 把Record資料庫每一筆的amount加總
			for (let i = 0; i < records.length; i++) {
				totalAmount += records[i].amount;
			}
			// 建立iconObj空物件, 判斷records每個category編號
			// 把CATEGORY的每筆存入空物件成為新的icon value-pair
			records.forEach((item, i) => {
				// console.log(iconObj);
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
				// iconObj合併到records資料裡
				Object.assign(item, iconObj);
				// console.log(`第${i}個item=`, item);
			});

			// console.log("records=", records);
			// const totalAmount = records.amount;
			res.render("index", { records, totalAmount });
		});
});
module.exports = router;
