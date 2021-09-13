const { genSalt, hash, compareSync } = require("bcrypt");

async function generateCrypt(data) {
	const salt = await genSalt(10);

	return await hash(data, salt);
}

async function compareHash(data, hash) {
	return compareSync(data, hash);
}

module.exports = {
	compareHash,
	generateCrypt,
};
