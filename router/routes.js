const profile = require("./index");
const login = require("./login");
const signup = require("./signup");
const signup = require("./logout");



module.exports = function (server) {
	server.use(profile.path, profile.router);
	server.use(login.path, login.router)
	server.use(signup.path, signup.router)
	server.use(logout.path, logout.router)
	server.use((req,res)=>{
		res.render('error')
	})
};
