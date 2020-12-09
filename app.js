const express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config.env") });
const { config } = require("./config/config");
const userAuthRouter = require("./routes/userAuthRoutes");
const app = express();
app.use(express.json());
app.use("/auth", userAuthRouter);
app.listen(config.PORT, () => {
	console.log(`Server serving on http://localhost:${config.PORT}`);
});
