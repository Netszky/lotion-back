const cors = require("cors");
require("dotenv").config();
// const app = require('./src/services/express.service');
const apiRouter = require("./src/routes/index");
const express = require("express");
const mongoose = require('./src/services/mongoose.service');
const app = express();

mongoose.connectDb();

app.use(cors({ origin: "*" }));
app.use(function (req, res, next) {
    if (req.originalUrl === '/api/v1/stripe') {
        next();
    } else {
        express.json()(req, res, next);
    }
});
app.use("/api/v1", apiRouter);


const port = process.env.PORT;

app.listen(port, (err) => {
    if (err) {
        process.exit(-1);
    }
    console.log(`Application écoutant sur : http://localhost:${port}`);
});

// app.start();