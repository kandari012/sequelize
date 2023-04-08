const express = require("express");
const app = express();
const port = 8000;

require("./models");

let userController = require("./controller/userController");
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/add", userController.addUser);
app.get("/crud", userController.crudOperation);
app.get("/query", userController.query);
app.get("/setterGetter", userController.setterGetter);

app.listen(port, () => {
  console.log(` app is listening at http://localhost:${port}`);
});
