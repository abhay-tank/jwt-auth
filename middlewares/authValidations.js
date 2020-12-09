const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const sendErrorResponse = require("../helper/sendError");
const ErrorResponse = require("../models/ErrorResponse");

const file = path.join(__dirname, "..", "data", "users.json");
let db = JSON.parse(fs.readFileSync(file, { encoding: "utf-8" }));

const validateBody = (req, res, next) => {
	let validationArray = ["email", "password"];
	if (req.path == "/signUp") {
		validationArray.push("confirmPassword");
	}
	if (
		!validationArray.every(
			(key) => req.body[key] && req.body[key].trim().length
		)
	) {
		return sendErrorResponse(
			new ErrorResponse(400, "Unsuccessful", "Invalid req format"),
			res
		);
	}
	next();
};

const validateEmail = (req, res, next) => {
	next();
};

const validatePassword = (req, res, next) => {
	next();
};

const validateConfirmPassword = (req, res, next) => {
	if (req.body.password !== req.body.confirmPassword) {
		return sendErrorResponse(
			new ErrorResponse(
				400,
				"Unsuccessful",
				"Password and confirm password does not match"
			),
			res
		);
	}
	next();
};

const validateEmailExists = (req, res, next) => {
	if (db.includes((user) => user.email == req.body.email)) {
		return sendErrorResponse(
			new ErrorResponse(406, "Unsuccessful", "User already Exists"),
			res
		);
	}
	next();
};

const hashPassword = async (req, res, next) => {
	let password = req.body.password;
	try {
		let salt = await bcrypt.genSalt(10);
		let hash = await bcrypt.hash(password, salt);
		req.body.password = hash;
		return next();
	} catch (error) {
		sendErrorResponse(
			new ErrorResponse(500, "Unsuccessful", "Error creating hash"),
			res
		);
		return error;
	}
};

module.exports = {
	validateBody,
	validateEmail,
	validateEmailExists,
	validatePassword,
	validateConfirmPassword,
	hashPassword,
};
