const ProfileController = require("../controllers/profileController")
const router = require("express").Router();
const AuthUserMiddleware = require("../controllers/AuthUserMiddleware")

router.get("/profile", AuthUserMiddleware, async (req, res)=>{
	let data = req.db.users.name
	res.render("index",{
		data
	})

	
})
router.post("/profile", ProfileController)



module.exports = {
	router,
	path: "/",
};
