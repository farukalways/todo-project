const {
  registerController,
  loginController,
  refreshTokenController,
} = require("../controller/auth-controller");

const authRoute = require("express").Router();

authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
authRoute.post("/refresh", refreshTokenController);

module.exports = authRoute;
