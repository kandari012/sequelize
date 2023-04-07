const express = require("express");
const app = express();
const port = 8000;

require("./models");
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(` app is listening at http://localhost:${port}`);
});
