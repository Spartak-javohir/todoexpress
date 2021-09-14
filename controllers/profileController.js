

module.exports = async function ProfileController(req, res) {
	try {
	const {user_id} =req.user
		let {todotext}=req.body
	await req.db.users.updateOne({
			_id: ObjectId(user_id),
			todotext: todotext
		},{
			$push:{
				todotext: {
					$each: [{
						todotext: req.body.todotext,
						time: new Date().toLocaleString()
					}]
				}
			}
		})

		res.redirect('/profile')
		
	} catch (error) {
		res.render("index", {
			error,
		});
	}
};