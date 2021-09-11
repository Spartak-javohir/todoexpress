const { MongoClient } = require("mongodb");

const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const client = new MongoClient(MONGO_CONNECTION_STRING);

async function mongodb() {
	try {
		await client.connect();

		const db = await client.db("level_up");

		const users = db.collection("users");

		return {
			users,
		};
	} catch (error) {
		console.log("MongoDB Error", error);
	}
}

module.exports = mongodb;
