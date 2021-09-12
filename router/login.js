const router = require("express").Router();

router.post("/", async (req, res) => {
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

	if (!user) {
		res.render("index", {
			error: "User not found",
		});
		return;
	}

	if (!(await compareCrypt(user.password, password))) {
		res.render("index", {
			error: "Password is incorrect",
		});
		return;
	}

	const token = createToken({
		user_id: user._id,
	});

	res.cookie("token", token).redirect("/index");
});

module.exports = {
    path: "/login",
    router
}