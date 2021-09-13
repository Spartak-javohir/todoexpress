module.exports = async function ProfileController(req, res) {
	try {
	const {user_id} =req.user
		console.log(
			user_id
		);
		
	} catch (error) {
		res.render("index", {
			error,
		});
	}
};