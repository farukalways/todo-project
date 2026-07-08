const express = require("express");

const app = express();

const indexRoutes = require("./routes/index-routes");
const globalErrorHandler = require("./error/golobal-error");
const invalidRouteHandler = require("./error/invalid-route-handler");
const commonMiddlewares = require("./middleware/common-middleware");

// Middleware
app.use(commonMiddlewares);

// Routes
app.use("/", indexRoutes);

// If the request doesn't match any routes above, it lands here.
app.use(invalidRouteHandler);

// Catches actual code errors (500) thrown in your routes
app.use(globalErrorHandler);

module.exports = app;
