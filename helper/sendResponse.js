const sendResponse = (statusCode, status, data, res) => {
	return res.status(statusCode).json({
		status: status,
		data: data,
	});
};

module.exports = sendResponse;
