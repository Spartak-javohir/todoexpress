
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
router.get('/delete/:todotext',AuthUserMiddleware, async(req, res)=>{
	const {user_id} =req.user
	let info = await req.db.users.findOne({
		_id: ObjectId(user_id)

	})
	// let text = await info.findOne({todotext:req.params.todotext})
	console.log(info.todotext);
	// req.db.users.deleteOne(todotext)
	// let text = await req.db.users.findIndex(e=>{
	// 	e.todotext=req.params.todotext
	// })
	// req.db.users.updateOne(text)

	res.redirect("/profile")

})


module.exports = {
	router,
	path: "/",
};
