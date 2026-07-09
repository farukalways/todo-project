const {
  createTodoController,
  updateTodoController,
  deleteTodoController,
} = require("../controller/todo-controller");
const authMiddleware = require("../middleware/authMiddleware");

const todoRoutes = require("express").Router();

todoRoutes.patch("/:id", authMiddleware, updateTodoController);
todoRoutes.delete("/:id", authMiddleware, deleteTodoController);
todoRoutes.post("/", authMiddleware, createTodoController);

module.exports = todoRoutes;
