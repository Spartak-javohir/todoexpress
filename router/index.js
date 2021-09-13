
const router = require("express").Router();

router.get("/profile", (req, res)=>{
	res.render("index")
})
router.post('/profile', async (req, res)=>{
	
})




module.exports = {
	router,
	path: "/",
};
