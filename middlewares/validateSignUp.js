const sendErrorResponse = require("../helper/sendError");
const ErrorResponse = require("../models/ErrorResponse");
const validateUserSignUp = async (req, res, next) => {
	let user = req.body;
	let validationKeys = ["email", "password"];
	if (!validationKeys.every((key) => user[key])) {
		return sendErrorResponse(
			new ErrorResponse(
				400,
				"Unsuccessful",
				"Email or password not found in request"
			),
			res
		);
	}
	// Check for keys with empty input
	next(validationKeys, req, res, next);
};

module.exports = validateUserSignUp;
