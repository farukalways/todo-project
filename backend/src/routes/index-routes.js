const authRoute = require("./auth-routes");

const indexRoutes = require("express").Router();

indexRoutes.use("/api/v1/auth", authRoute);
module.exports = indexRoutes;
