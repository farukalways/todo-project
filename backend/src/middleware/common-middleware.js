const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const commonMiddlewares = [
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
];

module.exports = commonMiddlewares;
