const HomeLoginPostController = require("../controllers/HomeLoginPostController");
const HomeSignUpPostController = require("../controllers/HomeSignUpPostController");


const router = require("express").Router();






router.post("/", HomeLoginPostController);
router.post("/register", HomeSignUpPostController);


module.exports = {
	router,
	path: "/",
};
