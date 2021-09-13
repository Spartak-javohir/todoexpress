const HomeRoute = require("./index");
const login = require("./login");
const signup = require("./signup");


module.exports = function (server) {
	server.use(HomeRoute.path, HomeRoute.router);
	server.use(login.path, login.router)
	server.use(signup.path, signup.router)
	
	server.use((req,res)=>{
		res.render('error')
	})
};
