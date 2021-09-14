
const router = require("express").Router();
const AuthUserMiddleware = require("../controllers/AuthUserMiddleware")
const { ObjectId } = require("bson");


router.get("/profile",AuthUserMiddleware, async (req, res)=>{
	const {user_id} =req.user
	let info = await req.db.users.findOne({
		_id: ObjectId(user_id)

	})
	let todotexts = info.todotext||[]
	let time = info.time
	let name = info.name

	res.render("index",{
		todotexts,
		time,
		name,
		
	})

	
})
router.post("/profile",AuthUserMiddleware, async (req, res)=>{
	try {
		const {user_id} =req.user
			
		await req.db.users.updateOne({
				_id: ObjectId(user_id)
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
			await
			res.redirect('/profile')
			
		} catch (error) {
			res.render("index", {
				error,
			});
		}
})
router.post('/delete', async(req, res)=>{

	console.log(req.body)

})


module.exports = {
	router,
	path: "/",
};
