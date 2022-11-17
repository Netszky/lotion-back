require("dotenv").config();
const express = require("express");
const apiRouter = require("../routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("cron");
const verifDateSub = require("../helpers/verifDateSub");

const app = express();

// app.use(cors({ origin: "*" }));
app.use(cors());

app.use(function (req, res, next) {
  if (req.originalUrl === "/api/v1/stripe") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use("/api/v1", apiRouter);

cron.job(
  "* * * * *",
  () => {
    verifDateSub();
  },
  null,
  true
);

exports.start = () => {
  const port = process.env.PORT;

  app.listen(port, (err) => {
    if (err) {
      process.exit(-1);
    }
    console.log(`Application écoutant sur : http://localhost:${port}`);
  });
};
