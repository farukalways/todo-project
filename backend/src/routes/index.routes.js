const authRoute = require("./auth-route");

const indexRoutes = express().Router();

indexRoutes.use("/api/v1/auth", authRoute);

module.exports = indexRoutes;
