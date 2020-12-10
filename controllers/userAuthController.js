const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const ErrorResponse = require("../models/ErrorResponse");
const sendErrorResponse = require("../helper/sendError");
const sendResponse = require("../helper/sendResponse");
const { generateToken } = require("../helper/jwtAuth");
const { config } = require("../config/config");

const file = path.join(__dirname, "..", "data", "users.json");
let db = JSON.parse(fs.readFileSync(file, { encoding: "utf-8" }));

const signUpUser = async (req, res) => {
	try {
		db.push(new User(req.body.email, req.body.password));
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

const loginUser = async (req, res, next) => {
	let token = await generateToken(
		{ email: req.currentUser.email },
		config.JWT_SECRET
	);
	res.cookie("jwt", token);
	sendResponse(
		202,
		"Successful",
		[
			{
				jwt: token,
			},
		],
		res
	);
};

const signOutUser = (req, res, next) => {};
module.exports = { signUpUser, loginUser, signOutUser };
