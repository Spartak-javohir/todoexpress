const HomeLoginPostController = require("../controllers/HomeLoginPostController");
const {compareHash} = require("../modules/bcrypt")
const router = require("express").Router();
const { LoginValidation } = require("../modules/validations");

router.get(["/", "/login.html"], (req, res) => {
	res.render("login");
});


router.post("/", HomeLoginPostController);


module.exports = {
    path: "/",
    router
}