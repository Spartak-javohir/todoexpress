const router = require("express").Router();

router.get(["/", "/index.html"], (req, res) => {
	res.render("index");
});