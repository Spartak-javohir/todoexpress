const HomeLoginPostController = require("../controllers/HomeLoginPostController");

const router = require("express").Router();

router.get(["/", "/index.html"], (req, res) => {
	res.render("login");
});

router.post("/", async (req, res) => {
	const {
		email,
		password
	} = req.body;
	const users = await req.db.users

	

	if (!(email && password)) {
		res.render("/", {
			error: "Email or Password not found",
		});
		return;
	}

	let user = await users.findOne({
		email: email.toLowerCase(),
	});

	if (!user) {
		res.render("/", {
			error: "User not found",
		});
		return;
	}

	if (!(await compareCrypt(users.password, password))) {
		res.render("/", {
			error: "Password is incorrect",
		});
		return;
	}

	const token = createToken({
		user_id: users._id,
	});

	res.cookie("token", token).redirect("/profile");
});
router.post("/", HomeLoginPostController);


module.exports = {
    path: "/",
    router
}