require("dotenv").config();
const express = require("express");
const apiRouter = require("../routes");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use("*", cors());

app.use("/api/v1", apiRouter);

exports.start = () => {
  const port = process.env.PORT;

  app.listen(port, (err) => {
    if (err) {
      process.exit(-1);
    }
    console.log(`Application écoutant sur : http://localhost:${port}`);
  });
};