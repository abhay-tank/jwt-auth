const express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "config.env") });
const { config } = require("./config/config");

const app = express();

app.listen(config.PORT, () => {
	console.log(`Server serving on http://localhost:${config.PORT}`);
});
