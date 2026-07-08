const Todo = require("../../models/Todo");

const createTodoController = async (req, res, next) => {
  try {
    const { title } = req.body;
    const loginUserId = req.user.id;
    if (!title || title === "") {
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

module.exports = {
  createTodoController,
};
