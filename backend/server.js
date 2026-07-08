require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/connectDB");

const PORT = process.env.PORT || 3000;

connectDB("mongodb://localhost:27017/todo")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
