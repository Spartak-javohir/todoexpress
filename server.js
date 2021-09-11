const express = require("express");
const server = express();
const PORT = process.env.PORT || 8888;
const cookieParser = require("cookie-parser");
const path = require("path");

server.listen(PORT, () => {
	console.log(`SERVER READY AT ${PORT}`);
});

// Middlewares
server.use(express.json());
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
	} catch (error) {
		console.log(error);
	} finally {
		routes(server);
	}
})();
