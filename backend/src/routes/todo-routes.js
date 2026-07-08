const todoRoute = require("express").Router();

todoRoute.post("/", async (req, res, next) => {
  try {
    const {} = req.body;
  } catch (error) {
    next(error);
  }
});

module.exports = todoRoute;
