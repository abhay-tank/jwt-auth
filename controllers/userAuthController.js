const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const ErrorResponse = require("../models/ErrorResponse");
const sendErrorResponse = require("../helper/sendError");
const sendResponse = require("../helper/sendResponse");

const file = path.join(__dirname, "..", "data", "users.json");
let db = JSON.parse(fs.readFileSync(file, { encoding: "utf-8" }));

const signUpUser = async (req, res) => {
	let [email, password] = [req.body.email, req.body.password];
	try {
		let salt = await bcrypt.genSalt(10);
		let hash = await bcrypt.hash(password, salt);
		db.push(new User(email, hash));
		fs.writeFile(file, JSON.stringify(db, null, 2), (err) => {
			if (err) {
				return sendErrorResponse(
					new ErrorResponse(
						500,
						"Unsuccessful",
						"Error occurred while saving user"
					),
					res
				);
			}
			sendResponse(201, "Success", "User Created successfully", res);
		});
	} catch (error) {
		console.error(error);
		return error;
	}
};

const loginUser = (req, res, next) => {};

const signOutUser = (req, res, next) => {};
module.exports = { signUpUser, loginUser, signOutUser };
