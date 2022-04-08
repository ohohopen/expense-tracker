const express = require("express");
const router = express.Router();
router.get("/new", (req, res) => {});
router.post("/new", (req, res) => {});
router.get("/edit", (req, res) => {});
router.post("/:id/edit", (req, res) => {});
router.post("/delete/:id", (req, res) => {});
module.exports = router;
