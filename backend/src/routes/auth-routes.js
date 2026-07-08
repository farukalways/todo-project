const authRoutes = require("express").Router();

const {
  registerController,
  loginController,
  refreshTokenController,
} = require("../controller/auth-controller");

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.post("/refresh", refreshTokenController);

module.exports = authRoutes;
