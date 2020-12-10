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

const validateEmailFormat = (req, res, next) => {
	next();
};

const validatePasswordFormat = (req, res, next) => {
	next();
};

const validateConfirmPassword = (req, res, next) => {
	console.log(
		"Validate confirm password ",
		req.body.password,
		req.body.confirmPassword
	);
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
	let currentUser = db.find((user) => {
		return user.email === req.body.email;
	});
	console.log("Check if email exists", currentUser);
	if (req.path == "/signUp") {
		if (currentUser) {
			return sendErrorResponse(
				new ErrorResponse(406, "Unsuccessful", "User already Exists"),
				res
			);
		} else {
			return next();
		}
	} else {
		if (currentUser) {
			req.currentUser = currentUser;
			return next();
		} else {
			return sendErrorResponse(
				new ErrorResponse(404, "Unsuccessful", "User does not Exists"),
				res
			);
		}
	}
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

const comparePasswordHash = async (req, res, next) => {
	console.log("Current user", req.currentUser);
	console.log("Comparing password", req.body.password);
	try {
		let result = await bcrypt.compare(
			req.body.password,
			req.currentUser.password
		);
		if (!result) {
			throw new Error("Error authenticating");
		}
		next();
	} catch (error) {
		console.log(error);
		return sendErrorResponse(
			new ErrorResponse(500, "Unsuccessful", "Error authenticating user"),
			res
		);
	}
};

module.exports = {
	validateBody,
	validateEmailFormat,
	validateEmailExists,
	validatePasswordFormat,
	validateConfirmPassword,
	hashPassword,
	comparePasswordHash,
};
