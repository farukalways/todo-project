const Todo = require("../models/Todo");

const createTodoController = async (req, res, next) => {
  try {
    const { title } = req.body;
    const loginUserId = req.user.id;

    const trimmedTitle = title ? title.trim() : "";

    if (!trimmedTitle || trimmedTitle === "") {
      return res
        .status(400)
        .json({ success: false, message: "Todo is required" });
    }

    const newTodo = await Todo.create({
      title,
      loginUserId,
    });

    res
      .status(201)
      .json({ success: true, message: "todo createted successfully", newTodo });
  } catch (error) {
    next(error);
  }
};

const updateTodoController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title } = req.body;

    const trimmedTitle = title ? title.trim() : "";

    if (!trimmedTitle || trimmedTitle === "") {
      return res
        .status(400)
        .json({ success: false, message: "Todo is required" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title: trimmedTitle },
      { new: true },
    );
    if (!updatedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};
const deleteTodoController = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteTodo = await Todo.findByIdAndDelete(id);
    if (!deleteTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      deleteTodo,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodoController,
  updateTodoController,
  deleteTodoController,
};
