const util = require("util");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const ErrorResponse = require("../models/ErrorResponse");

const generateSalt = util.promisify(bcrypt.genSalt);
const generateHash = util.promisify(bcrypt.hash);
const createUser = async (email, password) => {
	try {
		let salt = await generateSalt(10);
		let hash = await generateHash(password, salt);
		console.log(new User(email, hash));
	} catch (error) {
		console.error(error);
		return error;
	}
};

const signUpUser = (req, res, next) => {};

const loginUser = (req, res, next) => {};

const signOutUser = (req, res, next) => {};
module.exports = { signUpUser, loginUser, signOutUser };
