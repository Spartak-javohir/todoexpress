const { generateCrypt } = require("../modules/bcrypt");
const { SignUpValidation } = require("../modules/validations");
const HomeSignUpPostController = require("../controllers/HomeSignUpPostController");

const router = require("express").Router();

router.get("/register", (req, res) => {
	res.render("register");
});
router.post("/signup", async (req, res) => {
	
	const {
		email,
		password,
		name
	} = req.body; 

const users = req.db.users;
	try {
	const user = await SignUpValidation.validateAsync(req.body)

		
	const data = await users.findOne({email: user.email})

	if(data){
		throw new Error("User with this email already exists!")
	}else{
		await users.insertOne({
			...user,
			password: await generateCrypt(user.password)
		})
	res.redirect("/");

		
	}
	} catch (error) {
		console.log(error)
		res.render("register", {error})
	}

	


});

router.post("/register", HomeSignUpPostController);


module.exports = {
    path: "/",
    router
}