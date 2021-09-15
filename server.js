// require("dotenv").config();

const express = require("express");
const server = express();
const PORT = process.env.PORT || 6688;
const cookieParser = require("cookie-parser");
const path = require("path");
const mongodb = require("./modules/mongo");
const routes = require("./router/routes");
const AuthUserMiddleware = require("./controllers/AuthUserMiddleware");


server.listen(PORT, () => {
	console.log(`SERVER READY AT ${PORT}`);
});

// Middlewares
server.use(express.json());
server.use(cookieParser());
server.use(
	express.urlencoded({
		extended: true,
	})
);
// Settings
server.set("view engine", "ejs");

(async () => {
	const db = await mongodb();
	try {
		server.use((req, res, next) => {
			req.db = db;
			next();
		});
		server.use(AuthUserMiddleware)
	} catch (error) {
		console.log(error);
	} finally {
        routes(server);
    }
})();
