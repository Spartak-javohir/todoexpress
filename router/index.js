const ProfileController = require("../controllers/profileController")
const router = require("express").Router();

router.get("/profile", (req, res)=>{
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
