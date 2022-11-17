require("dotenv").config();
const express = require("express");
const apiRouter = require("../routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("cron");
const verifDateSub = require("../helpers/verifDateSub");
const nodeCron = require("node-cron")
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

const job = nodeCron.schedule("* * *  * *", function jobYouNeedToExecute() {
    // Do whatever you want in here. Send email, Make  database backup or download data.
    verifDateSub()
});

 //cron.job(
  // "* * * * *",
   //() => {
    //verifDateSub();
  //},
    // () => console.log("FINI"),
  //true
//);

exports.start = () => {
  const port = process.env.PORT;

  app.listen(port, (err) => {
    if (err) {
      process.exit(-1);
    }
    console.log(`Application écoutant sur : http://localhost:${port}`);
  });
};
