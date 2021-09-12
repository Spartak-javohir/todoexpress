const HomeLoginPostController = require("../controllers/HomeLoginPostController");
const HomeSignUpPostController = require("../controllers/HomeSignUpPostController");


const router = require("express").Router();

router.get(["/", "/index.html"], (req, res) => {
	res.render("login");
});
router.get("/register.html", (req, res) => {
	res.render("register");
});

router.get("/login.html", (req, res) => {
	res.render("login");
});

router.post("/login.html", HomeLoginPostController);
router.post("/register.html", HomeSignUpPostController);


module.exports = {
	router,
	path: "/",
};
