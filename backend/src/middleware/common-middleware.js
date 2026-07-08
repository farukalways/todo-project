const commonMiddlewares = [
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
];

module.exports = commonMiddlewares;
