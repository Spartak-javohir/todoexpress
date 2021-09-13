
const router = require("express").Router();

router.get("/profile", (req, res)=>{
	
	res.render("index")
})
router.post('/profile', async (req, res)=>{
	console.log(req.db.users);
	const name = req.db.users.name;

	res.render("/profile",{
		name
	})
})




module.exports = {
	router,
	path: "/",
};
