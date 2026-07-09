const {
  createTodoController,
  updateTodoController,
  deleteTodoController,
  toggleTodoCompleteController,
} = require("../controller/todo-controller");
const authMiddleware = require("../middleware/authMiddleware");

const todoRoutes = require("express").Router();

todoRoutes.patch("/:id/toggle", authMiddleware, toggleTodoCompleteController);
todoRoutes.patch("/:id", authMiddleware, updateTodoController);
todoRoutes.delete("/:id", authMiddleware, deleteTodoController);
todoRoutes.post("/", authMiddleware, createTodoController);

module.exports = todoRoutes;
