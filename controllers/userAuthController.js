const util = require("util");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const ErrorResponse = require("../models/ErrorResponse");
const sendErrorResponse = require("../helper/sendError");
const sendResponse = require("../helper/sendResponse");

const generateSalt = util.promisify(bcrypt.genSalt);
const generateHash = util.promisify(bcrypt.hash);

const signUpUser = async (req, res, next) => {
	let [email, password] = [req.body.email, req.body.password];
	// try {
	// 	let salt = await generateSalt(10);
	// 	let hash = await generateHash(password, salt);
	// 	console.log(new User(email, hash));
	// } catch (error) {
	// 	console.error(error);
	// 	return error;
	// }
};

const loginUser = (req, res, next) => {};

const signOutUser = (req, res, next) => {};
module.exports = { signUpUser, loginUser, signOutUser };
