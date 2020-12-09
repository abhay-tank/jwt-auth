const uniqid = require("uniqid");
const bcrypt = require("bcrypt");

class User {
	constructor(email, password) {
		this.uid = uniqid();
		this.email = email;
		this.password = password;
		this.createdAt = Date.now();
	}
}

module.exports = User;
