const express = require("express");
const {
	signUpUser,
	loginUser,
	signOutUser,
} = require("../controllers/userAuthController");
import * as validators from "../middlewares/authValidations";
const userAuthRouter = express.Router();

userAuthRouter
	.route("/signUp")
	.post(
		validators.validateBody,
		validators.validateEmail,
		validators.validateEmailExists,
		validators.validatePassword,
		validators.hashPassword,
		signUpUser
	);
userAuthRouter.route("/login").post(loginUser);
userAuthRouter.route("/signOut").get(signOutUser);

module.exports = userAuthRouter;
