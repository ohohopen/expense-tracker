const db = require("../../config/mongoose");
const Category = require("../category");
const { SEED_CATEGORY } = require("../../public/data/seederData.js");
// 將SEED_CATEGORY的每筆資料取出再寫入資料庫
db.once("open", async () => {
	await Promise.all(
		// CATEGORY.map(item => {
		//   console.log(item);
		//   return Category.create(item);
		// })
		Array.from(SEED_CATEGORY, async (categorObj, i) => {
			await Category.create(categorObj);
		})
	);
	console.log("category seeding is complete.");
	process.exit();
});
