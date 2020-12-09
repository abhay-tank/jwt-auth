const express = require("express");
const {
	signUpUser,
	loginUser,
	signOutUser,
} = require("../controllers/userAuthController");
const userAuthRouter = express.Router();

userAuthRouter.route("/signUp").post(signUpUser);
userAuthRouter.route("/login").post(loginUser);
userAuthRouter.route("/signOut").get(signOutUser);

module.exports = userAuthRouter;
