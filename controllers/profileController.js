module.exports = async function ProfileController(req, res) {
	try {

		console.log(res.cookie());
	} catch (error) {
		res.render("index", {
			error,
		});
	}
};