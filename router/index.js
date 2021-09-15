
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
			
		await req.db.users.updateOne({
				_id: ObjectId(user_id)
			},{
				$push:{
					todotext: {
						$each: [{
							
							todotext: req.body.todotext,
							time: new Date().getHours().toLocaleString()+':'+ new Date().getMinutes().toLocaleString()+":"+new Date().getSeconds().toLocaleString(),					}]
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
router.get('/delete/:time',AuthUserMiddleware, async(req, res)=>{
	let tekst = req.params.time.split(' ')
	let raqam = tekst.toString()
	let data = await req.db.users.find().toArray()
	data.forEach(e => {
		
		for (let i of e.todotext){
			i.time.filter()
			if(i.time!=tekst){
				console.log();
				
			}
		}
	});
	

	// let text = await info.findOne({todotext:req.params.todotext})
	// console.log(todotexts.findOne({todotext: req.params.todotext}));
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
