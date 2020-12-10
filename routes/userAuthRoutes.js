const express = require("express");
const {
	signUpUser,
	loginUser,
	signOutUser,
} = require("../controllers/userAuthController");
const {
	validateBody,
	validateEmailFormat,
	validateEmailExists,
	validatePasswordFormat,
	validateConfirmPassword,
	hashPassword,
	comparePasswordHash,
} = require("../middlewares/authValidations");
const userAuthRouter = express.Router();

userAuthRouter
	.route("/signUp")
	.post(
		validateBody,
		validateEmailFormat,
		validateEmailExists,
		validatePasswordFormat,
		validateConfirmPassword,
		hashPassword,
		signUpUser
	);
userAuthRouter
	.route("/signIn")
	.post(
		validateBody,
		validateEmailFormat,
		validateEmailExists,
		validatePasswordFormat,
		comparePasswordHash,
		loginUser
	);
userAuthRouter.route("/signOut").get(signOutUser);

module.exports = userAuthRouter;
