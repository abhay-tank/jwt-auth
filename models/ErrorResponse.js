class ErrorResponse extends Error {
  super()
  constructor(statusCode, status, message) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message
  }
}

module.exports = ErrorResponse;