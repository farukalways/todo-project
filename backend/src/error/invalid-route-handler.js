// Using custom AppError class or standard Error object
const invalidRouteHandler = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  error.statusCode = 404;

  next(error); // Passes the error straight to your globalErrorHandler
};

module.exports = invalidRouteHandler;
