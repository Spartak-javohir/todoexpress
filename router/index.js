
const router = require("express").Router();
const AuthUserMiddleware = require("../controllers/AuthUserMiddleware")
const { ObjectId } = require("bson");


router.get("/profile",AuthUserMiddleware, async (req, res)=>{
	const {user_id} =req.user
	let info = await req.db.users.findOne({
		_id: ObjectId(user_id)

	})
	let todotexts = info.todotext||[]
	let name = info.name

	res.render("index",{
		todotexts,
		name,

		
	})

	
})
router.post("/profile",AuthUserMiddleware, async (req, res)=>{
	try {
		const {user_id} =req.user
			
		await req.db.usersinfo.updateOne({
				_id: ObjectId(user_id)
			},{
				
				$push:{
					todotexts: {
						$each: [{
							todotext: req.body.todotext,
						}]
					},
					times:{
						$each: [{
							time: new Date().getHours().toLocaleString()+':'+ new Date().getMinutes().toLocaleString()+":"+new Date().getSeconds().toLocaleString(),

						}]
					},
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
router.get('/delete/:time',AuthUserMiddleware, async(req, res)=>{
	let tekst = req.params.time.split(' ')

	let data = await req.db.users.find().toArray()
	data.forEach(e => {
		
		for (let i of e.todotext){
			req.db.users.update( { "todotext" : "gkn" }, { $pull: { "time": tekst}} );
			// let del = req.db.users.updateOne({$pull:{todotext:[{ time: i.tim}]}})	
			// console.log( JSON.stringify(del));
					
		}
	});

	res.redirect("/profile")

})


module.exports = {
	router,
	path: "/",
};
