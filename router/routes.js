const HomeRoute = require("./index");
const login = require("./login");

module.exports = function (server) {
	server.use(HomeRoute.path, HomeRoute.router);
	server.use(login.path, login.router)
};
