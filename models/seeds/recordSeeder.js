const db = require("../../config/mongoose");
const Category = require("../category");
const Record = require("../records");
const User = require("../users");
let userId = "";
const { SEED_RECORD, SEED_USER } = require("../../public/data/seederData.js");

db.once("open", () => {
	User.create(SEED_USER)
		.then((user) => {
			userId = user._id;
			// console.log(userId);
			console.log("user seeding is complete.");

			return Promise.all(
				Array.from(SEED_RECORD, (item, i) => {
					// 如果Category的id和SEED_CATEGORY的id匹配
					// 就把該筆Category的ObjectId存入變數categoryId
					// 作為Record create時的categoryId
					const { name, date, amount, category } = item;
					let categoryId = "";
					return Category.find()
						.then((categories) => {
							return categories.find((categories, j) => {
								// console.log(`第${j + 1}個的ObjectId是${cc2._id}`);
								// console.log(`第${i}個的category是${category}`);
								if (j + 1 == category) {
									return (categoryId = categories._id);
								}
							});
						})
						.then((categories) => {
							// console.log(categories._id);
							return Record.create({
								name,
								date,
								amount,
								category,
								userId,
								categoryId: categories._id,
							});
						});
				})
			);
		})
		.then(() => {
			console.log("record seeding is complete.");
			process.exit();
		});
});
