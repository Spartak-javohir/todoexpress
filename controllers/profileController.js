module.exports = async function ProfileController(req, res) {
	try {
		console.log(req.body);
		
	} catch (error) {
		res.render("index", {
			error,
		});
	}
};