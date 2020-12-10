const util = require("util");
const jwt = require("jsonwebtoken");

const generateToken = util.promisify(jwt.sign);

module.exports.generateToken = generateToken;
