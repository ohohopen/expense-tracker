const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
	id: {
		type: Number,
	},
	name: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model("Category", categorySchema);