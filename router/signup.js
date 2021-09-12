const { generateCrypt } = require("../modules/bcrypt");
const { SignUpValidation } = require("../modules/validations");

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
console.log(users)
	try {
	const user = await SignUpValidation.validateAsync(req.body)
	console.log(req.body)
		
	const data = await users.findOne({email: user.email})

	if(data){
		throw new Error("User with this email already exists!")
	}else{
		await users.insertOne({
			...user,
			password: await generateCrypt(user.password)
		})

		
	}
	} catch (error) {
		console.log(error)
		res.render("login", {error})
	}

	
	// if (!(email && password&& name)) {
	// 	res.render("register", {
	// 		error: "Email or Password not found",
	// 	});
	// 	return;
	// }

	// let user = await users.findOne({
	// 	email: email.toLowerCase(),
	// });

	// if (user) {
	// 	res.render("register", {
	// 		error: "Email already exists",
	// 	});
	// 	return;
	// }

	// user = await users.insertOne({
	// 	email: email.toLowerCase(),
	// 	password: await createCrypt(password),
	// 	name: name
	// });

	// res.redirect("/");
});

module.exports = {
    path: "/",
    router
}