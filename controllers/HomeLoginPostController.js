const { compareHash } = require("../modules/bcrypt");
const { LoginValidation } = require("../modules/validations");
const { createToken, validateToken } = require("../modules/jwt");

module.exports = async function HomeLoginPostController(req, res) {
	try {
		const data = await LoginValidation.validateAsync(req.body);

		const user = await req.db.users.findOne({
			email: data.email,
		});

		if (!user) throw new Error("User not found");

		const isTrust = await compareHash(data.password,user.password );

		if (!isTrust) throw new Error("Password is incorrect");

		const token = await createToken({
			user_id: user._id,
		});
		

		res.cookie("token", token).redirect("/");
		const c = await validateToken(token)
		console.log(c);

		
	} catch (error) {
		console.log(error);
		res.render("login", {
			error,
		});
	}
};
