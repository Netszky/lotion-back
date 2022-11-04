require("dotenv").config();
const express = require("express");
const apiRouter = require("../routes");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors())

// app.use(bodyParser.json());

app.use(function (req, res, next) {
  if (req.originalUrl === '/api/v1/stripe') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use("/api/v1", apiRouter);

app.use(cors())

exports.start = () => {
  const port = process.env.PORT;

  app.listen(port, (err) => {
    if (err) {
      process.exit(-1);
    }
    console.log(`Application écoutant sur : http://localhost:${port}`);
  });
};