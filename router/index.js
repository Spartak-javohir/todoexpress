
const router = require("express").Router();

router.get("/profile", (req, res)=>{
	res.render("index")
})





module.exports = {
	router,
	path: "/",
};
