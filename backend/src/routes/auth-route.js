const {
  registerController,
  loginController,
} = require("../controller/auth/register");

const authRoute = require("express").Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);

module.exports = authRoute;
