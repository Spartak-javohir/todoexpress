
const router = require("express").Router();
const AuthUserMiddleware = require("../controllers/AuthUserMiddleware")
const { ObjectId } = require("bson");
const {v4}= require("uuid")

router.get("/profile",AuthUserMiddleware, async (req, res)=>{
	const {user_id} =req.user
	
	let info = await req.db.users.findOne({
		_id: ObjectId(user_id)

	})
	let email = info.email
	let data = await req.db.usersinfo.findOne({
		email: email,
	})
	let todotexts = data.todotexts
	let name = info.name

	res.render("index",{
		todotexts,
		name,

		
	})

	
})
router.post("/profile",AuthUserMiddleware, async (req, res)=>{
	try {
		const {user_id} =req.user
		let info = await req.db.users.findOne({
			_id: ObjectId(user_id)

		})
		let email = info.email
		

		let data = await req.db.usersinfo.updateOne({
				email: email,
			},{
				
				$push:{
					todotexts: {
						
						todotext: req.body.todotext,
						
					},
				},
				
			})
			await
			res.redirect('/profile')
			return
			
		} catch (error) {
			res.render("index", {
				error,
			});
		}
})
router.get('/delete/:todotext',AuthUserMiddleware, async(req, res)=>{
	let tekst = req.params.todotext
	
	const {user_id} =req.user
	let info = await req.db.users.findOne({
		_id: ObjectId(user_id)

	})
	let email = info.email
	let data = await req.db.usersinfo.find({email:email}).toArray()
	
		
		req.db.usersinfo.updateOne({
			email: email,
		},{
			$pull:{
				todotexts:{
					id: v4(),
					todotext: tekst,
				}
			}
		});
	

	res.redirect("/profile")

})




module.exports = {
	router,
	path: "/",
};
