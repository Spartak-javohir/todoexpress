const HomeLoginPostController = require("../controllers/HomeLoginPostController");
const HomeSignUpPostController = require("../controllers/HomeSignUpPostController");


const router = require("express").Router();

router.get(["/", "/index.html"], (req, res) => {
	res.render("login");
});
router.get("/register", (req, res) => {
	res.render("register");
});



router.post("/", HomeLoginPostController);
router.post("/register", HomeSignUpPostController);


module.exports = {
	router,
	path: "/",
};
