const sendErrorResponse = (responseError, res) => {
	console.error(responseError);
	res.status(responseError.statusCode).json({
		status: responseError.status,
		message: responseError.message,
	});
};

module.exports = sendErrorResponse;
