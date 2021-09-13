const HomeLoginPostController = require("../controllers/HomeLoginPostController");
const {compareHash} = require("../modules/bcrypt")
const router = require("express").Router();
const { LoginValidation } = require("../modules/validations");

router.get(["/", "/login.html"], (req, res) => {
	res.render("login");
});

// router.post("/", async (req, res) => {
// 	const users = await req.db.users
// 	try {

// 		const user = await LoginValidation.validateAsync(req.body)
// 		const email = await users.findOne({email: user.email})
// 		// const password = await users.findOne({})
// 		if (!email) {
// 			throw new Error("Email error corrected!")
// 		}else if (!(await compareHash(user.password, users.password))) {
// 			throw new Error("Password is incorrect!")
// 		}else{
// 			const token = createToken({
// 				user_id: users._id,
// 			});
		
// 			res.cookie("token", token).redirect("/profile");
// 			res.redirect("/index");

// 		}
		
// 	} catch (error) {
// 		console.log(error)
// 		res.render("login", {error})
// 	}
	

	
	
// });
router.post("/", HomeLoginPostController);


module.exports = {
    path: "/",
    router
}