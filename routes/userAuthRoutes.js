const express = require("express");
const {
	signUpUser,
	loginUser,
	signOutUser,
} = require("../controllers/userAuthController");

const validateUserSignUp = require("../middlewares/validateSignUp");
const validateEmptyString = require("../middlewares/validateEmptyString");
const userAuthRouter = express.Router();

userAuthRouter
	.route("/signUp")
	.post(validateUserSignUp, validateEmptyString, signUpUser);
userAuthRouter.route("/login").post(loginUser);
userAuthRouter.route("/signOut").get(signOutUser);

module.exports = userAuthRouter;
