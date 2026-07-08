const indexRoutes = require("express").Router();
const authRoutes = require("./auth-routes");
const todoRoutes = require("./todo-routes");

indexRoutes.use("/api/v1/auth", authRoutes);
indexRoutes.use("/api/v1/todo", todoRoutes);
module.exports = indexRoutes;
