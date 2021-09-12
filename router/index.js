const HomeLoginPostController = require("../controllers/HomeLoginPostController");
const HomeSignUpPostController = require("../controllers/HomeSignUpPostController");


const router = require("express").Router();

router.get(["/", "/index.html"], (req, res) => {
	res.render("index");
});

module.exports = {
	router,
	path: "/",
};
