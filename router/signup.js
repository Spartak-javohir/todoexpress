const router = require("express").Router();
router.get("/register", (req, res) => {
	res.render("register");
});
router.post("/signup", async (req, res) => {
	console.log();
	const {
		email,
		password,
		name
	} = req.body; 

const users = req.db.users

	if (!(email && password&& name)) {
		res.render("register", {
			error: "Email or Password not found",
		});
		return;
	}

	let user = await users.findOne({
		email: email.toLowerCase(),
	});

	if (user) {
		res.render("register", {
			error: "Email already exists",
		});
		return;
	}

	user = await users.insertOne({
		email: email.toLowerCase(),
		password: await createCrypt(password),
		name: name
	});

	res.redirect("/");
});

module.exports = {
    path: "/",
    router
}