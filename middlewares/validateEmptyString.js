const sendErrorResponse = require("../helper/sendError");
const ErrorResponse = require("../models/ErrorResponse");

const validateEmptyString = (validationArray, req, res, next) => {
	if (!validationArray.every((key) => req.body[key].trim().length)) {
		return sendErrorResponse(
			new ErrorResponse(400, "Unsuccessful", "Empty input found"),
			res
		);
	}
	next();
};

module.exports = validateEmptyString;
