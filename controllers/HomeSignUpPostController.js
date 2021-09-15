const { generateCrypt } = require("../modules/bcrypt");
const { SignUpValidation } = require("../modules/validations");


module.exports = async function HomeSignUpPostController(req, res) {
	try {
		const data = await SignUpValidation.validateAsync(req.body);
		let user = await req.db.users.findOne({
			email: data.email.toLowerCase(),
		});
		
		if (user) throw new Error("Email already exists");

		user = await req.db.users.insertOne({
			...data,
			password: await generateCrypt(data.password),
		});
		req.db.usersinfo.insertOne({
			email: req.body.email,
			todotexts: [],
		})

		res.redirect("/");
	} catch (error) {
		res.render("register", {
			error,
		});
	}
};
