const { MongoClient } = require("mongodb");

const MONGO_CONNECTION_STRING = "mongodb://localhost:27017"

const client = new MongoClient(MONGO_CONNECTION_STRING);

async function mongodb() {
	try {
		await client.connect();

		const db = await client.db("To_Do_List");

		const users = db.collection("users");

		return {
			users,
		};
	} catch (error) {
		console.log("MongoDB Error", error);
	}
}

module.exports = mongodb;


// process.env.MONGO_CONNECTION_STRING;