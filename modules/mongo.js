const { MongoClient } = require("mongodb");

const MONGO_CONNECTION_STRING = "mongodb://localhost:27017"

const client = new MongoClient(MONGO_CONNECTION_STRING);

async function mongodb() {
	try {
		await client.connect();

		const db = await  client.db("ToDoList");

		const users = db.collection("users");
		const usersinfo = db.collection("usersinfo");

		return {
			users,
			usersinfo,
		};
	} catch (error) {
		console.log("MongoDB Error", error);
	}
}

module.exports = mongodb;


// process.env.MONGO_CONNECTION_STRING;