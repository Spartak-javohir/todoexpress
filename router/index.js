
const router = require("express").Router();
const AuthUserMiddleware = require("../controllers/AuthUserMiddleware")
const { ObjectId } = require("bson");


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
		console.log(info.email);

		let data = await req.db.usersinfo.updateOne({
				email: email,
			},{
				
				$push:{
					todotexts: {
						
						todotext: req.body.todotext,
						
					},
				},
				// $push:{
					// times:{
						
					// 		time: new Date().getHours().toLocaleString()+':'+ new Date().getMinutes().toLocaleString()+":"+new Date().getSeconds().toLocaleString(),

						
					// },
				// },
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
router.get('/delete/:time',AuthUserMiddleware, async(req, res)=>{
	let tekst = req.params.time.split(' ')
	const {user_id} =req.user
	let info = await req.db.users.findOne({
		_id: ObjectId(user_id)

	})
	let email = info._id
	let data = await req.db.users.find({email:email}).toArray()
	data.forEach(e => {
		
		console.log(e);
	});

	res.redirect("/profile")

})


module.exports = {
	router,
	path: "/",
};
