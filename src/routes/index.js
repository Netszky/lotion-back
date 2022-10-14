const express = require('express');
const router = express.Router();
const userRouter = require('./users.routes');
const mailRouter = require('./mails.routes')

router.use(userRouter, mailRouter);

module.exports = router;