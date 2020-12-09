const sendErrorResponse = (responseError, res) => {
	return res.status(responseError.statusCode).json({
		status: responseError.status,
		message: responseError.message,
	});
};

module.exports = sendErrorResponse;
