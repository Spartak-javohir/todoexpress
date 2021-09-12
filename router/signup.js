const router = require("express").Router();

router.post("/signup", async (req, res) => {
	const {
		email,
		password
	} = req.body;
	const users = await req.db.users 
	if (!(email && password)) {
		res.render("index", {
			error: "Email or Password not found",
		});
		return;
	}

	let user = await users.findOne({
		email: email.toLowerCase(),
	});

	if (user) {
		res.render("index", {
			error: "Email already exists",
		});
		return;
	}

	user = await users.insertOne({
		email: email.toLowerCase(),
		password: await createCrypt(password),
	});

	res.redirect("/");
});

module.exports = {
    path: "/singup",
    router
}