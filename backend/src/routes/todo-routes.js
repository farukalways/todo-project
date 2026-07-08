const {
  createTodoController,
} = require("../controller/todo-controller/create-todo-controller");
const authMiddleware = require("../middleware/authMiddleware");

const todoRoutes = require("express").Router();

todoRoutes.post("/", authMiddleware, createTodoController);

module.exports = todoRoutes;
