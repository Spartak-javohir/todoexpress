module.exports = async function ProfileController(req, res) {
	try {

		let user = await req.db.users.findOne({
			email: data.email.toLowerCase(),
		});
        let data = await req.body

		user = await req.db.usersinfo.insertOne({
			...data,

		});

		res.redirect("/login.html");
	} catch (error) {
		res.render("register", {
			error,
		});
	}
};