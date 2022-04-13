//const CATEGORY = [{}, {}, {}, {}, {}];
const SEED_CATEGORY = [
	{
		id: 1,
		name: "家居物業",
		icon: "<i class='fas fa-home'></i>",
	},
	{
		id: 2,
		name: "交通出行",
		icon: "<i class='fas fa-shuttle-van'></i>",
	},
	{
		id: 3,
		name: "休閒娛樂",
		icon: "<i class='fas fa-grin-beam'></i>",
	},
	{
		id: 4,
		name: "餐飲食品",
		icon: "<i class='fas fa-utensils'></i>",
	},
	{
		id: 5,
		name: "其他",
		icon: "<i class='fas fa-pen'></i>",
	},
];
const SEED_RECORD = [
	{
		name: "修屋頂",
		date: "2022/01/20",
		amount: 8430,
		category: 1,
		categoryId: "",
	},
	{
		name: "搭捷運",
		date: "2022/02/20",
		amount: 120,
		category: 2,
		categoryId: "",
	},
	{
		name: "餅乾",
		date: "2022/02/16",
		amount: 520,
		category: 4,
		categoryId: "",
	},
	{
		name: "睡覺",
		date: "2022/07/23",
		amount: 0,
		category: 5,
		categoryId: "",
	},
	{
		name: "拜拜",
		date: "2022/11/05",
		amount: 450,
		category: 5,
		categoryId: "",
	},
	{
		name: "唱歌",
		date: "2022/03/20",
		amount: 620,
		category: 3,
		categoryId: "",
	},
	{
		name: "修車",
		date: "2022/02/08",
		amount: 24000,
		category: 1,
		categoryId: "",
	},
	{
		name: "吃飯",
		date: "2022/04/20",
		amount: 400,
		category: 4,
		categoryId: "",
	},
	{
		name: "上課註冊",
		date: "2022/05/20",
		amount: 5800,
		category: 5,
		categoryId: "",
	},
	{
		name: "發呆",
		date: "2022/04/12",
		amount: 10,
		category: 5,
		categoryId: "",
	},
	{
		name: "買書",
		date: "2022/02/11",
		amount: 726,
		category: 5,
		categoryId: "",
	},
	{
		name: "跳舞",
		date: "2022/02/24",
		amount: 1200,
		category: 3,
		categoryId: "",
	},
];
const SEED_USER = {
	name: "老爸",
	email: "user1@example.com",
	password: "12345678",
};
module.exports = { SEED_CATEGORY, SEED_RECORD, SEED_USER };
